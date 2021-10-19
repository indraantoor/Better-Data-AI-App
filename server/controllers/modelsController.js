const { Model } = require("../models/model");
const mongoose = require("mongoose");
const { SyntheticData } = require("../models/syntheticData");

const createModel = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.body.Project_id;
  const modelName = req.body.model_name;
  const parameters = req.body.parameters;
  const model = new Model({
    User_id: userId,
    Project_id: projectId,
    model_name: modelName,
    parameters: {
      batch_size: parameters.batch_size,
      training_cycle: parameters.training_cycle,
    },
  });
  const createdModel = await model.save();
  res.status(200).json(createdModel);
  // For Debugging Purposes
  // await Model(req.body).save();
  // res.status(200).send("Model was created successfully.");
};

// Gives all models under a particular project
const getAllModelsByProject = async (req, res) => {
  const projectId = req.body.Project_id;
  const models = await Model.find({ Project_id: projectId }).populate(
    "Project_id"
  );
  res.send(models);
};

const getParticularModel = async (req, res) => {
  const model = await Model.findById(req.params.id);
  res.send(model);
};

const updateModel = async (req, res) => {
  const mod = await Model.findById(req.params.id);
  if (mod.User_id.toString() !== req.user.id.toString()) {
    res.status(401).send("Not authorized");
    throw new Error("Not authorized");
  }
  await Model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
  res.status(200).send("Model Updated Successfully");
};

const deleteModel = async (req, res) => {
  const mod = await Model.findById(req.params.id);
  if (mod.User_id.toString() !== req.user.id.toString()) {
    res.status(401).send("Not authorized");
    throw new Error("Not authorized");
  }
  const objectIdConverted = mongoose.Types.ObjectId(req.params.id);
  await SyntheticData.deleteMany({
    Model_id: mongoose.Types.ObjectId(objectIdConverted),
  });
  await Model.findByIdAndDelete(req.params.id);
  res.status(200).send("Model deleted successfully");
};

module.exports = {
  createModel,
  getAllModelsByProject,
  getParticularModel,
  updateModel,
  deleteModel,
};
