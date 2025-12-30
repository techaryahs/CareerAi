
/**
 * Master Career Taxonomy for EduTutor
 *
 * Notes:
 * - This is a DOMAIN-LEVEL classification (not job titles)
 * - IDs are stable and future-proof
 * - Covers Indian + global education systems
 * - New careers can be appended without breaking UI or APIs
 * 
 * TYPES:
 * - "branch" : Leads to Branch selection (e.g. Engineering -> CSE, MECH)
 * - "program": Leads to Program selection (e.g. Medical -> MBBS, BDS)
 * - "exam"   : Leads to Exam/Category selection (e.g. Civil Services -> UPSC, SSC)
 */

export const EDU_CAREERS = [
  {
    id: "eng",
    name: "Engineering",
    type: "branch",
    description: "B.Tech, B.E, Diploma and applied engineering programs",
    icon: "🛠️",
    enabled: true,
    order: 1
  },
  {
    id: "medical",
    name: "Medical & Health Sciences",
    type: "program",
    description: "MBBS, nursing, pharmacy, allied and paramedical studies",
    icon: "🩺",
    enabled: true,
    order: 2
  },
  {
    id: "science",
    name: "Science (B.Sc / M.Sc)",
    type: "program",
    description: "Physics, Chemistry, Mathematics, Life Sciences and research",
    icon: "🧪",
    enabled: true,
    order: 3
  },
  {
    id: "commerce",
    name: "Commerce & Management",
    type: "program",
    description: "B.Com, M.Com, BBA, MBA, accounting and finance",
    icon: "📊",
    enabled: true,
    order: 4
  },
  {
    id: "arts",
    name: "Arts & Humanities",
    type: "program",
    description: "BA programs like history, economics, sociology, psychology",
    icon: "🎨",
    enabled: true,
    order: 5
  },
  {
    id: "law",
    name: "Law",
    type: "program",
    description: "LLB, integrated law programs and legal studies",
    icon: "⚖️",
    enabled: true,
    order: 6
  },
  {
    id: "civil_services",
    name: "Govt Jobs & Competitive Exams",
    type: "exam",
    description: "PSC, Banking, SSC, GATE, and public sector careers.",
    icon: "🏛️",
    enabled: true,
    order: 7
  },
  {
    id: "defence",
    name: "Defence & Armed Forces",
    type: "exam",
    description: "NDA, CDS, military and defence-oriented careers",
    icon: "🛡️",
    enabled: true,
    order: 8
  },
  {
    id: "education",
    name: "Education & Teaching",
    type: "program",
    description: "B.Ed, M.Ed, teacher training and pedagogy programs",
    icon: "🍎",
    enabled: true,
    order: 9
  },
  {
    id: "design",
    name: "Design & Creative Arts",
    type: "program",
    description: "Fashion, graphic, UI/UX, industrial and visual design",
    icon: "✏️",
    enabled: true,
    order: 10
  },
  {
    id: "architecture",
    name: "Architecture & Planning",
    type: "program",
    description: "Architecture, urban planning and interior design",
    icon: "🏗️",
    enabled: true,
    order: 11
  },
  {
    id: "agriculture",
    name: "Agriculture & Allied Sciences",
    type: "program",
    description: "Agriculture, horticulture, fisheries and dairy science",
    icon: "🌱",
    enabled: true,
    order: 12
  },
  {
    id: "hotel_management",
    name: "Hotel Management",
    type: "program",
    description: "Hotel management, tourism and hospitality studies",
    icon: "🏨",
    enabled: true,
    order: 13
  },
  {
    id: "mass_communication",
    name: "Media & Mass Comm",
    type: "program",
    description: "Journalism, mass media, advertising and public relations",
    icon: "🎙️",
    enabled: true,
    order: 14
  },
  {
    id: "computer_applications",
    name: "Computer Applications",
    type: "program",
    description: "BCA, MCA and application-focused computing programs",
    icon: "💻",
    enabled: true,
    order: 15
  },
  {
    id: "vocational",
    name: "Vocational & Skills",
    type: "program",
    description: "ITI, skill development and job-oriented training",
    icon: "🔧",
    enabled: true,
    order: 16
  },
  {
    id: "sports",
    name: "Sports & Physical Ed",
    type: "program",
    description: "Professional sports, coaching and physical education",
    icon: "⚽",
    enabled: true,
    order: 17
  }
];

/**
 * Helper: returns only enabled careers in UI order
 */
export const getActiveCareers = () =>
  EDU_CAREERS
    .filter(career => career.enabled)
    .sort((a, b) => a.order - b.order);
