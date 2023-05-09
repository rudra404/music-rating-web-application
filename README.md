# Best Listens 

Best Listens is a social music rating app where you and your friends can rate songs and see what your community rates popular songs.

This project is a proof-of-concept to explore the benefits of a microservice architecture. More details can be found in 'report.pdf'.

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
1. Before you login, you will be shown a page with limited view.
2. Click on the Login button and then click 'Register'
3. You may use these dummy details to sign up as a test user:<br />
username: tester<br />
email: test@test.com<br />
password: Water123<br />
4. Login with the same details to test the app - you will see more of the app functionality now
5. You may now register some more dummy users per steps 2 and 3 to test the following functionality. Also rate some songs while you're logged in as different users.
6. After logging in as 'tester', the feed will generate with the most recent ratings of the users you follow. You may also search for, and view their profiles.

