const express = require("express");
const router = express.Router();
const syntheticDataCsvToDb = require("../utils/syntheticDataCsvToDb");
const uploadFile = require("../controllers/syntheticDataUploadsController");

// Upload page for synthetic data
router.get("/", (req, res) => {
  // res.sendFile(__dirname + "/syntheticDataUpload.html");
  res.sendFile("syntheticDataUpload.html", {
    root: "./views/SyntheticDataUpload/",
  });
});

// Handles upload of real data
router.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    const { userid, projectid, modelid } = req.body;
    console.log(`Info: Uploading Synthetic Data File: ${filename}`);
    const uploadparameters = {
      file: file,
      filename: filename,
      userid: userid,
      projectid: projectid,
      modelid: modelid,
    };
    uploadFile(uploadparameters);
    res.send("File Uploaded");
  }
});

module.exports = router;
