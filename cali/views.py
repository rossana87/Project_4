from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#  used to convert the data into a python data type
from .serializers.common import CaliSerializer
# used to query the data
from .models import Cali


# Create your views here.
class CaliListView(APIView):
    def get(self, request):
        # print('GET /api/cali/ endpoint hit')
        cali = Cali.objects.all()
        serialized_cali = CaliSerializer(cali, many=True)
        return Response(serialized_cali.data)
