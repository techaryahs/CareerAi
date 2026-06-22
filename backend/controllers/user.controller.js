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

    // Sync Consultant profile if user is a consultant
    if (user.role === "consultant" && user.profile.consultantProfile) {
      const Consultant = require("../models/Consultant");
      const consultant = await Consultant.findById(user.profile.consultantProfile);
      if (consultant) {
        if (name) consultant.name = name;
        if (bio) consultant.bio = bio;
        if (imagePath) consultant.image = imagePath;
        if (req.body.role) consultant.role = req.body.role;
        if (req.body.expertise) consultant.expertise = req.body.expertise;
        if (req.body.experience) consultant.experience = req.body.experience;
        
        if (req.body.availability) {
          let avail = req.body.availability;
          if (typeof avail === "string") {
            try {
              avail = JSON.parse(avail);
            } catch (e) {
              console.warn("Failed to parse availability", e);
            }
          }
          if (Array.isArray(avail)) {
            consultant.availability = avail;
          }
        }

        // Auto resubmit status back to pending if it was rejected and meaningful changes were made
        const hasMeaningfulChanges = name || bio || req.body.role || req.body.expertise || req.body.experience || req.body.availability;
        if (consultant.status === "rejected" && hasMeaningfulChanges) {
          consultant.status = "pending";
          consultant.rejectionReason = "";
          consultant.statusUpdatedAt = new Date();
          consultant.statusUpdatedBy = user._id;
        }
        await consultant.save();
      }
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

// @desc    Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete associated consultant profile if exists
    if (user.role === "consultant" && user.profile?.consultantProfile) {
      const Consultant = require("../models/Consultant");
      await Consultant.findByIdAndDelete(user.profile.consultantProfile);
    }
    
    // Delete associated teacher profile if exists
    if (user.role === "teacher" && user.profile?.teacherProfile) {
      const Teacher = require("../models/Teacher");
      await Teacher.findByIdAndDelete(user.profile.teacherProfile);
    }

    await User.findByIdAndDelete(req.user.id);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Account deletion error:", err);
    res.status(500).json({ message: "Server error deleting account" });
  }
};

