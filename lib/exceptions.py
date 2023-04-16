from functools import wraps
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied
from django.core.exceptions import ImproperlyConfigured
from rest_framework import status
from cali.models import Cali
from django.contrib.auth import get_user_model
User = get_user_model()

# This is a decorator function.
# It is a predefined function that wraps around an existing function, executing it,
# and will execute generic code that has been defined inside of the wrapper function itself


def exceptions(func):
    @wraps(func)
    # This function is essentially our wrapper function
    def wrapper(*args, **kwargs):
        try:
            # print('WRAPPER FUNCTION EXECUTED, TRYING TO EXECUTE CONTROLLER')
            return func(*args, **kwargs)
        except (User.DoesNotExist, PermissionDenied) as e:
            print(e.__class__.__name__)
            print(e)
            return Response({'detail': 'Unauthorized'}, status.HTTP_403_FORBIDDEN)
        except (NotFound, Cali.DoesNotExist) as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else {'detail': str(e)}, status.HTTP_404_NOT_FOUND)
        except (ValidationError, ImproperlyConfigured) as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else {'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else {'detail': str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    return wrapper
