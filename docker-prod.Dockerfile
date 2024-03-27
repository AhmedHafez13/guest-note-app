# Use Node.js base image with a specific version
FROM node:20-alpine AS builder

# Set working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy remaining project source code
COPY . .

# Use a different image for the production environment
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only the production dependencies and source code
COPY package.json ./
COPY --from=builder /app/node_modules /app/node_modules
COPY . .

# Expose the port on which the application listens
EXPOSE 8080

# Command to run the application 
CMD [ "npm", "start" ]
