const mongoose = require("mongoose");
const User = require("../models/user");

exports.getPremiumStatus = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ isPremium: false });
  }

  const isActive =
    user.premiumPlan &&
    new Date(user.premiumExpiresAt) > new Date();

  res.json({ isPremium: isActive });
};

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    // 🔍 Search sequentially in all roles
    let user = await User.findOne({ email });
    let role = 'student';

    if (!user) {
      user = await require("../models/Consultant").findOne({ email });
      role = 'consultant';
    }

    if (!user) {
      user = await require("../models/Teacher").findOne({ email });
      role = 'teacher';
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Expiry logic for students/parents
    if (role === 'student' && user.isPremium && user.premiumExpiresAt && new Date() > user.premiumExpiresAt) {
      user.isPremium = false;
      user.premiumPlan = null;
      user.premiumExpiresAt = null;
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.activatePremium = async (req, res) => {
  try {
    const { email, plan, receiptUrl } = req.body;

    if (!email || !plan) {
      return res.status(400).json({ success: false, message: 'Email and plan are required' });
    }

    const validPlans = ['1month', '2months', '3months'];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const now = new Date();
    let expiresAt = new Date(now);

    if (plan === '1month') {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    } else if (plan === '2months') {
      expiresAt.setMonth(expiresAt.getMonth() + 2);
    } else if (plan === '3months') {
      expiresAt.setFullYear(expiresAt.getMonth() + 3);
    }

    user.isPremium = true;
    user.premiumPlan = plan;
    user.premiumStartDate = now;
    user.premiumExpiresAt = expiresAt;
    user.receiptStatus = 'approved';

    if (receiptUrl) {
      user.receiptUrl = receiptUrl;
    }

    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('❌ Premium activation error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during premium activation'
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log('📸 Update profile request received');
    const { userId, email, name, fullName, mobile, phone } = req.body;

    if (!userId && !email) {
      return res.status(400).json({ success: false, message: "UserId or Email is required" });
    }

    // Load models
    const Consultant = require("../models/Consultant");
    const Teacher = require("../models/Teacher");

    // Attempt to find account in all collections
    let account;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      account = await User.findById(userId);
      if (!account) account = await Teacher.findById(userId);
      if (!account) account = await Consultant.findById(userId);
    }

    if (!account && email) {
      account = await User.findOne({ email });
      if (!account) account = await Teacher.findOne({ email });
      if (!account) account = await Consultant.findOne({ email });
    }

    if (!account) {
      console.log('❌ Account not found for update');
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    console.log('✅ Account found for update:', account.email);

    // Update common fields
    if (name) account.name = name;
    if (fullName) account.fullName = fullName;
    if (mobile) account.mobile = mobile;
    if (phone) account.phone = phone;

    // Support both Student (location) and Teacher (offlineLocation) fields
    if (req.body.bio !== undefined) account.bio = req.body.bio;
    if (req.body.location !== undefined) account.location = req.body.location;
    if (req.body.offlineLocation !== undefined) account.offlineLocation = req.body.offlineLocation;
    if (req.body.portfolio !== undefined) account.portfolio = req.body.portfolio;

    const updatedAccount = await account.save();
    console.log('✅ Profile updated successfully:', account.email);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedAccount
    });

  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({ success: false, message: "Server error while updating profile", details: error.message });
  }
};
