const express = require("express");
const router = express.Router();
const syntheticDataCsvToDb = require("../utils/syntheticDataCsvToDb");

const uploadsPath = "./uploads/synthetic-data/";
// const filePath = `./uploads/real-data/`;

// UPLOAD
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/syntheticDataUpload.html");
});

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
        // const filePath = `./uploads/${filename}`;
        syntheticDataCsvToDb(uploadsPath + filename);
        res.send("File Uploaded");
      }
    });
  }
});

module.exports = router;
