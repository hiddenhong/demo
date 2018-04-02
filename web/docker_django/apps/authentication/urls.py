from django.conf.urls import url, include
import rest_framework_jwt.views
import views
from docker_django.apps.authentication.views import default
#from djoser import views
# from django.contrib.auth import get_user_model
# User = get_user_model()

base_urlpatterns = [
    url(r'^me/$', 
    	default.Me.as_view(),
    	name='user'), #/v1/auth/me/
    #url(r'^register/$', views.RegistrationView.as_view(), name='register'),
    url(r'^register/$',
    	default.CreateUser.as_view(),
    	name='register'), #/v1/auth/register/
    url(r'^password/$',
    	default.ChangePsw.as_view(),
    	name='set_password'), #/v1/auth/password/
    url(r'^logout/$',
        default.LogOut.as_view(),
        name='logout')#/v1/auth/logout
]


urlpatterns = [
    #url(r'^login/', rest_framework_jwt.views.obtain_jwt_token),
    url(r'^login/', default.ObtainJSONWebToken.as_view()),
    url(r'^api-token-verify/', 
    	rest_framework_jwt.views.verify_jwt_token),

] + base_urlpatterns
