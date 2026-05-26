const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  bookCounselling,
  getAvailableSlots,
} = require("../controllers/counselling.controller");


// OTP
router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);


// BOOK SESSION
router.post("/book", bookCounselling);


// GET AVAILABLE SLOTS
router.get("/available-slots", getAvailableSlots);


module.exports = router;