from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.urlpatterns import format_suffix_patterns
from apps.api.v1 import routers

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('docker_django.apps.todo.urls')),

    # Admin
    url(r'^admin/', include(admin.site.urls)),
    # Auth
    url(r'^v1/auth/', include('docker_django.apps.authentication.urls')),
    # API
    url(r'^v1/', include(routers.router.urls)),
]
