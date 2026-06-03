const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller");
const verifyToken = require("../middleware/auth");

// Helper to restrict access to Admins only
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admins only." });
  }
};

// Student-facing endpoints (requires authentication but not admin role)
router.post("/receipt", verifyToken, adminCtrl.submitReceipt);

// Admin-only endpoints
router.post("/save-api-key", verifyToken, isAdmin, adminCtrl.saveApiKey);
router.get("/receipts", verifyToken, isAdmin, adminCtrl.getReceipts);
router.post("/approve", verifyToken, isAdmin, adminCtrl.approveUser);
router.post("/deny", verifyToken, isAdmin, adminCtrl.denyUser);
router.post("/register-consultant", verifyToken, isAdmin, adminCtrl.registerConsultant);

// Consultant status & pricing management
router.get("/consultants", verifyToken, isAdmin, adminCtrl.getAllConsultantsForAdmin);
router.patch("/consultants/:id/status", verifyToken, isAdmin, adminCtrl.updateConsultantStatus);
router.put("/consultants/:id/price", verifyToken, isAdmin, adminCtrl.updateConsultantPrice);

// Package & Membership pricing management
router.get("/pricing", verifyToken, isAdmin, adminCtrl.getPricingSettingsForAdmin);
router.put("/pricing", verifyToken, isAdmin, adminCtrl.updatePricingSettings);

module.exports = router;
