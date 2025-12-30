// src/data/EduSubjects.js
/**
 * COMPREHENSIVE SUBJECT CATALOG FOR INDIAN EDUCATION
 * Covers: Central/State Universities, Private Colleges, Deemed Universities, 
 * AICTE/UGC/PCI/BCI/MCI approved programs
 * Includes variations in curriculum names across institutions
 */

export const EDU_SUBJECTS = [

   /* =====================================================
      COMPUTER SCIENCE & ENGINEERING (CSE/IT)
      Covers: BTech CSE, IT, CSE-AI, CSE-DS, BCA, MCA
   ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "cse_math_1", name: "Engineering Mathematics I", branchId: "cse", semesters: [1], tags: ["core", "mathematics"] },
   { id: "cse_physics", name: "Engineering Physics", branchId: "cse", semesters: [1], tags: ["core", "science"] },
   { id: "cse_physics_alt", name: "Applied Physics", branchId: "cse", semesters: [1], tags: ["core", "science"] },
   { id: "cse_chemistry_alt", name: "Applied Chemistry", branchId: "cse", semesters: [1], tags: ["core", "science"] },
   { id: "cse_chemistry", name: "Engineering Chemistry", branchId: "cse", semesters: [1], tags: ["core", "science"] },
   { id: "cse_basic_electrical", name: "Basic Electrical Engineering", branchId: "cse", semesters: [1, 2], tags: ["core"] },
   { id: "cse_c_programming", name: "Programming in C", branchId: "cse", semesters: [1], tags: ["core", "programming"] },
   { id: "cse_problem_solving", name: "Problem Solving & Programming", branchId: "cse", semesters: [1], tags: ["core", "programming"] },
   { id: "cse_engineering_graphics", name: "Engineering Graphics", branchId: "cse", semesters: [1], tags: ["core"] },
   { id: "cse_communication_skills", name: "Professional Communication", branchId: "cse", semesters: [1, 2], tags: ["soft_skills"] },
   { id: "cse_engineering_drawing", name: "Engineering Drawing", branchId: "cse", semesters: [1, 2], tags: ["core"] },
   { id: "cse_engineering_mechanical", name: "Engineering Mechanics", branchId: "cse", semesters: [1, 2], tags: ["core"] },
   { id: "cse_env_studies", name: "Environmental Studies", branchId: "cse", semesters: [1], tags: ["general"] },

   // -------- SEMESTER 2 --------
   { id: "cse_math_2", name: "Engineering Mathematics II", branchId: "cse", semesters: [2], tags: ["core", "mathematics"] },
   { id: "cse_math_2_alt", name: "Advanced Engineering Mathematics", branchId: "cse", semesters: [2], tags: ["core", "mathematics"] },
   { id: "cse_linear_algebra", name: "Linear Algebra & Calculus", branchId: "cse", semesters: [2], tags: ["mathematics"] },
   { id: "cse_mechanics", name: "Engineering Mechanics", branchId: "cse", semesters: [2], tags: ["core"] },
   { id: "cse_oops", name: "Object Oriented Programming", branchId: "cse", semesters: [2], tags: ["core", "programming"] },
   { id: "cse_cpp", name: "Programming in C++", branchId: "cse", semesters: [2], tags: ["programming"] },
   { id: "cse_java_basics", name: "Java Programming Fundamentals", branchId: "cse", semesters: [2], tags: ["programming"] },
   { id: "cse_python_basics", name: "Python Programming", branchId: "cse", semesters: [2], tags: ["programming"] },
   { id: "cse_env", name: "Environmental Studies", branchId: "cse", semesters: [2], tags: ["general"] },
   { id: "cse_communication_skills", name: "Professional Communication", branchId: "cse", semesters: [2], tags: ["soft_skills"] },
   { id: "cse_engineering_drawing", name: "Engineering Drawing", branchId: "cse", semesters: [2], tags: ["core"] },
   { id: "cse_engineering_mechanical", name: "Engineering Mechanics", branchId: "cse", semesters: [2], tags: ["core"] },


   // -------- SEMESTER 3 --------
   { id: "cse_discrete", name: "Discrete Mathematics", branchId: "cse", semesters: [3], tags: ["core", "mathematics"] },
   { id: "cse_discrete_alt", name: "Discrete Mathematical Structures", branchId: "cse", semesters: [3], tags: ["mathematics"] },
   { id: "cse_dsa", name: "Data Structures", branchId: "cse", semesters: [3], tags: ["core"] },
   { id: "cse_dsa_alt", name: "Data Structures & Algorithms", branchId: "cse", semesters: [3], tags: ["core"] },
   { id: "cse_dld", name: "Digital Logic Design", branchId: "cse", semesters: [3], tags: ["core"] },
   { id: "cse_digital_electronics", name: "Digital Electronics & Circuits", branchId: "cse", semesters: [3], tags: ["core"] },
   { id: "cse_prob_stats", name: "Probability & Statistics", branchId: "cse", semesters: [3], tags: ["mathematics"] },
   { id: "cse_stats_alt", name: "Applied Statistics for Engineers", branchId: "cse", semesters: [3], tags: ["mathematics"] },
   { id: "cse_java_advanced", name: "Advanced Java Programming", branchId: "cse", semesters: [3], tags: ["programming"] },
   { id: "cse_software_tools", name: "Software Tools & Technology", branchId: "cse", semesters: [3], tags: ["tools"] },

   // -------- SEMESTER 4 --------
   { id: "cse_algo", name: "Design & Analysis of Algorithms", branchId: "cse", semesters: [4], tags: ["core"] },
   { id: "cse_algo_alt", name: "Algorithm Design & Complexity", branchId: "cse", semesters: [4], tags: ["core"] },
   { id: "cse_coa", name: "Computer Organization & Architecture", branchId: "cse", semesters: [4], tags: ["core"] },
   { id: "cse_coa_alt", name: "Computer Architecture & Organization", branchId: "cse", semesters: [4], tags: ["core"] },
   { id: "cse_os", name: "Operating Systems", branchId: "cse", semesters: [4], tags: ["core"] },
   { id: "cse_os_alt", name: "Operating System Principles", branchId: "cse", semesters: [4], tags: ["core"] },
   { id: "cse_nm", name: "Numerical Methods", branchId: "cse", semesters: [4], tags: ["mathematics"] },
   { id: "cse_numerical_alt", name: "Numerical & Scientific Computing", branchId: "cse", semesters: [4], tags: ["mathematics"] },
   { id: "cse_automata", name: "Automata Theory", branchId: "cse", semesters: [4], tags: ["theory"] },
   { id: "cse_formal_lang", name: "Formal Languages & Automata", branchId: "cse", semesters: [4], tags: ["theory"] },
   { id: "cse_introduction_ai", name: "Introduction to Artificial Intelligence", branchId: "cse", semesters: [4], tags: ["ai_ml"] },
   { id: "cse_digital_image", name: "Digital Image Processing", branchId: "cse", semesters: [4], tags: ["core"] },

   // -------- SEMESTER 5 --------
   { id: "cse_dbms", name: "Database Management Systems", branchId: "cse", semesters: [5], tags: ["core"] },
   { id: "cse_rdbms", name: "Relational Database Management Systems", branchId: "cse", semesters: [5], tags: ["core"] },
   { id: "cse_cn", name: "Computer Networks", branchId: "cse", semesters: [5], tags: ["core"] },
   { id: "cse_network_alt", name: "Data Communication & Networks", branchId: "cse", semesters: [5], tags: ["core"] },
   { id: "cse_se", name: "Software Engineering", branchId: "cse", semesters: [5], tags: ["core"] },
   { id: "cse_mp", name: "Microprocessors & Microcontrollers", branchId: "cse", semesters: [5], tags: ["hardware"] },
   { id: "cse_embedded_intro", name: "Introduction to Embedded Systems", branchId: "cse", semesters: [5], tags: ["hardware"] },
   { id: "cse_unix", name: "Unix & Shell Programming", branchId: "cse", semesters: [5], tags: ["programming"] },
   { id: "cse_linux", name: "Linux System Administration", branchId: "cse", semesters: [5], tags: ["systems"] },
   { id: "cse_web", name: "Web Technologies", branchId: "cse", semesters: [5], tags: ["development"] },

   // -------- SEMESTER 6 --------
   { id: "cse_toc", name: "Theory of Computation", branchId: "cse", semesters: [6], tags: ["theory"] },
   { id: "cse_cd", name: "Compiler Design", branchId: "cse", semesters: [6], tags: ["core"] },
   { id: "cse_ml_intro", name: "Introduction to Machine Learning", branchId: "cse", semesters: [6], tags: ["ai_ml"] },
   { id: "cse_web", name: "Web Technologies", branchId: "cse", semesters: [6], tags: ["development"] },
   { id: "cse_cg", name: "Computer Graphics", branchId: "cse", semesters: [6], tags: ["graphics"] },
   { id: "cse_python_advanced", name: "Advanced Python Programming", branchId: "cse", semesters: [6], tags: ["programming"] },

   // -------- SEMESTER 7 --------
   { id: "cse_ai", name: "Artificial Intelligence", branchId: "cse", semesters: [7], tags: ["ai_ml"] },
   { id: "cse_ai_expert", name: "AI & Expert Systems", branchId: "cse", semesters: [7], tags: ["ai_ml"] },
   { id: "cse_cloud_alt", name: "Cloud Computing & Virtualization", branchId: "cse", semesters: [7], tags: ["cloud"] },
   { id: "cse_dwm", name: "Data Warehousing & Mining", branchId: "cse", semesters: [7], tags: ["data"] },
   { id: "cse_cyber", name: "Cyber Security", branchId: "cse", semesters: [7], tags: ["security"] },
   { id: "cse_info_security", name: "Information Security", branchId: "cse", semesters: [7], tags: ["security"] },
   { id: "cse_cryptography", name: "Cryptography & Network Security", branchId: "cse", semesters: [7], tags: ["security"] },
   { id: "cse_blockchain", name: "Blockchain Technology", branchId: "cse", semesters: [7], tags: ["emerging"] },
   { id: "cse_nlp", name: "Natural Language Processing", branchId: "cse", semesters: [7], tags: ["ai_ml"] },
   { id: "cse_big_data", name: "Big Data Analytics", branchId: "cse", semesters: [7], tags: ["data"] },


   // -------- SEMESTER 8 --------
   { id: "cse_ds", name: "Distributed Systems", branchId: "cse", semesters: [8], tags: ["systems"] },
   { id: "cse_parallel", name: "Parallel & Distributed Computing", branchId: "cse", semesters: [8], tags: ["systems"] },
   { id: "cse_iot", name: "Internet of Things", branchId: "cse", semesters: [8], tags: ["iot"] },
   { id: "cse_iot_arch", name: "IoT Architecture & Applications", branchId: "cse", semesters: [8], tags: ["iot"] },
   { id: "cse_mobile", name: "Mobile Application Development", branchId: "cse", semesters: [8], tags: ["development"] },
   { id: "cse_android", name: "Android Application Development", branchId: "cse", semesters: [8], tags: ["development"] },
   { id: "cse_ethics", name: "Professional Ethics", branchId: "cse", semesters: [8], tags: ["ethics"] },

   { id: "cse_deep_learning", name: "Deep Learning", branchId: "cse", semesters: [8], tags: ["ai_ml"] },
   { id: "cse_cv", name: "Computer Vision", branchId: "cse", semesters: [8], tags: ["ai_ml"] },
   { id: "cse_robotics", name: "Robotics & Automation", branchId: "cse", semesters: [8], tags: ["robotics"] },

   // Additional CSE Electives (across semesters)
   { id: "cse_agile", name: "Agile Software Development", branchId: "cse", semesters: [6, 7], tags: ["elective"] },
   { id: "cse_devops", name: "DevOps Practices", branchId: "cse", semesters: [7, 8], tags: ["elective"] },
   { id: "cse_microservices", name: "Microservices Architecture", branchId: "cse", semesters: [7, 8], tags: ["elective"] },
   { id: "cse_quantum", name: "Quantum Computing Basics", branchId: "cse", semesters: [7, 8], tags: ["elective", "emerging"] },
   { id: "cse_ar_vr", name: "Augmented & Virtual Reality", branchId: "cse", semesters: [7, 8], tags: ["elective"] },
   { id: "cse_game_dev", name: "Game Development", branchId: "cse", semesters: [6, 7], tags: ["elective"] },
   { id: "cse_ethical_hacking", name: "Ethical Hacking", branchId: "cse", semesters: [7, 8], tags: ["elective", "security"] },
   { id: "cse_spm", name: "Software Project Management", branchId: "cse", semesters: [7, 8], tags: ["elective"] },
   { id: "cse_hci", name: "Human Computer Interaction", branchId: "cse", semesters: [6, 7], tags: ["elective"] },
   { id: "cse_graph_theory", name: "Graph Theory & Applications", branchId: "cse", semesters: [5, 6], tags: ["elective"] },

   // === MISSING MANDATORY / AUDIT COURSES (India Specific) ===
   { id: "cse_consti", name: "Constitution of India", branchId: "cse", semesters: [3, 4], tags: ["general", "mandatory"] },
   { id: "cse_tradition", name: "Essence of Indian Traditional Knowledge", branchId: "cse", semesters: [3, 4], tags: ["general", "mandatory"] },
   { id: "cse_bio", name: "Biology for Engineers", branchId: "cse", semesters: [3, 4], tags: ["science", "mandatory"] },

   // === MISSING MANAGEMENT & HUMANITIES ===
   { id: "cse_economics", name: "Engineering Economics & Financial Management", branchId: "cse", semesters: [4, 5], tags: ["management"] },
   { id: "cse_ob", name: "Organizational Behavior", branchId: "cse", semesters: [5, 6], tags: ["management"] },
   { id: "cse_ipr", name: "Intellectual Property Rights (IPR)", branchId: "cse", semesters: [7, 8], tags: ["legal", "management"] },
   { id: "cse_disaster", name: "Disaster Management", branchId: "cse", semesters: [7], tags: ["general"] },

   // === MISSING TECHNICAL CORE/ELECTIVES ===
   { id: "cse_stqa", name: "Software Testing & Quality Assurance", branchId: "cse", semesters: [6, 7], tags: ["core", "testing"] },
   { id: "cse_or", name: "Operations Research", branchId: "cse", semesters: [6, 7], tags: ["mathematics"] },
   { id: "cse_multimedia", name: "Multimedia Technologies", branchId: "cse", semesters: [6, 7], tags: ["graphics"] },
   { id: "cse_bioinformatics", name: "Bioinformatics", branchId: "cse", semesters: [7, 8], tags: ["elective", "science"] },
   { id: "cse_sc", name: "Soft Computing", branchId: "cse", semesters: [6, 7], tags: ["ai_ml"] },

   /* =====================================================
      ELECTRONICS & COMMUNICATION ENGINEERING (ECE)
   ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "ece_math_1", name: "Engineering Mathematics I", branchId: "ece", semesters: [1], tags: ["core", "math"] },
   { id: "ece_physics_1", name: "Engineering Physics I", branchId: "ece", semesters: [1], tags: ["core", "science"] },
   { id: "ece_chemistry_1", name: "Engineering Chemistry I", branchId: "ece", semesters: [1], tags: ["core", "science"] },
   { id: "ece_mechanics", name: "Engineering Mechanics", branchId: "ece", semesters: [1], tags: ["core"] },
   { id: "ece_bee", name: "Basic Electrical Engineering", branchId: "ece", semesters: [1], tags: ["core"] },
   { id: "ece_english", name: "Professional Communication Skills", branchId: "ece", semesters: [1], tags: ["humanities"] },

   { id: "ece_value_education", name: "Universal Human Values / Value Education", branchId: "ece", semesters: [1, 2], tags: ["audit", "mandatory"] },
   { id: "ece_basic_electronics", name: "Basic Electronics Engineering", branchId: "ece", semesters: [2], tags: ["core"] },


   // -------- SEMESTER 2 --------
   { id: "ece_math_2", name: "Engineering Mathematics II", branchId: "ece", semesters: [2], tags: ["core", "math"] },
   { id: "ece_physics_2", name: "Engineering Physics II", branchId: "ece", semesters: [2], tags: ["core", "science"] },
   { id: "ece_chemistry_2", name: "Engineering Chemistry II", branchId: "ece", semesters: [2], tags: ["core", "science"] },
   { id: "ece_graphics", name: "Engineering Graphics & Design", branchId: "ece", semesters: [2], tags: ["core"] },
   { id: "ece_programming", name: "C Programming / SPA", branchId: "ece", semesters: [2], tags: ["programming"] },
   { id: "ece_english", name: "Professional Communication Skills", branchId: "ece", semesters: [2], tags: ["humanities"] },


   // -------- SEMESTER 3 --------
   { id: "ece_math_3", name: "Engineering Mathematics III (Transform Calculus)", branchId: "ece", semesters: [3], tags: ["math"] },
   { id: "ece_analog_circuits", name: "Analog Electronic Circuits", branchId: "ece", semesters: [3], tags: ["core"] },
   { id: "ece_digital_circuits", name: "Digital Logic Design", branchId: "ece", semesters: [3], tags: ["core"] },
   { id: "ece_signals", name: "Signals & Systems", branchId: "ece", semesters: [3], tags: ["core"] },
   { id: "ece_network_theory", name: "Network Theory", branchId: "ece", semesters: [3], tags: ["core"] },
   { id: "ece_analog_lab", name: "Analog Circuits Lab", branchId: "ece", semesters: [3], tags: ["lab"] },
   { id: "ece_digital_lab", name: "Digital Electronics Lab", branchId: "ece", semesters: [3], tags: ["lab"] },
   { id: "ece_const_india", name: "Constitution of India", branchId: "ece", semesters: [3], tags: ["audit", "mandatory"] },

   // -------- SEMESTER 4 --------
   { id: "ece_prob_stats", name: "Probability & Stochastic Processes", branchId: "ece", semesters: [4], tags: ["math"] },
   { id: "ece_control", name: "Control Systems", branchId: "ece", semesters: [4], tags: ["core"] },
   { id: "ece_analog_comm", name: "Analog Communication", branchId: "ece", semesters: [4], tags: ["core"] },
   { id: "ece_linear_ic", name: "Linear Integrated Circuits (Op-Amps)", branchId: "ece", semesters: [4], tags: ["core"] },
   { id: "ece_micro_arch", name: "Computer Organization & Architecture", branchId: "ece", semesters: [4], tags: ["core"] },
   { id: "ece_ac_lab", name: "Analog Communication Lab", branchId: "ece", semesters: [4], tags: ["lab"] },
   { id: "ece_lic_lab", name: "Linear Integrated Circuits Lab", branchId: "ece", semesters: [4], tags: ["lab"] },
   { id: "ece_python", name: "Python Programming", branchId: "ece", semesters: [4], tags: ["programming", "skill"] },

   // -------- SEMESTER 5 --------
   { id: "ece_digital_comm", name: "Digital Communication", branchId: "ece", semesters: [5], tags: ["core"] },
   { id: "ece_dsp", name: "Digital Signal Processing", branchId: "ece", semesters: [5], tags: ["core"] },
   { id: "ece_em_waves", name: "Electromagnetic Waves & Transmission Lines", branchId: "ece", semesters: [5], tags: ["core"] },
   { id: "ece_microprocessor", name: "Microprocessors & Microcontrollers", branchId: "ece", semesters: [5], tags: ["core"] },
   { id: "ece_env", name: "Environmental Science", branchId: "ece", semesters: [5], tags: ["mandatory"] },
   { id: "ece_dc_lab", name: "Digital Communication Lab", branchId: "ece", semesters: [5], tags: ["lab"] },
   { id: "ece_dsp_lab", name: "DSP Lab", branchId: "ece", semesters: [5], tags: ["lab"] },
   { id: "ece_micro_lab", name: "Microprocessor & Microcontroller Lab", branchId: "ece", semesters: [5], tags: ["lab"] },

   // -------- SEMESTER 6 --------
   { id: "ece_vlsi", name: "VLSI Design", branchId: "ece", semesters: [6], tags: ["core"] },
   { id: "ece_antenna", name: "Antennas & Wave Propagation", branchId: "ece", semesters: [6], tags: ["core"] },
   { id: "ece_cn", name: "Computer Networks", branchId: "ece", semesters: [6], tags: ["core"] },
   { id: "ece_embedded", name: "Embedded Systems", branchId: "ece", semesters: [6], tags: ["core"] },
   { id: "ece_miniproject", name: "Mini Project / Electronic Design Workshop", branchId: "ece", semesters: [6], tags: ["project"] },
   { id: "ece_vlsi_lab", name: "VLSI Design Lab", branchId: "ece", semesters: [6], tags: ["lab"] },
   { id: "ece_cn_lab", name: "Computer Networks Lab", branchId: "ece", semesters: [6], tags: ["lab"] },
   { id: "ece_ipr", name: "Intellectual Property Rights", branchId: "ece", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 --------
   { id: "ece_microwave", name: "Microwave Engineering", branchId: "ece", semesters: [7], tags: ["core"] },
   { id: "ece_wireless", name: "Wireless & Mobile Communication", branchId: "ece", semesters: [7], tags: ["core"] },
   { id: "ece_fiber_optic", name: "Fiber Optic Communication", branchId: "ece", semesters: [7], tags: ["elective"] },
   { id: "ece_aiml", name: "Introduction to AI & Machine Learning", branchId: "ece", semesters: [7], tags: ["elective", "new-tech"] },
   { id: "ece_project_1", name: "Major Project Phase I", branchId: "ece", semesters: [7], tags: ["project"] },


   // -------- SEMESTER 8 --------
   { id: "ece_satellite", name: "Satellite Communication", branchId: "ece", semesters: [8], tags: ["elective"] },
   { id: "ece_iot", name: "Internet of Things (IoT)", branchId: "ece", semesters: [8], tags: ["elective", "new-tech"] },
   { id: "ece_radar", name: "Radar Systems", branchId: "ece", semesters: [8], tags: ["elective"] },
   { id: "ece_nano", name: "Nano Electronics", branchId: "ece", semesters: [8], tags: ["elective"] },
   { id: "ece_project_2", name: "Major Project Phase II", branchId: "ece", semesters: [8], tags: ["project"] },
   { id: "ece_seminar", name: "Technical Seminar", branchId: "ece", semesters: [8], tags: ["seminar"] },

   /* =====================================================
       ELECTRICAL ENGINEERING (EEE)
       branchId: "eee"
    ===================================================== */

   // -------- SEMESTER 1 (General Engineering) --------
   { id: "ee_math_1", name: "Engineering Mathematics I (Calculus & Linear Algebra)", branchId: "eee", semesters: [1], tags: ["core", "math"] },
   { id: "ee_physics_1", name: "Engineering Physics I (Electromagnetism & Optics)", branchId: "eee", semesters: [1], tags: ["core", "science"] },
   { id: "ee_chemistry_1", name: "Engineering Chemistry I", branchId: "eee", semesters: [1], tags: ["core", "science"] },
   { id: "ee_mechanics", name: "Engineering Mechanics (Statics & Dynamics)", branchId: "eee", semesters: [1], tags: ["core"] },
   { id: "ee_bee", name: "Basic Electrical Engineering", branchId: "eee", semesters: [1], tags: ["core"] },
   { id: "ee_workshop", name: "Electrical & Electronics Workshop", branchId: "eee", semesters: [1], tags: ["skill"] },

   // -------- SEMESTER 2 (General Engineering) --------
   { id: "ee_math_2", name: "Engineering Mathematics II (Diff. Eq. & Laplace)", branchId: "eee", semesters: [2], tags: ["core", "math"] },
   { id: "ee_physics_2", name: "Engineering Physics II (Quantum & Solid State)", branchId: "eee", semesters: [2], tags: ["core", "science"] },
   { id: "ee_chemistry_2", name: "Engineering Chemistry II", branchId: "eee", semesters: [2], tags: ["core", "science"] },
   { id: "ee_graphics", name: "Engineering Graphics & Design (CAD Basics)", branchId: "eee", semesters: [2], tags: ["core"] },
   { id: "ee_prog", name: "Programming for Problem Solving (C/Python)", branchId: "eee", semesters: [2], tags: ["programming"] },
   { id: "ee_english", name: "Professional Communication & Soft Skills", branchId: "eee", semesters: [2], tags: ["humanities"] },
   { id: "ee_env_science", name: "Environmental Science", branchId: "eee", semesters: [2], tags: ["mandatory"] },

   // -------- SEMESTER 3 (Core Start) --------
   { id: "ee_math_3", name: "Engineering Mathematics III (Transform Calculus & PDE)", branchId: "eee", semesters: [3], tags: ["math"] },
   { id: "ee_circuit_theory", name: "Network Analysis & Synthesis", branchId: "eee", semesters: [3], tags: ["core"] },
   { id: "ee_emf", name: "Electromagnetic Fields", branchId: "eee", semesters: [3], tags: ["core"] },
   { id: "ee_analog", name: "Analog Electronic Circuits", branchId: "eee", semesters: [3], tags: ["core"] },
   { id: "ee_machines_1", name: "Electrical Machines I (DC Generators & Motors)", branchId: "eee", semesters: [3], tags: ["core"] },
   { id: "ee_measurements", name: "Electrical Measurements & Instrumentation", branchId: "eee", semesters: [3], tags: ["core"] },
   { id: "ee_eng_materials", name: "Electrical Engineering Materials", branchId: "eee", semesters: [3], tags: ["core"] },
   { id: "ee_const_india", name: "Constitution of India", branchId: "eee", semesters: [3], tags: ["audit"] },

   // -------- SEMESTER 4 --------
   { id: "ee_math_4", name: "Probability, Statistics & Numerical Methods", branchId: "eee", semesters: [4], tags: ["math"] },
   { id: "ee_machines_2", name: "Electrical Machines II (Transformers & Induction Motors)", branchId: "eee", semesters: [4], tags: ["core"] },
   { id: "ee_power_sys_1", name: "Power Systems I (Generation & Transmission)", branchId: "eee", semesters: [4], tags: ["core"] },
   { id: "ee_control", name: "Control Systems Engineering", branchId: "eee", semesters: [4], tags: ["core"] },
   { id: "ee_digital", name: "Digital Electronics & Logic Design", branchId: "eee", semesters: [4], tags: ["core"] },
   { id: "ee_signals", name: "Signals & Systems", branchId: "eee", semesters: [4], tags: ["core"] },
   { id: "ee_python_lab", name: "Python for Electrical Engineers", branchId: "eee", semesters: [4], tags: ["skill"] },

   // -------- SEMESTER 5 --------
   { id: "ee_power_sys_2", name: "Power Systems II (Switchgear & Protection)", branchId: "eee", semesters: [5], tags: ["core"] },
   { id: "ee_sync_machines", name: "Synchronous Machines & Special Motors", branchId: "eee", semesters: [5], tags: ["core"] },
   { id: "ee_power_electronics", name: "Power Electronics", branchId: "eee", semesters: [5], tags: ["core"] },
   { id: "ee_microprocessor", name: "Microprocessors & Microcontrollers (8085/8051)", branchId: "eee", semesters: [5], tags: ["core"] },
   { id: "ee_lic", name: "Linear Integrated Circuits (Op-Amps)", branchId: "eee", semesters: [5], tags: ["core"] },
   { id: "ee_renew_energy", name: "Renewable Energy Sources", branchId: "eee", semesters: [5], tags: ["elective"] },
   { id: "ee_bio_instr", name: "Bio-Medical Instrumentation", branchId: "eee", semesters: [5], tags: ["elective", "open"] },

   // -------- SEMESTER 6 --------
   { id: "ee_psoc", name: "Power System Operation & Control", branchId: "eee", semesters: [6], tags: ["core"] },
   { id: "ee_drives", name: "Electric Drives & Control", branchId: "eee", semesters: [6], tags: ["core"] },
   { id: "ee_dsp", name: "Digital Signal Processing", branchId: "eee", semesters: [6], tags: ["core"] },
   { id: "ee_machine_design", name: "Electrical Machine Design (CAD)", branchId: "eee", semesters: [6], tags: ["core"] },
   { id: "ee_hv_eng", name: "High Voltage Engineering", branchId: "eee", semesters: [6], tags: ["elective"] },
   { id: "ee_embedded", name: "Embedded Systems (ARM/AVR)", branchId: "eee", semesters: [6], tags: ["elective"] },
   { id: "ee_optimization", name: "Optimization Techniques", branchId: "eee", semesters: [6], tags: ["math"] },
   { id: "ee_ipr", name: "Intellectual Property Rights", branchId: "eee", semesters: [6], tags: ["management"] },

   // -------- SEMESTER 7 (Advanced Electives) --------
   { id: "ee_utilization", name: "Utilization of Electrical Energy", branchId: "eee", semesters: [7], tags: ["core"] },
   { id: "ee_hvdc", name: "HVDC Transmission Systems", branchId: "eee", semesters: [7], tags: ["elective", "power"] },
   { id: "ee_facts", name: "FACTS (Flexible AC Transmission Systems)", branchId: "eee", semesters: [7], tags: ["elective", "advanced"] },
   { id: "ee_ev", name: "Electric & Hybrid Vehicles", branchId: "eee", semesters: [7], tags: ["elective", "modern"] },
   { id: "ee_smartgrid", name: "Smart Grid Technologies", branchId: "eee", semesters: [7], tags: ["elective", "modern"] },
   { id: "ee_adv_control", name: "Advanced Control Systems", branchId: "eee", semesters: [7], tags: ["elective", "control"] },
   { id: "ee_soft_comp", name: "Soft Computing (Neural Networks & Fuzzy Logic)", branchId: "eee", semesters: [7], tags: ["elective", "ai"] },
   { id: "ee_project_1", name: "Major Project Phase I", branchId: "eee", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 (Industry & Emerging Tech) --------
   { id: "ee_power_quality", name: "Power Quality & Management", branchId: "eee", semesters: [8], tags: ["elective"] },
   { id: "ee_scada", name: "SCADA & Power System Automation", branchId: "eee", semesters: [8], tags: ["elective", "automation"] },
   { id: "ee_energy_audit", name: "Energy Audit, Management & Conservation", branchId: "eee", semesters: [8], tags: ["management"] },
   { id: "ee_illumination", name: "Illumination Engineering", branchId: "eee", semesters: [8], tags: ["elective"] },
   { id: "ee_restructured", name: "Restructured Power Systems", branchId: "eee", semesters: [8], tags: ["elective", "power"] },
   { id: "ee_cyber_power", name: "Cyber Security for Power Systems", branchId: "eee", semesters: [8], tags: ["elective", "modern"] },
   { id: "ee_ethics", name: "Professional Ethics & Human Values", branchId: "eee", semesters: [8], tags: ["ethics"] },
   { id: "ee_project_2", name: "Major Project Phase II", branchId: "eee", semesters: [8], tags: ["project"] },

   /* =====================================================
       MECHANICAL ENGINEERING (ME)
       (Expanded Indian Syllabus | No Labs | Max Subjects)
    ===================================================== */

   // -------- SEMESTER 1 (General Engineering) --------
   { id: "me_math_1", name: "Engineering Mathematics I (Calculus & Linear Algebra)", branchId: "mech", semesters: [1], tags: ["core", "math"] },
   { id: "me_physics_1", name: "Engineering Physics I", branchId: "mech", semesters: [1], tags: ["core", "science"] },
   { id: "me_chemistry_1", name: "Engineering Chemistry I", branchId: "mech", semesters: [1], tags: ["core", "science"] },
   { id: "me_mechanics", name: "Engineering Mechanics (Statics & Dynamics)", branchId: "mech", semesters: [1], tags: ["core"] },
   { id: "me_bee", name: "Basic Electrical Engineering", branchId: "mech", semesters: [1], tags: ["core"] },
   { id: "me_manufacturing_basics", name: "Elements of Mechanical Engineering", branchId: "mech", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 (General Engineering) --------
   { id: "me_math_2", name: "Engineering Mathematics II (Diff. Eq. & Complex Var)", branchId: "mech", semesters: [2], tags: ["core", "math"] },
   { id: "me_physics_2", name: "Engineering Physics II", branchId: "mech", semesters: [2], tags: ["core", "science"] },
   { id: "me_chemistry_2", name: "Engineering Chemistry II", branchId: "mech", semesters: [2], tags: ["core", "science"] },
   { id: "me_graphics", name: "Engineering Graphics & Design", branchId: "mech", semesters: [2], tags: ["core", "design"] },
   { id: "me_programming", name: "Programming for Problem Solving (C/Python)", branchId: "mech", semesters: [2], tags: ["programming"] },
   { id: "me_english", name: "Professional Communication & Soft Skills", branchId: "mech", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 (Core Mechanical Start) --------
   { id: "me_math_3", name: "Engineering Mathematics III (Transform Calculus & PDE)", branchId: "mech", semesters: [3], tags: ["math"] },
   { id: "me_thermo", name: "Engineering Thermodynamics", branchId: "mech", semesters: [3], tags: ["core", "thermal"] },
   { id: "me_som", name: "Strength of Materials / Mechanics of Solids", branchId: "mech", semesters: [3], tags: ["core", "design"] },
   { id: "me_materials", name: "Material Science & Metallurgy", branchId: "mech", semesters: [3], tags: ["core"] },
   { id: "me_manufacturing_1", name: "Manufacturing Processes I (Casting & Welding)", branchId: "mech", semesters: [3], tags: ["core"] },
   { id: "me_mach_drawing", name: "Machine Drawing & CAD Basics", branchId: "mech", semesters: [3], tags: ["design"] },
   { id: "me_const_india", name: "Constitution of India", branchId: "mech", semesters: [3], tags: ["audit", "mandatory"] },

   // -------- SEMESTER 4 --------
   { id: "me_math_4", name: "Engineering Mathematics IV (Prob, Stats & Numerical Methods)", branchId: "mech", semesters: [4], tags: ["math"] },
   { id: "me_applied_thermo", name: "Applied Thermodynamics", branchId: "mech", semesters: [4], tags: ["core", "thermal"] },
   { id: "me_fluid_mech", name: "Fluid Mechanics", branchId: "mech", semesters: [4], tags: ["core", "thermal"] },
   { id: "me_kinematics", name: "Kinematics of Machinery (TOM-I)", branchId: "mech", semesters: [4], tags: ["core", "design"] },
   { id: "me_manufacturing_2", name: "Manufacturing Processes II (Machining)", branchId: "mech", semesters: [4], tags: ["core"] },
   { id: "me_metrology", name: "Engineering Metrology & Measurements", branchId: "mech", semesters: [4], tags: ["core"] },
   { id: "me_iks", name: "Indian Knowledge System", branchId: "mech", semesters: [4], tags: ["audit"] },

   // -------- SEMESTER 5 --------
   { id: "me_heat_transfer", name: "Heat & Mass Transfer", branchId: "mech", semesters: [5], tags: ["core", "thermal"] },
   { id: "me_dynamics", name: "Dynamics of Machinery (TOM-II)", branchId: "mech", semesters: [5], tags: ["core", "design"] },
   { id: "me_fluid_machinery", name: "Fluid Machinery (Hydraulic Machines)", branchId: "mech", semesters: [5], tags: ["core", "thermal"] },
   { id: "me_design_1", name: "Design of Machine Elements I (Static)", branchId: "mech", semesters: [5], tags: ["core", "design"] },
   { id: "me_control", name: "Control Systems Engineering", branchId: "mech", semesters: [5], tags: ["interdisciplinary"] },
   { id: "me_env", name: "Environmental Science", branchId: "mech", semesters: [5], tags: ["mandatory"] },

   // -------- SEMESTER 6 --------
   { id: "me_ic_engines", name: "Internal Combustion Engines", branchId: "mech", semesters: [6], tags: ["core", "thermal"] },
   { id: "me_design_2", name: "Design of Machine Elements II (Dynamic/Gears)", branchId: "mech", semesters: [6], tags: ["core", "design"] },
   { id: "me_cad_cam", name: "CAD/CAM & CIM", branchId: "mech", semesters: [6], tags: ["design", "automation"] },
   { id: "me_rac", name: "Refrigeration & Air Conditioning", branchId: "mech", semesters: [6], tags: ["core", "thermal"] },
   { id: "me_mechatronics", name: "Mechatronics & Microprocessors", branchId: "mech", semesters: [6], tags: ["interdisciplinary"] },
   { id: "me_quality", name: "Total Quality Management (TQM)", branchId: "mech", semesters: [6], tags: ["management"] },

   // -------- SEMESTER 7 (Heavy Electives & Specializations) --------
   { id: "me_or", name: "Operations Research", branchId: "mech", semesters: [7], tags: ["core", "math"] },
   { id: "me_fem", name: "Finite Element Analysis (FEA)", branchId: "mech", semesters: [7], tags: ["core", "design"] },
   { id: "me_power_plant", name: "Power Plant Engineering", branchId: "mech", semesters: [7], tags: ["core", "thermal"] },
   { id: "me_project_1", name: "Major Project Phase I", branchId: "mech", semesters: [7], tags: ["project"] },

   // Sem 7 Professional Electives (Choose 1 or 2 typically)
   { id: "me_automobile", name: "Automobile Engineering", branchId: "mech", semesters: [7], tags: ["elective", "automotive"] },
   { id: "me_robotics", name: "Robotics & Industrial Automation", branchId: "mech", semesters: [7], tags: ["elective", "automation"] },
   { id: "me_cfd", name: "Computational Fluid Dynamics (CFD)", branchId: "mech", semesters: [7], tags: ["elective", "advanced"] },
   { id: "me_tribology", name: "Tribology (Friction & Wear)", branchId: "mech", semesters: [7], tags: ["elective", "design"] },
   { id: "me_piping", name: "Piping Engineering", branchId: "mech", semesters: [7], tags: ["elective", "design"] },
   { id: "me_energy_mgmt", name: "Energy Audit & Management", branchId: "mech", semesters: [7], tags: ["elective", "management"] },

   // -------- SEMESTER 8 (Advanced & Open Electives) --------
   { id: "me_industrial_eng", name: "Industrial Engineering & Production Management", branchId: "mech", semesters: [8], tags: ["core", "management"] },
   { id: "me_vibration", name: "Mechanical Vibrations", branchId: "mech", semesters: [8], tags: ["core", "design"] },
   { id: "me_project_2", name: "Major Project Phase II", branchId: "mech", semesters: [8], tags: ["project"] },
   { id: "me_ethics", name: "Professional Ethics", branchId: "mech", semesters: [8], tags: ["ethics"] },

   // Sem 8 Professional/Open Electives (Broad Choices)
   { id: "me_renewable", name: "Renewable Energy Sources", branchId: "mech", semesters: [8], tags: ["elective", "energy"] },
   { id: "me_scm", name: "Supply Chain Management", branchId: "mech", semesters: [8], tags: ["elective", "management"] },
   { id: "me_composite", name: "Composite Materials", branchId: "mech", semesters: [8], tags: ["elective", "materials"] },
   { id: "me_cryogenics", name: "Cryogenic Engineering", branchId: "mech", semesters: [8], tags: ["elective", "thermal"] },
   { id: "me_prod_design", name: "Product Design & Development", branchId: "mech", semesters: [8], tags: ["elective", "design"] },
   { id: "me_gas_dynamics", name: "Gas Dynamics & Jet Propulsion", branchId: "mech", semesters: [8], tags: ["elective", "aerospace"] },
   { id: "me_nano", name: "Nanotechnology & Surface Engineering", branchId: "mech", semesters: [8], tags: ["elective", "advanced"] },
   { id: "me_ai_mech", name: "AI & ML in Mechanical Engineering", branchId: "mech", semesters: [8], tags: ["elective", "modern"] },
   /* =====================================================
       CIVIL ENGINEERING (CE)
       (Expanded Indian Syllabus | No Labs | Max Subjects)
    ===================================================== */

   // -------- SEMESTER 1 (Common First Year) --------
   { id: "ce_math_1", name: "Engineering Mathematics I (Calculus & Linear Algebra)", branchId: "civil", semesters: [1], tags: ["core", "math"] },
   { id: "ce_physics_1", name: "Engineering Physics I", branchId: "civil", semesters: [1], tags: ["core", "science"] },
   { id: "ce_chemistry_1", name: "Engineering Chemistry I", branchId: "civil", semesters: [1], tags: ["core", "science"] },
   { id: "ce_mechanics", name: "Engineering Mechanics (Statics & Dynamics)", branchId: "civil", semesters: [1], tags: ["core"] },
   { id: "ce_bee", name: "Basic Electrical Engineering", branchId: "civil", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 (Common First Year) --------
   { id: "ce_math_2", name: "Engineering Mathematics II (Diff. Eq. & Complex Var)", branchId: "civil", semesters: [2], tags: ["core", "math"] },
   { id: "ce_physics_2", name: "Engineering Physics II", branchId: "civil", semesters: [2], tags: ["core", "science"] },
   { id: "ce_chemistry_2", name: "Engineering Chemistry II", branchId: "civil", semesters: [2], tags: ["core", "science"] },
   { id: "ce_graphics", name: "Engineering Graphics & Design", branchId: "civil", semesters: [2], tags: ["core", "design"] },
   { id: "ce_programming", name: "Programming for Problem Solving (C/Python)", branchId: "civil", semesters: [2], tags: ["programming"] },
   { id: "ce_english", name: "Professional Communication & Soft Skills", branchId: "civil", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 (Core Civil Starts) --------
   { id: "ce_math_3", name: "Engineering Mathematics III (Transform Calculus & PDE)", branchId: "civil", semesters: [3], tags: ["math"] },
   { id: "ce_som", name: "Strength of Materials / Mechanics of Solids", branchId: "civil", semesters: [3], tags: ["core", "structural"] },
   { id: "ce_surveying_1", name: "Surveying & Geomatics I", branchId: "civil", semesters: [3], tags: ["core"] },
   { id: "ce_building_mat", name: "Building Materials & Construction", branchId: "civil", semesters: [3], tags: ["core"] },
   { id: "ce_fluid_mech_1", name: "Fluid Mechanics I", branchId: "civil", semesters: [3], tags: ["core", "fluids"] },
   { id: "ce_geology", name: "Engineering Geology", branchId: "civil", semesters: [3], tags: ["core", "geotech"] },
   { id: "ce_const_india", name: "Constitution of India", branchId: "civil", semesters: [3], tags: ["audit", "mandatory"] },

   // -------- SEMESTER 4 --------
   { id: "ce_math_4", name: "Engineering Mathematics IV (Prob, Stats & Numerical Methods)", branchId: "civil", semesters: [4], tags: ["math"] },
   { id: "ce_struct_analysis_1", name: "Structural Analysis I", branchId: "civil", semesters: [4], tags: ["core", "structural"] },
   { id: "ce_surveying_2", name: "Advanced Surveying (Geomatics II)", branchId: "civil", semesters: [4], tags: ["core"] },
   { id: "ce_fluid_mech_2", name: "Fluid Mechanics II (Hydraulics & Hydraulic Machines)", branchId: "civil", semesters: [4], tags: ["core", "fluids"] },
   { id: "ce_concrete", name: "Concrete Technology", branchId: "civil", semesters: [4], tags: ["core", "materials"] },
   { id: "ce_building_planning", name: "Building Planning & Drawing (CAD)", branchId: "civil", semesters: [4], tags: ["core", "design"] },

   // -------- SEMESTER 5 --------
   { id: "ce_struct_analysis_2", name: "Structural Analysis II", branchId: "civil", semesters: [5], tags: ["core", "structural"] },
   { id: "ce_geotech_1", name: "Geotechnical Engineering I (Soil Mechanics)", branchId: "civil", semesters: [5], tags: ["core", "geotech"] },
   { id: "ce_transport_1", name: "Transportation Engineering I (Highway Engineering)", branchId: "civil", semesters: [5], tags: ["core", "transport"] },
   { id: "ce_env_eng_1", name: "Environmental Engineering I (Water Supply)", branchId: "civil", semesters: [5], tags: ["core", "environmental"] },
   { id: "ce_hydrology", name: "Hydrology & Water Resources Engineering", branchId: "civil", semesters: [5], tags: ["core", "water"] },
   { id: "ce_env_studies", name: "Environmental Science", branchId: "civil", semesters: [5], tags: ["mandatory"] },

   // -------- SEMESTER 6 --------
   { id: "ce_dss", name: "Design of Steel Structures (DSS)", branchId: "civil", semesters: [6], tags: ["core", "structural", "design"] },
   { id: "ce_geotech_2", name: "Geotechnical Engineering II (Foundation Engineering)", branchId: "civil", semesters: [6], tags: ["core", "geotech"] },
   { id: "ce_transport_2", name: "Transportation Engineering II (Railway, Airport & Harbour)", branchId: "civil", semesters: [6], tags: ["core", "transport"] },
   { id: "ce_env_eng_2", name: "Environmental Engineering II (Waste Water Management)", branchId: "civil", semesters: [6], tags: ["core", "environmental"] },
   { id: "ce_project_mgmt", name: "Construction Management & Equipment", branchId: "civil", semesters: [6], tags: ["core", "management"] },
   { id: "ce_gis", name: "Remote Sensing & GIS", branchId: "civil", semesters: [6], tags: ["elective", "modern"] },

   // -------- SEMESTER 7 (Specialization & Electives) --------
   { id: "ce_drccs", name: "Design of Reinforced Concrete Structures (DRCS/RCC)", branchId: "civil", semesters: [7], tags: ["core", "structural", "design"] },
   { id: "ce_estimation", name: "Quantity Surveying, Estimation & Valuation", branchId: "civil", semesters: [7], tags: ["core", "management"] },
   { id: "ce_irrigation", name: "Irrigation Engineering", branchId: "civil", semesters: [7], tags: ["core", "water"] },
   { id: "ce_project_1", name: "Major Project Phase I", branchId: "civil", semesters: [7], tags: ["project"] },

   // Professional Electives (Sem 7)
   { id: "ce_advanced_struct", name: "Advanced Structural Mechanics", branchId: "civil", semesters: [7], tags: ["elective", "structural"] },
   { id: "ce_traffic_eng", name: "Traffic Engineering & Management", branchId: "civil", semesters: [7], tags: ["elective", "transport"] },
   { id: "ce_solid_waste", name: "Solid Waste Management", branchId: "civil", semesters: [7], tags: ["elective", "environmental"] },
   { id: "ce_town_planning", name: "Town Planning & Architecture", branchId: "civil", semesters: [7], tags: ["elective", "design"] },
   { id: "ce_rock_mech", name: "Rock Mechanics", branchId: "civil", semesters: [7], tags: ["elective", "geotech"] },

   // -------- SEMESTER 8 (Advanced & Open Electives) --------
   { id: "ce_dams", name: "Design of Hydraulic Structures (Dams & Canals)", branchId: "civil", semesters: [8], tags: ["core", "water", "design"] },
   { id: "ce_project_2", name: "Major Project Phase II", branchId: "civil", semesters: [8], tags: ["project"] },
   { id: "ce_ethics", name: "Professional Ethics", branchId: "civil", semesters: [8], tags: ["ethics"] },

   // Professional/Open Electives (Sem 8)
   { id: "ce_earthquake", name: "Earthquake Engineering", branchId: "civil", semesters: [8], tags: ["elective", "structural"] },
   { id: "ce_bridge", name: "Bridge Engineering", branchId: "civil", semesters: [8], tags: ["elective", "structural"] },
   { id: "ce_prestressed", name: "Pre-stressed Concrete", branchId: "civil", semesters: [8], tags: ["elective", "structural"] },
   { id: "ce_air_pollution", name: "Air Pollution & Control", branchId: "civil", semesters: [8], tags: ["elective", "environmental"] },
   { id: "ce_ground_improv", name: "Ground Improvement Techniques", branchId: "civil", semesters: [8], tags: ["elective", "geotech"] },
   { id: "ce_green_bldg", name: "Green Building Technology", branchId: "civil", semesters: [8], tags: ["elective", "modern"] },
   { id: "ce_disaster_mgmt", name: "Disaster Management & Mitigation", branchId: "civil", semesters: [8], tags: ["elective", "management"] },

   /* =====================================================
       CHEMICAL ENGINEERING
       branchId: "chemical"
    ===================================================== */

   // -------- SEMESTER 1 (Common First Year) --------
   { id: "chem_math_1", name: "Engineering Mathematics I (Calculus & Linear Algebra)", branchId: "chemical", semesters: [1], tags: ["core", "math"] },
   { id: "chem_physics_1", name: "Engineering Physics I", branchId: "chemical", semesters: [1], tags: ["core", "science"] },
   { id: "chem_chemistry_1", name: "Engineering Chemistry I (Inorganic & Physical)", branchId: "chemical", semesters: [1], tags: ["core", "science"] },
   { id: "chem_mechanics", name: "Engineering Mechanics", branchId: "chemical", semesters: [1], tags: ["core"] },
   { id: "chem_bee", name: "Basic Electrical Engineering", branchId: "chemical", semesters: [1], tags: ["core"] },
   { id: "chem_workshop", name: "Workshop Practice", branchId: "chemical", semesters: [1], tags: ["skill"] },

   // -------- SEMESTER 2 (Common First Year) --------
   { id: "chem_math_2", name: "Engineering Mathematics II (Diff. Eq. & Complex Var)", branchId: "chemical", semesters: [2], tags: ["core", "math"] },
   { id: "chem_physics_2", name: "Engineering Physics II", branchId: "chemical", semesters: [2], tags: ["core", "science"] },
   { id: "chem_chemistry_2", name: "Engineering Chemistry II (Organic & Analytical)", branchId: "chemical", semesters: [2], tags: ["core", "science"] },
   { id: "chem_graphics", name: "Engineering Graphics & Design", branchId: "chemical", semesters: [2], tags: ["core"] },
   { id: "chem_prog", name: "Programming for Problem Solving (C)", branchId: "chemical", semesters: [2], tags: ["programming"] },
   { id: "chem_english", name: "Professional Communication", branchId: "chemical", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 (Core Start) --------
   { id: "chem_math_3", name: "Engineering Mathematics III (Transform Calculus)", branchId: "chemical", semesters: [3], tags: ["math"] },
   { id: "chem_cpc", name: "Chemical Process Calculations (Stoichiometry)", branchId: "chemical", semesters: [3], tags: ["core"] },
   { id: "chem_fluid", name: "Fluid Mechanics (Momentum Transfer)", branchId: "chemical", semesters: [3], tags: ["core"] },
   { id: "chem_tech_1", name: "Chemical Technology I (Inorganic Industries)", branchId: "chemical", semesters: [3], tags: ["core"] },
   { id: "chem_organic", name: "Advanced Organic Chemistry", branchId: "chemical", semesters: [3], tags: ["core", "science"] },
   { id: "chem_materials", name: "Materials Science for Chemical Engineers", branchId: "chemical", semesters: [3], tags: ["core"] },
   { id: "chem_const_india", name: "Constitution of India", branchId: "chemical", semesters: [3], tags: ["audit"] },

   // -------- SEMESTER 4 --------
   { id: "chem_math_4", name: "Numerical Methods & Statistics", branchId: "chemical", semesters: [4], tags: ["math"] },
   { id: "chem_thermo_1", name: "Chemical Engineering Thermodynamics I", branchId: "chemical", semesters: [4], tags: ["core"] },
   { id: "chem_mo", name: "Mechanical Operations (Solid-Fluid Operations)", branchId: "chemical", semesters: [4], tags: ["core"] },
   { id: "chem_ht_1", name: "Heat Transfer Operations", branchId: "chemical", semesters: [4], tags: ["core"] },
   { id: "chem_tech_2", name: "Chemical Technology II (Organic Industries)", branchId: "chemical", semesters: [4], tags: ["core"] },
   { id: "chem_process_instru", name: "Process Instrumentation", branchId: "chemical", semesters: [4], tags: ["core"] },

   // -------- SEMESTER 5 --------
   { id: "chem_mt_1", name: "Mass Transfer Operations I", branchId: "chemical", semesters: [5], tags: ["core"] },
   { id: "chem_cre_1", name: "Chemical Reaction Engineering I", branchId: "chemical", semesters: [5], tags: ["core"] },
   { id: "chem_thermo_2", name: "Chemical Engineering Thermodynamics II", branchId: "chemical", semesters: [5], tags: ["core"] },
   { id: "chem_equipment", name: "Process Equipment Design & Drawing", branchId: "chemical", semesters: [5], tags: ["core", "design"] },
   { id: "chem_pollution", name: "Pollution Control Engineering", branchId: "chemical", semesters: [5], tags: ["elective"] },
   { id: "chem_renewable", name: "Renewable Energy Sources", branchId: "chemical", semesters: [5], tags: ["elective"] },
   { id: "chem_env", name: "Environmental Science", branchId: "chemical", semesters: [5], tags: ["mandatory"] },

   // -------- SEMESTER 6 --------
   { id: "chem_mt_2", name: "Mass Transfer Operations II", branchId: "chemical", semesters: [6], tags: ["core"] },
   { id: "chem_cre_2", name: "Chemical Reaction Engineering II", branchId: "chemical", semesters: [6], tags: ["core"] },
   { id: "chem_pdc", name: "Process Dynamics & Control", branchId: "chemical", semesters: [6], tags: ["core"] },
   { id: "chem_transport", name: "Transport Phenomena", branchId: "chemical", semesters: [6], tags: ["core"] },
   { id: "chem_plant_design", name: "Plant Design & Economics", branchId: "chemical", semesters: [6], tags: ["core", "management"] },
   { id: "chem_polymer", name: "Polymer Science & Technology", branchId: "chemical", semesters: [6], tags: ["elective"] },
   { id: "chem_fertilizer", name: "Fertilizer Technology", branchId: "chemical", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 --------
   { id: "chem_modeling", name: "Process Modeling & Simulation", branchId: "chemical", semesters: [7], tags: ["core"] },
   { id: "chem_petro", name: "Petroleum Refining Technology", branchId: "chemical", semesters: [7], tags: ["core"] },
   { id: "chem_safety", name: "Chemical Process Safety", branchId: "chemical", semesters: [7], tags: ["core"] },
   { id: "chem_food_tech", name: "Food Technology", branchId: "chemical", semesters: [7], tags: ["elective"] },
   { id: "chem_pharma_tech", name: "Pharmaceutical Technology", branchId: "chemical", semesters: [7], tags: ["elective"] },
   { id: "chem_biochem_eng", name: "Biochemical Engineering", branchId: "chemical", semesters: [7], tags: ["elective"] },
   { id: "chem_project_1", name: "Major Project Phase I", branchId: "chemical", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "chem_novel", name: "Novel Separation Techniques", branchId: "chemical", semesters: [8], tags: ["elective"] },
   { id: "chem_nano", name: "Nanotechnology", branchId: "chemical", semesters: [8], tags: ["elective"] },
   { id: "chem_piping", name: "Piping Engineering", branchId: "chemical", semesters: [8], tags: ["elective"] },
   { id: "chem_green", name: "Green Technology & Engineering", branchId: "chemical", semesters: [8], tags: ["elective"] },
   { id: "chem_mgmt", name: "Industrial Management & Entrepreneurship", branchId: "chemical", semesters: [8], tags: ["management"] },
   { id: "chem_optimization", name: "Optimization of Chemical Processes", branchId: "chemical", semesters: [8], tags: ["elective"] },
   { id: "chem_project_2", name: "Major Project Phase II", branchId: "chemical", semesters: [8], tags: ["project"] },
   { id: "chem_ethics", name: "Professional Ethics", branchId: "chemical", semesters: [8], tags: ["ethics"] },
   /* =====================================================
       INFORMATION TECHNOLOGY (IT)
       branchId: "it"
    ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "it_math_1", name: "Engineering Mathematics I", branchId: "it", semesters: [1], tags: ["core", "math"] },
   { id: "it_physics_1", name: "Engineering Physics I", branchId: "it", semesters: [1], tags: ["core", "science"] },
   { id: "it_chemistry_1", name: "Engineering Chemistry I", branchId: "it", semesters: [1], tags: ["core", "science"] },
   { id: "it_mechanics", name: "Engineering Mechanics", branchId: "it", semesters: [1], tags: ["core"] },
   { id: "it_bee", name: "Basic Electrical Engineering", branchId: "it", semesters: [1], tags: ["core"] },
   { id: "it_workshop", name: "IT Workshop & Tools", branchId: "it", semesters: [1], tags: ["skill"] },

   // -------- SEMESTER 2 --------
   { id: "it_math_2", name: "Engineering Mathematics II", branchId: "it", semesters: [2], tags: ["core", "math"] },
   { id: "it_physics_2", name: "Engineering Physics II", branchId: "it", semesters: [2], tags: ["core", "science"] },
   { id: "it_chemistry_2", name: "Engineering Chemistry II", branchId: "it", semesters: [2], tags: ["core", "science"] },
   { id: "it_graphics", name: "Engineering Graphics & Design", branchId: "it", semesters: [2], tags: ["core"] },
   { id: "it_prog", name: "Programming for Problem Solving (C)", branchId: "it", semesters: [2], tags: ["programming"] },
   { id: "it_english", name: "Professional Communication", branchId: "it", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "it_math_3", name: "Discrete Structures & Graph Theory", branchId: "it", semesters: [3], tags: ["core", "math"] },
   { id: "it_dsa", name: "Data Structures & Algorithms", branchId: "it", semesters: [3], tags: ["core", "programming"] },
   { id: "it_ldco", name: "Digital Logic & Computer Organization", branchId: "it", semesters: [3], tags: ["core"] },
   { id: "it_oop", name: "Object Oriented Programming (Java/C++)", branchId: "it", semesters: [3], tags: ["programming"] },
   { id: "it_dbms", name: "Database Management Systems", branchId: "it", semesters: [3], tags: ["core"] },
   { id: "it_pcom", name: "Principles of Communication", branchId: "it", semesters: [3], tags: ["core"] },
   { id: "it_const_india", name: "Constitution of India", branchId: "it", semesters: [3], tags: ["audit"] },

   // -------- SEMESTER 4 --------
   { id: "it_math_4", name: "Probability, Statistics & Queueing Theory", branchId: "it", semesters: [4], tags: ["math"] },
   { id: "it_os", name: "Operating Systems", branchId: "it", semesters: [4], tags: ["core"] },
   { id: "it_cn", name: "Computer Networks", branchId: "it", semesters: [4], tags: ["core"] },
   { id: "it_micro", name: "Microprocessor & Interfacing", branchId: "it", semesters: [4], tags: ["core"] },
   { id: "it_automata", name: "Formal Languages & Automata Theory", branchId: "it", semesters: [4], tags: ["core"] },
   { id: "it_python", name: "Python Programming", branchId: "it", semesters: [4], tags: ["skill"] },
   { id: "it_soft_skills", name: "Soft Skills & Personality Development", branchId: "it", semesters: [4], tags: ["humanities"] },

   // -------- SEMESTER 5 --------
   { id: "it_web", name: "Internet Programming & Web Technologies", branchId: "it", semesters: [5], tags: ["core", "web"] },
   { id: "it_se", name: "Software Engineering & Project Management", branchId: "it", semesters: [5], tags: ["core", "management"] },
   { id: "it_crypto", name: "Cryptography & Network Security", branchId: "it", semesters: [5], tags: ["core"] },
   { id: "it_hci", name: "Human Computer Interaction", branchId: "it", semesters: [5], tags: ["elective"] },
   { id: "it_adv_dsa", name: "Advanced Data Structures", branchId: "it", semesters: [5], tags: ["elective"] },
   { id: "it_ecommerce", name: "E-Commerce & ERP", branchId: "it", semesters: [5], tags: ["elective"] },
   { id: "it_env", name: "Environmental Studies", branchId: "it", semesters: [5], tags: ["mandatory"] },

   // -------- SEMESTER 6 --------
   { id: "it_dm", name: "Data Mining & Business Intelligence", branchId: "it", semesters: [6], tags: ["core"] },
   { id: "it_dist_sys", name: "Distributed Computing Systems", branchId: "it", semesters: [6], tags: ["core"] },
   { id: "it_cloud", name: "Cloud Computing & Virtualization", branchId: "it", semesters: [6], tags: ["core"] },
   { id: "it_ai", name: "Artificial Intelligence & Soft Computing", branchId: "it", semesters: [6], tags: ["elective"] },
   { id: "it_sqa", name: "Software Testing & Quality Assurance", branchId: "it", semesters: [6], tags: ["elective"] },
   { id: "it_ipr", name: "Intellectual Property Rights", branchId: "it", semesters: [6], tags: ["elective", "law"] },
   { id: "it_devops", name: "DevOps", branchId: "it", semesters: [6], tags: ["skill"] },

   // -------- SEMESTER 7 --------
   { id: "it_mobile", name: "Mobile Application Development (Android/iOS)", branchId: "it", semesters: [7], tags: ["core"] },
   { id: "it_data_sci", name: "Introduction to Data Science", branchId: "it", semesters: [7], tags: ["core"] },
   { id: "it_iot", name: "Internet of Things (IoT)", branchId: "it", semesters: [7], tags: ["elective", "modern"] },
   { id: "it_blockchain", name: "Blockchain Technology", branchId: "it", semesters: [7], tags: ["elective", "modern"] },
   { id: "it_ar_vr", name: "Augmented & Virtual Reality", branchId: "it", semesters: [7], tags: ["elective"] },
   { id: "it_mis", name: "Management Information Systems", branchId: "it", semesters: [7], tags: ["management"] },
   { id: "it_project_1", name: "Major Project Phase I", branchId: "it", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "it_bigdata", name: "Big Data Analytics", branchId: "it", semesters: [8], tags: ["core"] },
   { id: "it_cyber_law", name: "Cyber Laws & Information Security Policy", branchId: "it", semesters: [8], tags: ["ethics"] },
   { id: "it_green_it", name: "Green IT", branchId: "it", semesters: [8], tags: ["elective"] },
   { id: "it_nlp", name: "Natural Language Processing", branchId: "it", semesters: [8], tags: ["elective"] },
   { id: "it_ui_ux", name: "User Interface & User Experience Design", branchId: "it", semesters: [8], tags: ["elective"] },
   { id: "it_startup", name: "Entrepreneurship Development", branchId: "it", semesters: [8], tags: ["management"] },
   { id: "it_project_2", name: "Major Project Phase II", branchId: "it", semesters: [8], tags: ["project"] },


   /* =====================================================
         AI & MACHINE LEARNING
         branchId: "ai_ml"
      ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "ai_math_1", name: "Engineering Mathematics I", branchId: "ai_ml", semesters: [1], tags: ["core"] },
   { id: "ai_physics_1", name: "Engineering Physics I", branchId: "ai_ml", semesters: [1], tags: ["core"] },
   { id: "ai_chemistry_1", name: "Engineering Chemistry I", branchId: "ai_ml", semesters: [1], tags: ["core"] },
   { id: "ai_mechanics", name: "Engineering Mechanics", branchId: "ai_ml", semesters: [1], tags: ["core"] },
   { id: "ai_bee", name: "Basic Electrical Engineering", branchId: "ai_ml", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 --------
   { id: "ai_math_2", name: "Engineering Mathematics II", branchId: "ai_ml", semesters: [2], tags: ["core"] },
   { id: "ai_physics_2", name: "Engineering Physics II", branchId: "ai_ml", semesters: [2], tags: ["core"] },
   { id: "ai_chemistry_2", name: "Engineering Chemistry II", branchId: "ai_ml", semesters: [2], tags: ["core"] },
   { id: "ai_graphics", name: "Engineering Graphics", branchId: "ai_ml", semesters: [2], tags: ["core"] },
   { id: "ai_prog", name: "Programming in C/Python", branchId: "ai_ml", semesters: [2], tags: ["programming"] },
   { id: "ai_english", name: "Professional Communication", branchId: "ai_ml", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "ai_math_3", name: "Linear Algebra & Statistics", branchId: "ai_ml", semesters: [3], tags: ["math"] },
   { id: "ai_dsa", name: "Data Structures using C++", branchId: "ai_ml", semesters: [3], tags: ["core"] },
   { id: "ai_fai", name: "Foundations of Artificial Intelligence", branchId: "ai_ml", semesters: [3], tags: ["core", "ai"] },
   { id: "ai_co", name: "Computer Organization & Architecture", branchId: "ai_ml", semesters: [3], tags: ["core"] },
   { id: "ai_os", name: "Operating Systems", branchId: "ai_ml", semesters: [3], tags: ["core"] },
   { id: "ai_discrete", name: "Discrete Mathematical Structures", branchId: "ai_ml", semesters: [3], tags: ["math"] },

   // -------- SEMESTER 4 --------
   { id: "ai_math_4", name: "Optimization Techniques for AI", branchId: "ai_ml", semesters: [4], tags: ["math"] },
   { id: "ai_daa", name: "Design & Analysis of Algorithms", branchId: "ai_ml", semesters: [4], tags: ["core"] },
   { id: "ai_dbms", name: "Database Management Systems", branchId: "ai_ml", semesters: [4], tags: ["core"] },
   { id: "ai_ml_1", name: "Introduction to Machine Learning", branchId: "ai_ml", semesters: [4], tags: ["core", "ml"] },
   { id: "ai_python_adv", name: "Advanced Python for Data Science", branchId: "ai_ml", semesters: [4], tags: ["skill"] },
   { id: "ai_automata", name: "Theory of Computation", branchId: "ai_ml", semesters: [4], tags: ["core"] },

   // -------- SEMESTER 5 --------
   { id: "ai_dl", name: "Deep Learning & Neural Networks", branchId: "ai_ml", semesters: [5], tags: ["core", "ml"] },
   { id: "ai_cn", name: "Computer Networks", branchId: "ai_ml", semesters: [5], tags: ["core"] },
   { id: "ai_bigdata", name: "Big Data Analytics", branchId: "ai_ml", semesters: [5], tags: ["core"] },
   { id: "ai_soft", name: "Soft Computing (Fuzzy Logic & GA)", branchId: "ai_ml", semesters: [5], tags: ["core", "ai"] },
   { id: "ai_r_prog", name: "R Programming", branchId: "ai_ml", semesters: [5], tags: ["elective"] },
   { id: "ai_web", name: "Web Technologies", branchId: "ai_ml", semesters: [5], tags: ["skill"] },

   // -------- SEMESTER 6 --------
   { id: "ai_nlp", name: "Natural Language Processing", branchId: "ai_ml", semesters: [6], tags: ["core", "ai"] },
   { id: "ai_cv", name: "Computer Vision & Image Processing", branchId: "ai_ml", semesters: [6], tags: ["core", "ai"] },
   { id: "ai_rl", name: "Reinforcement Learning", branchId: "ai_ml", semesters: [6], tags: ["elective"] },
   { id: "ai_cloud", name: "Cloud Computing for AI", branchId: "ai_ml", semesters: [6], tags: ["elective"] },
   { id: "ai_speech", name: "Speech Recognition Systems", branchId: "ai_ml", semesters: [6], tags: ["elective"] },
   { id: "ai_cog", name: "Cognitive Science", branchId: "ai_ml", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 --------
   { id: "ai_robotics", name: "Robotics & Intelligent Systems", branchId: "ai_ml", semesters: [7], tags: ["core"] },
   { id: "ai_gan", name: "Generative Adversarial Networks (GANs)", branchId: "ai_ml", semesters: [7], tags: ["elective"] },
   { id: "ai_social", name: "Social Network Analysis", branchId: "ai_ml", semesters: [7], tags: ["elective"] },
   { id: "ai_pattern", name: "Pattern Recognition", branchId: "ai_ml", semesters: [7], tags: ["elective"] },
   { id: "ai_bio", name: "Bio-inspired Computing", branchId: "ai_ml", semesters: [7], tags: ["elective"] },
   { id: "ai_project_1", name: "Major Project Phase I", branchId: "ai_ml", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "ai_xai", name: "Explainable AI (XAI)", branchId: "ai_ml", semesters: [8], tags: ["elective"] },
   { id: "ai_ethics", name: "Ethics & Bias in AI", branchId: "ai_ml", semesters: [8], tags: ["ethics"] },
   { id: "ai_ar_vr", name: "Augmented & Virtual Reality", branchId: "ai_ml", semesters: [8], tags: ["elective"] },
   { id: "ai_quantum", name: "Quantum Machine Learning", branchId: "ai_ml", semesters: [8], tags: ["elective", "advanced"] },
   { id: "ai_project_2", name: "Major Project Phase II", branchId: "ai_ml", semesters: [8], tags: ["project"] },


   /* =====================================================
         DATA SCIENCE
         branchId: "ds"
      ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "ds_math_1", name: "Engineering Mathematics I", branchId: "ds", semesters: [1], tags: ["core"] },
   { id: "ds_physics_1", name: "Engineering Physics I", branchId: "ds", semesters: [1], tags: ["core"] },
   { id: "ds_chemistry_1", name: "Engineering Chemistry I", branchId: "ds", semesters: [1], tags: ["core"] },
   { id: "ds_mechanics", name: "Engineering Mechanics", branchId: "ds", semesters: [1], tags: ["core"] },
   { id: "ds_bee", name: "Basic Electrical Engineering", branchId: "ds", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 --------
   { id: "ds_math_2", name: "Engineering Mathematics II", branchId: "ds", semesters: [2], tags: ["core"] },
   { id: "ds_physics_2", name: "Engineering Physics II", branchId: "ds", semesters: [2], tags: ["core"] },
   { id: "ds_chemistry_2", name: "Engineering Chemistry II", branchId: "ds", semesters: [2], tags: ["core"] },
   { id: "ds_graphics", name: "Engineering Graphics", branchId: "ds", semesters: [2], tags: ["core"] },
   { id: "ds_prog", name: "Programming in C", branchId: "ds", semesters: [2], tags: ["programming"] },
   { id: "ds_english", name: "Professional Communication", branchId: "ds", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "ds_stats", name: "Probability & Statistics for Data Science", branchId: "ds", semesters: [3], tags: ["core", "math"] },
   { id: "ds_dsa", name: "Data Structures", branchId: "ds", semesters: [3], tags: ["core"] },
   { id: "ds_dbms", name: "Database Management Systems", branchId: "ds", semesters: [3], tags: ["core"] },
   { id: "ds_python", name: "Python for Data Science", branchId: "ds", semesters: [3], tags: ["programming"] },
   { id: "ds_co", name: "Computer Organization", branchId: "ds", semesters: [3], tags: ["core"] },
   { id: "ds_excel", name: "Advanced Excel & Data Handling", branchId: "ds", semesters: [3], tags: ["skill"] },

   // -------- SEMESTER 4 --------
   { id: "ds_la", name: "Linear Algebra & Matrix Theory", branchId: "ds", semesters: [4], tags: ["math"] },
   { id: "ds_daa", name: "Design & Analysis of Algorithms", branchId: "ds", semesters: [4], tags: ["core"] },
   { id: "ds_os", name: "Operating Systems", branchId: "ds", semesters: [4], tags: ["core"] },
   { id: "ds_eda", name: "Exploratory Data Analysis (EDA)", branchId: "ds", semesters: [4], tags: ["core"] },
   { id: "ds_ml_basics", name: "Introduction to Machine Learning", branchId: "ds", semesters: [4], tags: ["core"] },
   { id: "ds_r", name: "R Programming Lab", branchId: "ds", semesters: [4], tags: ["skill"] },

   // -------- SEMESTER 5 --------
   { id: "ds_bigdata", name: "Big Data Technologies (Hadoop/Spark)", branchId: "ds", semesters: [5], tags: ["core"] },
   { id: "ds_mining", name: "Data Mining & Warehousing", branchId: "ds", semesters: [5], tags: ["core"] },
   { id: "ds_cn", name: "Computer Networks", branchId: "ds", semesters: [5], tags: ["core"] },
   { id: "ds_viz", name: "Data Visualization (Tableau/PowerBI)", branchId: "ds", semesters: [5], tags: ["skill"] },
   { id: "ds_nosql", name: "NoSQL Databases (MongoDB/Cassandra)", branchId: "ds", semesters: [5], tags: ["elective"] },
   { id: "ds_predictive", name: "Predictive Analytics", branchId: "ds", semesters: [5], tags: ["elective"] },

   // -------- SEMESTER 6 --------
   { id: "ds_dl", name: "Deep Learning", branchId: "ds", semesters: [6], tags: ["core"] },
   { id: "ds_tsa", name: "Time Series Analysis & Forecasting", branchId: "ds", semesters: [6], tags: ["core"] },
   { id: "ds_cloud", name: "Cloud Computing for Data Science", branchId: "ds", semesters: [6], tags: ["elective"] },
   { id: "ds_marketing", name: "Marketing & Retail Analytics", branchId: "ds", semesters: [6], tags: ["elective"] },
   { id: "ds_health", name: "Healthcare Data Analytics", branchId: "ds", semesters: [6], tags: ["elective"] },
   { id: "ds_optimization", name: "Optimization Techniques", branchId: "ds", semesters: [6], tags: ["math"] },

   // -------- SEMESTER 7 --------
   { id: "ds_nlp", name: "Natural Language Processing", branchId: "ds", semesters: [7], tags: ["core"] },
   { id: "ds_biz_intel", name: "Business Intelligence", branchId: "ds", semesters: [7], tags: ["elective"] },
   { id: "ds_streaming", name: "Real-Time Streaming Analytics", branchId: "ds", semesters: [7], tags: ["elective"] },
   { id: "ds_finance", name: "Financial Analytics", branchId: "ds", semesters: [7], tags: ["elective"] },
   { id: "ds_rec_sys", name: "Recommender Systems", branchId: "ds", semesters: [7], tags: ["elective"] },
   { id: "ds_project_1", name: "Major Project Phase I", branchId: "ds", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "ds_ethics", name: "Data Privacy, Ethics & GDPR", branchId: "ds", semesters: [8], tags: ["ethics"] },
   { id: "ds_social", name: "Social Network Analysis", branchId: "ds", semesters: [8], tags: ["elective"] },
   { id: "ds_high_perf", name: "High Performance Computing", branchId: "ds", semesters: [8], tags: ["elective"] },
   { id: "ds_geo", name: "Geospatial Data Analytics", branchId: "ds", semesters: [8], tags: ["elective"] },
   { id: "ds_project_2", name: "Major Project Phase II", branchId: "ds", semesters: [8], tags: ["project"] },


   /* =====================================================
         CYBER SECURITY
         branchId: "cyber_security"
      ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "cy_math_1", name: "Engineering Mathematics I", branchId: "cyber_security", semesters: [1], tags: ["core"] },
   { id: "cy_physics_1", name: "Engineering Physics I", branchId: "cyber_security", semesters: [1], tags: ["core"] },
   { id: "cy_chemistry_1", name: "Engineering Chemistry I", branchId: "cyber_security", semesters: [1], tags: ["core"] },
   { id: "cy_mechanics", name: "Engineering Mechanics", branchId: "cyber_security", semesters: [1], tags: ["core"] },
   { id: "cy_bee", name: "Basic Electrical Engineering", branchId: "cyber_security", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 --------
   { id: "cy_math_2", name: "Engineering Mathematics II", branchId: "cyber_security", semesters: [2], tags: ["core"] },
   { id: "cy_physics_2", name: "Engineering Physics II", branchId: "cyber_security", semesters: [2], tags: ["core"] },
   { id: "cy_chemistry_2", name: "Engineering Chemistry II", branchId: "cyber_security", semesters: [2], tags: ["core"] },
   { id: "cy_graphics", name: "Engineering Graphics", branchId: "cyber_security", semesters: [2], tags: ["core"] },
   { id: "cy_prog", name: "Programming in C", branchId: "cyber_security", semesters: [2], tags: ["programming"] },
   { id: "cy_english", name: "Professional Communication", branchId: "cyber_security", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "cy_math_3", name: "Number Theory & Abstract Algebra", branchId: "cyber_security", semesters: [3], tags: ["math"] },
   { id: "cy_dsa", name: "Data Structures", branchId: "cyber_security", semesters: [3], tags: ["core"] },
   { id: "cy_os", name: "Operating Systems (Linux Internals)", branchId: "cyber_security", semesters: [3], tags: ["core"] },
   { id: "cy_cn", name: "Computer Networks I (Physical & Data Link)", branchId: "cyber_security", semesters: [3], tags: ["core"] },
   { id: "cy_python", name: "Scripting (Python/Bash/Perl)", branchId: "cyber_security", semesters: [3], tags: ["skill"] },
   { id: "cy_co", name: "Computer Organization", branchId: "cyber_security", semesters: [3], tags: ["core"] },

   // -------- SEMESTER 4 --------
   { id: "cy_crypto", name: "Cryptography & Network Security", branchId: "cyber_security", semesters: [4], tags: ["core"] },
   { id: "cy_cn_2", name: "Advanced Computer Networks (TCP/IP)", branchId: "cyber_security", semesters: [4], tags: ["core"] },
   { id: "cy_dbms", name: "Database Security & Management", branchId: "cyber_security", semesters: [4], tags: ["core"] },
   { id: "cy_daa", name: "Design & Analysis of Algorithms", branchId: "cyber_security", semesters: [4], tags: ["core"] },
   { id: "cy_hardware", name: "Hardware Security & Trust", branchId: "cyber_security", semesters: [4], tags: ["elective"] },
   { id: "cy_info_theory", name: "Information Theory & Coding", branchId: "cyber_security", semesters: [4], tags: ["math"] },

   // -------- SEMESTER 5 --------
   { id: "cy_eh", name: "Ethical Hacking & Penetration Testing", branchId: "cyber_security", semesters: [5], tags: ["core"] },
   { id: "cy_forensics", name: "Digital Forensics & Investigation", branchId: "cyber_security", semesters: [5], tags: ["core"] },
   { id: "cy_web_sec", name: "Web Application Security (OWASP)", branchId: "cyber_security", semesters: [5], tags: ["core"] },
   { id: "cy_law", name: "Cyber Laws & IPR", branchId: "cyber_security", semesters: [5], tags: ["ethics"] },
   { id: "cy_biometrics", name: "Biometric Security", branchId: "cyber_security", semesters: [5], tags: ["elective"] },
   { id: "cy_stegh", name: "Steganography & Watermarking", branchId: "cyber_security", semesters: [5], tags: ["elective"] },

   // -------- SEMESTER 6 --------
   { id: "cy_malware", name: "Malware Analysis & Reverse Engineering", branchId: "cyber_security", semesters: [6], tags: ["core"] },
   { id: "cy_cloud_sec", name: "Cloud Computing & Security", branchId: "cyber_security", semesters: [6], tags: ["core"] },
   { id: "cy_mobile_sec", name: "Mobile Security (Android/iOS)", branchId: "cyber_security", semesters: [6], tags: ["elective"] },
   { id: "cy_iot_sec", name: "IoT Security", branchId: "cyber_security", semesters: [6], tags: ["elective"] },
   { id: "cy_risk", name: "Risk Management & Security Auditing", branchId: "cyber_security", semesters: [6], tags: ["management"] },
   { id: "cy_access", name: "Access Control & Identity Management", branchId: "cyber_security", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 --------
   { id: "cy_blockchain", name: "Blockchain & Cryptocurrency", branchId: "cyber_security", semesters: [7], tags: ["elective"] },
   { id: "cy_ssd", name: "Secure Software Development (SSD)", branchId: "cyber_security", semesters: [7], tags: ["core"] },
   { id: "cy_threat", name: "Cyber Threat Intelligence", branchId: "cyber_security", semesters: [7], tags: ["elective"] },
   { id: "cy_scada", name: "SCADA & ICS Security", branchId: "cyber_security", semesters: [7], tags: ["elective"] },
   { id: "cy_soc", name: "Security Operations Center (SOC) Analysis", branchId: "cyber_security", semesters: [7], tags: ["skill"] },
   { id: "cy_project_1", name: "Major Project Phase I", branchId: "cyber_security", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "cy_audit", name: "Information Security Policies & Procedures", branchId: "cyber_security", semesters: [8], tags: ["elective"] },
   { id: "cy_incident", name: "Incident Response & Disaster Recovery", branchId: "cyber_security", semesters: [8], tags: ["elective"] },
   { id: "cy_quantum", name: "Post-Quantum Cryptography", branchId: "cyber_security", semesters: [8], tags: ["advanced"] },
   { id: "cy_social_eng", name: "Social Engineering & Psychology", branchId: "cyber_security", semesters: [8], tags: ["elective"] },
   { id: "cy_project_2", name: "Major Project Phase II", branchId: "cyber_security", semesters: [8], tags: ["project"] },


   /* =====================================================
         BIOMEDICAL ENGINEERING
         branchId: "biomedical"
      ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "bm_math_1", name: "Engineering Mathematics I", branchId: "biomedical", semesters: [1], tags: ["core"] },
   { id: "bm_physics_1", name: "Engineering Physics I", branchId: "biomedical", semesters: [1], tags: ["core"] },
   { id: "bm_chemistry_1", name: "Engineering Chemistry I", branchId: "biomedical", semesters: [1], tags: ["core"] },
   { id: "bm_mechanics", name: "Engineering Mechanics", branchId: "biomedical", semesters: [1], tags: ["core"] },
   { id: "bm_bee", name: "Basic Electrical Engineering", branchId: "biomedical", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 --------
   { id: "bm_math_2", name: "Engineering Mathematics II", branchId: "biomedical", semesters: [2], tags: ["core"] },
   { id: "bm_physics_2", name: "Engineering Physics II", branchId: "biomedical", semesters: [2], tags: ["core"] },
   { id: "bm_chemistry_2", name: "Engineering Chemistry II", branchId: "biomedical", semesters: [2], tags: ["core"] },
   { id: "bm_graphics", name: "Engineering Graphics", branchId: "biomedical", semesters: [2], tags: ["core"] },
   { id: "bm_prog", name: "C Programming", branchId: "biomedical", semesters: [2], tags: ["programming"] },
   { id: "bm_english", name: "Communication Skills", branchId: "biomedical", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "bm_math_3", name: "Engineering Mathematics III", branchId: "biomedical", semesters: [3], tags: ["math"] },
   { id: "bm_anatomy", name: "Human Anatomy & Physiology", branchId: "biomedical", semesters: [3], tags: ["core", "bio"] },
   { id: "bm_circuits", name: "Electric Circuit Analysis", branchId: "biomedical", semesters: [3], tags: ["core"] },
   { id: "bm_sensors", name: "Transducers & Sensors", branchId: "biomedical", semesters: [3], tags: ["core"] },
   { id: "bm_biochem", name: "Biochemistry", branchId: "biomedical", semesters: [3], tags: ["core", "bio"] },
   { id: "bm_oops", name: "Object Oriented Programming (C++)", branchId: "biomedical", semesters: [3], tags: ["programming"] },

   // -------- SEMESTER 4 --------
   { id: "bm_analog", name: "Analog Electronics & ICs", branchId: "biomedical", semesters: [4], tags: ["core"] },
   { id: "bm_digital", name: "Digital Electronics", branchId: "biomedical", semesters: [4], tags: ["core"] },
   { id: "bm_signals", name: "Biomedical Signal Processing", branchId: "biomedical", semesters: [4], tags: ["core"] },
   { id: "bm_pathology", name: "Pathology & Microbiology", branchId: "biomedical", semesters: [4], tags: ["core", "bio"] },
   { id: "bm_measure", name: "Electronic Measurements", branchId: "biomedical", semesters: [4], tags: ["core"] },
   { id: "bm_control", name: "Control Systems in Medicine", branchId: "biomedical", semesters: [4], tags: ["core"] },

   // -------- SEMESTER 5 --------
   { id: "bm_micro", name: "Microprocessors & Microcontrollers", branchId: "biomedical", semesters: [5], tags: ["core"] },
   { id: "bm_equip_1", name: "Biomedical Instrumentation I", branchId: "biomedical", semesters: [5], tags: ["core"] },
   { id: "bm_biomat", name: "Biomaterials & Artificial Organs", branchId: "biomedical", semesters: [5], tags: ["core"] },
   { id: "bm_biomech", name: "Biomechanics", branchId: "biomedical", semesters: [5], tags: ["elective"] },
   { id: "bm_biosensors", name: "Biosensors & Bio-MEMS", branchId: "biomedical", semesters: [5], tags: ["elective"] },
   { id: "bm_hospital_train", name: "Hospital Training (Internship)", branchId: "biomedical", semesters: [5], tags: ["skill"] },

   // -------- SEMESTER 6 --------
   { id: "bm_equip_2", name: "Biomedical Instrumentation II", branchId: "biomedical", semesters: [6], tags: ["core"] },
   { id: "bm_imaging", name: "Medical Imaging (X-Ray, CT, MRI, Ultrasound)", branchId: "biomedical", semesters: [6], tags: ["core"] },
   { id: "bm_hospital", name: "Hospital Engineering & Management", branchId: "biomedical", semesters: [6], tags: ["management"] },
   { id: "bm_rehab", name: "Rehabilitation Engineering", branchId: "biomedical", semesters: [6], tags: ["elective"] },
   { id: "bm_laser", name: "Medical Laser Systems & Optics", branchId: "biomedical", semesters: [6], tags: ["elective"] },
   { id: "bm_embedded", name: "Embedded Systems in Medicine", branchId: "biomedical", semesters: [6], tags: ["core"] },

   // -------- SEMESTER 7 --------
   { id: "bm_image_proc", name: "Medical Image Processing", branchId: "biomedical", semesters: [7], tags: ["core"] },
   { id: "bm_nano", name: "Bio-Nanotechnology", branchId: "biomedical", semesters: [7], tags: ["elective"] },
   { id: "bm_tele", name: "Telemedicine & E-Health", branchId: "biomedical", semesters: [7], tags: ["elective"] },
   { id: "bm_implants", name: "Implants & Prosthetics", branchId: "biomedical", semesters: [7], tags: ["elective"] },
   { id: "bm_neural", name: "Neural Engineering", branchId: "biomedical", semesters: [7], tags: ["elective"] },
   { id: "bm_project_1", name: "Major Project Phase I", branchId: "biomedical", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "bm_robotics", name: "Medical Robotics", branchId: "biomedical", semesters: [8], tags: ["elective"] },
   { id: "bm_ethics", name: "Medical Ethics & IPR", branchId: "biomedical", semesters: [8], tags: ["ethics"] },
   { id: "bm_bioinformatics", name: "Bioinformatics", branchId: "biomedical", semesters: [8], tags: ["elective"] },
   { id: "bm_virtual", name: "Virtual Reality in Medicine", branchId: "biomedical", semesters: [8], tags: ["elective"] },
   { id: "bm_transport", name: "Biomedical Transport Phenomena", branchId: "biomedical", semesters: [8], tags: ["elective"] },
   { id: "bm_project_2", name: "Major Project Phase II", branchId: "biomedical", semesters: [8], tags: ["project"] },


   /* =====================================================
         AEROSPACE ENGINEERING
         branchId: "aerospace"
      ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "ae_math_1", name: "Engineering Mathematics I", branchId: "aerospace", semesters: [1], tags: ["core"] },
   { id: "ae_physics_1", name: "Engineering Physics I", branchId: "aerospace", semesters: [1], tags: ["core"] },
   { id: "ae_chemistry_1", name: "Engineering Chemistry I", branchId: "aerospace", semesters: [1], tags: ["core"] },
   { id: "ae_mechanics", name: "Engineering Mechanics", branchId: "aerospace", semesters: [1], tags: ["core"] },
   { id: "ae_bee", name: "Basic Electrical Engineering", branchId: "aerospace", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 --------
   { id: "ae_math_2", name: "Engineering Mathematics II", branchId: "aerospace", semesters: [2], tags: ["core"] },
   { id: "ae_physics_2", name: "Engineering Physics II", branchId: "aerospace", semesters: [2], tags: ["core"] },
   { id: "ae_chemistry_2", name: "Engineering Chemistry II", branchId: "aerospace", semesters: [2], tags: ["core"] },
   { id: "ae_graphics", name: "Engineering Graphics", branchId: "aerospace", semesters: [2], tags: ["core"] },
   { id: "ae_prog", name: "C Programming", branchId: "aerospace", semesters: [2], tags: ["programming"] },
   { id: "ae_english", name: "Professional Communication", branchId: "aerospace", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "ae_math_3", name: "Engineering Mathematics III", branchId: "aerospace", semesters: [3], tags: ["math"] },
   { id: "ae_thermo", name: "Aero Thermodynamics", branchId: "aerospace", semesters: [3], tags: ["core"] },
   { id: "ae_fluid", name: "Fluid Mechanics", branchId: "aerospace", semesters: [3], tags: ["core"] },
   { id: "ae_som", name: "Strength of Materials", branchId: "aerospace", semesters: [3], tags: ["core"] },
   { id: "ae_intro", name: "Introduction to Aerospace Engineering", branchId: "aerospace", semesters: [3], tags: ["core"] },
   { id: "ae_materials_sci", name: "Material Science", branchId: "aerospace", semesters: [3], tags: ["core"] },

   // -------- SEMESTER 4 --------
   { id: "ae_aero_1", name: "Aerodynamics I (Low Speed)", branchId: "aerospace", semesters: [4], tags: ["core"] },
   { id: "ae_prop_1", name: "Aircraft Propulsion I (Jet Engines)", branchId: "aerospace", semesters: [4], tags: ["core"] },
   { id: "ae_struct_1", name: "Aircraft Structures I", branchId: "aerospace", semesters: [4], tags: ["core"] },
   { id: "ae_flight", name: "Flight Mechanics (Performance)", branchId: "aerospace", semesters: [4], tags: ["core"] },
   { id: "ae_cad", name: "Computer Aided Aircraft Drawing", branchId: "aerospace", semesters: [4], tags: ["skill"] },
   { id: "ae_control_basics", name: "Control Engineering", branchId: "aerospace", semesters: [4], tags: ["core"] },

   // -------- SEMESTER 5 --------
   { id: "ae_aero_2", name: "Aerodynamics II (High Speed/Gas Dynamics)", branchId: "aerospace", semesters: [5], tags: ["core"] },
   { id: "ae_prop_2", name: "Aircraft Propulsion II (Rocketry)", branchId: "aerospace", semesters: [5], tags: ["core"] },
   { id: "ae_struct_2", name: "Aircraft Structures II", branchId: "aerospace", semesters: [5], tags: ["core"] },
   { id: "ae_stability", name: "Aircraft Stability & Control", branchId: "aerospace", semesters: [5], tags: ["core"] },
   { id: "ae_turbo", name: "Turbomachinery", branchId: "aerospace", semesters: [5], tags: ["elective"] },
   { id: "ae_experiment", name: "Experimental Aerodynamics", branchId: "aerospace", semesters: [5], tags: ["elective"] },

   // -------- SEMESTER 6 --------
   { id: "ae_avionics", name: "Avionics Systems", branchId: "aerospace", semesters: [6], tags: ["core"] },
   { id: "ae_fem", name: "Finite Element Methods", branchId: "aerospace", semesters: [6], tags: ["core"] },
   { id: "ae_vibrations", name: "Aeroelasticity & Vibrations", branchId: "aerospace", semesters: [6], tags: ["core"] },
   { id: "ae_materials", name: "Composite Materials", branchId: "aerospace", semesters: [6], tags: ["elective"] },
   { id: "ae_heli", name: "Helicopter Aerodynamics", branchId: "aerospace", semesters: [6], tags: ["elective"] },
   { id: "ae_combustion", name: "Combustion Technology", branchId: "aerospace", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 --------
   { id: "ae_cfd", name: "Computational Fluid Dynamics", branchId: "aerospace", semesters: [7], tags: ["core"] },
   { id: "ae_nav", name: "Navigation & Guidance Control", branchId: "aerospace", semesters: [7], tags: ["elective"] },
   { id: "ae_space", name: "Space Mechanics & Satellite Technology", branchId: "aerospace", semesters: [7], tags: ["elective"] },
   { id: "ae_cryo", name: "Cryogenics", branchId: "aerospace", semesters: [7], tags: ["elective"] },
   { id: "ae_uav", name: "UAV Design & Applications", branchId: "aerospace", semesters: [7], tags: ["elective"] },
   { id: "ae_project_1", name: "Major Project Phase I", branchId: "aerospace", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "ae_rockets", name: "Rocket & Missile Technology", branchId: "aerospace", semesters: [8], tags: ["elective"] },
   { id: "ae_mgmt", name: "Airport Management & Operations", branchId: "aerospace", semesters: [8], tags: ["management"] },
   { id: "ae_atc", name: "Air Traffic Control", branchId: "aerospace", semesters: [8], tags: ["elective"] },
   { id: "ae_hypersonic", name: "Hypersonic Aerodynamics", branchId: "aerospace", semesters: [8], tags: ["advanced"] },
   { id: "ae_maintenance", name: "Aircraft Maintenance & Repair", branchId: "aerospace", semesters: [8], tags: ["elective"] },
   { id: "ae_project_2", name: "Major Project Phase II", branchId: "aerospace", semesters: [8], tags: ["project"] },


   /* =====================================================
         AUTOMOBILE ENGINEERING
         branchId: "automobile"
      ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "au_math_1", name: "Engineering Mathematics I", branchId: "automobile", semesters: [1], tags: ["core"] },
   { id: "au_physics_1", name: "Engineering Physics I", branchId: "automobile", semesters: [1], tags: ["core"] },
   { id: "au_chemistry_1", name: "Engineering Chemistry I", branchId: "automobile", semesters: [1], tags: ["core"] },
   { id: "au_mechanics", name: "Engineering Mechanics", branchId: "automobile", semesters: [1], tags: ["core"] },
   { id: "au_bee", name: "Basic Electrical Engineering", branchId: "automobile", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 --------
   { id: "au_math_2", name: "Engineering Mathematics II", branchId: "automobile", semesters: [2], tags: ["core"] },
   { id: "au_physics_2", name: "Engineering Physics II", branchId: "automobile", semesters: [2], tags: ["core"] },
   { id: "au_chemistry_2", name: "Engineering Chemistry II", branchId: "automobile", semesters: [2], tags: ["core"] },
   { id: "au_graphics", name: "Engineering Graphics", branchId: "automobile", semesters: [2], tags: ["core"] },
   { id: "au_prog", name: "Programming in C", branchId: "automobile", semesters: [2], tags: ["programming"] },
   { id: "au_english", name: "Professional Communication", branchId: "automobile", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "au_math_3", name: "Engineering Mathematics III", branchId: "automobile", semesters: [3], tags: ["math"] },
   { id: "au_thermo", name: "Applied Thermodynamics", branchId: "automobile", semesters: [3], tags: ["core"] },
   { id: "au_som", name: "Strength of Materials", branchId: "automobile", semesters: [3], tags: ["core"] },
   { id: "au_materials", name: "Automotive Materials & Metallurgy", branchId: "automobile", semesters: [3], tags: ["core"] },
   { id: "au_engines_1", name: "Automotive Engines I (Petrol/SI)", branchId: "automobile", semesters: [3], tags: ["core"] },
   { id: "au_drawing", name: "Automotive Component Drawing", branchId: "automobile", semesters: [3], tags: ["core"] },

   // -------- SEMESTER 4 --------
   { id: "au_fluid", name: "Fluid Mechanics & Machinery", branchId: "automobile", semesters: [4], tags: ["core"] },
   { id: "au_kom", name: "Kinematics of Machinery", branchId: "automobile", semesters: [4], tags: ["core"] },
   { id: "au_chassis", name: "Automotive Chassis Systems", branchId: "automobile", semesters: [4], tags: ["core"] },
   { id: "au_engines_2", name: "Automotive Engines II (Diesel/CI)", branchId: "automobile", semesters: [4], tags: ["core"] },
   { id: "au_mfg", name: "Manufacturing Processes", branchId: "automobile", semesters: [4], tags: ["core"] },
   { id: "au_metro", name: "Metrology & Measurements", branchId: "automobile", semesters: [4], tags: ["core"] },

   // -------- SEMESTER 5 --------
   { id: "au_dom", name: "Dynamics of Machinery", branchId: "automobile", semesters: [5], tags: ["core"] },
   { id: "au_design_1", name: "Design of Machine Elements", branchId: "automobile", semesters: [5], tags: ["core"] },
   { id: "au_electrical", name: "Automotive Electrical Systems", branchId: "automobile", semesters: [5], tags: ["core"] },
   { id: "au_fuels", name: "Fuels & Lubricants", branchId: "automobile", semesters: [5], tags: ["core"] },
   { id: "au_heat", name: "Heat Transfer", branchId: "automobile", semesters: [5], tags: ["core"] },
   { id: "au_2w_3w", name: "Two and Three Wheelers", branchId: "automobile", semesters: [5], tags: ["elective"] },

   // -------- SEMESTER 6 --------
   { id: "au_design_2", name: "Automotive System Design", branchId: "automobile", semesters: [6], tags: ["core"] },
   { id: "au_trans", name: "Automotive Transmission", branchId: "automobile", semesters: [6], tags: ["core"] },
   { id: "au_vehicle_dyn", name: "Vehicle Dynamics", branchId: "automobile", semesters: [6], tags: ["core"] },
   { id: "au_pollution", name: "Automotive Pollution & Control", branchId: "automobile", semesters: [6], tags: ["elective"] },
   { id: "au_fe", name: "Finite Element Analysis (FEA)", branchId: "automobile", semesters: [6], tags: ["elective"] },
   { id: "au_aero", name: "Automotive Aerodynamics", branchId: "automobile", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 --------
   { id: "au_ev", name: "Electric & Hybrid Vehicles", branchId: "automobile", semesters: [7], tags: ["core", "modern"] },
   { id: "au_safety", name: "Vehicle Body Engineering & Safety", branchId: "automobile", semesters: [7], tags: ["core"] },
   { id: "au_autotronics", name: "Autotronics & Vehicle Intelligence", branchId: "automobile", semesters: [7], tags: ["elective"] },
   { id: "au_cad", name: "CAD/CAM in Automotive", branchId: "automobile", semesters: [7], tags: ["skill"] },
   { id: "au_offroad", name: "Off-Road Vehicles", branchId: "automobile", semesters: [7], tags: ["elective"] },
   { id: "au_project_1", name: "Major Project Phase I", branchId: "automobile", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "au_mgmt", name: "Transport Management & Motor Industry", branchId: "automobile", semesters: [8], tags: ["management"] },
   { id: "au_nvh", name: "NVH (Noise, Vibration, Harshness)", branchId: "automobile", semesters: [8], tags: ["elective"] },
   { id: "au_maintenance", name: "Vehicle Maintenance & Diagnostics", branchId: "automobile", semesters: [8], tags: ["elective"] },
   { id: "au_ac", name: "Automotive Air Conditioning", branchId: "automobile", semesters: [8], tags: ["elective"] },
   { id: "au_special", name: "Special Purpose Vehicles", branchId: "automobile", semesters: [8], tags: ["elective"] },
   { id: "au_project_2", name: "Major Project Phase II", branchId: "automobile", semesters: [8], tags: ["project"] },


   /* =====================================================
         ROBOTICS & AUTOMATION
         branchId: "robotics"
      ===================================================== */
   // -------- SEMESTER 1 --------
   { id: "rb_math_1", name: "Engineering Mathematics I", branchId: "robotics", semesters: [1], tags: ["core"] },
   { id: "rb_physics_1", name: "Engineering Physics I", branchId: "robotics", semesters: [1], tags: ["core"] },
   { id: "rb_chemistry_1", name: "Engineering Chemistry I", branchId: "robotics", semesters: [1], tags: ["core"] },
   { id: "rb_mechanics", name: "Engineering Mechanics", branchId: "robotics", semesters: [1], tags: ["core"] },
   { id: "rb_bee", name: "Basic Electrical Engineering", branchId: "robotics", semesters: [1], tags: ["core"] },

   // -------- SEMESTER 2 --------
   { id: "rb_math_2", name: "Engineering Mathematics II", branchId: "robotics", semesters: [2], tags: ["core"] },
   { id: "rb_physics_2", name: "Engineering Physics II", branchId: "robotics", semesters: [2], tags: ["core"] },
   { id: "rb_chemistry_2", name: "Engineering Chemistry II", branchId: "robotics", semesters: [2], tags: ["core"] },
   { id: "rb_graphics", name: "Engineering Graphics", branchId: "robotics", semesters: [2], tags: ["core"] },
   { id: "rb_prog", name: "Programming in C/Python", branchId: "robotics", semesters: [2], tags: ["programming"] },
   { id: "rb_english", name: "Professional Communication", branchId: "robotics", semesters: [2], tags: ["humanities"] },

   // -------- SEMESTER 3 --------
   { id: "rb_math_3", name: "Engineering Mathematics III", branchId: "robotics", semesters: [3], tags: ["math"] },
   { id: "rb_kom", name: "Kinematics of Machines", branchId: "robotics", semesters: [3], tags: ["core"] },
   { id: "rb_digital", name: "Digital Electronics", branchId: "robotics", semesters: [3], tags: ["core"] },
   { id: "rb_sensors", name: "Sensors & Instrumentation", branchId: "robotics", semesters: [3], tags: ["core"] },
   { id: "rb_dsa", name: "Data Structures", branchId: "robotics", semesters: [3], tags: ["programming"] },
   { id: "rb_circuit", name: "Network Theory", branchId: "robotics", semesters: [3], tags: ["core"] },

   // -------- SEMESTER 4 --------
   { id: "rb_robot_kin", name: "Robot Kinematics & Dynamics", branchId: "robotics", semesters: [4], tags: ["core"] },
   { id: "rb_micro", name: "Microprocessors & Microcontrollers", branchId: "robotics", semesters: [4], tags: ["core"] },
   { id: "rb_control", name: "Control Systems", branchId: "robotics", semesters: [4], tags: ["core"] },
   { id: "rb_hydraulics", name: "Hydraulics & Pneumatics", branchId: "robotics", semesters: [4], tags: ["core"] },
   { id: "rb_python", name: "Python for Robotics", branchId: "robotics", semesters: [4], tags: ["skill"] },
   { id: "rb_dom", name: "Dynamics of Machines", branchId: "robotics", semesters: [4], tags: ["core"] },

   // -------- SEMESTER 5 --------
   { id: "rb_embedded", name: "Embedded Systems Design", branchId: "robotics", semesters: [5], tags: ["core"] },
   { id: "rb_drives", name: "Electric Drives & Actuators", branchId: "robotics", semesters: [5], tags: ["core"] },
   { id: "rb_ros", name: "Robot Operating System (ROS)", branchId: "robotics", semesters: [5], tags: ["core", "skill"] },
   { id: "rb_ai", name: "AI for Robotics", branchId: "robotics", semesters: [5], tags: ["core"] },
   { id: "rb_signals", name: "Digital Signal Processing", branchId: "robotics", semesters: [5], tags: ["core"] },
   { id: "rb_design", name: "Design of Mechatronic Elements", branchId: "robotics", semesters: [5], tags: ["elective"] },

   // -------- SEMESTER 6 --------
   { id: "rb_vision", name: "Machine Vision", branchId: "robotics", semesters: [6], tags: ["core"] },
   { id: "rb_mobile", name: "Mobile Robotics", branchId: "robotics", semesters: [6], tags: ["core"] },
   { id: "rb_automation", name: "Industrial Automation (PLC/SCADA)", branchId: "robotics", semesters: [6], tags: ["core"] },
   { id: "rb_mechatronics", name: "Mechatronics Systems", branchId: "robotics", semesters: [6], tags: ["core"] },
   { id: "rb_cnc", name: "CNC & Manufacturing Automation", branchId: "robotics", semesters: [6], tags: ["elective"] },
   { id: "rb_flexible", name: "Flexible Manufacturing Systems", branchId: "robotics", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 --------
   { id: "rb_swarm", name: "Swarm Robotics", branchId: "robotics", semesters: [7], tags: ["elective"] },
   { id: "rb_hri", name: "Human-Robot Interaction", branchId: "robotics", semesters: [7], tags: ["elective"] },
   { id: "rb_drone", name: "Drone Technology (UAVs)", branchId: "robotics", semesters: [7], tags: ["elective"] },
   { id: "rb_nanobot", name: "Micro & Nano Robotics", branchId: "robotics", semesters: [7], tags: ["elective"] },
   { id: "rb_field", name: "Field & Service Robotics", branchId: "robotics", semesters: [7], tags: ["elective"] },
   { id: "rb_project_1", name: "Major Project Phase I", branchId: "robotics", semesters: [7], tags: ["project"] },

   // -------- SEMESTER 8 --------
   { id: "rb_industry4", name: "Industry 4.0 & IIoT", branchId: "robotics", semesters: [8], tags: ["elective"] },
   { id: "rb_underwater", name: "Underwater Robotics", branchId: "robotics", semesters: [8], tags: ["elective"] },
   { id: "rb_ethics", name: "Robo-Ethics & Safety", branchId: "robotics", semesters: [8], tags: ["ethics"] },
   { id: "rb_medical_bot", name: "Medical Robotics", branchId: "robotics", semesters: [8], tags: ["elective"] },
   { id: "rb_agri_bot", name: "Agricultural Robotics", branchId: "robotics", semesters: [8], tags: ["elective"] },
   { id: "rb_project_2", name: "Major Project Phase II", branchId: "robotics", semesters: [8], tags: ["project"] },


   /* =====================================================
       1. ARCHITECTURE (B.Arch)
       branchId: "architecture"
       Degree: Undergraduate (5 Years / 10 Semesters)
      ===================================================== */

   // -------- SEMESTER 1 (Foundation) --------
   { id: "arch_design_1", name: "Architectural Design Studio I", branchId: "architecture", semesters: [1], tags: ["core", "studio"] },
   { id: "arch_graphics_1", name: "Architectural Graphics & Drawing I", branchId: "architecture", semesters: [1], tags: ["core", "skill"] },
   { id: "arch_mat_1", name: "Building Materials & Construction I", branchId: "architecture", semesters: [1], tags: ["core", "tech"] },
   { id: "arch_struct_1", name: "Theory of Structures I", branchId: "architecture", semesters: [1], tags: ["core", "civil"] },
   { id: "arch_hist_1", name: "History of Architecture I (Ancient Civilizations)", branchId: "architecture", semesters: [1], tags: ["theory", "history"] },
   { id: "arch_art", name: "Visual Arts & Basic Design", branchId: "architecture", semesters: [1], tags: ["skill", "art"] },
   { id: "arch_math", name: "Mathematics for Architects", branchId: "architecture", semesters: [1], tags: ["math"] },

   // -------- SEMESTER 2 (Basics) --------
   { id: "arch_design_2", name: "Architectural Design Studio II", branchId: "architecture", semesters: [2], tags: ["core", "studio"] },
   { id: "arch_graphics_2", name: "Architectural Graphics II (Perspective/Sciography)", branchId: "architecture", semesters: [2], tags: ["core", "skill"] },
   { id: "arch_mat_2", name: "Building Materials & Construction II", branchId: "architecture", semesters: [2], tags: ["core", "tech"] },
   { id: "arch_struct_2", name: "Theory of Structures II", branchId: "architecture", semesters: [2], tags: ["core", "civil"] },
   { id: "arch_survey", name: "Surveying & Levelling", branchId: "architecture", semesters: [2], tags: ["skill", "site"] },
   { id: "arch_climat", name: "Climatology & Solar Architecture", branchId: "architecture", semesters: [2], tags: ["science", "env"] },

   // -------- SEMESTER 3 (Services & Systems) --------
   { id: "arch_design_3", name: "Architectural Design Studio III", branchId: "architecture", semesters: [3], tags: ["core", "studio"] },
   { id: "arch_mat_3", name: "Building Construction III", branchId: "architecture", semesters: [3], tags: ["core", "tech"] },
   { id: "arch_services_1", name: "Building Services I (Water Supply & Sanitation)", branchId: "architecture", semesters: [3], tags: ["core", "services"] },
   { id: "arch_hist_2", name: "History of Architecture II (Islamic/Indian)", branchId: "architecture", semesters: [3], tags: ["theory"] },
   { id: "arch_comp_1", name: "Computer Applications I (AutoCAD/2D)", branchId: "architecture", semesters: [3], tags: ["software"] },
   { id: "arch_struct_3", name: "Structure III (RCC Design)", branchId: "architecture", semesters: [3], tags: ["core", "civil"] },

   // -------- SEMESTER 4 (Design Development) --------
   { id: "arch_design_4", name: "Architectural Design Studio IV", branchId: "architecture", semesters: [4], tags: ["core", "studio"] },
   { id: "arch_services_2", name: "Building Services II (Electrical & Lighting)", branchId: "architecture", semesters: [4], tags: ["core", "services"] },
   { id: "arch_hist_3", name: "History of Architecture III (Modern/Contemporary)", branchId: "architecture", semesters: [4], tags: ["theory"] },
   { id: "arch_comp_2", name: "Computer Applications II (BIM/Revit/3D)", branchId: "architecture", semesters: [4], tags: ["software", "3d"] },
   { id: "arch_site_plan", name: "Site Planning & Landscape Engineering", branchId: "architecture", semesters: [4], tags: ["core", "landscape"] },

   // -------- SEMESTER 5 (Advanced Tech) --------
   { id: "arch_design_5", name: "Architectural Design Studio V", branchId: "architecture", semesters: [5], tags: ["core", "studio"] },
   { id: "arch_services_3", name: "Building Services III (HVAC & Mechanical)", branchId: "architecture", semesters: [5], tags: ["core", "services"] },
   { id: "arch_acoustics", name: "Architectural Acoustics", branchId: "architecture", semesters: [5], tags: ["science"] },
   { id: "arch_const_mgmt", name: "Building Specification & Estimation", branchId: "architecture", semesters: [5], tags: ["management"] },
   { id: "arch_socio", name: "Sociology of Architecture", branchId: "architecture", semesters: [5], tags: ["theory"] },

   // -------- SEMESTER 6 (Urban Context) --------
   { id: "arch_design_6", name: "Architectural Design Studio VI (Housing/Campus)", branchId: "architecture", semesters: [6], tags: ["core", "studio"] },
   { id: "arch_steel", name: "Design of Steel Structures", branchId: "architecture", semesters: [6], tags: ["core", "civil"] },
   { id: "arch_housing", name: "Housing Planning & Management", branchId: "architecture", semesters: [6], tags: ["theory", "planning"] },
   { id: "arch_green", name: "Green Building Rating Systems (GRIHA/LEED)", branchId: "architecture", semesters: [6], tags: ["elective", "sustainability"] },
   { id: "arch_working_draw", name: "Working Drawings & Detailing", branchId: "architecture", semesters: [6], tags: ["core", "tech"] },

   // -------- SEMESTER 7 (Urban Design) --------
   { id: "arch_design_7", name: "Architectural Design Studio VII (Urban Context)", branchId: "architecture", semesters: [7], tags: ["core", "studio"] },
   { id: "arch_urban_des", name: "Introduction to Urban Design", branchId: "architecture", semesters: [7], tags: ["core", "design"] },
   { id: "arch_proj_mgmt", name: "Project Management", branchId: "architecture", semesters: [7], tags: ["management"] },
   { id: "arch_research", name: "Research Methodology in Architecture", branchId: "architecture", semesters: [7], tags: ["research"] },
   { id: "arch_interior", name: "Interior Design (Elective)", branchId: "architecture", semesters: [7], tags: ["elective"] },

   // -------- SEMESTER 8 (Professional Practice) --------
   { id: "arch_design_8", name: "Architectural Design Studio VIII (High Rise/Complex)", branchId: "architecture", semesters: [8], tags: ["core", "studio"] },
   { id: "arch_prof_prac", name: "Professional Practice & Ethics", branchId: "architecture", semesters: [8], tags: ["law", "management"] },
   { id: "arch_disaster", name: "Disaster Mitigation & Management", branchId: "architecture", semesters: [8], tags: ["elective"] },
   { id: "arch_heritage", name: "Architectural Conservation", branchId: "architecture", semesters: [8], tags: ["elective"] },
   { id: "arch_thesis_prep", name: "Thesis Orientation / Pre-Thesis", branchId: "architecture", semesters: [8], tags: ["research"] },

   // -------- SEMESTER 9 (Internship) --------
   { id: "arch_internship", name: "Professional Training / Internship (16 Weeks)", branchId: "architecture", semesters: [9], tags: ["training"] },

   // -------- SEMESTER 10 (Thesis) --------
   { id: "arch_thesis", name: "Architectural Design Thesis", branchId: "architecture", semesters: [10], tags: ["project", "core"] },

   /* =====================================================
       2. MASTER OF ARCHITECTURE (M.Arch)
       branchId: "m_arch"
       (2 Years / 4 Semesters)
      ===================================================== */
   { id: "march_studio_1", name: "Advanced Design Studio I", branchId: "m_arch", semesters: [1], tags: ["core", "studio"] },
   { id: "march_theory", name: "Contemporary Architectural Theories", branchId: "m_arch", semesters: [1], tags: ["theory"] },
   { id: "march_research", name: "Research Methodology", branchId: "m_arch", semesters: [1], tags: ["research"] },

   { id: "march_studio_2", name: "Advanced Design Studio II", branchId: "m_arch", semesters: [2], tags: ["core", "studio"] },
   { id: "march_sustainable", name: "Sustainable Architecture & Energy Efficiency", branchId: "m_arch", semesters: [2], tags: ["tech"] },
   { id: "march_urbanism", name: "Urbanism & Urban Morphology", branchId: "m_arch", semesters: [2], tags: ["urban"] },

   { id: "march_pedagogy", name: "Architectural Pedagogy", branchId: "m_arch", semesters: [3], tags: ["teaching"] },
   { id: "march_dissertation", name: "Dissertation Phase I", branchId: "m_arch", semesters: [3], tags: ["research"] },

   { id: "march_thesis", name: "Final Thesis", branchId: "m_arch", semesters: [4], tags: ["project"] },

   /* =====================================================
       3. BACHELOR OF PLANNING (B.Plan)
       branchId: "b_plan"
       (4 Years / 8 Semesters) - ITPI Syllabus
      ===================================================== */

   // -------- Sem 1 & 2 --------
   { id: "bplan_fund", name: "Fundamentals of Urban & Regional Planning", branchId: "b_plan", semesters: [1], tags: ["core"] },
   { id: "bplan_graph", name: "Planning & Design Graphics", branchId: "b_plan", semesters: [1], tags: ["skill"] },
   { id: "bplan_survey", name: "Surveying & Photogrammetry", branchId: "b_plan", semesters: [2], tags: ["tech"] },
   { id: "bplan_stat", name: "Statistical Methods for Planners", branchId: "b_plan", semesters: [2], tags: ["math"] },

   // -------- Sem 3 & 4 --------
   { id: "bplan_housing", name: "Housing & Community Planning", branchId: "b_plan", semesters: [3], tags: ["core"] },
   { id: "bplan_demography", name: "Demography & Urbanization", branchId: "b_plan", semesters: [3], tags: ["theory"] },
   { id: "bplan_trans", name: "Traffic & Transportation Planning I", branchId: "b_plan", semesters: [4], tags: ["core"] },
   { id: "bplan_env", name: "Ecology & Environmental Planning", branchId: "b_plan", semesters: [4], tags: ["env"] },

   // -------- Sem 5 & 6 --------
   { id: "bplan_law", name: "Planning Legislation & Acts", branchId: "b_plan", semesters: [5], tags: ["law"] },
   { id: "bplan_regional", name: "Regional Planning", branchId: "b_plan", semesters: [5], tags: ["core"] },
   { id: "bplan_gis", name: "Geoinformatics (GIS/Remote Sensing)", branchId: "b_plan", semesters: [6], tags: ["tech"] },
   { id: "bplan_urban_des", name: "Urban Design & Conservation", branchId: "b_plan", semesters: [6], tags: ["design"] },

   // -------- Sem 7 & 8 --------
   { id: "bplan_finance", name: "Development Finance & Project Mgmt", branchId: "b_plan", semesters: [7], tags: ["management"] },
   { id: "bplan_gov", name: "Urban Governance", branchId: "b_plan", semesters: [7], tags: ["management"] },
   { id: "bplan_thesis", name: "Planning Thesis", branchId: "b_plan", semesters: [8], tags: ["project"] },

   /* =====================================================
       4. MASTER OF PLANNING (M.Plan)
       branchId: "m_plan"
       (Specialization: Urban / Regional / Transport)
      ===================================================== */
   { id: "mplan_hist", name: "Planning History & Theory", branchId: "m_plan", semesters: [1], tags: ["theory"] },
   { id: "mplan_studio_1", name: "Area Planning Studio", branchId: "m_plan", semesters: [1], tags: ["practical"] },
   { id: "mplan_infra", name: "Infrastructure Planning", branchId: "m_plan", semesters: [2], tags: ["core"] },
   { id: "mplan_city", name: "City & Metropolitan Planning", branchId: "m_plan", semesters: [2], tags: ["core"] },
   { id: "mplan_policy", name: "Public Policy & Politics", branchId: "m_plan", semesters: [3], tags: ["policy"] },
   { id: "mplan_thesis", name: "Planning Thesis", branchId: "m_plan", semesters: [4], tags: ["project"] },

   /* =====================================================
       5. URBAN & REGIONAL PLANNING
       branchId: "urban_planning"
       (Generic ID for both UG/PG reference)
      ===================================================== */
   { id: "up_land_use", name: "Land Use Planning", branchId: "urban_planning", semesters: [1], tags: ["core"] },
   { id: "up_transport", name: "Transportation Systems", branchId: "urban_planning", semesters: [1], tags: ["core"] },
   { id: "up_housing_pol", name: "Housing Policy & Finance", branchId: "urban_planning", semesters: [2], tags: ["policy"] },
   { id: "up_smart_city", name: "Smart Cities & Technology", branchId: "urban_planning", semesters: [2], tags: ["modern"] },

   /* =====================================================
       6. LANDSCAPE ARCHITECTURE
       branchId: "landscape"
      ===================================================== */
   { id: "la_ecology", name: "Landscape Ecology & Plant Systematics", branchId: "landscape", semesters: [1], tags: ["science"] },
   { id: "la_studio_1", name: "Landscape Design Studio", branchId: "landscape", semesters: [1], tags: ["studio"] },
   { id: "la_eng", name: "Landscape Engineering & Services", branchId: "landscape", semesters: [2], tags: ["tech"] },
   { id: "la_geo", name: "Geology & Soils for Landscape", branchId: "landscape", semesters: [2], tags: ["soil"] },
   { id: "la_conservation", name: "Landscape Conservation", branchId: "landscape", semesters: [3], tags: ["theory"] },

   /* =====================================================
       7. CONSTRUCTION MANAGEMENT
       branchId: "construction_mgmt"
      ===================================================== */
   { id: "cm_planning", name: "Construction Planning & Scheduling (MSP/Primavera)", branchId: "construction_mgmt", semesters: [1], tags: ["core", "software"] },
   { id: "cm_contracts", name: "Construction Contracts & Arbitration", branchId: "construction_mgmt", semesters: [1], tags: ["law"] },
   { id: "cm_equipment", name: "Construction Methods & Equipment", branchId: "construction_mgmt", semesters: [2], tags: ["tech"] },
   { id: "cm_finance", name: "Construction Finance & Cost Control", branchId: "construction_mgmt", semesters: [2], tags: ["finance"] },
   { id: "cm_quality", name: "Quality & Safety Management (ISO/HSE)", branchId: "construction_mgmt", semesters: [3], tags: ["management"] },
   { id: "cm_real_estate", name: "Real Estate Management", branchId: "construction_mgmt", semesters: [3], tags: ["elective"] },

   /* =====================================================
       8. INTERIOR ARCHITECTURE / DESIGN
       branchId: "interior_architecture"
      ===================================================== */
   { id: "id_design_1", name: "Interior Design Studio I", branchId: "interior_architecture", semesters: [1], tags: ["studio"] },
   { id: "id_materials", name: "Interior Materials & Finishes", branchId: "interior_architecture", semesters: [1], tags: ["tech"] },
   { id: "id_history", name: "History of Interior Design", branchId: "interior_architecture", semesters: [2], tags: ["theory"] },
   { id: "id_furniture", name: "Furniture Design & Joinery", branchId: "interior_architecture", semesters: [2], tags: ["core"] },
   { id: "id_lighting", name: "Lighting Design & Acoustics", branchId: "interior_architecture", semesters: [3], tags: ["tech"] },
   { id: "id_cad", name: "Computer Aided Interior Design", branchId: "interior_architecture", semesters: [3], tags: ["software"] },
   { id: "id_estimation", name: "Estimation & Professional Practice", branchId: "interior_architecture", semesters: [4], tags: ["management"] },

   /* =====================================================
       1. B.DES FOUNDATION (Common for all Design streams)
       branchId: "bdes"
       (Year 1 / Semesters 1 & 2)
      ===================================================== */
   { id: "des_fnd_drawing", name: "Drawing & Sketching Fundamentals", branchId: "bdes", semesters: [1], tags: ["core", "skill"] },
   { id: "des_fnd_color", name: "Color Theory & Composition", branchId: "bdes", semesters: [1], tags: ["theory", "visual"] },
   { id: "des_fnd_geometry", name: "Geometry & Technical Drawing", branchId: "bdes", semesters: [1], tags: ["technical"] },
   { id: "des_fnd_material", name: "Material Exploration (Clay/Paper/Wood)", branchId: "bdes", semesters: [1], tags: ["workshop"] },
   { id: "des_fnd_hist", name: "History of Art & Design", branchId: "bdes", semesters: [2], tags: ["theory"] },
   { id: "des_fnd_digital", name: "Digital Design Tools (Photoshop/Illustrator)", branchId: "bdes", semesters: [2], tags: ["software"] },
   { id: "des_fnd_elements", name: "Elements of Design (Form/Space/Texture)", branchId: "bdes", semesters: [2], tags: ["core"] },


   /* =====================================================
       2. FASHION DESIGN (NIFT Curriculum)
       branchId: "fashion_design"
      ===================================================== */
   { id: "fd_pattern_1", name: "Pattern Making I (Basic Blocks)", branchId: "fashion_design", semesters: [3], tags: ["core", "technical"] },
   { id: "fd_draping_1", name: "Draping Techniques I", branchId: "fashion_design", semesters: [3], tags: ["core", "skill"] },
   { id: "fd_gc_1", name: "Garment Construction I", branchId: "fashion_design", semesters: [3], tags: ["core", "practical"] },
   { id: "fd_illustration", name: "Fashion Illustration & Croquis", branchId: "fashion_design", semesters: [3], tags: ["art"] },
   { id: "fd_textile_sci", name: "Textile Science for Fashion", branchId: "fashion_design", semesters: [3], tags: ["theory"] },

   { id: "fd_pattern_2", name: "Pattern Making II (Dart Manipulation)", branchId: "fashion_design", semesters: [4], tags: ["core"] },
   { id: "fd_gc_2", name: "Garment Construction II", branchId: "fashion_design", semesters: [4], tags: ["core"] },
   { id: "fd_history_costume", name: "History of Costumes (Indian/Western)", branchId: "fashion_design", semesters: [4], tags: ["theory"] },
   { id: "fd_manufacturing", name: "Apparel Manufacturing Process", branchId: "fashion_design", semesters: [4], tags: ["production"] },

   { id: "fd_kids_wear", name: "Kidswear Design", branchId: "fashion_design", semesters: [5], tags: ["specialization"] },
   { id: "fd_mens_wear", name: "Menswear Design", branchId: "fashion_design", semesters: [5], tags: ["specialization"] },
   { id: "fd_merch", name: "Fashion Merchandising & Marketing", branchId: "fashion_design", semesters: [5], tags: ["management"] },
   { id: "fd_cad", name: "Fashion CAD (Tukatech/Reach)", branchId: "fashion_design", semesters: [5], tags: ["software"] },

   { id: "fd_knitwear", name: "Knitwear Design", branchId: "fashion_design", semesters: [6], tags: ["specialization"] },
   { id: "fd_portfolio", name: "Portfolio Development", branchId: "fashion_design", semesters: [7], tags: ["career"] },
   { id: "fd_grad_proj", name: "Graduation Design Collection", branchId: "fashion_design", semesters: [8], tags: ["project"] },

   /* =====================================================
       3. GRAPHIC DESIGN (Communication Design)
       branchId: "graphic_design"
      ===================================================== */
   { id: "gd_typo_1", name: "Typography I (Calligraphy & Lettering)", branchId: "graphic_design", semesters: [3], tags: ["core"] },
   { id: "gd_print", name: "Print Production Techniques", branchId: "graphic_design", semesters: [3], tags: ["technical"] },
   { id: "gd_illustration", name: "Digital Illustration (Vector Art)", branchId: "graphic_design", semesters: [3], tags: ["software"] },

   { id: "gd_layout", name: "Layout & Composition (InDesign)", branchId: "graphic_design", semesters: [4], tags: ["core"] },
   { id: "gd_branding", name: "Branding & Identity Design", branchId: "graphic_design", semesters: [4], tags: ["core"] },
   { id: "gd_photo", name: "Advertising Photography", branchId: "graphic_design", semesters: [4], tags: ["skill"] },

   { id: "gd_packaging", name: "Packaging Design", branchId: "graphic_design", semesters: [5], tags: ["core", "3d"] },
   { id: "gd_publication", name: "Publication Design", branchId: "graphic_design", semesters: [5], tags: ["core"] },
   { id: "gd_info", name: "Information Design & Data Viz", branchId: "graphic_design", semesters: [6], tags: ["advanced"] },
   { id: "gd_campaign", name: "Advertising Campaign Planning", branchId: "graphic_design", semesters: [7], tags: ["project"] },

   /* =====================================================
       4. INTERIOR DESIGN
       branchId: "interior_design"
      ===================================================== */
   { id: "id_space", name: "Space Planning & Anthropometry", branchId: "interior_design", semesters: [3], tags: ["core"] },
   { id: "id_materials_1", name: "Interior Materials (Wood/Stone/Glass)", branchId: "interior_design", semesters: [3], tags: ["tech"] },
   { id: "id_drafting", name: "Interior Drafting & Graphics", branchId: "interior_design", semesters: [3], tags: ["skill"] },

   { id: "id_services_1", name: "Building Services (Plumbing/Lighting)", branchId: "interior_design", semesters: [4], tags: ["tech"] },
   { id: "id_furniture", name: "Furniture Design & Joinery", branchId: "interior_design", semesters: [4], tags: ["core"] },
   { id: "id_cad_2d", name: "AutoCAD for Interiors", branchId: "interior_design", semesters: [4], tags: ["software"] },

   { id: "id_lighting", name: "Lighting Design", branchId: "interior_design", semesters: [5], tags: ["specialization"] },
   { id: "id_cad_3d", name: "3D Visualization (SketchUp/V-Ray)", branchId: "interior_design", semesters: [5], tags: ["software"] },
   { id: "id_retail", name: "Retail & Commercial Space Design", branchId: "interior_design", semesters: [6], tags: ["core"] },
   { id: "id_landscape", name: "Interior Landscape Design", branchId: "interior_design", semesters: [6], tags: ["elective"] },
   { id: "id_estimation", name: "Estimation, Costing & Specs", branchId: "interior_design", semesters: [7], tags: ["management"] },

   /* =====================================================
       5. INDUSTRIAL / PRODUCT DESIGN
       branchId: "industrial_design"
      ===================================================== */
   { id: "pd_materials", name: "Materials & Processes (Metals/Plastics)", branchId: "industrial_design", semesters: [3], tags: ["tech"] },
   { id: "pd_ergonomics", name: "Ergonomics & Human Factors", branchId: "industrial_design", semesters: [3], tags: ["core"] },
   { id: "pd_sketching", name: "Product Sketching & Rendering", branchId: "industrial_design", semesters: [3], tags: ["skill"] },

   { id: "pd_cad_1", name: "CAD Modeling (SolidWorks/Fusion 360)", branchId: "industrial_design", semesters: [4], tags: ["software"] },
   { id: "pd_prototyping", name: "Prototyping & Model Making", branchId: "industrial_design", semesters: [4], tags: ["workshop"] },
   { id: "pd_mechanism", name: "Simple Mechanisms", branchId: "industrial_design", semesters: [4], tags: ["tech"] },

   { id: "pd_systems", name: "Product System Design", branchId: "industrial_design", semesters: [5], tags: ["core"] },
   { id: "pd_sustainable", name: "Sustainable Design", branchId: "industrial_design", semesters: [6], tags: ["theory"] },
   { id: "pd_medical", name: "Medical Product Design", branchId: "industrial_design", semesters: [7], tags: ["specialization"] },

   /* =====================================================
       6. UI / UX DESIGN (Interaction Design)
       branchId: "ui_ux"
      ===================================================== */
   { id: "ui_research", name: "User Research & Personas", branchId: "ui_ux", semesters: [1], tags: ["research"] },
   { id: "ui_info_arch", name: "Information Architecture (IA)", branchId: "ui_ux", semesters: [1], tags: ["theory"] },
   { id: "ui_wireframe", name: "Wireframing & Prototyping (Figma)", branchId: "ui_ux", semesters: [2], tags: ["core", "software"] },
   { id: "ui_visual", name: "Visual Design & Design Systems", branchId: "ui_ux", semesters: [2], tags: ["visual"] },
   { id: "ui_interaction", name: "Interaction Design (IxD)", branchId: "ui_ux", semesters: [3], tags: ["core"] },
   { id: "ui_usability", name: "Usability Testing", branchId: "ui_ux", semesters: [3], tags: ["testing"] },
   { id: "ui_mobile", name: "Mobile App Design (iOS/Android Guidelines)", branchId: "ui_ux", semesters: [4], tags: ["specialization"] },
   { id: "ui_hc_interact", name: "Human-Computer Interaction (HCI)", branchId: "ui_ux", semesters: [4], tags: ["theory"] },

   /* =====================================================
       7. TEXTILE DESIGN (New Addition)
       branchId: "textile_design"
      ===================================================== */
   { id: "td_fiber", name: "Fiber to Fabric (Textile Science)", branchId: "textile_design", semesters: [3], tags: ["theory"] },
   { id: "td_weaving_1", name: "Weaving Technology I", branchId: "textile_design", semesters: [3], tags: ["tech"] },
   { id: "td_print_1", name: "Textile Printing (Block/Screen)", branchId: "textile_design", semesters: [3], tags: ["skill"] },
   { id: "td_dyeing", name: "Dyeing & Chemical Processing", branchId: "textile_design", semesters: [4], tags: ["tech"] },
   { id: "td_surface", name: "Surface Ornamentation (Embroidery)", branchId: "textile_design", semesters: [4], tags: ["skill"] },
   { id: "td_cad", name: "Textile CAD (NedGraphics/Corel)", branchId: "textile_design", semesters: [5], tags: ["software"] },
   { id: "td_home", name: "Home Furnishing Design", branchId: "textile_design", semesters: [6], tags: ["specialization"] },

   /* =====================================================
       8. ANIMATION & FILM DESIGN (New Addition)
       branchId: "animation_design"
      ===================================================== */
   { id: "anim_draw", name: "Drawing for Animation (Anatomy/Gestures)", branchId: "animation_design", semesters: [3], tags: ["art"] },
   { id: "anim_script", name: "Scriptwriting & Storyboarding", branchId: "animation_design", semesters: [3], tags: ["pre-production"] },
   { id: "anim_2d", name: "Classical 2D Animation", branchId: "animation_design", semesters: [4], tags: ["core"] },
   { id: "anim_char", name: "Character Design", branchId: "animation_design", semesters: [4], tags: ["art"] },
   { id: "anim_3d_mod", name: "3D Modeling & Texturing (Maya/Blender)", branchId: "animation_design", semesters: [5], tags: ["3d"] },
   { id: "anim_rig", name: "Rigging & Animation", branchId: "animation_design", semesters: [6], tags: ["3d"] },
   { id: "anim_vfx", name: "VFX & Compositing", branchId: "animation_design", semesters: [7], tags: ["tech"] },

   /* =====================================================
       9. MASTER OF DESIGN (M.Des)
       branchId: "m_des"
       (Specializations vary, these are common core)
      ===================================================== */
   { id: "mdes_research", name: "Design Research Methodology", branchId: "m_des", semesters: [1], tags: ["research"] },
   { id: "mdes_thinking", name: "Advanced Design Thinking", branchId: "m_des", semesters: [1], tags: ["theory"] },
   { id: "mdes_studies", name: "Design Studies & Culture", branchId: "m_des", semesters: [1], tags: ["theory"] },
   { id: "mdes_mgmt", name: "Design Management & Strategy", branchId: "m_des", semesters: [2], tags: ["management"] },
   { id: "mdes_ergonomics", name: "Advanced Ergonomics", branchId: "m_des", semesters: [2], tags: ["tech"] },
   { id: "mdes_thesis", name: "Master's Thesis / Dissertation", branchId: "m_des", semesters: [4], tags: ["project"] },

   /* =====================================================
       1. B.Sc (Hons) AGRICULTURE
       branchId: "agriculture"
       (4 Years / 8 Semesters)
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "agri_agro_fund", name: "Fundamentals of Agronomy", branchId: "agriculture", semesters: [1], tags: ["core", "agronomy"] },
   { id: "agri_genetics_fund", name: "Fundamentals of Genetics", branchId: "agriculture", semesters: [1], tags: ["core", "genetics"] },
   { id: "agri_soil_fund", name: "Fundamentals of Soil Science", branchId: "agriculture", semesters: [1], tags: ["core", "soil"] },
   { id: "agri_horti_fund", name: "Fundamentals of Horticulture", branchId: "agriculture", semesters: [1], tags: ["core", "horticulture"] },
   { id: "agri_socio", name: "Rural Sociology & Educational Psychology", branchId: "agriculture", semesters: [1], tags: ["extension"] },
   { id: "agri_forestry_intro", name: "Introduction to Forestry", branchId: "agriculture", semesters: [1], tags: ["elective"] },
   { id: "agri_heritage", name: "Agricultural Heritage", branchId: "agriculture", semesters: [1], tags: ["audit"] },
   { id: "agri_biochem", name: "Fundamentals of Plant Biochemistry", branchId: "agriculture", semesters: [1], tags: ["basic_science"] },

   // -------- SEMESTER 2 --------
   { id: "agri_crop_physio", name: "Fundamentals of Crop Physiology", branchId: "agriculture", semesters: [2], tags: ["core", "physiology"] },
   { id: "agri_econ_fund", name: "Fundamentals of Agricultural Economics", branchId: "agriculture", semesters: [2], tags: ["core", "economics"] },
   { id: "agri_patho_fund", name: "Fundamentals of Plant Pathology", branchId: "agriculture", semesters: [2], tags: ["core", "pathology"] },
   { id: "agri_entom_fund", name: "Fundamentals of Entomology", branchId: "agriculture", semesters: [2], tags: ["core", "entomology"] },
   { id: "agri_ext_fund", name: "Fundamentals of Agricultural Extension Education", branchId: "agriculture", semesters: [2], tags: ["core", "extension"] },
   { id: "agri_comm_skills", name: "Communication Skills & Personality Development", branchId: "agriculture", semesters: [2], tags: ["humanities"] },
   { id: "agri_water_mgmt", name: "Soil and Water Conservation Engineering", branchId: "agriculture", semesters: [2], tags: ["engineering"] },

   // -------- SEMESTER 3 --------
   { id: "agri_kharif", name: "Crop Production Technology - I (Kharif Crops)", branchId: "agriculture", semesters: [3], tags: ["core", "agronomy"] },
   { id: "agri_breeding_fund", name: "Fundamentals of Plant Breeding", branchId: "agriculture", semesters: [3], tags: ["core", "genetics"] },
   { id: "agri_micro", name: "Agricultural Microbiology", branchId: "agriculture", semesters: [3], tags: ["basic_science"] },
   { id: "agri_finance", name: "Agricultural Finance & Co-operation", branchId: "agriculture", semesters: [3], tags: ["economics"] },
   { id: "agri_informatics", name: "Agri-Informatics", branchId: "agriculture", semesters: [3], tags: ["computer"] },
   { id: "agri_machinery", name: "Farm Machinery and Power", branchId: "agriculture", semesters: [3], tags: ["engineering"] },
   { id: "agri_veg_sci", name: "Production Technology for Vegetables & Spices", branchId: "agriculture", semesters: [3], tags: ["horticulture"] },
   { id: "agri_stat", name: "Statistical Methods", branchId: "agriculture", semesters: [3], tags: ["math"] },

   // -------- SEMESTER 4 --------
   { id: "agri_rabi", name: "Crop Production Technology - II (Rabi Crops)", branchId: "agriculture", semesters: [4], tags: ["core", "agronomy"] },
   { id: "agri_seed", name: "Principles of Seed Technology", branchId: "agriculture", semesters: [4], tags: ["core", "genetics"] },
   { id: "agri_problem_soil", name: "Problematic Soils and their Management", branchId: "agriculture", semesters: [4], tags: ["soil"] },
   { id: "agri_renewable", name: "Renewable Energy and Green Technology", branchId: "agriculture", semesters: [4], tags: ["engineering"] },
   { id: "agri_fruit_sci", name: "Production Technology for Fruit & Plantation Crops", branchId: "agriculture", semesters: [4], tags: ["horticulture"] },
   { id: "agri_marketing", name: "Agricultural Marketing, Trade & Prices", branchId: "agriculture", semesters: [4], tags: ["economics"] },
   { id: "agri_livestock", name: "Livestock & Poultry Management", branchId: "agriculture", semesters: [4], tags: ["animal_science"] },

   // -------- SEMESTER 5 --------
   { id: "agri_pest_mgmt", name: "Integrated Pest Management (IPM)", branchId: "agriculture", semesters: [5], tags: ["entomology"] },
   { id: "agri_disease_mgmt", name: "Diseases of Field & Horticultural Crops - I", branchId: "agriculture", semesters: [5], tags: ["pathology"] },
   { id: "agri_biotech", name: "Introduction to Plant Biotechnology", branchId: "agriculture", semesters: [5], tags: ["biotech"] },
   { id: "agri_floriculture", name: "Production Tech for Ornamental Crops & Landscaping", branchId: "agriculture", semesters: [5], tags: ["horticulture"] },
   { id: "agri_manure", name: "Manures, Fertilizers and Soil Fertility Management", branchId: "agriculture", semesters: [5], tags: ["soil"] },
   { id: "agri_ipr", name: "Intellectual Property Rights", branchId: "agriculture", semesters: [5], tags: ["law"] },

   // -------- SEMESTER 6 --------
   { id: "agri_farming_sys", name: "Farming Systems & Sustainable Agriculture", branchId: "agriculture", semesters: [6], tags: ["agronomy"] },
   { id: "agri_post_harvest", name: "Post-harvest Management of Crops", branchId: "agriculture", semesters: [6], tags: ["horticulture"] },
   { id: "agri_disease_mgmt_2", name: "Diseases of Field & Horticultural Crops - II", branchId: "agriculture", semesters: [6], tags: ["pathology"] },
   { id: "agri_organic", name: "Principles of Organic Farming", branchId: "agriculture", semesters: [6], tags: ["agronomy"] },
   { id: "agri_breeding_crop", name: "Crop Improvement - I & II", branchId: "agriculture", semesters: [6], tags: ["genetics"] },
   { id: "agri_watershed", name: "Rainfed Agriculture & Watershed Management", branchId: "agriculture", semesters: [6], tags: ["agronomy"] },
   { id: "agri_food_safety", name: "Food Safety and Standards", branchId: "agriculture", semesters: [6], tags: ["food"] },

   // -------- SEMESTER 7 (RAWE) --------
   { id: "agri_rawe", name: "Rural Agricultural Work Experience (RAWE)", branchId: "agriculture", semesters: [7], tags: ["practical", "field_work"] },
   { id: "agri_aia", name: "Agro-Industrial Attachment (AIA)", branchId: "agriculture", semesters: [7], tags: ["internship"] },

   // -------- SEMESTER 8 (ELP) --------
   { id: "agri_elp_mushroom", name: "ELP: Mushroom Cultivation Technology", branchId: "agriculture", semesters: [8], tags: ["module"] },
   { id: "agri_elp_seed", name: "ELP: Seed Production and Technology", branchId: "agriculture", semesters: [8], tags: ["module"] },
   { id: "agri_elp_organic", name: "ELP: Organic Production Technology", branchId: "agriculture", semesters: [8], tags: ["module"] },
   { id: "agri_elp_food", name: "ELP: Food Processing", branchId: "agriculture", semesters: [8], tags: ["module"] },

   /* =====================================================
       2. B.Sc (Hons) HORTICULTURE
       branchId: "horticulture"
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "hort_fund", name: "Fundamentals of Horticulture", branchId: "horticulture", semesters: [1], tags: ["core"] },
   { id: "hort_prop", name: "Plant Propagation and Nursery Management", branchId: "horticulture", semesters: [1], tags: ["core"] },
   { id: "hort_botany", name: "Introductory Crop Physiology", branchId: "horticulture", semesters: [1], tags: ["basic"] },
   { id: "hort_soil", name: "Fundamentals of Soil Science", branchId: "horticulture", semesters: [1], tags: ["soil"] },

   // -------- SEMESTER 2 --------
   { id: "hort_fruit_trop", name: "Tropical and Subtropical Fruits", branchId: "horticulture", semesters: [2], tags: ["core", "fruit"] },
   { id: "hort_veg_trop", name: "Tropical and Subtropical Vegetables", branchId: "horticulture", semesters: [2], tags: ["core", "veg"] },
   { id: "hort_ornamental", name: "Ornamental Horticulture", branchId: "horticulture", semesters: [2], tags: ["core", "floriculture"] },
   { id: "hort_patho", name: "Fundamentals of Plant Pathology", branchId: "horticulture", semesters: [2], tags: ["protection"] },

   // -------- SEMESTER 3 --------
   { id: "hort_fruit_temp", name: "Temperate Fruit Crops", branchId: "horticulture", semesters: [3], tags: ["core", "fruit"] },
   { id: "hort_veg_temp", name: "Temperate Vegetable Crops", branchId: "horticulture", semesters: [3], tags: ["core", "veg"] },
   { id: "hort_tuber", name: "Tuber and Spices Crops", branchId: "horticulture", semesters: [3], tags: ["core"] },
   { id: "hort_nematode", name: "Nematode Pests of Horticultural Crops", branchId: "horticulture", semesters: [3], tags: ["protection"] },

   // -------- SEMESTER 4 --------
   { id: "hort_plantation", name: "Plantation Crops", branchId: "horticulture", semesters: [4], tags: ["core"] },
   { id: "hort_breeding", name: "Breeding of Fruit and Plantation Crops", branchId: "horticulture", semesters: [4], tags: ["genetics"] },
   { id: "hort_insect", name: "Insect Pests of Fruit & Plantation Crops", branchId: "horticulture", semesters: [4], tags: ["entomology"] },
   { id: "hort_medicinal", name: "Medicinal and Aromatic Crops", branchId: "horticulture", semesters: [4], tags: ["elective"] },

   // -------- SEMESTER 5 --------
   { id: "hort_canopy", name: "Canopy Management in Fruit Crops", branchId: "horticulture", semesters: [5], tags: ["advanced"] },
   { id: "hort_post_harvest", name: "Post-Harvest Management of Hort Crops", branchId: "horticulture", semesters: [5], tags: ["core", "processing"] },
   { id: "hort_diseases", name: "Diseases of Fruit & Plantation Crops", branchId: "horticulture", semesters: [5], tags: ["pathology"] },
   { id: "hort_landscape", name: "Principles of Landscape Architecture", branchId: "horticulture", semesters: [5], tags: ["design"] },

   // -------- SEMESTER 6 --------
   { id: "hort_breeding_veg", name: "Breeding of Vegetable & Ornamental Crops", branchId: "horticulture", semesters: [6], tags: ["genetics"] },
   { id: "hort_seed", name: "Seed Production of Vegetable, Tuber & Spice Crops", branchId: "horticulture", semesters: [6], tags: ["seed"] },
   { id: "hort_processing", name: "Processing of Horticultural Crops", branchId: "horticulture", semesters: [6], tags: ["processing"] },
   { id: "hort_protected", name: "Precision Farming & Protected Cultivation", branchId: "horticulture", semesters: [6], tags: ["tech"] },

   // -------- SEMESTER 7 & 8 (Experience) --------
   { id: "hort_rhwe", name: "Rural Horticultural Work Experience (RHWE)", branchId: "horticulture", semesters: [7], tags: ["field"] },
   { id: "hort_elp", name: "Experiential Learning Programme (ELP)", branchId: "horticulture", semesters: [8], tags: ["project"] },

   /* =====================================================
       3. B.F.Sc (FISHERIES SCIENCE)
       branchId: "fisheries"
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "fish_taxonomy", name: "Taxonomy of Finfish", branchId: "fisheries", semesters: [1], tags: ["core", "biology"] },
   { id: "fish_shell_tax", name: "Taxonomy of Shellfish", branchId: "fisheries", semesters: [1], tags: ["core"] },
   { id: "fish_met", name: "Meteorology & Geography", branchId: "fisheries", semesters: [1], tags: ["basic"] },
   { id: "fish_biochem", name: "Principles of Biochemistry", branchId: "fisheries", semesters: [1], tags: ["basic"] },

   // -------- SEMESTER 2 --------
   { id: "fish_limnology", name: "Limnology", branchId: "fisheries", semesters: [2], tags: ["core", "water"] },
   { id: "fish_marine", name: "Marine Biology", branchId: "fisheries", semesters: [2], tags: ["core"] },
   { id: "fish_food", name: "Fish Food Organisms", branchId: "fisheries", semesters: [2], tags: ["nutrition"] },
   { id: "fish_aqua_fresh", name: "Freshwater Aquaculture", branchId: "fisheries", semesters: [2], tags: ["aquaculture"] },

   // -------- SEMESTER 3 --------
   { id: "fish_ocean", name: "Oceanography", branchId: "fisheries", semesters: [3], tags: ["core"] },
   { id: "fish_nutrition", name: "Fish Nutrition & Feed Technology", branchId: "fisheries", semesters: [3], tags: ["nutrition"] },
   { id: "fish_physio", name: "Physiology of Finfish & Shellfish", branchId: "fisheries", semesters: [3], tags: ["biology"] },
   { id: "fish_gear", name: "Fishing Gear Technology", branchId: "fisheries", semesters: [3], tags: ["engineering"] },

   // -------- SEMESTER 4 --------
   { id: "fish_mariculture", name: "Coastal Aquaculture & Mariculture", branchId: "fisheries", semesters: [4], tags: ["aquaculture"] },
   { id: "fish_craft", name: "Fishing Craft Technology", branchId: "fisheries", semesters: [4], tags: ["engineering"] },
   { id: "fish_patho", name: "Fish Immunology & Pathology", branchId: "fisheries", semesters: [4], tags: ["disease"] },
   { id: "fish_genetics", name: "Genetics & Breeding", branchId: "fisheries", semesters: [4], tags: ["breeding"] },

   // -------- SEMESTER 5 --------
   { id: "fish_ornamental", name: "Ornamental Fish Production", branchId: "fisheries", semesters: [5], tags: ["commercial"] },
   { id: "fish_breeding", name: "Fish Seed Production & Hatchery Mgmt", branchId: "fisheries", semesters: [5], tags: ["breeding"] },
   { id: "fish_micro", name: "Fish Microbiology", branchId: "fisheries", semesters: [5], tags: ["lab"] },
   { id: "fish_nav", name: "Navigation & Seamanship", branchId: "fisheries", semesters: [5], tags: ["skill"] },

   // -------- SEMESTER 6 --------
   { id: "fish_canning", name: "Canning & Fish Packaging", branchId: "fisheries", semesters: [6], tags: ["processing"] },
   { id: "fish_freezing", name: "Freezing Technology", branchId: "fisheries", semesters: [6], tags: ["processing"] },
   { id: "fish_quality", name: "Quality Assurance of Fish Products", branchId: "fisheries", semesters: [6], tags: ["qc"] },
   { id: "fish_econ", name: "Fisheries Economics & Marketing", branchId: "fisheries", semesters: [6], tags: ["business"] },

   // -------- SEMESTER 7 & 8 --------
   { id: "fish_rfwe", name: "Rural Fisheries Work Experience", branchId: "fisheries", semesters: [7], tags: ["field"] },
   { id: "fish_inplant", name: "In-plant Training (Processing/Farm)", branchId: "fisheries", semesters: [8], tags: ["training"] },

   /* =====================================================
       4. B.Tech DAIRY TECHNOLOGY
       branchId: "dairy"
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "dairy_chem_1", name: "Dairy Chemistry", branchId: "dairy", semesters: [1], tags: ["core"] },
   { id: "dairy_micro_1", name: "Dairy Microbiology", branchId: "dairy", semesters: [1], tags: ["core"] },
   { id: "dairy_fluid", name: "Fluid Mechanics", branchId: "dairy", semesters: [1], tags: ["engineering"] },
   { id: "dairy_milk_prod", name: "Milk Production Management", branchId: "dairy", semesters: [1], tags: ["production"] },

   // -------- SEMESTER 2 --------
   { id: "dairy_market_milk", name: "Market Milk", branchId: "dairy", semesters: [2], tags: ["processing"] },
   { id: "dairy_thermo", name: "Thermodynamics", branchId: "dairy", semesters: [2], tags: ["engineering"] },
   { id: "dairy_biochem", name: "Biochemistry", branchId: "dairy", semesters: [2], tags: ["science"] },
   { id: "dairy_eng_1", name: "Dairy Engineering", branchId: "dairy", semesters: [2], tags: ["engineering"] },

   // -------- SEMESTER 3 --------
   { id: "dairy_fat_rich", name: "Fat Rich Dairy Products (Butter/Ghee)", branchId: "dairy", semesters: [3], tags: ["product"] },
   { id: "dairy_dried", name: "Condensed & Dried Milks", branchId: "dairy", semesters: [3], tags: ["product"] },
   { id: "dairy_elec", name: "Electrical Engineering", branchId: "dairy", semesters: [3], tags: ["engineering"] },
   { id: "dairy_micro_2", name: "Microbiology of Dairy Products", branchId: "dairy", semesters: [3], tags: ["lab"] },

   // -------- SEMESTER 4 --------
   { id: "dairy_icecream", name: "Ice Cream & Frozen Desserts", branchId: "dairy", semesters: [4], tags: ["product"] },
   { id: "dairy_cheese", name: "Cheese Technology", branchId: "dairy", semesters: [4], tags: ["product"] },
   { id: "dairy_starter", name: "Starter Cultures & Fermented Milks", branchId: "dairy", semesters: [4], tags: ["micro"] },
   { id: "dairy_heat", name: "Heat Transfer", branchId: "dairy", semesters: [4], tags: ["engineering"] },

   // -------- SEMESTER 5 --------
   { id: "dairy_byproduct", name: "By-Products Technology", branchId: "dairy", semesters: [5], tags: ["processing"] },
   { id: "dairy_packaging", name: "Food & Dairy Packaging", branchId: "dairy", semesters: [5], tags: ["tech"] },
   { id: "dairy_plant_design", name: "Dairy Plant Design & Layout", branchId: "dairy", semesters: [5], tags: ["design"] },
   { id: "dairy_business", name: "Dairy Business Management", branchId: "dairy", semesters: [5], tags: ["management"] },

   // -------- SEMESTER 6 --------
   { id: "dairy_qc", name: "Quality Assurance & Sensory Evaluation", branchId: "dairy", semesters: [6], tags: ["qc"] },
   { id: "dairy_process_eng", name: "Dairy Process Engineering", branchId: "dairy", semesters: [6], tags: ["engineering"] },
   { id: "dairy_traditional", name: "Traditional Indian Dairy Products", branchId: "dairy", semesters: [6], tags: ["product"] },
   { id: "dairy_food_tech", name: "Food Technology (Non-Dairy)", branchId: "dairy", semesters: [6], tags: ["elective"] },

   // -------- SEMESTER 7 & 8 --------
   { id: "dairy_training", name: "In-Plant Training (Student READY)", branchId: "dairy", semesters: [7, 8], tags: ["internship"] },

   /* =====================================================
       5. B.Tech FOOD TECHNOLOGY
       branchId: "food_tech"
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "ft_chem", name: "Food Chemistry of Macronutrients", branchId: "food_tech", semesters: [1], tags: ["core"] },
   { id: "ft_micro", name: "General Microbiology", branchId: "food_tech", semesters: [1], tags: ["core"] },
   { id: "ft_math", name: "Engineering Mathematics", branchId: "food_tech", semesters: [1], tags: ["math"] },
   { id: "ft_intro", name: "Introduction to Food Science", branchId: "food_tech", semesters: [1], tags: ["basics"] },

   // -------- SEMESTER 2 --------
   { id: "ft_micro_food", name: "Food Microbiology", branchId: "food_tech", semesters: [2], tags: ["core"] },
   { id: "ft_chem_micro", name: "Food Chemistry of Micronutrients", branchId: "food_tech", semesters: [2], tags: ["core"] },
   { id: "ft_eng", name: "Basic Electronics & Electrical Engg", branchId: "food_tech", semesters: [2], tags: ["engg"] },
   { id: "ft_biochem", name: "Food Biochemistry", branchId: "food_tech", semesters: [2], tags: ["science"] },

   // -------- SEMESTER 3 --------
   { id: "ft_process_veg", name: "Processing Technology of Fruits & Veg", branchId: "food_tech", semesters: [3], tags: ["processing"] },
   { id: "ft_fluid", name: "Fluid Mechanics", branchId: "food_tech", semesters: [3], tags: ["engineering"] },
   { id: "ft_cereal", name: "Processing of Cereals, Pulses & Oilseeds", branchId: "food_tech", semesters: [3], tags: ["processing"] },
   { id: "ft_additives", name: "Food Additives & Preservatives", branchId: "food_tech", semesters: [3], tags: ["tech"] },

   // -------- SEMESTER 4 --------
   { id: "ft_dairy", name: "Processing of Milk & Milk Products", branchId: "food_tech", semesters: [4], tags: ["dairy"] },
   { id: "ft_heat", name: "Heat & Mass Transfer", branchId: "food_tech", semesters: [4], tags: ["engineering"] },
   { id: "ft_meat", name: "Processing of Meat & Poultry", branchId: "food_tech", semesters: [4], tags: ["animal"] },
   { id: "ft_eng_prop", name: "Engineering Properties of Biological Materials", branchId: "food_tech", semesters: [4], tags: ["physics"] },

   // -------- SEMESTER 5 --------
   { id: "ft_fish", name: "Processing of Fish & Marine Products", branchId: "food_tech", semesters: [5], tags: ["animal"] },
   { id: "ft_baking", name: "Bakery & Confectionery Technology", branchId: "food_tech", semesters: [5], tags: ["baking"] },
   { id: "ft_unit_ops", name: "Unit Operations in Food Processing", branchId: "food_tech", semesters: [5], tags: ["engineering"] },
   { id: "ft_spices", name: "Processing of Spices & Plantation Crops", branchId: "food_tech", semesters: [5], tags: ["processing"] },

   // -------- SEMESTER 6 --------
   { id: "ft_packaging", name: "Food Packaging Technology", branchId: "food_tech", semesters: [6], tags: ["tech"] },
   { id: "ft_quality", name: "Food Quality, Safety & Standards", branchId: "food_tech", semesters: [6], tags: ["qc"] },
   { id: "ft_sensory", name: "Sensory Evaluation of Food", branchId: "food_tech", semesters: [6], tags: ["lab"] },
   { id: "ft_storage", name: "Food Storage Engineering", branchId: "food_tech", semesters: [6], tags: ["engineering"] },

   // -------- SEMESTER 7 & 8 --------
   { id: "ft_experiential", name: "Student READY / In-Plant Training", branchId: "food_tech", semesters: [7, 8], tags: ["training"] },

   /* =====================================================
       6. B.Sc (Hons) FORESTRY
       branchId: "forestry"
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "for_intro", name: "Introduction to Forestry", branchId: "forestry", semesters: [1], tags: ["core"] },
   { id: "for_dendro", name: "Dendrology", branchId: "forestry", semesters: [1], tags: ["core"] },
   { id: "for_geo", name: "Geology & Soils", branchId: "forestry", semesters: [1], tags: ["soil"] },
   { id: "for_biochem", name: "Plant Biochemistry", branchId: "forestry", semesters: [1], tags: ["science"] },

   // -------- SEMESTER 2 --------
   { id: "for_silvi", name: "Principles of Silviculture", branchId: "forestry", semesters: [2], tags: ["core"] },
   { id: "for_physio", name: "Tree Physiology", branchId: "forestry", semesters: [2], tags: ["biology"] },
   { id: "for_survey", name: "Forest Surveying", branchId: "forestry", semesters: [2], tags: ["skill"] },
   { id: "for_agro", name: "Agroforestry Systems", branchId: "forestry", semesters: [2], tags: ["farming"] },

   // -------- SEMESTER 3 --------
   { id: "for_mensuration", name: "Forest Mensuration", branchId: "forestry", semesters: [3], tags: ["math"] },
   { id: "for_ecology", name: "Forest Ecology & Biodiversity", branchId: "forestry", semesters: [3], tags: ["environment"] },
   { id: "for_nursery", name: "Forest Nursery Technology", branchId: "forestry", semesters: [3], tags: ["practical"] },
   { id: "for_eng", name: "Forest Engineering", branchId: "forestry", semesters: [3], tags: ["tech"] },

   // -------- SEMESTER 4 --------
   { id: "for_mgmt", name: "Forest Management", branchId: "forestry", semesters: [4], tags: ["management"] },
   { id: "for_patho", name: "Forest Pathology", branchId: "forestry", semesters: [4], tags: ["protection"] },
   { id: "for_entom", name: "Forest Entomology", branchId: "forestry", semesters: [4], tags: ["protection"] },
   { id: "for_seed", name: "Forest Seed Technology", branchId: "forestry", semesters: [4], tags: ["seed"] },

   // -------- SEMESTER 5 --------
   { id: "for_policy", name: "Forest Laws & Policy", branchId: "forestry", semesters: [5], tags: ["law"] },
   { id: "for_utilization", name: "Wood Science & Utilization", branchId: "forestry", semesters: [5], tags: ["industry"] },
   { id: "for_ntfp", name: "Non-Timber Forest Products", branchId: "forestry", semesters: [5], tags: ["commercial"] },
   { id: "for_remote", name: "Remote Sensing & GIS in Forestry", branchId: "forestry", semesters: [5], tags: ["tech"] },

   // -------- SEMESTER 6 --------
   { id: "for_breeding", name: "Tree Improvement & Breeding", branchId: "forestry", semesters: [6], tags: ["genetics"] },
   { id: "for_economics", name: "Forest Economics", branchId: "forestry", semesters: [6], tags: ["business"] },
   { id: "for_tribal", name: "Tribology & Ethnobotany", branchId: "forestry", semesters: [6], tags: ["social"] },
   { id: "for_wildlife", name: "Wildlife Management", branchId: "forestry", semesters: [6], tags: ["wildlife"] },

   // -------- SEMESTER 7 & 8 --------
   { id: "for_fwe", name: "Forestry Work Experience (FWE)", branchId: "forestry", semesters: [7], tags: ["field"] },
   { id: "for_project", name: "Project Report / ELP", branchId: "forestry", semesters: [8], tags: ["research"] },

   /* =====================================================
       1. ITI & SKILL DEVELOPMENT (NCVT / SCVT)
       branchId: "iti"
       Structure: Trade-wise (Year/Sem)
      ===================================================== */

   // --- Trade: Electrician (2 Years) ---
   { id: "iti_elec_theory_1", name: "Trade Theory (Electrician) - Year 1", branchId: "iti", semesters: [1, 2], tags: ["core", "electrical"] },
   { id: "iti_elec_prac_1", name: "Trade Practical (Wiring/Joints)", branchId: "iti", semesters: [1, 2], tags: ["practical", "electrical"] },
   { id: "iti_wcs_1", name: "Workshop Calculation & Science - Year 1", branchId: "iti", semesters: [1, 2], tags: ["math", "science"] },
   { id: "iti_ed_1", name: "Engineering Drawing - Year 1", branchId: "iti", semesters: [1, 2], tags: ["drawing"] },
   { id: "iti_es_1", name: "Employability Skills - Year 1", branchId: "iti", semesters: [1, 2], tags: ["soft_skills"] },

   { id: "iti_elec_theory_2", name: "Trade Theory (DC Machines/AC Motors)", branchId: "iti", semesters: [3, 4], tags: ["core", "electrical"] },
   { id: "iti_elec_prac_2", name: "Trade Practical (Winding/Panel Board)", branchId: "iti", semesters: [3, 4], tags: ["practical"] },
   { id: "iti_wcs_2", name: "Workshop Calculation & Science - Year 2", branchId: "iti", semesters: [3, 4], tags: ["math"] },

   // --- Trade: Fitter (2 Years) ---
   { id: "iti_fitter_theory_1", name: "Trade Theory (Fitter) - Year 1", branchId: "iti", semesters: [1, 2], tags: ["core", "mechanical"] },
   { id: "iti_fitter_prac_1", name: "Trade Practical (Fitting/Drilling)", branchId: "iti", semesters: [1, 2], tags: ["practical"] },
   { id: "iti_fitter_theory_2", name: "Trade Theory (Lathe/Assembly)", branchId: "iti", semesters: [3, 4], tags: ["core"] },
   { id: "iti_fitter_prac_2", name: "Trade Practical (Advanced Fitting)", branchId: "iti", semesters: [3, 4], tags: ["practical"] },

   // --- Trade: Computer Operator & Prog. Assistant (COPA) (1 Year) ---
   { id: "iti_copa_fund", name: "Computer Fundamentals & OS", branchId: "iti", semesters: [1], tags: ["core", "computer"] },
   { id: "iti_copa_office", name: "Office Automation (Word/Excel)", branchId: "iti", semesters: [1], tags: ["software"] },
   { id: "iti_copa_prog", name: "Programming Concepts (Python/Java)", branchId: "iti", semesters: [2], tags: ["programming"] },
   { id: "iti_copa_web", name: "Web Design (HTML/CSS) & E-Commerce", branchId: "iti", semesters: [2], tags: ["web"] },
   { id: "iti_copa_cyber", name: "Cyber Security & Cloud Basics", branchId: "iti", semesters: [2], tags: ["security"] },

   // --- Trade: Welder (1 Year) ---
   { id: "iti_welder_theory", name: "Trade Theory (Welding Tech)", branchId: "iti", semesters: [1], tags: ["core", "mechanical"] },
   { id: "iti_welder_prac", name: "Trade Practical (Gas/Arc Welding)", branchId: "iti", semesters: [1], tags: ["practical"] },

   // --- Trade: Mechanic Diesel (1 Year) ---
   { id: "iti_diesel_theory", name: "Trade Theory (Diesel Engine)", branchId: "iti", semesters: [1], tags: ["core", "auto"] },
   { id: "iti_diesel_prac", name: "Practical (Engine Overhauling)", branchId: "iti", semesters: [1], tags: ["practical"] },

   /* =====================================================
       2. POLYTECHNIC DIPLOMA (Engineering)
       branchId: "polytechnic"
       Structure: Branch-wise (Semester)
      ===================================================== */

   // -------- Common First Year (All Branches) --------
   { id: "poly_math_1", name: "Applied Mathematics I", branchId: "polytechnic", semesters: [1], tags: ["math", "core"] },
   { id: "poly_physics_1", name: "Applied Physics I", branchId: "polytechnic", semesters: [1], tags: ["science"] },
   { id: "poly_chem", name: "Applied Chemistry", branchId: "polytechnic", semesters: [1], tags: ["science"] },
   { id: "poly_comm", name: "Communication Skills in English", branchId: "polytechnic", semesters: [1], tags: ["english"] },
   { id: "poly_draw", name: "Engineering Graphics / Drawing", branchId: "polytechnic", semesters: [1], tags: ["drawing"] },
   { id: "poly_workshop", name: "Engineering Workshop Practice", branchId: "polytechnic", semesters: [1], tags: ["practical"] },

   // -------- Diploma in Computer Science / IT --------
   { id: "poly_cs_c", name: "Programming in C", branchId: "polytechnic", semesters: [2], tags: ["programming"] },
   { id: "poly_cs_digital", name: "Digital Electronics", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_cs_os", name: "Operating Systems", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_cs_java", name: "Object Oriented Programming (Java)", branchId: "polytechnic", semesters: [4], tags: ["programming"] },
   { id: "poly_cs_dbms", name: "Relational DBMS", branchId: "polytechnic", semesters: [4], tags: ["database"] },
   { id: "poly_cs_web", name: "Web Technologies (PHP/MySQL)", branchId: "polytechnic", semesters: [5], tags: ["web"] },
   { id: "poly_cs_security", name: "Information Security", branchId: "polytechnic", semesters: [6], tags: ["security"] },

   // -------- Diploma in Mechanical Engineering --------
   { id: "poly_mech_som", name: "Strength of Materials", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_mech_thermo", name: "Thermal Engineering", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_mech_tom", name: "Theory of Machines", branchId: "polytechnic", semesters: [4], tags: ["core"] },
   { id: "poly_mech_fluid", name: "Fluid Mechanics & Machinery", branchId: "polytechnic", semesters: [4], tags: ["core"] },
   { id: "poly_mech_prod", name: "Advanced Manufacturing Processes", branchId: "polytechnic", semesters: [5], tags: ["core"] },
   { id: "poly_mech_auto", name: "Automobile Engineering", branchId: "polytechnic", semesters: [6], tags: ["elective"] },

   // -------- Diploma in Civil Engineering --------
   { id: "poly_civil_survey", name: "Surveying", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_civil_const", name: "Construction Materials & Building Const.", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_civil_rcc", name: "RCC Design", branchId: "polytechnic", semesters: [4], tags: ["structural"] },
   { id: "poly_civil_highway", name: "Highway Engineering", branchId: "polytechnic", semesters: [5], tags: ["core"] },
   { id: "poly_civil_estimate", name: "Estimating, Costing & Valuation", branchId: "polytechnic", semesters: [6], tags: ["management"] },

   // -------- Diploma in Electrical Engineering --------
   { id: "poly_ee_cir", name: "Electrical Circuits", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_ee_mach_1", name: "Electrical Machines - I", branchId: "polytechnic", semesters: [4], tags: ["core"] },
   { id: "poly_ee_power", name: "Power System (Gen, Trans, Dist)", branchId: "polytechnic", semesters: [5], tags: ["core"] },
   { id: "poly_ee_uee", name: "Utilization of Electrical Energy", branchId: "polytechnic", semesters: [6], tags: ["core"] },

   // -------- Diploma in Electronics (ECE) --------
   { id: "poly_ece_analog", name: "Electronic Devices & Circuits", branchId: "polytechnic", semesters: [3], tags: ["core"] },
   { id: "poly_ece_comm", name: "Analog & Digital Communication", branchId: "polytechnic", semesters: [4], tags: ["core"] },
   { id: "poly_ece_micro", name: "Microcontroller & Embedded Sys", branchId: "polytechnic", semesters: [5], tags: ["core"] },

   /* =====================================================
       3. SKILL-BASED TRAINING PROGRAMS (NSDC / Short-term)
       branchId: "skill_training"
      ===================================================== */

   // --- Digital Skills ---
   { id: "skill_dm_seo", name: "Digital Marketing: SEO & SEM", branchId: "skill_training", level: "cert", tags: ["marketing", "digital"] },
   { id: "skill_dm_smm", name: "Social Media Marketing", branchId: "skill_training", level: "cert", tags: ["marketing"] },
   { id: "skill_web_full", name: "Full Stack Web Development", branchId: "skill_training", level: "cert", tags: ["coding"] },
   { id: "skill_data_entry", name: "Advanced Data Entry & Office Tools", branchId: "skill_training", level: "cert", tags: ["office"] },
   { id: "skill_graphic", name: "Graphic Design (CorelDraw/Photoshop)", branchId: "skill_training", level: "cert", tags: ["creative"] },

   // --- Technical Skills ---
   { id: "skill_mobile_repair", name: "Mobile Phone Hardware Repairing", branchId: "skill_training", level: "cert", tags: ["technical"] },
   { id: "skill_ac_repair", name: "AC & Refrigeration Repair", branchId: "skill_training", level: "cert", tags: ["technical"] },
   { id: "skill_cctv", name: "CCTV Installation & Networking", branchId: "skill_training", level: "cert", tags: ["technical"] },
   { id: "skill_solar", name: "Solar Panel Installation Technician", branchId: "skill_training", level: "cert", tags: ["green_jobs"] },

   // --- Service Sector ---
   { id: "skill_beauty", name: "Beautician & Makeup Artist", branchId: "skill_training", level: "cert", tags: ["beauty"] },
   { id: "skill_yoga", name: "Yoga Instructor Training", branchId: "skill_training", level: "cert", tags: ["health"] },
   { id: "skill_retail", name: "Retail Sales Associate", branchId: "skill_training", level: "cert", tags: ["retail"] },
   { id: "skill_gda", name: "General Duty Assistant (Nursing Aide)", branchId: "skill_training", level: "cert", tags: ["healthcare"] },

   /* =====================================================
       4. BACHELOR OF VOCATION (B.Voc)
       branchId: "bvoc"
       (Degree with multiple exit points: Diploma, Adv Diploma, Degree)
      ===================================================== */

   // --- B.Voc Software Development ---
   { id: "bvoc_sd_it", name: "IT Fundamentals & Programming (C)", branchId: "bvoc", semesters: [1], tags: ["software"] },
   { id: "bvoc_sd_web", name: "Web Designing (HTML/CSS/JS)", branchId: "bvoc", semesters: [2], tags: ["web"] },
   { id: "bvoc_sd_java", name: "Java Programming", branchId: "bvoc", semesters: [3], tags: ["programming"] },
   { id: "bvoc_sd_android", name: "Android App Development", branchId: "bvoc", semesters: [4], tags: ["mobile"] },
   { id: "bvoc_sd_project", name: "Software Project Work", branchId: "bvoc", semesters: [5, 6], tags: ["project"] },

   // --- B.Voc Retail Management ---
   { id: "bvoc_rm_intro", name: "Introduction to Retail Business", branchId: "bvoc", semesters: [1], tags: ["retail"] },
   { id: "bvoc_rm_store", name: "Store Operations & Supply Chain", branchId: "bvoc", semesters: [2], tags: ["retail"] },
   { id: "bvoc_rm_cust", name: "Customer Relationship Mgmt (CRM)", branchId: "bvoc", semesters: [3], tags: ["marketing"] },
   { id: "bvoc_rm_ecommerce", name: "E-Retailing & Digital Marketing", branchId: "bvoc", semesters: [4], tags: ["digital"] },

   // --- B.Voc Hospitality & Tourism ---
   { id: "bvoc_ht_front", name: "Front Office Operations", branchId: "bvoc", semesters: [1], tags: ["hotel"] },
   { id: "bvoc_ht_house", name: "Housekeeping Management", branchId: "bvoc", semesters: [2], tags: ["hotel"] },
   { id: "bvoc_ht_food", name: "Food Production & Service", branchId: "bvoc", semesters: [3], tags: ["culinary"] },
   { id: "bvoc_ht_travel", name: "Travel Agency & Tour Ops", branchId: "bvoc", semesters: [4], tags: ["tourism"] },

   // --- B.Voc Automobile ---
   { id: "bvoc_auto_engine", name: "Automobile Engine Systems", branchId: "bvoc", semesters: [1], tags: ["auto"] },
   { id: "bvoc_auto_elec", name: "Auto Electrical & Electronics", branchId: "bvoc", semesters: [2], tags: ["auto"] },
   { id: "bvoc_auto_diag", name: "Vehicle Diagnostics & Testing", branchId: "bvoc", semesters: [3], tags: ["auto"] },
   { id: "bvoc_auto_ev", name: "Electric Vehicle Technology", branchId: "bvoc", semesters: [4], tags: ["auto", "modern"] },

   // --- B.Voc Medical Lab Technology ---
   { id: "bvoc_mlt_anat", name: "Human Anatomy & Physiology", branchId: "bvoc", semesters: [1], tags: ["medical"] },
   { id: "bvoc_mlt_biochem", name: "Clinical Biochemistry", branchId: "bvoc", semesters: [2], tags: ["medical"] },
   { id: "bvoc_mlt_micro", name: "Microbiology & Pathology", branchId: "bvoc", semesters: [3], tags: ["medical"] },
   { id: "bvoc_mlt_hema", name: "Hematology & Blood Banking", branchId: "bvoc", semesters: [4], tags: ["medical"] },

   // ==========================================
   // 1. Commerce (B.Com)
   // Source: UGC LOCF & Standard Indian Univs (DU, Mumbai, Calcutta)
   // ==========================================
   // Semester 1
   { id: "bcom_fin_acct", name: "Financial Accounting", branchId: "bcom", level: "ug", semesters: [1] },
   { id: "bcom_law", name: "Business Laws", branchId: "bcom", level: "ug", semesters: [1] },
   { id: "bcom_micro", name: "Micro Economics", branchId: "bcom", level: "ug", semesters: [1] },
   { id: "bcom_env", name: "Environmental Studies", branchId: "bcom", level: "ug", semesters: [1] },

   // Semester 2
   { id: "bcom_corp_acct", name: "Corporate Accounting", branchId: "bcom", level: "ug", semesters: [2] },
   { id: "bcom_corp_law", name: "Corporate Laws", branchId: "bcom", level: "ug", semesters: [2] },
   { id: "bcom_macro", name: "Macro Economics", branchId: "bcom", level: "ug", semesters: [2] },
   { id: "bcom_comm", name: "Business Communication", branchId: "bcom", level: "ug", semesters: [2] },

   // Semester 3
   { id: "bcom_income_tax", name: "Income Tax Law & Practice", branchId: "bcom", level: "ug", semesters: [3] },
   { id: "bcom_hrm", name: "Human Resource Management", branchId: "bcom", level: "ug", semesters: [3] },
   { id: "bcom_mgmt_prin", name: "Principles of Management", branchId: "bcom", level: "ug", semesters: [3] },
   { id: "bcom_comp_app", name: "Computer Applications in Business", branchId: "bcom", level: "ug", semesters: [3] },

   // Semester 4
   { id: "bcom_cost_acct", name: "Cost Accounting", branchId: "bcom", level: "ug", semesters: [4] },
   { id: "bcom_math", name: "Business Mathematics & Statistics", branchId: "bcom", level: "ug", semesters: [4] },
   { id: "bcom_ecomm", name: "E-Commerce", branchId: "bcom", level: "ug", semesters: [4] },
   { id: "bcom_ind_eco", name: "Indian Economy", branchId: "bcom", level: "ug", semesters: [4] },

   // Semester 5
   { id: "bcom_audit", name: "Auditing & Corporate Governance", branchId: "bcom", level: "ug", semesters: [5] },
   { id: "bcom_fin_mgmt", name: "Financial Management", branchId: "bcom", level: "ug", semesters: [5] },
   { id: "bcom_mkt_mgmt", name: "Principles of Marketing", branchId: "bcom", level: "ug", semesters: [5] },
   { id: "bcom_ent", name: "Entrepreneurship Development", branchId: "bcom", level: "ug", semesters: [5] },

   // Semester 6
   { id: "bcom_gst", name: "Goods & Services Tax (GST) & Customs", branchId: "bcom", level: "ug", semesters: [6] },
   { id: "bcom_intl_bus", name: "International Business", branchId: "bcom", level: "ug", semesters: [6] },
   { id: "bcom_bank_ins", name: "Banking & Insurance", branchId: "bcom", level: "ug", semesters: [6] },
   { id: "bcom_project", name: "Project Work / Internship", branchId: "bcom", level: "ug", semesters: [6] },

   // ==========================================
   // 2. Business Administration (BBA)
   // Source: AICTE Model Curriculum
   // ==========================================
   // Semester 1
   { id: "bba_mgmt_fund", name: "Fundamentals of Management", branchId: "bba", level: "ug", semesters: [1] },
   { id: "bba_org_beh", name: "Organizational Behavior", branchId: "bba", level: "ug", semesters: [1] },
   { id: "bba_acct", name: "Financial Accounting & Analysis", branchId: "bba", level: "ug", semesters: [1] },
   { id: "bba_micro", name: "Business Economics (Micro)", branchId: "bba", level: "ug", semesters: [1] },

   // Semester 2
   { id: "bba_mkt_mgmt", name: "Marketing Management", branchId: "bba", level: "ug", semesters: [2] },
   { id: "bba_hrm", name: "Human Resource Management", branchId: "bba", level: "ug", semesters: [2] },
   { id: "bba_env_mgmt", name: "Business Environment", branchId: "bba", level: "ug", semesters: [2] },
   { id: "bba_qt", name: "Quantitative Techniques", branchId: "bba", level: "ug", semesters: [2] },

   // Semester 3
   { id: "bba_fin_mgmt", name: "Financial Management", branchId: "bba", level: "ug", semesters: [3] },
   { id: "bba_cost_mgmt", name: "Management Accounting", branchId: "bba", level: "ug", semesters: [3] },
   { id: "bba_biz_law", name: "Business Laws", branchId: "bba", level: "ug", semesters: [3] },
   { id: "bba_it", name: "IT for Managers", branchId: "bba", level: "ug", semesters: [3] },

   // Semester 4
   { id: "bba_research", name: "Business Research Methods", branchId: "bba", level: "ug", semesters: [4] },
   { id: "bba_ops", name: "Operations Management", branchId: "bba", level: "ug", semesters: [4] },
   { id: "bba_ethics", name: "Business Ethics & CSR", branchId: "bba", level: "ug", semesters: [4] },
   { id: "bba_tax", name: "Taxation Management", branchId: "bba", level: "ug", semesters: [4] },

   // Semester 5
   { id: "bba_legal", name: "Legal Aspects of Business", branchId: "bba", level: "ug", semesters: [5] },
   { id: "bba_summer_proj", name: "Summer Training Report", branchId: "bba", level: "ug", semesters: [5] },
   { id: "bba_ent_dev", name: "Entrepreneurship", branchId: "bba", level: "ug", semesters: [5] },
   { id: "bba_supply_chain", name: "Supply Chain Management", branchId: "bba", level: "ug", semesters: [5] },

   // Semester 6
   { id: "bba_policy", name: "Business Policy & Strategy", branchId: "bba", level: "ug", semesters: [6] },
   { id: "bba_project", name: "Project Dissertation", branchId: "bba", level: "ug", semesters: [6] },
   { id: "bba_intl_mkt", name: "International Marketing", branchId: "bba", level: "ug", semesters: [6] },

   // ==========================================
   // 3. MBA (Master of Business Administration)
   // Source: AICTE Model Curriculum
   // ==========================================
   // Semester 1 (Core)
   { id: "mba_mgmt_con", name: "Management Concepts & OB", branchId: "mba", level: "pg", semesters: [1] },
   { id: "mba_managerial_eco", name: "Managerial Economics", branchId: "mba", level: "pg", semesters: [1] },
   { id: "mba_acct", name: "Accounting for Managers", branchId: "mba", level: "pg", semesters: [1] },
   { id: "mba_biz_stat", name: "Business Statistics & Analytics", branchId: "mba", level: "pg", semesters: [1] },
   { id: "mba_leg_env", name: "Legal & Business Environment", branchId: "mba", level: "pg", semesters: [1] },

   // Semester 2 (Core)
   { id: "mba_fin_mgmt", name: "Financial Management", branchId: "mba", level: "pg", semesters: [2] },
   { id: "mba_mkt_mgmt", name: "Marketing Management", branchId: "mba", level: "pg", semesters: [2] },
   { id: "mba_hrm", name: "Human Resource Management", branchId: "mba", level: "pg", semesters: [2] },
   { id: "mba_ops_mgmt", name: "Operations Management", branchId: "mba", level: "pg", semesters: [2] },
   { id: "mba_research", name: "Research Methodology", branchId: "mba", level: "pg", semesters: [2] },

   // Semester 3 (Electives / Specialization start)
   { id: "mba_strat_mgmt", name: "Strategic Management", branchId: "mba", level: "pg", semesters: [3] },
   { id: "mba_summer_intern", name: "Summer Internship Project", branchId: "mba", level: "pg", semesters: [3] },
   { id: "mba_elec_cons_beh", name: "Consumer Behavior (Mkt)", branchId: "mba", level: "pg", semesters: [3] },
   { id: "mba_elec_security", name: "Security Analysis & Portfolio Mgmt (Fin)", branchId: "mba", level: "pg", semesters: [3] },
   { id: "mba_elec_perf_mgmt", name: "Performance Management (HR)", branchId: "mba", level: "pg", semesters: [3] },

   // Semester 4
   { id: "mba_ent_dev", name: "Entrepreneurship Development", branchId: "mba", level: "pg", semesters: [4] },
   { id: "mba_final_proj", name: "Dissertation / Final Project", branchId: "mba", level: "pg", semesters: [4] },
   { id: "mba_elec_intl_fin", name: "International Financial Management", branchId: "mba", level: "pg", semesters: [4] },
   { id: "mba_elec_digital_mkt", name: "Digital Marketing", branchId: "mba", level: "pg", semesters: [4] },

   // ==========================================
   // 4. Chartered Accountancy (CA)
   // Source: ICAI New Scheme 2023
   // Mapping: Year 1 = Foundation, Year 2 = Inter, Year 3 = Final
   // ==========================================
   // Foundation (Year 1)
   { id: "ca_fnd_acct", name: "Accounting", branchId: "ca", level: "professional", years: [1] },
   { id: "ca_fnd_law", name: "Business Laws", branchId: "ca", level: "professional", years: [1] },
   { id: "ca_fnd_quant", name: "Quantitative Aptitude (Maths, LR, Stats)", branchId: "ca", level: "professional", years: [1] },
   { id: "ca_fnd_eco", name: "Business Economics", branchId: "ca", level: "professional", years: [1] },

   // Intermediate (Year 2)
   { id: "ca_inter_adv_acct", name: "Advanced Accounting", branchId: "ca", level: "professional", years: [2] },
   { id: "ca_inter_law", name: "Corporate & Other Laws", branchId: "ca", level: "professional", years: [2] },
   { id: "ca_inter_tax", name: "Taxation (Direct & GST)", branchId: "ca", level: "professional", years: [2] },
   { id: "ca_inter_cost", name: "Cost and Management Accounting", branchId: "ca", level: "professional", years: [2] },
   { id: "ca_inter_audit", name: "Auditing and Ethics", branchId: "ca", level: "professional", years: [2] },
   { id: "ca_inter_fm_sm", name: "Financial Mgmt & Strategic Mgmt", branchId: "ca", level: "professional", years: [2] },

   // Final (Year 3)
   { id: "ca_final_fr", name: "Financial Reporting", branchId: "ca", level: "professional", years: [3] },
   { id: "ca_final_afm", name: "Advanced Financial Management", branchId: "ca", level: "professional", years: [3] },
   { id: "ca_final_audit", name: "Advanced Auditing, Assurance & Ethics", branchId: "ca", level: "professional", years: [3] },
   { id: "ca_final_dt", name: "Direct Tax Laws & International Taxation", branchId: "ca", level: "professional", years: [3] },
   { id: "ca_final_idt", name: "Indirect Tax Laws (GST)", branchId: "ca", level: "professional", years: [3] },
   { id: "ca_final_ibs", name: "Integrated Business Solutions (Multi-disciplinary)", branchId: "ca", level: "professional", years: [3] },

   // ==========================================
   // 5. Cost & Management Accounting (CMA)
   // Source: ICMAI Syllabus 2022
   // Mapping: Year 1 = Foundation, Year 2 = Inter, Year 3 = Final
   // ==========================================
   // Foundation
   { id: "cma_fnd_law", name: "Fundamentals of Business Laws & Comm.", branchId: "cma", level: "professional", years: [1] },
   { id: "cma_fnd_acct", name: "Fundamentals of Financial & Cost Acct", branchId: "cma", level: "professional", years: [1] },
   { id: "cma_fnd_math", name: "Fundamentals of Business Math & Stats", branchId: "cma", level: "professional", years: [1] },
   { id: "cma_fnd_eco", name: "Fundamentals of Business Economics & Mgmt", branchId: "cma", level: "professional", years: [1] },

   // Intermediate
   { id: "cma_inter_law", name: "Business Laws and Ethics", branchId: "cma", level: "professional", years: [2] },
   { id: "cma_inter_fin_acct", name: "Financial Accounting", branchId: "cma", level: "professional", years: [2] },
   { id: "cma_inter_dt", name: "Direct and Indirect Taxation", branchId: "cma", level: "professional", years: [2] },
   { id: "cma_inter_cost", name: "Cost Accounting", branchId: "cma", level: "professional", years: [2] },
   { id: "cma_inter_ops", name: "Operations Mgmt & Strategic Mgmt", branchId: "cma", level: "professional", years: [2] },
   { id: "cma_inter_corp_acct", name: "Corporate Accounting & Auditing", branchId: "cma", level: "professional", years: [2] },
   { id: "cma_inter_fm", name: "Financial Management & Business Data Analytics", branchId: "cma", level: "professional", years: [2] },
   { id: "cma_inter_mgmt_acct", name: "Management Accounting", branchId: "cma", level: "professional", years: [2] },

   // Final
   { id: "cma_final_law", name: "Corporate & Economic Laws", branchId: "cma", level: "professional", years: [3] },
   { id: "cma_final_sfm", name: "Strategic Financial Management", branchId: "cma", level: "professional", years: [3] },
   { id: "cma_final_scm", name: "Strategic Cost Mgmt & Decision Making", branchId: "cma", level: "professional", years: [3] },
   { id: "cma_final_dt_intl", name: "Direct Tax Laws & Intl. Taxation", branchId: "cma", level: "professional", years: [3] },
   { id: "cma_final_audit", name: "Cost and Management Audit", branchId: "cma", level: "professional", years: [3] },
   { id: "cma_final_spm", name: "Strategic Performance Mgmt & Business Valuation", branchId: "cma", level: "professional", years: [3] },

   // ==========================================
   // 6. Accounting (Specialization/Certificate Subjects)
   // ==========================================
   { id: "acct_fin_report", name: "Advanced Financial Reporting", branchId: "accounting", level: "ug", semesters: [] },
   { id: "acct_forensic", name: "Forensic Accounting & Fraud Detection", branchId: "accounting", level: "ug", semesters: [] },
   { id: "acct_intl_std", name: "IFRS & Ind AS", branchId: "accounting", level: "ug", semesters: [] },
   { id: "acct_tax_plan", name: "Corporate Tax Planning", branchId: "accounting", level: "ug", semesters: [] },
   { id: "acct_payroll", name: "Payroll Accounting", branchId: "accounting", level: "ug", semesters: [] },
   { id: "acct_tally", name: "Computerized Accounting (Tally/SAP)", branchId: "accounting", level: "ug", semesters: [] },

   // ==========================================
   // 7. Finance (Specialization/Certificate Subjects)
   // ==========================================
   { id: "fin_mkts", name: "Financial Markets & Institutions", branchId: "finance", level: "ug", semesters: [] },
   { id: "fin_equity", name: "Equity Research & Analysis", branchId: "finance", level: "ug", semesters: [] },
   { id: "fin_deriv", name: "Derivatives & Risk Management", branchId: "finance", level: "ug", semesters: [] },
   { id: "fin_inv_bank", name: "Investment Banking", branchId: "finance", level: "ug", semesters: [] },
   { id: "fin_model", name: "Financial Modeling", branchId: "finance", level: "ug", semesters: [] },
   { id: "fin_tech", name: "FinTech & Blockchain Finance", branchId: "finance", level: "ug", semesters: [] },

   // ==========================================
   // 8. Marketing (Specialization/Certificate Subjects)
   // ==========================================
   { id: "mkt_digital", name: "Digital Marketing & SEO", branchId: "marketing", level: "ug", semesters: [] },
   { id: "mkt_brand", name: "Brand Management", branchId: "marketing", level: "ug", semesters: [] },
   { id: "mkt_cons_beh", name: "Consumer Behavior", branchId: "marketing", level: "ug", semesters: [] },
   { id: "mkt_retail", name: "Retail Management", branchId: "marketing", level: "ug", semesters: [] },
   { id: "mkt_sales", name: "Sales & Distribution Management", branchId: "marketing", level: "ug", semesters: [] },
   { id: "mkt_analytics", name: "Marketing Analytics", branchId: "marketing", level: "ug", semesters: [] },

   // ==========================================
   // 9. Human Resource Management (Specialization)
   // ==========================================
   { id: "hr_recruitment", name: "Recruitment & Selection", branchId: "human_resource", level: "ug", semesters: [] },
   { id: "hr_perform", name: "Performance Management Systems", branchId: "human_resource", level: "ug", semesters: [] },
   { id: "hr_comp", name: "Compensation & Benefits", branchId: "human_resource", level: "ug", semesters: [] },
   { id: "hr_labor_law", name: "Labor Laws & Industrial Relations", branchId: "human_resource", level: "ug", semesters: [] },
   { id: "hr_analytics", name: "HR Analytics", branchId: "human_resource", level: "ug", semesters: [] },
   { id: "hr_train_dev", name: "Training & Development", branchId: "human_resource", level: "ug", semesters: [] },



   // ================Arts and Humanity ==========================
   // 1. History (B.A. Hons)
   // Source: UGC LOCF History
   // ==========================================
   { id: "hist_india1", name: "History of India-I (Pre-historic to 300 BCE)", branchId: "history", level: "ug", semesters: [1] },
   { id: "hist_social1", name: "Social Formations & Cultural Patterns I", branchId: "history", level: "ug", semesters: [1] },
   { id: "hist_india2", name: "History of India-II (300 BCE to 750 CE)", branchId: "history", level: "ug", semesters: [2] },
   { id: "hist_social2", name: "Social Formations & Cultural Patterns II", branchId: "history", level: "ug", semesters: [2] },
   { id: "hist_india3", name: "History of India-III (c. 750 - 1200)", branchId: "history", level: "ug", semesters: [3] },
   { id: "hist_mod_west1", name: "Rise of the Modern West-I", branchId: "history", level: "ug", semesters: [3] },
   { id: "hist_india4", name: "History of India-IV (c. 1200 - 1500)", branchId: "history", level: "ug", semesters: [4] },
   { id: "hist_mod_west2", name: "Rise of the Modern West-II", branchId: "history", level: "ug", semesters: [4] },
   { id: "hist_india5", name: "History of India-V (c. 1500 - 1600)", branchId: "history", level: "ug", semesters: [5] },
   { id: "hist_india6", name: "History of India-VI (c. 1750 - 1857)", branchId: "history", level: "ug", semesters: [5] },
   { id: "hist_modern_eur", name: "History of Modern Europe-I", branchId: "history", level: "ug", semesters: [5] },
   { id: "hist_india7", name: "History of India-VII (c. 1857 - 1950)", branchId: "history", level: "ug", semesters: [6] },
   { id: "hist_india8", name: "History of India-VIII (Post Independence)", branchId: "history", level: "ug", semesters: [6] },
   { id: "hist_world", name: "Modern World History", branchId: "history", level: "ug", semesters: [6] },

   // ==========================================
   // 2. Political Science
   // Source: UGC LOCF Political Science
   // ==========================================
   { id: "pol_theory1", name: "Understanding Political Theory", branchId: "political_science", level: "ug", semesters: [1] },
   { id: "pol_const_india", name: "Constitutional Government and Democracy in India", branchId: "political_science", level: "ug", semesters: [1] },
   { id: "pol_theory2", name: "Political Theory-Concepts and Debates", branchId: "political_science", level: "ug", semesters: [2] },
   { id: "pol_process_india", name: "Political Process in India", branchId: "political_science", level: "ug", semesters: [2] },
   { id: "pol_comp_govt", name: "Introduction to Comparative Government", branchId: "political_science", level: "ug", semesters: [3] },
   { id: "pol_pub_admin", name: "Perspectives on Public Administration", branchId: "political_science", level: "ug", semesters: [3] },
   { id: "pol_ir_theories", name: "Perspectives on International Relations", branchId: "political_science", level: "ug", semesters: [3] },
   { id: "pol_public_policy", name: "Public Policy and Administration in India", branchId: "political_science", level: "ug", semesters: [4] },
   { id: "pol_global", name: "Global Politics", branchId: "political_science", level: "ug", semesters: [4] },
   { id: "pol_western_phil1", name: "Classical Political Philosophy", branchId: "political_science", level: "ug", semesters: [5] },
   { id: "pol_indian_thought1", name: "Indian Political Thought-I", branchId: "political_science", level: "ug", semesters: [5] },
   { id: "pol_western_phil2", name: "Modern Political Philosophy", branchId: "political_science", level: "ug", semesters: [6] },
   { id: "pol_indian_thought2", name: "Indian Political Thought-II", branchId: "political_science", level: "ug", semesters: [6] },

   // ==========================================
   // 3. Sociology
   // ==========================================
   { id: "soc_intro", name: "Introduction to Sociology-I", branchId: "sociology", level: "ug", semesters: [1] },
   { id: "soc_india1", name: "Sociology of India-I", branchId: "sociology", level: "ug", semesters: [1] },
   { id: "soc_intro2", name: "Introduction to Sociology-II", branchId: "sociology", level: "ug", semesters: [2] },
   { id: "soc_india2", name: "Sociology of India-II", branchId: "sociology", level: "ug", semesters: [2] },
   { id: "soc_pol", name: "Political Sociology", branchId: "sociology", level: "ug", semesters: [3] },
   { id: "soc_religion", name: "Sociology of Religion", branchId: "sociology", level: "ug", semesters: [3] },
   { id: "soc_gender", name: "Sociology of Gender", branchId: "sociology", level: "ug", semesters: [4] },
   { id: "soc_thinkers1", name: "Sociological Thinkers-I (Marx, Durkheim, Weber)", branchId: "sociology", level: "ug", semesters: [4] },
   { id: "soc_thinkers2", name: "Sociological Thinkers-II", branchId: "sociology", level: "ug", semesters: [5] },
   { id: "soc_research", name: "Sociological Research Methods", branchId: "sociology", level: "ug", semesters: [5] },
   { id: "soc_stratification", name: "Social Stratification", branchId: "sociology", level: "ug", semesters: [6] },
   { id: "soc_population", name: "Population and Society", branchId: "sociology", level: "ug", semesters: [6] },

   // ==========================================
   // 4. Psychology
   // ==========================================
   { id: "psy_intro", name: "Introduction to Psychology", branchId: "psychology", level: "ug", semesters: [1] },
   { id: "psy_stat", name: "Statistical Methods for Psychological Research-I", branchId: "psychology", level: "ug", semesters: [1] },
   { id: "psy_biopsych", name: "Biopsychology", branchId: "psychology", level: "ug", semesters: [2] },
   { id: "psy_cog", name: "Cognitive Psychology", branchId: "psychology", level: "ug", semesters: [2] },
   { id: "psy_research", name: "Research Methodology", branchId: "psychology", level: "ug", semesters: [3] },
   { id: "psy_social", name: "Social Psychology", branchId: "psychology", level: "ug", semesters: [3] },
   { id: "psy_dev", name: "Developmental Psychology", branchId: "psychology", level: "ug", semesters: [4] },
   { id: "psy_measure", name: "Psychological Measurement", branchId: "psychology", level: "ug", semesters: [4] },
   { id: "psy_org", name: "Organizational Behavior", branchId: "psychology", level: "ug", semesters: [5] },
   { id: "psy_abnormal1", name: "Understanding Psychological Disorders-I", branchId: "psychology", level: "ug", semesters: [5] },
   { id: "psy_counsel", name: "Counseling Psychology", branchId: "psychology", level: "ug", semesters: [6] },
   { id: "psy_abnormal2", name: "Understanding Psychological Disorders-II", branchId: "psychology", level: "ug", semesters: [6] },

   // ==========================================
   // 5. Philosophy
   // ==========================================
   { id: "phil_indian1", name: "Indian Philosophy-I", branchId: "philosophy", level: "ug", semesters: [1] },
   { id: "phil_logic", name: "Logic", branchId: "philosophy", level: "ug", semesters: [1] },
   { id: "phil_greek", name: "Greek Philosophy", branchId: "philosophy", level: "ug", semesters: [2] },
   { id: "phil_ethics", name: "Ethics", branchId: "philosophy", level: "ug", semesters: [2] },
   { id: "phil_western", name: "Western Philosophy (Descartes to Kant)", branchId: "philosophy", level: "ug", semesters: [3] },
   { id: "phil_social", name: "Social & Political Philosophy", branchId: "philosophy", level: "ug", semesters: [3] },
   { id: "phil_indian2", name: "Indian Philosophy-II", branchId: "philosophy", level: "ug", semesters: [4] },
   { id: "phil_religion", name: "Philosophy of Religion", branchId: "philosophy", level: "ug", semesters: [5] },
   { id: "phil_language", name: "Philosophy of Language", branchId: "philosophy", level: "ug", semesters: [6] },
   { id: "phil_mind", name: "Philosophy of Mind", branchId: "philosophy", level: "ug", semesters: [6] },

   // ==========================================
   // 6. Economics (B.A. Hons Economics)
   // ==========================================
   { id: "eco_micro1", name: "Introductory Microeconomics", branchId: "economics_arts", level: "ug", semesters: [1] },
   { id: "eco_math1", name: "Mathematical Methods for Economics-I", branchId: "economics_arts", level: "ug", semesters: [1] },
   { id: "eco_macro1", name: "Introductory Macroeconomics", branchId: "economics_arts", level: "ug", semesters: [2] },
   { id: "eco_math2", name: "Mathematical Methods for Economics-II", branchId: "economics_arts", level: "ug", semesters: [2] },
   { id: "eco_micro2", name: "Intermediate Microeconomics-I", branchId: "economics_arts", level: "ug", semesters: [3] },
   { id: "eco_macro2", name: "Intermediate Macroeconomics-I", branchId: "economics_arts", level: "ug", semesters: [3] },
   { id: "eco_stats", name: "Statistical Methods for Economics", branchId: "economics_arts", level: "ug", semesters: [3] },
   { id: "eco_econometrics", name: "Introductory Econometrics", branchId: "economics_arts", level: "ug", semesters: [4] },
   { id: "eco_indian1", name: "Indian Economy-I", branchId: "economics_arts", level: "ug", semesters: [5] },
   { id: "eco_dev1", name: "Development Economics-I", branchId: "economics_arts", level: "ug", semesters: [5] },
   { id: "eco_indian2", name: "Indian Economy-II", branchId: "economics_arts", level: "ug", semesters: [6] },
   { id: "eco_money", name: "Money and Financial Markets", branchId: "economics_arts", level: "ug", semesters: [6] },

   // ==========================================
   // 7. Journalism (B.A. Hons Journalism/Mass Comm)
   // ==========================================
   { id: "jour_intro", name: "Introduction to Journalism", branchId: "journalism", level: "ug", semesters: [1] },
   { id: "jour_hist", name: "Introduction to Media and Communication", branchId: "journalism", level: "ug", semesters: [1] },
   { id: "jour_report", name: "Reporting and Editing for Print", branchId: "journalism", level: "ug", semesters: [2] },
   { id: "jour_laws", name: "Media Laws and Ethics", branchId: "journalism", level: "ug", semesters: [2] },
   { id: "jour_broadcast", name: "Broadcast Media (Radio & TV)", branchId: "journalism", level: "ug", semesters: [3] },
   { id: "jour_new_media", name: "New Media & Cyber Journalism", branchId: "journalism", level: "ug", semesters: [3] },
   { id: "jour_ad_pr", name: "Advertising and Public Relations", branchId: "journalism", level: "ug", semesters: [4] },
   { id: "jour_dev_comm", name: "Development Communication", branchId: "journalism", level: "ug", semesters: [4] },
   { id: "jour_global", name: "Global Media and Politics", branchId: "journalism", level: "ug", semesters: [5] },
   { id: "jour_doc", name: "Documentary Production", branchId: "journalism", level: "ug", semesters: [6] },

   // ==========================================
   // 8. English Literature
   // ==========================================
   { id: "eng_indian", name: "Indian Classical Literature", branchId: "english_literature", level: "ug", semesters: [1] },
   { id: "eng_euro", name: "European Classical Literature", branchId: "english_literature", level: "ug", semesters: [1] },
   { id: "eng_indian_writing", name: "Indian Writing in English", branchId: "english_literature", level: "ug", semesters: [2] },
   { id: "eng_brit_drama1", name: "British Poetry and Drama: 14th-17th Centuries", branchId: "english_literature", level: "ug", semesters: [2] },
   { id: "eng_amer", name: "American Literature", branchId: "english_literature", level: "ug", semesters: [3] },
   { id: "eng_pop", name: "Popular Literature", branchId: "english_literature", level: "ug", semesters: [3] },
   { id: "eng_brit_rom", name: "British Literature: The Early 20th Century", branchId: "english_literature", level: "ug", semesters: [4] },
   { id: "eng_women", name: "Women’s Writing", branchId: "english_literature", level: "ug", semesters: [5] },
   { id: "eng_postcol", name: "Postcolonial Literatures", branchId: "english_literature", level: "ug", semesters: [6] },
   { id: "eng_literary_crit", name: "Literary Criticism & Theory", branchId: "english_literature", level: "ug", semesters: [6] },


   // ==========================================
   // 1. Geography (B.A./B.Sc Hons)
   // Source: UGC LOCF Geography
   // ==========================================
   // Semester 1
   { id: "geo_geomorph", name: "Geomorphology", branchId: "geography", level: "ug", semesters: [1] },
   { id: "geo_carto1", name: "Cartographic Techniques (Practical)", branchId: "geography", level: "ug", semesters: [1] },

   // Semester 2
   { id: "geo_human", name: "Human Geography", branchId: "geography", level: "ug", semesters: [2] },
   { id: "geo_carto2", name: "Thematic Cartography (Practical)", branchId: "geography", level: "ug", semesters: [2] },

   // Semester 3
   { id: "geo_clima", name: "Climatology", branchId: "geography", level: "ug", semesters: [3] },
   { id: "geo_stats", name: "Statistical Methods in Geography", branchId: "geography", level: "ug", semesters: [3] },
   { id: "geo_sec_remote", name: "Remote Sensing (Skill)", branchId: "geography", level: "ug", semesters: [3] },

   // Semester 4
   { id: "geo_ocean", name: "Oceanography", branchId: "geography", level: "ug", semesters: [4] },
   { id: "geo_economic", name: "Economic Geography", branchId: "geography", level: "ug", semesters: [4] },
   { id: "geo_sec_gis", name: "Geographical Information System (GIS)", branchId: "geography", level: "ug", semesters: [4] },

   // Semester 5
   { id: "geo_regional", name: "Regional Planning & Development", branchId: "geography", level: "ug", semesters: [5] },
   { id: "geo_india", name: "Geography of India", branchId: "geography", level: "ug", semesters: [5] },
   { id: "geo_dse_population", name: "Population Geography", branchId: "geography", level: "ug", semesters: [5] },

   // Semester 6
   { id: "geo_evolution", name: "Evolution of Geographical Thought", branchId: "geography", level: "ug", semesters: [6] },
   { id: "geo_disaster", name: "Disaster Management", branchId: "geography", level: "ug", semesters: [6] },
   { id: "geo_dse_hydrology", name: "Hydrology and Soil Geography", branchId: "geography", level: "ug", semesters: [6] },
   { id: "geo_project", name: "Field Work / Research Project", branchId: "geography", level: "ug", semesters: [6] },

   // ==========================================
   // 2. Hindi Literature (B.A. Hons)
   // Source: UGC LOCF Hindi
   // ==========================================
   // Semester 1
   { id: "hin_sahitya_itihas", name: "Hindi Sahitya ka Itihas (Aadikal-Ritikal)", branchId: "hindi_literature", level: "ug", semesters: [1] },
   { id: "hin_kavita1", name: "Aadikalin Evam Madhyakalin Hindi Kavita", branchId: "hindi_literature", level: "ug", semesters: [1] },

   // Semester 2
   { id: "hin_sahitya_adhunik", name: "Hindi Sahitya ka Itihas (Adhunik Kal)", branchId: "hindi_literature", level: "ug", semesters: [2] },
   { id: "hin_kavita2", name: "Adhunik Hindi Kavita (Chhayavad Tak)", branchId: "hindi_literature", level: "ug", semesters: [2] },

   // Semester 3
   { id: "hin_kavita3", name: "Chhayavadottar Hindi Kavita", branchId: "hindi_literature", level: "ug", semesters: [3] },
   { id: "hin_bhasha", name: "Hindi Bhasha aur Lipi ka Itihas", branchId: "hindi_literature", level: "ug", semesters: [3] },
   { id: "hin_sec_translation", name: "Anuvad Sidhant aur Prayog (Translation)", branchId: "hindi_literature", level: "ug", semesters: [3] },

   // Semester 4
   { id: "hin_upanyas", name: "Hindi Upanyas (Novels)", branchId: "hindi_literature", level: "ug", semesters: [4] },
   { id: "hin_kahani", name: "Hindi Kahani (Stories)", branchId: "hindi_literature", level: "ug", semesters: [4] },
   { id: "hin_sec_media", name: "Jansanchar Madhyam (Mass Media)", branchId: "hindi_literature", level: "ug", semesters: [4] },

   // Semester 5
   { id: "hin_natak", name: "Hindi Natak Evam Ekanki", branchId: "hindi_literature", level: "ug", semesters: [5] },
   { id: "hin_nibandh", name: "Hindi Nibandh Evam Anya Gadya Vidhayen", branchId: "hindi_literature", level: "ug", semesters: [5] },
   { id: "hin_dse_lok", name: "Lok Sahitya (Folk Literature)", branchId: "hindi_literature", level: "ug", semesters: [5] },

   // Semester 6
   { id: "hin_alochana", name: "Hindi Alochana (Criticism)", branchId: "hindi_literature", level: "ug", semesters: [6] },
   { id: "hin_patrakarita", name: "Hindi Patrakarita (Journalism)", branchId: "hindi_literature", level: "ug", semesters: [6] },
   { id: "hin_dse_cinema", name: "Hindi Cinema aur Sahitya", branchId: "hindi_literature", level: "ug", semesters: [6] },

   // ==========================================
   // 3. Public Administration (B.A. Hons)
   // Source: UGC LOCF
   // ==========================================
   // Semester 1
   { id: "pub_intro", name: "Introduction to Public Administration", branchId: "public_admin", level: "ug", semesters: [1] },
   { id: "pub_india_admin", name: "Administrative System in India", branchId: "public_admin", level: "ug", semesters: [1] },

   // Semester 2
   { id: "pub_theory", name: "Administrative Theory", branchId: "public_admin", level: "ug", semesters: [2] },
   { id: "pub_personnel", name: "Personnel Administration", branchId: "public_admin", level: "ug", semesters: [2] },

   // Semester 3
   { id: "pub_public_policy", name: "Public Policy: Formulation & Implementation", branchId: "public_admin", level: "ug", semesters: [3] },
   { id: "pub_fin_admin", name: "Financial Administration", branchId: "public_admin", level: "ug", semesters: [3] },
   { id: "pub_sec_e_gov", name: "E-Governance (Skill)", branchId: "public_admin", level: "ug", semesters: [3] },

   // Semester 4
   { id: "pub_local_urban", name: "Urban Local Governance", branchId: "public_admin", level: "ug", semesters: [4] },
   { id: "pub_local_rural", name: "Rural Local Governance", branchId: "public_admin", level: "ug", semesters: [4] },
   { id: "pub_sec_office", name: "Office Management", branchId: "public_admin", level: "ug", semesters: [4] },

   // Semester 5
   { id: "pub_comp_admin", name: "Comparative Public Administration", branchId: "public_admin", level: "ug", semesters: [5] },
   { id: "pub_dev_admin", name: "Development Administration", branchId: "public_admin", level: "ug", semesters: [5] },
   { id: "pub_dse_disaster", name: "Disaster Management", branchId: "public_admin", level: "ug", semesters: [5] },

   // Semester 6
   { id: "pub_governance", name: "Issues in Indian Administration", branchId: "public_admin", level: "ug", semesters: [6] },
   { id: "pub_social_welfare", name: "Social Welfare Administration", branchId: "public_admin", level: "ug", semesters: [6] },
   { id: "pub_dse_ethics", name: "Ethics in Public Service", branchId: "public_admin", level: "ug", semesters: [6] },

   // ==========================================
   // 4. Education (B.A. Education - Academic Degree)
   // Note: This is B.A. Education, NOT B.Ed (Teacher Training)
   // ==========================================
   // Semester 1
   { id: "edu_basic", name: "Basics of Education", branchId: "education", level: "ug", semesters: [1] },
   { id: "edu_india_hist", name: "History of Indian Education (Ancient to Colonial)", branchId: "education", level: "ug", semesters: [1] },

   // Semester 2
   { id: "edu_phil", name: "Philosophical Foundations of Education", branchId: "education", level: "ug", semesters: [2] },
   { id: "edu_soc", name: "Sociological Foundations of Education", branchId: "education", level: "ug", semesters: [2] },

   // Semester 3
   { id: "edu_psych", name: "Psychological Foundations of Education", branchId: "education", level: "ug", semesters: [3] },
   { id: "edu_dev", name: "Development of Education in Independent India", branchId: "education", level: "ug", semesters: [3] },

   // Semester 4
   { id: "edu_tech", name: "Educational Technology", branchId: "education", level: "ug", semesters: [4] },
   { id: "edu_eval", name: "Measurement and Evaluation in Education", branchId: "education", level: "ug", semesters: [4] },

   // Semester 5
   { id: "edu_guidance", name: "Guidance and Counselling", branchId: "education", level: "ug", semesters: [5] },
   { id: "edu_mgmt", name: "Educational Management & Administration", branchId: "education", level: "ug", semesters: [5] },
   { id: "edu_dse_special", name: "Special Education", branchId: "education", level: "ug", semesters: [5] },

   // Semester 6
   { id: "edu_curr", name: "Curriculum Development", branchId: "education", level: "ug", semesters: [6] },
   { id: "edu_stats", name: "Statistics in Education", branchId: "education", level: "ug", semesters: [6] },
   { id: "edu_dse_adult", name: "Adult & Continuing Education", branchId: "education", level: "ug", semesters: [6] },

   // ==========================================
   // 5. Social Work (BSW - Bachelor of Social Work)
   // Source: UGC Model Curriculum for Social Work
   // ==========================================
   // Semester 1
   { id: "bsw_intro", name: "Introduction to Social Work", branchId: "social_work", level: "ug", semesters: [1] },
   { id: "bsw_human_growth", name: "Understanding Human Growth & Development", branchId: "social_work", level: "ug", semesters: [1] },
   { id: "bsw_field_1", name: "Social Work Practicum / Field Work I", branchId: "social_work", level: "ug", semesters: [1] },

   // Semester 2
   { id: "bsw_society", name: "Social Science Concepts for Social Workers", branchId: "social_work", level: "ug", semesters: [2] },
   { id: "bsw_contemp", name: "Contemporary Social Concerns", branchId: "social_work", level: "ug", semesters: [2] },
   { id: "bsw_field_2", name: "Social Work Practicum / Field Work II", branchId: "social_work", level: "ug", semesters: [2] },

   // Semester 3
   { id: "bsw_case_work", name: "Social Case Work (Working with Individuals)", branchId: "social_work", level: "ug", semesters: [3] },
   { id: "bsw_group_work", name: "Social Group Work (Working with Groups)", branchId: "social_work", level: "ug", semesters: [3] },
   { id: "bsw_field_3", name: "Social Work Practicum / Field Work III", branchId: "social_work", level: "ug", semesters: [3] },

   // Semester 4
   { id: "bsw_comm_org", name: "Community Organization", branchId: "social_work", level: "ug", semesters: [4] },
   { id: "bsw_action", name: "Social Action & Movements", branchId: "social_work", level: "ug", semesters: [4] },
   { id: "bsw_field_4", name: "Social Work Practicum / Field Work IV", branchId: "social_work", level: "ug", semesters: [4] },

   // Semester 5
   { id: "bsw_policy", name: "Social Policy & Planning", branchId: "social_work", level: "ug", semesters: [5] },
   { id: "bsw_welfare_admin", name: "Social Welfare Administration", branchId: "social_work", level: "ug", semesters: [5] },
   { id: "bsw_dse_health", name: "Health Care Social Work", branchId: "social_work", level: "ug", semesters: [5] },
   { id: "bsw_field_5", name: "Social Work Practicum / Field Work V", branchId: "social_work", level: "ug", semesters: [5] },

   // Semester 6
   { id: "bsw_research", name: "Social Work Research & Statistics", branchId: "social_work", level: "ug", semesters: [6] },
   { id: "bsw_legal", name: "Legal Information for Social Workers", branchId: "social_work", level: "ug", semesters: [6] },
   { id: "bsw_dse_ngo", name: "NGO Management", branchId: "social_work", level: "ug", semesters: [6] },
   { id: "bsw_field_6", name: "Block Field Placement / Final Project", branchId: "social_work", level: "ug", semesters: [6] },

   // === LAW ===
   { id: "law_subject", name: "Law (LLB Topics)", branchId: "law", level: "ug", semesters: [] },

   // === EDUCATION ===
   { id: "pedagogy", name: "Foundations of Education & Pedagogy (B.Ed)", branchId: "education", level: "ug", semesters: [] },

   // === SCIENCE (B.Sc) ===
   { id: "calculus", name: "Calculus", branchId: "mathematics", level: "ug", semesters: [] },
   { id: "linear_algebra", name: "Linear Algebra", branchId: "mathematics", level: "ug", semesters: [] },
   { id: "organic_chem", name: "Organic Chemistry", branchId: "chemistry", level: "ug", semesters: [] },
   { id: "physics_mech", name: "Classical Mechanics & Physics", branchId: "physics", level: "ug", semesters: [] },
   { id: "bio_fund", name: "Cell Biology & Genetics", branchId: "biology", level: "ug", semesters: [] },
   { id: "biotech_intro", name: "Introduction to Biotechnology", branchId: "biotech", level: "ug", semesters: [] },


   // ==========================================
   // 1. MBBS (Bachelor of Medicine & Surgery)
   // Source: NMC (CBME Guidelines)
   // ==========================================
   // Phase 1
   { id: "mbbs_anatomy", name: "Human Anatomy", branchId: "mbbs", level: "ug", phase: 1, semesters: [] },
   { id: "mbbs_physiology", name: "Human Physiology", branchId: "mbbs", level: "ug", phase: 1, semesters: [] },
   { id: "mbbs_biochem", name: "Biochemistry", branchId: "mbbs", level: "ug", phase: 1, semesters: [] },
   { id: "mbbs_aetcom1", name: "AETCOM Module 1", branchId: "mbbs", level: "ug", phase: 1, semesters: [] },

   // Phase 2
   { id: "mbbs_pathology", name: "Pathology", branchId: "mbbs", level: "ug", phase: 2, semesters: [] },
   { id: "mbbs_microbiology", name: "Microbiology", branchId: "mbbs", level: "ug", phase: 2, semesters: [] },
   { id: "mbbs_pharmacology", name: "Pharmacology", branchId: "mbbs", level: "ug", phase: 2, semesters: [] },
   { id: "mbbs_fmt", name: "Forensic Medicine & Toxicology", branchId: "mbbs", level: "ug", phase: 2, semesters: [] },
   { id: "mbbs_aetcom2", name: "AETCOM Module 2", branchId: "mbbs", level: "ug", phase: 2, semesters: [] },

   // Phase 3 (Part 1)
   { id: "mbbs_community_med", name: "Community Medicine (PSM)", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_ent", name: "Otorhinolaryngology (ENT)", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_ophthalmology", name: "Ophthalmology", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_fmt_clin", name: "Forensic Medicine (Clinical)", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },

   // Phase 3 (Part 2 - Final Year)
   { id: "mbbs_gen_medicine", name: "General Medicine", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_gen_surgery", name: "General Surgery", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_obg", name: "Obstetrics & Gynecology", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_pediatrics", name: "Pediatrics", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_orthopedics", name: "Orthopedics", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_dermatology", name: "Dermatology, Venereology & Leprosy", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_psychiatry", name: "Psychiatry", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_radiology", name: "Radiodiagnosis", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },
   { id: "mbbs_anesthesiology", name: "Anesthesiology", branchId: "mbbs", level: "ug", phase: 3, semesters: [] },

   // Phase 4 (Internship)
   { id: "mbbs_internship", name: "Rotatory Internship (Compulsory)", branchId: "mbbs", level: "ug", phase: 4, semesters: [], tags: ["mbbs", "internship", "rotation"] },

   // ==========================================
   // 2. BDS (Dental Surgery)
   // Source: Dental Council of India
   // ==========================================
   // Year 1
   { id: "bds_gen_anatomy", name: "General Human Anatomy", branchId: "bds", level: "ug", years: [1], semesters: [] },
   { id: "bds_gen_physio", name: "General Physiology & Biochemistry", branchId: "bds", level: "ug", years: [1], semesters: [] },
   { id: "bds_oral_anat", name: "Dental Anatomy & Oral Histology", branchId: "bds", level: "ug", years: [1], semesters: [] },

   // Year 2
   { id: "bds_gen_path_micro", name: "General Pathology & Microbiology", branchId: "bds", level: "ug", years: [2], semesters: [] },
   { id: "bds_gen_pharm", name: "General & Dental Pharmacology", branchId: "bds", level: "ug", years: [2], semesters: [] },
   { id: "bds_dental_mat", name: "Dental Materials", branchId: "bds", level: "ug", years: [2], semesters: [] },
   { id: "bds_pre_cons", name: "Pre-Clinical Conservative Dentistry", branchId: "bds", level: "ug", years: [2], semesters: [] },
   { id: "bds_pre_prosth", name: "Pre-Clinical Prosthodontics", branchId: "bds", level: "ug", years: [2], semesters: [] },

   // Year 3
   { id: "bds_gen_med", name: "General Medicine", branchId: "bds", level: "ug", years: [3], semesters: [] },
   { id: "bds_gen_surg", name: "General Surgery", branchId: "bds", level: "ug", years: [3], semesters: [] },
   { id: "bds_oral_path", name: "Oral Pathology & Microbiology", branchId: "bds", level: "ug", years: [3], semesters: [] },

   // Year 4
   { id: "bds_oral_med", name: "Oral Medicine & Radiology", branchId: "bds", level: "ug", years: [4], semesters: [] },
   { id: "bds_pedo", name: "Pediatric & Preventive Dentistry", branchId: "bds", level: "ug", years: [4], semesters: [] },
   { id: "bds_ortho", name: "Orthodontics & Dentofacial Orthopedics", branchId: "bds", level: "ug", years: [4], semesters: [] },
   { id: "bds_perio", name: "Periodontology", branchId: "bds", level: "ug", years: [4], semesters: [] },
   { id: "bds_prosth", name: "Prosthodontics & Crown Bridge", branchId: "bds", level: "ug", years: [4], semesters: [] },
   { id: "bds_cons", name: "Conservative Dentistry & Endodontics", branchId: "bds", level: "ug", years: [4], semesters: [] },
   { id: "bds_oral_surg", name: "Oral & Maxillofacial Surgery", branchId: "bds", level: "ug", years: [4], semesters: [] },
   { id: "bds_public_health", name: "Public Health Dentistry", branchId: "bds", level: "ug", years: [4], semesters: [] },

   // Year 5 (Rotatory Internship)
   { id: "bds_internship", name: "Rotatory Internship (Clinical Dentistry)", branchId: "bds", level: "ug", years: [5], semesters: [], tags: ["bds", "internship", "clinical"] },

   // ==========================================
   // 3. BAMS (Ayurveda)
   // Source: NCISM (MSE 2022)
   // ==========================================
   // First Prof
   { id: "bams_padartha", name: "Padartha Vigyan (Fundamental Principles)", branchId: "bams", level: "ug", years: [1], semesters: [] },
   { id: "bams_sanskrit", name: "Sanskrit", branchId: "bams", level: "ug", years: [1], semesters: [] },
   { id: "bams_kriya", name: "Kriya Sharir (Physiology)", branchId: "bams", level: "ug", years: [1], semesters: [] },
   { id: "bams_rachana", name: "Rachana Sharir (Anatomy)", branchId: "bams", level: "ug", years: [1], semesters: [] },
   { id: "bams_samhita1", name: "Samhita Adhyayan 1", branchId: "bams", level: "ug", years: [1], semesters: [] },

   // Second Prof
   { id: "bams_dravyaguna", name: "Dravyaguna Vigyan (Pharmacology)", branchId: "bams", level: "ug", years: [2], semesters: [] },
   { id: "bams_rasa", name: "Rasa Shastra & Bhaishajya Kalpana", branchId: "bams", level: "ug", years: [2], semesters: [] },
   { id: "bams_roga", name: "Roga Nidan & Vikriti Vigyan", branchId: "bams", level: "ug", years: [2], semesters: [] },
   { id: "bams_samhita2", name: "Samhita Adhyayan 2", branchId: "bams", level: "ug", years: [2], semesters: [] },

   // Third Prof
   { id: "bams_agada", name: "Agada Tantra (Toxicology)", branchId: "bams", level: "ug", years: [3], semesters: [] },
   { id: "bams_swastha", name: "Swasthavritta (PSM & Yoga)", branchId: "bams", level: "ug", years: [3], semesters: [] },
   { id: "bams_prasuti", name: "Prasuti Tantra & Stri Roga (OBG)", branchId: "bams", level: "ug", years: [3], semesters: [] },
   { id: "bams_kaumar", name: "Kaumarbhritya (Pediatrics)", branchId: "bams", level: "ug", years: [3], semesters: [] },

   // Final Prof
   { id: "bams_kaya", name: "Kayachikitsa (General Medicine)", branchId: "bams", level: "ug", years: [4], semesters: [] },
   { id: "bams_pancha", name: "Panchakarma", branchId: "bams", level: "ug", years: [4], semesters: [] },
   { id: "bams_shalya", name: "Shalya Tantra (Surgery)", branchId: "bams", level: "ug", years: [4], semesters: [] },
   { id: "bams_shalakya", name: "Shalakya Tantra (ENT & Eye)", branchId: "bams", level: "ug", years: [4], semesters: [] },
   { id: "bams_research", name: "Research Methodology & Statistics", branchId: "bams", level: "ug", years: [4], semesters: [] },

   // ==========================================
   // 4. BHMS (Homoeopathy)
   // Source: NCH (National Commission for Homoeopathy)
   // ==========================================
   // First Prof
   { id: "bhms_pharmacy", name: "Homoeopathic Pharmacy", branchId: "bhms", level: "ug", years: [1], semesters: [] },
   { id: "bhms_anat", name: "Anatomy", branchId: "bhms", level: "ug", years: [1], semesters: [] },
   { id: "bhms_physio", name: "Physiology", branchId: "bhms", level: "ug", years: [1], semesters: [] },
   { id: "bhms_organon1", name: "Organon of Medicine", branchId: "bhms", level: "ug", years: [1], semesters: [] },
   { id: "bhms_mm1", name: "Homoeopathic Materia Medica", branchId: "bhms", level: "ug", years: [1], semesters: [] },

   // Second Prof
   { id: "bhms_path", name: "Pathology & Microbiology", branchId: "bhms", level: "ug", years: [2], semesters: [] },
   { id: "bhms_fmt", name: "Forensic Medicine & Toxicology", branchId: "bhms", level: "ug", years: [2], semesters: [] },
   { id: "bhms_organon2", name: "Organon of Medicine (2)", branchId: "bhms", level: "ug", years: [2], semesters: [] },
   { id: "bhms_mm2", name: "Materia Medica (2)", branchId: "bhms", level: "ug", years: [2], semesters: [] },

   // Third Prof
   { id: "bhms_surgery", name: "Surgery", branchId: "bhms", level: "ug", years: [3], semesters: [] },
   { id: "bhms_obg", name: "Obstetrics & Gynecology", branchId: "bhms", level: "ug", years: [3], semesters: [] },
   { id: "bhms_organon3", name: "Organon of Medicine (3)", branchId: "bhms", level: "ug", years: [3], semesters: [] },
   { id: "bhms_mm3", name: "Materia Medica (3)", branchId: "bhms", level: "ug", years: [3], semesters: [] },

   // Final Prof
   { id: "bhms_med", name: "Practice of Medicine", branchId: "bhms", level: "ug", years: [4], semesters: [] },
   { id: "bhms_comm", name: "Community Medicine", branchId: "bhms", level: "ug", years: [4], semesters: [] },
   { id: "bhms_repertory", name: "Repertory", branchId: "bhms", level: "ug", years: [4], semesters: [] },
   { id: "bhms_organon4", name: "Organon of Medicine (Final)", branchId: "bhms", level: "ug", years: [4], semesters: [] },
   { id: "bhms_mm4", name: "Materia Medica (Final)", branchId: "bhms", level: "ug", years: [4], semesters: [] },

   // ==========================================
   // 5. B.Sc Nursing
   // Source: Indian Nursing Council (INC 2021)
   // ==========================================
   // Year 1
   { id: "nurs_anat_phys", name: "Applied Anatomy & Physiology", branchId: "nursing", level: "ug", years: [1], semesters: [] },
   { id: "nurs_nutri_biochem", name: "Applied Nutrition & Biochemistry", branchId: "nursing", level: "ug", years: [1], semesters: [] },
   { id: "nurs_foundations", name: "Nursing Foundations", branchId: "nursing", level: "ug", years: [1], semesters: [] },
   { id: "nurs_psych_soc", name: "Applied Psychology & Sociology", branchId: "nursing", level: "ug", years: [1], semesters: [] },
   { id: "nurs_micro", name: "Applied Microbiology & Infection Control", branchId: "nursing", level: "ug", years: [1], semesters: [] },

   // Year 2
   { id: "nurs_pharm", name: "Pharmacology", branchId: "nursing", level: "ug", years: [2], semesters: [] },
   { id: "nurs_path_gen", name: "Pathology & Genetics", branchId: "nursing", level: "ug", years: [2], semesters: [] },
   { id: "nurs_medsurg1", name: "Adult Health Nursing (Med-Surg) I", branchId: "nursing", level: "ug", years: [2], semesters: [] },
   { id: "nurs_comm1", name: "Community Health Nursing I", branchId: "nursing", level: "ug", years: [2], semesters: [] },

   // Year 3
   { id: "nurs_child", name: "Child Health Nursing (Pediatrics)", branchId: "nursing", level: "ug", years: [3], semesters: [] },
   { id: "nurs_mental", name: "Mental Health Nursing (Psychiatry)", branchId: "nursing", level: "ug", years: [3], semesters: [] },
   { id: "nurs_medsurg2", name: "Adult Health Nursing (Med-Surg) II", branchId: "nursing", level: "ug", years: [3], semesters: [] },

   // Year 4
   { id: "nurs_midwifery", name: "Midwifery & Obstetrical Nursing", branchId: "nursing", level: "ug", years: [4], semesters: [] },
   { id: "nurs_comm2", name: "Community Health Nursing II", branchId: "nursing", level: "ug", years: [4], semesters: [] },
   { id: "nurs_mgmt", name: "Nursing Management & Education", branchId: "nursing", level: "ug", years: [4], semesters: [] },
   { id: "nurs_research", name: "Nursing Research & Statistics", branchId: "nursing", level: "ug", years: [4], semesters: [] },

   // ==========================================
   // 6. Pharmacy (B.Pharm)
   // Source: PCI Regulations
   // ==========================================
   // Semester 1
   { id: "bp_hap1", name: "Human Anatomy & Physiology I", branchId: "pharmacy", level: "ug", semesters: [1], years: [] },
   { id: "bp_analysis1", name: "Pharmaceutical Analysis I", branchId: "pharmacy", level: "ug", semesters: [1], years: [] },
   { id: "bp_ceutics1", name: "Pharmaceutics I", branchId: "pharmacy", level: "ug", semesters: [1], years: [] },
   { id: "bp_inorg", name: "Pharm Inorganic Chemistry", branchId: "pharmacy", level: "ug", semesters: [1], years: [] },

   // Semester 2
   { id: "bp_hap2", name: "Human Anatomy & Physiology II", branchId: "pharmacy", level: "ug", semesters: [2], years: [] },
   { id: "bp_org1", name: "Pharm Organic Chemistry I", branchId: "pharmacy", level: "ug", semesters: [2], years: [] },
   { id: "bp_biochem", name: "Biochemistry", branchId: "pharmacy", level: "ug", semesters: [2], years: [] },
   { id: "bp_patho", name: "Pathophysiology", branchId: "pharmacy", level: "ug", semesters: [2], years: [] },

   // Semester 3
   { id: "bp_org2", name: "Pharm Organic Chemistry II", branchId: "pharmacy", level: "ug", semesters: [3], years: [] },
   { id: "bp_phy_pharm1", name: "Physical Pharmaceutics I", branchId: "pharmacy", level: "ug", semesters: [3], years: [] },
   { id: "bp_micro", name: "Pharmaceutical Microbiology", branchId: "pharmacy", level: "ug", semesters: [3], years: [] },
   { id: "bp_eng", name: "Pharmaceutical Engineering", branchId: "pharmacy", level: "ug", semesters: [3], years: [] },

   // Semester 4
   { id: "bp_org3", name: "Pharm Organic Chemistry III", branchId: "pharmacy", level: "ug", semesters: [4], years: [] },
   { id: "bp_medchem1", name: "Medicinal Chemistry I", branchId: "pharmacy", level: "ug", semesters: [4], years: [] },
   { id: "bp_phy_pharm2", name: "Physical Pharmaceutics II", branchId: "pharmacy", level: "ug", semesters: [4], years: [] },
   { id: "bp_col1", name: "Pharmacology I", branchId: "pharmacy", level: "ug", semesters: [4], years: [] },
   { id: "bp_cog1", name: "Pharmacognosy I", branchId: "pharmacy", level: "ug", semesters: [4], years: [] },

   // Semester 5
   { id: "bp_medchem2", name: "Medicinal Chemistry II", branchId: "pharmacy", level: "ug", semesters: [5], years: [] },
   { id: "bp_ind1", name: "Industrial Pharmacy I", branchId: "pharmacy", level: "ug", semesters: [5], years: [] },
   { id: "bp_col2", name: "Pharmacology II", branchId: "pharmacy", level: "ug", semesters: [5], years: [] },
   { id: "bp_cog2", name: "Pharmacognosy II", branchId: "pharmacy", level: "ug", semesters: [5], years: [] },
   { id: "bp_juris", name: "Pharmaceutical Jurisprudence", branchId: "pharmacy", level: "ug", semesters: [5], years: [] },

   // Semester 6
   { id: "bp_medchem3", name: "Medicinal Chemistry III", branchId: "pharmacy", level: "ug", semesters: [6], years: [] },
   { id: "bp_col3", name: "Pharmacology III", branchId: "pharmacy", level: "ug", semesters: [6], years: [] },
   { id: "bp_herbal", name: "Herbal Drug Technology", branchId: "pharmacy", level: "ug", semesters: [6], years: [] },
   { id: "bp_biopharm", name: "Biopharmaceutics & Pharmacokinetics", branchId: "pharmacy", level: "ug", semesters: [6], years: [] },
   { id: "bp_qa", name: "Quality Assurance", branchId: "pharmacy", level: "ug", semesters: [6], years: [] },

   // Semester 7
   { id: "bp_instru", name: "Instrumental Methods of Analysis", branchId: "pharmacy", level: "ug", semesters: [7], years: [] },
   { id: "bp_ind2", name: "Industrial Pharmacy II", branchId: "pharmacy", level: "ug", semesters: [7], years: [] },
   { id: "bp_prac", name: "Pharmacy Practice", branchId: "pharmacy", level: "ug", semesters: [7], years: [] },
   { id: "bp_ndds", name: "Novel Drug Delivery Systems", branchId: "pharmacy", level: "ug", semesters: [7], years: [] },

   // Semester 8
   { id: "bp_stats", name: "Biostatistics & Research Methodology", branchId: "pharmacy", level: "ug", semesters: [8], years: [] },
   { id: "bp_social", name: "Social & Preventive Pharmacy", branchId: "pharmacy", level: "ug", semesters: [8], years: [] },
   { id: "bp_marketing", name: "Pharma Marketing Management", branchId: "pharmacy", level: "ug", semesters: [8], years: [] },
   { id: "bp_pv", name: "Pharmacovigilance", branchId: "pharmacy", level: "ug", semesters: [8], years: [] },

   // ==========================================
   // 7. Physiotherapy (BPT)
   // ==========================================
   // Year 1
   { id: "bpt_anat", name: "Anatomy", branchId: "physiotherapy", level: "ug", years: [1], semesters: [] },
   { id: "bpt_phys", name: "Physiology", branchId: "physiotherapy", level: "ug", years: [1], semesters: [] },
   { id: "bpt_biochem", name: "Biochemistry", branchId: "physiotherapy", level: "ug", years: [1], semesters: [] },
   { id: "bpt_exercise1", name: "Exercise Therapy I", branchId: "physiotherapy", level: "ug", years: [1], semesters: [] },
   { id: "bpt_electro1", name: "Electrotherapy I", branchId: "physiotherapy", level: "ug", years: [1], semesters: [] },

   // Year 2
   { id: "bpt_path_micro", name: "Pathology & Microbiology", branchId: "physiotherapy", level: "ug", years: [2], semesters: [] },
   { id: "bpt_pharm", name: "Pharmacology", branchId: "physiotherapy", level: "ug", years: [2], semesters: [] },
   { id: "bpt_exercise2", name: "Exercise Therapy II", branchId: "physiotherapy", level: "ug", years: [2], semesters: [] },
   { id: "bpt_electro2", name: "Electrotherapy II", branchId: "physiotherapy", level: "ug", years: [2], semesters: [] },
   { id: "bpt_biomech", name: "Biomechanics & Kinesiology", branchId: "physiotherapy", level: "ug", years: [2], semesters: [] },

   // Year 3
   { id: "bpt_gen_med", name: "General Medicine", branchId: "physiotherapy", level: "ug", years: [3], semesters: [] },
   { id: "bpt_gen_surg", name: "General Surgery", branchId: "physiotherapy", level: "ug", years: [3], semesters: [] },
   { id: "bpt_ortho", name: "Orthopedics & Traumatology", branchId: "physiotherapy", level: "ug", years: [3], semesters: [] },
   { id: "bpt_pt_ortho", name: "PT in Orthopedics", branchId: "physiotherapy", level: "ug", years: [3], semesters: [] },
   { id: "bpt_pt_medsurg", name: "PT in General Medicine & Surgery", branchId: "physiotherapy", level: "ug", years: [3], semesters: [] },

   // Year 4
   { id: "bpt_neuro", name: "Neurology & Neurosurgery", branchId: "physiotherapy", level: "ug", years: [4], semesters: [] },
   { id: "bpt_pt_neuro", name: "PT in Neurology", branchId: "physiotherapy", level: "ug", years: [4], semesters: [] },
   { id: "bpt_pt_cardio", name: "PT in Cardiorespiratory Conditions", branchId: "physiotherapy", level: "ug", years: [4], semesters: [] },
   { id: "bpt_comm", name: "Community Physiotherapy", branchId: "physiotherapy", level: "ug", years: [4], semesters: [] },
   { id: "bpt_research", name: "Research & Biostatistics", branchId: "physiotherapy", level: "ug", years: [4], semesters: [] },

   // ==========================================
   // 8. Allied Health Sciences (Generic)
   // ==========================================
   { id: "ahs_anat", name: "Basic Anatomy", branchId: "allied_health", level: "ug", years: [1], semesters: [] },
   { id: "ahs_phys", name: "Basic Physiology", branchId: "allied_health", level: "ug", years: [1], semesters: [] },
   { id: "ahs_bio", name: "Basic Biochemistry", branchId: "allied_health", level: "ug", years: [1], semesters: [] },
   { id: "ahs_eng", name: "English & Communication", branchId: "allied_health", level: "ug", years: [1], semesters: [] },
   { id: "ahs_path", name: "General Pathology", branchId: "allied_health", level: "ug", years: [2], semesters: [] },
   { id: "ahs_micro", name: "General Microbiology", branchId: "allied_health", level: "ug", years: [2], semesters: [] },
   { id: "ahs_pharm", name: "General Pharmacology", branchId: "allied_health", level: "ug", years: [2], semesters: [] },
   { id: "ahs_tech1", name: "Specialized Technology I", branchId: "allied_health", level: "ug", years: [2], semesters: [] },
   { id: "ahs_tech2", name: "Specialized Technology II", branchId: "allied_health", level: "ug", years: [3], semesters: [] },
   { id: "ahs_ethics", name: "Medical Ethics & Law", branchId: "allied_health", level: "ug", years: [3], semesters: [] },

   // ==========================================
   // 9. Public Health (BPH)
   // ==========================================
   { id: "ph_intro", name: "Introduction to Public Health", branchId: "public_health", level: "ug", years: [1], semesters: [] },
   { id: "ph_bio", name: "Human Biology", branchId: "public_health", level: "ug", years: [1], semesters: [] },
   { id: "ph_epi", name: "Basic Epidemiology", branchId: "public_health", level: "ug", years: [2], semesters: [] },
   { id: "ph_stats", name: "Biostatistics", branchId: "public_health", level: "ug", years: [2], semesters: [] },
   { id: "ph_env", name: "Environmental Health", branchId: "public_health", level: "ug", years: [2], semesters: [] },
   { id: "ph_nutri", name: "Public Health Nutrition", branchId: "public_health", level: "ug", years: [3], semesters: [] },
   { id: "ph_demography", name: "Demography & Family Welfare", branchId: "public_health", level: "ug", years: [3], semesters: [] },
   { id: "ph_mgmt", name: "Health Systems Management", branchId: "public_health", level: "ug", years: [3], semesters: [] },

   // ==========================================
   // 10. Medical Lab Technology (MLT)
   // ==========================================
   // Year 1
   { id: "mlt_anat_phys", name: "Anatomy & Physiology", branchId: "medical_lab", level: "ug", years: [1], semesters: [] },
   { id: "mlt_biochem1", name: "General Biochemistry", branchId: "medical_lab", level: "ug", years: [1], semesters: [] },
   { id: "mlt_basics", name: "Fundamentals of MLT & Lab Safety", branchId: "medical_lab", level: "ug", years: [1], semesters: [] },

   // Year 2
   { id: "mlt_hema", name: "Hematology & Blood Banking", branchId: "medical_lab", level: "ug", years: [2], semesters: [] },
   { id: "mlt_micro", name: "Clinical Microbiology", branchId: "medical_lab", level: "ug", years: [2], semesters: [] },
   { id: "mlt_biochem2", name: "Clinical Biochemistry", branchId: "medical_lab", level: "ug", years: [2], semesters: [] },

   // Year 3
   { id: "mlt_histo", name: "Histopathology & Cytology", branchId: "medical_lab", level: "ug", years: [3], semesters: [] },
   { id: "mlt_adv", name: "Advanced Diagnostic Techniques", branchId: "medical_lab", level: "ug", years: [3], semesters: [] },
   { id: "mlt_qc", name: "Lab Management & Quality Control", branchId: "medical_lab", level: "ug", years: [3], semesters: [] },

   // === MEDIA & MASS COMMUNICATION ===
   { id: "journalism", name: "Journalism & News Reporting", branchId: "mass_communication", level: "ug", semesters: [] },
   { id: "ads_pr", name: "Advertising & Public Relations", branchId: "mass_communication", level: "ug", semesters: [] },


   /* =====================================================
       1. BACHELOR OF COMPUTER APPLICATIONS (BCA)
       Degree: Undergraduate (3 Years / 6 Semesters)
      ===================================================== */

   // -------- SEMESTER 1 (Foundation & Core) --------
   { id: "bca_math_1", name: "Mathematics - I (Discrete Math & Algebra)", branchId: "bca", semesters: [1], tags: ["math", "core"] },
   { id: "bca_foc", name: "Computer Fundamentals & IT Tools", branchId: "bca", semesters: [1], tags: ["core", "basics"] },
   { id: "bca_c_prog", name: "Programming in C", branchId: "bca", semesters: [1], tags: ["programming", "core"] },
   { id: "bca_dig_elec", name: "Digital Electronics & Computer Organization", branchId: "bca", semesters: [1], tags: ["hardware", "core"] },
   { id: "bca_comm_eng", name: "Professional Communication Skills", branchId: "bca", semesters: [1], tags: ["soft_skills", "language"] },
   { id: "bca_c_lab", name: "C Programming Lab", branchId: "bca", semesters: [1], tags: ["lab", "coding"] },
   { id: "bca_it_lab", name: "PC Software & IT Tools Lab (Office/Excel)", branchId: "bca", semesters: [1], tags: ["lab", "basics"] },
   { id: "bca_env", name: "Environmental Studies", branchId: "bca", semesters: [1], tags: ["general", "mandatory"] },

   // -------- SEMESTER 2 (Data & Logic) --------
   { id: "bca_math_2", name: "Mathematics - II (Calculus & Stats)", branchId: "bca", semesters: [2], tags: ["math", "core"] },
   { id: "bca_ds", name: "Data Structures using C", branchId: "bca", semesters: [2], tags: ["core", "dsa"] },
   { id: "bca_oops", name: "Object Oriented Programming (C++)", branchId: "bca", semesters: [2], tags: ["programming", "core"] },
   { id: "bca_coa", name: "Computer Architecture", branchId: "bca", semesters: [2], tags: ["hardware", "theory"] },
   { id: "bca_ds_lab", name: "Data Structures Lab", branchId: "bca", semesters: [2], tags: ["lab", "dsa"] },
   { id: "bca_cpp_lab", name: "C++ Programming Lab", branchId: "bca", semesters: [2], tags: ["lab", "coding"] },
   { id: "bca_value_edu", name: "Value Education & Ethics", branchId: "bca", semesters: [2], tags: ["general", "humanities"] },

   // -------- SEMESTER 3 (Database & Systems) --------
   { id: "bca_dbms", name: "Database Management Systems (DBMS)", branchId: "bca", semesters: [3], tags: ["core", "database"] },
   { id: "bca_os", name: "Operating Systems", branchId: "bca", semesters: [3], tags: ["core", "systems"] },
   { id: "bca_java", name: "Core Java Programming", branchId: "bca", semesters: [3], tags: ["programming", "core"] },
   { id: "bca_web_1", name: "Web Technologies I (HTML/CSS/JS)", branchId: "bca", semesters: [3], tags: ["web", "frontend"] },
   { id: "bca_stats", name: "Computer Oriented Numerical Methods", branchId: "bca", semesters: [3], tags: ["math", "theory"] },
   { id: "bca_dbms_lab", name: "DBMS Lab (SQL/PL-SQL)", branchId: "bca", semesters: [3], tags: ["lab", "database"] },
   { id: "bca_java_lab", name: "Java Programming Lab", branchId: "bca", semesters: [3], tags: ["lab", "coding"] },
   { id: "bca_web_lab", name: "Web Design Lab", branchId: "bca", semesters: [3], tags: ["lab", "web"] },

   // -------- SEMESTER 4 (Networks & Engineering) --------
   { id: "bca_cn", name: "Computer Networks", branchId: "bca", semesters: [4], tags: ["core", "networking"] },
   { id: "bca_se", name: "Software Engineering", branchId: "bca", semesters: [4], tags: ["core", "theory"] },
   { id: "bca_python", name: "Python Programming", branchId: "bca", semesters: [4], tags: ["programming", "modern"] },
   { id: "bca_rdbms", name: "Relational Database Management (Oracle)", branchId: "bca", semesters: [4], tags: ["database", "advanced"] },
   { id: "bca_unix", name: "Linux/Unix Shell Programming", branchId: "bca", semesters: [4], tags: ["systems", "scripting"] },
   { id: "bca_python_lab", name: "Python Programming Lab", branchId: "bca", semesters: [4], tags: ["lab", "coding"] },
   { id: "bca_unix_lab", name: "Linux/Shell Lab", branchId: "bca", semesters: [4], tags: ["lab", "systems"] },
   { id: "bca_marketing", name: "Digital Marketing Basics", branchId: "bca", semesters: [4], tags: ["elective", "business"] },

   // -------- SEMESTER 5 (Web & App Development) --------
   { id: "bca_dotnet", name: "C# & .NET Framework", branchId: "bca", semesters: [5], tags: ["programming", "enterprise"] },
   { id: "bca_php", name: "Web Development (PHP & MySQL)", branchId: "bca", semesters: [5], tags: ["web", "backend"] },
   { id: "bca_android", name: "Mobile Application Development (Android)", branchId: "bca", semesters: [5], tags: ["mobile", "core"] },
   { id: "bca_toc", name: "Theory of Computation", branchId: "bca", semesters: [5], tags: ["theory", "math"] },
   { id: "bca_elec_ai", name: "Artificial Intelligence (Elective)", branchId: "bca", semesters: [5], tags: ["elective", "ai"] },
   { id: "bca_elec_cloud", name: "Introduction to Cloud Computing (Elective)", branchId: "bca", semesters: [5], tags: ["elective", "cloud"] },
   { id: "bca_mobile_lab", name: "Mobile App Development Lab", branchId: "bca", semesters: [5], tags: ["lab", "mobile"] },
   { id: "bca_php_lab", name: "PHP & Web Dev Lab", branchId: "bca", semesters: [5], tags: ["lab", "web"] },
   { id: "bca_summer_proj", name: "Summer Project / Internship Assessment", branchId: "bca", semesters: [5], tags: ["project"] },

   // -------- SEMESTER 6 (Advanced Tech & Project) --------
   { id: "bca_adv_java", name: "Advanced Java (J2EE/Servlets)", branchId: "bca", semesters: [6], tags: ["programming", "enterprise"] },
   { id: "bca_cyber", name: "Information Security & Cyber Law", branchId: "bca", semesters: [6], tags: ["security", "law"] },
   { id: "bca_elec_data", name: "Data Warehousing & Mining (Elective)", branchId: "bca", semesters: [6], tags: ["elective", "data"] },
   { id: "bca_elec_test", name: "Software Testing & QA (Elective)", branchId: "bca", semesters: [6], tags: ["elective", "testing"] },
   { id: "bca_elec_graphics", name: "Computer Graphics (Elective)", branchId: "bca", semesters: [6], tags: ["elective", "graphics"] },
   { id: "bca_iot_intro", name: "Introduction to IoT", branchId: "bca", semesters: [6], tags: ["elective", "iot"] },
   { id: "bca_major_proj", name: "Major Project Work", branchId: "bca", semesters: [6], tags: ["project", "core"] },
   { id: "bca_seminar", name: "Major Seminar", branchId: "bca", semesters: [6], tags: ["soft_skills"] },

   /* =====================================================
       2. MASTER OF COMPUTER APPLICATIONS (MCA)
       Degree: Postgraduate (2 Years / 4 Semesters) [New AICTE Pattern]
      ===================================================== */

   // -------- SEMESTER 1 (Bridging & Advanced Foundation) --------
   { id: "mca_adv_dsa", name: "Advanced Data Structures & Algorithms", branchId: "mca", semesters: [1], tags: ["core", "dsa"] },
   { id: "mca_adv_java", name: "Advanced Java Technologies", branchId: "mca", semesters: [1], tags: ["programming", "backend"] },
   { id: "mca_adv_os", name: "Advanced Operating Systems", branchId: "mca", semesters: [1], tags: ["theory", "systems"] },
   { id: "mca_discrete", name: "Discrete Mathematics & Graph Theory", branchId: "mca", semesters: [1], tags: ["math", "theory"] },
   { id: "mca_se_agile", name: "Advanced Software Engineering & Agile", branchId: "mca", semesters: [1], tags: ["process", "management"] },
   { id: "mca_dsa_lab", name: "Advanced Algorithms Lab", branchId: "mca", semesters: [1], tags: ["lab", "coding"] },
   { id: "mca_web_stack", name: "Full Stack Web Dev (MERN/MEAN) - I", branchId: "mca", semesters: [1], tags: ["web", "modern"] },

   // -------- SEMESTER 2 (Core Tech & AI) --------
   { id: "mca_ai_ml", name: "Artificial Intelligence & Machine Learning", branchId: "mca", semesters: [2], tags: ["ai", "core"] },
   { id: "mca_adv_dbms", name: "Advanced Database Management (NoSQL)", branchId: "mca", semesters: [2], tags: ["database", "modern"] },
   { id: "mca_cn_adv", name: "Advanced Computer Networks", branchId: "mca", semesters: [2], tags: ["networking", "theory"] },
   { id: "mca_cloud", name: "Cloud Computing & DevOps", branchId: "mca", semesters: [2], tags: ["cloud", "core"] },
   { id: "mca_python_adv", name: "Advanced Python for Data Science", branchId: "mca", semesters: [2], tags: ["programming", "data"] },
   { id: "mca_ml_lab", name: "Machine Learning Lab (Python/R)", branchId: "mca", semesters: [2], tags: ["lab", "ai"] },
   { id: "mca_cloud_lab", name: "Cloud & Virtualization Lab (AWS/Azure)", branchId: "mca", semesters: [2], tags: ["lab", "cloud"] },

   // -------- SEMESTER 3 (Specialization & Emerging Tech) --------
   { id: "mca_bigdata", name: "Big Data Analytics (Hadoop/Spark)", branchId: "mca", semesters: [3], tags: ["data", "core"] },
   { id: "mca_iot", name: "Internet of Things (IoT) & Embedded", branchId: "mca", semesters: [3], tags: ["hardware", "iot"] },
   { id: "mca_cyber", name: "Cyber Security & Cryptography", branchId: "mca", semesters: [3], tags: ["security", "core"] },
   { id: "mca_mobile_adv", name: "Advanced Mobile Computing (Flutter/React Native)", branchId: "mca", semesters: [3], tags: ["mobile", "modern"] },
   { id: "mca_research", name: "Research Methodology & IPR", branchId: "mca", semesters: [3], tags: ["research", "theory"] },

   // MCA Electives (Semester 3 Choice)
   { id: "mca_elec_blockchain", name: "Blockchain Technologies (Elective)", branchId: "mca", semesters: [3], tags: ["elective", "emerging"] },
   { id: "mca_elec_nlp", name: "Natural Language Processing (Elective)", branchId: "mca", semesters: [3], tags: ["elective", "ai"] },
   { id: "mca_elec_dip", name: "Digital Image Processing (Elective)", branchId: "mca", semesters: [3], tags: ["elective", "graphics"] },

   { id: "mca_mini_proj", name: "Mini Project", branchId: "mca", semesters: [3], tags: ["project"] },

   // -------- SEMESTER 4 (Industry Internship) --------
   { id: "mca_major_proj", name: "Major Project / Industrial Training (6 Months)", branchId: "mca", semesters: [4], tags: ["project", "internship"] },
   { id: "mca_seminar_adv", name: "Research Seminar & Viva", branchId: "mca", semesters: [4], tags: ["research"] },

   // (You can extend this file later — keep ids stable)
   //==================
   // 1. Physics
   // Source: UGC LOCF for B.Sc Physics
   // ==========================================
   { id: "phy_mech", name: "Mechanics", branchId: "physics", level: "ug", semesters: [1] },
   { id: "phy_math1", name: "Mathematical Physics I", branchId: "physics", level: "ug", semesters: [1] },
   { id: "phy_elec", name: "Electricity and Magnetism", branchId: "physics", level: "ug", semesters: [2] },
   { id: "phy_waves", name: "Waves and Optics", branchId: "physics", level: "ug", semesters: [2] },
   { id: "phy_thermal", name: "Thermal Physics", branchId: "physics", level: "ug", semesters: [3] },
   { id: "phy_digital", name: "Digital Systems and Applications", branchId: "physics", level: "ug", semesters: [3] },
   { id: "phy_math2", name: "Mathematical Physics II", branchId: "physics", level: "ug", semesters: [3] },
   { id: "phy_math3", name: "Mathematical Physics III", branchId: "physics", level: "ug", semesters: [4] },
   { id: "phy_modern", name: "Elements of Modern Physics", branchId: "physics", level: "ug", semesters: [4] },
   { id: "phy_analog", name: "Analog Systems and Applications", branchId: "physics", level: "ug", semesters: [4] },
   { id: "phy_quantum", name: "Quantum Mechanics", branchId: "physics", level: "ug", semesters: [5] },
   { id: "phy_solid", name: "Solid State Physics", branchId: "physics", level: "ug", semesters: [5] },
   { id: "phy_em_theory", name: "Electromagnetic Theory", branchId: "physics", level: "ug", semesters: [6] },
   { id: "phy_stat", name: "Statistical Mechanics", branchId: "physics", level: "ug", semesters: [6] },
   // ==========================================
   // Physics – Additional Core Subjects
   // ==========================================
   { id: "phy_classical", name: "Classical Mechanics", branchId: "physics", level: "ug", semesters: [2] },
   { id: "phy_rel", name: "Special Theory of Relativity", branchId: "physics", level: "ug", semesters: [4] },
   { id: "phy_atomic", name: "Atomic Physics", branchId: "physics", level: "ug", semesters: [4] },
   { id: "phy_nuclear", name: "Nuclear Physics", branchId: "physics", level: "ug", semesters: [5] },
   { id: "phy_computational", name: "Computational Physics", branchId: "physics", level: "ug", semesters: [6] },

   // ==========================================
   // 2. Chemistry
   // Source: UGC LOCF for B.Sc Chemistry
   // ==========================================
   { id: "chem_inorg1", name: "Inorganic Chemistry I: Atomic Structure", branchId: "chemistry", level: "ug", semesters: [1] },
   { id: "chem_phys1", name: "Physical Chemistry I: States of Matter", branchId: "chemistry", level: "ug", semesters: [1] },
   { id: "chem_org1", name: "Organic Chemistry I: Basics & Hydrocarbons", branchId: "chemistry", level: "ug", semesters: [2] },
   { id: "chem_phys2", name: "Physical Chemistry II: Thermodynamics", branchId: "chemistry", level: "ug", semesters: [2] },
   { id: "chem_inorg2", name: "Inorganic Chemistry II: Bonding", branchId: "chemistry", level: "ug", semesters: [3] },
   { id: "chem_org2", name: "Organic Chemistry II: Oxygen Containing Groups", branchId: "chemistry", level: "ug", semesters: [3] },
   { id: "chem_phys3", name: "Physical Chemistry III: Phase Equilibrium", branchId: "chemistry", level: "ug", semesters: [3] },
   { id: "chem_inorg3", name: "Inorganic Chemistry III: Coordination Chemistry", branchId: "chemistry", level: "ug", semesters: [4] },
   { id: "chem_org3", name: "Organic Chemistry III: Nitrogen Compounds", branchId: "chemistry", level: "ug", semesters: [4] },
   { id: "chem_phys4", name: "Physical Chemistry IV: Electrochemistry", branchId: "chemistry", level: "ug", semesters: [4] },
   { id: "chem_org4", name: "Organic Chemistry IV: Biomolecules", branchId: "chemistry", level: "ug", semesters: [5] },
   { id: "chem_phys5", name: "Physical Chemistry V: Quantum Chemistry", branchId: "chemistry", level: "ug", semesters: [5] },
   { id: "chem_inorg4", name: "Inorganic Chemistry IV: Organometallics", branchId: "chemistry", level: "ug", semesters: [6] },
   { id: "chem_spectro", name: "Spectroscopy", branchId: "chemistry", level: "ug", semesters: [6] },
   // ==========================================
   // Chemistry – Additional Core Subjects
   // ==========================================
   { id: "chem_solid", name: "Solid State Chemistry", branchId: "chemistry", level: "ug", semesters: [3] },
   { id: "chem_kinetics", name: "Chemical Kinetics", branchId: "chemistry", level: "ug", semesters: [3] },
   { id: "chem_surface", name: "Surface Chemistry", branchId: "chemistry", level: "ug", semesters: [4] },
   { id: "chem_hetero", name: "Heterocyclic Chemistry", branchId: "chemistry", level: "ug", semesters: [5] },
   { id: "chem_polymer", name: "Polymer Chemistry", branchId: "chemistry", level: "ug", semesters: [6] },

   // ==========================================
   // 3. Mathematics
   // ==========================================
   { id: "math_calc", name: "Calculus", branchId: "mathematics", level: "ug", semesters: [1] },
   { id: "math_algebra", name: "Algebra", branchId: "mathematics", level: "ug", semesters: [1] },
   { id: "math_real_anal", name: "Real Analysis", branchId: "mathematics", level: "ug", semesters: [2] },
   { id: "math_diff_eq", name: "Differential Equations", branchId: "mathematics", level: "ug", semesters: [2] },
   { id: "math_group_theory", name: "Theory of Real Functions & Group Theory", branchId: "mathematics", level: "ug", semesters: [3] },
   { id: "math_pde", name: "PDE & Systems of ODE", branchId: "mathematics", level: "ug", semesters: [3] },
   { id: "math_numerical", name: "Numerical Methods", branchId: "mathematics", level: "ug", semesters: [4] },
   { id: "math_riemann", name: "Riemann Integration & Series", branchId: "mathematics", level: "ug", semesters: [4] },
   { id: "math_metric", name: "Metric Spaces", branchId: "mathematics", level: "ug", semesters: [5] },
   { id: "math_ring", name: "Ring Theory & Linear Algebra", branchId: "mathematics", level: "ug", semesters: [5] },
   { id: "math_complex", name: "Complex Analysis", branchId: "mathematics", level: "ug", semesters: [6] },
   { id: "math_lp", name: "Linear Programming", branchId: "mathematics", level: "ug", semesters: [6] },

   // ==========================================
   // 4. Statistics
   // ==========================================
   { id: "stat_desc", name: "Descriptive Statistics", branchId: "statistics", level: "ug", semesters: [1] },
   { id: "stat_prob", name: "Probability and Probability Distributions", branchId: "statistics", level: "ug", semesters: [1] },
   { id: "stat_algebra", name: "Algebra & Calculus for Statistics", branchId: "statistics", level: "ug", semesters: [2] },
   { id: "stat_sampling_dist", name: "Sampling Distributions", branchId: "statistics", level: "ug", semesters: [3] },
   { id: "stat_survey", name: "Survey Sampling & Indian Official Statistics", branchId: "statistics", level: "ug", semesters: [3] },
   { id: "stat_inference", name: "Statistical Inference", branchId: "statistics", level: "ug", semesters: [4] },
   { id: "stat_linear", name: "Linear Models", branchId: "statistics", level: "ug", semesters: [4] },
   { id: "stat_stochastic", name: "Stochastic Processes", branchId: "statistics", level: "ug", semesters: [5] },
   { id: "stat_doe", name: "Design of Experiments", branchId: "statistics", level: "ug", semesters: [6] },
   { id: "stat_time_series", name: "Time Series Analysis", branchId: "statistics", level: "ug", semesters: [6] },
   // ==========================================
   // Statistics – Additional Core Subjects
   // ==========================================
   { id: "stat_mathstat", name: "Mathematical Statistics", branchId: "statistics", level: "ug", semesters: [2] },
   { id: "stat_regression", name: "Regression Analysis", branchId: "statistics", level: "ug", semesters: [4] },
   { id: "stat_multivariate", name: "Multivariate Analysis", branchId: "statistics", level: "ug", semesters: [5] },
   { id: "stat_nonparametric", name: "Non-Parametric Statistics", branchId: "statistics", level: "ug", semesters: [6] },

   // ==========================================
   // 5. Biological Sciences (General/Zoology/Botany Mix)
   // ==========================================
   { id: "bio_biomol", name: "Biomolecules & Cell Biology", branchId: "biology", level: "ug", semesters: [1] },
   { id: "bio_biodiv_micro", name: "Biodiversity (Microbes, Algae, Fungi)", branchId: "biology", level: "ug", semesters: [1] },
   { id: "bio_plant_div", name: "Plant Diversity (Archegoniate)", branchId: "biology", level: "ug", semesters: [2] },
   { id: "bio_animal_div", name: "Animal Diversity", branchId: "biology", level: "ug", semesters: [2] },
   { id: "bio_physio_plant", name: "Plant Physiology & Metabolism", branchId: "biology", level: "ug", semesters: [3] },
   { id: "bio_physio_animal", name: "Animal Physiology", branchId: "biology", level: "ug", semesters: [3] },
   { id: "bio_genetics", name: "Genetics & Evolutionary Biology", branchId: "biology", level: "ug", semesters: [4] },
   { id: "bio_molbio", name: "Molecular Biology", branchId: "biology", level: "ug", semesters: [5] },
   { id: "bio_immuno", name: "Immunology", branchId: "biology", level: "ug", semesters: [5] },
   { id: "bio_eco", name: "Ecology & Environmental Management", branchId: "biology", level: "ug", semesters: [6] },
   { id: "bio_dev", name: "Developmental Biology", branchId: "biology", level: "ug", semesters: [6] },
   // ==========================================
   // Biology – Additional Core Subjects
   // ==========================================
   { id: "bio_botany", name: "Plant Anatomy & Embryology", branchId: "biology", level: "ug", semesters: [3] },
   { id: "bio_zoology", name: "Invertebrate Zoology", branchId: "biology", level: "ug", semesters: [2] },
   { id: "bio_biotech", name: "Biotechnology Fundamentals", branchId: "biology", level: "ug", semesters: [4] },
   { id: "bio_bioinfo", name: "Bioinformatics", branchId: "biology", level: "ug", semesters: [6] },

   // ==========================================
   // 6. Biotechnology
   // ==========================================
   { id: "bt_cell", name: "Cell Biology", branchId: "biotechnology", level: "ug", semesters: [1] },
   { id: "bt_micro", name: "Microbiology", branchId: "biotechnology", level: "ug", semesters: [1] },
   { id: "bt_biochem", name: "Biochemistry", branchId: "biotechnology", level: "ug", semesters: [2] },
   { id: "bt_genetics", name: "Genetics", branchId: "biotechnology", level: "ug", semesters: [2] },
   { id: "bt_molbio", name: "Molecular Biology", branchId: "biotechnology", level: "ug", semesters: [3] },
   { id: "bt_immuno", name: "Immunology", branchId: "biotechnology", level: "ug", semesters: [4] },
   { id: "bt_rdna", name: "Recombinant DNA Technology", branchId: "biotechnology", level: "ug", semesters: [4] },
   { id: "bt_bioprocess", name: "Bioprocess Engineering", branchId: "biotechnology", level: "ug", semesters: [5] },
   { id: "bt_plant_animal", name: "Plant & Animal Biotechnology", branchId: "biotechnology", level: "ug", semesters: [5] },
   { id: "bt_genomics", name: "Genomics & Proteomics", branchId: "biotechnology", level: "ug", semesters: [6] },
   { id: "bt_ipr", name: "Bioethics & IPR", branchId: "biotechnology", level: "ug", semesters: [6] },

   // ==========================================
   // 7. Microbiology
   // ==========================================
   { id: "micro_intro", name: "Introduction to Microbiology", branchId: "microbiology", level: "ug", semesters: [1] },
   { id: "micro_bact", name: "Bacteriology", branchId: "microbiology", level: "ug", semesters: [1] },
   { id: "micro_virology", name: "Virology", branchId: "microbiology", level: "ug", semesters: [2] },
   { id: "micro_biochem", name: "Microbial Biochemistry", branchId: "microbiology", level: "ug", semesters: [2] },
   { id: "micro_physio", name: "Microbial Physiology", branchId: "microbiology", level: "ug", semesters: [3] },
   { id: "micro_genetics", name: "Microbial Genetics", branchId: "microbiology", level: "ug", semesters: [4] },
   { id: "micro_ind", name: "Industrial Microbiology", branchId: "microbiology", level: "ug", semesters: [5] },
   { id: "micro_food", name: "Food & Dairy Microbiology", branchId: "microbiology", level: "ug", semesters: [5] },
   { id: "micro_medical", name: "Medical Microbiology", branchId: "microbiology", level: "ug", semesters: [6] },
   { id: "micro_env", name: "Environmental Microbiology", branchId: "microbiology", level: "ug", semesters: [6] },

   // ==========================================
   // 8. Environmental Science
   // ==========================================
   { id: "env_fund", name: "Fundamentals of Environmental Science", branchId: "environment", level: "ug", semesters: [1] },
   { id: "env_eco", name: "Ecology and Ecosystems", branchId: "environment", level: "ug", semesters: [1] },
   { id: "env_resources", name: "Natural Resource Management", branchId: "environment", level: "ug", semesters: [2] },
   { id: "env_chem", name: "Environmental Chemistry", branchId: "environment", level: "ug", semesters: [2] },
   { id: "env_pollution", name: "Environmental Pollution & Control", branchId: "environment", level: "ug", semesters: [3] },
   { id: "env_biodiv", name: "Biodiversity & Conservation", branchId: "environment", level: "ug", semesters: [4] },
   { id: "env_eia", name: "Environmental Impact Assessment (EIA)", branchId: "environment", level: "ug", semesters: [5] },
   { id: "env_law", name: "Environmental Legislation & Policy", branchId: "environment", level: "ug", semesters: [5] },
   { id: "env_disaster", name: "Disaster Management", branchId: "environment", level: "ug", semesters: [6] },
   { id: "env_climate", name: "Climate Change & Sustainable Dev", branchId: "environment", level: "ug", semesters: [6] },

   // ==========================================
   // 9. Computer Science (B.Sc CS)
   // ==========================================
   { id: "cs_prog_c", name: "Programming in C/C++", branchId: "computer_science", level: "ug", semesters: [1] },
   { id: "cs_arch", name: "Computer System Architecture", branchId: "computer_science", level: "ug", semesters: [1] },
   { id: "cs_java", name: "Programming in Java", branchId: "computer_science", level: "ug", semesters: [2] },
   { id: "cs_discrete", name: "Discrete Structures", branchId: "computer_science", level: "ug", semesters: [2] },
   { id: "cs_dsa", name: "Data Structures", branchId: "computer_science", level: "ug", semesters: [3] },
   { id: "cs_os", name: "Operating Systems", branchId: "computer_science", level: "ug", semesters: [3] },
   { id: "cs_networks", name: "Computer Networks", branchId: "computer_science", level: "ug", semesters: [3] },
   { id: "cs_algo", name: "Design and Analysis of Algorithms", branchId: "computer_science", level: "ug", semesters: [4] },
   { id: "cs_swe", name: "Software Engineering", branchId: "computer_science", level: "ug", semesters: [4] },
   { id: "cs_dbms", name: "Database Management Systems", branchId: "computer_science", level: "ug", semesters: [4] },
   { id: "cs_web", name: "Internet Technologies / Web Dev", branchId: "computer_science", level: "ug", semesters: [5] },
   { id: "cs_toc", name: "Theory of Computation", branchId: "computer_science", level: "ug", semesters: [5] },
   { id: "cs_ai", name: "Artificial Intelligence", branchId: "computer_science", level: "ug", semesters: [6] },
   { id: "cs_graphics", name: "Computer Graphics", branchId: "computer_science", level: "ug", semesters: [6] },

   // B.Sc IT
   { id: "bscit_c", name: "Programming in C", branchId: "bsc_it", semesters: [1], tags: ["programming"] },
   { id: "bscit_digital", name: "Digital Electronics", branchId: "bsc_it", semesters: [1], tags: ["electronics"] },
   { id: "bscit_discrete", name: "Discrete Mathematics", branchId: "bsc_it", semesters: [1], tags: ["math"] },
   { id: "bscit_dsa", name: "Data Structures", branchId: "bsc_it", semesters: [2], tags: ["programming"] },
   { id: "bscit_coa", name: "Computer Organization & Architecture", branchId: "bsc_it", semesters: [2], tags: ["core"] },
   { id: "bscit_web_basics", name: "Web Design Basics", branchId: "bsc_it", semesters: [2], tags: ["web"] },
   { id: "bscit_dbms", name: "Database Management Systems", branchId: "bsc_it", semesters: [3], tags: ["database"] },
   { id: "bscit_os", name: "Operating Systems", branchId: "bsc_it", semesters: [3], tags: ["systems"] },
   { id: "bscit_networks", name: "Computer Networks", branchId: "bsc_it", semesters: [3], tags: ["networks"] },
   { id: "bscit_java", name: "Object Oriented Programming (Java)", branchId: "bsc_it", semesters: [4], tags: ["programming"] },
   { id: "bscit_swe", name: "Software Engineering", branchId: "bsc_it", semesters: [4], tags: ["software"] },
   { id: "bscit_toc", name: "Theory of Computation", branchId: "bsc_it", semesters: [4], tags: ["theory"] },
   { id: "bscit_ai_intro", name: "Introduction to AI", branchId: "bsc_it", semesters: [5], tags: ["ai"] },
   { id: "bscit_cloud", name: "Cloud Computing Fundamentals", branchId: "bsc_it", semesters: [5], tags: ["cloud"] },
   { id: "bscit_security", name: "Information Security", branchId: "bsc_it", semesters: [5], tags: ["security"] },
   { id: "bscit_project", name: "Major Project", branchId: "bsc_it", semesters: [6], tags: ["project"] },
   { id: "bscit_bigdata", name: "Big Data Basics", branchId: "bsc_it", semesters: [6], tags: ["data"] },
   { id: "bscit_elective", name: "Elective", branchId: "bsc_it", semesters: [6], tags: ["elective"] },

   // M.Sc IT
   { id: "mscit_adv_algo", name: "Advanced Algorithms", branchId: "msc_it", semesters: [1], tags: ["theory"] },
   { id: "mscit_adv_dbms", name: "Advanced Database Systems", branchId: "msc_it", semesters: [1], tags: ["database"] },
   { id: "mscit_distributed", name: "Distributed Systems", branchId: "msc_it", semesters: [1], tags: ["systems"] },
   { id: "mscit_ml", name: "Machine Learning", branchId: "msc_it", semesters: [2], tags: ["ai"] },
   { id: "mscit_network_sec", name: "Network Security", branchId: "msc_it", semesters: [2], tags: ["security"] },
   { id: "mscit_software_arch", name: "Software Architecture", branchId: "msc_it", semesters: [2], tags: ["software"] },
   { id: "mscit_cloud", name: "Cloud Computing & DevOps", branchId: "msc_it", semesters: [3], tags: ["cloud", "devops"] },
   { id: "mscit_data_mining", name: "Data Mining", branchId: "msc_it", semesters: [3], tags: ["data"] },
   { id: "mscit_visualization", name: "Data Visualization", branchId: "msc_it", semesters: [3], tags: ["data"] },
   { id: "mscit_project", name: "Thesis / Major Project", branchId: "msc_it", semesters: [4], tags: ["project"] },
   { id: "mscit_blockchain", name: "Blockchain Technologies", branchId: "msc_it", semesters: [4], tags: ["emerging"] },
   { id: "mscit_iot", name: "IoT Systems", branchId: "msc_it", semesters: [4], tags: ["iot"] },
   // ==========================================
   // Computer Science – Additional Core Subjects
   // ==========================================
   { id: "cs_python", name: "Programming in Python", branchId: "computer_science", level: "ug", semesters: [1] },
   { id: "cs_oops", name: "Object Oriented Programming", branchId: "computer_science", level: "ug", semesters: [2] },
   { id: "cs_web2", name: "Web Technologies", branchId: "computer_science", level: "ug", semesters: [5] },
   { id: "cs_security", name: "Cyber Security", branchId: "computer_science", level: "ug", semesters: [6] },
   { id: "cs_cloud", name: "Cloud Computing", branchId: "computer_science", level: "ug", semesters: [6] },

   // ==========================================
   // 10. Data Analytics / Data Science
   // Source: Emerging UGC B.Sc Data Science Curriculum
   // ==========================================
   { id: "da_intro", name: "Introduction to Data Science", branchId: "data_analytics", level: "ug", semesters: [1] },
   { id: "da_python", name: "Python for Data Science", branchId: "data_analytics", level: "ug", semesters: [1] },
   { id: "da_stats", name: "Probability & Statistics for Analytics", branchId: "data_analytics", level: "ug", semesters: [2] },
   { id: "da_sql", name: "Database Systems & SQL", branchId: "data_analytics", level: "ug", semesters: [2] },
   { id: "da_viz", name: "Data Visualization (Tableau/PowerBI)", branchId: "data_analytics", level: "ug", semesters: [3] },
   { id: "da_ml1", name: "Machine Learning I (Supervised)", branchId: "data_analytics", level: "ug", semesters: [3] },
   { id: "da_bigdata", name: "Big Data Technologies (Hadoop/Spark)", branchId: "data_analytics", level: "ug", semesters: [4] },
   { id: "da_ml2", name: "Machine Learning II (Unsupervised)", branchId: "data_analytics", level: "ug", semesters: [4] },
   { id: "da_deep", name: "Deep Learning & Neural Networks", branchId: "data_analytics", level: "ug", semesters: [5] },
   { id: "da_nlp", name: "Natural Language Processing (NLP)", branchId: "data_analytics", level: "ug", semesters: [5] },
   { id: "da_ethics", name: "Data Ethics & Privacy", branchId: "data_analytics", level: "ug", semesters: [6] },
   { id: "da_capstone", name: "Capstone Project", branchId: "data_analytics", level: "ug", semesters: [6] },


   /* =====================================================
       1. BACHELOR OF HOTEL MANAGEMENT (BHM)
       branchId: "bhm"
      ===================================================== */

   // -------- SEMESTER 1 (Foundation) --------
   { id: "bhm_fp_found_1", name: "Food Production Foundation - I", branchId: "bhm", semesters: [1], tags: ["core", "kitchen"] },
   { id: "bhm_fb_found_1", name: "Food & Beverage Service Foundation - I", branchId: "bhm", semesters: [1], tags: ["core", "service"] },
   { id: "bhm_fo_found_1", name: "Front Office Operations Foundation - I", branchId: "bhm", semesters: [1], tags: ["core", "front_office"] },
   { id: "bhm_hk_found_1", name: "Accommodation & Housekeeping Foundation - I", branchId: "bhm", semesters: [1], tags: ["core", "housekeeping"] },
   { id: "bhm_nutrition", name: "Nutrition & Food Science", branchId: "bhm", semesters: [1], tags: ["science"] },
   { id: "bhm_comm", name: "Hotel Communication", branchId: "bhm", semesters: [1], tags: ["soft_skills"] },

   // -------- SEMESTER 2 (Foundation Advanced) --------
   { id: "bhm_fp_found_2", name: "Food Production Foundation - II", branchId: "bhm", semesters: [2], tags: ["core", "kitchen"] },
   { id: "bhm_fb_found_2", name: "Food & Beverage Service Foundation - II", branchId: "bhm", semesters: [2], tags: ["core", "service"] },
   { id: "bhm_fo_found_2", name: "Front Office Operations Foundation - II", branchId: "bhm", semesters: [2], tags: ["core", "front_office"] },
   { id: "bhm_hk_found_2", name: "Accommodation Operations - II", branchId: "bhm", semesters: [2], tags: ["core", "housekeeping"] },
   { id: "bhm_acc", name: "Hotel Accountancy", branchId: "bhm", semesters: [2], tags: ["management", "math"] },
   { id: "bhm_comp", name: "Computers in Hospitality (PMS)", branchId: "bhm", semesters: [2], tags: ["technology"] },

   // -------- SEMESTER 3 (Core & Control) --------
   { id: "bhm_fp_qty", name: "Food Production Operations (Quantity Kitchen)", branchId: "bhm", semesters: [3], tags: ["core"] },
   { id: "bhm_fb_ops", name: "Food & Beverage Operations", branchId: "bhm", semesters: [3], tags: ["core"] },
   { id: "bhm_fo_adv", name: "Front Office Management", branchId: "bhm", semesters: [3], tags: ["core"] },
   { id: "bhm_hk_adv", name: "Accommodation Management", branchId: "bhm", semesters: [3], tags: ["core"] },
   { id: "bhm_law", name: "Hotel & Business Law", branchId: "bhm", semesters: [3], tags: ["law"] },
   { id: "bhm_fsms", name: "Food Safety & Quality (HACCP)", branchId: "bhm", semesters: [3], tags: ["science"] },

   // -------- SEMESTER 4 (Industrial Training) --------
   { id: "bhm_iet", name: "Industrial Exposure Training (Internship)", branchId: "bhm", semesters: [4], tags: ["training"] },
   { id: "bhm_logbook", name: "Logbook & Training Report", branchId: "bhm", semesters: [4], tags: ["training"] },

   // -------- SEMESTER 5 (Management) --------
   { id: "bhm_fp_adv", name: "Advanced Food Production", branchId: "bhm", semesters: [5], tags: ["core"] },
   { id: "bhm_fb_mgmt", name: "F&B Management & Controls", branchId: "bhm", semesters: [5], tags: ["management"] },
   { id: "bhm_fac_plan", name: "Facility Planning", branchId: "bhm", semesters: [5], tags: ["management"] },
   { id: "bhm_fin_mgmt", name: "Financial Management", branchId: "bhm", semesters: [5], tags: ["management"] },
   { id: "bhm_marketing", name: "Hospitality Marketing", branchId: "bhm", semesters: [5], tags: ["marketing"] },

   // -------- SEMESTER 6 (Specialization) --------
   { id: "bhm_hr", name: "Human Resource Management in Hotels", branchId: "bhm", semesters: [6], tags: ["hr"] },
   { id: "bhm_strategic", name: "Strategic Management", branchId: "bhm", semesters: [6], tags: ["management"] },
   { id: "bhm_tourism", name: "Tourism Management", branchId: "bhm", semesters: [6], tags: ["elective"] },
   { id: "bhm_event", name: "Event Management", branchId: "bhm", semesters: [6], tags: ["elective"] },
   { id: "bhm_research", name: "Research Project", branchId: "bhm", semesters: [6], tags: ["project"] },

   /* =====================================================
       2. CULINARY ARTS
       branchId: "culinary"
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "ca_basics", name: "Culinary Skills & Fundamentals", branchId: "culinary", semesters: [1], tags: ["core"] },
   { id: "ca_hygiene", name: "Food Safety & Hygiene", branchId: "culinary", semesters: [1], tags: ["theory"] },
   { id: "ca_commodities", name: "Knowledge of Ingredients (Commodities)", branchId: "culinary", semesters: [1], tags: ["theory"] },
   { id: "ca_bakery_1", name: "Bakery & Patisserie Foundation", branchId: "culinary", semesters: [1], tags: ["bakery"] },

   // -------- SEMESTER 2 --------
   { id: "ca_indian", name: "Indian Cuisine (Regional)", branchId: "culinary", semesters: [2], tags: ["core"] },
   { id: "ca_menu", name: "Menu Planning & Cost Control", branchId: "culinary", semesters: [2], tags: ["management"] },
   { id: "ca_nutrition", name: "Nutrition for Chefs", branchId: "culinary", semesters: [2], tags: ["theory"] },
   { id: "ca_butchery", name: "Butchery & Fish Mongery", branchId: "culinary", semesters: [2], tags: ["skill"] },

   // -------- SEMESTER 3 --------
   { id: "ca_intl", name: "International Cuisine (European/Asian)", branchId: "culinary", semesters: [3], tags: ["core"] },
   { id: "ca_larder", name: "Larder & Cold Kitchen", branchId: "culinary", semesters: [3], tags: ["core"] },
   { id: "ca_wine", name: "Wine & Food Pairing", branchId: "culinary", semesters: [3], tags: ["theory"] },
   { id: "ca_volume", name: "Volume Cooking", branchId: "culinary", semesters: [3], tags: ["core"] },

   // -------- SEMESTER 4 --------
   { id: "ca_bakery_adv", name: "Advanced Bakery & Confectionery", branchId: "culinary", semesters: [4], tags: ["bakery"] },
   { id: "ca_garde_manger", name: "Advanced Garde Manger", branchId: "culinary", semesters: [4], tags: ["core"] },
   { id: "ca_training", name: "Kitchen Internship", branchId: "culinary", semesters: [4], tags: ["training"] },

   // -------- SEMESTER 5 --------
   { id: "ca_chocolate", name: "Chocolate & Sugar Art", branchId: "culinary", semesters: [5], tags: ["specialization"] },
   { id: "ca_kitchen_mgmt", name: "Kitchen Management & Design", branchId: "culinary", semesters: [5], tags: ["management"] },
   { id: "ca_trends", name: "Modern Culinary Trends", branchId: "culinary", semesters: [5], tags: ["theory"] },

   // -------- SEMESTER 6 --------
   { id: "ca_molecular", name: "Molecular Gastronomy", branchId: "culinary", semesters: [6], tags: ["advanced"] },
   { id: "ca_styling", name: "Food Styling & Photography", branchId: "culinary", semesters: [6], tags: ["creative"] },
   { id: "ca_entrepreneur", name: "Culinary Entrepreneurship", branchId: "culinary", semesters: [6], tags: ["management"] },

   /* =====================================================
       3. TRAVEL & TOURISM MANAGEMENT (BTTM)
       branchId: "travel_tourism"
      ===================================================== */

   // -------- SEMESTER 1 --------
   { id: "tt_intro", name: "Introduction to Travel & Tourism", branchId: "travel_tourism", semesters: [1], tags: ["core"] },
   { id: "tt_geography_india", name: "Tourism Geography of India", branchId: "travel_tourism", semesters: [1], tags: ["geography"] },
   { id: "tt_comm", name: "Business Communication", branchId: "travel_tourism", semesters: [1], tags: ["soft_skills"] },
   { id: "tt_culture", name: "Indian Culture & Heritage", branchId: "travel_tourism", semesters: [1], tags: ["history"] },

   // -------- SEMESTER 2 --------
   { id: "tt_agency", name: "Travel Agency & Tour Operations", branchId: "travel_tourism", semesters: [2], tags: ["core"] },
   { id: "tt_geography_world", name: "World Tourism Geography", branchId: "travel_tourism", semesters: [2], tags: ["geography"] },
   { id: "tt_transport", name: "Tourism Transport Systems", branchId: "travel_tourism", semesters: [2], tags: ["core"] },
   { id: "tt_products", name: "Tourism Products of India", branchId: "travel_tourism", semesters: [2], tags: ["core"] },

   // -------- SEMESTER 3 --------
   { id: "tt_ticketing", name: "Air Fares & Ticketing (IATA Basics)", branchId: "travel_tourism", semesters: [3], tags: ["skill"] },
   { id: "tt_marketing", name: "Tourism Marketing", branchId: "travel_tourism", semesters: [3], tags: ["marketing"] },
   { id: "tt_hospitality", name: "Introduction to Hospitality Mgmt", branchId: "travel_tourism", semesters: [3], tags: ["elective"] },
   { id: "tt_accounting", name: "Accounting for Tourism", branchId: "travel_tourism", semesters: [3], tags: ["math"] },

   // -------- SEMESTER 4 --------
   { id: "tt_gds", name: "Global Distribution Systems (Amadeus/Galileo)", branchId: "travel_tourism", semesters: [4], tags: ["skill", "tech"] },
   { id: "tt_itinerary", name: "Itinerary Planning & Costing", branchId: "travel_tourism", semesters: [4], tags: ["core"] },
   { id: "tt_guiding", name: "Tour Guiding & Escorting", branchId: "travel_tourism", semesters: [4], tags: ["skill"] },
   { id: "tt_ob", name: "Organizational Behavior", branchId: "travel_tourism", semesters: [4], tags: ["management"] },

   // -------- SEMESTER 5 --------
   { id: "tt_mice", name: "MICE Management (Events)", branchId: "travel_tourism", semesters: [5], tags: ["core"] },
   { id: "tt_sustainable", name: "Sustainable & Eco-Tourism", branchId: "travel_tourism", semesters: [5], tags: ["ethics"] },
   { id: "tt_research", name: "Research Methodology in Tourism", branchId: "travel_tourism", semesters: [5], tags: ["theory"] },
   { id: "tt_digital", name: "Digital Marketing for Tourism", branchId: "travel_tourism", semesters: [5], tags: ["marketing"] },

   // -------- SEMESTER 6 --------
   { id: "tt_policy", name: "Tourism Policy & Planning", branchId: "travel_tourism", semesters: [6], tags: ["management"] },
   { id: "tt_entrepreneur", name: "Entrepreneurship in Tourism", branchId: "travel_tourism", semesters: [6], tags: ["management"] },
   { id: "tt_trends", name: "Emerging Trends in Tourism", branchId: "travel_tourism", semesters: [6], tags: ["theory"] },
   { id: "tt_project", name: "Major Research Project / Tour Report", branchId: "travel_tourism", semesters: [6], tags: ["project"] },



   /* Mass Communication And Media
   =====================================================
       1. BACHELOR OF JOURNALISM & MASS COMMUNICATION (BJMC / BA-JMC)
       branchId: "bjmc"
      ===================================================== */

   // -------- SEMESTER 1 (Foundation) --------
   { id: "bjmc_intro", name: "Introduction to Communication & Media", branchId: "bjmc", semesters: [1], tags: ["core", "theory"] },
   { id: "bjmc_writing", name: "Writing for Media", branchId: "bjmc", semesters: [1], tags: ["core", "writing"] },
   { id: "bjmc_current", name: "Current Affairs & General Awareness", branchId: "bjmc", semesters: [1], tags: ["general"] },
   { id: "bjmc_english", name: "Communicative English", branchId: "bjmc", semesters: [1], tags: ["language"] },
   { id: "bjmc_hindi", name: "Communicative Hindi (Patrakarita)", branchId: "bjmc", semesters: [1], tags: ["language"] },
   { id: "bjmc_comp_app", name: "Computer Applications in Media", branchId: "bjmc", semesters: [1], tags: ["tech"] },
   { id: "bjmc_indian_polity", name: "Indian Political System & Constitution", branchId: "bjmc", semesters: [1], tags: ["general"] },

   // -------- SEMESTER 2 (Print & Ethics) --------
   { id: "bjmc_reporting", name: "Reporting & Editing (Print)", branchId: "bjmc", semesters: [2], tags: ["core", "print"] },
   { id: "bjmc_photo", name: "Photojournalism", branchId: "bjmc", semesters: [2], tags: ["core", "visual"] },
   { id: "bjmc_media_laws", name: "Media Laws & Ethics", branchId: "bjmc", semesters: [2], tags: ["core", "law"] },
   { id: "bjmc_socio", name: "Sociology & Psychology for Media", branchId: "bjmc", semesters: [2], tags: ["theory"] },
   { id: "bjmc_design", name: "Design & Graphics for Print (Quark/InDesign)", branchId: "bjmc", semesters: [2], tags: ["tech", "design"] },
   { id: "bjmc_env", name: "Environmental Science & Communication", branchId: "bjmc", semesters: [2], tags: ["general"] },

   // -------- SEMESTER 3 (Broadcast - Radio) --------
   { id: "bjmc_radio", name: "Radio Journalism & Production", branchId: "bjmc", semesters: [3], tags: ["core", "broadcast"] },
   { id: "bjmc_dev_comm", name: "Development Communication", branchId: "bjmc", semesters: [3], tags: ["core", "theory"] },
   { id: "bjmc_voice", name: "Voice Over & Radio Anchoring", branchId: "bjmc", semesters: [3], tags: ["skill"] },
   { id: "bjmc_video_edit", name: "Video Editing Basics (Premiere Pro)", branchId: "bjmc", semesters: [3], tags: ["tech", "production"] },
   { id: "bjmc_folk", name: "Folk Media & Traditional Communication", branchId: "bjmc", semesters: [3], tags: ["theory"] },

   // -------- SEMESTER 4 (Broadcast - TV) --------
   { id: "bjmc_tv_prod", name: "Television Production & Anchoring", branchId: "bjmc", semesters: [4], tags: ["core", "broadcast"] },
   { id: "bjmc_ad", name: "Advertising Principles & Practice", branchId: "bjmc", semesters: [4], tags: ["core", "marketing"] },
   { id: "bjmc_pr", name: "Public Relations & Corporate Comm", branchId: "bjmc", semesters: [4], tags: ["core", "pr"] },
   { id: "bjmc_camera", name: "Camera Techniques & Lighting", branchId: "bjmc", semesters: [4], tags: ["tech", "production"] },
   { id: "bjmc_mojo", name: "Mobile Journalism (MoJo)", branchId: "bjmc", semesters: [4], tags: ["skill", "modern"] },

   // -------- SEMESTER 5 (New Media & Research) --------
   { id: "bjmc_new_media", name: "New Media & Online Journalism", branchId: "bjmc", semesters: [5], tags: ["core", "digital"] },
   { id: "bjmc_film", name: "Film Appreciation & Studies", branchId: "bjmc", semesters: [5], tags: ["theory", "cinema"] },
   { id: "bjmc_event", name: "Event Management", branchId: "bjmc", semesters: [5], tags: ["management"] },
   { id: "bjmc_research", name: "Media Research Methodology", branchId: "bjmc", semesters: [5], tags: ["research"] },
   { id: "bjmc_docu", name: "Documentary Production", branchId: "bjmc", semesters: [5], tags: ["production"] },
   { id: "bjmc_data_journ", name: "Data Journalism", branchId: "bjmc", semesters: [5], tags: ["elective", "modern"] },

   // -------- SEMESTER 6 (Specialization) --------
   { id: "bjmc_media_mgmt", name: "Media Organization & Management", branchId: "bjmc", semesters: [6], tags: ["management"] },
   { id: "bjmc_global", name: "Global Media Scenario", branchId: "bjmc", semesters: [6], tags: ["theory"] },
   { id: "bjmc_sports", name: "Sports Journalism", branchId: "bjmc", semesters: [6], tags: ["elective"] },
   { id: "bjmc_fashion", name: "Fashion & Lifestyle Journalism", branchId: "bjmc", semesters: [6], tags: ["elective"] },
   { id: "bjmc_crime", name: "Crime & Court Reporting", branchId: "bjmc", semesters: [6], tags: ["elective"] },
   { id: "bjmc_project", name: "Final Research Project / Dissertation", branchId: "bjmc", semesters: [6], tags: ["project"] },

   /* =====================================================
       2. MULTIMEDIA, ANIMATION & VFX (B.Sc / Diploma)
       branchId: "multimedia"
      ===================================================== */

   // -------- SEMESTER 1 (Art Base) --------
   { id: "mm_art_fund", name: "Fundamentals of Art & Design", branchId: "multimedia", semesters: [1], tags: ["core", "art"] },
   { id: "mm_sketching", name: "Sketching & Drawing (Anatomy)", branchId: "multimedia", semesters: [1], tags: ["skill", "art"] },
   { id: "mm_comm_vis", name: "Visual Communication Basics", branchId: "multimedia", semesters: [1], tags: ["theory"] },
   { id: "mm_color", name: "Color Theory", branchId: "multimedia", semesters: [1], tags: ["theory"] },
   { id: "mm_digi_art", name: "Digital Art (Photoshop/Illustrator)", branchId: "multimedia", semesters: [1], tags: ["tech", "software"] },

   // -------- SEMESTER 2 (Design & 2D) --------
   { id: "mm_graphic", name: "Graphic Design Principles", branchId: "multimedia", semesters: [2], tags: ["core", "design"] },
   { id: "mm_2d_anim", name: "Classical & Digital 2D Animation", branchId: "multimedia", semesters: [2], tags: ["core", "animation"] },
   { id: "mm_typography", name: "Typography & Layout", branchId: "multimedia", semesters: [2], tags: ["design"] },
   { id: "mm_script", name: "Script Writing & Storyboarding", branchId: "multimedia", semesters: [2], tags: ["core", "pre-production"] },
   { id: "mm_principles", name: "12 Principles of Animation", branchId: "multimedia", semesters: [2], tags: ["theory"] },

   // -------- SEMESTER 3 (3D Basics) --------
   { id: "mm_3d_model", name: "3D Modeling (Maya/Blender)", branchId: "multimedia", semesters: [3], tags: ["core", "3d"] },
   { id: "mm_texturing", name: "Texturing & Shading", branchId: "multimedia", semesters: [3], tags: ["core", "3d"] },
   { id: "mm_audio", name: "Audio Editing & Sound Design", branchId: "multimedia", semesters: [3], tags: ["tech", "audio"] },
   { id: "mm_video_edit", name: "Video Editing & Compositing Basics", branchId: "multimedia", semesters: [3], tags: ["tech", "video"] },
   { id: "mm_clay", name: "Clay Modeling & Stop Motion", branchId: "multimedia", semesters: [3], tags: ["skill"] },

   // -------- SEMESTER 4 (3D Advanced) --------
   { id: "mm_3d_anim", name: "3D Character Animation", branchId: "multimedia", semesters: [4], tags: ["core", "animation"] },
   { id: "mm_lighting", name: "Lighting & Rendering", branchId: "multimedia", semesters: [4], tags: ["core", "3d"] },
   { id: "mm_rigging", name: "Character Rigging", branchId: "multimedia", semesters: [4], tags: ["tech", "3d"] },
   { id: "mm_motion_gfx", name: "Motion Graphics (After Effects)", branchId: "multimedia", semesters: [4], tags: ["tech", "video"] },
   { id: "mm_acting", name: "Acting for Animators", branchId: "multimedia", semesters: [4], tags: ["skill"] },

   // -------- SEMESTER 5 (VFX & Gaming) --------
   { id: "mm_vfx_fund", name: "Visual Effects (VFX) Fundamentals", branchId: "multimedia", semesters: [5], tags: ["core", "vfx"] },
   { id: "mm_compositing", name: "Advanced Compositing (Nuke/Fusion)", branchId: "multimedia", semesters: [5], tags: ["tech", "vfx"] },
   { id: "mm_game_design", name: "Game Design & Level Creation (Unity/Unreal)", branchId: "multimedia", semesters: [5], tags: ["elective", "gaming"] },
   { id: "mm_dynamics", name: "Dynamics & Simulation (Particles/Fluids)", branchId: "multimedia", semesters: [5], tags: ["advanced", "3d"] },
   { id: "mm_rotoscopy", name: "Rotoscopy & Matchmoving", branchId: "multimedia", semesters: [5], tags: ["tech", "vfx"] },

   // -------- SEMESTER 6 (Project) --------
   { id: "mm_project", name: "Final Capstone Project (Short Film/Game)", branchId: "multimedia", semesters: [6], tags: ["project"] },
   { id: "mm_portfolio", name: "Showreel & Portfolio Development", branchId: "multimedia", semesters: [6], tags: ["career"] },
   { id: "mm_marketing", name: "Media Marketing & Entrepreneurship", branchId: "multimedia", semesters: [6], tags: ["management"] },

   /* =====================================================
       3. VISUAL COMMUNICATION (B.Sc Viscom)
       branchId: "viscom"
      ===================================================== */
   { id: "vc_drawing", name: "Drawing & Anatomy", branchId: "viscom", semesters: [1], tags: ["art"] },
   { id: "vc_graphic", name: "Graphic Design", branchId: "viscom", semesters: [1], tags: ["design"] },
   { id: "vc_advertising", name: "Advertising Basics", branchId: "viscom", semesters: [2], tags: ["theory"] },
   { id: "vc_printing", name: "Printing Technology", branchId: "viscom", semesters: [2], tags: ["tech"] },
   { id: "vc_packaging", name: "Packaging Design", branchId: "viscom", semesters: [3], tags: ["design"] },
   { id: "vc_uiux", name: "UI/UX Design", branchId: "viscom", semesters: [3], tags: ["tech"] },
   { id: "vc_commercial_art", name: "Commercial Art", branchId: "viscom", semesters: [4], tags: ["art"] },
   { id: "vc_branding", name: "Branding & Identity", branchId: "viscom", semesters: [5], tags: ["marketing"] },

   /* =====================================================
       4. MASTER OF MASS COMMUNICATION (MA-JMC / MMC)
       branchId: "ma_jmc"
      ===================================================== */
   { id: "ma_comm_theory", name: "Communication Theories & Models", branchId: "ma_jmc", semesters: [1], tags: ["pg", "theory"] },
   { id: "ma_intl_comm", name: "International Communication", branchId: "ma_jmc", semesters: [1], tags: ["pg", "global"] },
   { id: "ma_media_mgmt", name: "Media Management & Entrepreneurship", branchId: "ma_jmc", semesters: [2], tags: ["pg", "management"] },
   { id: "ma_adv_research", name: "Advanced Media Research", branchId: "ma_jmc", semesters: [2], tags: ["pg", "research"] },
   { id: "ma_film_studies", name: "Film Studies & Criticism", branchId: "ma_jmc", semesters: [3], tags: ["pg", "cinema"] },
   { id: "ma_health_comm", name: "Health Communication", branchId: "ma_jmc", semesters: [3], tags: ["pg", "elective"] },
   { id: "ma_science_comm", name: "Science & Env Communication", branchId: "ma_jmc", semesters: [3], tags: ["pg", "elective"] },
   { id: "ma_dissertation", name: "Master's Dissertation", branchId: "ma_jmc", semesters: [4], tags: ["pg", "project"] },

   /* =====================================================
       5. FILM STUDIES & DIRECTION (Specialization)
       branchId: "film_studies"
      ===================================================== */
   { id: "film_history", name: "History of World Cinema", branchId: "film_studies", semesters: [1], tags: ["theory"] },
   { id: "film_direction", name: "Film Direction Basics", branchId: "film_studies", semesters: [1], tags: ["core"] },
   { id: "film_screenplay", name: "Screenplay Writing", branchId: "film_studies", semesters: [2], tags: ["writing"] },
   { id: "film_cinematography", name: "Cinematography & Lighting", branchId: "film_studies", semesters: [2], tags: ["tech"] },
   { id: "film_editing", name: "Film Editing (Avid/Premiere)", branchId: "film_studies", semesters: [3], tags: ["tech"] },
   { id: "film_sound", name: "Sound Design for Film", branchId: "film_studies", semesters: [3], tags: ["audio"] },
   { id: "film_production", name: "Film Production Management", branchId: "film_studies", semesters: [4], tags: ["management"] },


   /* =====================================================
       1. BACHELOR OF PHYSICAL EDUCATION (B.P.Ed)
       branchId: "bped"
       (Standard 2-Year / 4-Semester NCTE Curriculum)
      ===================================================== */

   // -------- SEMESTER 1 (Foundations) --------
   { id: "bped_hist_found", name: "History, Principles & Foundation of Physical Education", branchId: "bped", semesters: [1], tags: ["core", "theory"] },
   { id: "bped_anatomy", name: "Anatomy & Physiology", branchId: "bped", semesters: [1], tags: ["core", "science"] },
   { id: "bped_health_edu", name: "Health Education & Environmental Studies", branchId: "bped", semesters: [1], tags: ["core", "health"] },
   { id: "bped_olympic", name: "Olympic Movement", branchId: "bped", semesters: [1], tags: ["elective", "history"] },
   { id: "bped_officiating", name: "Officiating & Coaching", branchId: "bped", semesters: [1], tags: ["elective", "coaching"] },
   { id: "bped_track_field_1", name: "Track and Field (Running Events)", branchId: "bped", semesters: [1], tags: ["practical", "athletics"] },

   // -------- SEMESTER 2 (Management & Tech) --------
   { id: "bped_yoga", name: "Yoga Education", branchId: "bped", semesters: [2], tags: ["core", "yoga"] },
   { id: "bped_edu_tech", name: "Educational Technology & Methods of Teaching", branchId: "bped", semesters: [2], tags: ["core", "pedagogy"] },
   { id: "bped_org_admin", name: "Organization & Administration in PE", branchId: "bped", semesters: [2], tags: ["core", "management"] },
   { id: "bped_nutrition", name: "Sports Nutrition & Weight Management", branchId: "bped", semesters: [2], tags: ["elective", "health"] },
   { id: "bped_curriculum", name: "Curriculum Design", branchId: "bped", semesters: [2], tags: ["elective"] },
   { id: "bped_track_field_2", name: "Track and Field (Jumping/Throwing)", branchId: "bped", semesters: [2], tags: ["practical", "athletics"] },

   // -------- SEMESTER 3 (Training & Psychology) --------
   { id: "bped_training", name: "Sports Training", branchId: "bped", semesters: [3], tags: ["core", "training"] },
   { id: "bped_comp_app", name: "Computer Applications in Physical Education", branchId: "bped", semesters: [3], tags: ["core", "tech"] },
   { id: "bped_psych", name: "Sports Psychology & Sociology", branchId: "bped", semesters: [3], tags: ["core", "psychology"] },
   { id: "bped_medicine", name: "Sports Medicine, Physiotherapy & Rehab", branchId: "bped", semesters: [3], tags: ["elective", "medical"] },
   { id: "bped_team_games", name: "Team Games (Football/Hockey/Cricket)", branchId: "bped", semesters: [3], tags: ["practical"] },

   // -------- SEMESTER 4 (Biomechanics & Research) --------
   { id: "bped_measure", name: "Measurement and Evaluation in PE", branchId: "bped", semesters: [4], tags: ["core", "stats"] },
   { id: "bped_kinesiology", name: "Kinesiology & Biomechanics", branchId: "bped", semesters: [4], tags: ["core", "science"] },
   { id: "bped_research", name: "Research & Statistics in Physical Education", branchId: "bped", semesters: [4], tags: ["core", "research"] },
   { id: "bped_mgmt", name: "Sports Management", branchId: "bped", semesters: [4], tags: ["elective", "management"] },
   { id: "bped_practical_teaching", name: "Practical Teaching (Lesson Plans)", branchId: "bped", semesters: [4], tags: ["practical", "pedagogy"] },

   /* =====================================================
       2. SPORTS MANAGEMENT (BBA / MBA / PG Diploma)
       branchId: "sports_management"
      ===================================================== */

   // -------- SEMESTER 1 (Basics) --------
   { id: "sm_fund", name: "Fundamentals of Sports Management", branchId: "sports_management", semesters: [1], tags: ["core", "theory"] },
   { id: "sm_ob", name: "Organizational Behavior in Sports", branchId: "sports_management", semesters: [1], tags: ["core", "hr"] },
   { id: "sm_eco", name: "Economics of Sports", branchId: "sports_management", semesters: [1], tags: ["core", "finance"] },
   { id: "sm_history", name: "History & Heritage of Sports", branchId: "sports_management", semesters: [1], tags: ["theory"] },
   { id: "sm_comm", name: "Business Communication & Soft Skills", branchId: "sports_management", semesters: [1], tags: ["soft_skills"] },

   // -------- SEMESTER 2 (Marketing & Finance) --------
   { id: "sm_marketing", name: "Sports Marketing", branchId: "sports_management", semesters: [2], tags: ["core", "marketing"] },
   { id: "sm_finance", name: "Financial Management in Sports", branchId: "sports_management", semesters: [2], tags: ["core", "finance"] },
   { id: "sm_consumer", name: "Fan Behavior & Consumer Culture", branchId: "sports_management", semesters: [2], tags: ["theory", "marketing"] },
   { id: "sm_ethics", name: "Ethics & Integrity in Sports", branchId: "sports_management", semesters: [2], tags: ["ethics"] },
   { id: "sm_it", name: "IT Applications in Sports", branchId: "sports_management", semesters: [2], tags: ["tech"] },

   // -------- SEMESTER 3 (Operations & Law) --------
   { id: "sm_law", name: "Sports Law & Contracts", branchId: "sports_management", semesters: [3], tags: ["core", "law"] },
   { id: "sm_facility", name: "Facility & Venue Management", branchId: "sports_management", semesters: [3], tags: ["core", "operations"] },
   { id: "sm_event", name: "Sports Event Management", branchId: "sports_management", semesters: [3], tags: ["core", "events"] },
   { id: "sm_media", name: "Sports Media, PR & Journalism", branchId: "sports_management", semesters: [3], tags: ["elective", "media"] },
   { id: "sm_sponsorship", name: "Sponsorship & Endorsement", branchId: "sports_management", semesters: [3], tags: ["marketing"] },

   // -------- SEMESTER 4 (Strategy & Analytics) --------
   { id: "sm_analytics", name: "Sports Analytics & Data Science", branchId: "sports_management", semesters: [4], tags: ["core", "tech"] },
   { id: "sm_entrepreneur", name: "Entrepreneurship in Sports", branchId: "sports_management", semesters: [4], tags: ["core", "business"] },
   { id: "sm_digital", name: "Digital Marketing in Sports", branchId: "sports_management", semesters: [4], tags: ["marketing", "digital"] },
   { id: "sm_retail", name: "Sports Retail & Merchandising", branchId: "sports_management", semesters: [4], tags: ["elective", "retail"] },
   { id: "sm_project", name: "Final Project / Internship", branchId: "sports_management", semesters: [4], tags: ["project"] },


   /* =====================================================
       1. BACHELOR OF EDUCATION (B.Ed)
       branchId: "bed"
       (2 Years / 4 Semesters) - NCTE Standard
      ===================================================== */

   // -------- SEMESTER 1 (Perspectives in Education) --------
   { id: "bed_childhood", name: "Childhood and Growing Up", branchId: "bed", semesters: [1], tags: ["core", "psychology"] },
   { id: "bed_india", name: "Contemporary India and Education", branchId: "bed", semesters: [1], tags: ["core", "sociology"] },
   { id: "bed_lang_curr", name: "Language Across the Curriculum", branchId: "bed", semesters: [1], tags: ["core", "literacy"] },
   { id: "bed_disciplines", name: "Understanding Disciplines and Subjects", branchId: "bed", semesters: [1], tags: ["core", "theory"] },
   { id: "bed_epc1", name: "EPC 1: Reading and Reflecting on Texts", branchId: "bed", semesters: [1], tags: ["practicum", "skill"] },

   // -------- SEMESTER 2 (Learning & Pedagogy) --------
   { id: "bed_learning", name: "Learning and Teaching", branchId: "bed", semesters: [2], tags: ["core", "psychology"] },
   { id: "bed_assess", name: "Assessment for Learning", branchId: "bed", semesters: [2], tags: ["core", "evaluation"] },
   { id: "bed_epc2", name: "EPC 2: Drama and Art in Education", branchId: "bed", semesters: [2], tags: ["practicum", "arts"] },

   // --- Pedagogy of School Subjects (Methodology) ---
   // Students choose 2 based on their graduation stream
   { id: "bed_ped_eng", name: "Pedagogy of English", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "language"] },
   { id: "bed_ped_hindi", name: "Pedagogy of Hindi", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "language"] },
   { id: "bed_ped_sanskrit", name: "Pedagogy of Sanskrit", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "language"] },
   { id: "bed_ped_math", name: "Pedagogy of Mathematics", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "math"] },
   { id: "bed_ped_phy_sci", name: "Pedagogy of Physical Science (Physics/Chem)", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "science"] },
   { id: "bed_ped_bio_sci", name: "Pedagogy of Biological Science", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "science"] },
   { id: "bed_ped_soc_sci", name: "Pedagogy of Social Sciences (Hist/Geo/Pol)", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "social"] },
   { id: "bed_ped_comm", name: "Pedagogy of Commerce", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "commerce"] },
   { id: "bed_ped_cs", name: "Pedagogy of Computer Science", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "tech"] },
   { id: "bed_ped_home", name: "Pedagogy of Home Science", branchId: "bed", semesters: [2, 3], tags: ["pedagogy", "vocational"] },

   // -------- SEMESTER 3 (Field Engagement) --------
   { id: "bed_internship", name: "School Internship (16 Weeks)", branchId: "bed", semesters: [3], tags: ["internship", "training"] },
   { id: "bed_epc3", name: "EPC 3: Critical Understanding of ICT", branchId: "bed", semesters: [3], tags: ["practicum", "tech"] },
   { id: "bed_action_res", name: "Action Research Project", branchId: "bed", semesters: [3], tags: ["project", "research"] },

   // -------- SEMESTER 4 (Issues & Electives) --------
   { id: "bed_gender", name: "Gender, School and Society", branchId: "bed", semesters: [4], tags: ["core", "sociology"] },
   { id: "bed_knowledge", name: "Knowledge and Curriculum", branchId: "bed", semesters: [4], tags: ["core", "theory"] },
   { id: "bed_inclusive", name: "Creating an Inclusive School", branchId: "bed", semesters: [4], tags: ["core", "special_ed"] },
   { id: "bed_epc4", name: "EPC 4: Understanding the Self", branchId: "bed", semesters: [4], tags: ["practicum", "psychology"] },

   // B.Ed Electives
   { id: "bed_elec_guidance", name: "Guidance and Counseling", branchId: "bed", semesters: [4], tags: ["elective"] },
   { id: "bed_elec_health", name: "Health and Physical Education", branchId: "bed", semesters: [4], tags: ["elective"] },
   { id: "bed_elec_env", name: "Environmental Education", branchId: "bed", semesters: [4], tags: ["elective"] },
   { id: "bed_elec_peace", name: "Peace Education", branchId: "bed", semesters: [4], tags: ["elective"] },
   { id: "bed_elec_voc", name: "Work Education / Nai Talim", branchId: "bed", semesters: [4], tags: ["elective"] },

   /* =====================================================
       2. MASTER OF EDUCATION (M.Ed)
       branchId: "med"
       (2 Years / 4 Semesters)
      ===================================================== */

   // -------- SEMESTER 1 (Advanced Core) --------
   { id: "med_psych", name: "Psychology of Learning & Development", branchId: "med", semesters: [1], tags: ["core", "psychology"] },
   { id: "med_hist", name: "History & Political Economy of Education", branchId: "med", semesters: [1], tags: ["core", "history"] },
   { id: "med_studies", name: "Education Studies", branchId: "med", semesters: [1], tags: ["core", "theory"] },
   { id: "med_research_1", name: "Introduction to Research Methods", branchId: "med", semesters: [1], tags: ["core", "research"] },
   { id: "med_comm", name: "Communication & Expository Writing", branchId: "med", semesters: [1], tags: ["practicum"] },

   // -------- SEMESTER 2 (Philosophy & Sociology) --------
   { id: "med_philo", name: "Philosophy of Education", branchId: "med", semesters: [2], tags: ["core", "philosophy"] },
   { id: "med_socio", name: "Sociology of Education", branchId: "med", semesters: [2], tags: ["core", "sociology"] },
   { id: "med_curr", name: "Curriculum Studies", branchId: "med", semesters: [2], tags: ["core", "curriculum"] },
   { id: "med_teach_edu_1", name: "Teacher Education - I (Pre-Service)", branchId: "med", semesters: [2], tags: ["core", "training"] },
   { id: "med_dissertation_1", name: "Dissertation Proposal", branchId: "med", semesters: [2], tags: ["research"] },

   // -------- SEMESTER 3 (Specialization) --------
   { id: "med_research_2", name: "Advanced Educational Research & Statistics", branchId: "med", semesters: [3], tags: ["core", "research"] },
   { id: "med_teach_edu_2", name: "Teacher Education - II (In-Service)", branchId: "med", semesters: [3], tags: ["core", "training"] },
   { id: "med_elem_spl", name: "Elementary Education (Specialization)", branchId: "med", semesters: [3], tags: ["specialization"] },
   { id: "med_sec_spl", name: "Secondary Education (Specialization)", branchId: "med", semesters: [3], tags: ["specialization"] },
   { id: "med_internship", name: "Internship in TEI (Teacher Ed Inst)", branchId: "med", semesters: [3], tags: ["internship"] },

   // -------- SEMESTER 4 (Management & Electives) --------
   { id: "med_mgmt", name: "Educational Management, Admin & Leadership", branchId: "med", semesters: [4], tags: ["core", "management"] },
   { id: "med_policy", name: "Public Policy & Politics in Education", branchId: "med", semesters: [4], tags: ["specialization"] },
   { id: "med_et", name: "Educational Technology & ICT", branchId: "med", semesters: [4], tags: ["specialization"] },
   { id: "med_special_edu", name: "Inclusive & Special Education", branchId: "med", semesters: [4], tags: ["specialization"] },
   { id: "med_thesis", name: "Dissertation & Viva Voce", branchId: "med", semesters: [4], tags: ["project"] },

   /* =====================================================
       3. DIPLOMA IN ELEMENTARY EDUCATION (D.El.Ed / BTC)
       branchId: "deled"
       (2 Years) - For Primary Teachers (Class 1-8)
      ===================================================== */

   // -------- YEAR 1 --------
   { id: "deled_child", name: "Childhood and Development of Children", branchId: "deled", years: [1], tags: ["core", "psychology"] },
   { id: "deled_society", name: "Contemporary Society", branchId: "deled", years: [1], tags: ["core", "sociology"] },
   { id: "deled_edu_society", name: "Education, Society, Curriculum and Learners", branchId: "deled", years: [1], tags: ["core"] },
   { id: "deled_self", name: "Towards Understanding the Self", branchId: "deled", years: [1], tags: ["core"] },
   { id: "deled_ped_eng_1", name: "Pedagogy of English Language", branchId: "deled", years: [1], tags: ["pedagogy"] },
   { id: "deled_ped_math_1", name: "Pedagogy of Mathematics (Primary)", branchId: "deled", years: [1], tags: ["pedagogy"] },
   { id: "deled_ped_evs", name: "Pedagogy of Environmental Studies", branchId: "deled", years: [1], tags: ["pedagogy"] },
   { id: "deled_creative", name: "Work and Education / Creative Drama", branchId: "deled", years: [1], tags: ["practicum"] },

   // -------- YEAR 2 --------
   { id: "deled_cognition", name: "Cognition, Learning and Socio-Cultural Context", branchId: "deled", years: [2], tags: ["core", "psychology"] },
   { id: "deled_leadership", name: "School Culture, Leadership and Change", branchId: "deled", years: [2], tags: ["management"] },
   { id: "deled_diversity", name: "Diversity, Gender and Inclusive Education", branchId: "deled", years: [2], tags: ["core"] },
   { id: "deled_ped_eng_2", name: "Pedagogy of English (Upper Primary)", branchId: "deled", years: [2], tags: ["pedagogy"] },
   { id: "deled_ped_soc", name: "Pedagogy of Social Science", branchId: "deled", years: [2], tags: ["pedagogy"] },
   { id: "deled_ped_sci", name: "Pedagogy of Science", branchId: "deled", years: [2], tags: ["pedagogy"] },
   { id: "deled_sip", name: "School Internship Programme (SIP)", branchId: "deled", years: [2], tags: ["internship"] },

   /* =====================================================
       4. BACHELOR OF ELEMENTARY EDUCATION (B.El.Ed)
       branchId: "beled"
       (4 Years Integrated) - e.g., Delhi University Model
      ===================================================== */

   // -------- YEAR 1 --------
   { id: "beled_child_dev", name: "Child Development", branchId: "beled", years: [1], tags: ["core"] },
   { id: "beled_nature_lang", name: "Nature of Language", branchId: "beled", years: [1], tags: ["core"] },
   { id: "beled_core_math", name: "Core Mathematics", branchId: "beled", years: [1], tags: ["subject_content"] },
   { id: "beled_core_nat_sci", name: "Core Natural Sciences", branchId: "beled", years: [1], tags: ["subject_content"] },
   { id: "beled_core_soc_sci", name: "Core Social Sciences", branchId: "beled", years: [1], tags: ["subject_content"] },
   { id: "beled_craft_1", name: "Craft, Participatory Work & Performing Arts", branchId: "beled", years: [1], tags: ["practicum"] },

   // -------- YEAR 2 --------
   { id: "beled_learning", name: "Cognition and Learning", branchId: "beled", years: [2], tags: ["psychology"] },
   { id: "beled_lang_acq", name: "Language Acquisition", branchId: "beled", years: [2], tags: ["linguistics"] },
   { id: "beled_human_rel", name: "Human Relations and Communications", branchId: "beled", years: [2], tags: ["core"] },
   { id: "beled_eng_1", name: "Liberal Course: English I", branchId: "beled", years: [2], tags: ["liberal"] },
   { id: "beled_math_1", name: "Liberal Course: Mathematics I", branchId: "beled", years: [2], tags: ["liberal"] },
   { id: "beled_sci_1", name: "Liberal Course: Science I", branchId: "beled", years: [2], tags: ["liberal"] },

   // -------- YEAR 3 --------
   { id: "beled_school_plan", name: "School Planning and Management", branchId: "beled", years: [3], tags: ["management"] },
   { id: "beled_ped_evs", name: "Pedagogy of Environmental Studies", branchId: "beled", years: [3], tags: ["pedagogy"] },
   { id: "beled_logico", name: "Logico-Mathematics Education", branchId: "beled", years: [3], tags: ["pedagogy"] },
   { id: "beled_ped_lang", name: "Pedagogy of Language", branchId: "beled", years: [3], tags: ["pedagogy"] },
   { id: "beled_liberal_2", name: "Liberal Course II (Subject Specific)", branchId: "beled", years: [3], tags: ["liberal"] },

   // -------- YEAR 4 --------
   { id: "beled_curr_studies", name: "Curriculum Studies", branchId: "beled", years: [4], tags: ["core"] },
   { id: "beled_gender", name: "Gender and Schooling", branchId: "beled", years: [4], tags: ["sociology"] },
   { id: "beled_ped_opt", name: "Pedagogy Option (Math/Science/Social Sci)", branchId: "beled", years: [4], tags: ["pedagogy"] },
   { id: "beled_comp_edu", name: "Computer Education", branchId: "beled", years: [4], tags: ["tech"] },
   { id: "beled_internship", name: "School Internship", branchId: "beled", years: [4], tags: ["internship"] },

   /* =====================================================
       5. NURSERY TEACHER TRAINING (NTT / ECCE)
       branchId: "ntt"
       (1 or 2 Year Diploma)
      ===================================================== */
   { id: "ntt_child_psy", name: "Child Psychology & Development", branchId: "ntt", semesters: [1], tags: ["core"] },
   { id: "ntt_child_care", name: "Child Care & Health", branchId: "ntt", semesters: [1], tags: ["health"] },
   { id: "ntt_teaching_method", name: "Methods of Teaching (Playway/Montessori)", branchId: "ntt", semesters: [1], tags: ["pedagogy"] },
   { id: "ntt_school_org", name: "School Organization & Administration", branchId: "ntt", semesters: [1], tags: ["management"] },
   { id: "ntt_arts_crafts", name: "Art & Craft for Pre-Primary", branchId: "ntt", semesters: [2], tags: ["creative"] },
   { id: "ntt_teaching_aids", name: "Preparation of Teaching Aids", branchId: "ntt", semesters: [2], tags: ["practicum"] },
   { id: "ntt_lesson_plan", name: "Lesson Planning & Teaching Practice", branchId: "ntt", semesters: [2], tags: ["training"] },
   { id: "ntt_nutrition", name: "Nutrition for Children", branchId: "ntt", semesters: [2], tags: ["health"] },

   /* =====================================================
       6. INTEGRATED B.Ed (B.Sc. B.Ed / B.A. B.Ed)
       branchId: "integrated_bed"
       (4 Years) - ITEP (Integrated Teacher Education Programme)
      ===================================================== */
   // Note: Sem 1-4 focus heavily on Core Subject (Physics/Hist etc.).
   // Education subjects start appearing alongside or intensify in later years.

   // Education Component Subjects:
   { id: "itp_childhood", name: "Childhood & Growing Up (ITEP)", branchId: "integrated_bed", semesters: [1, 2], tags: ["education"] },
   { id: "itp_contemp", name: "Contemporary India & Education", branchId: "integrated_bed", semesters: [1, 2], tags: ["education"] },
   { id: "itp_lang", name: "Language & Communication", branchId: "integrated_bed", semesters: [1], tags: ["education"] },
   { id: "itp_learning", name: "Learning & Teaching", branchId: "integrated_bed", semesters: [3, 4], tags: ["education"] },
   { id: "itp_assessment", name: "Assessment for Learning", branchId: "integrated_bed", semesters: [5], tags: ["education"] },
   { id: "itp_pedagogy_1", name: "Pedagogy of School Subject I", branchId: "integrated_bed", semesters: [5, 6], tags: ["pedagogy"] },
   { id: "itp_pedagogy_2", name: "Pedagogy of School Subject II", branchId: "integrated_bed", semesters: [5, 6], tags: ["pedagogy"] },
   { id: "itp_knowledge", name: "Knowledge & Curriculum", branchId: "integrated_bed", semesters: [6], tags: ["education"] },
   { id: "itp_inclusive", name: "Creating an Inclusive School", branchId: "integrated_bed", semesters: [7], tags: ["education"] },
   { id: "itp_internship", name: "School Internship (16 Weeks)", branchId: "integrated_bed", semesters: [7, 8], tags: ["internship"] },
   { id: "itp_gender", name: "Gender, School & Society", branchId: "integrated_bed", semesters: [8], tags: ["education"] },
   { id: "itp_ict", name: "ICT in Education", branchId: "integrated_bed", semesters: [8], tags: ["tech"] },


   /* =====================================================
       1. NDA (National Defence Academy)
       branchId: "nda"
       (Conducting Body: UPSC | Frequency: Twice a year)
      ===================================================== */
   // Paper I: Mathematics (300 Marks)
   { id: "nda_math_alg", name: "NDA Mathematics: Algebra & Matrices", branchId: "nda", level: "exam", tags: ["core", "math"] },
   { id: "nda_math_trig", name: "NDA Mathematics: Trigonometry", branchId: "nda", level: "exam", tags: ["core", "math"] },
   { id: "nda_math_calc", name: "NDA Mathematics: Calculus & Diff. Equations", branchId: "nda", level: "exam", tags: ["core", "math"] },
   { id: "nda_math_stat", name: "NDA Mathematics: Statistics & Probability", branchId: "nda", level: "exam", tags: ["core", "math"] },

   // Paper II: General Ability Test (GAT) (600 Marks)
   { id: "nda_eng", name: "GAT: English (Grammar, Vocab, Comprehension)", branchId: "nda", level: "exam", tags: ["language"] },
   { id: "nda_phy", name: "GAT: Physics", branchId: "nda", level: "exam", tags: ["science"] },
   { id: "nda_chem", name: "GAT: Chemistry", branchId: "nda", level: "exam", tags: ["science"] },
   { id: "nda_bio", name: "GAT: General Science (Biology)", branchId: "nda", level: "exam", tags: ["science"] },
   { id: "nda_hist", name: "GAT: History & Freedom Movement", branchId: "nda", level: "exam", tags: ["gs"] },
   { id: "nda_geo", name: "GAT: Geography", branchId: "nda", level: "exam", tags: ["gs"] },
   { id: "nda_current", name: "GAT: Current Events", branchId: "nda", level: "exam", tags: ["gk"] },

   /* =====================================================
       2. CDS (Combined Defence Services)
       branchId: "cds"
       (Conducting Body: UPSC | For IMA, INA, AFA, OTA)
      ===================================================== */
   // Paper I: English
   { id: "cds_eng", name: "English (Grammar & Comprehension)", branchId: "cds", level: "exam", tags: ["language"] },

   // Paper II: General Knowledge
   { id: "cds_gk_sci", name: "General Knowledge: Science", branchId: "cds", level: "exam", tags: ["gs"] },
   { id: "cds_gk_hum", name: "General Knowledge: History/Polity/Geo", branchId: "cds", level: "exam", tags: ["gs"] },
   { id: "cds_gk_ca", name: "General Knowledge: Current Affairs", branchId: "cds", level: "exam", tags: ["gs"] },

   // Paper III: Elementary Mathematics (Not for OTA)
   { id: "cds_math_arith", name: "Elementary Maths: Arithmetic & Number Systems", branchId: "cds", level: "exam", tags: ["math"] },
   { id: "cds_math_alg", name: "Elementary Maths: Algebra & Trigonometry", branchId: "cds", level: "exam", tags: ["math"] },
   { id: "cds_math_geom", name: "Elementary Maths: Geometry & Mensuration", branchId: "cds", level: "exam", tags: ["math"] },
   { id: "cds_math_stats", name: "Elementary Maths: Statistics", branchId: "cds", level: "exam", tags: ["math"] },

   /* =====================================================
       3. AFCAT (Air Force Common Admission Test)
       branchId: "afcat"
       (Conducting Body: IAF)
      ===================================================== */
   // General Awareness
   { id: "afcat_ga", name: "General Awareness (History, Sports, Art, Culture)", branchId: "afcat", level: "exam", tags: ["gk"] },

   // Verbal Ability
   { id: "afcat_verbal", name: "Verbal Ability in English", branchId: "afcat", level: "exam", tags: ["language"] },

   // Numerical Ability
   { id: "afcat_math", name: "Numerical Ability (Decimal, Fraction, Profit/Loss)", branchId: "afcat", level: "exam", tags: ["math"] },

   // Reasoning
   { id: "afcat_reasoning", name: "Reasoning & Military Aptitude Test", branchId: "afcat", level: "exam", tags: ["logical"] },

   // EKT (Engineering Knowledge Test) - For Technical Duty
   { id: "afcat_ekt_mech", name: "EKT: Mechanical Engineering", branchId: "afcat", level: "exam", tags: ["technical"] },
   { id: "afcat_ekt_cse", name: "EKT: Computer Science Engineering", branchId: "afcat", level: "exam", tags: ["technical"] },
   { id: "afcat_ekt_eee", name: "EKT: Electrical & Electronics Engineering", branchId: "afcat", level: "exam", tags: ["technical"] },

   /* =====================================================
       4. CAPF (Central Armed Police Forces - AC)
       branchId: "capf"
       (Conducting Body: UPSC | Post: Assistant Commandant)
      ===================================================== */
   // Paper I: General Ability & Intelligence
   { id: "capf_p1_reasoning", name: "General Mental Ability", branchId: "capf", level: "exam", tags: ["logical"] },
   { id: "capf_p1_sci", name: "General Science", branchId: "capf", level: "exam", tags: ["science"] },
   { id: "capf_p1_polity", name: "Indian Polity & Economy", branchId: "capf", level: "exam", tags: ["gs"] },
   { id: "capf_p1_hist", name: "History of India", branchId: "capf", level: "exam", tags: ["gs"] },
   { id: "capf_p1_geo", name: "Indian & World Geography", branchId: "capf", level: "exam", tags: ["gs"] },

   // Paper II: General Studies, Essay & Comprehension
   { id: "capf_p2_essay", name: "Essay Writing (Hindi/English)", branchId: "capf", level: "exam", tags: ["descriptive"] },
   { id: "capf_p2_comp", name: "Comprehension & Precise Writing", branchId: "capf", level: "exam", tags: ["language"] },
   { id: "capf_p2_counter", name: "Counter Argument & Report Writing", branchId: "capf", level: "exam", tags: ["skill"] },

   /* =====================================================
       5. AGNIVEER (Army / Navy / Air Force)
       branchId: "agniveer"
       (Soldier Entry Scheme)
      ===================================================== */
   // Common Subjects
   { id: "agni_gk", name: "General Knowledge & Current Affairs", branchId: "agniveer", level: "exam", tags: ["gk"] },
   { id: "agni_sci_gen", name: "General Science (10th Level)", branchId: "agniveer", level: "exam", tags: ["science"] },
   { id: "agni_math_gen", name: "Mathematics (10th Level - Arithmetic)", branchId: "agniveer", level: "exam", tags: ["math"] },
   { id: "agni_reasoning", name: "Logical Reasoning", branchId: "agniveer", level: "exam", tags: ["logical"] },

   // Technical / Air Force X Group / Navy SSR
   { id: "agni_phy_tech", name: "Physics (10+2 Level)", branchId: "agniveer", level: "exam", tags: ["science", "tech"] },
   { id: "agni_math_tech", name: "Mathematics (10+2 Level - Calc/Trig)", branchId: "agniveer", level: "exam", tags: ["math", "tech"] },
   { id: "agni_eng_tech", name: "English (Grammar & Usage)", branchId: "agniveer", level: "exam", tags: ["language"] },

   // Air Force Y Group
   { id: "agni_raga", name: "RAGA (Reasoning & General Awareness)", branchId: "agniveer", level: "exam", tags: ["aptitude"] },

   /* =====================================================
       6. INDIAN COAST GUARD (ICG)
       branchId: "icg"
       (Navik DB, Navik GD, Yantrik)
      ===================================================== */
   // Section I (Common for all)
   { id: "icg_s1_math", name: "Section I: Maths (Class 10)", branchId: "icg", level: "exam", tags: ["math"] },
   { id: "icg_s1_sci", name: "Section I: Science (Class 10)", branchId: "icg", level: "exam", tags: ["science"] },
   { id: "icg_s1_eng", name: "Section I: English", branchId: "icg", level: "exam", tags: ["language"] },
   { id: "icg_s1_reason", name: "Section I: Reasoning", branchId: "icg", level: "exam", tags: ["logical"] },

   // Section II (Navik GD)
   { id: "icg_s2_phy", name: "Section II: Physics (Class 12)", branchId: "icg", level: "exam", tags: ["science"] },
   { id: "icg_s2_math", name: "Section II: Maths (Class 12)", branchId: "icg", level: "exam", tags: ["math"] },

   // Section III / IV / V (Yantrik - Engineering)
   { id: "icg_electrical", name: "Section III: Electrical Engineering", branchId: "icg", level: "exam", tags: ["technical"] },
   { id: "icg_electronics", name: "Section IV: Electronics Engineering", branchId: "icg", level: "exam", tags: ["technical"] },
   { id: "icg_mechanical", name: "Section V: Mechanical Engineering", branchId: "icg", level: "exam", tags: ["technical"] },

   /* =====================================================
       7. INDIAN NAVY ENTRANCE TEST (INET)
       branchId: "inet"
       (Officer Entry)
      ===================================================== */
   { id: "inet_eng", name: "English Proficiency", branchId: "inet", level: "exam", tags: ["language"] },
   { id: "inet_reasoning", name: "Reasoning & Numerical Ability", branchId: "inet", level: "exam", tags: ["aptitude"] },
   { id: "inet_sci", name: "General Science", branchId: "inet", level: "exam", tags: ["science"] },
   { id: "inet_math", name: "Mathematical Aptitude", branchId: "inet", level: "exam", tags: ["math"] },
   { id: "inet_gk", name: "General Knowledge", branchId: "inet", level: "exam", tags: ["gk"] },

   /* =====================================================
       8. SSB INTERVIEW (Service Selection Board)
       (Crucial for NDA, CDS, AFCAT, INET qualifiers)
      ===================================================== */
   { id: "ssb_screening", name: "SSB Screening Test (OIR & PPDT)", branchId: "nda", level: "interview", tags: ["ssb"] },
   { id: "ssb_psych", name: "SSB Psychological Tests (TAT, WAT, SRT)", branchId: "nda", level: "interview", tags: ["ssb", "psych"] },
   { id: "ssb_gto", name: "SSB GTO Tasks (Group Testing)", branchId: "nda", level: "interview", tags: ["ssb", "physical"] },
   { id: "ssb_interview", name: "SSB Personal Interview", branchId: "nda", level: "interview", tags: ["ssb", "soft_skills"] },
   { id: "ssb_conference", name: "SSB Conference Prep", branchId: "nda", level: "interview", tags: ["ssb"] },

   /* =====================================================
       1. UPSC CIVIL SERVICES (IAS / IPS / IFS)
       branchId: "upsc_cse"
      ===================================================== */

   // --- Prelims (Objective) ---
   { id: "upsc_gs1_pre", name: "Prelims GS I: History, Geo, Polity, Eco", branchId: "upsc_cse", level: "prelims", tags: ["gs", "core"] },
   { id: "upsc_csat", name: "Prelims GS II: CSAT (Aptitude & Reasoning)", branchId: "upsc_cse", level: "prelims", tags: ["math", "logic"] },

   // --- Mains (Subjective) ---
   { id: "upsc_essay", name: "Mains: Essay Writing", branchId: "upsc_cse", level: "mains", tags: ["writing"] },
   { id: "upsc_gs1_mains", name: "GS I: Indian Heritage, History, Geography & Society", branchId: "upsc_cse", level: "mains", tags: ["gs"] },
   { id: "upsc_gs2_mains", name: "GS II: Governance, Constitution, Polity, Social Justice & IR", branchId: "upsc_cse", level: "mains", tags: ["gs"] },
   { id: "upsc_gs3_mains", name: "GS III: Tech, Eco Dev, Bio-diversity, Security & Disaster Mgmt", branchId: "upsc_cse", level: "mains", tags: ["gs"] },
   { id: "upsc_gs4_mains", name: "GS IV: Ethics, Integrity and Aptitude", branchId: "upsc_cse", level: "mains", tags: ["ethics"] },
   { id: "upsc_lang_comp", name: "Compulsory Indian Language & English", branchId: "upsc_cse", level: "mains", tags: ["language"] },

   // --- Mains Optionals (Popular Choices) ---
   { id: "upsc_opt_pubad", name: "Optional: Public Administration", branchId: "upsc_cse", level: "optional", tags: ["optional"] },
   { id: "upsc_opt_socio", name: "Optional: Sociology", branchId: "upsc_cse", level: "optional", tags: ["optional"] },
   { id: "upsc_opt_geo", name: "Optional: Geography", branchId: "upsc_cse", level: "optional", tags: ["optional"] },
   { id: "upsc_opt_psir", name: "Optional: PSIR (Pol Science & IR)", branchId: "upsc_cse", level: "optional", tags: ["optional"] },
   { id: "upsc_opt_anthro", name: "Optional: Anthropology", branchId: "upsc_cse", level: "optional", tags: ["optional"] },
   { id: "upsc_opt_history", name: "Optional: History", branchId: "upsc_cse", level: "optional", tags: ["optional"] },

   /* =====================================================
       2. STATE PSC EXAMS (UPPSC, BPSC, MPPSC, RAS, etc.)
       branchId: "state_psc"
      ===================================================== */
   { id: "psc_gs_pre", name: "Prelims: General Studies (State Specific)", branchId: "state_psc", level: "prelims", tags: ["gs", "state_gk"] },
   { id: "psc_csat", name: "Prelims: Aptitude Test", branchId: "state_psc", level: "prelims", tags: ["math"] },
   { id: "psc_mains_gs", name: "Mains: General Studies Papers", branchId: "state_psc", level: "mains", tags: ["gs"] },
   { id: "psc_hindi", name: "General Hindi & Essay", branchId: "state_psc", level: "mains", tags: ["language"] },

   /* =====================================================
       3. SSC CGL (Staff Selection Commission)
       branchId: "ssc_cgl"
      ===================================================== */
   // Tier I & II Combined Subjects
   { id: "ssc_quant", name: "Quantitative Aptitude (Arithmetic & Advanced)", branchId: "ssc_cgl", level: "tier_1_2", tags: ["math"] },
   { id: "ssc_reasoning", name: "General Intelligence & Reasoning", branchId: "ssc_cgl", level: "tier_1_2", tags: ["logic"] },
   { id: "ssc_english", name: "English Language & Comprehension", branchId: "ssc_cgl", level: "tier_1_2", tags: ["language"] },
   { id: "ssc_ga", name: "General Awareness (GK/Current Affairs)", branchId: "ssc_cgl", level: "tier_1", tags: ["gk"] },
   { id: "ssc_computer", name: "Computer Knowledge Module", branchId: "ssc_cgl", level: "tier_2", tags: ["computer"] },
   { id: "ssc_stats", name: "Statistics (JSO Post)", branchId: "ssc_cgl", level: "tier_2", tags: ["math"] },
   { id: "ssc_finance", name: "General Studies (Finance & Economics)", branchId: "ssc_cgl", level: "tier_2", tags: ["commerce"] },

   /* =====================================================
       4. BANKING EXAMS (IBPS PO / Clerk / SBI / RRB)
       branchId: "ibps_bank", "ibps_po", "ibps_clerk"
      ===================================================== */
   { id: "bank_quant", name: "Quantitative Aptitude & Data Interpretation", branchId: "ibps_bank", level: "pre_mains", tags: ["math", "di"] },
   { id: "bank_reasoning", name: "Reasoning Ability & Computer Aptitude", branchId: "ibps_bank", level: "pre_mains", tags: ["logic"] },
   { id: "bank_english", name: "English Language", branchId: "ibps_bank", level: "pre_mains", tags: ["language"] },
   { id: "bank_ga", name: "General/Banking/Financial Awareness", branchId: "ibps_bank", level: "mains", tags: ["gk", "finance"] },
   { id: "bank_desc", name: "Descriptive English (Letter & Essay)", branchId: "ibps_bank", level: "mains", tags: ["writing"] },
   { id: "bank_hindi", name: "Hindi Language (RRB Exams)", branchId: "ibps_bank", level: "mains", tags: ["language"] },

   /* =====================================================
       5. RBI GRADE B OFFICER
       branchId: "rbi_grade_b"
      ===================================================== */
   // Phase I (Same as Banking)
   { id: "rbi_phase1", name: "Phase I: GA, Eng, Quant, Reasoning", branchId: "rbi_grade_b", level: "phase_1", tags: ["aptitude"] },

   // Phase II (Core)
   { id: "rbi_esi", name: "Economic and Social Issues", branchId: "rbi_grade_b", level: "phase_2", tags: ["economics"] },
   { id: "rbi_fm", name: "Finance and Management", branchId: "rbi_grade_b", level: "phase_2", tags: ["finance"] },
   { id: "rbi_desc_eng", name: "Descriptive English (Writing Skills)", branchId: "rbi_grade_b", level: "phase_2", tags: ["writing"] },

   /* =====================================================
       6. LIC AAO / INSURANCE EXAMS
       branchId: "lic_aao"
      ===================================================== */
   { id: "ins_quant", name: "Quantitative Aptitude", branchId: "lic_aao", level: "pre_mains", tags: ["math"] },
   { id: "ins_reasoning", name: "Reasoning Ability", branchId: "lic_aao", level: "pre_mains", tags: ["logic"] },
   { id: "ins_english", name: "English Language", branchId: "lic_aao", level: "pre_mains", tags: ["language"] },
   { id: "ins_ga", name: "General Knowledge & Current Affairs", branchId: "lic_aao", level: "mains", tags: ["gk"] },
   { id: "ins_awareness", name: "Insurance & Financial Market Awareness", branchId: "lic_aao", level: "mains", tags: ["finance"] },

   /* =====================================================
       7. GATE (Graduate Aptitude Test in Engineering)
       branchId: "gate_exam"
      ===================================================== */
   // General Section
   { id: "gate_ga", name: "General Aptitude (Verbal & Numerical)", branchId: "gate_exam", level: "all", tags: ["aptitude"] },
   { id: "gate_eng_math", name: "Engineering Mathematics", branchId: "gate_exam", level: "all", tags: ["math"] },

   // Technical Papers (Top Streams)
   { id: "gate_cs", name: "CS & IT: Algo, DS, OS, DBMS, CN", branchId: "gate_exam", level: "tech", tags: ["cse"] },
   { id: "gate_me", name: "Mechanical: Thermo, SOM, TOM, FM, Mfg", branchId: "gate_exam", level: "tech", tags: ["mech"] },
   { id: "gate_ce", name: "Civil: Soil, Struct, Env, Transpo", branchId: "gate_exam", level: "tech", tags: ["civil"] },
   { id: "gate_ee", name: "Electrical: Circuits, Machines, Power Sys", branchId: "gate_exam", level: "tech", tags: ["eee"] },
   { id: "gate_ec", name: "Electronics: Analog, Digital, Comm, EMT", branchId: "gate_exam", level: "tech", tags: ["ece"] },
   { id: "gate_in", name: "Instrumentation Engineering", branchId: "gate_exam", level: "tech", tags: ["instru"] },

   /* =====================================================
       8. UPSC ESE (ENGINEERING SERVICES EXAM / IES)
       branchId: "ese_exam"
      ===================================================== */
   { id: "ese_gs", name: "General Studies & Engineering Aptitude", branchId: "ese_exam", level: "prelims", tags: ["gs", "aptitude"] },
   { id: "ese_civil", name: "Civil Engineering (Paper I & II)", branchId: "ese_exam", level: "mains", tags: ["technical"] },
   { id: "ese_mech", name: "Mechanical Engineering (Paper I & II)", branchId: "ese_exam", level: "mains", tags: ["technical"] },
   { id: "ese_elec", name: "Electrical Engineering (Paper I & II)", branchId: "ese_exam", level: "mains", tags: ["technical"] },
   { id: "ese_ent", name: "Electronics & Telecom Engineering", branchId: "ese_exam", level: "mains", tags: ["technical"] },

   /* =====================================================
       9. ISRO / DRDO / BARC / SSC JE (Technical Exams)
       branchId: "isro_drdo"
      ===================================================== */
   { id: "tech_mech_obj", name: "Mechanical Engineering (Objective)", branchId: "isro_drdo", level: "exam", tags: ["tech"] },
   { id: "tech_cs_obj", name: "Computer Science (Objective)", branchId: "isro_drdo", level: "exam", tags: ["tech"] },
   { id: "tech_ec_obj", name: "Electronics Engineering (Objective)", branchId: "isro_drdo", level: "exam", tags: ["tech"] },
   { id: "ssc_je_civil", name: "SSC JE: Civil Engineering", branchId: "isro_drdo", level: "exam", tags: ["tech"] },
   { id: "ssc_je_reasoning", name: "SSC JE: General Intelligence & Reasoning", branchId: "isro_drdo", level: "exam", tags: ["logic"] },
   /* =====================================================
       1. CORE LAW SUBJECTS (Common to LLB / BA / BBA / B.Com / B.Sc LLB)
       branchId: "llb" 
       (These are the substantive law subjects taught in all law degrees)
      ===================================================== */

   // -------- Foundation & Substantive Law (Sem 1-4) --------
   { id: "law_legal_methods", name: "Legal Methods & Systems", branchId: "llb", semesters: [1], tags: ["core", "theory"] },
   { id: "law_contracts_1", name: "Law of Contracts I (General Principles)", branchId: "llb", semesters: [1], tags: ["core", "civil"] },
   { id: "law_torts", name: "Law of Torts & Consumer Protection Act", branchId: "llb", semesters: [1], tags: ["core", "civil"] },
   { id: "law_contracts_2", name: "Law of Contracts II (Special Contracts)", branchId: "llb", semesters: [2], tags: ["core", "civil"] },
   { id: "law_consti_1", name: "Constitutional Law I", branchId: "llb", semesters: [2], tags: ["core", "public"] },
   { id: "law_family_1", name: "Family Law I (Hindu Law)", branchId: "llb", semesters: [2], tags: ["core", "personal"] },
   { id: "law_crimes_1", name: "Law of Crimes I (IPC)", branchId: "llb", semesters: [3], tags: ["core", "criminal"] },
   { id: "law_consti_2", name: "Constitutional Law II", branchId: "llb", semesters: [3], tags: ["core", "public"] },
   { id: "law_family_2", name: "Family Law II (Muslim Law)", branchId: "llb", semesters: [3], tags: ["core", "personal"] },

   // -------- Procedural & Corporate Law (Sem 4-6) --------
   { id: "law_jurisprudence", name: "Jurisprudence", branchId: "llb", semesters: [4], tags: ["core", "philosophy"] },
   { id: "law_admin", name: "Administrative Law", branchId: "llb", semesters: [4], tags: ["core", "public"] },
   { id: "law_property", name: "Property Law & Easements", branchId: "llb", semesters: [4], tags: ["core", "civil"] },
   { id: "law_company_1", name: "Company Law I", branchId: "llb", semesters: [5], tags: ["core", "corporate"] },
   { id: "law_crpc", name: "Code of Criminal Procedure (CrPC)", branchId: "llb", semesters: [5], tags: ["core", "criminal", "procedural"] },
   { id: "law_cpc", name: "Code of Civil Procedure (CPC) & Limitation", branchId: "llb", semesters: [5], tags: ["core", "civil", "procedural"] },
   { id: "law_evidence", name: "Law of Evidence", branchId: "llb", semesters: [5], tags: ["core", "procedural"] },
   { id: "law_labor_1", name: "Labour & Industrial Law I", branchId: "llb", semesters: [6], tags: ["core", "corporate"] },

   // -------- Advanced & Clinical Law (Sem 7-10) --------
   { id: "law_tax", name: "Principles of Taxation Law", branchId: "llb", semesters: [7], tags: ["core", "finance"] },
   { id: "law_env", name: "Environmental Law", branchId: "llb", semesters: [7], tags: ["core", "public"] },
   { id: "law_labor_2", name: "Labour & Industrial Law II", branchId: "llb", semesters: [7], tags: ["core", "corporate"] },
   { id: "law_ipr", name: "Intellectual Property Rights (IPR)", branchId: "llb", semesters: [8], tags: ["elective", "corporate"] },
   { id: "law_adr", name: "Alternative Dispute Resolution (ADR)", branchId: "llb", semesters: [8], tags: ["clinical", "skill"] },
   { id: "law_cyber", name: "Cyber Law & IT Act", branchId: "llb", semesters: [8], tags: ["elective", "tech"] },
   { id: "law_drafting", name: "Drafting, Pleading and Conveyancing", branchId: "llb", semesters: [9], tags: ["clinical", "skill"] },
   { id: "law_ethics", name: "Professional Ethics & Bar-Bench Relations", branchId: "llb", semesters: [9], tags: ["clinical", "ethics"] },
   { id: "law_moot", name: "Moot Court Exercise & Internship", branchId: "llb", semesters: [10], tags: ["clinical", "practical"] },

   /* =====================================================
       2. INTEGRATED PRE-LAW SUBJECTS (Degree Specific)
       (Subjects taught in first 2-3 years alongside Law)
      ===================================================== */

   // --- BA LLB (Arts + Law) ---
   { id: "ballb_pol_1", name: "Political Science I (Theory)", branchId: "ba_llb", semesters: [1], tags: ["arts"] },
   { id: "ballb_hist_1", name: "History I (Ancient/Medieval)", branchId: "ba_llb", semesters: [1], tags: ["arts"] },
   { id: "ballb_socio_1", name: "Sociology I (General Principles)", branchId: "ba_llb", semesters: [1], tags: ["arts"] },
   { id: "ballb_eng_1", name: "General English & Legal Language", branchId: "ba_llb", semesters: [1], tags: ["language"] },
   { id: "ballb_eco_1", name: "Economics I (Micro)", branchId: "ba_llb", semesters: [2], tags: ["arts"] },
   { id: "ballb_pol_2", name: "Political Science II (IR & Org)", branchId: "ba_llb", semesters: [2], tags: ["arts"] },

   // --- BBA LLB (Management + Law) ---
   { id: "bballb_mgmt", name: "Principles of Management", branchId: "bba_llb", semesters: [1], tags: ["management"] },
   { id: "bballb_acct", name: "Financial Accounting", branchId: "bba_llb", semesters: [1], tags: ["commerce"] },
   { id: "bballb_ob", name: "Organizational Behavior", branchId: "bba_llb", semesters: [2], tags: ["management"] },
   { id: "bballb_mkt", name: "Marketing Management", branchId: "bba_llb", semesters: [2], tags: ["management"] },
   { id: "bballb_hr", name: "Human Resource Management", branchId: "bba_llb", semesters: [3], tags: ["management"] },

   // --- B.Com LLB (Commerce + Law) ---
   { id: "bcomllb_acct_1", name: "Financial Accounting", branchId: "bcom_llb", semesters: [1], tags: ["commerce"] },
   { id: "bcomllb_audit", name: "Auditing", branchId: "bcom_llb", semesters: [2], tags: ["commerce"] },
   { id: "bcomllb_cost", name: "Cost Accounting", branchId: "bcom_llb", semesters: [3], tags: ["commerce"] },
   { id: "bcomllb_corp_acct", name: "Corporate Accounting", branchId: "bcom_llb", semesters: [4], tags: ["commerce"] },

   // --- B.Sc LLB (Science + Law) - Focus on IPR/Patents ---
   { id: "bscllb_chem", name: "Chemistry I", branchId: "bsc_llb", semesters: [1], tags: ["science"] },
   { id: "bscllb_bio", name: "Biotechnology & Genetics", branchId: "bsc_llb", semesters: [1], tags: ["science"] },
   { id: "bscllb_phy", name: "Physics I", branchId: "bsc_llb", semesters: [2], tags: ["science"] },
   { id: "bscllb_cs", name: "Computer Science & Forensics", branchId: "bsc_llb", semesters: [2], tags: ["tech"] },
   { id: "bscllb_ipr_sci", name: "Pharmaceutical Chemistry & Patent Law", branchId: "bsc_llb", semesters: [3], tags: ["science", "law"] },

   /* =====================================================
       3. MASTER OF LAWS (LLM)
       branchId: "llm"
       (1 Year / 2 Year)
      ===================================================== */
   { id: "llm_research", name: "Legal Education & Research Methodology", branchId: "llm", semesters: [1], tags: ["core", "research"] },
   { id: "llm_justice", name: "Law and Justice in Globalizing World", branchId: "llm", semesters: [1], tags: ["core", "theory"] },
   { id: "llm_consti", name: "Comparative Constitutional Law", branchId: "llm", semesters: [2], tags: ["specialization", "public"] },
   { id: "llm_corp", name: "Corporate Governance & Finance", branchId: "llm", semesters: [2], tags: ["specialization", "corporate"] },
   { id: "llm_criminal", name: "Comparative Criminal Procedure", branchId: "llm", semesters: [2], tags: ["specialization", "criminal"] },
   { id: "llm_ipr_adv", name: "Advanced IPR Law", branchId: "llm", semesters: [2], tags: ["specialization", "ipr"] },
   { id: "llm_dissertation", name: "Dissertation & Thesis", branchId: "llm", semesters: [2], tags: ["project"] },

   /* =====================================================
       4. LAW ENTRANCE EXAMS (CLAT / AILET / SLAT)
       branchId: "law_entrance"
      ===================================================== */
   { id: "clat_legal", name: "Legal Reasoning & Aptitude", branchId: "law_entrance", level: "exam", tags: ["core"] },
   { id: "clat_logical", name: "Logical Reasoning", branchId: "law_entrance", level: "exam", tags: ["aptitude"] },
   { id: "clat_english", name: "English Language & Comprehension", branchId: "law_entrance", level: "exam", tags: ["language"] },
   { id: "clat_gk", name: "General Knowledge & Current Affairs", branchId: "law_entrance", level: "exam", tags: ["gk"] },
   { id: "clat_math", name: "Quantitative Techniques (Elementary Math)", branchId: "law_entrance", level: "exam", tags: ["math"] },

   /* =====================================================
       5. JUDICIARY SERVICES (Civil Judge)
       branchId: "judiciary_exam"
      ===================================================== */
   { id: "jud_cpc", name: "Civil Procedure Code (Mains)", branchId: "judiciary_exam", level: "mains", tags: ["core", "civil"] },
   { id: "jud_crpc", name: "Criminal Procedure Code (Mains)", branchId: "judiciary_exam", level: "mains", tags: ["core", "criminal"] },
   { id: "jud_ipc", name: "Indian Penal Code (Mains)", branchId: "judiciary_exam", level: "mains", tags: ["core", "criminal"] },
   { id: "jud_evidence", name: "Indian Evidence Act", branchId: "judiciary_exam", level: "mains", tags: ["core", "procedural"] },
   { id: "jud_gk", name: "General Knowledge (State Specific)", branchId: "judiciary_exam", level: "prelims", tags: ["gk"] },
   { id: "jud_lang", name: "Language Paper (Translation/Essay)", branchId: "judiciary_exam", level: "mains", tags: ["language"] },
   { id: "jud_judgment", name: "Judgment Writing (Civil & Criminal)", branchId: "judiciary_exam", level: "mains", tags: ["skill"] },

   /* =====================================================
       DEFENCE EXAMS (NDA / CDS / AFCAT / CAPF / Agniveer)
      ===================================================== */

   /* =====================================================
       1. NDA (National Defence Academy)
       branchId: "nda"
       Written Exam + SSB Interview
      ===================================================== */
   { id: "nda_math", name: "Mathematics", branchId: "nda", level: "exam", tags: ["core", "math"] },
   { id: "nda_gat_english", name: "English", branchId: "nda", level: "exam", tags: ["gat", "language"] },
   { id: "nda_gat_physics", name: "Physics", branchId: "nda", level: "exam", tags: ["gat", "science"] },
   { id: "nda_gat_chemistry", name: "Chemistry", branchId: "nda", level: "exam", tags: ["gat", "science"] },
   { id: "nda_gat_biology", name: "General Science", branchId: "nda", level: "exam", tags: ["gat", "science"] },
   { id: "nda_gat_history", name: "History", branchId: "nda", level: "exam", tags: ["gat", "social"] },
   { id: "nda_gat_geography", name: "Geography", branchId: "nda", level: "exam", tags: ["gat", "social"] },
   { id: "nda_gat_polity", name: "Polity", branchId: "nda", level: "exam", tags: ["gat", "social"] },
   { id: "nda_gat_economics", name: "Economics", branchId: "nda", level: "exam", tags: ["gat", "social"] },
   { id: "nda_gat_gk", name: "General Knowledge", branchId: "nda", level: "exam", tags: ["gat", "gk"] },
   { id: "nda_gat_current", name: "Current Affairs", branchId: "nda", level: "exam", tags: ["gat", "gk"] },

   /* =====================================================
       2. CDS (Combined Defence Services)
       branchId: "cds"
       For OTA, IMA, INA, AFA entries
      ===================================================== */
   { id: "cds_english", name: "English", branchId: "cds", level: "exam", tags: ["core", "language"] },
   { id: "cds_gk", name: "General Knowledge", branchId: "cds", level: "exam", tags: ["core", "gk"] },
   { id: "cds_math", name: "Elementary Mathematics", branchId: "cds", level: "exam", tags: ["core", "math"] },
   { id: "cds_history", name: "History", branchId: "cds", level: "exam", tags: ["gk", "social"] },
   { id: "cds_geography", name: "Geography", branchId: "cds", level: "exam", tags: ["gk", "social"] },
   { id: "cds_polity", name: "Indian Polity", branchId: "cds", level: "exam", tags: ["gk", "social"] },
   { id: "cds_economics", name: "Economics", branchId: "cds", level: "exam", tags: ["gk", "social"] },
   { id: "cds_science", name: "Science", branchId: "cds", level: "exam", tags: ["gk", "science"] },
   { id: "cds_current", name: "Current Affairs", branchId: "cds", level: "exam", tags: ["gk"] },
   { id: "cds_defence_gk", name: "Defence Related GK", branchId: "cds", level: "exam", tags: ["gk", "defence"] },

   /* =====================================================
       3. AFCAT (Air Force Common Admission Test)
       branchId: "afcat"
      ===================================================== */
   { id: "afcat_gk", name: "General Knowledge", branchId: "afcat", level: "exam", tags: ["core", "gk"] },
   { id: "afcat_english", name: "English", branchId: "afcat", level: "exam", tags: ["core", "language"] },
   { id: "afcat_reasoning", name: "Verbal & Non-Verbal Reasoning", branchId: "afcat", level: "exam", tags: ["core", "aptitude"] },
   { id: "afcat_numerical", name: "Numerical Ability", branchId: "afcat", level: "exam", tags: ["core", "math"] },
   { id: "afcat_history", name: "History", branchId: "afcat", level: "exam", tags: ["gk", "social"] },
   { id: "afcat_civics", name: "Civics", branchId: "afcat", level: "exam", tags: ["gk", "social"] },
   { id: "afcat_geography", name: "Geography", branchId: "afcat", level: "exam", tags: ["gk", "social"] },
   { id: "afcat_sports", name: "Sports", branchId: "afcat", level: "exam", tags: ["gk"] },
   { id: "afcat_defence", name: "Defence", branchId: "afcat", level: "exam", tags: ["gk", "defence"] },
   { id: "afcat_current", name: "Current Affairs", branchId: "afcat", level: "exam", tags: ["gk"] },

   /* =====================================================
       4. CAPF (Central Armed Police Forces) - AC
       branchId: "capf"
       For BSF, CRPF, ITBP, CISF, SSB
      ===================================================== */
   { id: "capf_gk", name: "General Knowledge & Current Affairs", branchId: "capf", level: "exam", tags: ["core", "gk"] },
   { id: "capf_english", name: "English Comprehension", branchId: "capf", level: "exam", tags: ["core", "language"] },
   { id: "capf_essay", name: "Essay Writing", branchId: "capf", level: "exam", tags: ["core", "writing"] },
   { id: "capf_aptitude", name: "General Ability & Intelligence", branchId: "capf", level: "exam", tags: ["core", "aptitude"] },

   /* =====================================================
       5. AGNIVEER (Army / Navy / Air Force)
       branchId: "agniveer"
       Common subjects across all three forces
      ===================================================== */
   { id: "agniveer_english", name: "English", branchId: "agniveer", level: "exam", tags: ["core", "language"] },
   { id: "agniveer_gk", name: "General Knowledge", branchId: "agniveer", level: "exam", tags: ["core", "gk"] },
   { id: "agniveer_math", name: "Mathematics", branchId: "agniveer", level: "exam", tags: ["core", "math"] },
   { id: "agniveer_physics", name: "Physics", branchId: "agniveer", level: "exam", tags: ["science"] },
   { id: "agniveer_reasoning", name: "Reasoning", branchId: "agniveer", level: "exam", tags: ["aptitude"] },

   /* =====================================================
       6. INDIAN COAST GUARD (ICG)
       branchId: "icg"
       Navik / Yantrik entries
      ===================================================== */
   { id: "icg_math", name: "Mathematics", branchId: "icg", level: "exam", tags: ["core", "math"] },
   { id: "icg_physics", name: "Physics", branchId: "icg", level: "exam", tags: ["core", "science"] },
   { id: "icg_chemistry", name: "Chemistry", branchId: "icg", level: "exam", tags: ["core", "science"] },
   { id: "icg_english", name: "English", branchId: "icg", level: "exam", tags: ["core", "language"] },
   { id: "icg_reasoning", name: "Reasoning", branchId: "icg", level: "exam", tags: ["aptitude"] },
   { id: "icg_gk", name: "General Knowledge", branchId: "icg", level: "exam", tags: ["gk"] },

   /* =====================================================
       7. INET (Indian Navy Entrance Test)
       branchId: "inet"
      ===================================================== */
   { id: "inet_english", name: "English", branchId: "inet", level: "exam", tags: ["core", "language"] },
   { id: "inet_reasoning", name: "Reasoning & Numerical Ability", branchId: "inet", level: "exam", tags: ["core", "aptitude"] },
   { id: "inet_science", name: "General Science", branchId: "inet", level: "exam", tags: ["core", "science"] },
   { id: "inet_math", name: "Mathematics", branchId: "inet", level: "exam", tags: ["core", "math"] },
   { id: "inet_gk", name: "General Knowledge", branchId: "inet", level: "exam", tags: ["gk"] },
];

export const getSubjectsByBranch = (branchId) =>
   EDU_SUBJECTS.filter((s) => s.branchId === branchId);
