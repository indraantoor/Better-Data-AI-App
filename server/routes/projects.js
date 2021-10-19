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
const {
  createProject,
  getAllProjectsByUser,
  getParticularProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");

// Create a Project
router.post(
  "/",
  [authenToken, validate(projectValidator)],
  asyncHandler((req, res) => {
    createProject(req, res);
  })
);

// Get all Projects
router.get(
  "/",
  authenToken,
  asyncHandler((req, res) => {
    getAllProjectsByUser(req, res);
  })
);

// Get Project By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler((req, res) => {
    getParticularProject(req, res);
  })
);

// Update Project Details
router.put(
  "/:id",
  [isValidObjectId, authenToken, validate(projectUpdateValidator)],
  asyncHandler((req, res) => {
    updateProject(req, res);
  })
);

// Delete Project
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler((req, res) => {
    deleteProject(req, res);
  })
);

module.exports = router;
