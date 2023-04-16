from django.db import models

# Create your models here.


class Booking(models.Model):
    name_class = models.CharField(max_length=50)
    instructor = models.CharField(max_length=50)
    cali = models.ForeignKey(
        # the first positional argument in a FK field type is "to", syntax: appname.ModelClassName
        'cali.Cali',
        on_delete=models.CASCADE,
        # this field names the field on which all bookings will be populated on a reverse lookup
        related_name='booking'
    )
    user_id = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='booking'
    )

    def __str__(self):
        return self.name_class
