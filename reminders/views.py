from django.views.generic import DetailView
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView

from .models import Appointment

class AppointmentListView(ListView):
    model = Appointment

class AppointmentCreateView(CreateView):
    model = Appointment
    fields = ['name', 'phone_number', 'time']

class AppointmentDetailView(DetailView):
    model = Appointment
