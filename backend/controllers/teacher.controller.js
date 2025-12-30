const Teacher = require("../models/Teacher");

/**
 * 📝 Update Teacher Subjects
 * PUT /api/teachers/update-subjects/:id
 */
exports.updateTeacherSubjects = async (req, res) => {
    try {
        const { id } = req.params;
        const { selectedSubjects } = req.body;

        if (!selectedSubjects || !Array.isArray(selectedSubjects)) {
            return res.status(400).json({ error: "selectedSubjects must be an array" });
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { selectedSubjects },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedTeacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        res.json({
            message: "Subjects updated successfully",
            teacher: updatedTeacher
        });
    } catch (err) {
        console.error("❌ Update Teacher Subjects Error:", err);
        res.status(500).json({ error: "Server error while updating subjects" });
    }
};

/**
 * 🔍 Get Teacher By ID
 * GET /api/teachers/:id
 */
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).select("-password");
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.json(teacher);
    } catch (err) {
        console.error("❌ Fetch Teacher Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
