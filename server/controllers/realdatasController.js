const { RealData } = require("../models/realData");

const getParticularRealData = async (req, res) => {
  const realdata = await RealData.findById(req.params.id);
  res.send(realdata);
};

// Gives all real data files under that particular project
const getAllRealDatasByProject = async (req, res) => {
  const projectId = req.body.Project_id;
  const realdatas = await RealData.find({ Project_id: projectId }).populate(
    "Project_id"
  );
  res.send(realdatas);
};

// Handles Updating
const update = async (req, res) => {
  const realdata = await RealData.findById(req.params.id);
  if (realdata.User_id.toString() !== req.user.id.toString()) {
    res.status(401).send("Not authorized");
    throw new Error("Not authorized");
  }
  await RealData.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
  res.status(200).send("Real Data Name Updated Successfully");
};

// Deletes that real data csv file's which was stored in the database
const deleteRealDataCsv = async (req, res) => {
  const realdata = await RealData.findById(req.params.id);
  if (realdata.User_id.toString() !== req.user.id.toString()) {
    res.status(401).send("Not authorized");
    throw new Error("Not authorized");
  }
  await RealData.findByIdAndDelete(req.params.id);
  res.status(200).json("Real Data deleted successfully");
};

module.exports = {
  update,
  getAllRealDatasByProject,
  getParticularRealData,
  deleteRealDataCsv,
};
