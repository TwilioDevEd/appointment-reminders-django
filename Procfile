web: gunicorn appointments.wsgi:application --log-file -
worker: celery -A appointments.settings worker -l info
