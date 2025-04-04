# Use an official Python image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies for libraries like dlib
RUN apt-get update && apt-get install -y \
    cmake \
    build-essential \
    libboost-all-dev \
    python3-dev \
    libatlas-base-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the Flask project into the container
COPY . .

# Expose the port your Flask app will run on
EXPOSE 5000

# Use gunicorn to serve the Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
