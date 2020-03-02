#!/bin/sh

# Get certs
certbot certonly -n -d 360.awaks.fr \
  --standalone --preferred-challenges http --email nicolas.leroy@hetic.net --agree-tos --expand

# Kick off cron
/usr/sbin/crond -f -d 8 &

# Start nginx
/usr/sbin/nginx -g "daemon off;"