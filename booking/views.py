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

    # Endpoint ''/api/booking/'
    @exceptions
    def get(self, request):
        booking = Booking.objects.all()
        serializer_booking = BookingSerializer(booking, many=True)
        return Response(serializer_booking.data)

    @exceptions
    def post(self, request):
        booked_class = BookingSerializer(
            data={**request.data, 'user_id': request.user.id})
        booked_class.is_valid(raise_exception=True)
        booked_class.save()
        return Response(booked_class.data, status=status.HTTP_202_ACCEPTED)


class BookedClassDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    # Endpoint ''/api/booking/pk/'
    # Get single booking
    def get(self, request, pk):
        booked_class = Booking.objects.get(pk=pk)
        serializer_booking = BookingSerializer(booked_class)
        return Response(serializer_booking.data)

    def delete(self, request, pk):
        booked_class = Booking.objects.get(pk=pk)
        booked_class.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
