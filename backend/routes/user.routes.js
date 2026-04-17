const upload = require("../middleware/multer"); // ✅ ADDED

router.get("/premium-status", authMiddleware, userController.getPremiumStatus);
router.get("/:email", userController.getUserByEmail);
router.post("/activate", userController.activatePremium);
router.post("/update-profile", upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), userController.updateProfile);

module.exports = router;
