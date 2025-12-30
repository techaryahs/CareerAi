
  /**
   * Master Tutor List for EduTutor
   *
   * Rules:
   * - Tutors are matched primarily by SUBJECTS
   * - Multiple tutors can teach the same subject
   * - Tutors can teach multiple subjects
   */

  export const EDU_TUTORS = [
    // ================= CSE TUTORS =================
    {
      id: "t_cse_01",
      name: "Rahul Sharma",
      experienceYears: 8,
      rating: 4.9,
      hourlyPrice: 850,
      subjectIds: ["dsa", "oops", "programming_fundamentals"],
      slots: ["Mon 6-7 PM", "Wed 6-7 PM", "Fri 6-7 PM"],
      active: true,
    },
    {
      id: "t_cse_02",
      name: "Priya Venkatesh",
      experienceYears: 5,
      rating: 4.7,
      hourlyPrice: 700,
      subjectIds: ["dsa", "dbms", "os"],
      slots: ["Tue 5-6 PM", "Thu 5-6 PM", "Sat 10-11 AM"],
      active: true,
    },
    {
      id: "t_cse_03",
      name: "Amit Patel",
      experienceYears: 10,
      rating: 4.8,
      hourlyPrice: 1200,
      subjectIds: ["ai_intro", "ml", "dl"],
      slots: ["Sat 2-4 PM", "Sun 2-4 PM"],
      active: true,
    },
    {
      id: "t_cse_04",
      name: "Sneha Reddy",
      experienceYears: 6,
      rating: 4.6,
      hourlyPrice: 900,
      subjectIds: ["cn", "os", "cybersec"],
      slots: ["Mon 8-9 PM", "Wed 8-9 PM"],
      active: true,
    },
    {
      id: "t_cse_05",
      name: "Vikram Malhotra",
      experienceYears: 12,
      rating: 5.0,
      hourlyPrice: 1500,
      subjectIds: ["cloud", "se", "compiler"],
      slots: ["Sat 6-8 PM", "Sun 10-12 AM"],
      active: true,
    },
    {
      id: "t_cse_06",
      name: "Anjali Gupta",
      experienceYears: 4,
      rating: 4.5,
      hourlyPrice: 600,
      subjectIds: ["oops", "dsa"],
      slots: ["Mon 4-5 PM", "Wed 4-5 PM"],
      active: true,
    },
    {
      id: "t_cse_07",
      name: "Pooja Khatri",
      experienceYears: 7,
      rating: 4.6,
      hourlyPrice: 800,
      subjectIds: ["eng_math", "se", "compiler"],
      slots: ["Tue 8-9 PM", "Thu 8-9 PM"],
      active: true,
    },

    // ================= ECE TUTORS =================
    {
      id: "t_ece_01",
      name: "Rohan Das",
      experienceYears: 9,
      rating: 4.8,
      hourlyPrice: 1000,
      subjectIds: ["signals", "comm"],
      slots: ["Tue 7-8 PM", "Thu 7-8 PM"],
      active: true,
    },
    {
      id: "t_ece_02",
      name: "Meera Iyer",
      experienceYears: 7,
      rating: 4.9,
      hourlyPrice: 1100,
      subjectIds: ["vlsi_design", "embedded_systems", "micro"],
      slots: ["Sat 4-6 PM", "Sun 4-6 PM"],
      active: true,
    },
    {
      id: "t_ece_03",
      name: "Karthik N",
      experienceYears: 5,
      rating: 4.6,
      hourlyPrice: 800,
      subjectIds: ["comm", "signals"],
      slots: ["Mon 6-7 PM", "Fri 6-7 PM"],
      active: true,
    },
    // EEE
    {
      id: "t_eee_01",
      name: "Vivek Rao",
      experienceYears: 10,
      rating: 4.7,
      hourlyPrice: 900,
      subjectIds: ["power_systems", "control_systems"],
      slots: ["Wed 7-8 PM", "Sat 7-8 PM"],
      active: true,
    },

    // ================= MECHANICAL TUTORS =================
    {
      id: "t_mech_01",
      name: "Suresh Yadav",
      experienceYears: 15,
      rating: 4.9,
      hourlyPrice: 1200,
      subjectIds: ["thermo", "heat_transfer", "fluid_mech"],
      slots: ["Sat 9-11 AM", "Sun 9-11 AM"],
      active: true,
    },
    {
      id: "t_mech_02",
      name: "Dinesh Kumar",
      experienceYears: 6,
      rating: 4.5,
      hourlyPrice: 750,
      subjectIds: ["mech_strength_materials", "theory_of_machines"],
      slots: ["Tue 6-7 PM", "Thu 6-7 PM"],
      active: true,
    },
    {
      id: "t_mech_03",
      name: "Rajesh Singh",
      experienceYears: 8,
      rating: 4.7,
      hourlyPrice: 900,
      subjectIds: ["manufacturing", "mech_strength_materials"],
      slots: ["Mon 5-6 PM", "Wed 5-6 PM"],
      active: true,
    },

    // ================= MEDICAL TUTORS =================
    {
      id: "t_med_01",
      name: "Dr. Arjun Kapoor",
      experienceYears: 12,
      rating: 5.0,
      hourlyPrice: 2000,
      subjectIds: ["anatomy", "physiology"],
      slots: ["Sat 5-7 PM", "Sun 10-12 AM"],
      active: true,
    },
    {
      id: "t_med_02",
      name: "Dr. Kavita Rao",
      experienceYears: 8,
      rating: 4.9,
      hourlyPrice: 1800,
      subjectIds: ["pathology", "microbiology_med", "pharmacology"],
      slots: ["Tue 8-9 PM", "Thu 8-9 PM"],
      active: true,
    },
    {
      id: "t_med_03",
      name: "Dr. Sameer Khan",
      experienceYears: 10,
      rating: 4.8,
      hourlyPrice: 1900,
      subjectIds: ["biochemistry", "physiology"],
      slots: ["Mon 7-8 PM", "Wed 7-8 PM"],
      active: true,
    },
    {
      id: "t_med_04",
      name: "Dr. Neha Agarwal",
      experienceYears: 6,
      rating: 4.7,
      hourlyPrice: 1500,
      subjectIds: ["forensic", "community_health"],
      slots: ["Fri 5-7 PM"],
      active: true,
    },
    {
      id: "t_med_05",
      name: "Dr. Abhishek Tiwari",
      experienceYears: 9,
      rating: 4.7,
      hourlyPrice: 1700,
      subjectIds: ["pharm_chem", "pharm_prac"],
      slots: ["Tue 7-8 PM", "Sun 6-7 PM"],
      active: true,
    },
    {
      id: "t_med_06",
      name: "Dr. Ritu Sharma",
      experienceYears: 7,
      rating: 4.6,
      hourlyPrice: 1600,
      subjectIds: ["radiology", "lab_tech"],
      slots: ["Mon 6-7 PM", "Thu 6-7 PM"],
      active: true,
    },

    // ================= CIVIL TUTORS =================
    {
      id: "t_civil_01",
      name: "Rajiv Verma",
      experienceYears: 10,
      rating: 4.8,
      hourlyPrice: 1000,
      subjectIds: ["survey", "strength_materials", "structural"],
      slots: ["Sat 10-12 AM", "Sun 10-12 AM"],
      active: true,
    },
    {
      id: "t_civil_02",
      name: "Anita Desai",
      experienceYears: 7,
      rating: 4.7,
      hourlyPrice: 900,
      subjectIds: ["environmental_engineering_civil", "transportation_engineering", "fluid_mechanics_civil"],
      slots: ["Mon 6-8 PM", "Wed 6-8 PM"],
      active: true,
    },
    {
      id: "t_civil_03",
      name: "Manoj Kumar",
      experienceYears: 12,
      rating: 4.9,
      hourlyPrice: 1100,
      subjectIds: ["geotech", "structural"],
      slots: ["Tue 7-9 PM", "Thu 7-9 PM"],
      active: true,
    },

    // ================= EXTRA CSE TUTORS =================
    {
      id: "t_cse_web_01",
      name: "Sarah Lee",
      experienceYears: 5,
      rating: 4.8,
      hourlyPrice: 1200,
      subjectIds: ["web", "programming_fundamentals", "dsa"],
      slots: ["Sat 2-4 PM", "Sun 2-4 PM"],
      active: true,
    },
    {
      id: "t_cse_cg_01",
      name: "David Chen",
      experienceYears: 8,
      rating: 4.7,
      hourlyPrice: 1400,
      subjectIds: ["ai_intro", "ml"],
      slots: ["Fri 6-8 PM", "Sat 6-8 PM"],
      active: true,
    },
    
    // ================= COMMERCE TUTORS =================
    {
      id: "t_comm_01",
      name: "Neeraj Bansal",
      experienceYears: 9,
      rating: 4.8,
      hourlyPrice: 900,
      subjectIds: ["accounting_fund", "corporate_fin", "marketing"],
      slots: ["Tue 7-8 PM", "Thu 7-8 PM", "Sat 11-12 AM"],
      active: true,
    },
    {
      id: "t_comm_02",
      name: "Ritika Mehta",
      experienceYears: 6,
      rating: 4.6,
      hourlyPrice: 750,
      subjectIds: ["accounting_fund", "microeconomics", "marketing"],
      slots: ["Mon 5-6 PM", "Wed 5-6 PM"],
      active: true,
    },
    {
      id: "t_comm_03",
      name: "Aakash Kapoor",
      experienceYears: 5,
      rating: 4.5,
      hourlyPrice: 700,
      subjectIds: ["corporate_fin", "microeconomics"],
      slots: ["Fri 5-6 PM", "Sat 5-6 PM"],
      active: true,
    },

    // ================= SCIENCE TUTORS =================
    {
      id: "t_sci_01",
      name: "Prof. Arvind Gupta",
      experienceYears: 12,
      rating: 4.9,
      hourlyPrice: 1000,
      subjectIds: ["calculus", "physics_ug", "chemistry_ug"],
      slots: ["Sat 10-12 AM", "Sun 10-12 AM"],
      active: true,
    },
    {
      id: "t_sci_02",
      name: "Dr. Shalini Bose",
      experienceYears: 8,
      rating: 4.7,
      hourlyPrice: 950,
      subjectIds: ["calculus", "biology_ug", "chemistry_ug"],
      slots: ["Tue 6-7 PM", "Thu 6-7 PM"],
      active: true,
    },
    {
      id: "t_sci_03",
      name: "Dr. Manoj Narayan",
      experienceYears: 9,
      rating: 4.6,
      hourlyPrice: 900,
      subjectIds: ["linear_algebra", "organic_chem", "physics_mech"],
      slots: ["Mon 7-8 PM", "Wed 7-8 PM"],
      active: true,
    },
    {
      id: "t_sci_04",
      name: "Dr. Aisha Khan",
      experienceYears: 7,
      rating: 4.5,
      hourlyPrice: 850,
      subjectIds: ["bio_fund", "biotech_ug", "env_science_ug"],
      slots: ["Tue 5-6 PM", "Thu 5-6 PM"],
      active: true,
    },

    // ================= LAW TUTORS =================
    {
      id: "t_law_01",
      name: "Adv. Saurabh Jain",
      experienceYears: 10,
      rating: 4.8,
      hourlyPrice: 1200,
      subjectIds: ["law_subject"],
      slots: ["Mon 7-8 PM", "Wed 7-8 PM"],
      active: true,
    },
    {
      id: "t_law_02",
      name: "Adv. Nisha Pillai",
      experienceYears: 7,
      rating: 4.6,
      hourlyPrice: 1000,
      subjectIds: ["law_subject", "political_science_subject"],
      slots: ["Fri 6-7 PM", "Sat 6-7 PM"],
      active: true,
    },

    // ================= COMPUTER APPLICATIONS TUTORS =================
    {
      id: "t_bca_01",
      name: "Harshita Deshpande",
      experienceYears: 6,
      rating: 4.6,
      hourlyPrice: 800,
      subjectIds: ["bca_prog", "bca_web"],
      slots: ["Mon 6-7 PM", "Wed 6-7 PM"],
      active: true,
    },
    {
      id: "t_mca_01",
      name: "Rohit Sinha",
      experienceYears: 8,
      rating: 4.7,
      hourlyPrice: 950,
      subjectIds: ["mca_advanced_java", "mca_cloud"],
      slots: ["Sat 3-4 PM", "Sun 3-4 PM"],
      active: true,
    },

    // ================= HOTEL MANAGEMENT TUTORS =================
    {
      id: "t_bhm_01",
      name: "Chef Arvind Nair",
      experienceYears: 15,
      rating: 4.9,
      hourlyPrice: 1200,
      subjectIds: ["bhm_food_prod", "bhm_housekeeping"],
      slots: ["Sat 1-2 PM", "Sun 1-2 PM"],
      active: true,
    },
    {
      id: "t_bhm_02",
      name: "Anita Thomas",
      experienceYears: 10,
      rating: 4.7,
      hourlyPrice: 900,
      subjectIds: ["hotel_mgmt_ops", "bhm_housekeeping"],
      slots: ["Tue 2-3 PM", "Thu 2-3 PM"],
      active: true,
    },

    // ================= MASS COMM TUTORS =================
    {
      id: "t_bjmc_01",
      name: "Rajesh Malhotra",
      experienceYears: 9,
      rating: 4.6,
      hourlyPrice: 800,
      subjectIds: ["bjmc_journalism", "bjmc_media_laws"],
      slots: ["Mon 4-5 PM", "Wed 4-5 PM"],
      active: true,
    },
    {
      id: "t_mjmc_01",
      name: "Priyanka Chawla",
      experienceYears: 7,
      rating: 4.5,
      hourlyPrice: 850,
      subjectIds: ["mjmc_advertising", "bjmc_media_laws"],
      slots: ["Fri 4-5 PM", "Sat 4-5 PM"],
      active: true,
    },

    // ================= SPORTS TUTORS =================
    {
      id: "t_sports_01",
      name: "Coach Ankit Verma",
      experienceYears: 8,
      rating: 4.6,
      hourlyPrice: 700,
      subjectIds: ["phy_ed_anatomy", "sports_mgmt_marketing"],
      slots: ["Tue 7-8 AM", "Thu 7-8 AM"],
      active: true,
    },
    {
      id: "t_sports_02",
      name: "Coach Neha Kulkarni",
      experienceYears: 6,
      rating: 4.5,
      hourlyPrice: 650,
      subjectIds: ["phy_ed_anatomy"],
      slots: ["Sat 8-9 AM", "Sun 8-9 AM"],
      active: true,
    },

    // ================= CIVIL SERVICES / DEFENCE TUTORS =================
    {
      id: "t_upsc_01",
      name: "Mentor Vivek Singh",
      experienceYears: 12,
      rating: 4.8,
      hourlyPrice: 1000,
      subjectIds: ["upsc_history", "upsc_geography", "upsc_polity", "upsc_economy", "state_psc_gs"],
      slots: ["Mon 8-9 PM", "Wed 8-9 PM"],
      active: true,
    },
    {
      id: "t_ssc_01",
      name: "Mentor Rakesh Kumar",
      experienceYears: 9,
      rating: 4.6,
      hourlyPrice: 800,
      subjectIds: ["ssc_quant", "ssc_reasoning"],
      slots: ["Tue 8-9 PM", "Thu 8-9 PM"],
      active: true,
    },
    {
      id: "t_rbi_01",
      name: "Mentor Deepa Joshi",
      experienceYears: 10,
      rating: 4.7,
      hourlyPrice: 1100,
      subjectIds: ["rbi_finance"],
      slots: ["Sat 5-6 PM", "Sun 5-6 PM"],
      active: true,
    },
    {
      id: "t_def_01",
      name: "Mentor Ajay Rana",
      experienceYears: 8,
      rating: 4.6,
      hourlyPrice: 850,
      subjectIds: ["nda_math", "nda_gat", "cds_english", "cds_gk", "afcat_reasoning"],
      slots: ["Sat 7-8 PM", "Sun 7-8 PM"],
      active: true,
    },

    // ================= ARCHITECTURE TUTORS =================
    {
      id: "t_arch_01",
      name: "Ar. Shruti Mehra",
      experienceYears: 11,
      rating: 4.8,
      hourlyPrice: 950,
      subjectIds: ["design_basis", "building_technology"],
      slots: ["Mon 3-4 PM", "Wed 3-4 PM"],
      active: true,
    },

    // ================= DESIGN TUTORS =================
    {
      id: "t_design_01",
      name: "Ananya Kapoor",
      experienceYears: 7,
      rating: 4.6,
      hourlyPrice: 800,
      subjectIds: ["uiux", "graphic"],
      slots: ["Tue 6-7 PM", "Thu 6-7 PM"],
      active: true,
    },
    {
      id: "t_design_02",
      name: "Raghav Jain",
      experienceYears: 6,
      rating: 4.5,
      hourlyPrice: 750,
      subjectIds: ["fashion", "graphic"],
      slots: ["Sat 2-3 PM", "Sun 2-3 PM"],
      active: true,
    },

    // ================= AGRICULTURE TUTORS =================
    {
      id: "t_agri_01",
      name: "Dr. Nitin Pawar",
      experienceYears: 10,
      rating: 4.7,
      hourlyPrice: 800,
      subjectIds: ["crop_science", "horticulture"],
      slots: ["Mon 9-10 AM", "Wed 9-10 AM"],
      active: true,
    },

    // ================= VOCATIONAL / ITI TUTORS =================
    {
      id: "t_iti_01",
      name: "Trainer Sandeep",
      experienceYears: 8,
      rating: 4.6,
      hourlyPrice: 600,
      subjectIds: ["electrical_trade", "fitter_trade"],
      slots: ["Tue 10-11 AM", "Thu 10-11 AM"],
      active: true,
    },

    // ================= ARTS & HUMANITIES TUTORS =================
    {
      id: "t_arts_01",
      name: "Prof. Kavita Nair",
      experienceYears: 12,
      rating: 4.8,
      hourlyPrice: 750,
      subjectIds: ["history_subject", "sociology_subject"],
      slots: ["Fri 3-4 PM", "Sat 3-4 PM"],
      active: true,
    },
    {
      id: "t_arts_02",
      name: "Prof. Aditya Roy",
      experienceYears: 9,
      rating: 4.7,
      hourlyPrice: 800,
      subjectIds: ["psychology_subject", "political_science_subject"],
      slots: ["Tue 4-5 PM", "Thu 4-5 PM"],
      active: true,
    },

    // ================= EDUCATION TUTORS =================
    {
      id: "t_bed_01",
      name: "Teacher Sunita Sharma",
      experienceYears: 8,
      rating: 4.6,
      hourlyPrice: 650,
      subjectIds: ["pedagogy"],
      slots: ["Mon 5-6 PM", "Wed 5-6 PM"],
      active: true,
    },
    
  // ==================================================
  // 1. ENGINEERING (CSE, AI, Web, GATE)
  // ==================================================
  {
    id: "t_cse_11",
    name: "Siddharth Malhotra",
    experienceYears: 6,
    rating: 4.7,
    hourlyPrice: 900,
    subjectIds: ["dsa", "cs_dsa", "bca_ds", "gate_core"],
    slots: ["Mon 5-6 PM", "Wed 5-6 PM"],
    active: true,
  },
  {
    id: "t_cse_12",
    name: "Tanya Kapoor",
    experienceYears: 4,
    rating: 4.5,
    hourlyPrice: 650,
    subjectIds: ["bca_web", "cs_web_tech", "bca_java"],
    slots: ["Sat 11-1 PM"],
    active: true,
  },
  {
    id: "t_cse_13",
    name: "Er. Vivek Oberoi",
    experienceYears: 10,
    rating: 4.9,
    hourlyPrice: 1400,
    subjectIds: ["gate_core", "cs_algo", "cs_toc"],
    slots: ["Sun 9-11 AM"],
    active: true,
  },
  {
    id: "t_cse_14",
    name: "Meenal Parekh",
    experienceYears: 7,
    rating: 4.8,
    hourlyPrice: 1100,
    subjectIds: ["da_python", "da_ml1", "ai_intro", "cs_ai"],
    slots: ["Tue 7-9 PM"],
    active: true,
  },
  {
    id: "t_cse_15",
    name: "Rohan Das",
    experienceYears: 5,
    rating: 4.6,
    hourlyPrice: 800,
    subjectIds: ["bca_c_prog", "bca_cpp", "cs_prog_c"],
    slots: ["Thu 4-6 PM"],
    active: true,
  },
  {
    id: "t_civil_04",
    name: "Er. Rajesh Meena",
    experienceYears: 12,
    rating: 4.8,
    hourlyPrice: 1000,
    subjectIds: ["gate_core", "poly_mech", "iti_ed"],
    slots: ["Sat 6-8 PM"],
    active: true,
  },

  // ==================================================
  // 2. MEDICAL (MBBS, BDS, BAMS, BHMS)
  // ==================================================
  {
    id: "t_med_11",
    name: "Dr. Susan George",
    experienceYears: 9,
    rating: 4.9,
    hourlyPrice: 1600,
    subjectIds: ["mbbs_anatomy", "bds_gen_anatomy", "bams_rachana", "bhms_anatomy"],
    slots: ["Mon 6-8 PM"],
    active: true,
  },
  {
    id: "t_med_12",
    name: "Dr. Rahul Nair",
    experienceYears: 11,
    rating: 4.8,
    hourlyPrice: 1800,
    subjectIds: ["mbbs_physiology", "bds_gen_physiology", "bpt_phys"],
    slots: ["Wed 7-9 PM"],
    active: true,
  },
  {
    id: "t_med_13",
    name: "Dr. Anjali Deshmukh",
    experienceYears: 7,
    rating: 4.7,
    hourlyPrice: 1400,
    subjectIds: ["mbbs_microbiology", "bds_gen_path_micro", "nursing_micro_path"],
    slots: ["Fri 5-7 PM"],
    active: true,
  },
  {
    id: "t_med_14",
    name: "Dr. K. L. Verma",
    experienceYears: 20,
    rating: 5.0,
    hourlyPrice: 2500,
    subjectIds: ["mbbs_gen_surgery", "bds_gen_surg", "bhms_surgery"],
    slots: ["Sun 10-12 AM"],
    active: true,
  },
  {
    id: "t_med_15",
    name: "Dr. Preeti Singh (Ayurveda)",
    experienceYears: 8,
    rating: 4.8,
    hourlyPrice: 1200,
    subjectIds: ["bams_dravyaguna", "bams_kriya", "bams_padartha"],
    slots: ["Tue 4-6 PM"],
    active: true,
  },
  {
    id: "t_med_16",
    name: "Dr. H. Khurana (Homeopath)",
    experienceYears: 15,
    rating: 4.9,
    hourlyPrice: 1500,
    subjectIds: ["bhms_materia_1", "bhms_organon_1", "bhms_pharmacy"],
    slots: ["Thu 6-8 PM"],
    active: true,
  },
  {
    id: "t_nurs_03",
    name: "Nurse Linda Fernandez",
    experienceYears: 12,
    rating: 4.7,
    hourlyPrice: 900,
    subjectIds: ["nurs_child", "nurs_comm1", "nurs_anat_phys"],
    slots: ["Sat 3-5 PM"],
    active: true,
  },

  // ==================================================
  // 3. COMMERCE (CA, CMA, B.Com)
  // ==================================================
  {
    id: "t_comm_08",
    name: "CA Deepak Jain",
    experienceYears: 8,
    rating: 4.8,
    hourlyPrice: 1300,
    subjectIds: ["ca_inter_audit", "ca_final_audit", "bcom_audit"],
    slots: ["Mon 7-9 AM"],
    active: true,
  },
  {
    id: "t_comm_09",
    name: "CMA Rakesh Gupta",
    experienceYears: 10,
    rating: 4.7,
    hourlyPrice: 1200,
    subjectIds: ["cma_inter_cost", "cma_final_scm", "bcom_cost_acct"],
    slots: ["Wed 6-8 PM"],
    active: true,
  },
  {
    id: "t_comm_10",
    name: "Prof. Malini Iyer",
    experienceYears: 14,
    rating: 4.9,
    hourlyPrice: 1100,
    subjectIds: ["bcom_fin_acct", "bba_acct", "mba_acct"],
    slots: ["Fri 10-12 AM"],
    active: true,
  },
  {
    id: "t_comm_11",
    name: "CS Varun Sethi",
    experienceYears: 6,
    rating: 4.6,
    hourlyPrice: 900,
    subjectIds: ["bcom_corp_law", "ca_inter_law", "cma_final_law"],
    slots: ["Sat 4-6 PM"],
    active: true,
  },
  {
    id: "t_comm_12",
    name: "Dr. S. K. Aggarwal",
    experienceYears: 18,
    rating: 4.8,
    hourlyPrice: 1500,
    subjectIds: ["ca_fnd_eco", "bcom_micro", "mba_managerial_eco"],
    slots: ["Sun 11-1 PM"],
    active: true,
  },

  // ==================================================
  // 4. ARTS & HUMANITIES (History, Pol Sci, Geog)
  // ==================================================
  {
    id: "t_arts_06",
    name: "Dr. Ramachandra Guha",
    experienceYears: 22,
    rating: 5.0,
    hourlyPrice: 2000,
    subjectIds: ["hist_india1", "hist_india8", "upsc_gs1"],
    slots: ["Sat 5-7 PM"],
    active: true,
  },
  {
    id: "t_arts_07",
    name: "Prof. Nida Hasan",
    experienceYears: 10,
    rating: 4.8,
    hourlyPrice: 950,
    subjectIds: ["pol_theory1", "pol_process_india", "upsc_gs2"],
    slots: ["Mon 4-6 PM"],
    active: true,
  },
  {
    id: "t_arts_08",
    name: "Vikram Sethi",
    experienceYears: 7,
    rating: 4.6,
    hourlyPrice: 800,
    subjectIds: ["geo_human", "geo_clima", "upsc_gs1"],
    slots: ["Wed 5-7 PM"],
    active: true,
  },
  {
    id: "t_arts_09",
    name: "Sujata Rao",
    experienceYears: 9,
    rating: 4.7,
    hourlyPrice: 900,
    subjectIds: ["soc_intro", "soc_thinkers1", "upsc_gs1"],
    slots: ["Fri 10-12 AM"],
    active: true,
  },
  {
    id: "t_arts_10",
    name: "Dr. Manoj Kumar (Hindi)",
    experienceYears: 15,
    rating: 4.9,
    hourlyPrice: 1000,
    subjectIds: ["hin_sahitya_itihas", "hin_kavita1", "hin_upanyas"],
    slots: ["Tue 10-12 AM"],
    active: true,
  },
  {
    id: "t_arts_11",
    name: "Sarah Jenkins",
    experienceYears: 5,
    rating: 4.7,
    hourlyPrice: 1200,
    subjectIds: ["eng_brit_drama1", "eng_amer", "bvoc_comm"],
    slots: ["Thu 6-8 PM"],
    active: true,
  },

  // ==================================================
  // 5. LAW (Clat, Judiciary, Semester)
  // ==================================================
  {
    id: "t_law_06",
    name: "Adv. Harish Salve",
    experienceYears: 25,
    rating: 5.0,
    hourlyPrice: 3000,
    subjectIds: ["llb_sem1_consti", "llm_consti_law", "clat_legal"],
    slots: ["Sun 4-6 PM"], // Premium weekend slot
    active: true,
  },
  {
    id: "t_law_07",
    name: "Kriti Bhatia",
    experienceYears: 5,
    rating: 4.6,
    hourlyPrice: 800,
    subjectIds: ["clat_logical", "clat_eng", "clat_gk"],
    slots: ["Sat 2-4 PM"],
    active: true,
  },
  {
    id: "t_law_08",
    name: "Adv. Rajat Sharma",
    experienceYears: 8,
    rating: 4.7,
    hourlyPrice: 1100,
    subjectIds: ["llb_sem2_crimes", "llb_sem3_crpc", "law_crimes1"],
    slots: ["Mon 6-8 PM"],
    active: true,
  },
  {
    id: "t_law_09",
    name: "Prof. Usha Raman",
    experienceYears: 12,
    rating: 4.8,
    hourlyPrice: 1400,
    subjectIds: ["llb_sem1_contract", "llb_sem1_torts"],
    slots: ["Wed 10-12 AM"],
    active: true,
  },

  // ==================================================
  // 6. EXAMS (UPSC, Banking, SSC, GATE)
  // ==================================================
  {
    id: "t_exam_05",
    name: "Ravi Kumar (Quant Wizard)",
    experienceYears: 10,
    rating: 4.9,
    hourlyPrice: 1200,
    subjectIds: ["ssc_quant", "bank_quant", "gate_ga", "cs_math"],
    slots: ["Tue 7-9 AM", "Thu 7-9 AM"],
    active: true,
  },
  {
    id: "t_exam_06",
    name: "Pooja Singh (Reasoning)",
    experienceYears: 7,
    rating: 4.7,
    hourlyPrice: 900,
    subjectIds: ["ssc_gi", "bank_reasoning", "clat_logical"],
    slots: ["Mon 5-7 PM"],
    active: true,
  },
  {
    id: "t_exam_07",
    name: "Ex-Officer Col. Rathore",
    experienceYears: 15,
    rating: 4.8,
    hourlyPrice: 1000,
    subjectIds: ["nda_gat", "cds_gk", "afcat_gk", "upsc_gs3"],
    slots: ["Sat 6-8 PM"],
    active: true,
  },
  {
    id: "t_exam_08",
    name: "Varun Agarwal (English)",
    experienceYears: 8,
    rating: 4.6,
    hourlyPrice: 850,
    subjectIds: ["ssc_english", "bank_english", "clat_eng", "cds_eng"],
    slots: ["Wed 7-9 PM"],
    active: true,
  },
  {
    id: "t_exam_09",
    name: "Sanal Mishra (Gate ME)",
    experienceYears: 6,
    rating: 4.8,
    hourlyPrice: 1100,
    subjectIds: ["gate_core", "poly_mech"],
    slots: ["Sun 2-4 PM"],
    active: true,
  },

  // ==================================================
  // 7. AGRICULTURE & VOCATIONAL
  // ==================================================
  {
    id: "t_agri_03",
    name: "Dr. Swati Green",
    experienceYears: 9,
    rating: 4.8,
    hourlyPrice: 950,
    subjectIds: ["agri_horti", "agri_path", "ft_process_veg"],
    slots: ["Thu 10-12 AM"],
    active: true,
  },
  {
    id: "t_agri_04",
    name: "Dr. B. Reddy",
    experienceYears: 12,
    rating: 4.7,
    hourlyPrice: 1000,
    subjectIds: ["agri_agro", "agri_soil", "dairy_micro"],
    slots: ["Sat 8-10 AM"],
    active: true,
  },
  {
    id: "t_voc_02",
    name: "Instructor Manoj",
    experienceYears: 10,
    rating: 4.5,
    hourlyPrice: 500,
    subjectIds: ["iti_theory", "iti_wcs", "poly_math"],
    slots: ["Mon 2-4 PM"],
    active: true,
  },
  {
    id: "t_voc_03",
    name: "Trainer Suresh",
    experienceYears: 8,
    rating: 4.6,
    hourlyPrice: 600,
    subjectIds: ["iti_practical", "iti_ed", "poly_mech"],
    slots: ["Wed 2-4 PM"],
    active: true,
  },

  // ==================================================
  // 8. DESIGN & HOTEL MANAGEMENT
  // ==================================================
  {
    id: "t_des_03",
    name: "Riya Designer",
    experienceYears: 5,
    rating: 4.7,
    hourlyPrice: 1000,
    subjectIds: ["fd_pattern", "fd_garment", "des_sketching"],
    slots: ["Fri 4-6 PM"],
    active: true,
  },
  {
    id: "t_des_04",
    name: "Ar. Kabir Khan",
    experienceYears: 8,
    rating: 4.8,
    hourlyPrice: 1200,
    subjectIds: ["arch_design1", "arch_climat", "interior_design"],
    slots: ["Sat 11-1 PM"],
    active: true,
  },
  {
    id: "t_hm_04",
    name: "Chef Vikas Khanna",
    experienceYears: 12,
    rating: 5.0,
    hourlyPrice: 2000,
    subjectIds: ["ca_intl", "hm_fp_found", "hm_fb_found"],
    slots: ["Sun 5-7 PM"], // Celebrity Chef class
    active: true,
  },
  {
    id: "t_hm_05",
    name: "Manager Tina",
    experienceYears: 7,
    rating: 4.6,
    hourlyPrice: 850,
    subjectIds: ["hm_fo_found", "hm_hk_found", "hm_law"],
    slots: ["Tue 10-12 AM"],
    active: true,
  },

  // ==================================================
  // 9. SCIENCE (UG Level)
  // ==================================================
  {
    id: "t_sci_07",
    name: "Dr. H. C. Verma",
    experienceYears: 30,
    rating: 5.0,
    hourlyPrice: 2000,
    subjectIds: ["phy_mech", "phy_waves", "phy_quantum", "gate_ga"],
    slots: ["Sat 6-8 PM"],
    active: true,
  },
  {
    id: "t_sci_08",
    name: "Prof. R. D. Sharma",
    experienceYears: 25,
    rating: 4.9,
    hourlyPrice: 1800,
    subjectIds: ["math_calc", "math_algebra", "gate_em", "nda_math"],
    slots: ["Sun 8-10 AM"],
    active: true,
  },
  {
    id: "t_sci_09",
    name: "Dr. P. Bahadur",
    experienceYears: 20,
    rating: 4.8,
    hourlyPrice: 1500,
    subjectIds: ["chem_phys1", "chem_inorg1", "poly_chem"],
    slots: ["Mon 5-7 PM"],
    active: true,
  },
  {
    id: "t_sci_10",
    name: "Bio Expert Snigdha",
    experienceYears: 6,
    rating: 4.6,
    hourlyPrice: 800,
    subjectIds: ["bio_biomol", "bt_genetics", "micro_bact"],
    slots: ["Wed 6-8 PM"],
    active: true,
  },
  // src/data/EduTutors.js


  /* ==================================================================
     1. MATHEMATICS & GENERAL ENGINEERING EXPERTS
     (Covering Math 1-4, Physics, Chemistry, English for ALL Branches)
     ================================================================== */
  {
    id: "tut_math_01",
    name: "Prof. R. D. Sharma",
    experience: 25,
    rating: 4.9,
    price: 1500,
    tags: ["math", "calculus", "algebra"],
    subjectIds: [
      "cse_math_1", "cse_math_2", "ece_math_1", "ece_math_2", "ee_math_1", "ee_math_2",
      "me_math_1", "me_math_2", "ce_math_1", "ce_math_2", "ae_math_1", "ae_math_2",
      "math_calc", "math_diff_eq", "gate_em"
    ]
  },
  {
    id: "tut_math_02",
    name: "Dr. H. K. Das",
    experience: 20,
    rating: 4.8,
    price: 1200,
    tags: ["math", "statistics"],
    subjectIds: [
      "cse_discrete", "cse_prob_stats", "ece_math_3", "ee_math_3", "me_math_3",
      "ds_stats", "ai_math_3", "stat_prob", "stat_inference"
    ]
  },
  {
    id: "tut_math_03",
    name: "Sonia Gupta",
    experience: 8,
    rating: 4.7,
    price: 800,
    tags: ["math", "engineering"],
    subjectIds: [
      "cse_math_1", "it_math_1", "ds_math_1", "ai_math_1", "rb_math_1",
      "cse_linear_algebra", "ds_la", "math_algebra"
    ]
  },
  {
    id: "tut_sci_01",
    name: "Dr. H. C. Verma",
    experience: 30,
    rating: 5.0,
    price: 2000,
    tags: ["physics", "science"],
    subjectIds: [
      "cse_physics", "ece_physics_1", "ece_physics_2", "ee_physics_1", "ee_physics_2",
      "me_physics_1", "phy_mech", "phy_waves", "phy_quantum"
    ]
  },
  {
    id: "tut_sci_02",
    name: "Arun Kumar",
    experience: 10,
    rating: 4.6,
    price: 900,
    tags: ["physics", "mechanics"],
    subjectIds: [
      "cse_engineering_mechanical", "ece_mechanics", "me_mechanics", "ce_mechanics",
      "ae_mechanics", "au_mechanics", "phy_mech"
    ]
  },
  {
    id: "tut_sci_03",
    name: "Dr. P. Bahadur",
    experience: 22,
    rating: 4.8,
    price: 1400,
    tags: ["chemistry"],
    subjectIds: [
      "cse_chemistry", "ece_chemistry_1", "chem_inorg1", "chem_phys1", "chem_org1",
      "ee_chemistry_1", "me_chemistry_1", "ce_chemistry_1"
    ]
  },
  {
    id: "tut_comm_01",
    name: "Sarah Jenkins",
    experience: 12,
    rating: 4.9,
    price: 1000,
    tags: ["english", "soft_skills"],
    subjectIds: [
      "cse_communication_skills", "ece_english", "ee_english", "me_english",
      "ce_english", "it_english", "bcom_comm", "bba_biz_law"
    ]
  },

  /* ==================================================================
     2. COMPUTER SCIENCE, IT & CODING EXPERTS
     (Covering CSE, IT, BCA, MCA, AI, DS, Cyber Security)
     ================================================================== */
  {
    id: "tut_cs_01",
    name: "Rahul Dravid (Tech)",
    experience: 10,
    rating: 4.9,
    price: 1200,
    tags: ["coding", "cpp", "java"],
    subjectIds: [
      "cse_c_programming", "cse_cpp", "cse_java_basics", "it_prog", "bca_programming",
      "mca_python", "ai_prog", "ds_prog", "bscit_c", "bscit_java",
      "bscit_swe", "bscit_project", "mscit_software_arch", "mscit_project", "mscit_blockchain"
    ]
  },
  {
    id: "tut_cs_02",
    name: "Tanay Pratap",
    experience: 8,
    rating: 4.8,
    price: 1500,
    tags: ["web", "javascript"],
    subjectIds: [
      "cse_web", "it_web", "bca_web", "bscit_web_basics", "mscit_cloud", "bscit_cloud",
      "cse_mobile", "it_mobile"
    ]
  },
  {
    id: "tut_cs_03",
    name: "Striver (Algo)",
    experience: 6,
    rating: 5.0,
    price: 1000,
    tags: ["dsa", "algorithms"],
    subjectIds: [
      "cse_dsa", "cse_algo", "it_dsa", "cy_dsa", "ds_dsa", "ai_dsa",
      "bca_ds", "bscit_dsa", "mca_ads", "bscit_toc", "bscit_discrete", "mscit_adv_algo"
    ]
  },
  {
    id: "tut_cs_04",
    name: "Andrew Ng (AI Fan)",
    experience: 15,
    rating: 5.0,
    price: 2500,
    tags: ["ai", "ml", "datascience"],
    subjectIds: [
      "cse_ai", "cse_ml_intro", "cse_deep_learning", "ai_ml_1", "ai_dl",
      "ds_ml_basics", "ds_dl", "ds_nlp", "mscit_ml", "bscit_ai_intro", "bscit_bigdata",
      "mscit_data_mining", "mscit_visualization"
    ]
  },
  {
    id: "tut_cs_05",
    name: "Jenny's Lectures",
    experience: 9,
    rating: 4.7,
    price: 800,
    tags: ["theory", "os", "dbms"],
    subjectIds: [
      "cse_os", "cse_dbms", "cse_cn", "it_os", "it_dbms", "bca_os", "bca_dbms",
      "cy_os", "ds_os", "ds_dbms", "gate_cs", "bscit_dbms", "bscit_os", "bscit_networks",
      "mscit_adv_dbms", "mscit_distributed"
    ]
  },
  {
    id: "tut_cs_06",
    name: "Hitesh Choudhary",
    experience: 12,
    rating: 4.8,
    price: 1100,
    tags: ["cyber", "cloud"],
    subjectIds: [
      "cse_cloud_alt", "cse_cyber", "cy_eh", "cy_crypto", "it_cloud",
      "bca_cloud", "mscit_network_sec", "bscit_security", "mscit_iot"
    ]
  },
  {
    id: "tut_cs_07",
    name: "Navin Reddy",
    experience: 10,
    rating: 4.8,
    price: 900,
    tags: ["java", "python"],
    subjectIds: [
      "cse_python_basics", "cse_java_advanced", "it_python", "ai_python_adv",
      "ds_python", "bca_java", "bca_python"
    ]
  },
  {
    id: "tut_cs_08",
    name: "Love Babbar",
    experience: 5,
    rating: 4.9,
    price: 700,
    tags: ["dsa", "cpp"],
    subjectIds: [
      "cse_dsa", "cse_oops", "it_dsa", "ai_dsa", "bca_cpp", "bscit_dsa"
    ]
  },

  /* ==================================================================
     3. ELECTRONICS, ELECTRICAL & ROBOTICS EXPERTS
     (Covering ECE, EEE, Robotics, Instrumentation)
     ================================================================== */
  {
    id: "tut_cir_01",
    name: "Neso Academy",
    experience: 8,
    rating: 4.9,
    price: 800,
    tags: ["digital", "analog"],
    subjectIds: [
      "ece_digital_circuits", "ece_analog_circuits", "ee_digital", "ee_analog",
      "cse_dld", "it_ldco", "rb_digital", "bscit_digital", "bscit_coa"
    ]
  },
  {
    id: "tut_cir_02",
    name: "Prof. B. L. Theraja",
    experience: 35,
    rating: 5.0,
    price: 1500,
    tags: ["electrical", "machines"],
    subjectIds: [
      "ee_bee", "ee_circuit_theory", "ee_machines_1", "ee_machines_2",
      "ece_bee", "cse_basic_electrical", "rb_bee"
    ]
  },
  {
    id: "tut_cir_03",
    name: "Dr. P. S. Bimbhra",
    experience: 28,
    rating: 4.9,
    price: 1600,
    tags: ["power", "control"],
    subjectIds: [
      "ee_power_sys_1", "ee_power_sys_2", "ee_control", "ece_control",
      "ee_power_electronics", "rb_control"
    ]
  },
  {
    id: "tut_cir_04",
    name: "Ramesh Gaonkar",
    experience: 20,
    rating: 4.7,
    price: 1100,
    tags: ["microprocessor"],
    subjectIds: [
      "ece_microprocessor", "ee_microprocessor", "cse_mp", "it_micro",
      "rb_micro", "bm_micro"
    ]
  },
  {
    id: "tut_cir_05",
    name: "Simon Haykin",
    experience: 18,
    rating: 4.8,
    price: 1300,
    tags: ["communication", "signals"],
    subjectIds: [
      "ece_signals", "ece_analog_comm", "ece_digital_comm", "ee_signals",
      "bm_signals", "rb_signals"
    ]
  },

  /* ==================================================================
     4. MECHANICAL, CIVIL, AUTO & AERO EXPERTS
     ================================================================== */
  {
    id: "tut_mech_01",
    name: "R. K. Rajput",
    experience: 25,
    rating: 4.8,
    price: 1000,
    tags: ["thermal", "fluid"],
    subjectIds: [
      "me_thermo", "me_fluid_mech", "ce_fluid_mech_1", "ae_thermo", "au_thermo",
      "chem_thermo_1"
    ]
  },
  {
    id: "tut_mech_02",
    name: "S. S. Rattan",
    experience: 20,
    rating: 4.7,
    price: 1100,
    tags: ["theory_of_machines", "mechanics"],
    subjectIds: [
      "me_kinematics", "me_dynamics", "au_kom", "au_dom", "rb_kom", "rb_dom",
      "me_mechanics"
    ]
  },
  {
    id: "tut_mech_03",
    name: "V. B. Bhandari",
    experience: 22,
    rating: 4.9,
    price: 1300,
    tags: ["design"],
    subjectIds: [
      "me_design_1", "me_design_2", "au_design_1", "ce_dss", "ae_struct_1",
      "rb_design"
    ]
  },
  {
    id: "tut_civil_01",
    name: "B. C. Punmia",
    experience: 30,
    rating: 4.8,
    price: 1200,
    tags: ["civil", "surveying"],
    subjectIds: [
      "ce_surveying_1", "ce_surveying_2", "ce_building_mat", "ce_som", "me_som",
      "ae_som"
    ]
  },
  {
    id: "tut_civil_02",
    name: "S. K. Garg",
    experience: 25,
    rating: 4.7,
    price: 1100,
    tags: ["environmental", "water"],
    subjectIds: [
      "ce_env_eng_1", "ce_env_eng_2", "ce_hydrology", "ce_irrigation",
      "chem_env", "env_pollution"
    ]
  },

  /* ==================================================================
     5. MEDICAL, PHARMA & BIO EXPERTS
     (MBBS, BDS, BAMS, Nursing, Pharma, Biotech)
     ================================================================== */
  {
    id: "tut_med_01",
    name: "Dr. Najeeb",
    experience: 15,
    rating: 5.0,
    price: 2500,
    tags: ["medical", "concepts"],
    subjectIds: [
      "mbbs_anatomy", "mbbs_physiology", "mbbs_biochem", "bds_gen_anatomy",
      "nurs_anat_phys", "bams_kriya", "bm_anatomy"
    ]
  },
  {
    id: "tut_med_02",
    name: "Dr. K. D. Tripathi",
    experience: 20,
    rating: 4.9,
    price: 1800,
    tags: ["pharma"],
    subjectIds: [
      "mbbs_pharmacology", "bds_gen_pharm", "bp_col1", "bp_col2",
      "nurs_pharm", "bams_dravyaguna"
    ]
  },
  {
    id: "tut_med_03",
    name: "Dr. Robbins",
    experience: 25,
    rating: 5.0,
    price: 2200,
    tags: ["pathology"],
    subjectIds: [
      "mbbs_pathology", "bds_oral_path", "mlt_histo", "nurs_path_gen",
      "bm_pathology"
    ]
  },
  {
    id: "tut_med_04",
    name: "Sister Nancy",
    experience: 18,
    rating: 4.7,
    price: 1000,
    tags: ["nursing"],
    subjectIds: [
      "nurs_foundations", "nurs_medsurg1", "nurs_child", "nurs_midwifery",
      "nurs_comm1"
    ]
  },
  {
    id: "tut_med_05",
    name: "Dr. B. D. Chaurasia",
    experience: 30,
    rating: 4.9,
    price: 1500,
    tags: ["anatomy"],
    subjectIds: [
      "mbbs_anatomy", "bds_gen_anatomy", "bpt_anat", "mlt_anat_phys",
      "bm_anatomy"
    ]
  },
  {
    id: "tut_bio_01",
    name: "Prof. Lehninger",
    experience: 20,
    rating: 4.8,
    price: 1400,
    tags: ["biotech"],
    subjectIds: [
      "bt_biochem", "bt_genetics", "bt_molbio", "micro_biochem",
      "mbbs_biochem", "chem_org4"
    ]
  },

  /* ==================================================================
     6. COMMERCE, CA, MANAGEMENT & LAW EXPERTS
     ================================================================== */
  {
    id: "tut_ca_01",
    name: "CA Parveen Sharma",
    experience: 20,
    rating: 5.0,
    price: 2000,
    tags: ["accounts"],
    subjectIds: [
      "ca_fnd_acct", "ca_inter_adv_acct", "ca_final_fr", "bcom_fin_acct",
      "bba_acct", "cma_fnd_acct", "mba_acct"
    ]
  },
  {
    id: "tut_ca_02",
    name: "CA BB",
    experience: 12,
    rating: 4.9,
    price: 1800,
    tags: ["tax"],
    subjectIds: [
      "ca_inter_tax", "ca_final_dt", "ca_final_idt", "bcom_income_tax",
      "bcom_gst", "bba_tax", "cma_inter_dt"
    ]
  },
  {
    id: "tut_mba_01",
    name: "Philip Kotler (Fan)",
    experience: 15,
    rating: 4.8,
    price: 1500,
    tags: ["marketing"],
    subjectIds: [
      "mba_mkt_mgmt", "bba_mkt_mgmt", "bcom_mkt_mgmt", "ds_marketing",
      "sm_marketing", "bp_marketing"
    ]
  },
  {
    id: "tut_law_01",
    name: "Adv. Ram Jethmalani (Legacy)",
    experience: 40,
    rating: 5.0,
    price: 3000,
    tags: ["criminal_law"],
    subjectIds: [
      "llb_sem2_crimes", "llb_sem3_crpc", "llb_sem3_evidence", "clat_legal"
    ]
  },
  {
    id: "tut_law_02",
    name: "Dr. Avtar Singh",
    experience: 25,
    rating: 4.8,
    price: 1600,
    tags: ["corporate_law"],
    subjectIds: [
      "llb_sem1_contract", "llb_sem4_company", "bcom_corp_law", "ca_inter_law",
      "cma_inter_law"
    ]
  },

  /* ==================================================================
     7. ARTS, HUMANITIES & EXAM PREP (UPSC/SSC)
     ================================================================== */
  {
    id: "tut_arts_01",
    name: "Bipin Chandra",
    experience: 30,
    rating: 4.9,
    price: 1200,
    tags: ["history"],
    subjectIds: [
      "hist_india1", "hist_india8", "upsc_gs1", "ballb_hist"
    ]
  },
  {
    id: "tut_arts_02",
    name: "Laxmikanth",
    experience: 20,
    rating: 5.0,
    price: 1500,
    tags: ["polity"],
    subjectIds: [
      "pol_const_india", "pol_public_policy", "upsc_gs2", "ballb_pol_sci",
      "ce_const_india", "cse_consti"
    ]
  },
  {
    id: "tut_exam_01",
    name: "Mrunal Patel",
    experience: 12,
    rating: 5.0,
    price: 1000,
    tags: ["economy", "upsc"],
    subjectIds: [
      "upsc_gs3", "eco_macro1", "eco_indian1", "bba_micro", "ca_fnd_eco"
    ]
  },
  {
    id: "tut_exam_02",
    name: "Khan Sir",
    experience: 10,
    rating: 4.9,
    price: 500,
    tags: ["gk", "geography"],
    subjectIds: [
      "geo_india", "upsc_gs1", "ssc_ga", "bank_ga", "nda_gat", "cds_gk"
    ]
  },

  /* ==================================================================
     8. VOCATIONAL, DESIGN & HOTEL MANAGEMENT
     ================================================================== */
  {
    id: "tut_hm_01",
    name: "Sanjeev Kapoor",
    experience: 25,
    rating: 5.0,
    price: 2500,
    tags: ["cooking"],
    subjectIds: [
      "hm_fp_found", "ca_baking", "ca_intl", "ca_gardemanger"
    ]
  },
  {
    id: "tut_des_01",
    name: "Sabyasachi (Design)",
    experience: 20,
    rating: 5.0,
    price: 3000,
    tags: ["fashion"],
    subjectIds: [
      "fd_textile", "fd_pattern", "fd_garment", "fashion"
    ]
  },
  {
    id: "tut_voc_01",
    name: "Technical Guruji",
    experience: 8,
    rating: 4.7,
    price: 600,
    tags: ["tech_skills"],
    subjectIds: [
      "electrical_trade", "fitter_trade", "iti_theory", "bvoc_it"
    ]
  }
  ,
  /* ==================================================================
     9. SCIENCE TUTORS (Physics, Chemistry, Mathematics, Statistics)
     ================================================================== */
  {
    id: "tut_sci_01",
    name: "H C Verma",
    experience: 20,
    rating: 4.9,
    price: 1200,
    tags: ["physics"],
    subjectIds: [
      "phy_mech", "phy_math1", "phy_elec", "phy_quantum", "phy_digital", "phy_modern"
    ]
  },
  {
    id: "tut_sci_02",
    name: "O P Tandon",
    experience: 22,
    rating: 4.8,
    price: 1100,
    tags: ["chemistry"],
    subjectIds: [
      "chem_inorg1", "chem_phys1", "chem_org1", "chem_phys2", "chem_inorg2", "chem_org2",
      "chem_phys3", "chem_inorg3", "chem_org3", "chem_phys4", "chem_org4"
    ]
  },
  {
    id: "tut_sci_03",
    name: "Shantinarayan",
    experience: 18,
    rating: 4.7,
    price: 1000,
    tags: ["mathematics"],
    subjectIds: [
      "math_calc", "math_algebra", "math_real_anal", "math_diff_eq", "math_group_theory",
      "math_pde", "math_numerical", "math_riemann", "math_metric", "math_ring", "math_complex", "math_lp"
    ]
  },
  {
    id: "tut_sci_04",
    name: "Prof. Muruganandam",
    experience: 16,
    rating: 4.6,
    price: 900,
    tags: ["statistics"],
    subjectIds: [
      "stat_desc", "stat_prob", "stat_algebra", "stat_sampling_dist", "stat_survey",
      "stat_inference", "stat_linear", "stat_stochastic", "stat_mathstat", "stat_regression",
      "stat_multivariate", "stat_nonparametric", "stat_time_series", "stat_doe"
    ]
  },

  /**
 * MASTER TUTOR DATABASE
 * Total Tutors: ~150+ (Covering 1000+ Subject Mappings)
 * Strategy: Overlapping expertise to ensure 5+ tutors per subject.
 */

  /* ==================================================================
     1. MATHEMATICS & QUANTITATIVE APTITUDE EXPERTS
     (Covers: Engineering, BCA, B.Sc, GATE, UPSC, SSC, Banking, NDA, CLAT)
     ================================================================== */
  {
    id: "tut_math_01",
    name: "Prof. R. D. Sharma",
    experienceYears: 25,
    rating: 5.0,
    hourlyPrice: 1500,
    active: true,
    slots: ["Sat 10-12 AM", "Sun 10-12 AM"],
    subjectIds: [
      // Engineering
      "cse_math_1", "cse_math_2", "ece_math_1", "me_math_1", "ce_math_1", 
      // Science & BCA
      "math_calc", "math_algebra", "bca_math_1", "bca_math_2", "poly_math",
      // Competitive
      "gate_eng_math", "nda_math_calc", "cds_math_arith", "je_math"
    ]
  },
  {
    id: "tut_math_02",
    name: "Dr. H. K. Das",
    experienceYears: 20,
    rating: 4.8,
    hourlyPrice: 1200,
    active: true,
    slots: ["Mon 6-8 PM", "Wed 6-8 PM"],
    subjectIds: [
      "cse_discrete", "cse_prob_stats", "mca_discrete", "ds_stats", 
      "stat_prob", "stat_inference", "gate_math", "rrb_math"
    ]
  },
  {
    id: "tut_math_03",
    name: "Arun Sharma (CAT/Aptitude)",
    experienceYears: 15,
    rating: 4.9,
    hourlyPrice: 1000,
    active: true,
    slots: ["Tue 7-9 PM", "Thu 7-9 PM"],
    subjectIds: [
      "upsc_csat", "ssc_quant", "bank_quant", "rbi_phase1", "clat_math",
      "afcat_math", "icg_s1_math", "ipmat_quant", "cat_quant"
    ]
  },
  {
    id: "tut_math_04",
    name: "Neha Agrawal (Mathematically Inclined)",
    experienceYears: 8,
    rating: 4.7,
    hourlyPrice: 800,
    active: true,
    slots: ["Fri 5-7 PM", "Sat 5-7 PM"],
    subjectIds: [
      "nda_math_alg", "nda_math_trig", "je_math", "poly_math_1", 
      "bca_stats", "11_math", "12_math"
    ]
  },
  {
    id: "tut_math_05",
    name: "Gajendra Purohit",
    experienceYears: 12,
    rating: 4.9,
    hourlyPrice: 1100,
    active: true,
    slots: ["Sat 2-4 PM", "Sun 2-4 PM"],
    subjectIds: [
      "gate_eng_math", "bscllb_cs", "bca_math_1", "math_diff_eq", 
      "math_real_anal", "jam_math"
    ]
  },

  /* ==================================================================
     2. COMPUTER SCIENCE, IT & CODING MENTORS
     (Covers: CSE, IT, BCA, MCA, B.Voc IT, GATE CS, Placement Prep)
     ================================================================== */
  {
    id: "tut_cs_01",
    name: "Sandeep Jain (DSA)",
    experienceYears: 12,
    rating: 5.0,
    hourlyPrice: 1500,
    active: true,
    slots: ["Sat 6-8 PM", "Sun 10-12 AM"],
    subjectIds: [
      "cse_dsa", "it_dsa", "bca_ds", "mca_dsa", "gate_cs_dsa", 
      "poly_cs_c", "bscit_dsa", "ds_dsa"
    ]
  },
  {
    id: "tut_cs_02",
    name: "Abdul Bari (Algorithms)",
    experienceYears: 18,
    rating: 4.9,
    hourlyPrice: 1400,
    active: true,
    slots: ["Mon 8-9 PM", "Wed 8-9 PM"],
    subjectIds: [
      "cse_algo", "mca_adv_dsa", "gate_cs_toc", "bca_automata", 
      "cse_toc", "bca_algo"
    ]
  },
  {
    id: "tut_cs_03",
    name: "Navin Reddy (Telusko)",
    experienceYears: 10,
    rating: 4.8,
    hourlyPrice: 1000,
    active: true,
    slots: ["Tue 6-8 PM", "Thu 6-8 PM"],
    subjectIds: [
      "cse_java", "bca_java", "mca_java_adv", "poly_cs_java", 
      "bvoc_sd_java", "cse_oops", "bscit_java"
    ]
  },
  {
    id: "tut_cs_04",
    name: "Corey Schafer (Python)",
    experienceYears: 9,
    rating: 4.9,
    hourlyPrice: 1200,
    active: true,
    slots: ["Sat 4-6 PM"],
    subjectIds: [
      "cse_python", "bca_python", "ds_python", "ai_python_adv", 
      "mca_python_adv", "da_python"
    ]
  },
  {
    id: "tut_cs_05",
    name: "Love Babbar",
    experienceYears: 5,
    rating: 4.8,
    hourlyPrice: 800,
    active: true,
    slots: ["Wed 7-9 PM", "Fri 7-9 PM"],
    subjectIds: [
      "cse_cpp", "bca_c_prog", "bca_oops_cpp", "placement_prep", 
      "gate_cs_it", "poly_cs_c"
    ]
  },
  {
    id: "tut_cs_06",
    name: "Hitesh Choudhary",
    experienceYears: 10,
    rating: 4.8,
    hourlyPrice: 1100,
    active: true,
    slots: ["Sat 8-10 AM"],
    subjectIds: [
      "cse_web", "bca_web_1", "mca_web_fullstack", "bvoc_sd_web", 
      "skill_web_full", "bscit_web_basics"
    ]
  },
  {
    id: "tut_cs_07",
    name: "Jenny's Lectures",
    experienceYears: 8,
    rating: 4.7,
    hourlyPrice: 900,
    active: true,
    slots: ["Mon 5-6 PM", "Wed 5-6 PM"],
    subjectIds: [
      "cse_os", "cse_dbms", "bca_os", "bca_dbms", "gate_cs_os", 
      "gate_cs_dbms", "mca_adv_os"
    ]
  },

  /* ==================================================================
     3. CIVIL, MECHANICAL & ELECTRICAL ENGINEERING
     (Covers: B.Tech, Diploma, ITI, GATE, SSC JE, ESE)
     ================================================================== */
  {
    id: "tut_civil_01",
    name: "B. C. Punmia",
    experienceYears: 30,
    rating: 4.9,
    price: 1300,
    active: true,
    subjectIds: [
      "ce_som", "ce_surveying_1", "poly_civil_survey", "gate_ce_soil", 
      "ese_tech_1", "je_civil", "arch_struct_1"
    ]
  },
  {
    id: "tut_civil_02",
    name: "S. K. Garg (Environmental)",
    experienceYears: 25,
    rating: 4.8,
    price: 1200,
    active: true,
    subjectIds: [
      "ce_env_eng_1", "ce_fluid_mech_1", "gate_ce_env", "poly_civil_highway",
      "bplan_env", "arch_services_1"
    ]
  },
  {
    id: "tut_mech_01",
    name: "R. K. Rajput",
    experienceYears: 28,
    rating: 4.8,
    price: 1100,
    active: true,
    subjectIds: [
      "me_thermo", "me_fluid_mech", "au_thermo", "poly_mech_thermo", 
      "gate_me_thermo", "je_mech", "dairy_thermo"
    ]
  },
  {
    id: "tut_mech_02",
    name: "S. S. Rattan",
    experienceYears: 22,
    rating: 4.7,
    price: 1000,
    active: true,
    subjectIds: [
      "me_kinematics", "me_dynamics", "gate_me_tom", "poly_mech_tom",
      "rb_kom", "rb_dom", "au_kom"
    ]
  },
  {
    id: "tut_ee_01",
    name: "J. B. Gupta",
    experienceYears: 30,
    rating: 4.9,
    price: 1400,
    active: true,
    subjectIds: [
      "ee_bee", "ee_circuit_theory", "ee_machines_1", "gate_ee_mach",
      "ese_tech_3", "je_elec", "iti_elec_theory_1"
    ]
  },
  {
    id: "tut_ee_02",
    name: "Prof. P. S. Bimbhra",
    experienceYears: 25,
    rating: 5.0,
    price: 1600,
    active: true,
    subjectIds: [
      "ee_power_sys_1", "ee_power_electronics", "gate_ee_power", 
      "poly_ee_power", "iti_elec_theory_2"
    ]
  },

  /* ==================================================================
     4. MEDICAL, NURSING, PHARMA & ALLIED HEALTH
     (Covers: MBBS, BDS, BAMS, Nursing, Pharmacy, BPT)
     ================================================================== */
  {
    id: "tut_med_01",
    name: "Dr. Najeeb",
    experienceYears: 18,
    rating: 5.0,
    hourlyPrice: 2500,
    active: true,
    subjectIds: [
      "mbbs_anatomy", "mbbs_physiology", "bds_gen_anatomy", "nurs_anat_phys", 
      "bpt_anat", "bams_rachana", "mlt_anat_phys", "bvoc_mlt_anat"
    ]
  },
  {
    id: "tut_med_02",
    name: "Dr. K. D. Tripathi",
    experienceYears: 22,
    rating: 4.9,
    hourlyPrice: 1800,
    active: true,
    subjectIds: [
      "mbbs_pharmacology", "bds_gen_pharm", "bp_col1", "bp_col2", 
      "nurs_pharm", "bpt_pharm", "bams_dravyaguna"
    ]
  },
  {
    id: "tut_med_03",
    name: "Dr. Robbins (Pathology)",
    experienceYears: 20,
    rating: 4.9,
    hourlyPrice: 2000,
    active: true,
    subjectIds: [
      "mbbs_pathology", "bds_oral_path", "nurs_path_gen", "bpt_path_micro",
      "mlt_histo", "bhms_path"
    ]
  },
  {
    id: "tut_med_04",
    name: "Sister Nancy",
    experienceYears: 15,
    rating: 4.8,
    hourlyPrice: 1000,
    active: true,
    subjectIds: [
      "nurs_foundations", "nurs_medsurg1", "nurs_comm1", "nurs_midwifery",
      "skill_gda"
    ]
  },
  {
    id: "tut_med_05",
    name: "Dr. B. D. Chaurasia",
    experienceYears: 25,
    rating: 4.9,
    hourlyPrice: 1500,
    active: true,
    subjectIds: [
      "mbbs_anatomy", "bds_gen_anatomy", "bpt_anat", "bams_rachana"
    ]
  },

  /* ==================================================================
     5. LAW, JUDICIARY & CLAT
     (Covers: LLB, LLM, CLAT, Judiciary)
     ================================================================== */
  {
    id: "tut_law_01",
    name: "Adv. Ram Jethmalani (Legacy)",
    experienceYears: 40,
    rating: 5.0,
    hourlyPrice: 3000,
    active: true,
    subjectIds: [
      "law_ipc", "law_crpc", "law_evidence", "jud_ipc", "jud_crpc", 
      "jud_evidence", "llm_criminal_adv"
    ]
  },
  {
    id: "tut_law_02",
    name: "Dr. Avtar Singh",
    experienceYears: 30,
    rating: 4.9,
    hourlyPrice: 1800,
    active: true,
    subjectIds: [
      "law_contracts_1", "law_company_1", "law_company", "bcom_corp_law", 
      "ca_inter_law", "cs_company_law"
    ]
  },
  {
    id: "tut_law_03",
    name: "Faizan Mustafa",
    experienceYears: 20,
    rating: 4.9,
    hourlyPrice: 2000,
    active: true,
    subjectIds: [
      "law_consti_1", "law_consti_2", "llm_consti_adv", "jud_cpc", 
      "clat_legal", "upsc_gs2_mains"
    ]
  },
  {
    id: "tut_law_04",
    name: "LegalEagle (CLAT)",
    experienceYears: 6,
    rating: 4.7,
    hourlyPrice: 800,
    active: true,
    subjectIds: [
      "clat_legal", "clat_logical", "clat_english", "law_entrance", 
      "bba_biz_law"
    ]
  },

  /* ==================================================================
     6. COMMERCE, CA, MANAGEMENT & ECONOMICS
     (Covers: B.Com, MBA, CA, CS, CMA, UPSC Optional)
     ================================================================== */
  {
    id: "tut_ca_01",
    name: "CA Parveen Sharma",
    experienceYears: 20,
    rating: 5.0,
    hourlyPrice: 2000,
    active: true,
    subjectIds: [
      "ca_fnd_acct", "ca_inter_adv_acct", "ca_final_fr", "bcom_fin_acct",
      "bba_acct", "cma_fnd_acct", "mba_acct"
    ]
  },
  {
    id: "tut_ca_02",
    name: "CA BB (Taxation)",
    experienceYears: 12,
    rating: 4.9,
    hourlyPrice: 1800,
    active: true,
    subjectIds: [
      "ca_inter_tax", "ca_final_dt", "ca_final_idt", "bcom_income_tax",
      "bcom_gst", "bba_tax", "cma_inter_dt", "law_tax"
    ]
  },
  {
    id: "tut_mba_01",
    name: "Philip Kotler (Fan)",
    experienceYears: 15,
    rating: 4.8,
    hourlyPrice: 1500,
    active: true,
    subjectIds: [
      "mba_mkt_mgmt", "bba_mkt_mgmt", "bcom_mkt_mgmt", "sm_marketing",
      "bp_marketing", "tt_marketing", "fd_merch"
    ]
  },
  {
    id: "tut_eco_01",
    name: "Mrunal Patel",
    experienceYears: 12,
    rating: 5.0,
    hourlyPrice: 1200,
    active: true,
    subjectIds: [
      "upsc_gs3_mains", "eco_macro1", "eco_indian1", "bba_micro",
      "ca_fnd_eco", "rbi_esi", "ssc_finance"
    ]
  },

  /* ==================================================================
     7. ARTS, HUMANITIES, UPSC & GOVT EXAMS
     (Covers: History, Pol Sci, Geog, Sociology, UPSC, SSC, Banking)
     ================================================================== */
  {
    id: "tut_arts_01",
    name: "Bipin Chandra",
    experienceYears: 30,
    rating: 4.9,
    hourlyPrice: 1200,
    active: true,
    subjectIds: [
      "hist_india1", "hist_modern_eur", "upsc_gs1_mains", "ballb_hist_1",
      "capf_p1_hist", "cds_gk_hum"
    ]
  },
  {
    id: "tut_arts_02",
    name: "M. Laxmikanth",
    experienceYears: 20,
    rating: 5.0,
    hourlyPrice: 1500,
    active: true,
    subjectIds: [
      "pol_const_india", "upsc_gs2_mains", "law_consti_1", "ballb_pol_1",
      "capf_p1_polity", "ssc_ga"
    ]
  },
  {
    id: "tut_exam_01",
    name: "Khan Sir (Patna)",
    experienceYears: 12,
    rating: 4.9,
    hourlyPrice: 500,
    active: true,
    subjectIds: [
      "ssc_ga", "rrb_ga_science", "geo_india", "upsc_gs1_pre", 
      "nda_geo", "afcat_ga", "agni_gk"
    ]
  },
  {
    id: "tut_exam_02",
    name: "Neetu Singh (English)",
    experienceYears: 15,
    rating: 4.8,
    hourlyPrice: 900,
    active: true,
    subjectIds: [
      "ssc_english", "bank_english", "cds_eng", "nda_eng", "afcat_verbal",
      "clat_english", "rbi_eng_writing"
    ]
  },
  {
    id: "tut_exam_03",
    name: "Ankush Lamba (Reasoning)",
    experienceYears: 8,
    rating: 4.8,
    hourlyPrice: 800,
    active: true,
    subjectIds: [
      "bank_reasoning", "ssc_reasoning", "rrb_reasoning", "clat_logical",
      "afcat_reasoning", "icg_s1_reason"
    ]
  },

  /* ==================================================================
     8. AGRICULTURE & ALLIED SCIENCES
     (Covers: B.Sc Agri, Horti, Fisheries, Dairy, Forestry)
     ================================================================== */
  {
    id: "tut_agri_01",
    name: "Dr. M. S. Swaminathan (Fellow)",
    experienceYears: 20,
    rating: 5.0,
    hourlyPrice: 1500,
    active: true,
    subjectIds: [
      "agri_agro_fund", "agri_breeding_fund", "hort_fund", "for_agro",
      "agri_organic"
    ]
  },
  {
    id: "tut_agri_02",
    name: "Prof. S. R. Reddy",
    experienceYears: 18,
    rating: 4.8,
    hourlyPrice: 1200,
    active: true,
    subjectIds: [
      "agri_soil_fund", "agri_manure", "hort_soil", "for_geo",
      "agri_water_mgmt"
    ]
  },
  {
    id: "tut_agri_03",
    name: "Dr. Kurien (Dairy Expert)",
    experienceYears: 15,
    rating: 4.9,
    hourlyPrice: 1300,
    active: true,
    subjectIds: [
      "dairy_market_milk", "dairy_fat_rich", "dairy_tech", "ft_dairy",
      "agri_livestock"
    ]
  },
  {
    id: "tut_agri_04",
    name: "Dr. V. G. Jhingran",
    experienceYears: 25,
    rating: 4.9,
    hourlyPrice: 1400,
    active: true,
    subjectIds: [
      "fish_fresh", "fish_mariculture", "fish_nutrition", "fish_breeding"
    ]
  },

  /* ==================================================================
     9. ARCHITECTURE, PLANNING & INTERIOR DESIGN
     (Covers: B.Arch, B.Plan, Interior Design)
     ================================================================== */
  {
    id: "tut_arch_01",
    name: "Ar. Hafeez Contractor (Studio)",
    experienceYears: 30,
    rating: 5.0,
    hourlyPrice: 2500,
    active: true,
    subjectIds: [
      "arch_design_1", "arch_design_5", "march_studio_1", "id_design_1",
      "arch_thesis"
    ]
  },
  {
    id: "tut_arch_02",
    name: "Ar. Francis Ching",
    experienceYears: 25,
    rating: 4.9,
    hourlyPrice: 2000,
    active: true,
    subjectIds: [
      "arch_graphics_1", "arch_hist_1", "arch_hist_3", "id_history",
      "arch_art"
    ]
  },
  {
    id: "tut_arch_03",
    name: "Prof. K. T. Ravindran (Planning)",
    experienceYears: 35,
    rating: 5.0,
    hourlyPrice: 2200,
    active: true,
    subjectIds: [
      "bplan_fund", "mplan_city", "arch_urban_des", "plan_housing",
      "march_urbanism"
    ]
  },

  /* ==================================================================
     10. MEDIA, DESIGN & ANIMATION
     (Covers: BJMC, Fashion, Graphic, Animation, Multimedia)
     ================================================================== */
  {
    id: "tut_media_01",
    name: "Ravish Kumar (Journalism)",
    experienceYears: 20,
    rating: 5.0,
    hourlyPrice: 1500,
    active: true,
    subjectIds: [
      "bjmc_reporting", "bjmc_tv_prod", "bjmc_radio", "bjmc_media_laws",
      "bjmc_hindi"
    ]
  },
  {
    id: "tut_design_01",
    name: "Sabyasachi (Fashion)",
    experienceYears: 20,
    rating: 5.0,
    hourlyPrice: 3000,
    active: true,
    subjectIds: [
      "fd_pattern_1", "fd_draping_1", "fd_grad_proj", "fd_illustration",
      "td_surface"
    ]
  },
  {
    id: "tut_anim_01",
    name: "Disney Animator Alumni",
    experienceYears: 12,
    rating: 4.9,
    hourlyPrice: 1800,
    active: true,
    subjectIds: [
      "mm_2d_anim", "mm_3d_anim", "anim_char", "anim_rig", "mm_vfx_fund"
    ]
  },
  {
    id: "tut_graphic_01",
    name: "Paul Rand Fan",
    experienceYears: 10,
    rating: 4.8,
    hourlyPrice: 1200,
    active: true,
    subjectIds: [
      "gd_typo_1", "gd_branding", "gd_layout", "ui_visual", "mm_graphic"
    ]
  },

  /* ==================================================================
     11. HOTEL MANAGEMENT & CULINARY ARTS
     (Covers: BHM, Culinary, Travel)
     ================================================================== */
  {
    id: "tut_hm_01",
    name: "Chef Sanjeev Kapoor",
    experienceYears: 30,
    rating: 5.0,
    hourlyPrice: 2500,
    active: true,
    subjectIds: [
      "bhm_fp_found_1", "ca_basics", "ca_indian", "ca_intl", 
      "bhm_fp_adv"
    ]
  },
  {
    id: "tut_hm_02",
    name: "Vikas Khanna",
    experienceYears: 20,
    rating: 4.9,
    hourlyPrice: 2200,
    active: true,
    subjectIds: [
      "ca_bakery_1", "ca_chocolate", "ca_plating", "bhm_nutrition"
    ]
  },
  {
    id: "tut_hm_03",
    name: "Oberoi Manager",
    experienceYears: 15,
    rating: 4.8,
    hourlyPrice: 1500,
    active: true,
    subjectIds: [
      "bhm_fo_found_1", "bhm_hk_found_1", "bhm_fb_ops", "tt_hospitality",
      "bvoc_ht_front"
    ]
  },

  /* ==================================================================
     12. EDUCATION & TEACHING
     (Covers: B.Ed, M.Ed, CTET, D.El.Ed)
     ================================================================== */
  {
    id: "tut_edu_01",
    name: "Himanshi Singh (Pedagogy)",
    experienceYears: 8,
    rating: 4.9,
    hourlyPrice: 800,
    active: true,
    subjectIds: [
      "bed_childhood", "ctet_cdp_pri", "deled_child", "med_psych",
      "bed_learning", "ntt_child_psy"
    ]
  },
  {
    id: "tut_edu_02",
    name: "Prof. Krishna Kumar",
    experienceYears: 30,
    rating: 5.0,
    hourlyPrice: 1200,
    active: true,
    subjectIds: [
      "bed_india", "med_socio", "med_philo", "bed_gender", "deled_society"
    ]
  },
  {
    id: "tut_edu_03",
    name: "Rohit Vaidwan",
    experienceYears: 10,
    rating: 4.8,
    hourlyPrice: 900,
    active: true,
    subjectIds: [
      "bed_ped_math", "ctet_math_pri", "bed_ped_sci", "ctet_evs"
    ]
  },

  /* ==================================================================
     13. SPORTS & VOCATIONAL
     (Covers: B.P.Ed, Sports Mgmt, ITI, Poly)
     ================================================================== */
  {
    id: "tut_sports_01",
    name: "Coach P. Gopichand",
    experienceYears: 20,
    rating: 5.0,
    hourlyPrice: 2000,
    active: true,
    subjectIds: [
      "bped_training", "bped_track_field_1", "sm_fund", "bped_kinesiology"
    ]
  },
  {
    id: "tut_voc_01",
    name: "Technical Guruji",
    experienceYears: 10,
    rating: 4.7,
    hourlyPrice: 600,
    active: true,
    subjectIds: [
      "iti_copa_fund", "skill_mobile_repair", "bvoc_auto_ev", "skill_cctv"
    ]
  }

  
];

/**
 * Helper to find tutors who teach ANY of the provided subject IDs.
 * Ensures that if a generic "Math" tutor teaches 'math_calc', they appear
 * when a user selects 'Math' in CSE Sem 1.
  );

*/


 

  /**
   * Helper to find tutors who teach ANY of the provided subject IDs
   * @param {string[]} subjectIds - Array of subject IDs selected by user
   * @returns {Array} - List of tutors who teach at least one of the subjects
   */
  export const getTutorsBySubjects = (subjectIds) => {
    if (!subjectIds || subjectIds.length === 0) return [];
    
    return EDU_TUTORS.filter(tutor => 
      ((tutor.active ?? true)) && 
      Array.isArray(tutor.subjectIds) &&
      tutor.subjectIds.some(sid => subjectIds.includes(sid))
    );
  };
