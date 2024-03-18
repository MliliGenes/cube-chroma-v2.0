# Use an official Node runtime as a base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the remaining project files to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]
