const express = require("express");
const router = express.Router();
const { Project, projectValidator } = require("../models/project");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");

// Create an Project

router.post(
  "/",
  validate(projectValidator),
  asyncHandler(async (req, res) => {
    await Project(req.body).save();
    res.status(200).send("Project was created successfully.");
  })
);

// Get all Projects
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projects = await Project.find();
    res.send(projects);
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
  [isValidObjectId, validate(projectValidator)],
  asyncHandler(async (req, res) => {
    await Project.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send("Project Updated Successfully");
  })
);

// Delete Project
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await Project.findOneAndDelete(req.params.id);
    res.status(200).send("Project deleted successfully");
  })
);

module.exports = router;
