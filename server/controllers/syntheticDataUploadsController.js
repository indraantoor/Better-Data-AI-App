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

module.exports = uploadFile;
