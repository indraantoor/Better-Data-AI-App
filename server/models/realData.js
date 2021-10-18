const mongoose = require("mongoose");
const Joi = require("joi");

// TODO:  Test Joi Validation
// TODO Take care of joi validation exports

const realDataValuesSchema = mongoose.Schema(
  {
    CLIENTNUM: Number,
    Attrition_Flag: String,
    Customer_Age: Number,
    Gender: String,
    Dependent_count: Number,
    Education_Level: String,
    Marital_Status: String,
    Income_Category: String,
    Card_Category: String,
    Months_on_book: Number,
    Total_Relationship_Count: Number,
    Months_Inactive_12_mon: Number,
    Contacts_Count_12_mon: Number,
    Credit_Limit: Number,
    Total_Revolving_Bal: Number,
    Avg_Open_To_Buy: Number,
    Total_Amt_Chng_Q4_Q1: Number,
    Total_Trans_Amt: Number,
    Total_Trans_Ct: Number,
    Total_Ct_Chng_Q4_Q1: Number,
    Avg_Utilization_Ratio: Number,
  },
  {
    timestamps: true,
  }
);

const realDataSchema = mongoose.Schema(
  {
    data: [realDataValuesSchema],
    filename: {
      type: String,
      required: true,
    },
    User_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    Project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    Model_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "models",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const realDataValidator = (data) => {
  const schema = Joi.object({
    filename: Joi.string().required(),
    User_id: Joi.string().required(),
    Project_id: Joi.string().required(),
    Model_id: Joi.string().required(),
    data: Joi.array().required(),
  });
  return schema.validate(data);
};

const RealData = mongoose.model("realData", realDataSchema);
module.exports = { RealData, realDataValidator };
