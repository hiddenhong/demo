from rest_framework.views import APIView
from django.conf import settings
import requests
import json

class GitLab(APIView):
  '''
  GitLab API
  '''
  def __init__(self):
    self.__base_url = settings.AUTH_GITLAB_BASE_URL
    self.__admin_username = settings.AUTH_GITLAB_ADMIN_USERNAME
    self.__admin_password = settings.AUTH_GITLAB_ADMIN_PASSWORD
    self.__login_api = self.__base_url + '/session'
    self.__user_api = self.__base_url + '/users'

  def admin_login(self):
    return self.login(self.__admin_username, self.__admin_password)

  def login(self, login, password):
    url = self.__login_api
    payload = {
      'login': login,
      'password': password
    }

    return requests.post(url, data=payload)

  def create_user(self, private_token, username, password, email, name):
    # note: for now, we only provide required fields 
    url = self.__user_api
    headers = {'PRIVATE-TOKEN': private_token}
    payload = {
      'username': username,
      'password': password,
      'email': email,
      'name': name
    }

    return requests.post(url, data=payload, headers=headers)
    
  def update_user(self, private_token, user_id, password):
    # note: for now, we only allow user to change password
    url = self.__user_api + '/' + user_id
    headers = {'PRIVATE-TOKEN': private_token}
    payload = {'password': password}

    return requests.post(url, data=payload, headers=headers)