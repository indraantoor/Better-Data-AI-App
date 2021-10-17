const csvtojson = require("csvtojson");
const realData = require("../models/realData");

// Real Data Csv to mongodb

function realDataCsvToDb(csvfilepath) {
  csvtojson()
    .fromFile(csvfilepath)
    .then((json) => {
      realData.insertMany({ data: json }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("ok");
        }
      });
    });
}

module.exports = realDataCsvToDb;
