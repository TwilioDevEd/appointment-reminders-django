# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0002_auto_20150604_2329'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 6, 5, 22, 44, 49, 395460, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
    ]
