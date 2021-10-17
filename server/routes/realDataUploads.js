const express = require("express");
const router = express.Router();
const realDataCsvToDb = require("../utils/realDataCsvToDb");

// Folder where real-data csv files will be stored
const uploadsPath = "./uploads/real-data/";

// Gives the upload page for real data
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/realDataUpload.html");
});

// Handles upload of real data
router.post("/", (req, res) => {
  if (req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;
    console.log(filename);
    file.mv(uploadsPath + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        realDataCsvToDb(uploadsPath + filename);
        res.send("File Uploaded");
      }
    });
  }
});

module.exports = router;
