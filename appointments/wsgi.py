"""
WSGI config for appointments project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

# Use our production settings as our default settings, which is most secure
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "appointments.settings.production")

# Get a WSGI application for our project
application = get_wsgi_application()

# Use Whitenoise to serve static files
# See: https://whitenoise.readthedocs.org/
application = DjangoWhiteNoise(application)
