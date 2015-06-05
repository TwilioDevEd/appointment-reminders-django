from django.core.urlresolvers import reverse
from django.db import models

class Appointment(models.Model):
    name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)
    time = models.DateTimeField()

    created = models.DateTimeField(auto_now_add=True)

    def get_absolute_url(self):
        return reverse('view_appointment', args=[str(self.id)])

    def __str__(self):
        return 'Appointment #{0} - {1}'.format(self.pk, self.name)
