const User = require("../models/User");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PLAN_PRICES = {
SMART: 2999,
PREMIUM: 5999,
"ELITE VIP": 9999,

"1 Month": 1999,
"2 Months": 2999,
"3 Months": 3999,
};

const PREMIUM_MEMBERSHIPS = [
"1 Month",
"2 Months",
"3 Months",
];

const ADMISSION_PACKAGES = [
"SMART",
"PREMIUM",
"ELITE VIP",
];

// ================================
// CREATE ORDER
// ================================
exports.createOrder = async (req, res) => {
try {
const { planName } = req.body;

if (!planName || !PLAN_PRICES[planName]) {
  return res.status(400).json({
    error: "Invalid plan selection",
  });
}

const amount = PLAN_PRICES[planName] * 100;

const order = await razorpay.orders.create({
  amount,
  currency: "INR",
  receipt: `rcpt_${req.user.id
    .toString()
    .slice(-12)}_${Date.now().toString().slice(-8)}`,
});

return res.json({
  success: true,
  order,
});

} catch (error) {
console.error("Razorpay order creation error:", error);

if (
  error instanceof TypeError &&
  error.message.includes("status")
) {
  return res.status(503).json({
    error:
      "Unable to connect to Razorpay. Please check your internet connection.",
  });
}

return res.status(500).json({
  error:
    error.message || "Failed to create payment order",
});

}
};

// ================================
// VERIFY PAYMENT
// ================================
exports.verifyPayment = async (req, res) => {
try {
const {
razorpay_payment_id,
razorpay_order_id,
razorpay_signature,
planName,
} = req.body;

if (
  !razorpay_payment_id ||
  !razorpay_order_id ||
  !razorpay_signature ||
  !planName
) {
  return res.status(400).json({
    error: "Missing required payment fields",
  });
}

const generatedSignature = crypto
  .createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET
  )
  .update(
    `${razorpay_order_id}|${razorpay_payment_id}`
  )
  .digest("hex");

if (
  generatedSignature !== razorpay_signature
) {
  return res.status(400).json({
    error: "Invalid payment signature",
  });
}

const user = await User.findById(req.user.id);

if (!user) {
  return res.status(404).json({
    error: "User not found",
  });
}

if (!user.profile) {
  user.profile = {};
}

// ===================================
// PREMIUM MEMBERSHIP
// ===================================
if (
  PREMIUM_MEMBERSHIPS.includes(planName)
) {
  user.profile.isPremium = true;
  user.profile.premiumPlan = planName;
  user.profile.premiumStartAt =
    new Date();

  const expiry = new Date();

  if (planName === "1 Month") {
    expiry.setMonth(
      expiry.getMonth() + 1
    );
  } else if (planName === "2 Months") {
    expiry.setMonth(
      expiry.getMonth() + 2
    );
  } else if (planName === "3 Months") {
    expiry.setMonth(
      expiry.getMonth() + 3
    );
  }

  user.profile.premiumExpiresAt =
    expiry;
}

// ===================================
// ADMISSION PACKAGE
// ===================================
if (
  ADMISSION_PACKAGES.includes(planName)
) {
  const packageStartDate = new Date();

  const packageExpiryDate = new Date();
  packageExpiryDate.setMonth(
    packageExpiryDate.getMonth() + 3
  );

  user.profile.admissionPackage = {
    packageName: planName,
    amount: PLAN_PRICES[planName],
    purchasedAt: packageStartDate,
    expiresAt: packageExpiryDate,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    status: "active",
  };
}

// ===================================
// COMMON RECEIPT INFO
// ===================================
user.profile.receiptStatus =
  "approved";

user.profile.receiptUrl =
  `razorpay:${razorpay_payment_id}`;

await user.save();

// ===================================
// EMAILS
// ===================================
try {
  const userSubject =
    PREMIUM_MEMBERSHIPS.includes(
      planName
    )
      ? `🎉 Premium Membership Activated: ${planName}`
      : `🎓 Admission Package Purchased: ${planName}`;

  const userBody =
    PREMIUM_MEMBERSHIPS.includes(
      planName
    )
      ? `
        <p>Hi ${user.name},</p>
        <p>Your Premium Membership has been activated successfully.</p>
        <p><strong>Plan:</strong> ${planName}</p>
      `
      : `
        <p>Hi ${user.name},</p>
        <p>Your Admission Guidance Package has been purchased successfully.</p>
        <p><strong>Package:</strong> ${planName}</p>
      `;

  await sendEmail(
    user.email,
    userSubject,
    "",
    userBody
  );

  const adminEmail =
    process.env.ADMIN_NOTIFY_TO ||
    "careergenai9@gmail.com";

  await sendEmail(
    adminEmail,
    `💰 New Purchase: ${planName}`,
    "",
    `
    <p><strong>User:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Plan:</strong> ${planName}</p>
    <p><strong>Amount:</strong> ₹${PLAN_PRICES[planName]}</p>
    <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
    <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
    `
  );
} catch (emailErr) {
  console.error(
    "Email notification failed:",
    emailErr
  );
}

return res.json({
  success: true,
  message:
    "Payment verified successfully",
});

} catch (error) {
console.error(
"Payment verification error:",
error
);

return res.status(500).json({
  error: "Failed to verify payment",
});
}
};
