const express = require("express");
const router = express.Router();
const {
  projectValidator,
  projectUpdateValidator,
} = require("../models/project");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
const authenToken = require("../middleware/authToken");
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
  asyncHandler(async (req, res) => {
    await createProject(req, res);
  })
);

// Get all Projects
router.get(
  "/",
  authenToken,
  asyncHandler(async (req, res) => {
    await getAllProjectsByUser(req, res);
  })
);

// Get Project By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await getParticularProject(req, res);
  })
);

// Update Project Details
router.put(
  "/:id",
  [isValidObjectId, authenToken, validate(projectUpdateValidator)],
  asyncHandler(async (req, res) => {
    await updateProject(req, res);
  })
);

// Delete Project
router.delete(
  "/:id",
  [isValidObjectId, authenToken],
  asyncHandler(async (req, res) => {
    await deleteProject(req, res);
  })
);

module.exports = router;
