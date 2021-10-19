const express = require("express");
const router = express.Router();
const realDataCsvToDb = require("../utils/realDataCsvToDb");
const {
  uploadFile,
  processAndUpload,
} = require("../controllers/realDataUploadsController");

// Upload page for real data
router.get("/", (req, res) => {
  // res.sendFile(__dirname + "/realDataUpload.html");
  res.sendFile("realDataUpload.html", { root: "./views/RealDataUpload/" });
});

router.post("/", (req, res) => {
  processAndUpload(req, res);
});

module.exports = router;
