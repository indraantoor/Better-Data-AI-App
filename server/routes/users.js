const express = require("express");
const router = express.Router();
const { User, validator } = require("../models/user");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");
// Create an User

router.post(
  "/",
  validate(validator),
  asyncHandler(async (req, res) => {
    // const accessToken = jwt.sign(user, process.env.JWT_SECRET);
    await User(req.body).save();
    res
      .status(200)
      // .json({ accessToken: accessToken })
      .send("User was created successfully.");
  })
);

// Get all users
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    // const users = await User.find();
    const users = await User.findOne({ email });
    const id = users._id;
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET);
    // res.send(users);
    res.status(200).json({ accessToken: accessToken });
    // res.send(id);
  })
);

// Get User By Id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  })
);

// Update User Details
router.put(
  "/:id",
  [isValidObjectId, validate(validator)],
  asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send("User Updated Successfully");
  })
);

// Delete User
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await User.findOneAndDelete(req.params.id);
    res.status(200).send("User deleted successfully");
  })
);

module.exports = router;
