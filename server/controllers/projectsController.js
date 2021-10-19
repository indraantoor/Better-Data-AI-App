const mongoose = require("mongoose");
const { Project } = require("../models/project");
const { RealData } = require("../models/realData");
const { Model } = require("../models/model");
const { SyntheticData } = require("../models/syntheticData");

const createProject = async (req, res) => {
  const userid = req.user.id;
  const projectName = req.body.project_name;
  const project = new Project({
    UserId: userid,
    project_name: projectName,
  });
  const createdProject = await project.save();
  res.status(200).json(createdProject);
};

// Get all projects made by a user
const getAllProjectsByUser = async (req, res) => {
  const userid = req.user.id;
  const projects = await Project.find({ UserId: userid }).populate("UserId");
  res.send(projects);
  // For Debugging Purposes
  // res.json({ userid: userid });
};

const getParticularProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.send(project);
};

const updateProject = async (req, res) => {
  const proj = await Project.findById(req.params.id);
  if (proj.UserId.toString() !== req.user.id.toString()) {
    res.status(401).send("Not authorized");
    throw new Error("Not authorized");
  }
  await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
  res.status(200).send("Project Updated Successfully");
};

const deleteProject = async (req, res) => {
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
};

module.exports = {
  createProject,
  getAllProjectsByUser,
  getParticularProject,
  updateProject,
  deleteProject,
};
