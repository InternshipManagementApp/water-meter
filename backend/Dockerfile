# Use an official Python runtime as a base image
FROM python:3.9-slim

# Install OpenGL dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Install GLib dependencies
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the local source files into the container at /usr/src/app/
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port available to the world outside this container
# EXPOSE 8000

# Run app.py when the container launches
CMD ["uvicorn", "main:api", "--host", "0.0.0.0", "--port", "8000"]