from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

from reminders.views import AppointmentListView, AppointmentCreateView, AppointmentDetailView

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    url(r'^appointments$', AppointmentListView.as_view(), name='list_appointments'),
    url(r'^appointments/new$', AppointmentCreateView.as_view(), name='new_appointment'),
    url(r'^appointments/(?P<pk>[0-9]+)/$', AppointmentDetailView.as_view(), name='view_appointment'),

    url(r'^admin/', include(admin.site.urls)),
]
