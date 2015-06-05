from django.core.urlresolvers import reverse_lazy
from django.views.generic import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView


from .models import Appointment

class AppointmentListView(ListView):
    model = Appointment

class AppointmentDetailView(DetailView):
    model = Appointment

class AppointmentCreateView(CreateView):
    model = Appointment
    fields = ['name', 'phone_number', 'time']

class AppointmentUpdateView(UpdateView):
    model = Appointment
    fields = ['name', 'phone_number', 'time']

class AppointmentDeleteView(DeleteView):
    model = Appointment
    success_url = reverse_lazy('list_appointments')
