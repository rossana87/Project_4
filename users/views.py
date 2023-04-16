from django.shortcuts import render
from rest_framework.response import Response
from .serializers.common import UserSerializer
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
import jwt
from datetime import datetime, timedelta
from django.conf import settings

from lib.exceptions import exceptions

from django.contrib.auth import get_user_model
User = get_user_model()


# Create your views here.
