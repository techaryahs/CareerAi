const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");

// Teacher-specific routes (auth routes like register are in auth.routes.js)
router.get("/:id", teacherController.getTeacherById);
router.put("/update-subjects/:id", teacherController.updateTeacherSubjects);

module.exports = router;
