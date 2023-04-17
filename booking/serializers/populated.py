from .common import BookingSerializer
from cali.serializers.common import CaliSerializer


class PopulatedBookingSerializer(BookingSerializer):
    cali = CaliSerializer()
