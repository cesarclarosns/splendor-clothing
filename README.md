# Splendor Clothing

![App](/.github/assets/app.gif)

This repository contains an ExpressJS server and a ReactJS app. Additionally, there is a Docker Compose file to easily run both applications together in a containerized environment.

## Folder Structure

- `server.js`: Contains the ExpressJS server.
- `client/`: Contains the ReactJS application.
- `compose.yml`: Docker Compose configuration file to orchestrate the containers.

## Getting Started

### Prerequisites

Before you can run the applications using Docker Compose, make sure you have the following software installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

### Running the Applications

Building images from source code.

```
docker compose -f compose.yaml up -d --build
```

This command will build and start the ExpressJS server that will serve the ReactJS application in one container.

Access the application in your web browser:

- ReactJS server: http://127.0.0.1:3000


To stop the container and remove the volumes, run:

```
docker compose -f .\compose.yaml down --volumes
```