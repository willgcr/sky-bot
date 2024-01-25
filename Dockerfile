# Use the official Node.js image with the current version and Alpine Linux
FROM node:current-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY src ./src

# Application setup variables
ARG USERNAME
ARG PASSWORD
ARG APP_PORT

# Set environment variables (only available during the build)
ENV USERNAME=${USERNAME}
ENV PASSWORD=${PASSWORD}
ENV APP_PORT=${APP_PORT}

# Setup the application
RUN npm run setup ${USERNAME} ${PASSWORD} ${APP_PORT}

# Expose the port your app runs on
EXPOSE ${APP_PORT}

# Command to run your application
CMD ["npm", "run", "dist"]