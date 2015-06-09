# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    replaces = [(b'reminders', '0001_initial'), (b'reminders', '0002_auto_20150604_2329'), (b'reminders', '0003_appointment_created'), (b'reminders', '0004_appointment_task_id')]

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=150)),
                ('phone_number', models.CharField(max_length=15)),
                ('time', models.DateTimeField()),
                ('created', models.DateTimeField(default=datetime.datetime(2015, 6, 5, 22, 44, 49, 395460, tzinfo=utc), auto_now_add=True)),
                ('task_id', models.CharField(max_length=50, blank=True)),
            ],
        ),
    ]
