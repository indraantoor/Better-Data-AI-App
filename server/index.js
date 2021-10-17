require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const users = require("./routes/users");
const projects = require("./routes/projects");
const models = require("./routes/models");
const csvtojson = require("csvtojson");
const fs = require("fs");
const syntheticData = require("./models/syntheticData");
const { parse } = require("path");
const mongoose = require("mongoose");

// CONVERT TO CSV
const csvfilepath = "myfile.csv";
var temp;

csvtojson()
  .fromFile(csvfilepath)
  .then((json) => {
    // console.log(json);
    // fs.writeFileSync("output.json", JSON.stringify(json), "utf-8", (err) => {
    //   if (err) console.log(err);
    // });
    for (var x = 0; x < json; x++) {
      temp = parseInt(json[x].CLIENTNUM);
      json[x].CLIENTNUM = temp;
      temp = parse(json[x].Attrition_Flag);
      json[x].Attrition_Flag = temp;
    }

    syntheticData.insertMany({ data: json }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ok");
      }
    });
  });

const data = fs.readFileSync("output.json", "utf-8");
// console.log(data);

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
