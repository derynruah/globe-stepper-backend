# Globe-Stepper API

This is an Express.js API created as part of the final project for the Command Shift full-stack development boot-camp final project. Created by Deryn Rushworth and Carla Slattery

The front-end repository can be found [here](https://github.com/CarlaSlattery/Globe-Stepper).

The API interacts with a sequelize database using CRUD operations to create users, challenges, and progress.

## Project Dependencies
- PostgresSQL
- Express.js
- Sequelize
- JSONwebtokens
- bcrypt
- cors
- dotenv
- nodemon

## Getting setup

Clone this repository and run ```npm i``` in the cloned folder.

Then using Docker, create a Postgres image and run  ```docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres``` in your terminal.

## Environment variables

To connect to the database you will need to make ```.env``` and ```.env.test``` files in the project root directory with the following:

```PGUSER=[server name]
PHOST=localhost
PGPASSWORD=[server password]
PGDATABASE=[database name]
PGPORT=5432
PORT=4000
```

## Routes

Use Postman to interact with the database send requests to ```localhost:4000/events```. Not all of the routes are needed to run the MVP of the app, but are there to build upon.

### /users

| Request | Route | Description |
| ----- | ----- | ----- |
|POST|```/users```| Creates a user in the database.|
|GET|```/users```| Gets all users in the database.|
|GET|```/users/:id```| Gets the specific user by id.|
|PATCH|```/users/:id```| Amends the specific user data by id.|
|DELETE|```/users/:id```| Removes the specific user in the database by id.|

### /challenges

| Request | Route | Description |
| ----- | ----- | ----- |
|POST|```/challenges```| Creates a challenge in the database.|
|GET|```/challenges```| Gets all challenges in the database.|
|GET|```/challenges/UserId/:user```| Gets the specific challenge by user id.|
|PATCH|```/challenges/UserId/:user```| Amends the specific challenge data by user id.|
|DELETE|```/challenges/UserId/:user```| Removes the specific challenge in the database by user id.|

### /progress

| Request | Route | Description |
| ----- | ----- | ----- |
|POST|```/progress```| Creates a progress entry in the database.|
|GET|```/progress```| Gets all progress entries in the database.|
|GET|```/progress/UserId/:user```| Gets the specific progress entries by user id.|
|PATCH|```/progress/UserId/:user```| Amends the specific progress entry data by user id.|
|DELETE|```/progress/UserId/:user```| Removes the specific progress entries in the database by user id.|

## Authors

| Name | Github |
| ----- | ----- |
|Deryn Rushworth|https://github.com/derynruah|
|Carla Slattery|https://github.com/CarlaSlattery|
