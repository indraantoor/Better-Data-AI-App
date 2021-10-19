const express = require("express");
const router = express.Router();
const {
  Model,
  modelValidator,
  modelUpdateValidator,
} = require("../models/model");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
const authenToken = require("../middleware/authToken");
const {
  SyntheticData,
  syntheticDataValidator,
} = require("../models/syntheticData");
const mongoose = require("mongoose");
const {
  createModel,
  getAllModelsByProject,
  getParticularModel,
  updateModel,
  deleteModel,
} = require("../controllers/modelsController");

// Create a Model
router.post(
  "/",
  [authenToken, validate(modelValidator)],
  asyncHandler((req, res) => {
    createModel(req, res);
  })
);

// Get all Models
router.get(
  "/",
  authenToken,
  asyncHandler((req, res) => {
    getAllModelsByProject(req, res);
  })
);

// Get Model By id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler((req, res) => {
    getParticularModel(req, res);
  })
);

// Update Model Details
router.put(
  "/:id",
  [isValidObjectId, authenToken, validate(modelUpdateValidator)],
  asyncHandler(async (req, res) => {
    updateModel(req, res);
  })
);

// Delete Model
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler((req, res) => {
    deleteModel(req, res);
  })
);

module.exports = router;
