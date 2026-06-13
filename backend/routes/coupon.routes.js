const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getCoupons,
  validateCoupon,
  toggleCouponStatus,
} = require("../controllers/coupon.controller");

router.post("/", createCoupon);

router.get("/", getCoupons);

router.post("/validate", validateCoupon);

router.put("/:id/status", toggleCouponStatus);

module.exports = router;