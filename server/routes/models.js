const express = require("express");
const router = express.Router();
const { Model, modelValidator } = require("../models/model");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
const authenToken = require("../middleware/authToken");

// Create a Model
router.post(
  "/",
  [authenToken, validate(modelValidator)],
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const projectId = req.body.Project_id;
    const modelName = req.body.model_name;
    const parameters = req.body.parameters;
    const model = new Model({
      User_id: userId,
      Project_id: projectId,
      model_name: modelName,
      parameters: {
        batch_size: parameters.batch_size,
        training_cycle: parameters.training_cycle,
      },
    });
    const createdModel = await model.save();
    res.status(200).json(createdModel);
    // For Debugging Purposes
    // await Model(req.body).save();
    // res.status(200).send("Model was created successfully.");
  })
);

// Get all Models
router.get(
  "/",
  authenToken,
  asyncHandler(async (req, res) => {
    const projectId = req.body.Project_id;
    const models = await Model.find({ Project_id: projectId }).populate(
      "Project_id"
    );
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
  // [isValidObjectId, validate(modelValidator)],
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await Model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.status(200).send("Model Updated Successfully");
  })
);

// Delete Model
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const objectIdConverted = mongoose.Types.ObjectId(req.params.id);
    await SyntheticData.deleteMany({
      Model_id: mongoose.Types.ObjectId(objectIdConverted),
    });
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).send("Model deleted successfully");
  })
);

module.exports = router;
