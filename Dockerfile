# Use the lightest version of NodeJS
FROM node:alpine

# Specify working directory
WORKDIR /usr/src/app/awaks-dashboard

# Copy only the package.json
COPY package*.json /usr/src/app/awaks-dashboard/
# Install dependencies
RUN npm install

# If dependencies are installed, copy the rest of the project
COPY . /usr/src/app/awaks-dashboard
# Expose app port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]