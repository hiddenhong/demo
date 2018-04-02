from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

import re

email_re = re.compile(r"^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$", re.IGNORECASE)

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, username=None, password=None):
    	if email_re.search(username):
    		kwargs = {'email':username}
    	else:
    		kwargs = {'username':username}

    	try:
    		user = get_user_model().objects.get(**kwargs)
    		if user.check_password(password):
    			return user
    	except get_user_model().DoesNotExist:
    	 	return None
