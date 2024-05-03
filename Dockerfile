# Use the official Node.js image as a base
FROM node:alpine

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code
COPY . ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
