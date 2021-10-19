const {
  SyntheticData,
  syntheticDataValidator,
} = require("../models/syntheticData");

const getAllSyntheticData = async (req, res) => {
  const modelId = req.body.Model_id;
  const syntheticdatas = await SyntheticData.find({
    Model_id: modelId,
  }).populate("Model_id");
  res.send(syntheticdatas);
};

const getParticularSyntheticData = async (req, res) => {
  const syntheticData = await SyntheticData.findById(req.params.id);
  res.send(syntheticData);
};

const deleteSyntheticDataCsv = async (req, res) => {
  const syntheticData = await SyntheticData.findById(req.params.id);
  if (syntheticData.User_id.toString() !== req.user.id.toString()) {
    res.status(401).send("Not authorized");
    throw new Error("Not authorized");
  }
  await SyntheticData.findByIdAndDelete(req.params.id);
  res.status(200).json("Synthetic Data deleted successfully");
};

module.exports = {
  getAllSyntheticData,
  getParticularSyntheticData,
  deleteSyntheticDataCsv,
};
