const mongoose = require("mongoose");
const User = require("../models/user");

/* =========================
   GET PROFILE (WITH SERVICES)
========================= */
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database not available" });
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      profile: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        avatar:
          user.avatar ||
          "https://placehold.co/200x200/E2E8F0/1A237E?text=U"
      },
      premium: {
        isPremium: user.isPremium,
        premiumPlan: user.premiumPlan,
        premiumStartAt: user.premiumStartAt,
        premiumExpiresAt: user.premiumExpiresAt
      },
      services: user.serviceActivity || {}
    });

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, mobile, avatar } = req.body;

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database not available" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobile, avatar },
      { new: true }
    );

    res.json(updatedUser);

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
