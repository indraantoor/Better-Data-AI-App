const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
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
    email: Joi.string().required(),
  });
  return schema.validate(data);
};

const userUpdateValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { User, validator, userUpdateValidator };
