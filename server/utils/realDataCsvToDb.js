const csvtojson = require("csvtojson");
const realData = require("../models/realData");

// CONVERT TO CSV
// const csvfilepath = "./utils/myfile.csv";

function realDataCsvToDb(csvfilepath) {
  csvtojson()
    .fromFile(csvfilepath)
    .then((json) => {
      // console.log(json);
      // fs.writeFileSync("output.json", JSON.stringify(json), "utf-8", (err) => {
      //   if (err) console.log(err);
      // });

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
