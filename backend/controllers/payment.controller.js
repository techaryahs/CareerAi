const User = require("../models/User");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PLAN_PRICES = {
  "SMART": 2999,
  "PREMIUM": 5999,
  "ELITE VIP": 9999,
  "1 Month": 1999,
  "2 Months": 2999,
  "3 Months": 3999,
};

exports.createOrder = async (req, res) => {
  try {
    const { planName } = req.body;
    if (!planName || !PLAN_PRICES[planName]) {
      return res.status(400).json({ error: "Invalid plan selection" });
    }

    const amount = PLAN_PRICES[planName] * 100; // in paise
    const options = {
      amount,
      currency: "INR",
      receipt: `rcpt_${req.user.id.toString().slice(-12)}_${Date.now().toString().slice(-8)}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order creation error details:", error);
    
    // Gracefully handle Razorpay SDK bug (TypeErrors when there is no internet/DNS connection)
    if (error instanceof TypeError && error.message.includes("status")) {
      return res.status(503).json({ 
        error: "Unable to connect to Razorpay. Please check your internet connection or DNS settings." 
      });
    }

    if (error.statusCode) console.error("Status Code:", error.statusCode);
    if (error.error) console.error("Inner Error:", error.error);
    res.status(500).json({ error: error.message || "Failed to create payment order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, planName } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !planName) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    // Generate signature signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Update User profile
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.profile) {
      user.profile = {};
    }

    user.profile.isPremium = true;
    user.profile.premiumPlan = planName;
    user.profile.premiumStartAt = new Date();
    // Calculate expires at (1 year from now)
    user.profile.premiumExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    user.profile.receiptStatus = "approved";
    // Store transaction receipt reference
    user.profile.receiptUrl = `razorpay:${razorpay_payment_id}`;

    await user.save();

    // Notify User and Admin
    try {
      await sendEmail(
        user.email,
        `🎉 Premium Plan Activated: ${planName}`,
        "",
        `<p>Hi ${user.name},</p><p>Thank you! Your <strong>${planName}</strong> plan has been activated successfully.</p><p>You now have full access to our premium guidance and features.</p>`
      );

      const adminEmail = process.env.ADMIN_NOTIFY_TO || "careergenai9@gmail.com";
      await sendEmail(
        adminEmail,
        `💰 New Premium Sale: ${planName} by ${user.name}`,
        "",
        `<p>A user has successfully purchased a premium package via Razorpay.</p>
         <p><strong>User:</strong> ${user.name} (${user.email})</p>
         <p><strong>Plan:</strong> ${planName}</p>
         <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
         <p><strong>Order ID:</strong> ${razorpay_order_id}</p>`
      );
    } catch (emailErr) {
      console.error("Email notification after purchase failed:", emailErr);
    }

    res.json({ success: true, message: "Payment verified and user account upgraded successfully" });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
};
