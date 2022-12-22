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