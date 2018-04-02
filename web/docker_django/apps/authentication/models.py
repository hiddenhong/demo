from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
import os
import hashlib

class TsingUserManager(BaseUserManager):

    def _create_user(self, email, password,
                     is_admin, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """

        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,
                          is_admin=is_admin,
                          date_joined=now,
                          **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, False,
                                 **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True,
                                 **extra_fields)


class TsingUser(AbstractBaseUser):

    # Fields
    username = models.CharField(
        verbose_name="username",
        max_length=255,
        unique=True,
    )

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
    )

    name = models.CharField(
        verbose_name='name',
        max_length=255,
    )
    
    is_admin = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user is admin.')
    )

    is_active = models.BooleanField(default=True)
    
    date_joined = models.DateTimeField(
        _('date joined'),
        default=timezone.now
    )

    sso_password = models.CharField(
        max_length = 255,
    )

    objects = TsingUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [
        'name',
        'email',
    ]

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):              # __unicode__ on Python 2
        return "id:%s sid: %s email: %s" % (self.id, self.sid, self.email)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
