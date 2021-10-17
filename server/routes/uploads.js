const express = require("express");
const router = express.Router();
const realDataCsvToDb = require("../utils/realDataCsvToDb");

// UPLOAD
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.post("/", (req, res) => {
  if (req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;
    console.log(filename);
    file.mv("./uploads/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        const filePath = `./uploads/${filename}`;
        realDataCsvToDb(filePath);
        res.send("File Uploaded");
      }
    });
  }
});

module.exports = router;
