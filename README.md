# Events_app

## About
An application that allows you to upload events in .csv format, do mailing for users specified in the uploaded file.

## Contents
1.[Structure](#Structure)

2.[Requirements](#Requirements)

3.[Installation](#Installation)

## Description

## Structure
```
events_app/
    ├── .env.example
    ├── .gitignore
    ├── Makefile
    ├── docker-compose.yml
    ├── Readme.md
    └── docker/
        └── Dockerfile
    ├── client
    ├── server
```

## Requirements
```
Node version: v18.17.1
Version npm: 9.6.7
Docker
docker-compose
```

## Installation

### clone the project

- https `https://github.com/Mylovydov/events_app.git`
- ssh `git@github.com:Mylovydov/events_app.git`


### Environment variables
You can find an example of the variables in `.env.example file`.
Type this command 
```
`cp .env.example .env` 
```
in the root of the project, then specify the variables in `KEY=VALUE` format

```  
---------------- DOCKER ---------------------
Specify the type of development.
ENVIRONMENT=local

Specify a user ID to create a user and group in the container
CURRENT_USER_ID=1000

---------------- MONGO --------------------
Specify the user that will be created when the database is initialized
MONGO_USER=example-user

Specify the password that will be used to connect to the database
MONGO_PASSWORD=87654321

Database name
MONGO_DB_NAME=app-name-example

Database host (in development mode, this must be the name of the database container)
MONGO_DB_HOST=event_app_db

Specify the url to connect to the database
MONGO_DB_URL=mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}

Specify the email and password for the user that will be used to log in to the system
BASE_APP_USER_EMAIL=user@example.com
BASE_APP_USER_PASSWORD=12345678

---------------- APP --------------------
Specify the port on which the client part of the application will be launched
CLIENT_PORT=3000

Specify the port on which the server part of the application will be launched
API_PORT=4200

Specify the url for the client and server part
SERVER_URL=http://localhost:${API_PORT}/api/trpc
CLIENT_URL=http://localhost:${CLIENT_PORT}

---------------- JWT --------------------
Specify the string to generate the access token
ACCESS_JWT_SECRET=access_secret

Specify the string to generate the refresh token
REFRESH_JWT_SECRET=refresh_secret

Specify the lifetime of the access token
ACCESS_JWT_EXPIRES_IN=15s

Specify the lifetime of the refresh token
REFRESH_JWT_EXPIRES_IN=30d
```  

### Makefile Commands
Enter commands in the root directory of the project
```bash
---------------- App Services ----------------
# Check the configuration of app services
make check
# Install all dependencies
make install
# Build an image based on Dockerfile
make build
# Up app services
make up
# Down app services
make down
# Restart app services
make restart