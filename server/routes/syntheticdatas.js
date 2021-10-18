const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
// const realData = require("../models/realData");
const syntheticdata = require("../models/syntheticData");

// Get all csv files
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projectId = req.body.Project_id;
    const syntheticdatas = await syntheticdata
      .find({ Project_id: projectId })
      .populate("Project_id");
    res.send(syntheticdatas);
  })
);

module.exports = router;
