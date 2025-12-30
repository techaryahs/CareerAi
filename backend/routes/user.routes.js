const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth"); // ✅ REQUIRED

router.get("/premium-status", authMiddleware, userController.getPremiumStatus);
router.get("/:email", userController.getUserByEmail);
router.post("/activate", userController.activatePremium);
router.post("/update-profile", userController.updateProfile);

module.exports = router;
