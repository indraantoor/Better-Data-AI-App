const csvtojson = require("csvtojson");
const syntheticData = require("../models/syntheticData");

// Synthetic Data Csv to mongodb

function syntheticDataCsvToDb(csvfilepath) {
  csvtojson()
    .fromFile(csvfilepath)
    .then((json) => {
      syntheticData.insertMany({ data: json }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success: Inserted Data Of Synthetic Data Into Database");
        }
      });
    });
}

module.exports = syntheticDataCsvToDb;
