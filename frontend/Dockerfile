# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the local files to the container's working directory
COPY . .

# Expose port 3333 to the outside world
EXPOSE 3333

# Command to run the application
CMD ["npm", "run", "serve"]
