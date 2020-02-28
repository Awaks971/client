# -------------------
# --- React setup ---
# -------------------

# Use the lightest version of NodeJS
FROM node:12.4 AS build

# Specify working directory
WORKDIR /usr/src/app/awaks-dashboard

# Copy only the package.json
COPY package*.json /usr/src/app/awaks-dashboard/

# Set ENV
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

# Install dependencies
RUN yarn

# If dependencies are installed, copy the rest of the project
COPY . /usr/src/app/awaks-dashboard

# Build the application
RUN yarn build


# Copy React build into `/usr/share/nginx/html/`
COPY --from=build /usr/src/app/awaks-dashboard/build/ /usr/share/nginx/html/
