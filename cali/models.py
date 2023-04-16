from django.db import models

# Create your models here.


class Cali(models.Model):
    name_class = models.CharField(max_length=100)
    studio = models.CharField()
    time_class = models.TimeField()
    date_class = models.DateField()
    duration_class = models.CharField()
    instructor = models.ForeignKey(
        # the first positional argument in a FK field type is "to", syntax: appname.ModelClassName
        'instructor.Instructor',
        on_delete=models.CASCADE,
        # this field names the field on which all instructors will be populated on a reverse lookup
        related_name='cali'
    )
    owner = models.ForeignKey(
        # the first positional argument in a FK field type is "to", syntax: appname.ModelClassName
        'users.User',
        on_delete=models.CASCADE,
        # this field names the field on which all users will be populated on a reverse lookup
        related_name='cali'
    )

    def __str__(self):
        return f"{self.name_class} ({self.instructor}) ({self.time_class} {self.date_class})"
