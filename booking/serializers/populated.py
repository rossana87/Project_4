from .common import BookingSerializer
from cali.serializers.common import CaliSerializer
from users.serializers.common import UserSerializer


class PopulatedBookingSerializer(BookingSerializer):
    cali = CaliSerializer()


class PopulatedUserBookingSerializer(BookingSerializer):
    users = UserSerializer()
