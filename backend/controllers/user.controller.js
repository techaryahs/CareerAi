const User = require("../models/User");

// @desc    Get user premium status
exports.getPremiumStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('profile');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      isPremium: user.profile?.isPremium || false,
      premiumPlan: user.profile?.premiumPlan || null,
      premiumStartAt: user.profile?.premiumStartAt || null,
      premiumExpiresAt: user.profile?.premiumExpiresAt || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching premium status' });
  }
};

// @desc    Poll premium status (checks payment)
exports.pollPremiumStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      isPremium: user.profile?.isPremium || false,
      receiptStatus: user.profile?.receiptStatus || "none"
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error polling premium status' });
  }
};

// @desc    Activate premium (Dev only)
exports.activatePremium = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.profile) user.profile = {};
    user.profile.isPremium = true;
    user.profile.premiumPlan = 'lifetime-dev';
    user.profile.premiumStartAt = new Date();
    await user.save();

    res.json({ message: "Premium activated successfully for testing" });
  } catch (error) {
    res.status(500).json({ message: "Server error activating premium" });
  }
};

// @desc    Get user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
      .select('-password')
      .populate('profile.teacherProfile profile.consultantProfile');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.profile) {
      user.profile = {};
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Fetch user by email error:", err);
    res.status(500).json({ message: "Server error fetching user" });
  }
};

// @desc    Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { email, name, mobile, bio, location, portfolio } = req.body;
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Since user.routes.js didn't specify authMiddleware for update-profile, we check by email context or req.user
    let user = null;
    if (req.user && req.user.id) {
      user = await User.findById(req.user.id);
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.profile) user.profile = {};

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (req.body.country) user.country = req.body.country;
    if (req.body.state) user.state = req.body.state;
    if (bio) user.profile.bio = bio;
    if (location) user.profile.location = location;
    if (portfolio) user.profile.portfolio = portfolio;
    if (imagePath) user.profile.profileImage = imagePath;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

