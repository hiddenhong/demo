from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, APIClient
import unittest
import requests
import json
import sys, os

from docker_django.apps.authentication.views.default import *
from docker_django.apps.authentication.views.wiki import *
from docker_django.apps.authentication.views.gitlab import *


json_data = open('test_data.json','r')
json_data = json.load(json_data)

# login datas
USERNAME = json_data['proqod_login']['username']
PASSWORD = json_data['proqod_login']['password']
# mediawiki+gitlab datas
USERNAMEmg = json_data['wiki_gitlab_login']['username']
SSO_PASSWORDmg =  json_data['wiki_gitlab_login']['sso_password']
# register datas
SSO_PASSWORD = json_data['wiki_gitlab_register']['sso_password']
USERNAME_REGISTER = json_data['wiki_gitlab_register']['username']
EMAIL_REGISTER = json_data['wiki_gitlab_register']['email']

def get_mediawiki_login_token_cookies():
    mediawiki = MediaWiki()
    response = mediawiki.login(USERNAMEmg)
    token = json.loads(response.text)['login']['token']
    cookies = response.cookies
    return token, cookies

def get_login_token():
    url = 'http://139.224.44.73/v1/auth/login/'
    data = {
            "username":USERNAME,
            "password":PASSWORD
    }
    response = requests.post(url,data)
    return json.loads(response.text)['token']

TOKEN = get_login_token()

class TestApi(APITestCase):

    def test_register(self):
    	url = 'http://139.224.44.73/v1/auth/register/'
        data = {
            "name":json_data['proqod_register']['name'],
            "email":json_data['proqod_register']['email'],
            "username":json_data['proqod_register']['username'],
            "password":json_data['proqod_register']['password']
        }
        response = requests.post(url,data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(response.text)['username'], json_data['proqod_register']['username'])

    def test_gitlab_register(self):
        gitlab = GitLab()
        gitlab_login_response = gitlab.admin_login()
        gitlab_private_token = json.loads(gitlab_login_response.text)['private_token']
        response = gitlab.create_user(
            gitlab_private_token,
            USERNAME_REGISTER,
            SSO_PASSWORD,
            EMAIL_REGISTER,
            USERNAME_REGISTER
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(response.text)['username'], USERNAME_REGISTER)

    def test_mediawiki_register(self):
        mediawiki = MediaWiki()
        wiki_login_response = mediawiki.admin_login()
        wiki_cookies = wiki_login_response.cookies
        response = mediawiki.create_user(
            wiki_cookies,
            USERNAME_REGISTER,
            SSO_PASSWORD,
            USERNAME_REGISTER,
            EMAIL_REGISTER
        )
        #{"error":{"code":"php-mail-error-unknown","info":"Unknown error in PHP's mail() function."}}
        self.assertEqual(json.loads(response.text)['error']['code'], 'php-mail-error-unknown')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login(self):
        url = 'http://139.224.44.73/v1/auth/login/'
        data = {
            "username":USERNAME,
            "password":PASSWORD
        }
        response = requests.post(url, data)
        self.assertIsNotNone(json.loads(response.text)['token'])      
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_gitlab_login(self):
        gitlab = GitLab()
        response = gitlab.login(USERNAMEmg,SSO_PASSWORDmg)
        self.assertEqual(json.loads(response.text)['username'],USERNAMEmg)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_mediawiki_login(self):
        mediawiki = MediaWiki()
        token, cookies = get_mediawiki_login_token_cookies()
        response = mediawiki.login(USERNAMEmg,SSO_PASSWORDmg,token,cookies)
        self.assertEqual(json.loads(response.text)['login']['result'], 'Success')    
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_mediawiki_logout(self):
        mediawiki = MediaWiki()
        _, cookies = get_mediawiki_login_token_cookies()
        response = mediawiki.log_out(cookies)
        # self.assertEqual(json.loads(response.text)['username'], 'zman')        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_me(self):
        url = 'http://139.224.44.73/v1/auth/me/'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + TOKEN,
        }
        response = requests.get(url=url,headers=headers)
        self.assertEqual(json.loads(response.text)['username'], USERNAME)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_password(self):
        url = 'http://139.224.44.73/v1/auth/password/'
        headers = {
            'Content-Type': 'application/json',
            'Authorization':'JWT '+ TOKEN
        }
        data = json.dumps({
            "current_password": PASSWORD,
            "new_password":"1234567890"
        })
        response = requests.post(url=url, data=data, headers=headers)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_logout(self):
        url = 'http://139.224.44.73/v1/auth/logout/'
        headers = {
            'Content-Type': 'application/json',
            'Authorization':'JWT '+ TOKEN
        }
        response = requests.post(url=url, headers=headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_import(self):
    #     pass
