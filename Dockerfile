# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install any needed dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port (this can still be customized during runtime)
EXPOSE 8080 8081

# Keep the container running
# CMD ["node", "l7fw_stream.js"]
CMD node l7fw_stream.js & node l7fw_stream_net.js
