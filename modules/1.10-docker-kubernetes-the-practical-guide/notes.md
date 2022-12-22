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




## Command Sheet

show all running containers
```bash
docker ps
```

Show all containers
```bash
docker ps -a 
```

Create a new container using an image, if doesn't find one will download from docker hub.
```bash
docker run node
```

Show images 
```bash
docker image ls
```