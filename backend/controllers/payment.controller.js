
const Razorpay = require("razorpay");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const pricingService = require("../services/pricing.service");
const mongoose = require("mongoose");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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


const User = require("../models/User");

// console.log("🔥 PAYMENT CONTROLLER FILE LOADED 🔥");
// ================================
// CREATE ORDER
// ================================
exports.createOrder = async (req, res) => {
  // console.log("🔥 CREATE ORDER HIT 🔥");
  try {
    const { planName, couponCode } = req.body;

    // console.log("\n================================");
    // console.log("🚀 CREATE ORDER REQUEST");
    // console.log("REQUEST BODY:", req.body);
    // console.log("PLAN NAME:", planName);
    // console.log("COUPON CODE:", couponCode);

    const isEnabled =
      await pricingService.isPlanEnabled(
        planName
      );

    // console.log("PLAN ENABLED:", isEnabled);

    if (!isEnabled) {
      return res.status(400).json({
        error:
          "Selected plan is currently unavailable.",
      });
    }

    let price;

    try {
      price =
        await pricingService.getPlanPrice(
          planName
        );

      // console.log(
      //   "💰 ORIGINAL PRICE:",
      //   price
      // );
    } catch (e) {
      console.error(
        "PRICE FETCH ERROR:",
        e
      );

      return res.status(400).json({
        error: "Invalid plan selection",
      });
    }

    // ===================================
    // APPLY COUPON
    // ===================================
    if (couponCode) {
      try {
        // console.log(
        //   "\n🎟️ STARTING COUPON VALIDATION..."
        // );

        const couponsCollection =
          mongoose.connection.db.collection(
            "coupons"
          );

        const searchCode =
          couponCode
            ?.trim()
            .toUpperCase();

        // console.log(
        //   "SEARCHING COUPON:",
        //   searchCode
        // );

        const allCoupons =
          await couponsCollection
            .find({})
            .toArray();

        // console.log(
        //   "ALL COUPONS IN DB:"
        // );
        // console.log(allCoupons);

        const coupon =
          await couponsCollection.findOne({
            code: {
              $regex: `^${searchCode}$`,
              $options: "i",
            },
          });

        // console.log(
        //   "COUPON FOUND:"
        // );
        // console.log(coupon);

        if (coupon) {
          const discountAmount =
            (price *
              Number(
                coupon.discount
              )) /
            100;

          // console.log(
          //   "DISCOUNT %:",
          //   coupon.discount
          // );

          // console.log(
          //   "DISCOUNT AMOUNT:",
          //   discountAmount
          // );

          price =
            price -
            discountAmount;

          // console.log(
          //   "✅ DISCOUNTED PRICE:",
          //   price
          // );
        } else {
          console.log(
            "❌ COUPON NOT FOUND"
          );
        }
      } catch (couponErr) {
        console.error(
          "❌ COUPON LOOKUP ERROR:"
        );
        console.error(couponErr);
      }
    } else {
      console.log(
        "⚠️ NO COUPON CODE RECEIVED"
      );
    }

    const amount = Math.round(
      price * 100
    );

    // console.log(
    //   "\n💳 FINAL PRICE:",
    //   price
    // );

    // console.log(
    //   "💳 AMOUNT SENT TO RAZORPAY (PAISE):",
    //   amount
    // );

    const order =
      await razorpay.orders.create({
        amount,
        currency: "INR",
        receipt: `rcpt_${req.user.id
          .toString()
          .slice(-12)}_${Date.now()
            .toString()
            .slice(-8)}`,
      });

    // console.log(
    //   "\n✅ RAZORPAY ORDER CREATED"
    // );

    // console.log(
    //   "ORDER ID:",
    //   order.id
    // );

    // console.log(
    //   "ORDER AMOUNT:",
    //   order.amount
    // );

    // console.log(
    //   "ORDER DETAILS:"
    // );

    // console.log(order);

    // console.log(
    //   "================================\n"
    // );

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "❌ RAZORPAY ORDER CREATION ERROR:"
    );

    console.error(error);

    return res.status(500).json({
      error:
        error.message ||
        "Failed to create payment order",
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
    let resolvedPrice = 0;
    try {
      resolvedPrice = await pricingService.getPlanPrice(planName);
    } catch (err) {
      console.error("Failed to resolve dynamic price during payment verification:", err);
    }

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
        amount: resolvedPrice,
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
    <p><strong>Amount:</strong> ₹${resolvedPrice}</p>
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


// ================================
// VERIFY APPLE IAP PAYMENT
// ================================
exports.verifyApplePayment = async (req, res) => {
  try {
    const { planName, productId, transactionId, receipt } = req.body;

    if (!planName || !productId || !transactionId) {
      return res.status(400).json({
        error: "Missing required Apple payment fields",
      });
    }

    if (!ADMISSION_PACKAGES.includes(planName)) {
      return res.status(400).json({
        error: "Invalid admission package",
      });
    }

    const expectedProductMap = {
      SMART: "com.careergenai.plan.smart",
      PREMIUM: "com.careergenai.plan.premium",
      "ELITE VIP": "com.careergenai.plan.elitevip",
    };

    const expectedProductId = expectedProductMap[planName];

    if (expectedProductId !== productId) {
      return res.status(400).json({
        error: "Apple product does not match selected plan",
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

    // Resolve dynamic price from pricing service
    let resolvedPrice = 0;
    try {
      resolvedPrice = await pricingService.getPlanPrice(planName);
    } catch (err) {
      console.error("Failed to resolve dynamic price for Apple payment:", err);
    }

    // Admission package activation (same 3-month logic as Razorpay)
    const packageStartDate = new Date();
    const packageExpiryDate = new Date();
    packageExpiryDate.setMonth(packageExpiryDate.getMonth() + 3);

    user.profile.admissionPackage = {
      packageName: planName,
      amount: resolvedPrice,
      purchasedAt: packageStartDate,
      expiresAt: packageExpiryDate,
      paymentId: transactionId, // Apple transaction id
      orderId: productId,       // store Apple product id here
      status: "active",
      paymentProvider: "apple_iap",
      appleReceipt: receipt || null,
    };

    // Common receipt info
    user.profile.receiptStatus = "approved";
    user.profile.receiptUrl = `apple_iap:${transactionId}`;

    await user.save();

    // ===================================
    // EMAILS
    // ===================================
    try {
      const userSubject = `🎓 Admission Package Purchased: ${planName}`;
      const userBody = `
        <p>Hi ${user.name},</p>
        <p>Your Admission Guidance Package has been activated successfully via Apple In-App Purchase.</p>
        <p><strong>Package:</strong> ${planName}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
      `;

      await sendEmail(
        user.email,
        userSubject,
        "",
        userBody
      );

      const adminEmail =
        process.env.ADMIN_NOTIFY_TO || "careergenai9@gmail.com";

      await sendEmail(
        adminEmail,
        `🍎 New Apple IAP Purchase: ${planName}`,
        "",
        `
          <p><strong>User:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Amount:</strong> ₹${resolvedPrice}</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p><strong>Product ID:</strong> ${productId}</p>
        `
      );
    } catch (emailErr) {
      console.error("Apple payment email notification failed:", emailErr);
    }

    return res.json({
      success: true,
      message: "Apple payment verified successfully",
    });
  } catch (error) {
    console.error("Apple payment verification error:", error);
    return res.status(500).json({
      error: "Failed to verify Apple payment",
    });
  }
};
