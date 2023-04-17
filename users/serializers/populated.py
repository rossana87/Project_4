from .common import UserSerializer
from ..models import User
from booking.serializers.common import BookingSerializer
from rest_framework.serializers import ModelSerializer
from cali.serializers.common import Cali


class PopulatedUserSerializer(ModelSerializer):
    cali_classes = BookingSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'cali_classes')
