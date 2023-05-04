## Best Listens 

Best Listens is a social music rating app where you and your friends can rate songs and see what your community rates popular songs.

## Pre-requisites

Ensure you have [Docker Desktop downloaded](https://docs.docker.com/compose/install/#:~:text=Scenario%20one%3A%20Install%20Docker%20Desktop,Linux) and open to connect containers and images

## Start the app using Docker
Within the root directory, use the following command to start the applications:

### `$ docker-compose up`

Ensure that docker desktop is running 

Runs the app in the dockerized mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Starts the following containers in order:
- postgres
- musicMicroservice
- userMicroservice
- feedMicroservice
- front-end

## Test the app
Login details for test user<br />
username: tester<br />
password: Water123<br />

After logging in, the feed will generate with the most recent ratings of the followers you follow.