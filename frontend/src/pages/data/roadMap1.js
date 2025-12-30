// src/data/roadMap.js

// 🧠 STANDARD STRUCTURE FOR ALL ROADMAPS
// Each career object should include:
// {
//   id: Number,
//   title: String,
//   category: String,
//   emoji: String,
//   overview: String,
//   jobRoles: [],
//   responsibilities: [],
//   certifications: [],
//   specializations: [],
//   topColleges: [],
//   topRecruiters: [],
//   projects: [],
//   interviewTips: [],
//   education: [],
//   skills: { technical: [], soft: [], tools: [] },
//   roadmap: { beginner: [], intermediate: [], advanced: [], expert: [] },
//   resources: { courses: [], books: [], communities: [], youtube: [] },
//   salary: [],
//   futureTrends: [],
//   personalityType: String
// }

// --------------------------------------------------
// 1️⃣ SOFTWARE DEVELOPER ROADMAP
// --------------------------------------------------

export const softwareDevData = {
  id: 1,
  title: "Software Developer",
  category: "Technology",
  emoji: "💻",
  overview:
    "A Software Developer designs, builds, tests, and maintains software applications that power everything from mobile apps to enterprise systems. Ideal for analytical thinkers who enjoy solving problems, coding, and building digital products.",

  jobRoles: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Mobile App Developer"
  ],

  responsibilities: [
    "Design, develop, and maintain software applications.",
    "Write clean, scalable, and efficient code.",
    "Debug and fix software issues promptly.",
    "Collaborate with cross-functional teams (designers, testers, PMs).",
    "Optimize performance and security of applications.",
    "Participate in code reviews and continuous integration."
  ],

  certifications: [
    "AWS Certified Developer – Associate",
    "Google Associate Cloud Engineer",
    "Microsoft Certified: Azure Developer Associate",
    "Meta Front-End Developer (Coursera)",
    "Oracle Java Programmer Certification"
  ],

  specializations: [
    "Web Development (Frontend / Backend)",
    "Cloud Computing & DevOps",
    "Mobile App Development",
    "Artificial Intelligence Integration",
    "Cybersecurity in Software Systems"
  ],

  topColleges: [
    "IIT Bombay",
    "IIIT Hyderabad",
    "BITS Pilani",
    "VIT Vellore",
    "Delhi Technological University"
  ],

  topRecruiters: [
    "Google",
    "Microsoft",
    "Amazon",
    "TCS",
    "Infosys",
    "Zoho",
    "Wipro",
    "Accenture"
  ],

  projects: [
    "Portfolio Website using React and Tailwind",
    "E-commerce Application (MERN Stack)",
    "Chat App using WebSocket and Firebase",
    "Blog CMS with Django and PostgreSQL",
    "CI/CD Automation with Docker"
  ],

  interviewTips: [
    "Practice DSA daily (LeetCode, GFG).",
    "Understand OOP and Design Patterns.",
    "Study System Design and API basics.",
    "Revise Database and SQL concepts.",
    "Prepare behavioral questions and show GitHub projects."
  ],

  education: [
    "Complete 12th grade with focus on Mathematics and Computer Science.",
    "Earn a Bachelor's degree in Computer Science, Information Technology, or Software Engineering.",
    "Optionally pursue a Master's (M.Tech/MCA) for advanced roles.",
    "Complete certifications in key technologies (AWS, Google Cloud, React, or Python)."
  ],

  skills: {
    technical: [
      "Programming Languages (Python, JavaScript, Java, C++)",
      "Web Development (HTML, CSS, React, Node.js)",
      "Database Management (SQL, MongoDB, Firebase)",
      "Version Control (Git, GitHub)",
      "APIs and RESTful Services",
      "Software Testing & Debugging"
    ],
    soft: [
      "Analytical Thinking",
      "Problem Solving",
      "Team Collaboration",
      "Attention to Detail",
      "Time Management"
    ],
    tools: ["VS Code", "Postman", "GitHub", "Docker", "JIRA", "Figma"]
  },

  roadmap: {
    beginner: [
      "Learn programming fundamentals (variables, loops, functions).",
      "Choose one primary language — Python or JavaScript.",
      "Understand object-oriented programming (OOP) concepts.",
      "Build small projects like portfolio website or calculator."
    ],
    intermediate: [
      "Master a framework (React, Django, Node.js).",
      "Work on open-source or internship projects.",
      "Implement CRUD apps with APIs and databases."
    ],
    advanced: [
      "Learn system design, scalability, and microservices.",
      "Work with cloud services (AWS/GCP/Azure).",
      "Optimize for performance and security."
    ],
    expert: [
      "Lead teams, mentor juniors.",
      "Design and architect scalable systems.",
      "Stay updated with AI, DevOps, and new technologies."
    ]
  },

  resources: {
    courses: [
      "freeCodeCamp – Full Stack Developer Course",
      "Coursera – Google Software Engineering Specialization"
    ],
    books: [
      "Clean Code by Robert C. Martin",
      "The Pragmatic Programmer by Andrew Hunt and David Thomas"
    ],
    communities: ["Stack Overflow", "GitHub", "Dev.to"],
    youtube: ["Traversy Media", "Fireship", "Programming with Mosh"]
  },

  salary: [
    { role: "Junior Developer", experience: "0–2 years", salary: "₹3–6 LPA" },
    { role: "Software Engineer", experience: "2–4 years", salary: "₹6–12 LPA" },
    { role: "Senior Developer", experience: "5–8 years", salary: "₹12–25 LPA" },
    { role: "Technical Lead", experience: "8+ years", salary: "₹25–45 LPA" }
  ],

  futureTrends: [
    "AI-assisted coding tools are transforming workflows.",
    "Cloud-native architecture and DevOps demand are rising.",
    "Full Stack and automation skills are increasingly valuable."
  ],

  personalityType: "Introvert"
};

// --------------------------------------------------
// 2️⃣ DOCTOR ROADMAP
// --------------------------------------------------

export const doctorData = {
  id: 2,
  title: "Doctor",
  category: "Healthcare",
  emoji: "🩺",
  overview:
    "Doctors diagnose, treat, and help prevent diseases and injuries. They play a vital role in improving patients’ health and quality of life through medical expertise and empathy.",

  jobRoles: [
    "General Physician",
    "Surgeon",
    "Pediatrician",
    "Cardiologist",
    "Dermatologist",
    "Neurologist"
  ],

  responsibilities: [
    "Diagnose illnesses and prescribe treatments.",
    "Perform surgeries and medical procedures.",
    "Monitor patient recovery and adjust care plans.",
    "Collaborate with nurses and other medical staff.",
    "Maintain detailed medical records and reports."
  ],

  certifications: [
    "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
    "MD (Doctor of Medicine) or MS (Master of Surgery)",
    "Specialization Certification (Cardiology, Pediatrics, etc.)",
    "Advanced Cardiac Life Support (ACLS)"
  ],

  specializations: [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Gynecology",
    "Psychiatry"
  ],

  topColleges: [
    "AIIMS Delhi",
    "Christian Medical College Vellore",
    "JIPMER Puducherry",
    "Kasturba Medical College Manipal",
    "Armed Forces Medical College Pune"
  ],

  topRecruiters: [
    "Apollo Hospitals",
    "Fortis Healthcare",
    "AIIMS",
    "Government Health Departments",
    "Private Clinics & NGOs"
  ],

  projects: [
    "Health Awareness Campaign",
    "Patient Record Management System",
    "AI-based Disease Prediction Research",
    "Telemedicine Platform Prototype"
  ],

  interviewTips: [
    "Be clear about your specialization and case studies.",
    "Revise anatomy, pathology, and diagnostic processes.",
    "Show empathy and ethical judgment in scenario questions.",
    "Demonstrate teamwork and decision-making under pressure."
  ],

  education: [
    "Complete 12th grade with Physics, Chemistry, Biology.",
    "Qualify NEET for MBBS admission.",
    "Complete MBBS (5.5 years including internship).",
    "Pursue MD/MS for specialization.",
    "Register with Medical Council of India (MCI)."
  ],

  skills: {
    technical: [
      "Medical Diagnosis",
      "Surgical Skills",
      "Patient Care",
      "Pharmacology Knowledge",
      "Medical Research"
    ],
    soft: [
      "Empathy",
      "Communication",
      "Decision Making",
      "Attention to Detail"
    ],
    tools: [
      "Stethoscope",
      "ECG Machine",
      "Ultrasound Equipment",
      "EMR Software"
    ]
  },

  roadmap: {
    beginner: [
      "Focus on Biology and Chemistry in high school.",
      "Prepare and qualify NEET for medical entrance."
    ],
    intermediate: [
      "Complete MBBS and clinical internship.",
      "Participate in medical camps and hospital training."
    ],
    advanced: [
      "Pursue specialization (MD/MS).",
      "Assist in research and publish medical papers."
    ],
    expert: [
      "Lead healthcare teams.",
      "Open private practice or research institute.",
      "Contribute to medical education or policy."
    ]
  },

  resources: {
    courses: [
      "Coursera – Clinical Research & Medical Writing",
      "edX – Anatomy and Physiology Basics"
    ],
    books: [
      "Gray’s Anatomy",
      "Harrison’s Principles of Internal Medicine"
    ],
    communities: ["Doctors Without Borders", "Medscape", "BMJ Forums"],
    youtube: ["Osmosis", "Armando Hasudungan", "Ninja Nerd Science"]
  },

  salary: [
    { role: "Resident Doctor", experience: "0–2 years", salary: "₹6–10 LPA" },
    { role: "Specialist Doctor", experience: "3–6 years", salary: "₹10–25 LPA" },
    { role: "Senior Consultant", experience: "6–10 years", salary: "₹25–50 LPA" },
    { role: "Surgeon / Head of Department", experience: "10+ years", salary: "₹50–100 LPA" }
  ],

  futureTrends: [
    "Telemedicine and online consultations expanding rapidly.",
    "AI-assisted diagnosis and predictive healthcare emerging.",
    "Demand for specialists in aging and mental health rising."
  ],

  personalityType: "Empathetic Extrovert"
};

// --------------------------------------------------
// MASTER EXPORT FOR DYNAMIC LOOKUPS
// --------------------------------------------------

export const roadmaps = {
  "Software Developer": softwareDevData,
  "Doctor": doctorData
};
