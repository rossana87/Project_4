from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from lib.exceptions import exceptions
#  used to convert the data into a python data type
from .serializers.common import CaliSerializer
# used to query the data
from .models import Cali


# Create your views here.
class AllCaliClassView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # Endpoint ''/api/cali/'
    @exceptions
    def get(self, request):
        # print('GET /api/cali/ endpoint hit')
        cali = Cali.objects.all()
        serialized_cali = CaliSerializer(cali, many=True)
        return Response(serialized_cali.data)


# View is for /api/cali/:pk
class CaliClassDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request, pk):
        cali = Cali.objects.get(pk=pk)
        serialized_cali = CaliSerializer(cali)
        return Response(serialized_cali.data)
