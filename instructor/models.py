from django.db import models
from django.core.validators import URLValidator

# Create your models here.


class Instructor(models.Model):
    instructor_name = models.CharField(max_length=100)
    profile_image = models.URLField(validators=[URLValidator()])

    def __str__(self):
        return self.instructor_name
