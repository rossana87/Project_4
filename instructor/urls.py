from django.urls import path
from .views import InstructorView, InstructorDetailView

urlpatterns = [
    # path for this is /api/instructor/
    path('', InstructorView.as_view()),
    path('<int:pk>/', InstructorDetailView.as_view())
]
