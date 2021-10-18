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
const realdatas = require("./routes/realdatas");
const syntheticdatas = require("./routes/syntheticdatas");

// TODO: FIX DELETES FOR EVERYTHING
// TODO FIX UPDATE FOR EVERYTHING
// TODO ADD BASIC AUTHORIZATION (Only when updating and deleting)
// TODO ADD API TO SEE ALL CSV FILES (BOTH REAL AND SYNTHETIC DATA) (UD API FOR IT)
// TODO FIGURE OUT A WAY TO LINK THESE DOCUMENTS TO USER (USER ID OR ANYTHING) - Potential Solution is middleware
// TODO: MAKE MAIN API "....S"
// TODO CODE CLEANUP

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

// Routes for csv files
app.use("/api/realdatas", realdatas);
app.use("/api/syntheticdatas", syntheticdatas);

// Routes for uploading csv files
app.use("/api/realdata/upload", realDataUploads);
app.use("/api/syntheticdata/upload", syntheticDataUploads);

// Port Information
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
