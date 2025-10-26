# Use official Python base image
FROM python:3.12-slim

# Set work directory inside the container
WORKDIR /app

# Prevent Python from writing .pyc files and using stdout buffering
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies (PostgreSQL client, gcc for psycopg2)
RUN apt-get update && apt-get install -y \
    libpq-dev gcc netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements if you have one, else skip
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy entire project
COPY . /app/

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run entrypoint script on container start
ENTRYPOINT ["/entrypoint.sh"]
