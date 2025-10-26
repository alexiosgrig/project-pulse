FROM python:3.12-slim

WORKDIR /app

# Install dependencies needed for PostgreSQL and networking
RUN apt-get update && apt-get install -y \
    libpq-dev gcc netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY backend/api/requirements.txt /app/requirements.txt

# Install Python packages
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy Django backend source code
COPY backend/api /app

# Copy and enable entrypoint
COPY backend/api/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
