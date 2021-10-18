const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
// const realData = require("../models/realData");
const syntheticdata = require("../models/syntheticData");

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

// Delete synthetic csv file data by id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await syntheticdata.findByIdAndDelete(req.params.id);
    res.status(200).json("Synthetic Data deleted successfully");
  })
);

module.exports = router;
