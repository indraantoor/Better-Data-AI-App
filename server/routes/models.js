const express = require("express");
const router = express.Router();
const { Model, modelValidator } = require("../models/model");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");

// Create an Model

router.post(
  "/",
  validate(modelValidator),
  asyncHandler(async (req, res) => {
    await Model(req.body).save();
    res.status(200).send("Model was created successfully.");
  })
);

// Get all Models
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const models = await Model.find();
    res.send(models);
  })
);

// Get Model By id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const model = await Model.findById(req.params.id);
    res.send(model);
  })
);

// Update Model Details
router.put(
  "/:id",
  [isValidObjectId, validate(modelValidator)],
  asyncHandler(async (req, res) => {
    await Model.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send("Model Updated Successfully");
  })
);

// Delete Model
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await Model.findOneAndDelete(req.params.id);
    res.status(200).send("Model deleted successfully");
  })
);

module.exports = router;
