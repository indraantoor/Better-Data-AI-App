const mongoose = require("mongoose");
const Joi = require("joi");

const projectSchema = mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("projects", projectSchema);

const projectValidator = (data) => {
  const schema = Joi.object({
    UserId: Joi.string().required(),
    project_name: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { Project, projectValidator };
