const syntheticDataCsvToDb = require("../utils/syntheticDataCsvToDb");

// Folder where synthetic-data csv files will be stored
const uploadsPath = "./uploads/synthetic-data/";

const uploadFile = (uploadparameters) => {
  const { file, filename, userid, projectid, modelid } = uploadparameters;
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

// Adds additional information to the mongodb object and then passes it to upload's the file
const processAndUpload = (req, res) => {
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
};

module.exports = { uploadFile, processAndUpload };
