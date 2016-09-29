from django.core.exceptions import ValidationError
from django.test import TestCase
from model_mommy import mommy

from .models import Appointment
from .tasks import send_sms_reminder

import arrow

# Import Mock if we're running on Python 2
import six

if six.PY3:
    from unittest.mock import patch
else:
    from mock import patch


class AppointmentTest(TestCase):

    def test_str(self):
        # Arrange
        appointment = mommy.make(Appointment, name='John')

        # Assert
        self.assertEqual(str(appointment), 'Appointment #{0} - {1}'
            .format(appointment.pk, appointment.name))

    def test_get_absolute_url(self):
        # Arrange
        appointment = mommy.make(Appointment)

        # Assert
        self.assertEqual(appointment.get_absolute_url(),
            '/appointments/{0}'.format(appointment.pk))

    def test_clean_invalid_appointment(self):
        # Arrange
        time_in_past = arrow.utcnow().replace(minutes=-10)
        appointment = mommy.make(Appointment, time=time_in_past.datetime, time_zone='UTC')

        # Assert
        with self.assertRaises(ValidationError):
            appointment.clean()

    def test_clean_valid_appointment(self):
        # Arrange
        time_in_future = arrow.utcnow().replace(minutes=+10)
        appointment = mommy.make(Appointment, time=time_in_future.datetime, time_zone='UTC')

        # Assert
        try:
            appointment.clean()
        except ValidationError:
            self.fail('appointment with time in the past raised ValidationError')

    def test_schedule_reminder(self):
        # Arrange
        appointment = mommy.make(Appointment)

        # Act
        with patch.object(send_sms_reminder, 'apply_async') as mock:
            appointment.schedule_reminder()

        # Assert
        self.assertTrue(mock.called)

    def test_save_initial_creation(self):
        # Act
        with patch.object(Appointment, 'schedule_reminder', return_value=123) as mock:
            appointment = mommy.make(Appointment)

        # Assert
        self.assertTrue(mock.called)
        self.assertEqual(appointment.task_id, 123)

    def test_save_revoke_existing_task(self):
        # Arrange
        appointment = mommy.make(Appointment)

        # Act
        with patch('appointments.settings.celery_app.control.revoke') as mock:
            appointment.save()

        # Assert
        self.assertTrue(mock.called)


class SendReminderTest(TestCase):

    def test_create_message(self):
        # Arrange
        appointment = mommy.make(Appointment)

        # Act
        with patch('twilio.rest.api.v2010.account.message.MessageList.create') as mock:
            send_sms_reminder(appointment.pk)

        # Assert
        self.assertTrue(mock.called)

    def test_deleted_appointment(self):
        # Arrange
        appointment = mommy.make(Appointment)
        appointment.delete()

        # Act
        with patch('twilio.rest.api.v2010.account.message.MessageList.create') as mock:
            send_sms_reminder(appointment.pk)

        # Assert
        self.assertFalse(mock.called)
