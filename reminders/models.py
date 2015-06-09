from appointments.settings import celery_app
from django.conf import settings
from django.core.urlresolvers import reverse
from django.db import models

import arrow

class Appointment(models.Model):
    name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)
    time = models.DateTimeField()
    task_id = models.CharField(max_length=50, blank=True, editable=False)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Appointment #{0} - {1}'.format(self.pk, self.name)

    def get_absolute_url(self):
        return reverse('view_appointment', args=[str(self.id)])

    def get_task_id(self):
        return '{0}-{1}'.format(self.id, self.time)

    def schedule_reminder(self):
        appointment_time = arrow.get(self.time)
        reminder_time = appointment_time.replace(minutes=-settings.REMINDER_TIME - 1)

        from .tasks import send_sms_reminder
        result = send_sms_reminder.apply_async((self.pk,), eta=reminder_time)

        return result

    def save(self, *args, **kwargs):
        # Check if we have scheduled a reminder for this appointment before
        if self.task_id:
            # Revoke that task in case its time has changed
            celery_app.control.revoke(self.task_id)

        # Save our appointment, which populates self.pk, used in schedule_reminder
        super(Appointment, self).save(*args, **kwargs)

        # Schedule a new reminder task for this appointment
        result = self.schedule_reminder()
        self.task_id = result.id

        # Save our appointment again, with the new task_id
        super(Appointment, self).save(*args, **kwargs)
