const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("profile.teacherProfile profile.consultantProfile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Auto init profile if missing
    if (!user.profile) {
      user.profile = {};
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, mobile, bio, location, portfolio } = req.body;
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (!user.profile) user.profile = {};

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
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
