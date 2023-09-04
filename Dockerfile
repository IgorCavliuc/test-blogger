# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the contents of the "src" directory to the container's working directory
COPY ./src ./src

# Install the application dependencies
RUN npm install

# Expose port 8080 for the application
EXPOSE 8080

# Specify the command to run your application
CMD ["node", "src/app.js"]
