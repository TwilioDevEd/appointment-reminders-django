from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

from reminders.views import AppointmentCreateView

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    url(r'^appointments$', TemplateView.as_view(template_name='reminders/list.html'), name='list_reminders'),
    url(r'^appointments/new$', AppointmentCreateView.as_view(), name='new_reminder'),

    url(r'^admin/', include(admin.site.urls)),
]
