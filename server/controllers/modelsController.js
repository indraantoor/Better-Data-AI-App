const {
  Model,
  modelValidator,
  modelUpdateValidator,
} = require("../models/model");

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

module.exports = createModel;
