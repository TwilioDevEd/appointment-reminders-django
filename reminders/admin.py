from django.contrib import admin

from .models import Appointment

admin.site.register(Appointment, admin.ModelAdmin)
