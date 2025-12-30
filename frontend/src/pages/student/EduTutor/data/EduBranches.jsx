// src/data/EduBranches.js

/**
 * Master Program / Degree list for EduTutor
 *
 * Notes:
 * - Branch = Program / Degree / Track
 * - careerId MUST match EDU_CAREERS ids
 * - This is India-focused but globally compatible
 */

export const EDU_BRANCHES = [
  // ===================== ENGINEERING (AICTE / Universities) =====================
  { id: "cse", name: "Computer Science & Engineering", careerId: "eng" },
  { id: "it", name: "Information Technology", careerId: "eng" },
  { id: "ai_ml", name: "Artificial Intelligence & Machine Learning", careerId: "eng" },
  { id: "ds", name: "Data Science", careerId: "eng" },
  { id: "cyber_security", name: "Cyber Security", careerId: "eng" },
  { id: "mech", name: "Mechanical Engineering", careerId: "eng" },
  { id: "civil", name: "Civil Engineering", careerId: "eng" },
  { id: "eee", name: "Electrical Engineering", careerId: "eng" },
  { id: "ece", name: "Electronics & Communication Engineering", careerId: "eng" },
  { id: "chemical", name: "Chemical Engineering", careerId: "eng" },
  { id: "biomedical", name: "Biomedical Engineering", careerId: "eng" },
  { id: "aerospace", name: "Aerospace Engineering", careerId: "eng" },
  { id: "automobile", name: "Automobile Engineering", careerId: "eng" },
  { id: "robotics", name: "Robotics & Automation", careerId: "eng" },

  // ===================== MEDICAL & HEALTH (NMC / PCI / INC) =====================
  { id: "mbbs", name: "MBBS", careerId: "medical" },
  { id: "bds", name: "Dental Surgery (BDS)", careerId: "medical" },
  { id: "bams", name: "Ayurveda (BAMS)", careerId: "medical" },
  { id: "bhms", name: "Homeopathy (BHMS)", careerId: "medical" },
  { id: "nursing", name: "B.Sc Nursing", careerId: "medical" },
  { id: "pharmacy", name: "Pharmacy (B.Pharm / D.Pharm)", careerId: "medical" },
  { id: "physiotherapy", name: "Physiotherapy (BPT)", careerId: "medical" },
  { id: "allied_health", name: "Allied Health Sciences", careerId: "medical" },
  { id: "public_health", name: "Public Health (BPH / MPH)", careerId: "medical" },
  { id: "medical_lab", name: "Medical Laboratory Technology (MLT)", careerId: "medical" },

  // ===================== SCIENCE (UGC) =====================
  { id: "physics", name: "Physics", careerId: "science" },
  { id: "chemistry", name: "Chemistry", careerId: "science" },
  { id: "mathematics", name: "Mathematics", careerId: "science" },
  { id: "statistics", name: "Statistics", careerId: "science" },
  { id: "biology", name: "Biological Sciences", careerId: "science" },
  { id: "biotechnology", name: "Biotechnology", careerId: "science" },
  { id: "microbiology", name: "Microbiology", careerId: "science" },
  { id: "environment", name: "Environmental Science", careerId: "science" },
  { id: "computer_science", name: "Computer Science", careerId: "science" },
  { id: "data_analytics", name: "Data Analytics", careerId: "science" },
  { id: "bsc_it", name: "B.Sc Information Technology (BSc IT)", careerId: "science" },
  { id: "msc_it", name: "M.Sc Information Technology (MSc IT)", careerId: "science" },

  // ===================== COMMERCE & MANAGEMENT =====================
  { id: "bcom", name: "Commerce (B.Com)", careerId: "commerce" },
  { id: "bba", name: "Business Administration (BBA)", careerId: "commerce" },
  { id: "mba", name: "Master of Business Administration (MBA)", careerId: "commerce" },
  { id: "accounting", name: "Accounting", careerId: "commerce" },
  { id: "finance", name: "Finance", careerId: "commerce" },
  { id: "marketing", name: "Marketing", careerId: "commerce" },
  { id: "human_resource", name: "Human Resource Management", careerId: "commerce" },
  { id: "ca", name: "Chartered Accountancy (CA)", careerId: "commerce" },
  { id: "cma", name: "Cost & Management Accounting (CMA)", careerId: "commerce" },

  // ===================== ARTS & HUMANITIES =====================
  { id: "history", name: "History", careerId: "arts" },
  { id: "political_science", name: "Political Science", careerId: "arts" },
  { id: "sociology", name: "Sociology", careerId: "arts" },
  { id: "psychology", name: "Psychology", careerId: "arts" },
  { id: "philosophy", name: "Philosophy", careerId: "arts" },
  { id: "economics_arts", name: "Economics", careerId: "arts" },
  { id: "journalism", name: "Journalism", careerId: "arts" },
  { id: "english_literature", name: "English Literature", careerId: "arts" },

  // ===================== LAW (BCI) =====================
  { id: "llb", name: "LLB", careerId: "law" },
  { id: "ba_llb", name: "BA LLB (Integrated)", careerId: "law" },
  { id: "bba_llb", name: "BBA LLB (Integrated)", careerId: "law" },
  { id: "llm", name: "Master of Laws (LLM)", careerId: "law" },
  { id: "bcom_llb", name: "B.Com LLB (Integrated)", careerId: "law" },
  // Add these to your 'law' careerId list
  { id: "law_entrance", name: "Law Entrance Exams (CLAT/AILET/SLAT)", careerId: "law" },
  { id: "bsc_llb", name: "B.Sc LLB (Integrated)", careerId: "law" }, // For science students pursuing law
  { id: "judiciary_exam", name: "Judiciary Services Exams (Civil Judge)", careerId: "law" },

  // ===================== EDUCATION =====================
  { id: "bed", name: "Bachelor of Education (B.Ed)", careerId: "education" },
  { id: "med", name: "Master of Education (M.Ed)", careerId: "education" },
  // Add these to your 'education' careerId list
  { id: "deled", name: "Diploma in Elementary Education (D.El.Ed / BTC)", careerId: "education" },
  { id: "beled", name: "Bachelor of Elementary Education (B.El.Ed)", careerId: "education" }, // 4-Year Integrated
  { id: "ntt", name: "Nursery Teacher Training (NTT / ECCE)", careerId: "education" },
  { id: "integrated_bed", name: "Integrated B.Sc. B.Ed / B.A. B.Ed", careerId: "education" },

  // ===================== DESIGN =====================
  { id: "fashion_design", name: "Fashion Design", careerId: "design" },
  { id: "graphic_design", name: "Graphic Design", careerId: "design" },
  { id: "ui_ux", name: "UI / UX Design", careerId: "design" },
  { id: "industrial_design", name: "Industrial Design", careerId: "design" },
  // DESIGN
  { id: "bdes", name: "Bachelor of Design (B.Des)", careerId: "design" },
  // Add these to your 'design' careerId list
  { id: "textile_design", name: "Textile Design", careerId: "design" },
  { id: "animation_design", name: "Animation & Film Design", careerId: "design" },
  { id: "accessory_design", name: "Accessory Design (Jewelry/Leather)", careerId: "design" },
  { id: "bfa_applied_art", name: "BFA Applied Arts (Commercial Art)", careerId: "design" },
  { id: "m_des", name: "Master of Design (M.Des)", careerId: "design" },


  // ===================== ARCHITECTURE =====================
  { id: "architecture", name: "Architecture (B.Arch)", careerId: "architecture" },
  { id: "urban_planning", name: "Urban & Regional Planning", careerId: "architecture" },
  // Add these to your 'architecture' careerId list
  { id: "m_arch", name: "Master of Architecture (M.Arch)", careerId: "architecture" },
  { id: "b_plan", name: "Bachelor of Planning (B.Plan)", careerId: "architecture" },
  { id: "m_plan", name: "Master of Planning (M.Plan)", careerId: "architecture" },
  { id: "landscape", name: "Landscape Architecture", careerId: "architecture" },
  { id: "construction_mgmt", name: "Construction Management", careerId: "architecture" },
  { id: "interior_architecture", name: "Interior Architecture", careerId: "architecture" },

  // ===================== AGRICULTURE =====================
  { id: "agriculture", name: "Agriculture", careerId: "agriculture" },
  { id: "horticulture", name: "Horticulture", careerId: "agriculture" },
  { id: "fisheries", name: "Fisheries Science", careerId: "agriculture" },
  { id: "dairy", name: "Dairy Technology", careerId: "agriculture" },
  // AGRICULTURE & FOOD
  { id: "food_tech", name: "Food Technology", careerId: "agriculture" },
  { id: "forestry", name: "Forestry", careerId: "agriculture" },

  // ===================== VOCATIONAL =====================
  { id: "iti", name: "ITI & Skill Development", careerId: "vocational" },
  { id: "polytechnic", name: "Polytechnic Diploma", careerId: "vocational" },
  { id: "skill_training", name: "Skill-Based Training Programs", careerId: "vocational" },
  // VOCATIONAL
  { id: "bvoc", name: "Bachelor of Vocation (B.Voc)", careerId: "vocational" }, 

  // ===================== COMPUTER APPLICATIONS =====================
  { id: "bca", name: "Bachelor of Computer Applications (BCA)", careerId: "computer_applications" },
  { id: "mca", name: "Master of Computer Applications (MCA)", careerId: "computer_applications" },

  // ===================== HOTEL MANAGEMENT =====================
  { id: "bhm", name: "Bachelor of Hotel Management (BHM)", careerId: "hotel_management" },
  { id: "culinary", name: "Culinary Arts", careerId: "hotel_management" },
  { id: "travel_tourism", name: "Travel & Tourism Management", careerId: "hotel_management" },

  // ===================== MASS COMMUNICATION =====================
  { id: "bjmc", name: "Bachelor of Journalism & Mass Comm (BJMC)", careerId: "mass_communication" },
  { id: "multimedia", name: "Multimedia & Animation", careerId: "mass_communication" },
  // Add these to your 'mass_communication' careerId list
  { id: "ma_jmc", name: "Master of Journalism & Mass Comm (MA-JMC)", careerId: "mass_communication" },
  { id: "viscom", name: "B.Sc Visual Communication", careerId: "mass_communication" },
  { id: "film_studies", name: "Film Studies & Direction", careerId: "mass_communication" },

  // ===================== SPORTS =====================
  { id: "bped", name: "Bachelor of Physical Education (B.P.Ed)", careerId: "sports" },
  { id: "sports_management", name: "Sports Management", careerId: "sports" },

  // ===================== CIVIL SERVICES (EXAMS) =====================
  { id: "upsc_cse", name: "UPSC Civil Services (IAS/IPS/IFS)", careerId: "civil_services" },
  { id: "state_psc", name: "State PSC Exams", careerId: "civil_services" },
  { id: "ssc_cgl", name: "SSC CGL", careerId: "civil_services" },
  { id: "rbi_grade_b", name: "RBI Grade B", careerId: "civil_services" },
  // COMPETITIVE EXAMS (Very High Volume)
  { id: "ibps_bank", name: "Banking Exams (IBPS PO/Clerk/SBI)", careerId: "civil_services" },
  { id: "gate_exam", name: "GATE (Engineering/PSU)", careerId: "civil_services" },
  { id: "ctet_exam", name: "Teaching Eligibility (CTET/TET)", careerId: "education" },
  { id: "clat_exam", name: "Law Entrance (CLAT/AILET)", careerId: "law" },

  // ===================== DEFENCE (EXAMS) =====================
  { id: "nda", name: "NDA (National Defence Academy)", careerId: "defence" },
  { id: "cds", name: "CDS (Combined Defence Services)", careerId: "defence" },
  { id: "afcat", name: "AFCAT (Air Force)", careerId: "defence" },
  // Add these to your 'defence' careerId list
  { id: "capf", name: "CAPF (Assistant Commandant) - UPSC", careerId: "defence" },
  { id: "agniveer", name: "Agniveer (Army/Navy/Air Force)", careerId: "defence" },
  { id: "icg", name: "Indian Coast Guard (Navik/Yantrik)", careerId: "defence" },
  { id: "inet", name: "Indian Navy Entrance Test (INET)", careerId: "defence" },
];

/**
 * Helper: get programs for selected career
 */
export const getBranchesByCareer = (careerId) =>
  EDU_BRANCHES.filter(branch => branch.careerId === careerId);
