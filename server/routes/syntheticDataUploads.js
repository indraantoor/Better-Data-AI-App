const express = require("express");
const router = express.Router();
const {
  processAndUpload,
} = require("../controllers/syntheticDataUploadsController");

// Upload page for synthetic data
router.get("/", (req, res) => {
  res.sendFile("syntheticDataUpload.html", {
    root: "./views/SyntheticDataUpload/",
  });
});

// Upload synthetic data
router.post("/", (req, res) => {
  processAndUpload(req, res);
});

module.exports = router;
