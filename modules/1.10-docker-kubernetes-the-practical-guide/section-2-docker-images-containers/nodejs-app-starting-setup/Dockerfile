# FROM it's an image from docker hub that we're going to use it
FROM node

# Setting our default working directory, so later commands will be executed there.
WORKDIR /app

# To optimize the installing layers
COPY package.json /app

# Run commands for building the image, npm to install dependencies
RUN npm i

# Copy our files into the docker image/container
COPY . /app

# We expose the port 80 but It's by default 80 so It's not necessary to writ it.
EXPOSE 80

# Execute CMD commands when running container
CMD ["node","server.js"]

