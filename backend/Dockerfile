# Use an official Python runtime as a base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app/backend

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the local source files into the container at /usr/src/app/
COPY . .

# Specify the command to run on container start
CMD ["python", "main.py"]