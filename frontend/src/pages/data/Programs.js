// Programs/Degrees - What specific program/degree does the teacher teach?
// fieldId must match TEACHING_FIELDS ids

export const PROGRAMS = [
    // ===================== ENGINEERING (AICTE / Universities) =====================
    { id: "cse", name: "Computer Science & Engineering", fieldId: "eng" },
    { id: "it", name: "Information Technology", fieldId: "eng" },
    { id: "ai_ml", name: "Artificial Intelligence & Machine Learning", fieldId: "eng" },
    { id: "ds", name: "Data Science", fieldId: "eng" },
    { id: "cyber_security", name: "Cyber Security", fieldId: "eng" },
    { id: "mech", name: "Mechanical Engineering", fieldId: "eng" },
    { id: "civil", name: "Civil Engineering", fieldId: "eng" },
    { id: "eee", name: "Electrical Engineering", fieldId: "eng" },
    { id: "ece", name: "Electronics & Communication Engineering", fieldId: "eng" },
    { id: "chemical", name: "Chemical Engineering", fieldId: "eng" },
    { id: "biomedical", name: "Biomedical Engineering", fieldId: "eng" },
    { id: "aerospace", name: "Aerospace Engineering", fieldId: "eng" },
    { id: "automobile", name: "Automobile Engineering", fieldId: "eng" },
    { id: "robotics", name: "Robotics & Automation", fieldId: "eng" },

    // ===================== MEDICAL & HEALTH (NMC / PCI / INC) =====================
    { id: "mbbs", name: "MBBS", fieldId: "medical" },
    { id: "bds", name: "Dental Surgery (BDS)", fieldId: "medical" },
    { id: "bams", name: "Ayurveda (BAMS)", fieldId: "medical" },
    { id: "bhms", name: "Homeopathy (BHMS)", fieldId: "medical" },
    { id: "nursing", name: "B.Sc Nursing", fieldId: "medical" },
    { id: "pharmacy", name: "Pharmacy (B.Pharm / D.Pharm)", fieldId: "medical" },
    { id: "physiotherapy", name: "Physiotherapy (BPT)", fieldId: "medical" },
    { id: "allied_health", name: "Allied Health Sciences", fieldId: "medical" },
    { id: "public_health", name: "Public Health (BPH / MPH)", fieldId: "medical" },
    { id: "medical_lab", name: "Medical Laboratory Technology (MLT)", fieldId: "medical" },

    // ===================== SCIENCE (UGC) =====================
    { id: "physics", name: "Physics", fieldId: "science" },
    { id: "chemistry", name: "Chemistry", fieldId: "science" },
    { id: "mathematics", name: "Mathematics", fieldId: "science" },
    { id: "statistics", name: "Statistics", fieldId: "science" },
    { id: "biology", name: "Biological Sciences", fieldId: "science" },
    { id: "biotechnology", name: "Biotechnology", fieldId: "science" },
    { id: "microbiology", name: "Microbiology", fieldId: "science" },
    { id: "environment", name: "Environmental Science", fieldId: "science" },
    { id: "computer_science", name: "Computer Science", fieldId: "science" },
    { id: "data_analytics", name: "Data Analytics", fieldId: "science" },
    { id: "bsc_it", name: "B.Sc Information Technology (BSc IT)", fieldId: "science" },
    { id: "msc_it", name: "M.Sc Information Technology (MSc IT)", fieldId: "science" },

    // ===================== COMMERCE & MANAGEMENT =====================
    { id: "bcom", name: "Commerce (B.Com)", fieldId: "commerce" },
    { id: "bba", name: "Business Administration (BBA)", fieldId: "commerce" },
    { id: "mba", name: "Master of Business Administration (MBA)", fieldId: "commerce" },
    { id: "accounting", name: "Accounting", fieldId: "commerce" },
    { id: "finance", name: "Finance", fieldId: "commerce" },
    { id: "marketing", name: "Marketing", fieldId: "commerce" },
    { id: "human_resource", name: "Human Resource Management", fieldId: "commerce" },
    { id: "ca", name: "Chartered Accountancy (CA)", fieldId: "commerce" },
    { id: "cma", name: "Cost & Management Accounting (CMA)", fieldId: "commerce" },

    // ===================== ARTS & HUMANITIES =====================
    { id: "history", name: "History", fieldId: "arts" },
    { id: "political_science", name: "Political Science", fieldId: "arts" },
    { id: "sociology", name: "Sociology", fieldId: "arts" },
    { id: "psychology", name: "Psychology", fieldId: "arts" },
    { id: "philosophy", name: "Philosophy", fieldId: "arts" },
    { id: "economics_arts", name: "Economics", fieldId: "arts" },
    { id: "journalism", name: "Journalism", fieldId: "arts" },
    { id: "english_literature", name: "English Literature", fieldId: "arts" },

    // ===================== LAW (BCI) =====================
    { id: "llb", name: "LLB", fieldId: "law" },
    { id: "ba_llb", name: "BA LLB (Integrated)", fieldId: "law" },
    { id: "bba_llb", name: "BBA LLB (Integrated)", fieldId: "law" },
    { id: "llm", name: "Master of Laws (LLM)", fieldId: "law" },
    { id: "bcom_llb", name: "B.Com LLB (Integrated)", fieldId: "law" },
    { id: "law_entrance", name: "Law Entrance Exams (CLAT/AILET/SLAT)", fieldId: "law" },
    { id: "bsc_llb", name: "B.Sc LLB (Integrated)", fieldId: "law" },
    { id: "judiciary_exam", name: "Judiciary Services Exams (Civil Judge)", fieldId: "law" },

    // ===================== EDUCATION =====================
    { id: "bed", name: "Bachelor of Education (B.Ed)", fieldId: "education" },
    { id: "med", name: "Master of Education (M.Ed)", fieldId: "education" },
    { id: "deled", name: "Diploma in Elementary Education (D.El.Ed / BTC)", fieldId: "education" },
    { id: "beled", name: "Bachelor of Elementary Education (B.El.Ed)", fieldId: "education" },
    { id: "ntt", name: "Nursery Teacher Training (NTT / ECCE)", fieldId: "education" },
    { id: "integrated_bed", name: "Integrated B.Sc. B.Ed / B.A. B.Ed", fieldId: "education" },
    { id: "ctet_exam", name: "Teaching Eligibility (CTET/TET)", fieldId: "education" },

    // ===================== DESIGN =====================
    { id: "fashion_design", name: "Fashion Design", fieldId: "design" },
    { id: "graphic_design", name: "Graphic Design", fieldId: "design" },
    { id: "ui_ux", name: "UI / UX Design", fieldId: "design" },
    { id: "industrial_design", name: "Industrial Design", fieldId: "design" },
    { id: "bdes", name: "Bachelor of Design (B.Des)", fieldId: "design" },
    { id: "textile_design", name: "Textile Design", fieldId: "design" },
    { id: "animation_design", name: "Animation & Film Design", fieldId: "design" },
    { id: "accessory_design", name: "Accessory Design (Jewelry/Leather)", fieldId: "design" },
    { id: "bfa_applied_art", name: "BFA Applied Arts (Commercial Art)", fieldId: "design" },
    { id: "m_des", name: "Master of Design (M.Des)", fieldId: "design" },

    // ===================== ARCHITECTURE =====================
    { id: "architecture", name: "Architecture (B.Arch)", fieldId: "architecture" },
    { id: "urban_planning", name: "Urban & Regional Planning", fieldId: "architecture" },
    { id: "m_arch", name: "Master of Architecture (M.Arch)", fieldId: "architecture" },
    { id: "b_plan", name: "Bachelor of Planning (B.Plan)", fieldId: "architecture" },
    { id: "m_plan", name: "Master of Planning (M.Plan)", fieldId: "architecture" },
    { id: "landscape", name: "Landscape Architecture", fieldId: "architecture" },
    { id: "construction_mgmt", name: "Construction Management", fieldId: "architecture" },
    { id: "interior_architecture", name: "Interior Architecture", fieldId: "architecture" },

    // ===================== AGRICULTURE =====================
    { id: "agriculture", name: "Agriculture", fieldId: "agriculture" },
    { id: "horticulture", name: "Horticulture", fieldId: "agriculture" },
    { id: "fisheries", name: "Fisheries Science", fieldId: "agriculture" },
    { id: "dairy", name: "Dairy Technology", fieldId: "agriculture" },
    { id: "food_tech", name: "Food Technology", fieldId: "agriculture" },
    { id: "forestry", name: "Forestry", fieldId: "agriculture" },

    // ===================== VOCATIONAL =====================
    { id: "iti", name: "ITI & Skill Development", fieldId: "vocational" },
    { id: "polytechnic", name: "Polytechnic Diploma", fieldId: "vocational" },
    { id: "skill_training", name: "Skill-Based Training Programs", fieldId: "vocational" },
    { id: "bvoc", name: "Bachelor of Vocation (B.Voc)", fieldId: "vocational" },

    // ===================== COMPUTER APPLICATIONS =====================
    { id: "bca", name: "Bachelor of Computer Applications (BCA)", fieldId: "computer_applications" },
    { id: "mca", name: "Master of Computer Applications (MCA)", fieldId: "computer_applications" },

    // ===================== HOTEL MANAGEMENT =====================
    { id: "bhm", name: "Bachelor of Hotel Management (BHM)", fieldId: "hotel_management" },
    { id: "culinary", name: "Culinary Arts", fieldId: "hotel_management" },
    { id: "travel_tourism", name: "Travel & Tourism Management", fieldId: "hotel_management" },

    // ===================== MASS COMMUNICATION =====================
    { id: "bjmc", name: "Bachelor of Journalism & Mass Comm (BJMC)", fieldId: "mass_communication" },
    { id: "multimedia", name: "Multimedia & Animation", fieldId: "mass_communication" },
    { id: "ma_jmc", name: "Master of Journalism & Mass Comm (MA-JMC)", fieldId: "mass_communication" },
    { id: "viscom", name: "B.Sc Visual Communication", fieldId: "mass_communication" },
    { id: "film_studies", name: "Film Studies & Direction", fieldId: "mass_communication" },

    // ===================== SPORTS =====================
    { id: "bped", name: "Bachelor of Physical Education (B.P.Ed)", fieldId: "sports" },
    { id: "sports_management", name: "Sports Management", fieldId: "sports" },

    // ===================== CIVIL SERVICES (EXAMS) =====================
    { id: "upsc_cse", name: "UPSC Civil Services (IAS/IPS/IFS)", fieldId: "civil_services" },
    { id: "state_psc", name: "State PSC Exams", fieldId: "civil_services" },
    { id: "ssc_cgl", name: "SSC CGL", fieldId: "civil_services" },
    { id: "rbi_grade_b", name: "RBI Grade B", fieldId: "civil_services" },
    { id: "ibps_bank", name: "Banking Exams (IBPS PO/Clerk/SBI)", fieldId: "civil_services" },
    { id: "gate_exam", name: "GATE (Engineering/PSU)", fieldId: "civil_services" },
    { id: "clat_exam", name: "Law Entrance (CLAT/AILET)", fieldId: "civil_services" },

    // ===================== DEFENCE (EXAMS) =====================
    { id: "nda", name: "NDA (National Defence Academy)", fieldId: "defence" },
    { id: "cds", name: "CDS (Combined Defence Services)", fieldId: "defence" },
    { id: "afcat", name: "AFCAT (Air Force)", fieldId: "defence" },
    { id: "capf", name: "CAPF (Assistant Commandant) - UPSC", fieldId: "defence" },
    { id: "agniveer", name: "Agniveer (Army/Navy/Air Force)", fieldId: "defence" },
    { id: "icg", name: "Indian Coast Guard (Navik/Yantrik)", fieldId: "defence" },
    { id: "inet", name: "Indian Navy Entrance Test (INET)", fieldId: "defence" },
];

/**
 * Helper: get programs for selected teaching field
 */
export const getProgramsByField = (fieldId) =>
    PROGRAMS.filter(program => program.fieldId === fieldId);
