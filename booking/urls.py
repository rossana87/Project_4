from django.urls import path
from .views import BookedClassesView, BookedClassDetailView

urlpatterns = [
    # path for this is /api/booking/
    path('', BookedClassesView.as_view()),
    path('<int:pk>/', BookedClassDetailView.as_view())
]
