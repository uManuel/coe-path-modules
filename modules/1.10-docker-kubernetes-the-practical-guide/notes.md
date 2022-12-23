# Section 1: Getting started.


- **Docker**: Container technology: A tool for creating and managing containers.

- **Container:** A standardized unit of software that contains a package of code and dependencies to run that code (NodeJS code and NodeJS environment).

## Advantages of using Docker

- Allow us to move our app in different places, computers without changing his behavior because it's the same code and environment.
- Support for containers is supported into different OS.
- Docker simplifies the creation and management of containers.

## Why to use it?

- There are different Development & Production Environments that maybe need **NodeJS** 14 and others **Nodejs 13**
- Environment of your computer's team are different between them.
- It's easy to share.
- Eliminate clashing between tools.

## Virtual Machine vs Docker

Docker containers are similar than Virtual machine but slightly different.

- It's smaller because contains all the necessary engines to run the app.
- It's faster than VM, doesn't have to run unnecessary programs.
- Better for deployment because it's easier to run in a server.

## Installing

- Docker Desktop (Mac, Window) include Daemon && CLI
- Docker Toolbox (Mac, Windows) low specification include Daemon && CLI
- Docker Engine (Linux) include Daemon && CLI

Note!! When we install Docker in Mac and Windows It's not native, so have to install an VM to run the engine, that's why if we use Docker in Linux It's faster and easier.


Extra
- Docker compose, plugin to create more complex configuration
- Docker HUB, contains images to share and pull from

# Section 2: Images & Containers

A **container** It's the running unit of software.
An **image** It's a blueprint/template of software. Also containing Code and required tools and runtimes.

With an image we can run multiple containers in different servers and applications.

We can create our own image using other images like node, php, or others.

Basic Dockerfile

```DOCKERFILE
# FROM it's an image from docker hub that we're going to use it
FROM node

# Setting our default working directory, so later commands will be executed there.
WORKDIR /app

# Copy our files into the docker image/container
COPY . /app

# Run commands for building the image, npm to install dependencies
RUN npm i

# We expose the port 80 but It's by default 80 so It's not necessary to writ it.
EXPOSE 80

# Execute CMD commands when running container.
# If you don't specify your CMD it will execute the CMD of the base image.
CMD ["node","server.js"]
```

## Images

An image It's only read, so you can't update, if you want to update an image you have to rebuild another one.

An image it's composed by layers and all of those are cached, so if you have to run it again It's going to check if there is changes, if is not It's going to use the cached. Otherwise It's going to run it again and from that point all further commands are going to be re run.

- Instruction 1: #Layer 1
- Instruction 2: #Layer 2
- Instruction 3: #Layer 3



![image layer](https://user-images.githubusercontent.com/121119769/209197870-992679cc-f077-444a-8203-9b61aa21231c.png)

How works Images and Containers

NOTE!! Containers doesn't have a copy of the code, and Env, just run it using the extra layer of CMD.

![image-containers](https://user-images.githubusercontent.com/121119769/209204198-ecbc8677-4713-4652-83b7-fb12be298efa.png)

## Detached and attached containers

When we run `docker run imageID` we start with attached mode by default, we can change it with `docker run -d imageID`.

We can also attach it again to show error and logs with `docker attach nameContainer` online.

We can also log all the logs of a container with `docker log nameContainer`.

We can also log all the logs of a container with and attach with `docker log -f nameContainer`.

Also we can start a container with attach mode with `docker start -a containerName`.

## Interactive mode

If we want to create a container using a terminal app using input and output we have to use `docker run -it myContainerAppID`.

If we want to start a container using a  a terminal app using input and output we have to use `docker start -a -i myContainerAppID`

## Remove Stopped containers

We can remove stopped containers with `docker run -rm imageID`

## Copying files into/out container

We can copy from a docker container to your machine using `docker cp nameContainer:/folder /folder`

We can copy from your machine to the container who is running using `docker cp folder/. nameContainer:/folder `

## Sharing images

We can share images or only the docker file (with all the files), sharing images are easier because it's packaged into the image.

We can share images using Docker HUB or a private Registry.

So first we have to create an account in Docker

Then we have to create a repository.

Rename the image with the repository.

Login in docker with `docker login`

push the image with `docker push imageName:tag`

## 

# Command Sheet

show all running containers
```bash
docker ps
docker ps -a // all running
```

Create a new container using an image, if doesn't find one will download from docker hub.
```bash
docker run image
```
Stop and start docker

```bash
docker stop
docker start
```

Show images 
```bash
docker images
```
Build an image in the current folder using a `Dockerfile`
```bash
docker build .
```

Analyze image
```bash
docker image inspect
```

Docker remove image, only can be removed if an image don't have containers neither stopped or running.
```bash
docker rmi
docker prune images //delete all images that are not being used.
```

Remove docker container, only can be removed containers that are stopped
```bash
docker rm 
docker prune //remove all not running containers, images, volumes
```
Configured in detail
```bash
docker see
```

To name a container

```bash
docker run --name containerName idImage
```

Naming an image 
```bash
docker build -t name:tag .
```

To update the image, because using docker run don't update the image

```bash
docker pull nameImage:tag 
```

```bash
```

```bash
```

