const express = require("express");
const router = express.Router();
const { User, validator, userUpdateValidator } = require("../models/user");
const { Project, projectValidator } = require("../models/project");
const { Model, modelValidator } = require("../models/model");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { RealData, realDataValidator } = require("../models/realData");
const {
  SyntheticData,
  syntheticDataValidator,
} = require("../models/syntheticData");
const {
  createUser,
  getUserToken,
  getParticularUser,
  update,
  deleteUser,
} = require("../controllers/usersController");

// Create a User
router.post(
  "/",
  validate(validator),
  asyncHandler((req, res) => {
    createUser(req, res);
  })
);

// Get the user by email id
router.get(
  "/",
  asyncHandler((req, res) => {
    getUserToken(req, res);
  })
);

// Get User By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler((req, res) => {
    getParticularUser(req, res);
  })
);

// Update User Details
router.put(
  "/:id",
  [isValidObjectId, validate(userUpdateValidator)],
  asyncHandler((req, res) => {
    update(req, res);
  })
);

// Delete User
// And also all the projects, models and csv data associated to it
router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler((req, res) => {
    deleteUser(req, res);
  })
);

module.exports = router;
