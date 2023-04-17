from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import UserSerializer
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
import jwt
from datetime import datetime, timedelta
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .serializers.populated import PopulatedUserSerializer
from booking.models import Booking
from cali.serializers.common import CaliSerializer
from users.models import User

from lib.exceptions import exceptions

from django.contrib.auth import get_user_model


User = get_user_model()


# Create your views here.
class RegisterView(APIView):
    # Register Route
    # Endpoint: api/auth/register/
    @exceptions
    def post(self, request):
        # print('REQUEST DATA -> ', request.data)
        user_to_add = UserSerializer(data=request.data)
        print('REQUEST DATA -> ', request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response(user_to_add.data, status.HTTP_201_CREATED)


class LoginView(APIView):
    # Login Route
    # Endpoint: api/auth/login/
    @exceptions
    def post(self, request):
        # print(request.data)
        email = request.data['email']
        password = request.data['password']
        user_to_login = User.objects.get(email=email)
        # If the user is found, we want to check the password matches the hash we have in our database
        if not user_to_login.check_password(password):
            print('PASSWORDS DONT MATCH')
            raise PermissionDenied('Unauthorized')

        # At this point the user is validated, so we can send the token back
        dt = datetime.now() + timedelta(days=7)

        token = jwt.encode(
            {'sub':  user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256')
        print('TOKEN ->', token)
        return Response({'message': f"Welcome back, {user_to_login.username}", 'token': token})


class ProfileView(APIView):
    permission_classes = (IsAuthenticated, )
    # Endpoint '/api/auth/allusers'

    # def get(self, request):
    #     # print('GET /api/cali/ endpoint hit')
    #     user = User.objects.all()
    #     print(user)
    #     serialized_user = UserSerializer(user, many=True)
    #     return Response(serialized_user.data)

    # With this function, I am getting all the classes that one user has booked
    @exceptions
    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        bookings = Booking.objects.filter(user_id=user.id)
        cali_classes = [booking.cali for booking in bookings]
        serialized_user = PopulatedUserSerializer(user)
        serialized_cali_classes = CaliSerializer(cali_classes, many=True)
        data = {
            'user': serialized_user.data,
            'cali_classes': serialized_cali_classes.data
        }
        return Response(data)


class ProfileDetailView(APIView):
    permission_classes = (IsAuthenticated, )
    # Endpoint '/api/auth/profile/pk/'

    @exceptions
    def put(self, request, *args, **kwargs):
        user = request.user
        first_name = request.data.get('first_name', None)
        last_name = request.data.get('last_name', None)

        if not first_name and not last_name:
            return Response({'message': 'No updates provided.'}, status=status.HTTP_400_BAD_REQUEST)

        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name

        user.save()
        return Response({'message': 'User updated successfully.'}, status=status.HTTP_200_OK)
