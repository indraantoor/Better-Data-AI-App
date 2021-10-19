const express = require("express");
const router = express.Router();
const { validator, userUpdateValidator } = require("../models/user");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
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
  asyncHandler(async (req, res) => {
    await createUser(req, res);
  })
);

// Get the user by email id
router.get(
  "/",
  asyncHandler(async (req, res) => {
    await getUserToken(req, res);
  })
);

// Get User By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await getParticularUser(req, res);
  })
);

// Update User Details
router.put(
  "/:id",
  [isValidObjectId, validate(userUpdateValidator)],
  asyncHandler(async (req, res) => {
    await update(req, res);
  })
);

// Delete User
// And also all the projects, models and csv data associated to it
router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await deleteUser(req, res);
  })
);

module.exports = router;
