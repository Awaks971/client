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




 # -------------------
 # --- Nginx setup ---
 # -------------------


FROM nginx:1.16-alpine

RUN apk add --no-cache certbot

# Remove old default nginx conf
RUN rm /etc/nginx/conf.d/default.conf


# Copy renew cron script
COPY nginx/renew /etc/periodic/daily/renew
RUN chmod +x /etc/periodic/daily/renew

RUN mkdir /var/lib/certbot

# Copy entrypoint
COPY nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf


# Copy React build into `/var/www/`
COPY --from=build /usr/src/app/awaks-dashboard/build/ /var/www/awaks/

ENTRYPOINT [ "../entrypoint.sh" ]