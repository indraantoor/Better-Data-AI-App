const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
const realData = require("../models/realData");

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

// Delete real csv file data by id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await realData.findByIdAndDelete(req.params.id);
    res.status(200).json("Real Data deleted successfully");
  })
);

module.exports = router;
