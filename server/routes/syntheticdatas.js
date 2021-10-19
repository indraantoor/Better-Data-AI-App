const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
const authenToken = require("../middleware/authToken");
const isValidObjectId = require("../middleware/isValidObjectId");
const {
  getAllSyntheticData,
  getParticularSyntheticData,
  deleteSyntheticDataCsv,
} = require("../controllers/syntheticdatasController");

// Get all csv files
router.get(
  "/",
  asyncHandler((req, res) => {
    getAllSyntheticData(req, res);
  })
);

// Get synthetic data by Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler((req, res) => {
    getParticularSyntheticData(req, res);
  })
);

// Delete synthetic csv file data by Id
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler((req, res) => {
    deleteSyntheticDataCsv(req, res);
  })
);

module.exports = router;
