const mongoose = require("mongoose");

const getCouponsCollection = () => {
  return mongoose.connection.db.collection("coupons");
};

// ===================================
// CREATE COUPON
// ===================================
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount } = req.body;

    if (!code || !discount) {
      return res.status(400).json({
        success: false,
        message: "Coupon code and discount are required",
      });
    }

    const coupons = getCouponsCollection();

    const normalizedCode = code.trim().toUpperCase();

    const existingCoupon = await coupons.findOne({
      code: normalizedCode,
    });

    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon already exists",
      });
    }

    const coupon = {
      code: normalizedCode,
      discount: Number(discount),
      active: true,
      createdAt: new Date(),
    };

    await coupons.insertOne(coupon);

    return res.status(201).json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error("CREATE COUPON ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// GET ALL COUPONS
// ===================================
exports.getCoupons = async (req, res) => {
  try {
    const coupons = getCouponsCollection();

    const allCoupons = await coupons
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.json({
      success: true,
      coupons: allCoupons,
    });
  } catch (error) {
    console.error("GET COUPONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// VALIDATE COUPON
// ===================================
exports.validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    const coupons = getCouponsCollection();

    const coupon = await coupons.findOne({
      code: code.trim().toUpperCase(),
      active: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon",
      });
    }

    return res.json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error("VALIDATE COUPON ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// TOGGLE COUPON STATUS
// ===================================
exports.toggleCouponStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const coupons = getCouponsCollection();

    const { ObjectId } = require("mongodb");

    const coupon = await coupons.findOne({
      _id: new ObjectId(id),
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    await coupons.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          active: !coupon.active,
        },
      }
    );

    const updatedCoupon = await coupons.findOne({
      _id: new ObjectId(id),
    });

    return res.json({
      success: true,
      coupon: updatedCoupon,
    });
  } catch (error) {
    console.error("TOGGLE COUPON ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};