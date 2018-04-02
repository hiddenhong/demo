from rest_framework import (viewsets,
  authentication,
  permissions,
  filters,
  mixins
  )

from django.template import loader
from .models import TsingUser, TsingUserManager
from serializers import UserSerializer

from rest_framework.decorators import list_route
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

import rest_framework_jwt
import json

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


  @list_route(methods=["post"], permission_classes=[permissions.AllowAny])
  def register(self, request, pk=None):
    values = json.loads(request.body)
    user = get_user_model().objects.create_user(name = values.get('name'),
                                    email = values.get('email').lower(),
                                    password = values.get('password'),
                                    contact_number = values.get('contact_number'))
