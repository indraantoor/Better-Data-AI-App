const express = require("express");
const router = express.Router();
const {
  Project,
  projectValidator,
  projectUpdateValidator,
} = require("../models/project");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
const authenToken = require("../middleware/authToken");
const { RealData, realDataValidator } = require("../models/realData");
const { Model, modelValidator } = require("../models/model");
const {
  SyntheticData,
  syntheticDataValidator,
} = require("../models/syntheticData");
const mongoose = require("mongoose");

// Create a Project
router.post(
  "/",
  [authenToken, validate(projectValidator)],
  asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const projectName = req.body.project_name;
    const project = new Project({
      UserId: userid,
      project_name: projectName,
    });
    const createdProject = await project.save();
    res.status(200).json(createdProject);
  })
);

// Get all Projects
router.get(
  "/",
  authenToken,
  asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const projects = await Project.find({ UserId: userid }).populate("UserId");
    res.send(projects);
    // For Debugging Purposes
    // res.json({ userid: userid });
  })
);

// Get Project By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.send(project);
  })
);

// Update Project Details
router.put(
  "/:id",
  [isValidObjectId, authenToken, validate(projectUpdateValidator)],
  asyncHandler(async (req, res) => {
    const proj = await Project.findById(req.params.id);
    if (proj.UserId.toString() !== req.user.id.toString()) {
      res.status(401).send("Not authorized");
      throw new Error("Not authorized");
    }
    await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.status(200).send("Project Updated Successfully");
  })
);

// Delete Project
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler(async (req, res) => {
    const proj = await Project.findById(req.params.id);
    if (proj.UserId.toString() !== req.user.id.toString()) {
      res.status(401).send("Not authorized");
      throw new Error("Not authorized");
    }
    const objectIdConverted = mongoose.Types.ObjectId(req.params.id);
    await RealData.deleteMany({
      Project_id: mongoose.Types.ObjectId(objectIdConverted),
    });
    await Model.deleteMany({
      Project_id: mongoose.Types.ObjectId(objectIdConverted),
    });
    await SyntheticData.deleteMany({
      Project_id: mongoose.Types.ObjectId(objectIdConverted),
    });
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send("Project deleted successfully");
  })
);

module.exports = router;
