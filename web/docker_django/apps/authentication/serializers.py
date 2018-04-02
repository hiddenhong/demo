from django.contrib.auth import get_user_model
from django.utils.translation import ugettext as _
from rest_framework_jwt.serializers import *
from rest_framework import serializers
from djoser.serializers import *
from .models import *
from docker_django.apps.authentication.views.wiki import *
from docker_django.apps.authentication.views.gitlab import *
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from random import Random
import os
from docker_django.apps.authentication.authentication import EmailOrUsernameModelBackend
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            User._meta.pk.name,
            User.USERNAME_FIELD,
            'id',
            'sso_password'
        )
        read_only_fields = (
            User.USERNAME_FIELD,
        )
        search_fields = ('id', 'email')

class SSOSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('sso_password',)       

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)   

class JSONWebTokenSerializer(JSONWebTokenSerializer):
    def validate(self, attrs):
        credentials = {
            self.username_field: attrs.get(self.username_field),
            'password': attrs.get('password')
        }

        if all(credentials.values()):
            auth = EmailOrUsernameModelBackend()
            user = auth.authenticate(**credentials)
            if user:
                payload = jwt_payload_handler(user)

                return {
                    'token': jwt_encode_handler(payload),
                    'user': user
                }
            else:
                msg = _('Unable to login with provided credentials.')
                raise serializers.ValidationError(msg)
        else:
            msg = _('Must include "{username_field}" and "password".')
            msg = msg.format(username_field=self.username_field)
            raise serializers.ValidationError(msg)


class UserCreationSerializer(UserRegistrationSerializer):
    '''
    UserRegistrationSerializer - from djoser import serializer
    '''
    sso_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            User.USERNAME_FIELD,
            User._meta.pk.name,
            'password',
            'sso_password'
        )

    def create(self, validated_data):
        try:
            user = User.objects.create_user(**validated_data)
        except Exception, e:
            raise Exception(e)
        return user