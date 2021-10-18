const express = require("express");
const router = express.Router();
const realDataCsvToDb = require("../utils/realDataCsvToDb");
const uploadFile = require("../controllers/realDataUploadsController");

// Upload page for real data
router.get("/", (req, res) => {
  // res.sendFile(__dirname + "/realDataUpload.html");
  res.sendFile("realDataUpload.html", { root: "./views/RealDataUpload/" });
});

router.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    const { userid, projectid, modelid } = req.body;
    console.log(`Info: Uploading Real Data File: ${filename}`);
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
