# Use the official Node.js image with the current version and Alpine Linux
FROM node:current-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy config files
COPY package*.json ./
COPY babel.config.js ./
COPY .env.example ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY src ./src

# Application setup variables
ARG USERNAME
ARG PASSWORD
ARG APP_PORT

# Set environment variables
ENV USERNAME=${USERNAME}
ENV PASSWORD=${PASSWORD}
ENV APP_PORT=${APP_PORT}

# Build the application
RUN npm run build

# Setup the application
RUN npm run setup ${USERNAME} ${PASSWORD} ${APP_PORT}

# Expose the port your app runs on
EXPOSE ${APP_PORT}

# Command to run your application
CMD ["npm", "run", "dist"]