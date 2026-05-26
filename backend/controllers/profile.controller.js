const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user ? req.user.id : null);
    if (!userId) return res.status(400).json({ message: "No user ID provided" });

    const user = await User.findById(userId)
      .select("-password")
      .populate("profile.teacherProfile profile.consultantProfile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
    const userId = req.params.userId || (req.user ? req.user.id : null);
    if (!userId) return res.status(401).json({ message: "Authentication required" });

    const { name, mobile, profile } = req.body;
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.profile) user.profile = {};

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    
    // Update basic profile fields if they exist at top level or in profile object
    if (req.body.bio) user.profile.bio = req.body.bio;
    if (req.body.location) user.profile.location = req.body.location;
    if (req.body.portfolio) user.profile.portfolio = req.body.portfolio;

    // Bulk update nested profile sections (highSchool, workExperience, etc.)
    if (profile) {
      Object.keys(profile).forEach(key => {
        user.profile[key] = profile[key];
      });
      // Handle Mongoose Mixed type or Array re-assignment
      user.markModified('profile');
    }

    if (imagePath) user.profile.profileImage = imagePath;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

exports.addProfileItem = async (req, res) => {
  try {
    const { section, data } = req.body;
    const userId = req.params.userId || (req.user ? req.user.id : null);

    if (!userId) return res.status(401).json({ message: "Authentication required" });
    if (!section || !data) return res.status(400).json({ message: "Missing section or data" });

    const validSections = [
      "highSchool", "underGrad", "masters", "testScores", "workExperience", 
      "research", "projects", "volunteering", "targetUniversities"
    ];

    if (!validSections.includes(section)) {
      return res.status(400).json({ message: "Invalid profile section" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.profile) user.profile = {};
    if (!user.profile[section]) user.profile[section] = [];

    user.profile[section].push(data);
    await user.save();

    res.json({ 
      message: `${section} added successfully`, 
      profile: user.profile 
    });
  } catch (err) {
    console.error("Profile add error:", err);
    res.status(500).json({ message: "Server error adding profile section" });
  }
};

exports.updateProfileItem = async (req, res) => {
  try {
    const { section, itemId, data } = req.body;
    const userId = req.params.userId || (req.user ? req.user.id : null);

    if (!userId) return res.status(401).json({ message: "Authentication required" });
    if (!section || !itemId || !data) return res.status(400).json({ message: "Missing information" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.profile || !user.profile[section]) {
      return res.status(404).json({ message: "Section not found" });
    }

    const itemIndex = user.profile[section].findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Merge existing data with new data
    user.profile[section][itemIndex] = { ...user.profile[section][itemIndex].toObject(), ...data };
    
    user.markModified(`profile.${section}`);
    await user.save();

    res.json({ message: "Item updated successfully", profile: user.profile });
  } catch (err) {
    console.error("Profile item update error:", err);
    res.status(500).json({ message: "Server error updating profile item" });
  }
};

exports.deleteProfileItem = async (req, res) => {
  try {
    const { section, itemId } = req.body;
    const userId = req.params.userId || (req.user ? req.user.id : null);

    if (!userId) return res.status(401).json({ message: "Authentication required" });
    if (!section || !itemId) return res.status(400).json({ message: "Missing section or itemId" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.profile || !user.profile[section]) {
      return res.status(404).json({ message: "Section not found" });
    }

    user.profile[section] = user.profile[section].filter(item => item._id.toString() !== itemId);
    
    user.markModified(`profile.${section}`);
    await user.save();

    res.json({ message: "Item deleted successfully", profile: user.profile });
  } catch (err) {
    console.error("Profile item deletion error:", err);
    res.status(500).json({ message: "Server error deleting profile item" });
  }
};

