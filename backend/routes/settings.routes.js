const express = require("express");
const router = express.Router();
const settingsCtrl = require("../controllers/settings.controller");

// Public endpoints
router.get("/pricing", settingsCtrl.getPricingSettings);

module.exports = router;
