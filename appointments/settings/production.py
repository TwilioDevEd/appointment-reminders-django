'''
Production settings

- Set secret key from environment variable
'''

from .common import *

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
