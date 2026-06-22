const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const verifyToken = require("../middleware/auth");

router.post("/order", verifyToken, paymentController.createOrder);
router.post("/verify", verifyToken, paymentController.verifyPayment);

router.post("/apple/verify", verifyToken, paymentController.verifyApplePayment);

module.exports = router;
