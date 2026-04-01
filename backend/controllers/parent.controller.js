const User = require("../models/User");
const ProgressReport = require("../models/ProgressReport");

exports.getParentDashboard = async (req, res) => {
  try {
    // 1️⃣ Get logged-in user (Parent) ID from token
    const parentId = req.user.id;

    // 2️⃣ Fetch parent
    const parent = await User.findById(parentId).select("-password");
    if (!parent || parent.role !== "parent") {
      return res.status(403).json({ message: "Access denied. Parent only." });
    }

    // 3️⃣ Check linked student (and fallback)
    let studentId = parent.profile?.parentOf?.[0] || null;

    if (!studentId) {
      // Fallback: Find a Student User that has this parent in their 'parents' array
      const linkedStudent = await User.findOne({ "profile.parents": parent._id });
      if (linkedStudent) {
        studentId = linkedStudent._id;

        // Correct parent pointer
        if (!parent.profile) parent.profile = {};
        parent.profile.parentOf = [studentId];
        await parent.save();
      }
    }

    if (!studentId) {
      return res.json({
        parentProfile: { name: parent.name, email: parent.email, mobile: parent.mobile },
        studentProfile: null,
        studentProgress: null
      });
    }

    // 4️⃣ Fetch linked student
    const [student, studentProgress] = await Promise.all([
      User.findById(studentId).select("-password"),
      ProgressReport.findOne({ userId: studentId })
    ]);

    if (!student) {
      return res.status(404).json({ message: "Linked student not found" });
    }

    // 5️⃣ Send dashboard response
    res.json({
      parentProfile: {
        name: parent.name,
        email: parent.email,
        mobile: parent.mobile,
      },
      studentProfile: {
        _id: student._id,
        name: student.name,
        email: student.email,
        mobile: student.mobile,
        isPremium: student.profile?.isPremium || false,
        services: student.profile?.services || {}
      },
      studentProgress: studentProgress || {}
    });

  } catch (error) {
    console.error("Parent Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
