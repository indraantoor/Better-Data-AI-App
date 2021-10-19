const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Project } = require("../models/project");
const { Model } = require("../models/model");
const { RealData } = require("../models/realData");
const { SyntheticData } = require("../models/syntheticData");

const createUser = async (req, res) => {
  // const accessToken = jwt.sign(user, process.env.JWT_SECRET);
  await User(req.body).save();
  res
    .status(200)
    // .json({ accessToken: accessToken })
    .send("User was created successfully.");
};

const getUserToken = async (req, res) => {
  const { email } = req.body;
  // const users = await User.find();
  const users = await User.findOne({ email });
  const id = users._id;
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET);
  // res.send(users);
  res.status(200).json({ accessToken: accessToken });
  // res.send(id);
};

const getParticularUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

const update = async (req, res) => {
  await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
  // await User.updateOne({_id: req.params});
  res.status(200).send("User Updated Successfully");
};

// Deletes the user and also all the projects, models, csv data's associated to it
const deleteUser = async (req, res) => {
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
};

module.exports = {
  createUser,
  getUserToken,
  getParticularUser,
  update,
  deleteUser,
};
