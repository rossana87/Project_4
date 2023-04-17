from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import InstructorSerializer

from .models import Instructor
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from lib.exceptions import exceptions

# Create your views here.


class InstructorView(APIView):
    # Endpoint ''/api/instructor/'
    @exceptions
    def get(self, request):
        instructor = Instructor.objects.all()
        serializer_instructor = InstructorSerializer(instructor, many=True)
        return Response(serializer_instructor.data)


class InstructorDetailView(APIView):
    # Endpoint ''/api/instructor/pk/'
    def get(self, request, pk):
        single_instructor = Instructor.objects.get(pk=pk)
        serializer_instructor = InstructorSerializer(single_instructor)
        return Response(serializer_instructor.data)
