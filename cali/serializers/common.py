from rest_framework.serializers import ModelSerializer
# import the model to serialize from
from ..models import Cali

# Create custom Serializer extending ModelSerializer that will convert our querysets into python data types and vice versa


class CaliSerializer(ModelSerializer):
    # This will include a Meta subclass that specifies the model we're querying and the fields we want to serialize/deserialize
    class Meta:
        # this is the model to query when making requests
        model = Cali
        # __all__ allows us to include all fields rather than specifying them individually.
        # You can use a list or tuple of names of fields as strings if you want to be specific
        fields = '__all__'
