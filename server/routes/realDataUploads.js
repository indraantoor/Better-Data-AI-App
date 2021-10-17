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
    var file = req.files.file;
    var filename = file.name;
    console.log(`Uploading Real Data File: ${filename}`);
    file.mv(uploadsPath + filename, function (err) {
      if (err) {
        console.log(`Error Occured While Uploading File: ${filename}`);
        res.send(err);
      } else {
        console.log(
          `Started Parsing And Inserting Into Database File: ${filename}`
        );
        realDataCsvToDb(uploadsPath + filename);
        console.log(`Uploaded Real Data File: ${filename}`);
        res.send("File Uploaded");
      }
    });
  }
});

module.exports = router;
