from django.contrib import admin
from django.urls import path
from .views import AllCaliClassView, CaliClassDetailView

urlpatterns = [
    # path for this is /api/cali/
    path('', AllCaliClassView.as_view()),
    # path for this is /api/cali/pk/
    path('<int:pk>/', CaliClassDetailView.as_view())
]
