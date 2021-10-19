<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Better Data AI - Backend Project</h3>

  <p align="center">
    A backend project to handle complete process. Transform your production data into privacy-preserving and highly realistic synthetic data. Share, access and build with data safely across teams, businesses, and international borders. 
    <br />
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- Node.js
- Express.js
- Mongoose
- MongoDB
- Json Web Token
- Joi
- Csv To Json

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```
- Node
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/indraantoor/Better-Data-AI-App
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Go to the server directory and start the server:

```sh
npm start
```

Everything is linked to a jwt token which is generated on the object id of the user.

In future it can be used to implement authentication and authorization feature.

## User

### Create A User

```sh
Route: http://localhost:8080/api/users
Request: Post
```

To create a user you need to pass in json containing the "username", "email" as key in the key value pair.

Both are required to create a create a user in the database.

In case of missing value or error you will see it in postman response body.

### Creating The User

![Create User Request](/Images/User/createuserrequest.png)

Database Screenshot

![Create User Request](/Images/User/createuserdb.png)

<p align="right">(<a href="#top">back to top</a>)</p>

### Get A Particular User

You need to pass the object id. You will get a json response containing information about user.

```sh
Route: http://localhost:8080/api/users/{ObjectId}
Request: Get
```

![Create User Request](/Images/User/getparticularuser.png)

### Update User Details

```sh
Route: http://localhost:8080/api/users/{ObjectId}
Request: Put
```

To update a user you need to pass in json containing the "username" as key in the key value pair.

![Create User Request](/Images/User/updateuserrequest.png)

Database
![Create User Request](/Images/User/updateuserdb.png)

### Delete User

```sh
Route: http://localhost:8080/api/users/{ObjectId}
Request: Delete
```

Deleting a user also deletes all of the projects, models and csv file's data which are linked to it.

![Create User Request](/Images/User/deleteuserrequest.png)

Database
![Create User Request](/Images/User/deleteuserdb.png)

## Project

To work with projects of a user you need to pass in the jwt token of the user.

If you dont provide it you will get unauthorized error.

Only the user who has created the project can perform update, delete operations on it otherwise you will get a response of not allowed.

### Get token of the user

```sh
Route: http://localhost:8080/api/users
Request: Get
```

You need to give the email of the user as key in key value pair of json.

![Create User Request](/Images/Project/usertoken.png)

Now use this token in authorization
and type is "Bearer Token".

### Creating Project

```sh
Route: http://localhost:8080/api/projects
Request: Post
```

Pass the name of the project as "project_name" as key in key value pair of json.

![Create User Request](/Images/Project/createproject.png)

Database
![Create User Request](/Images/Project/createprojectdb.png)

### Get All Projects Under A User

```sh
Route: http://localhost:8080/api/projects
Request: Get
```

It gets all the projects of user using jwt token.

Response also includes additional information about who created it.

![Create User Request](/Images/Project/getprojects1.png)
![Create User Request](/Images/Project/getprojects2.png)

### Get A Particular Project Under A User

```sh
Route: http://localhost:8080/api/projects/{ObjectId}
Request: Get
```

![Create User Request](/Images/Project/getAproject.png)

### Update Project

```sh
Route: http://localhost:8080/api/projects/{ObjectId}
Request: Put
```

Only the user who created it can perform update, delete operations on the project.

Pass the project name by passing the project_name as key in key value pair of json.

Else you get unauthorized as response.

![Create User Request](/Images/Project/projectupdaterequest.png)

Before
![Create User Request](/Images/Project/getAproject.png)

After
![Create User Request](/Images/Project/updatedproject.png)

Database
![Create User Request](/Images/Project/updatedb.png)

### Delete Project

```sh
Route: http://localhost:8080/api/projects/{ObjectId}
Request: Delete
```

Deleting project also delete models and csv file data linked to it.

![Create User Request](/Images/Project/deleteproj.png)

Db Before
![Create User Request](/Images/Project/updatedb.png)

Db After
![Create User Request](/Images/Project/dbdeleteafter.png)

## Real Data Csv Processing

Goto the upload page and enter the project id and user id

![Create User Request](/Images/RealData/uploadpage.png)

It automatically processes the csv file and saves it to database with row's being items as array of objects.

Database
![Create User Request](/Images/RealData/db1.png)
![Create User Request](/Images/RealData/db2.png)

### Get all real data csv files under a project

```sh
Route: http://localhost:8080/api/realdatas
Request: Get
```

Pass the object id of the project as Project_id.

{
"Project_id" : "enter id"
}

### Get a particular real data csv file data under a project

```sh
Route: http://localhost:8080/api/realdatas/{objectid}
Request: Get
```

### Update a particular real data filename data under a project

```sh
Route: http://localhost:8080/api/realdatas/{objectid}
Request: Put
```

Give the updated file name in json.
By default filename is the name of the upload file

{
"filename": "enternameoffile"
}

Database

Before
![Create User Request](/Images/RealData/dbbefore.png)

After
![Create User Request](/Images/RealData/dbafter.png)

### Delete real data filename data under a project

Pass object id of that real data csv file.

```sh
Route: http://localhost:8080/api/realdatas/{objectid}
Request: Delete
```

## Models

### Creating A Model

```sh
Route: http://localhost:8080/api/models
Request: Post
```

Pass in the following info in json

{
"Project_id": "projectobjectid",
"model_name": "your model name",
"parameters": {
"batch_size": number,
"training_cycle": number
}
}

Database
![Create User Request](/Images/Model/model1.png)

### Get all models under a project

```sh
Route: http://localhost:8080/api/models
Request: Get
```

Pass info as json:
{
"Project_id": "id of project"
}

### Get a particular model

```sh
Route: http://localhost:8080/api/models/{objectid}
Request: Get
```

### Delete a particular model

It also deletes synthetic data files linked to it.

```sh
Route: http://localhost:8080/api/models/{objectid}
Request: Delete
```

### Update a model

```sh
Route: http://localhost:8080/api/models/{objectid}
Request: Delete
```

Pass in the updated value of the thing you want to update. Using the following keys as reference.

{
"Project_id": "projectobjectid",
"model_name": "your model name",
"parameters": {
"batch_size": number,
"training_cycle": number
}
}

## Synthetic Data

### Upload Page

```sh
Route: http://localhost:8080/api/syntheticdata/upload
```

Goto the upload page and enter the project id, user id and model id.

When front end is implemented they can send these values.

It automatically processes the csv file and saves it to database with row's being items as array of objects.

![Create User Request](/Images/SyntheticData/syn1.png)

![Create User Request](/Images/SyntheticData/syn2.png)

### Get all synthetic data under model

```sh
Route: http://localhost:8080/api/syntheticdatas
Request: Get
```

Pass in the model id in json as:

{
"Model_id": "id of the model"
}

### Get a particular synthetic data under model

```sh
Route: http://localhost:8080/api/syntheticdatas/{objectid}
Request: Get
```

### Delete a particular synthetic data under model

```sh
Route: http://localhost:8080/api/syntheticdatas/{objectid}
Request: Delete
```

Database

Before
![Create User Request](/Images/SyntheticData/syn1.png)

After
![Create User Request](/Images/SyntheticData/syn3.png)
