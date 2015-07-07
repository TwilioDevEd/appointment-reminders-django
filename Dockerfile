FROM python:3.4

# Configure local
RUN mkdir -p /usr/src/app

# Install requirements
COPY requirements.txt /usr/src/app/
RUN pip install -r /usr/src/app/requirements.txt

COPY . /usr/src/app
WORKDIR /usr/src/app

ENV DJANGO_SETTINGS_MODULE appointments.settings.docker

# Run collectstatic
RUN python manage.py collectstatic --noinput

# Set the C_FORCE_ROOT environment variable for the Celery process
ENV C_FORCE_ROOT true

EXPOSE 8000

CMD ["gunicorn", "appointments.wsgi:application", "--bind", "0.0.0.0:8000", "--log-file", "-"]
