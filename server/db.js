const mongoose = require("mongoose");
const asyncHandler = require("./middleware/asyncHandler");

module.exports = asyncHandler(async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const connection = await mongoose.connect(process.env.DB, connectionParams);
  connection
    ? console.log("Connected to database")
    : console.log("Could not connect to database");
});
