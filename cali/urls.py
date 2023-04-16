from django.contrib import admin
from django.urls import path
from .views import CaliListView

urlpatterns = [
    path('', CaliListView.as_view())  # path for this is /api/cali/
]
