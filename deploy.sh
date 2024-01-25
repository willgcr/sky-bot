#!/bin/bash

# Set the container name
CONTAINER_NAME="sky-bot-worker"

# Set the image name
IMAGE_NAME="sky-bot"

# The image version (get from terminal)
IMAGE_TAG="1.0.0"

# The port to map from the container
APP_PORT=""

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -p|--app-port)
        APP_PORT="$2"
        shift
        shift
        ;;
        *)
        echo "Unknown option: $1"
        exit 1
        ;;
    esac
done

# Check if the required arguments are provided
if [ -z "${APP_PORT}" ]; then
    echo "Error: App port is mandatory. Use -p or --app-port to specify the port."
    exit 1
fi

# Check if the container is already running
if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
    echo "Container '${CONTAINER_NAME}' is already running."
    exit 0
fi

# Check if the container exists but is stopped
if [ "$(docker ps -aq -f status=exited -f name=${CONTAINER_NAME})" ]; then
    echo "Removing stopped container '${CONTAINER_NAME}'."
    docker rm ${CONTAINER_NAME}
fi

# Run the container
docker run --pull never -d --name ${CONTAINER_NAME} \
    -p 127.0.0.1:${APP_PORT}:${APP_PORT} \
    ${IMAGE_NAME}:${IMAGE_TAG} > /dev/null 2>&1

# Check if the docker run command was successful
if [ $? -eq 0 ]; then
    # Display a message indicating the deployment
    echo "SkyBot v${IMAGE_TAG} - Container deployed \"${CONTAINER_NAME}\" on port ${APP_PORT}"
else
    # Display an error message
    echo "Error: Failed to deploy container \"${CONTAINER_NAME}\"."
fi