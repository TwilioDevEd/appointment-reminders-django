from __future__ import absolute_import

import arrow
import dramatiq

from django.conf import settings
from twilio.rest import Client

from .models import Appointment


# Uses credentials from the TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
# environment variables
client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)


@dramatiq.actor
def send_sms_reminder(appointment_id):
    """Send a reminder to a phone using Twilio SMS"""
    # Get our appointment from the database
    try:
        appointment = Appointment.objects.get(pk=appointment_id)
    except Appointment.DoesNotExist:
        # The appointment we were trying to remind someone about
        # has been deleted, so we don't need to do anything
        return

    appointment_time = arrow.get(appointment.time, appointment.time_zone.zone)
    body = 'Hi {0}. You have an appointment coming up at {1}.'.format(
        appointment.name,
        appointment_time.format('h:mm a')
    )

    client.messages.create(
        body=body,
        to=appointment.phone_number,
        from_=settings.TWILIO_NUMBER,
    )
