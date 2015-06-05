from django.views.generic.edit import CreateView

from .models import Appointment

class AppointmentCreateView(CreateView):
    model = Appointment
    fields = ['name', 'phone_number', 'time']
