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




 # -------------------
 # --- Nginx setup ---
 # -------------------


FROM nginx:latest

#RUN apk add --no-cache certbot

# Remove old default nginx conf
RUN rm /etc/nginx/conf.d/default.conf

# Copy renew cron script
#COPY nginx/renew /etc/periodic/daily/renew
#RUN chmod +x /etc/periodic/daily/renew

#RUN mkdir /var/lib/certbot

# Copy entrypoint
#COPY nginx/entrypoint.sh /entrypoint.sh
#RUN chmod +x /entrypoint.sh

# nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy React build into `/var/www/`
COPY --from=build /usr/src/app/awaks-dashboard/build /var/www/awaks

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

#ENTRYPOINT [ "../entrypoint.sh" ]