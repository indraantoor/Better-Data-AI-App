const express = require("express");
const router = express.Router();
const realDataCsvToDb = require("../utils/realDataCsvToDb");

const uploadsPath = "./uploads/real-data/";
// const filePath = `./uploads/real-data/`;

// UPLOAD
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/realDataUpload.html");
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
        realDataCsvToDb(uploadsPath + filename);
        res.send("File Uploaded");
      }
    });
  }
});

module.exports = router;
