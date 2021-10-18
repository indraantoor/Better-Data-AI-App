const csvtojson = require("csvtojson");
const {
  SyntheticData,
  syntheticDataValidator,
} = require("../models/syntheticData");

// Insert into database
function insertdata(json, params) {
  const syntheticDataObj = new SyntheticData({
    ...params,
    data: json,
  });
  SyntheticData.insertMany(syntheticDataObj, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success: Inserted Data Of Real Data Into Database");
    }
  });
}

// Convert Csv to json
function syntheticDataCsvToDb(csvfilepath, params) {
  csvtojson()
    .fromFile(csvfilepath)
    .then((json) => {
      insertdata(json, params);
    });
}

module.exports = syntheticDataCsvToDb;
