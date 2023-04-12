## Best Listens Dockerized App

This is the version of Best Listens with user auth containerized within docker.

## Pre-requisites

Ensure you have [Docker Desktop downloaded](https://docs.docker.com/compose/install/#:~:text=Scenario%20one%3A%20Install%20Docker%20Desktop,Linux) and open to connect containers and images

You will need Flask library installed for python (pip install flask)

## Start the app using Docker
Within the root directory, use the following command to start the applications:

### `$ docker-compose up`

Runs the app in the dockerized mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Starts the following containers in order:
- postgres
- userMicroservice
- front-end
