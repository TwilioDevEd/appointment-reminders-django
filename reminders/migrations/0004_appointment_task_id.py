# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0003_appointment_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='task_id',
            field=models.CharField(max_length=50, blank=True),
        ),
    ]
