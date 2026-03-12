const express = require("express");
const router = express.Router();
const {
    logFeatureActivity,
    getMyFeatureActivities,
    getActivitySummary,
} = require("../controllers/featureActivity.controller");

const protect = require("../middleware/auth");

// Log activity
router.post("/log", protect, logFeatureActivity);

// Get full activity history
router.get("/my", protect, getMyFeatureActivities);

// Get summary result (ALL FEATURES)
router.get("/summary", protect, getActivitySummary);

module.exports = router;