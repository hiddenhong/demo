# AUTHapp


# SETUP

- Build Docker: `docker-compose build`
- Start docker container: `docker-compose up -d`
- Enter auth Docker: `docker exec -it dockerorchastration_web_1 bash`
- Make database migration files and migrate database: `source migration.sh`
- Run test: `docker exec -it dockerorchastration_web_1 bash`　--> `python manage.py test docker_django.apps.authentication.tests`
- Modify test data: go to same directory with manage.py, find "test_data.json", modify this file to change test data
