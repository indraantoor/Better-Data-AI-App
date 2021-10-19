const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
const {
  RealData,
  realDataValidator,
  realDataUpdateValidator,
} = require("../models/realData");
const mongoose = require("mongoose");
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
  asyncHandler((req, res) => {
    getAllRealDatasByProject(req, res);
  })
);

// Update Real Data Name
router.put(
  "/:id",
  [isValidObjectId, authenToken, validate(realDataUpdateValidator)],
  asyncHandler((req, res) => {
    update(req, res);
  })
);

// Get Real Data By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler((req, res) => {
    getParticularRealData(req, res);
  })
);

// Delete real csv file data by id
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler((req, res) => {
    deleteRealDataCsv(req, res);
  })
);

module.exports = router;
