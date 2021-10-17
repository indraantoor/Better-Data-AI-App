require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const users = require("./routes/users");
const projects = require("./routes/projects");
const models = require("./routes/models");
const fs = require("fs");

// Database Connection
connection();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/models", models);

// LISTENING ON - PORT
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
