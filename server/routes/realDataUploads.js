const express = require("express");
const router = express.Router();
const realDataCsvToDb = require("../utils/realDataCsvToDb");

// TODO: Put uploadfile funct in diff file

// Folder where real-data csv files will be stored
const uploadsPath = "./uploads/real-data/";

// Gives the upload page for real data
router.get("/", (req, res) => {
  // res.sendFile(__dirname + "/realDataUpload.html");
  res.sendFile("realDataUpload.html", { root: "./views/RealDataUpload/" });
});

// TODO: Lower the number of parameters required here (use object)
// Handles upload of real data
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
      realDataCsvToDb(uploadsPath + filename, params);
      console.log(`Info: Uploaded Real Data File: ${filename}`);
    }
  });
};

router.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    const { userid, projectid, modelid } = req.body;
    console.log(`Info: Uploading Real Data File: ${filename}`);
    uploadFile(file, filename, userid, projectid, modelid);
    res.send("File Uploaded");
  }
});

module.exports = router;
