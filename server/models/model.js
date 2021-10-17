const mongoose = require("mongoose");
const Joi = require("joi");

const parametersSchema = mongoose.Schema(
  {
    batch_size: Number,
    training_cycle: Number,
  },
  {
    timestamps: true,
  }
);

const modelSchema = mongoose.Schema(
  {
    User_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    Project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    model_name: {
      type: String,
      required: true,
    },
    parameters: {
      type: parametersSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("models", modelSchema);

const modelValidator = (data) => {
  const schema = Joi.object({
    model_name: Joi.string().required(),
    Project_id: Joi.string().required(),
    parameters: Joi.object().required(),
  });
  return schema.validate(data);
};

module.exports = { Model, modelValidator };
