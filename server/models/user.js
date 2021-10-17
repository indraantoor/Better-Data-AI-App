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
    model_name: String,
    parameters: {
      type: parametersSchema,
    },
    synthetic_data: String,
  },
  {
    timestamps: true,
  }
);

const projectSchema = mongoose.Schema(
  {
    project_name: String,
    real_data: String,
    models: [modelSchema],
  },
  {
    timestamps: true,
  }
);

const testSchema = mongoose.Schema({
  myname: String,
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

const validator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { User, validator };
