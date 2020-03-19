# -------------------
# --- React setup ---
# -------------------

# Use the lightest version of NodeJS
FROM node:alpine AS build

# Specify working directory
WORKDIR /usr/src/app/awaks-dashboard

# Copy only the package.json
COPY package*.json /usr/src/app/awaks-dashboard/

# Install dependencies
RUN yarn

# If dependencies are installed, copy the rest of the project
COPY . /usr/src/app/awaks-dashboard

# Build the application
RUN yarn build
