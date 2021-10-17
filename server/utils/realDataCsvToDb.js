const csvtojson = require("csvtojson");
const realData = require("../models/realData");

// Insert into database
function insertdata(json, params) {
  const realDataObj = new realData({
    ...params,
    data: json,
  });
  realData.insertMany(realDataObj, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success: Inserted Data Of Real Data Into Database");
    }
  });
}

// Convert Csv to json
function realDataCsvToDb(csvfilepath, params) {
  csvtojson()
    .fromFile(csvfilepath)
    .then((json) => {
      insertdata(json, params);
    });
}

module.exports = realDataCsvToDb;
