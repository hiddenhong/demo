from rest_framework import (
  viewsets,
  authentication,
  permissions,
  filters,
  mixins,
  status,
  generics,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import list_route

from django.template import loader
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

import json
import datetime
import re
import os

from rest_framework_jwt.views import *
import rest_framework_jwt
from djoser.views import *

from docker_django.apps.authentication.models import (
  TsingUser, 
  TsingUserManager
)
from docker_django.apps.authentication.serializers import (
  UserSerializer,
  UserCreationSerializer,
  LoginSerializer,
  SSOSerializer,
  UserNameSerializer,
  JSONWebTokenSerializer
)
from docker_django.apps.authentication.views.wiki import *
from docker_django.apps.authentication.views.gitlab import *

GITLAB_PRIVATE_TOKEN = '_gitlab_private_token'
email_re = re.compile(r"^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$", re.IGNORECASE)

class ObtainJSONWebToken(JSONWebTokenAPIView):
  serializer_class = JSONWebTokenSerializer

  def sso_password(self,username):
    user = User.objects.get(username=username)
    serializer = SSOSerializer(user)
    return serializer.data['sso_password']

  def wiki_login(self, username, sso_password):
      mediawiki = MediaWiki()
      try:
        wiki_login_response = mediawiki.login(username)

        token = json.loads(wiki_login_response.text)['login']['token']
        cookies = wiki_login_response.cookies
        if not('token' in json.loads(wiki_login_response.text)['login'].keys()):
          raise Exception({'wiki_error': 'No token return.'})

        wiki_login_response = mediawiki.login(
          username,
          sso_password,
          token,
          cookies
        )

        if len(wiki_login_response.cookies) == 0:
          raise Exception({'wiki_error': _('No cookie in wiki response.')})
        elif (json.loads(wiki_login_response.text)['login']['result'] != 'Success'):
          raise Exception({'wiki_error':json.loads(wiki_login_response.text)})

      except Exception, e:
        raise      
      else:
          return wiki_login_response

  def gitlab_login(self, username, sso_password):
    gitlab = GitLab()
  
    try:
      gitlab_login_response = gitlab.login(username, sso_password)

      if not ('private_token' in json.loads(gitlab_login_response.text).keys()):
        raise Exception({'gitlab_error': 'No private key.', 
                        'gitlab_response': json.loads(gitlab_login_response.text)})

    except Exception, e:
      raise
    else:
        return json.loads(gitlab_login_response.text)

  def build_cookie(self, response, wiki_cookies, gitlab_private_token):
    expire_date = timezone.now() + datetime.timedelta(days=30)

    for cookie in wiki_cookies:
      response.set_cookie(cookie.name, value=cookie.value, expires=expire_date)

    response.set_cookie(GITLAB_PRIVATE_TOKEN, value=gitlab_private_token, expires=expire_date)

  def build_response(self, response_data, wiki_cookies, gitlab_private_token):
    response = Response(response_data)
    self.build_cookie(response, wiki_cookies, gitlab_private_token)
    return response


  def post(self, request, *args, **kwargs):
    try:
      data = request.data
      serializer = self.get_serializer(data=data)
      if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      user = serializer.object.get('user') or request.user
      token = serializer.object.get('token')
      response_data = jwt_response_payload_handler(token, user, request)

      username = data['username']

      if email_re.search(username):
        user = User.objects.get(email=username)
        serializer = UserNameSerializer(user)
        username = serializer.data['username']

      sso_password = self.sso_password(username)

      wiki_cookies = self.wiki_login(username, sso_password).cookies.__iter__()
      gitlab_private_token = self.gitlab_login(username, sso_password)['private_token']
    

      response = self.build_response(response_data, wiki_cookies, gitlab_private_token)
      return response

    except requests.exceptions.ConnectionError, e:
      return Response({'The networkd connection is down...'}, status=status.HTTP_504_GATEWAY_TIMEOUT)

    except Exception, e:
      return Response({'result':'error', 'message':e.message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogOut(LogoutView):
  def post(self, request):
    # proqod logout
    super(LogOut,self).post(request)

    # get request cookie:rest_framework.request.Request>HttpRequest
    req_cookies = request.COOKIES

    # get cookies from media wiki
    mediawiki = MediaWiki()
    logout = mediawiki.log_out(req_cookies)

    # buile response 
    response = Response()
    expire_date = timezone.now() - datetime.timedelta(days=1)

    for key in req_cookies:
      if 'Token' in key:
        response.set_cookie(key, value=req_cookies[key], expires=expire_date)
      elif 'UserID' in key:
        response.set_cookie(key, value=req_cookies[key], expires=expire_date)
      elif 'UserName' in key:
        response.set_cookie(key, value=req_cookies[key], expires=expire_date)
      elif 'session' in key:
        response.set_cookie(key, value=req_cookies[key], expires=expire_date)
      else:
        pass
        
    for cookie in logout.cookies.__iter__():
      response.set_cookie(cookie.name, value=cookie.value)
    # delete gitlab cookie
    response.delete_cookie(GITLAB_PRIVATE_TOKEN)

    return response

'''
from djoser import views
'''
class Me(UserView):
  pass
'''
form djoser import view
'''
class ChangePsw(SetPasswordView):
  pass

class CreateUser(APIView):
  permission_classes = (
        permissions.AllowAny,
  )

  def exception_handler(self, e, wiki_register, gitlab_register):
    if gitlab_register == True:
      #rollback gitlab + wiki
      return {'proqod error':'register failed.'}
    elif wiki_register == True:
      #rollback wiki
      return {'result': 'gitlab register failed', 'message':e.message}
    else:
      return {'result': 'mediawiki register failed', 'message':e.message}

  def wiki_register(self, username, sso_password, email, realname):
    mw = MediaWiki()

    try:
      wiki_login_response = mw.admin_login()
      if not ('token' in json.loads(wiki_login_response.text)['login'].keys() ):
        raise Exception({'detail': json.loads(wiki_login_response.text)}) 
      else:
        cookies = wiki_login_response.cookies

      wiki_response = mw.create_user( 
          cookies, 
          username, 
          sso_password, 
          realname, 
          email
      )
      if not (json.loads(wiki_response.text)['error']['code'] == 'php-mail-error-unknown'):
        raise Exception({'detail': json.loads(wiki_response.text)}) 

    except Exception, e:
      raise
    else:
      return True

  def gitlab_register(self, username, sso_password, email, realname):
    gitlab = GitLab()
    try:
      gitlab_login_response = gitlab.admin_login()
      if not ('private_token' in json.loads(gitlab_login_response.text).keys() ):
        raise Exception({'detail': json.loads(gitlab_login_response.text)})
      else:
        gitlab_private_token = json.loads(gitlab_login_response.text)['private_token']

      gitlab_response = gitlab.create_user(
          gitlab_private_token,
          username,
          sso_password,
          email,
          realname
      )
      if not ('username' in json.loads(gitlab_response.text).keys()):
        raise Exception({'detail': json.loads(gitlab_response.text)})

      elif not (json.loads(gitlab_response.text)['username'] == username):
        raise Exception({'detail': json.loads(gitlab_response.text)})

    except Exception, e:
      raise
    else:
      return True
      
  def post(self, request, format=None):
    wiki_register, gitlab_register = False, False

    try:
      username = request.data['username']
      password = request.data['password']
      realname = request.data['name']
      email = request.data['email']
      sso_password = request.data['sso_password'] = ''.join(map(lambda xx:(hex(ord(xx))[2:]),os.urandom(16)))[:16]

      serializer = UserCreationSerializer(data=request.data)

      if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      wiki_register = self.wiki_register(username, sso_password, email, realname)

      gitlab_register = self.gitlab_register(username, sso_password, email, realname)

      serializer.save()

      return Response(serializer.data, status=status.HTTP_201_CREATED)

    except requests.exceptions.ConnectionError, e:      
      response = self.exception_handler(wiki_register, gitlab_register)
      return Response({'result':'The networkd connection is down...','detail':response}, 
                      status=status.HTTP_504_GATEWAY_TIMEOUT)

    except Exception, e:
      response = self.exception_handler(e, wiki_register, gitlab_register)
      return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

      

class DefaultsMixin(object):

  """
  Default settings for view auth, permissions,
  filtering and pagination
  """

  authentication_classes = (
    rest_framework_jwt.authentication.JSONWebTokenAuthentication,
  )

  permission_classes = (
    permissions.IsAuthenticated,
    # permissions.IsAdminUser,
  )

  paginate_by = 25

  filter_backends = (
    filters.DjangoFilterBackend,
    filters.SearchFilter,
    filters.OrderingFilter,
  )

class UserViewSet(viewsets.ViewSet):

  queryset = TsingUser.objects.none()
  serializer_class = UserSerializer
