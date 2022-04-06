# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image with tag "10"
# from Docker Hub.
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install npm
RUN npm install

# Bundle app source
COPY . .

# give execution permission
RUN chmod +x /usr/src/app/utils/wait-for-it.sh

# Expose port
EXPOSE 8080

# command to execute the server-a
CMD [ "npm", "start" ]