#!/bin/bash

python manage.py makemigrations
python manage.py makemigrations authentication
python manage.py makemigrations corsheaders
python manage.py migrate
