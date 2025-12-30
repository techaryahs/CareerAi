const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

// 💓 Heartbeat (Frontend calls this every ~1-5 minutes)
// Open endpoint but expects valid user data in body. 
// Ideally should be protected by auth middleware if you have a universal verifyToken.
// For now, assuming frontend sends user details.
router.post("/heartbeat", activityController.recordHeartbeat);

// 🟢 Online Users (Admin)
router.get("/online", activityController.getOnlineUsers);

// 📊 Statistics (Admin)
router.get("/stats", activityController.getActivityStats);

// 👤 Detailed User Visit Stats (Admin)
router.get("/user-stats", activityController.getUserVisitStats);

module.exports = router;
