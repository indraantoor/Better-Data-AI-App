require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const users = require("./routes/users");
const projects = require("./routes/projects");
const models = require("./routes/models");
const upload = require("express-fileupload");
const realDataUploads = require("./routes/realDataUploads");
const syntheticDataUploads = require("./routes/syntheticDataUploads");

// Database Connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(upload());

// Routes
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/models", models);
app.use("/api/realdata/upload", realDataUploads);
app.use("/api/syntheticdata/upload", syntheticDataUploads);

// Port Information
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
