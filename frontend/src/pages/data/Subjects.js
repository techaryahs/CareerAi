// Subjects - Individual subjects/topics that teachers can teach
// Comprehensive list with searchable tags

export const SUBJECTS = [
    // Mathematics & Statistics
    { id: "1", name: "Algebra", tags: ["mathematics", "math", "algebra"] },
    { id: "2", name: "Calculus", tags: ["mathematics", "math", "calculus", "engineering"] },
    { id: "3", name: "Geometry", tags: ["mathematics", "math", "geometry"] },
    { id: "4", name: "Trigonometry", tags: ["mathematics", "math", "trigonometry"] },
    { id: "5", name: "Statistics", tags: ["mathematics", "math", "statistics", "data"] },
    { id: "6", name: "Linear Algebra", tags: ["mathematics", "math", "linear algebra", "engineering"] },
    { id: "7", name: "Differential Equations", tags: ["mathematics", "engineering", "differential"] },
    { id: "8", name: "Discrete Mathematics", tags: ["mathematics", "computer science", "discrete"] },
    { id: "9", name: "Numerical Methods", tags: ["mathematics", "engineering", "numerical"] },
    { id: "10", name: "Probability Theory", tags: ["mathematics", "statistics", "probability"] },

    // Physics
    { id: "11", name: "Classical Mechanics", tags: ["physics", "mechanics", "engineering"] },
    { id: "12", name: "Electromagnetism", tags: ["physics", "electromagnetism", "engineering"] },
    { id: "13", name: "Thermodynamics", tags: ["physics", "thermodynamics", "engineering"] },
    { id: "14", name: "Quantum Mechanics", tags: ["physics", "quantum", "advanced"] },
    { id: "15", name: "Optics", tags: ["physics", "optics", "light"] },
    { id: "16", name: "Modern Physics", tags: ["physics", "modern", "relativity"] },
    { id: "17", name: "Solid State Physics", tags: ["physics", "solid state"] },
    { id: "18", name: "Nuclear Physics", tags: ["physics", "nuclear"] },

    // Chemistry
    { id: "19", name: "Organic Chemistry", tags: ["chemistry", "organic"] },
    { id: "20", name: "Inorganic Chemistry", tags: ["chemistry", "inorganic"] },
    { id: "21", name: "Physical Chemistry", tags: ["chemistry", "physical"] },
    { id: "22", name: "Analytical Chemistry", tags: ["chemistry", "analytical"] },
    { id: "23", name: "Biochemistry", tags: ["chemistry", "biology", "biochemistry"] },
    { id: "24", name: "Environmental Chemistry", tags: ["chemistry", "environment"] },

    // Biology & Life Sciences
    { id: "25", name: "Botany", tags: ["biology", "botany", "plants"] },
    { id: "26", name: "Zoology", tags: ["biology", "zoology", "animals"] },
    { id: "27", name: "Human Anatomy", tags: ["biology", "medicine", "anatomy"] },
    { id: "28", name: "Physiology", tags: ["biology", "medicine", "physiology"] },
    { id: "29", name: "Microbiology", tags: ["biology", "microbiology", "microbes"] },
    { id: "30", name: "Genetics", tags: ["biology", "genetics", "dna"] },
    { id: "31", name: "Ecology", tags: ["biology", "ecology", "environment"] },
    { id: "32", name: "Cell Biology", tags: ["biology", "cell", "molecular"] },
    { id: "33", name: "Molecular Biology", tags: ["biology", "molecular", "genetics"] },

    // Computer Science & IT
    { id: "34", name: "Data Structures", tags: ["computer science", "programming", "data structures"] },
    { id: "35", name: "Algorithms", tags: ["computer science", "programming", "algorithms"] },
    { id: "36", name: "Database Management Systems", tags: ["computer science", "database", "dbms", "sql"] },
    { id: "37", name: "Operating Systems", tags: ["computer science", "os", "operating systems"] },
    { id: "38", name: "Computer Networks", tags: ["computer science", "networks", "networking"] },
    { id: "39", name: "Software Engineering", tags: ["computer science", "software", "engineering"] },
    { id: "40", name: "Web Development", tags: ["computer science", "web", "development", "html", "css", "javascript"] },
    { id: "41", name: "Mobile App Development", tags: ["computer science", "mobile", "app", "android", "ios"] },
    { id: "42", name: "Machine Learning", tags: ["computer science", "ai", "machine learning", "ml"] },
    { id: "43", name: "Artificial Intelligence", tags: ["computer science", "ai", "artificial intelligence"] },
    { id: "44", name: "Cybersecurity", tags: ["computer science", "security", "cybersecurity"] },
    { id: "45", name: "Cloud Computing", tags: ["computer science", "cloud", "aws", "azure"] },
    { id: "46", name: "Python Programming", tags: ["programming", "python", "coding"] },
    { id: "47", name: "Java Programming", tags: ["programming", "java", "coding"] },
    { id: "48", name: "C/C++ Programming", tags: ["programming", "c", "c++", "coding"] },
    { id: "49", name: "JavaScript", tags: ["programming", "javascript", "web"] },

    // Engineering Core Subjects
    { id: "50", name: "Engineering Drawing", tags: ["engineering", "drawing", "cad"] },
    { id: "51", name: "Engineering Mechanics", tags: ["engineering", "mechanics"] },
    { id: "52", name: "Fluid Mechanics", tags: ["engineering", "fluid", "mechanics"] },
    { id: "53", name: "Heat Transfer", tags: ["engineering", "heat", "thermal"] },
    { id: "54", name: "Material Science", tags: ["engineering", "materials"] },
    { id: "55", name: "Manufacturing Processes", tags: ["engineering", "manufacturing", "mechanical"] },
    { id: "56", name: "Control Systems", tags: ["engineering", "control", "automation"] },
    { id: "57", name: "Digital Electronics", tags: ["engineering", "electronics", "digital"] },
    { id: "58", name: "Analog Electronics", tags: ["engineering", "electronics", "analog"] },
    { id: "59", name: "Microprocessors", tags: ["engineering", "electronics", "microprocessor"] },
    { id: "60", name: "Signal Processing", tags: ["engineering", "signals", "dsp"] },
    { id: "61", name: "Power Systems", tags: ["engineering", "electrical", "power"] },
    { id: "62", name: "Circuit Theory", tags: ["engineering", "electrical", "circuits"] },

    // Commerce & Business
    { id: "63", name: "Accountancy", tags: ["commerce", "accounting", "finance"] },
    { id: "64", name: "Business Studies", tags: ["commerce", "business", "management"] },
    { id: "65", name: "Economics", tags: ["commerce", "economics", "business"] },
    { id: "66", name: "Financial Accounting", tags: ["commerce", "accounting", "finance"] },
    { id: "67", name: "Cost Accounting", tags: ["commerce", "accounting", "cost"] },
    { id: "68", name: "Corporate Accounting", tags: ["commerce", "accounting", "corporate"] },
    { id: "69", name: "Auditing", tags: ["commerce", "accounting", "auditing"] },
    { id: "70", name: "Taxation", tags: ["commerce", "tax", "taxation"] },
    { id: "71", name: "Business Law", tags: ["commerce", "law", "business"] },
    { id: "72", name: "Marketing Management", tags: ["business", "marketing", "management"] },
    { id: "73", name: "Human Resource Management", tags: ["business", "hr", "management"] },
    { id: "74", name: "Financial Management", tags: ["business", "finance", "management"] },
    { id: "75", name: "Operations Management", tags: ["business", "operations", "management"] },
    { id: "76", name: "E-Commerce", tags: ["business", "ecommerce", "digital"] },

    // Humanities & Social Sciences
    { id: "77", name: "English Literature", tags: ["humanities", "english", "literature"] },
    { id: "78", name: "English Grammar", tags: ["humanities", "english", "grammar"] },
    { id: "79", name: "History", tags: ["humanities", "history", "social"] },
    { id: "80", name: "Geography", tags: ["humanities", "geography", "social"] },
    { id: "81", name: "Political Science", tags: ["humanities", "politics", "social"] },
    { id: "82", name: "Sociology", tags: ["humanities", "sociology", "social"] },
    { id: "83", name: "Psychology", tags: ["humanities", "psychology", "social"] },
    { id: "84", name: "Philosophy", tags: ["humanities", "philosophy"] },
    { id: "85", name: "Hindi", tags: ["language", "hindi", "humanities"] },
    { id: "86", name: "Sanskrit", tags: ["language", "sanskrit", "humanities"] },
    { id: "87", name: "Marathi", tags: ["language", "marathi", "humanities"] },

    // Law
    { id: "88", name: "Constitutional Law", tags: ["law", "constitution"] },
    { id: "89", name: "Criminal Law", tags: ["law", "criminal"] },
    { id: "90", name: "Civil Law", tags: ["law", "civil"] },
    { id: "91", name: "Corporate Law", tags: ["law", "corporate", "business"] },
    { id: "92", name: "Intellectual Property Law", tags: ["law", "ip", "intellectual property"] },
    { id: "93", name: "Contract Law", tags: ["law", "contract"] },
    { id: "94", name: "Family Law", tags: ["law", "family"] },

    // Medicine & Healthcare
    { id: "95", name: "Pathology", tags: ["medicine", "pathology", "disease"] },
    { id: "96", name: "Pharmacology", tags: ["medicine", "pharmacy", "pharmacology"] },
    { id: "97", name: "Surgery", tags: ["medicine", "surgery", "clinical"] },
    { id: "98", name: "Pediatrics", tags: ["medicine", "pediatrics", "children"] },
    { id: "99", name: "Gynecology", tags: ["medicine", "gynecology", "women"] },
    { id: "100", name: "Radiology", tags: ["medicine", "radiology", "imaging"] },

    // School Level
    { id: "101", name: "General Science", tags: ["school", "science", "general"] },
    { id: "102", name: "Social Studies", tags: ["school", "social", "general"] },
    { id: "103", name: "Environmental Studies", tags: ["school", "environment", "general"] },
    { id: "104", name: "Basic Mathematics", tags: ["school", "mathematics", "basic"] },
    { id: "105", name: "Hindi Language", tags: ["school", "hindi", "language"] },
    { id: "106", name: "English Language", tags: ["school", "english", "language"] },
    { id: "107", name: "Computer Basics", tags: ["school", "computer", "basic"] },

    // Competitive Exams
    { id: "108", name: "JEE Preparation", tags: ["competitive", "jee", "engineering"] },
    { id: "109", name: "NEET Preparation", tags: ["competitive", "neet", "medicine"] },
    { id: "110", name: "GATE Preparation", tags: ["competitive", "gate", "engineering"] },
    { id: "111", name: "CAT Preparation", tags: ["competitive", "cat", "management"] },
    { id: "112", name: "SSC Preparation", tags: ["competitive", "ssc", "government"] },
    { id: "113", name: "UPSC Preparation", tags: ["competitive", "upsc", "civil services"] },
    { id: "114", name: "Banking Exams", tags: ["competitive", "banking", "finance"] },

    // Additional Subjects
    { id: "115", name: "Aptitude & Reasoning", tags: ["aptitude", "reasoning", "logic"] },
    { id: "116", name: "Verbal Ability", tags: ["verbal", "english", "communication"] },
    { id: "117", name: "Quantitative Ability", tags: ["quantitative", "math", "aptitude"] },
    { id: "118", name: "Research Methodology", tags: ["research", "methodology", "academic"] },
    { id: "119", name: "Technical Writing", tags: ["writing", "technical", "communication"] },
    { id: "120", name: "Presentation Skills", tags: ["presentation", "communication", "soft skills"] }
];
