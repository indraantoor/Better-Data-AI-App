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

// UPLOAD
app.get("/api/upload", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/upload", (req, res) => {
  if (req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;
    console.log(filename);
    file.mv("./uploads/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("File Uploaded");
      }
    });
  }
});

// LISTENING ON - PORT
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
