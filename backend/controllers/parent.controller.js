const User = require("../models/user");
const ProgressReport = require("../models/ProgressReport");

/**
 * GET Parent Dashboard Data
 * Route: GET /api/parent/dashboard
 */
exports.getParentDashboard = async (req, res) => {
  try {
    // 1️⃣ Get logged-in user (Parent) ID from token
    const parentId = req.user.id;

    // 2️⃣ Fetch parent
    const parent = await User.findById(parentId).select("-password");
    console.log("DEBUG: Parent found:", parent ? parent.email : "null");
    console.log("DEBUG: Parent parentOf:", parent ? parent.parentOf : "null");

    if (!parent || parent.role !== "parent") {
      return res.status(403).json({
        message: "Access denied. Parent only."
      });
    }

    // 3️⃣ Check linked student (and fallback)
    let studentId = parent.parentOf && parent.parentOf.length > 0 ? parent.parentOf[0] : null;

    if (!studentId) {
      console.log("DEBUG: parentOf is empty, trying fallback search...");
      // Fallback: Find a student who has this parent in their 'parents' array
      const linkedStudent = await User.findOne({
        role: "student",
        parents: parent._id
      });

      if (linkedStudent) {
        studentId = linkedStudent._id;
        console.log("DEBUG: Fallback found student:", linkedStudent.email);

        // OPTIONAL: Update parent record to fix the link for next time
        parent.parentOf = [studentId];
        await parent.save();
      }
    }

    if (!studentId) {
      console.log("DEBUG: No student linked to this parent (even with fallback)");
      return res.json({
        parentProfile: {
          name: parent.name,
          email: parent.email,
          mobile: parent.mobile || null,
        },
        studentProfile: null,
        studentProgress: null
      });
    }

    console.log("DEBUG: Student ID to fetch:", studentId);

    // 4️⃣ Fetch student and their progress report
    const [student, studentProgress] = await Promise.all([
      User.findById(studentId).select("-password"),
      ProgressReport.findOne({ userId: studentId })
    ]);

    console.log("DEBUG: Student found:", student ? student.email : "null");
    console.log("DEBUG: Progress found:", studentProgress ? "yes" : "no");

    if (!student) {
      return res.status(404).json({
        message: "Linked student not found"
      });
    }

    // 5️⃣ Send dashboard response
    res.json({
      parentProfile: {
        name: parent.name,
        email: parent.email,
        mobile: parent.mobile || null,
      },
      studentProfile: {
        _id: student._id,
        name: student.name,
        email: student.email,
        mobile: student.mobile || null,
        isPremium: student.isPremium,
        services: student.services || {}
      },
      studentProgress: studentProgress || {}
    });

  } catch (error) {
    console.error("Parent Dashboard Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
