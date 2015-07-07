'''
Docker settings

- Use special Docker settings for Postgres connection
- Use Docker address for Redis instance
'''

from .common import *

DEBUG = True

# SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# Allow all hosts, so we can run on PaaS's like Heroku
ALLOWED_HOSTS = ['*']

# Settings for the official Postgres Docker image
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'postgres'
    }
}


# Address of Docker container running Redis
BROKER_URL = 'redis://redis:6379/0'
