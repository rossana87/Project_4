from django.urls import path
from .views import BookedClassesView

urlpatterns = [
    # path for this is /api/booking/
    path('', BookedClassesView.as_view()),
]
