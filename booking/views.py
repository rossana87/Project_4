from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#  used to convert the data into a python data type
from .serializers.common import BookingSerializer
# used to query the data
from .models import Booking
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from lib.exceptions import exceptions

# Create your views here.


class BookedClassesView(APIView):
    permission_classes = (IsAuthenticated,)

    # @exceptions
    # def get(self, request):
    #     booking = Booking.objects.all()
    #     serializer_class = BookingSerializer(booking, many=True)
    #     return Response(serializer_class.data)

    @exceptions
    def post(self, request):
        request.data['user_id'] = request.user.id
        booked_class = BookingSerializer(data=request.data)
        if booked_class.is_valid():
            booked_class.save()
        return Response(booked_class.data, status.HTTP_202_ACCEPTED)
