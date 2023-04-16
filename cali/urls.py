from django.contrib import admin
from django.urls import path
from .views import AllCaliClassView

urlpatterns = [
    path('', AllCaliClassView.as_view())  # path for this is /api/cali/
]
