from .common import CaliSerializer
from instructor.serializers.common import InstructorSerializer


class PopulatedCaliSerializer(CaliSerializer):
    instructor = InstructorSerializer()
