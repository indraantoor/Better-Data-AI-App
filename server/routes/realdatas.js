const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
const realData = require("../models/realData");
const mongoose = require("mongoose");

// Get all csv files
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projectId = req.body.Project_id;
    const realdatas = await realData
      .find({ Project_id: projectId })
      .populate("Project_id");
    res.send(realdatas);
  })
);

// Updates real data csv file data
router.put(
  "/:id",
  // [isValidObjectId, validate(modelValidator)],
  // isValidObjectId,
  asyncHandler(async (req, res) => {
    // await realData.findByIdAndUpdate(
    //   { _id: req.params.id },
    //   { $set: req.body }
    // );
    // const obj = { ...req.body };
    var id = mongoose.Types.ObjectId(req.params.id);
    var id2 = mongoose.Types.ObjectId(req.body.main);
    await realData.updateOne(
      { _id: id2, "data._id": id },
      { $set: { "data.$.Gender": req.body.Gender } }
    );
    res.status(200).send("Real Data Updated Successfully");
  })
);

// Delete real csv file data by id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await realData.findByIdAndDelete(req.params.id);
    res.status(200).json("Real Data deleted successfully");
  })
);

module.exports = router;
