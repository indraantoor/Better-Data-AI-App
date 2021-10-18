const express = require("express");
const router = express.Router();
const { User, validator } = require("../models/user");
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

// Create a User
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

// Get the user by email id
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

// TODO: UPDATE VALIDATOR FOR PUT REQUEST (USERS)
// Update User Details
router.put(
  "/:id",
  // [isValidObjectId, validate(validator)],
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
    // await User.updateOne({_id: req.params});
    res.status(200).send("User Updated Successfully");
  })
);

// Delete User
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    // Deletes the user and also all the projects and models associated to it
    const objectIdConverted = mongoose.Types.ObjectId(req.params.id);
    await Project.deleteMany({
      UserId: mongoose.Types.ObjectId(objectIdConverted),
    });
    await Model.deleteMany({
      User_id: mongoose.Types.ObjectId(objectIdConverted),
    });
    await RealData.deleteMany({
      User_id: mongoose.Types.ObjectId(objectIdConverted),
    });
    await SyntheticData.deleteMany({
      User_id: mongoose.Types.ObjectId(objectIdConverted),
    });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  })
);

module.exports = router;
