from __future__ import absolute_import

from celery import shared_task
from django.conf import settings
from twilio.rest import TwilioRestClient

from .models import Appointment

# To find these visit https://www.twilio.com/user/account
client = TwilioRestClient(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

@shared_task
def send_sms_reminder(appointment_id):
    """Send a reminder to a phone using Twilio SMS"""
    # Get our appointment from the database
    try:
        appointment = Appointment.objects.get(pk=appointment_id)
    except Appointment.DoesNotExist:
        # The appointment we were trying to remind someone about
        # has been deleted, so we don't need to do anything
        return

    body = 'Hi {0}. You have an appointment coming up at {1}.'.format(
        appointment.name,
        appointment.time
    )

    message = client.messages.create(
        body=body,
        to=settings.TWILIO_NUMBER,
        from_="+15105551234",
    )
