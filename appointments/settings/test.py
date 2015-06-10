'''
Test settings

- Run in Debug mode
'''

from .common import *  # noqa

# Turn on DEBUG for tests
DEBUG = True

# Celery
CELERY_ALWAYS_EAGER = True
