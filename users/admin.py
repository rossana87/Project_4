from django.contrib import admin
from django.contrib.auth import get_user_model

# Register your models here.

# get_user_model() returns back the Authentication Model that is currently in use
User = get_user_model()

# Register your models here.
admin.site.register(User)
