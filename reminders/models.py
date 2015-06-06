from django.core.urlresolvers import reverse
from django.db import models

class Appointment(models.Model):
    name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)
    time = models.DateTimeField()

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Appointment #{0} - {1}'.format(self.pk, self.name)

    def get_absolute_url(self):
        return reverse('view_appointment', args=[str(self.id)])

    def save(self, *args, **kwargs):
        super(Appointment, self).save(*args, **kwargs)

        from .tasks import send_sms_reminder
        # send_sms_reminder.apply_async((self.pk,), task_id=self.pk)
