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
  asyncHandler(async (req, res) => {
    await getAllSyntheticData(req, res);
  })
);

// Get synthetic data by Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await getParticularSyntheticData(req, res);
  })
);

// Delete synthetic csv file data by Id
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler(async (req, res) => {
    await deleteSyntheticDataCsv(req, res);
  })
);

module.exports = router;
