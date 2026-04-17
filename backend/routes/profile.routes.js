const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile.controller");

// ✅ Only routes that actually exist in controller
router.get("/profile/:userId", profileCtrl.getProfile);
router.put("/profile/:userId", profileCtrl.updateProfile);
router.post("/profile/:userId/add-item", profileCtrl.addProfileItem);
router.put("/profile/:userId/update-item", profileCtrl.updateProfileItem);
router.delete("/profile/:userId/delete-item", profileCtrl.deleteProfileItem);
module.exports = router;
