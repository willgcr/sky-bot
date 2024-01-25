#!/bin/bash

# Set the image name
IMAGE_NAME="sky-bot"

# Initialize the image tag variable
IMAGE_TAG="1.0.0"

# Initialize username, password, and app port variables
USERNAME=""
PASSWORD=""
APP_PORT=""

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
	key="$1"
	case $key in
		-u|--username)
		USERNAME="$2"
		shift
		shift
		;;
		-p|--password)
		PASSWORD="$2"
		shift
		shift
		;;
		-a|--app-port)
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
if [ -z "${USERNAME}" ] || [ -z "${PASSWORD}" ] || [ -z "${APP_PORT}" ]; then
	echo "Error: Username, password, and app port are mandatory. Use -u, -p, and -a options to specify them."
	exit 1
fi

# Build the Docker image
docker build --build-arg USERNAME=${USERNAME} --build-arg PASSWORD=${PASSWORD} --build-arg APP_PORT=${APP_PORT} -t "${IMAGE_NAME}:${IMAGE_TAG}" .

# Check the exit status of the build command
if [ $? -eq 0 ]; then
	echo "Docker image '${IMAGE_NAME}:${IMAGE_TAG}' built successfully."
else
	echo "Error: Docker image build failed."
fi