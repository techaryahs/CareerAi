import softwareEngineerImg from '../assets/software_engineer.jpg';
// import uix_designer from '../assets/uix_designer.jpg';
import doctor from '../assets/doctor.jpg';
import teacher from '../assets/teacher.jpg';
import accountant from '../assets/accountant.jpg';
import research_scientist from '../assets/research_scientist.jpg'
// import civil from '../assets/civil.jpg'
import journalist from '../assets/journalist.jpg'
import interior_designer from '../assets/interior_designer.jpg'
import business_analyst from '../assets/business_analyst.jpg'
import lawyer from '../assets/lawyer.jpg'
// import chef from '../assets/chef.jpg'

const careerData = [
  {
    id: 1,
    title: "Teacher",
    category: "Education",
    image: teacher,
    description:
      "Teachers educate students, develop lesson plans, and foster learning environments. They work at various levels from primary schools to universities.",
    skills: ["Subject Knowledge", "Communication", "Leadership", "Classroom Management"],
    roadmap: [
      "Complete 12th grade (any stream)",
      "Pursue a Bachelor's degree (B.A./B.Sc./B.Com)",
      "Complete B.Ed or equivalent teaching qualification",
      "Clear government teaching exams (TET/CTET/NET) if applicable",
      "Apply to private/public institutions"
    ],
    salary: "₹3–10 LPA",
    subcategories: [
      {
        name: "Primary Teacher",
        description: "Teaches foundational subjects to children in grades 1–5.",
        roadmap: [
          "Complete 12th (any stream)",
          "Pursue D.El.Ed or B.Ed",
          "Pass CTET or state TET exam",
          "Apply to primary schools"
        ]
      },
      {
        name: "High School Teacher",
        description: "Teaches subject-specific topics to students in grades 6–12.",
        roadmap: [
          "Complete 12th with focus on chosen subject",
          "Graduate in the subject (B.Sc., B.A., etc.)",
          "B.Ed (with specialization)",
          "Clear NET/TET for eligibility"
        ]
      },
      {
        name: "PT Teacher",
        description: "Trains students in physical education and health.",
        roadmap: [
          "Complete 12th (any stream)",
          "Bachelor’s in Physical Education (B.P.Ed)",
          "Optional: M.P.Ed for senior-level roles"
        ]
      },
      {
        name: "Yoga Teacher",
        description: "Guides students in yoga postures, breathing, and mindfulness.",
        roadmap: [
          "Complete 12th (any stream)",
          "Join a certified Yoga training course (Diploma or Bachelor’s in Yoga)",
          "Get certified by Yoga bodies (e.g., AYUSH Ministry or Yoga Alliance)"
        ]
      },
      {
        name: "Special Educator",
        description: "Teaches students with disabilities or learning difficulties.",
        roadmap: [
          "Complete 12th (any stream)",
          "Bachelor’s in Special Education (B.Ed Special Ed)",
          "Optional: Diploma in Special Education",
          "Work in inclusive or special schools"
        ]
      }
    ]
  },

  {
    id: 2,
    title: "Doctor",
    category: "Healthcare",
    image: doctor,
    description:
      "Doctors diagnose illnesses and treat patients. They specialize in areas like surgery, pediatrics, cardiology, etc., and play a crucial role in maintaining public health.",
    skills: ["Biology", "Empathy", "Diagnosis", "Medical Knowledge", "Communication"],
    roadmap: [
      "Complete 12th with PCB (Physics, Chemistry, Biology)",
      "Clear NEET exam",
      "Complete MBBS (5.5 years)",
      "Do specialization (MD/MS/DNB) if needed",
      "Get licensed and start practice"
    ],
    salary: "₹8–25 LPA",
    subcategories: [
      {
        name: "General Physician",
        description: "Treats common illnesses like flu, infections, and minor injuries.",
        roadmap: [
          "12th with PCB",
          "MBBS degree",
          "Internship and licensing",
          "Start private or hospital practice"
        ]
      },
      {
        name: "Surgeon",
        description: "Performs surgical procedures for treating medical conditions.",
        roadmap: [
          "12th with PCB",
          "MBBS",
          "MS in General Surgery or specialization",
          "Residency/Training"
        ]
      },
      {
        name: "Pediatrician",
        description: "Specializes in healthcare of infants and children.",
        roadmap: [
          "12th with PCB",
          "MBBS",
          "MD in Pediatrics",
          "Residency and certification"
        ]
      },
      {
        name: "Cardiologist",
        description: "Diagnoses and treats heart-related diseases.",
        roadmap: [
          "12th with PCB",
          "MBBS",
          "MD in Internal Medicine",
          "DM in Cardiology"
        ]
      },
      {
        name: "Dermatologist",
        description: "Treats skin, hair, and nail conditions.",
        roadmap: [
          "12th with PCB",
          "MBBS",
          "MD in Dermatology"
        ]
      }
    ]
  },
  {
  id: 3,
  title: "Accountant",
  category: "Finance",
  image: accountant,
  description:
    "Accountants handle financial records, prepare tax documents, and help businesses stay compliant. They work in firms, corporates, and startups to manage money efficiently.",
  skills: ["Accounting", "Excel", "Taxation", "Finance", "Attention to Detail"],
  roadmap: [
    "Complete 12th with Commerce stream",
    "Pursue B.Com or BBA in Finance/Accounting",
    "Optional: M.Com or MBA in Finance",
    "Consider certifications like CA, CMA, or CPA",
    "Gain experience through internships or articleship"
  ],
  salary: "₹4–12 LPA",
  subcategories: [
    {
      name: "Tax Accountant",
      description: "Specializes in tax planning, filing returns, and ensuring compliance with tax laws.",
      roadmap: [
        "12th with Commerce",
        "B.Com or similar degree with focus on Taxation",
        "Pursue Chartered Accountancy (CA) or Certified Public Accountant (CPA)",
        "Gain experience in tax firms or financial departments"
      ]
    },
    {
      name: "Cost Accountant",
      description: "Analyzes and controls the cost of operations, prepares cost reports, and helps in decision-making.",
      roadmap: [
        "12th with Commerce",
        "Enroll in ICMAI to pursue CMA (Cost and Management Accounting)",
        "Complete foundation, intermediate, and final CMA levels",
        "Gain work experience in manufacturing or finance-heavy companies"
      ]
    },
    {
      name: "Auditor",
      description: "Inspects financial statements and records to ensure accuracy and compliance with regulations.",
      roadmap: [
        "12th with Commerce",
        "B.Com followed by CA or CPA certification",
        "Work in audit firms like Big 4 (Deloitte, EY, KPMG, PwC)",
        "Continue professional development via ICAI or CPA bodies"
      ]
    },
    {
      name: "Management Accountant",
      description: "Supports strategic planning, budgeting, and financial forecasting within companies.",
      roadmap: [
        "12th with Commerce",
        "B.Com or BBA in Finance",
        "Pursue CMA (India or USA) or MBA in Finance",
        "Join corporations or consultancy firms in FP&A or strategic roles"
      ]
    }
  ]
},

{
  id: 4,
  title: "Research Scientist",
  category: "Science",
  image: research_scientist,
  description:
    "Research scientists conduct experiments and investigations to advance knowledge in fields like biology, chemistry, physics, and more. They work in labs, universities, and research institutions to solve real-world problems.",
  skills: ["Research", "Statistics", "Critical Thinking", "Scientific Writing", "Data Analysis"],
  roadmap: [
    "Complete 12th with Science stream (PCM or PCB depending on interest)",
    "Pursue B.Sc in relevant field (Biology, Chemistry, Physics, etc.)",
    "Pursue M.Sc in specialized area",
    "Clear NET/GATE/CSIR-JRF exams for research roles or Ph.D.",
    "Enroll in Ph.D. for advanced research or university positions"
  ],
  salary: "₹6–15 LPA",
  subcategories: [
    {
      name: "Biologist",
      description: "Studies living organisms, ecosystems, genetics, and cellular biology to advance healthcare, agriculture, and biodiversity.",
      roadmap: [
        "12th with PCB",
        "B.Sc in Biology/Biotechnology/Microbiology",
        "M.Sc in Zoology, Botany, Biotech, or Life Sciences",
        "Optional: Ph.D. in relevant biological field"
      ]
    },
    {
      name: "Chemist",
      description: "Focuses on chemicals and reactions, working in areas like pharmaceuticals, materials science, and environmental chemistry.",
      roadmap: [
        "12th with PCM or PCB",
        "B.Sc in Chemistry",
        "M.Sc in Organic, Inorganic, or Physical Chemistry",
        "Optional: Ph.D. for R&D or academic roles"
      ]
    },
    {
      name: "Physicist",
      description: "Researches matter, energy, and natural laws, contributing to discoveries in space, quantum science, and material physics.",
      roadmap: [
        "12th with PCM",
        "B.Sc in Physics",
        "M.Sc in Physics or Applied Physics",
        "Optional: Ph.D. in Theoretical or Experimental Physics"
      ]
    },
    {
      name: "Data Scientist",
      description: "Applies scientific and analytical methods to extract insights from structured and unstructured data.",
      roadmap: [
        "12th with PCM",
        "B.Sc or B.Tech in Computer Science, Mathematics, or Statistics",
        "M.Sc in Data Science, AI, or related field",
        "Learn tools like Python, R, SQL, Machine Learning"
      ]
    },
    {
      name: "Pharmaceutical Researcher",
      description: "Develops new medicines and conducts drug testing for safety and efficacy.",
      roadmap: [
        "12th with PCB",
        "Bachelor's in Pharmacy (B.Pharm) or Chemistry",
        "M.Pharm or M.Sc in Pharmaceutical Chemistry or Pharmacology",
        "Optional: Ph.D. or work in clinical research/labs"
      ]
    }
  ]
},
{
  id: 5,
  title: "Engineering",
  category: "Engineering",
  image: softwareEngineerImg, // Replace with your image variable or path
  description:
    "Engineering applies scientific and mathematical principles to design, build, and maintain systems, structures, and technologies. It offers diverse specializations that power industries from construction to computing.",
  skills: ["Problem Solving", "Mathematics", "Technical Knowledge", "Analytical Thinking", "Innovation"],
  roadmap: [
    "Complete 12th with Physics, Chemistry, and Mathematics (PCM)",
    "Clear engineering entrance exams (JEE Main/Advanced, state CET, etc.)",
    "Enroll in B.Tech/B.E in desired engineering branch",
    "Participate in internships, workshops, and technical events",
    "Optional: Pursue M.Tech, MBA, or certifications for advanced roles"
  ],
  salary: "₹4–25 LPA",
  subcategories: [
    {
      name: "Software Engineer",
      description: "Develops software systems, applications, and tools using programming languages.",
      roadmap: [
        "12th with PCM or CS",
        "B.Tech/B.E in Computer Science or IT",
        "Learn languages: Python, Java, JavaScript, etc.",
        "Build software projects and contribute to GitHub",
        "Intern in tech companies, prepare for placements"
      ]
    },
    {
      name: "Civil Engineer",
      description: "Designs and oversees construction of buildings, roads, bridges, and infrastructure.",
      roadmap: [
        "12th with PCM",
        "B.Tech/B.E in Civil Engineering",
        "Learn AutoCAD, STAAD Pro, project management tools",
        "Undertake field internships or site projects",
        "Optional: M.Tech in Structural/Geotechnical/Transportation"
      ]
    },
    {
      name: "Mechanical Engineer",
      description: "Designs machines, engines, and mechanical systems used in manufacturing and industry.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Mechanical Engineering",
        "Learn SolidWorks, AutoCAD, Ansys, manufacturing processes",
        "Complete internships in automotive/manufacturing firms",
        "Optional: M.Tech in Thermal, Design, Robotics"
      ]
    },
    {
      name: "Electrical Engineer",
      description: "Works on electric systems, circuits, power generation, and electrical safety.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Electrical Engineering",
        "Learn about circuits, machines, MATLAB, power systems",
        "Intern in power, utility, or hardware companies",
        "Optional: M.Tech or certifications (Energy Audit, PLC, SCADA)"
      ]
    },
    {
      name: "Electronics & Communication Engineer",
      description: "Deals with electronic devices, digital systems, and telecommunication networks.",
      roadmap: [
        "12th with PCM",
        "B.Tech in ECE (Electronics and Communication)",
        "Learn embedded systems, VLSI, IoT, digital electronics",
        "Do projects on microcontrollers and circuits",
        "Optional: M.Tech or certifications in embedded/VLSI"
      ]
    },
    {
      name: "Computer Engineer",
      description: "Combines hardware and software to develop computing systems and embedded solutions.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Computer Engineering or Computer Science",
        "Learn computer architecture, OS, networking",
        "Work on low-level programming or embedded systems",
        "Optional: M.Tech or MS in Computer Engineering"
      ]
    },
    {
      name: "Chemical Engineer",
      description: "Applies chemical processes in industries like pharma, petrochemicals, and food tech.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Chemical Engineering",
        "Study thermodynamics, reaction engineering, process design",
        "Intern in chemical/pharma/food industries",
        "Optional: M.Tech or certifications in process engineering"
      ]
    },
    {
      name: "Automobile Engineer",
      description: "Designs and develops vehicles and automobile systems including EVs.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Automobile or Mechanical Engineering",
        "Learn automotive systems, IC engines, CAD tools",
        "Intern in car manufacturing or EV startups",
        "Optional: M.Tech in Automotive Engineering"
      ]
    },
    {
      name: "Aerospace Engineer",
      description: "Builds and tests aircraft, satellites, and spacecraft systems.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Aerospace or Aeronautical Engineering",
        "Learn fluid mechanics, propulsion, aerodynamics",
        "Work on simulations and aircraft design projects",
        "Optional: M.Tech/MS in Aerospace fields"
      ]
    },
    {
      name: "Biomedical Engineer",
      description: "Develops medical devices and technologies integrating biology with engineering.",
      roadmap: [
        "12th with PCM or PCB",
        "B.Tech in Biomedical Engineering",
        "Study human anatomy, medical devices, instrumentation",
        "Intern in hospitals or medical tech companies",
        "Optional: M.Tech in Medical Electronics or Bioengineering"
      ]
    },
    {
      name: "Environmental Engineer",
      description: "Creates sustainable solutions for pollution control, waste management, and resource conservation.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Environmental or Civil Engineering",
        "Study water treatment, air pollution, EIA",
        "Work with environmental NGOs, PSUs, or consultancies",
        "Optional: M.Tech or certification in Sustainability"
      ]
    },
    {
      name: "Marine Engineer",
      description: "Designs, builds, and maintains ships, engines, and other marine systems.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Marine Engineering",
        "Learn ship mechanics, fluid dynamics, navigation systems",
        "Complete training at maritime institutes",
        "Obtain DG Shipping certification for seafaring jobs"
      ]
    },
    {
      name: "Mining Engineer",
      description: "Plans and supervises the extraction of minerals from the earth safely and efficiently.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Mining Engineering",
        "Learn geology, mine planning, drilling, safety",
        "Intern at coal, metal, or mineral mines",
        "Optional: M.Tech in Mining or Geo-resources"
      ]
    },
    {
      name: "Petroleum Engineer",
      description: "Focuses on oil and gas exploration, drilling, and reservoir management.",
      roadmap: [
        "12th with PCM",
        "B.Tech in Petroleum Engineering",
        "Study drilling engineering, fluid flow, reservoir modeling",
        "Intern in oil refineries or energy companies (ONGC, Shell, etc.)",
        "Optional: M.Tech in Petroleum or Offshore Engineering"
      ]
    }
  ]
},
{
  id: 6,
  title: "Interior Designer",
  category: "Design",
  image: interior_designer, // Replace with your image variable
  description:
    "Interior designers create functional and visually appealing indoor spaces. They choose color schemes, furniture, materials, and lighting to enhance aesthetics and utility in homes, offices, and commercial spaces.",
  skills: ["Creativity", "CAD", "Communication", "Color Theory", "Spatial Planning"],
  roadmap: [
    "Complete 12th (any stream, Arts or Commerce preferred)",
    "Pursue Bachelor's in Interior Design, Architecture, or B.Des",
    "Learn design software (AutoCAD, SketchUp, 3ds Max)",
    "Intern under design firms or freelance with small projects",
    "Build a portfolio and pursue specialization if desired"
  ],
  salary: "₹4–10 LPA",
  subcategories: [
    {
      name: "Residential Interior Designer",
      description: "Specializes in designing homes, apartments, and private living spaces.",
      roadmap: [
        "12th (any stream)",
        "Bachelor’s/Diploma in Interior Design",
        "Learn space optimization and design trends",
        "Gain experience through freelance or home projects"
      ]
    },
    {
      name: "Commercial Interior Designer",
      description: "Designs interior spaces for offices, restaurants, retail stores, and hotels.",
      roadmap: [
        "12th (any stream)",
        "Bachelor’s in Interior or Commercial Space Design",
        "Study ergonomics, branding in space, and lighting",
        "Intern with commercial real estate or design agencies"
      ]
    },
    {
      name: "Furniture Designer",
      description: "Focuses on designing and customizing functional and aesthetic furniture pieces.",
      roadmap: [
        "12th (any stream)",
        "Degree/Diploma in Furniture Design or Interior Design",
        "Learn woodwork, ergonomics, and 3D modeling software",
        "Build a physical or virtual portfolio of furniture designs"
      ]
    },
    {
      name: "Exhibition Designer",
      description: "Creates layouts and temporary structures for exhibitions, museums, and trade shows.",
      roadmap: [
        "12th (any stream)",
        "Diploma or Bachelor's in Exhibition/Interior Design",
        "Learn temporary structure planning and brand storytelling",
        "Work with event or trade show organizers"
      ]
    },
    {
      name: "Sustainable Interior Designer",
      description: "Uses eco-friendly materials and designs to reduce environmental impact.",
      roadmap: [
        "12th (any stream)",
        "Bachelor’s in Interior Design with focus on sustainability",
        "Learn green building codes, material sourcing, and LEED concepts",
        "Certify with green building councils (like IGBC, LEED)"
      ]
    }
  ]
},
{
  id: 7,
  title: "Business Analyst",
  category: "Business",
  image: business_analyst, // Replace with your image variable
  description:
    "Business Analysts help organizations improve their operations by analyzing data, processes, and systems. They act as a bridge between stakeholders and technical teams to ensure efficient solutions are implemented.",
  skills: ["Excel", "SQL", "Problem Solving", "Data Visualization", "Business Communication"],
  roadmap: [
    "Complete 12th (any stream, Commerce or Science recommended)",
    "Pursue BBA, B.Com, B.Tech, or equivalent degree",
    "Gain knowledge of Excel, SQL, and analytical tools like Tableau or Power BI",
    "Get certified (CBAP, ECBA, PMI-PBA, or Google Data Analytics)",
    "Intern or work in analyst roles to gain business process experience"
  ],
  salary: "₹6–14 LPA",
  subcategories: [
    {
      name: "IT Business Analyst",
      description: "Works with software development teams to translate business needs into technical requirements.",
      roadmap: [
        "12th with Commerce or Science",
        "Bachelor’s in IT, CS, or Business",
        "Learn Agile, SDLC, and tools like JIRA, Confluence",
        "Bridge gap between developers and stakeholders"
      ]
    },
    {
      name: "Data Analyst",
      description: "Analyzes data to derive insights and trends, often supporting decision-making.",
      roadmap: [
        "12th with Math or Commerce",
        "BBA, B.Sc, or B.Tech in Statistics, CS, or Business",
        "Learn Excel, SQL, Python, Tableau/Power BI",
        "Work on real data projects and dashboards"
      ]
    },
    {
      name: "Financial Analyst",
      description: "Focuses on budgeting, forecasting, and financial modeling to support strategic decisions.",
      roadmap: [
        "12th with Commerce or Math",
        "B.Com, BBA in Finance, or Economics",
        "Learn Financial Modeling, Excel, SAP, and investment principles",
        "Certifications: CFA, FMVA (optional)"
      ]
    },
    {
      name: "Product Analyst",
      description: "Analyzes product performance, user behavior, and helps improve user experience.",
      roadmap: [
        "12th with PCM/Commerce",
        "Bachelor’s in Business, CS, or Data Analytics",
        "Learn tools like Mixpanel, Google Analytics, SQL",
        "Work closely with product teams and UX researchers"
      ]
    },
    {
      name: "Operations Analyst",
      description: "Improves internal processes, logistics, and performance across departments.",
      roadmap: [
        "12th (any stream)",
        "Bachelor’s in Operations, Management, or Engineering",
        "Learn process improvement tools, Six Sigma, and MS Excel",
        "Gain experience in supply chain or ops roles"
      ]
    }
  ]
},
{
  id: 8,
  title: "Lawyer",
  category: "Legal",
  image: lawyer, // Replace with your image variable
  description:
    "Lawyers represent clients in legal matters, provide counsel, and ensure justice is served. They specialize in areas like criminal, civil, corporate, or constitutional law and play a vital role in upholding the law.",
  skills: ["Law Knowledge", "Debating", "Communication", "Critical Thinking", "Research"],
  roadmap: [
    "Complete 12th (any stream)",
    "Pursue 5-year integrated law course (BA LLB/BBA LLB) or 3-year LLB after graduation",
    "Intern with law firms or under advocates",
    "Pass the All India Bar Examination (AIBE)",
    "Register with Bar Council and specialize via practice or LLM"
  ],
  salary: "₹5–20 LPA",
  subcategories: [
    {
      name: "Criminal Lawyer",
      description: "Defends or prosecutes individuals accused of criminal offenses in court.",
      roadmap: [
        "12th (any stream)",
        "BA LLB or LLB",
        "Gain criminal law experience via internships or clerkships",
        "Work in trial courts or with senior criminal advocates"
      ]
    },
    {
      name: "Corporate Lawyer",
      description: "Advises businesses on legal obligations, contracts, mergers, and compliance.",
      roadmap: [
        "12th (any stream)",
        "BBA LLB or LLB with corporate law electives",
        "Intern with corporate firms or MNCs",
        "Pursue LLM in Corporate or Business Law (optional)"
      ]
    },
    {
      name: "Civil Lawyer",
      description: "Handles disputes between individuals, such as property, family, or contract issues.",
      roadmap: [
        "12th (any stream)",
        "BA LLB or LLB",
        "Specialize in civil litigation during practice",
        "Gain experience in family courts, consumer forums, and property matters"
      ]
    },
    {
      name: "Intellectual Property (IPR) Lawyer",
      description: "Deals with copyright, trademark, patents, and intellectual property protection.",
      roadmap: [
        "12th (any stream)",
        "LLB with IPR electives",
        "Pursue Postgraduate Diploma or LLM in IPR",
        "Register with IP offices for patent/trademark practice"
      ]
    },
    {
      name: "Constitutional Lawyer",
      description: "Focuses on matters involving the Constitution, rights, and public interest litigation (PIL).",
      roadmap: [
        "12th (any stream)",
        "BA LLB or LLB",
        "Practice in High Courts or Supreme Court",
        "Work under senior advocates in PIL or human rights law"
      ]
    }
  ]
},
{
  id: 9,
  title: "Journalist",
  category: "Media",
  image: journalist, // Replace with your image variable
  description:
    "Journalists research, write, and report news and stories for newspapers, TV, radio, and digital platforms. They play a vital role in informing the public and upholding democracy.",
  skills: ["Writing", "Speaking", "Interviewing", "Research", "Analytical Thinking"],
  roadmap: [
    "Complete 12th (any stream)",
    "Pursue a degree in Journalism, Mass Communication, or BJMC",
    "Build strong writing and public speaking skills",
    "Do internships with news agencies, TV channels, or magazines",
    "Optional: Pursue a PG Diploma or Master’s in Journalism"
  ],
  salary: "₹3–8 LPA",
  subcategories: [
    {
      name: "News Reporter",
      description: "Covers daily news events, attends press conferences, and delivers on-the-ground reports.",
      roadmap: [
        "12th (any stream)",
        "Bachelor's in Journalism or Mass Communication",
        "Intern at news channels or print media",
        "Build a portfolio with live news reporting experience"
      ]
    },
    {
      name: "Investigative Journalist",
      description: "Conducts deep investigations to uncover corruption, fraud, or hidden facts in public interest.",
      roadmap: [
        "12th (any stream)",
        "BJMC or Mass Communication degree",
        "Study investigative techniques and ethics",
        "Publish feature stories and expose reports"
      ]
    },
    {
      name: "Photojournalist",
      description: "Tells visual stories by capturing images of news events, people, or places.",
      roadmap: [
        "12th (any stream)",
        "Bachelor’s in Journalism or Photography",
        "Learn camera techniques and photo editing",
        "Build a visual portfolio and work with agencies or freelancers"
      ]
    },
    {
      name: "Broadcast Journalist",
      description: "Presents news on TV or radio, often live, requiring excellent speaking and presentation skills.",
      roadmap: [
        "12th (any stream)",
        "Bachelor's in Mass Communication",
        "Train in voice modulation, teleprompter use, and media scripting",
        "Intern in TV/radio stations as anchor or scriptwriter"
      ]
    },
    {
      name: "Digital Journalist",
      description: "Produces and manages content for online news portals, blogs, and social media platforms.",
      roadmap: [
        "12th (any stream)",
        "Bachelor’s in Digital Media or Journalism",
        "Learn SEO, social media management, CMS (WordPress)",
        "Start a blog or contribute to online news platforms"
      ]
    }
  ]
}




];

export default careerData;