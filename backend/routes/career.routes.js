const express = require("express");
const router = express.Router();
const careerCtrl = require("../controllers/career.controller");
const auth = require("../middleware/auth");

// 🔹 Career recommendations (STATIC JSON)
router.post("/recommend", careerCtrl.recommendCareers);

// 🔹 AI-powered features
router.post("/colleges", careerCtrl.getColleges);
router.get("/quiz-questions", careerCtrl.getQuizQuestions);
router.post("/compare-courses", careerCtrl.compareCourses);
router.post("/generate-resume", careerCtrl.generateResume);
router.post("/quiz/submit", auth, careerCtrl.submitQuiz);


// 🔹 Search careers (AI)
router.get("/", careerCtrl.getCareers); // ✅ FIXED

module.exports = router;
