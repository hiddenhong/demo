from rest_framework.views import APIView
from django.conf import settings
import json
import requests

class MediaWiki(APIView):
  '''
  use media wiki's api
  '''
  def __init__(self):
    self.__base_url = settings.AUTH_WIKI_BASE_URL
    self.__admin_username = settings.AUTH_WIKI_ADMIN_USERNAME
    self.__admin_password = settings.AUTH_WIKI_ADMIN_PASSWORD
    self.__login_api = self.__base_url + '?action=login&format=json'
    self.__logout_api = self.__base_url + '?action=logout&format=json'
    self.__create_account_api = self.__base_url + '?action=createaccount&format=json'
    self.__user_api = self.__base_url + '?action=setuserpreferences'

  def admin_login(self):
    url = self.__login_api
    data = {
        'lgname': self.__admin_username,
        'lgpassword': self.__admin_password
    }
    return requests.post(url, data=data)
  
  def login(self, username, password=None, token=None, cookies=None):
    url = self.__login_api
    data = {
      'lgname': username
    }
    if password is not None:
      data['lgpassword'] = password

    if token is not None:
      data['lgtoken'] = token

    return requests.post(url, data=data, cookies=cookies)

  def log_out(self,cookies):
    url = self.__logout_api
    return requests.get(url,cookies=cookies)


  def __create_account_token(self, username, password, cookies):
    url = self.__create_account_api
    data = {
        'name': username,
        'password': password,
    }
    return requests.post(url, data=data, cookies=cookies)

  def create_user(self, cookies, username, password, realname, email):
    url = self.__create_account_api
    response = self.__create_account_token(username, password, cookies)
    token = json.loads(response.text)['createaccount']['token']
    data = {
        'name': username,
        'password': password,
        'realname': realname,
        'email': email,
        'token': token
    }
    return requests.post(url, data=data, cookies=cookies)





