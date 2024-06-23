const express = require("express");
const {
  getActivityHistory,
  getInventorySummary,
} = require("../controllers/reportsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/activity-history", protect, getActivityHistory);
router.get("/inventory-summary", protect, getInventorySummary);

module.exports = router;
