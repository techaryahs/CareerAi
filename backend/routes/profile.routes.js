const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile.controller");

// ✅ Only routes that actually exist in controller
router.get("/profile/:userId", profileCtrl.getProfile);
router.put("/profile/:userId", profileCtrl.updateProfile);

module.exports = router;
