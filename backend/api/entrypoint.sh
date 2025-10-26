#!/bin/sh

echo "Waiting for PostgreSQL to start..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.5
done

echo "PostgreSQL started ✅"

python manage.py migrate --noinput
python manage.py collectstatic --noinput

echo "Starting Django..."
exec "$@"
