from rest_framework.routers import DefaultRouter
from docker_django.apps.authentication.views.default import *

router = DefaultRouter()
router.register(r'users', UserViewSet)