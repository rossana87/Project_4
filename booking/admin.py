from django.contrib import admin

# To register a model it needs to be importated
from .models import Booking

# Register your models here.
admin.site.register(Booking)
