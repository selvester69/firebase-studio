#!/bin/bash

# Define the Docker image name
IMAGE_NAME="logistics-frontend"

# Define the container name
CONTAINER_NAME="logistics-frontend-container"

# Define the host port you want to map to the container's port 80
HOST_PORT=8080

# Build the frontend application (replace with your build command if different)
echo "Building frontend application..."
npm run build || { echo "Frontend build failed. Exiting."; exit 1; }

# Check if the container already exists and stop/remove it if it does
if [ $(docker ps -a -q -f name=$CONTAINER_NAME) ]; then
    echo "Stopping and removing existing container '$CONTAINER_NAME'..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Build the Docker image
echo "Building Docker image '$IMAGE_NAME'..."
docker build -t $IMAGE_NAME . || { echo "Docker image build failed. Exiting."; exit 1; }

# Run the Docker container
echo "Running Docker container '$CONTAINER_NAME' on port $HOST_PORT..."
docker run -d 
  -p $HOST_PORT:80 
  --name $CONTAINER_NAME 
  $IMAGE_NAME || { echo "Docker container failed to run. Exiting."; exit 1; }

echo "Frontend container '$CONTAINER_NAME' is running. Access at http://localhost:$HOST_PORT"