# Serverless CAR

To implement this project, you need to implement a simple CAR application using AWS Lambda and Serverless framework. Search for all comments starting with the `CAR:` in the code to find the placeholders that you need to implement.

# Functionality of the application

This application will allow creating/removing/updating/fetching CAR items. Each CAR item can optionally have an attachment image. Each user only has access to CAR items that he/she has created.

# CAR items

The application should store CAR items, and each CAR item contains the following fields:

* `carId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a CAR item (e.g. "Change a light bulb")
* `dueDate` (string) - date and time by which an item should be completed
* `done` (boolean) - true if an item was completed, false otherwise
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a CAR item

You might also store an id of a user who created a CAR item.

# Functions to be implemented

To implement this project, you need to implement the following functions and configure them in the `serverless.yml` file:

* `Auth` - this function should implement a custom authorizer for API Gateway that should be added to all other functions.

* `GetCars` - should return all CARs for a current user. A user id can be extracted from a JWT token that is sent by the frontend


* `CreateCar` - should create a new CAR for a current user. A shape of data send by a client application to this function can be found in the `CreateCarRequest.ts` file




* `UpdateCar` - should update a CAR item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateCarRequest.ts` file



* `DeleteCar` - should delete a CAR item created by a current user. Expects an id of a CAR item to remove.


* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a CAR item.


All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.

You also need to add any necessary resources to the `resources` section of the `serverless.yml` file such as DynamoDB table and S3 bucket.


# Frontend

The `client` folder contains a web application that can use the API that should be developed in the project.

This frontend should work with your serverless application once it is developed, you don't need to make any changes to the code. The only file that you need to edit is the `config.ts` file in the `client` folder. This file configures your client application just as it was done in the course and contains an API endpoint and Auth0 configuration


## Authentication

To implement authentication in your application, you would have to create an Auth0 application and copy "domain" and "client id" to the `config.ts` file in the `client` folder. We recommend using asymmetrically encrypted JWT tokens.



# Grading the submission

Once you have finished developing your application, please set `apiId` and Auth0 parameters in the `config.ts` file in the `client` folder. A reviewer would start the React development server to run the frontend that should be configured to interact with your serverless application.




# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless CAR application.

