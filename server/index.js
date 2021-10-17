require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const users = require("./routes/users");
const projects = require("./routes/projects");
const models = require("./routes/models");
const fs = require("fs");
const upload = require("express-fileupload");
const uploads = require("./routes/uploads");

// Database Connection
connection();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(upload());

// ROUTES
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/models", models);
app.use("/api/upload", uploads);

// LISTENING ON - PORT
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
