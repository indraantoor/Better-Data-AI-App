const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
const { realDataUpdateValidator } = require("../models/realData");
const authenToken = require("../middleware/authToken");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const {
  update,
  getAllRealDatasByProject,
  getParticularRealData,
  deleteRealDataCsv,
} = require("../controllers/realdatasController");

// Get all csv files
router.get(
  "/",
  asyncHandler(async (req, res) => {
    await getAllRealDatasByProject(req, res);
  })
);

// Update Real Data Name
router.put(
  "/:id",
  [isValidObjectId, authenToken, validate(realDataUpdateValidator)],
  asyncHandler(async (req, res) => {
    await update(req, res);
  })
);

// Get Real Data By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await getParticularRealData(req, res);
  })
);

// Delete real csv file data by id
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler(async (req, res) => {
    await deleteRealDataCsv(req, res);
  })
);

module.exports = router;
