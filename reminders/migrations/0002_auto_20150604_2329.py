# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
    ]
