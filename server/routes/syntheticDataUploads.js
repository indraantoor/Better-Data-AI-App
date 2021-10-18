const express = require("express");
const router = express.Router();
const syntheticDataCsvToDb = require("../utils/syntheticDataCsvToDb");

// Folder where real-data csv files will be stored
const uploadsPath = "./uploads/synthetic-data/";

// Gives the upload page for synthetic data
router.get("/", (req, res) => {
  // res.sendFile(__dirname + "/syntheticDataUpload.html");
  res.sendFile("syntheticDataUpload.html", {
    root: "./views/SyntheticDataUpload/",
  });
});

// Uploads File
const uploadFile = (file, filename, userid, projectid, modelid) => {
  file.mv(uploadsPath + filename, function (err) {
    if (err) {
      console.log(`Error: Error Occured While Uploading File: ${filename}`);
      res.send(err);
    } else {
      console.log(
        `Info: Started Parsing And Inserting Into Database File: ${filename}`
      );
      const params = {
        filename: filename,
        User_id: userid,
        Project_id: projectid,
        Model_id: modelid,
      };
      syntheticDataCsvToDb(uploadsPath + filename, params);
      console.log(`Info: Uploaded Synthetic Data File: ${filename}`);
    }
  });
};

// Handles upload of real data
router.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;

    const { userid, projectid, modelid } = req.body;

    console.log(`Info: Uploading Synthetic Data File: ${filename}`);

    uploadFile(file, filename, userid, projectid, modelid);
    res.send("File Uploaded");
  }
});

module.exports = router;
