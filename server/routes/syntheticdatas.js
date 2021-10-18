const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
const {
  syntheticdata,
  syntheticDataValidator,
} = require("../models/syntheticData");
const authenToken = require("../middleware/authToken");

// TODO: FIX NAMING

// Get all csv files
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const modelId = req.body.Model_id;
    const syntheticdatas = await syntheticdata
      .find({ Model_id: modelId })
      .populate("Model_id");
    res.send(syntheticdatas);
  })
);

// Get Synthetic Data By Id
router.get(
  "/:id",
  // isValidObjectId,
  asyncHandler(async (req, res) => {
    const syntheticData = await syntheticdata.findById(req.params.id);
    res.send(syntheticData);
  })
);

// Delete synthetic csv file data by id
router.delete(
  "/:id",
  authenToken,
  asyncHandler(async (req, res) => {
    const syntheticData = await syntheticdata.findById(req.params.id);
    if (syntheticData.User_id.toString() !== req.user.toString()) {
      res.status(401).send("Not authorized");
      throw new Error("Not authorized");
    }
    await syntheticdata.findByIdAndDelete(req.params.id);
    res.status(200).json("Synthetic Data deleted successfully");
  })
);

module.exports = router;
