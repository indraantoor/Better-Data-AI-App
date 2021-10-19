const express = require("express");
const router = express.Router();
const { modelValidator, modelUpdateValidator } = require("../models/model");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
const authenToken = require("../middleware/authToken");
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
  asyncHandler(async (req, res) => {
    await createModel(req, res);
  })
);

// Get all Models
router.get(
  "/",
  authenToken,
  asyncHandler(async (req, res) => {
    await getAllModelsByProject(req, res);
  })
);

// Get Model By id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await getParticularModel(req, res);
  })
);

// Update Model Details
router.put(
  "/:id",
  [isValidObjectId, authenToken, validate(modelUpdateValidator)],
  asyncHandler(async (req, res) => {
    await updateModel(req, res);
  })
);

// Delete Model
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler(async (req, res) => {
    await deleteModel(req, res);
  })
);

module.exports = router;
