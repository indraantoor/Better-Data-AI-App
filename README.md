<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Better Data AI - Backend Project</h3>

  <p align="center">
    A backend project to handle complete process. Transform your production data into privacy-preserving and highly realistic synthetic data. Share, access and build with data safely across teams, businesses, and international borders. 
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
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

## About The Project

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

- Your time should be focused on creating something amazing. A project that solves a problem and helps others
- You shouldn't be doing the same tasks over and over like creating a README from scratch
- You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

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

<!-- CONTACT -->

## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>
