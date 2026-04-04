const axios = require("axios");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");

// ✅ Correct JSON file path
const filePath = path.join(__dirname, "../data/careersInterest.json");

exports.recommendCareers = (req, res) => {
  try {
    const { interests } = req.body;

    // ✅ Validate interests
    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ error: "Interests are required" });
    }

    // ✅ Ensure file exists
    if (!fs.existsSync(filePath)) {
      console.error("❌ careersInterest.json not found at:", filePath);
      return res.status(500).json({ error: "Career data file missing" });
    }

    // ✅ Read & parse JSON safely
    const careersData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!Array.isArray(careersData)) {
      return res.status(500).json({ error: "Invalid career data format" });
    }

    // ✅ Your exact matching logic (unchanged)
    const matched = careersData.filter(career =>
      interests.some(interest =>
        career.skills?.some(skill =>
          skill.toLowerCase().includes(interest.toLowerCase())
        ) ||
        career.category?.toLowerCase().includes(interest.toLowerCase())
      )
    );

    // ✅ Return fallback careers if no match
    res.status(200).json({
      careers: matched.length > 0 ? matched : careersData.slice(0, 5)
    });

  } catch (error) {
    console.error("❌ recommendCareers error:", error.message);
    res.status(500).json({
      error: "Failed to fetch career recommendations"
    });
  }
};

/* =========================
   GET COLLEGES (AI)
========================= */
exports.getColleges = async (req, res) => {
  const { course, location, collegeName, percentile } = req.body;

  if ((!course || !location) && !collegeName) {
    return res.status(400).json({
      error: '❌ Please provide either Course & Location OR College Name.'
    });
  }

  const collegeTemplate = `[
  {
    "top_course": "B.Tech Computer Science",
    "location": "Mumbai, Maharashtra",
    "rating": "4.8/5",
    "exam_accepted": "MHT-CET / JEE Mains",
    "average_package": "12 LPA",
    "fees": "1.5 Lakhs/year",
    "description": "Reputed college known for high placement rates."
  }
]`;

  const prompt = collegeName
    ? `Give complete detailed information about the college "${collegeName}" in valid JSON format including branch-wise cutoffs like:\\n${collegeTemplate}`
    : `Suggest top 10 reputed colleges in ${location} that offer a degree or specialization in "${course}". Return ONLY valid JSON with branch-wise cutoffs like:\\n${collegeTemplate}`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    let raw = response.data.choices[0].message.content.trim();
    raw = raw.replace(/```json|```/g, '').trim();

    const parsed = raw.startsWith("[")
      ? JSON.parse(raw)
      : JSON.parse(raw.match(/\\[\\s*{[\\s\\S]*?}\\s*\\]/)[0]);

    res.json({ colleges: parsed });

  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve valid college data.' });
  }
};

exports.getQuizQuestions = async (req, res) => {
  const count = parseInt(req.query.count) || 10;

  const prompt = `
Generate ${count} personality quiz questions for students, each with 4 multiple-choice options.
Return a JSON array like:
[
  {
    "question": "What do you enjoy doing the most?",
    "options": ["Solving puzzles", "Helping friends", "Drawing and painting", "Building models"]
  }
]
Only return valid JSON. No explanation or markdown.
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let raw = response.data.choices[0].message.content.trim();
    raw = raw.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);

      const valid = Array.isArray(parsed) &&
        parsed.every(q =>
          q.question &&
          Array.isArray(q.options) &&
          q.options.length === 4
        );

      if (!valid) {
        throw new Error('Invalid question format from AI');
      }

      res.json({ questions: parsed });

    } catch (parseErr) {
      console.error('JSON Parse Error:', parseErr);
      res.status(500).json({ error: 'Failed to parse quiz questions from AI response.' });
    }

  } catch (err) {
    console.error('Quiz Question Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch questions from AI.' });
  }
};

/**
 * SUBMIT QUIZ RESULT
 * POST /api/careers/quiz/submit
 */
exports.submitQuiz = async (req, res) => {
  console.log("🔥 QUIZ SUBMIT HIT:", req.user?.id);

  try {
    const studentId = req.user.id;
    const { score } = req.body;

    if (score === undefined) {
      return res.status(400).json({ message: "Score is required" });
    }

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.role !== "student") {
      return res.status(403).json({ message: "Only students can submit quiz" });
    }

    // Init services safely
    if (!student.profile) student.profile = {};
    if (!student.profile.services) student.profile.services = {};
    if (!student.profile.services.quiz) {
      student.profile.services.quiz = {
        attempted: false,
        totalAttempts: 0,
        bestScore: 0
      };
    }

    // Update quiz
    student.profile.services.quiz.attempted = true;
    student.profile.services.quiz.totalAttempts += 1;
    student.profile.services.quiz.bestScore = Math.max(
      student.profile.services.quiz.bestScore,
      score
    );
    student.profile.services.quiz.lastAttemptAt = new Date();

    student.markModified('profile');
    await student.save();

    console.log("✅ QUIZ SAVED:", student.profile.services.quiz);

    return res.json({
      message: "Quiz submitted successfully",
      score,
      totalAttempts: student.profile.services.quiz.totalAttempts,
      bestScore: student.profile.services.quiz.bestScore
    });

  } catch (err) {
    console.error("Quiz submit error:", err);
    return res.status(500).json({ message: "Failed to save quiz result" });
  }
};

exports.compareCourses = async (req, res) => {
  const { course1, course2 } = req.body;

  if (!course1 || !course2) {
    return res.status(400).json({ error: "Both course1 and course2 are required" });
  }

  const prompt = `Compare the following two courses: "${course1}" vs "${course2}".
Return ONLY a markdown table comparing these two courses on the following parameters:
- Duration
- Popular colleges
- Fees
- Placement scope
- Job roles
- Skills required
- Entrance exams
- Industry demand

Format:
| Parameter | ${course1} | ${course2} |
|-----------|------------|------------|
| ...       | ...        | ...        |

Strictly return the markdown table. No explanations or headings or markdown fences like \`\`\`. `;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    let raw = response.data.choices?.[0]?.message?.content?.trim() || '';

    raw = raw
      .replace(/^```(?: markdown) ?/gi, '')
      .replace(/```$/gi, '')
      .replace(/^(Here (is|are)[^\\n]*\\n|Below[^\\n]*\\n)/i, '')
      .trim();

    const hasTableSyntax = raw.includes('|') && raw.includes('---');
    if (!hasTableSyntax) {
      return res.status(500).json({
        error: '⚠️ Invalid comparison data received.',
        debug: raw
      });
    }

    res.json({ table: raw });

  } catch (error) {
    console.error('❌ Course Comparison Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch course comparison from AI.' });
  }
};

exports.generateResume = async (req, res) => {
  const {
    name, email, phone, education, skills,
    experience, projects, summary,
  } = req.body;

  const prompt = `
Use the following user details to generate a clean, ATS-friendly resume in professional tone and markdown format.

Full Name: ${name}
Email: ${email}
Phone: ${phone}
Summary: ${summary}
Education: ${education}
Skills: ${skills}
Experience: ${experience}
Projects: ${projects}

Return only the resume in markdown format. No introduction or explanation.
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const aiReply = response.data.choices?.[0]?.message?.content?.trim();

    if (!aiReply) {
      return res.status(500).json({ error: 'Empty response from OpenRouter.' });
    }

    if (req.user && req.user.id) {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        if (!profile.serviceActivity) profile.serviceActivity = {};
        if (!profile.serviceActivity.resumeBuilder) profile.serviceActivity.resumeBuilder = {};

        profile.serviceActivity.resumeBuilder.used = true;
        profile.serviceActivity.resumeBuilder.lastUsedAt = new Date();

        // Tell Mongoose the nested mixed object changed, just in case
        profile.markModified('serviceActivity');
        await profile.save();
      }
    }

    res.json({ resume: aiReply });
  } catch (err) {
    console.error('Resume Generation Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate resume from AI.' });
  }
};

exports.getCareers = async (req, res) => {
  const { search, category } = req.query;
  const query = search || category;

  if (!query) {
    return res.status(400).json({
      error: "Search or category is required"
    });
  }

  const prompt = `
Return exactly 5 careers matching "${query}" in JSON:
[
  {
    "title": "",
    "category": "",
    "description": "",
    "skills": [],
    "roadmap": [],
    "salary": "",
    "subcategories": [
      {
        "name": "",
        "description": "",
        "roadmap": []
      }
    ]
  }
]
No explanation, only valid JSON. No markdown fences.
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-haiku",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let raw = response.data.choices[0].message.content.trim();

    raw = raw
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .replace(/^[^^{\\[]+/, "")
      .trim();

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid JSON structure.");
    }

    res.json({ careers: parsed });

  } catch (err) {
    console.error("Career AI fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch careers from AI." });
  }
};

exports.startRoadmap = async (req, res) => {
  try {
    const { userId, careerName } = req.body;

    if (userId) {
      let profile = await Profile.findOne({ user: userId });
      if (profile) {
        if (!profile.serviceActivity) profile.serviceActivity = {};
        if (!profile.serviceActivity.careerRoadmap) profile.serviceActivity.careerRoadmap = {};

        profile.serviceActivity.careerRoadmap.used = true;
        profile.serviceActivity.careerRoadmap.lastUsedAt = new Date();
        profile.serviceActivity.careerRoadmap.careerPathName = careerName;

        profile.markModified('serviceActivity');
        await profile.save();
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Roadmap update error:", err);
    res.status(500).json({ error: "Failed to update roadmap activity" });
  }
};
