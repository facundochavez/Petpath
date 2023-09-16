#!/bin/bash
export DJANGO_SETTINGS_MODULE=myproject.settings
exec gunicorn myproject.wsgi:application --bind 0.0.0.0:$PORT