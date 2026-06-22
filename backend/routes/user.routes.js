const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/multer"); // ✅ ADDED

router.get("/premium-status", authMiddleware, userController.getPremiumStatus);
router.get("/:email", userController.getUserByEmail);
router.post("/activate", userController.activatePremium);
router.post("/update-profile", upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), userController.updateProfile);
router.delete("/delete-account", authMiddleware, userController.deleteAccount);

module.exports = router;
