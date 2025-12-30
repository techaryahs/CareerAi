const express = require("express");
const router = express.Router();

const { getParentDashboard } = require("../controllers/parent.controller");
const auth = require("../middleware/auth");

/**
 * Parent Dashboard Route
 * GET /api/parent/dashboard
 */
router.get("/dashboard", auth, getParentDashboard);

module.exports = router;
