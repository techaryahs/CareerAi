import { useState, useEffect, useRef } from "react";
import { logStudentActivity } from "../../../../utils/logActivity";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const T = {
    blue900: "#0D2357",
    blue800: "#1238A0",
    blue700: "#1A4FCC",
    blue600: "#2563EB",
    blue500: "#3B82F6",
    blue400: "#60A5FA",
    blue200: "#BFDBFE",
    blue100: "#DBEAFE",
    blue50: "#EFF6FF",
    white: "#FFFFFF",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray900: "#111827",
    green500: "#22C55E",
    green600: "#16A34A",
    green50: "#F0FDF4",
};

const shadowMd = "0 4px 20px rgba(37,99,235,0.10), 0 1px 4px rgba(0,0,0,0.06)";
const shadowLg = "0 8px 40px rgba(37,99,235,0.14), 0 2px 8px rgba(0,0,0,0.06)";
const shadowBlue = "0 8px 28px rgba(37,99,235,0.35)";

/* ============================================================
   GLOBAL CSS (injected once)
   ============================================================ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Lora:wght@600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #EFF6FF; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse2 {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.5; transform:scale(.85); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  .fadeup { animation: fadeUp .45s cubic-bezier(.22,1,.36,1) both; }
  .fadeup-1 { animation-delay:.08s; }
  .fadeup-2 { animation-delay:.16s; }
  .fadeup-3 { animation-delay:.24s; }
  .fadeup-4 { animation-delay:.32s; }

  .btn-primary {
    background: linear-gradient(135deg, #2563EB, #1A4FCC);
    color: #fff; border: none; border-radius: 99px;
    padding: 13px 28px; font-size: 14.5px; font-weight: 700;
    cursor: pointer; font-family: inherit;
    box-shadow: ${shadowBlue};
    transition: transform .18s, box-shadow .18s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(37,99,235,.45); }
  .btn-primary:disabled {
    background: ${T.gray200}; color: ${T.gray400};
    box-shadow: none; cursor: not-allowed; transform: none;
  }

  .btn-outline {
    background: #fff; color: ${T.blue700}; border: 1.5px solid ${T.blue300};
    border-radius: 99px; padding: 12px 24px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: background .18s, transform .18s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-outline:hover { background: ${T.blue50}; transform: translateY(-2px); }

  .btn-ghost {
    background: transparent; color: ${T.gray500}; border: 1.5px solid ${T.gray200};
    border-radius: 99px; padding: 11px 22px; font-size: 13.5px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: background .18s;
  }
  .btn-ghost:hover { background: ${T.gray100}; }

  .chip {
    border-radius: 99px; padding: 8px 18px; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all .18s; border: 1.5px solid;
  }
  .chip-on  { background: ${T.blue50};  border-color: ${T.blue500}; color: ${T.blue700}; }
  .chip-off { background: #fff; border-color: ${T.gray200}; color: ${T.gray600}; }
  .chip-off:hover { border-color: ${T.blue400}; color: ${T.blue700}; }

  .card {
    background: #fff; border-radius: 20px;
    border: 1px solid ${T.gray100};
    box-shadow: ${shadowMd}; padding: 28px 28px;
  }

  .interest-pill {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    border-radius: 16px; padding: 14px 10px; font-size: 12.5px; font-weight: 600;
    cursor: pointer; border: 1.5px solid; transition: all .18s; font-family: inherit;
  }
  .interest-pill-on  { background: ${T.blue50};  border-color: ${T.blue500}; color: ${T.blue700}; }
  .interest-pill-off { background: #fff; border-color: ${T.gray200}; color: ${T.gray500}; }
  .interest-pill-off:hover { border-color: ${T.blue400}; background: ${T.blue50}; color: ${T.blue700}; }

  .status-btn {
    border-radius: 14px; padding: 12px 16px; font-size: 13.5px; font-weight: 500;
    cursor: pointer; border: 1.5px solid; transition: all .18s; text-align: left;
    font-family: inherit; line-height: 1.4;
  }
  .status-btn-on  { background: ${T.blue50};  border-color: ${T.blue500}; color: ${T.blue700}; font-weight: 700; }
  .status-btn-off { background: #fff; border-color: ${T.gray200}; color: ${T.gray600}; }
  .status-btn-off:hover { border-color: ${T.blue300}; background: ${T.blue50}; }

  .result-card {
    background: #fff; border: 1.5px solid ${T.gray100}; border-radius: 16px;
    padding: 18px 20px; display: flex; justify-content: space-between;
    align-items: center; gap: 16px; transition: border-color .18s, box-shadow .18s;
  }
  .result-card:hover { border-color: ${T.blue400}; box-shadow: ${shadowMd}; }

  .roadmap-dot {
    width: 24px; height: 24px; border-radius: 50%;
    background: linear-gradient(135deg, #2563EB, #1A4FCC);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800; color: #fff; flex-shrink: 0; margin-top: 2px;
  }
  .roadmap-line { width: 2px; flex:1; min-height: 20px; background: ${T.blue100}; margin: 3px 0; }

  /* SIDEBAR accent panel */
  .sidebar-accent {
    background: linear-gradient(145deg, #0D2357 0%, #1A4FCC 100%);
    border-radius: 24px; padding: 32px 28px; color: #fff;
    box-shadow: ${shadowLg};
    position: relative; overflow: hidden;
  }
  .sidebar-accent::before {
    content: '';
    position: absolute; top: -40px; right: -40px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(255,255,255,.06);
    pointer-events: none;
  }
  .sidebar-accent::after {
    content: '';
    position: absolute; bottom: -30px; left: -30px;
    width: 140px; height: 140px; border-radius: 50%;
    background: rgba(255,255,255,.04);
    pointer-events: none;
  }

  /* Progress bar track */
  .prog-track {
    height: 6px; background: ${T.blue100}; border-radius: 99px; overflow: hidden;
  }
  .prog-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, #2563EB, #60A5FA);
    transition: width .6s cubic-bezier(.34,1.56,.64,1);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${T.gray100}; }
  ::-webkit-scrollbar-thumb { background: ${T.blue200}; border-radius: 99px; }

  /* Section label */
  .sec-label {
    font-size: 11px; font-weight: 700; color: ${T.gray400};
    letter-spacing: .08em; text-transform: uppercase; margin-bottom: 10px;
  }

  input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
  input[type=number] { -moz-appearance: textfield; }
`;

/* ============================================================
   STATIC DATA
   ============================================================ */
const STATUS_OPTIONS = [
    "Dropped out before 10th",
    "Dropped out after 10th",
    "Dropped out after 11th",
    "Dropped out after 12th",
    "Dropped out from college",
];
const STREAM_OPTIONS = ["Science", "Commerce", "Arts", "Vocational", "Other"];
const DEGREES_BY_STREAM = {
    Science: ["Engineering (B.Tech / BE)", "Medical / Healthcare (MBBS / BDS / Nursing)", "Science (B.Sc Physics / Chemistry / CS / IT)"],
    Commerce: ["Commerce (B.Com General / Accounting / Finance)", "Management (BBA / BMS Marketing, HR)", "Professional Courses (CA, CS, CMA, CFA)"],
    Arts: ["Arts / Humanities (BA Psychology, Economics)", "Fine Arts / Design (BA / BFA / B.Des)", "Journalism & Mass Communication", "Law (BA LLB / LLB)"],
    Vocational: ["Vocational IT (Diplomas in Web Dev / Hardware)", "Vocational Engineering (Mechanical / Civil / Electrical)", "Vocational Design / Hospitality"],
    Other: ["Distance / Online Degrees", "Skill-first Programs"],
};

const EDU_INTERESTS = [
    { label: "Coding", emoji: "💻" }, { label: "Technology", emoji: "🖥️" }, { label: "Business", emoji: "📈" },
    { label: "Money", emoji: "💰" }, { label: "Design", emoji: "🎨" }, { label: "Creativity", emoji: "✨" },
    { label: "Health", emoji: "💙" }, { label: "Helping", emoji: "🤝" }, { label: "Science", emoji: "🔬" },
    { label: "Problem-Solving", emoji: "🧠" }, { label: "People", emoji: "🗣️" }, { label: "Media", emoji: "🎥" },
    { label: "Teaching", emoji: "📚" }, { label: "Hands-on", emoji: "🛠️" },
];
const JOB_INTERESTS = [
    { label: "Communication", emoji: "💬" }, { label: "Sales / Persuasion", emoji: "🤝" },
    { label: "Customer Support", emoji: "📞" }, { label: "Problem-Solving", emoji: "🧠" },
    { label: "Numbers / Data", emoji: "📊" }, { label: "Creativity", emoji: "✨" },
    { label: "Design / Content", emoji: "🎨" }, { label: "Teamwork", emoji: "👥" },
    { label: "Leadership", emoji: "⭐" }, { label: "Hands-on Work", emoji: "🛠️" },
    { label: "Tech / Computers", emoji: "💻" }, { label: "Teaching / Training", emoji: "📚" },
];

// Mock education paths
const EDU_PATHS = [
    { id: "e1", name: "Engineering & Technology (B.Tech / BE)", description: "A 4-year undergraduate program. Access via JEE Main, state entrance exams, or direct admission at private colleges. Ideal for Science stream students.", tags: ["Coding", "Technology", "Science", "Problem-Solving"], educationRoute: ["Clear Class 12 board or appear via NIOS", "Register for JEE Main / state entrance exam", "Apply to engineering colleges based on rank", "Choose branch: CS, ECE, Mechanical, Civil", "Complete 4-year B.Tech & apply for campus placements"] },
    { id: "e2", name: "Bachelor of Science (B.Sc CS / IT)", description: "3-year degree with strong focus on programming, algorithms, and software development. Great entry point for tech careers without JEE pressure.", tags: ["Coding", "Technology", "Science", "Problem-Solving"], educationRoute: ["Pass Class 12 (PCM or PCB)", "Apply to B.Sc CS/IT colleges via direct merit", "Learn programming basics: Python, Java, C++", "Complete projects & internships in Year 2–3", "Pursue MCA or job placements after graduation"] },
    { id: "e3", name: "Commerce & Business (B.Com / BBA)", description: "3-year degree covering accounting, finance, marketing and management. Multiple entrance exams or merit-based direct admission available.", tags: ["Business", "Money", "People", "Leadership"], educationRoute: ["Clear Class 12 Commerce exams or equivalent", "Apply via DU, Mumbai, or state university entrance", "Study core: Accounting, Economics, Taxation", "Do summer internships in finance or marketing", "Explore CA, MBA or direct corporate jobs after"] },
    { id: "e4", name: "Creative Arts & Design (BFA / B.Des)", description: "4-year design or fine arts program focusing on visual communication, UX, fashion, or animation. Portfolio-based admission at top institutes.", tags: ["Design", "Creativity", "Media", "Hands-on"], educationRoute: ["Build a creative portfolio of work", "Appear for NID, NIFT, or university design entrance", "Study core design principles, tools (Figma, Adobe)", "Complete live projects & internships", "Graduate into UI/UX, brand, or product design roles"] },
    { id: "e5", name: "Healthcare & Nursing (BSc Nursing / Pharmacy)", description: "Professional degree with strong job guarantee. Admission through entrance exams like NEET or state nursing council exams.", tags: ["Health", "Helping", "Science", "People"], educationRoute: ["Pass Class 12 with Biology (PCB)", "Appear for NEET or state nursing entrance", "Complete 4-year BSc Nursing with clinical rotations", "Register with State Nursing Council", "Apply for hospital jobs or pursue MSc Nursing"] },
    { id: "e6", name: "Journalism & Mass Communication (BJMC)", description: "3-year program combining writing, media production, digital journalism and PR. Multiple universities accept Class 12 graduates.", tags: ["Media", "Creativity", "People", "Communication"], educationRoute: ["Clear Class 12 in any stream", "Apply for IIMC, Symbiosis, or state university entrance", "Study journalism, media law, video production", "Intern with news agencies, channels, or digital media", "Build a portfolio and enter journalism, PR, or content"] },
];

const JOB_PATHS = [
    { id: "j1", name: "Junior Software Developer", description: "Entry-level coding role in web or app development. Most companies hire based on skills and portfolio rather than degrees.", tags: ["Tech / Computers", "Problem-Solving", "Creativity"], learningPath: ["Learn HTML, CSS, JavaScript (3 months — free resources)", "Build 3 portfolio projects on GitHub", "Learn React or Node.js basics", "Apply for junior dev internships on Internshala / LinkedIn", "Convert internship to full-time or apply directly after 6 months"] },
    { id: "j2", name: "Digital Marketing Executive", description: "High-demand role in SEO, social media, paid ads, and content strategy. No degree required — certifications and results matter most.", tags: ["Creativity", "Design / Content", "Communication", "Numbers / Data"], learningPath: ["Get Google Digital Marketing & HubSpot certifications (free)", "Learn SEO basics and run a test blog", "Master Meta Ads Manager and Google Ads", "Take on freelance projects to build a portfolio", "Apply to digital agencies or directly to startups"] },
    { id: "j3", name: "Customer Success / Support Agent", description: "Entry point into tech and SaaS companies. Strong communication skills and basic computer knowledge are the key requirements.", tags: ["Customer Support", "Communication", "People", "Teamwork"], learningPath: ["Improve spoken & written English communication", "Learn basics of CRM tools (Freshdesk, Zendesk)", "Practice handling mock support scenarios", "Apply via Naukri, Internshala, or direct company sites", "Grow into Account Manager or Team Lead within 1–2 years"] },
    { id: "j4", name: "Graphic Designer / Content Creator", description: "Freelance or full-time creative role for social media, branding, video. Tools are learnable online in weeks, portfolio is your resume.", tags: ["Design / Content", "Creativity", "Media", "Hands-on Work"], learningPath: ["Learn Canva, then Figma and Adobe Illustrator", "Study design principles: typography, color, composition", "Build 10 sample designs across different niches", "Start freelancing on Fiverr or Upwork", "Build a steady client base or join a creative agency"] },
    { id: "j5", name: "Sales Development Representative (SDR)", description: "High-paying entry-level role in B2B companies. Requires strong communication, persistence, and the ability to learn product quickly.", tags: ["Sales / Persuasion", "Communication", "Leadership", "People"], learningPath: ["Study sales basics: SPIN Selling, objection handling", "Learn CRM tools: Salesforce, HubSpot CRM (free tier)", "Role-play cold calls and email outreach scripts", "Apply for SDR roles at SaaS or FMCG companies", "Grow into Account Executive (AE) within 12–18 months"] },
    { id: "j6", name: "Data Entry & Back-Office Executive", description: "Stable, immediately available entry-level work. Requires basic computer skills, accuracy, and willingness to learn.", tags: ["Numbers / Data", "Teamwork", "Problem-Solving"], learningPath: ["Master MS Excel: formulas, pivot tables, VLOOKUP", "Learn basic data entry tools and ERP software", "Type at 40+ WPM accurately", "Apply via Naukri.com or local placement agencies", "Cross-train into data analysis or ops roles over time"] },
];

function matchPaths(userData, paths, interests) {
    if (!interests || interests.length === 0) return paths.slice(0, 4);
    const scored = paths.map(p => {
        const score = (p.tags || []).filter(t => interests.includes(t)).length;
        return { ...p, score };
    });
    return scored.sort((a, b) => b.score - a.score).filter(p => p.score > 0).slice(0, 5)
        || paths.slice(0, 4);
}

/* ============================================================
   LAYOUT SHELL — Z / F Architecture
   ============================================================ */
const STEPS = ["Home", "Profile", "Direction", "Explore", "Plan"];
const STEP_MAP = { home: 1, info: 2, path: 3, results: 4, detail: 4, plan: 5 };

const SIDE_CONTENT = {
    home: { title: "You're not behind.", body: "Dropping out doesn't define you — what you do next does. This guided journey finds your perfect path forward.", stat: "73%", statLabel: "of successful people rerouted at least once" },
    info: { title: "Be honest with us.", body: "The more accurately you describe your situation, the better we match paths that truly fit your life right now.", stat: "5 min", statLabel: "is all it takes to complete this step" },
    path: { title: "Two roads forward.", body: "Whether you restart education or start earning now — both are valid. You can explore the other path anytime.", stat: "100+", statLabel: "career pathways tailored to your profile" },
    results: { title: "Your matches are ready.", body: "We ranked these based on your interests and background. Pick what feels right and explore the roadmap.", stat: "3–5", statLabel: "interests gives the best match accuracy" },
    detail: { title: "Explore the roadmap.", body: "Every path has a clear step-by-step plan. Read it through, then add what resonates to your personal action plan.", stat: "5 steps", statLabel: "is the average roadmap length" },
    plan: { title: "Your plan is set.", body: "Every path here is tailored to who you are today. Save it, share it, or start taking action right now.", stat: "Day 1", statLabel: "is always the hardest — you've already started" },
};

function Layout({ screen, children }) {
    const stepNum = STEP_MAP[screen] || 1;
    const progress = Math.round(((stepNum - 1) / (STEPS.length - 1)) * 100);
    const side = SIDE_CONTENT[screen] || SIDE_CONTENT.home;

    return (
        /*
         * NO internal topbar here — the site's existing CareerGenAI
         * navbar is already rendered by the parent route/layout.
         * We just provide the page body below it.
         */
        <div style={{
            minHeight: "100vh",
            background: `linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 60%, #BFDBFE 100%)`,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            paddingBottom: 80,
        }}>
            <style>{GLOBAL_CSS}</style>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 28px 0" }}>

                {/* ── Z ROW 1: Step tracker bar (sits just below site header) ── */}
                <div style={{
                    background: "#fff",
                    border: `1px solid ${T.blue100}`,
                    borderRadius: 16,
                    padding: "14px 24px",
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: shadowMd,
                }}>
                    {/* Left label */}
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.blue900, letterSpacing: "-0.01em" }}>
                        Dropout Career Journey
                    </div>

                    {/* Step dots — right anchor */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {STEPS.map((s, i) => {
                            const n = i + 1;
                            const done = n < stepNum;
                            const active = n === stepNum;
                            return (
                                <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                                        <div style={{
                                            width: 30, height: 30, borderRadius: "50%",
                                            background: active ? "linear-gradient(135deg,#2563EB,#1A4FCC)" : done ? T.blue100 : T.gray100,
                                            border: active ? "none" : done ? `1.5px solid ${T.blue400}` : `1.5px solid ${T.gray200}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 11, fontWeight: 800,
                                            color: active ? "#fff" : done ? T.blue600 : T.gray400,
                                            boxShadow: active ? shadowBlue : "none",
                                            transition: "all .25s",
                                        }}>{done ? "✓" : n}</div>
                                        <span style={{
                                            fontSize: 9.5, fontWeight: 700,
                                            color: active ? T.blue600 : T.gray400,
                                            letterSpacing: ".04em",
                                        }}>{s}</span>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div style={{
                                            width: 20, height: 2, borderRadius: 99,
                                            background: done ? T.blue400 : T.gray200,
                                            marginBottom: 14,
                                            transition: "background .3s",
                                        }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Z ROW 2: Main content grid (diagonal eye scan left → right) ── */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 340px",
                    gap: 24,
                    alignItems: "start",
                }}>

                    {/* LEFT — primary content (form panel) */}
                    <div className="card" style={{
                        padding: "36px 36px",
                        minHeight: 480,
                        boxShadow: shadowLg,
                        borderRadius: 24,
                        border: `1px solid ${T.blue100}`,
                    }}>
                        {children}
                    </div>

                    {/* RIGHT SIDEBAR — supporting context (F-pattern anchor) */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 24 }}>

                        {/* Context card */}
                        <div className="sidebar-accent fadeup">
                            <div style={{
                                fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em",
                                textTransform: "uppercase",
                                background: "rgba(255,255,255,.12)", borderRadius: 99,
                                padding: "4px 12px", display: "inline-block",
                                marginBottom: 16, color: "rgba(255,255,255,.85)",
                            }}>
                                Step {stepNum} of {STEPS.length}
                            </div>
                            <h3 style={{
                                fontSize: 20, fontWeight: 800, lineHeight: 1.3,
                                letterSpacing: "-0.02em", marginBottom: 10,
                                fontFamily: "'Lora', serif", position: "relative", zIndex: 1,
                            }}>{side.title}</h3>
                            <p style={{
                                fontSize: 13.5, lineHeight: 1.75,
                                color: "rgba(255,255,255,.75)",
                                position: "relative", zIndex: 1,
                            }}>{side.body}</p>
                        </div>

                        {/* Stat card */}
                        <div className="card fadeup fadeup-1" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ fontSize: 28, fontWeight: 900, color: T.blue600, letterSpacing: "-0.03em", lineHeight: 1, minWidth: 64 }}>{side.stat}</div>
                            <div style={{ fontSize: 12.5, color: T.gray500, lineHeight: 1.55 }}>{side.statLabel}</div>
                        </div>

                        {/* Progress card */}
                        <div className="card fadeup fadeup-2" style={{ padding: "18px 20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: T.gray400, letterSpacing: ".05em", textTransform: "uppercase" }}>Journey Progress</span>
                                <span style={{ fontSize: 12, fontWeight: 800, color: T.blue600 }}>{progress}%</span>
                            </div>
                            <div className="prog-track">
                                <div className="prog-fill" style={{ width: `${progress}%` }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                                <span style={{ fontSize: 10.5, color: T.gray300 }}>Start</span>
                                <span style={{ fontSize: 10.5, color: T.gray300 }}>Action Plan</span>
                            </div>
                        </div>

                        {/* Trust badge */}
                        <div className="fadeup fadeup-3" style={{
                            display: "flex", alignItems: "center", gap: 10,
                            background: "#fff", border: `1px solid ${T.gray100}`,
                            borderRadius: 14, padding: "12px 16px",
                            boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                        }}>
                            <span style={{ fontSize: 16 }}>🔒</span>
                            <span style={{ fontSize: 12, color: T.gray500, lineHeight: 1.55 }}>Your data stays on your device — nothing is stored on our servers.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   PAGE 1 — HOME
   ============================================================ */
function HomePage({ onNext }) {
    return (
        <Layout screen="home">
            <div style={{ maxWidth: 560 }}>
                {/* Eyebrow */}
                <div className="fadeup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.blue50, border: `1px solid ${T.blue200}`, borderRadius: 99, padding: "5px 14px", marginBottom: 28 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.green500, display: "inline-block", animation: "pulse2 2s infinite" }} />
                    <span style={{ fontSize: 11.5, color: T.blue700, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>Free · No signup required</span>
                </div>

                {/* Headline */}
                <h1 className="fadeup fadeup-1" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, lineHeight: 1.18, letterSpacing: "-0.02em", color: T.blue900, marginBottom: 18 }}>
                    You dropped out.<br />
                    <span style={{ color: T.blue600 }}>That's not the end.</span>
                </h1>

                <p className="fadeup fadeup-2" style={{ fontSize: 16, color: T.gray500, lineHeight: 1.8, maxWidth: 440, marginBottom: 40 }}>
                    Answer a few quick questions and we'll build you a real, personalised step-by-step plan — whether you want to return to education or start earning now.
                </p>

                {/* CTAs */}
                <div className="fadeup fadeup-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                    <button className="btn-primary" onClick={onNext}>
                        Start My Journey <span style={{ fontSize: 17 }}>→</span>
                    </button>
                    <button className="btn-outline">
                        💬 Talk to a Counsellor
                    </button>
                </div>

                {/* Trust stats */}
                <div className="fadeup fadeup-4" style={{ display: "flex", gap: 28, flexWrap: "wrap", paddingTop: 28, borderTop: `1px solid ${T.gray100}` }}>
                    {[["🎓", "100+ education paths"], ["💼", "50+ job pathways"], ["⚡", "5-min assessment"]].map(([icon, label]) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 18 }}>{icon}</span>
                            <span style={{ fontSize: 13, color: T.gray400, fontWeight: 500 }}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

/* ============================================================
   PAGE 2 — DROPOUT INFO
   ============================================================ */
function InfoPage({ userData, setUserData, onNext }) {
    const degreeOptions = DEGREES_BY_STREAM[userData.stream] || [];
    const canProceed = userData.status && userData.stream && userData.age &&
        (userData.status !== "Dropped out from college" || userData.degree);

    const handleChange = (field, value) => {
        setUserData(prev => {
            const next = { ...prev, [field]: value };
            if (field === "stream") next.degree = "";
            return next;
        });
    };

    return (
        <Layout screen="info">
            <div className="fadeup" style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: T.gray900, marginBottom: 6 }}>Tell us your story</h2>
                <p style={{ fontSize: 14, color: T.gray500, lineHeight: 1.6 }}>Be honest — this helps us find paths that actually fit you right now.</p>
            </div>

            {/* STATUS */}
            <div className="fadeup fadeup-1" style={{ marginBottom: 26 }}>
                <div className="sec-label">Where did you leave off?</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {STATUS_OPTIONS.map(s => (
                        <button key={s} className={`status-btn ${userData.status === s ? "status-btn-on" : "status-btn-off"}`} onClick={() => handleChange("status", s)}>
                            {userData.status === s && <span style={{ marginRight: 6, color: T.blue600 }}>✓</span>}
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* STREAM */}
            <div className="fadeup fadeup-2" style={{ marginBottom: 26 }}>
                <div className="sec-label">Your stream / field</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {STREAM_OPTIONS.map(s => (
                        <button key={s} className={`chip ${userData.stream === s ? "chip-on" : "chip-off"}`} onClick={() => handleChange("stream", s)}>{s}</button>
                    ))}
                </div>
            </div>

            {/* DEGREE — conditional */}
            {userData.status === "Dropped out from college" && userData.stream && (
                <div className="fadeup" style={{ marginBottom: 26 }}>
                    <div className="sec-label">Which degree were you pursuing?</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {degreeOptions.map(d => (
                            <button key={d} className={`status-btn ${userData.degree === d ? "status-btn-on" : "status-btn-off"}`} onClick={() => handleChange("degree", d)}>
                                {userData.degree === d && <span style={{ marginRight: 6, color: T.blue600 }}>✓</span>}
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* AGE */}
            <div className="fadeup fadeup-3" style={{ marginBottom: 32 }}>
                <div className="sec-label">Your age</div>
                <input
                    type="number"
                    value={userData.age}
                    onChange={e => handleChange("age", e.target.value)}
                    placeholder="e.g. 19"
                    style={{ width: 180, background: T.gray50, border: `1.5px solid ${T.gray200}`, borderRadius: 12, padding: "11px 16px", fontSize: 16, fontWeight: 700, color: T.gray900, outline: "none", fontFamily: "inherit", transition: "border-color .2s" }}
                    onFocus={e => e.target.style.borderColor = T.blue500}
                    onBlur={e => e.target.style.borderColor = T.gray200}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-primary" onClick={onNext} disabled={!canProceed}>
                    Continue <span style={{ fontSize: 17 }}>→</span>
                </button>
            </div>
        </Layout>
    );
}

/* ============================================================
   PAGE 3 — PATH CHOICE
   ============================================================ */
function PathChoicePage({ userData, setUserData, onEdu, onJob }) {
    const [selected, setSelected] = useState(userData.focus || "");

    const choose = (focus) => {
        setSelected(focus);
        setUserData(prev => ({ ...prev, focus }));

        // ✅ LOG ACTIVITY (Submission event)
        const durationInSeconds = Math.max(1, Math.floor((Date.now() - startTime.current) / 1000));

        logStudentActivity(
            "DROPOUT",
            "Generated Dropout Pathway",
            `Student submitted dropout form and selected focus: ${focus}`,
            { focus, userData },
            durationInSeconds,
            null,
            "Completed"
        );

        setTimeout(() => focus === "education" ? onEdu() : onJob(), 320);
    };

    const paths = [
        { id: "education", icon: "🎓", title: "Continue or restart education", desc: "Get matched to exams, courses, and degree pathways tailored to exactly where you left off.", tags: ["Open School", "Distance Learning", "Entrance Exams", "Degrees"], color: T.blue600, bg: T.blue50, border: T.blue400 },
        { id: "job", icon: "💼", title: "Start working and earning", desc: "Discover job roles, quick skill certifications, and real earning paths that don't need a degree.", tags: ["Entry-Level Jobs", "Skill Courses", "Freelancing", "Certifications"], color: T.green600, bg: T.green50, border: "#86EFAC" },
    ];

    return (
        <Layout screen="path">
            <div className="fadeup" style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: T.gray900, marginBottom: 6 }}>What's your priority right now?</h2>
                <p style={{ fontSize: 14, color: T.gray500, lineHeight: 1.6 }}>You can always explore both later. Choose what matters most today.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {paths.map(p => {
                    const active = selected === p.id;
                    return (
                        <button key={p.id} onClick={() => choose(p.id)} style={{
                            background: active ? p.bg : "#fff",
                            border: `2px solid ${active ? p.border : T.gray200}`,
                            borderRadius: 20, padding: "24px 22px", textAlign: "left",
                            cursor: "pointer", fontFamily: "inherit", transition: "all .22s",
                            boxShadow: active ? `0 8px 28px ${p.color}25` : shadowMd,
                            transform: active ? "translateY(-2px)" : "none",
                            position: "relative",
                        }}
                            onMouseEnter={e => !active && (e.currentTarget.style.borderColor = p.border)}
                            onMouseLeave={e => !active && (e.currentTarget.style.borderColor = T.gray200)}
                        >
                            {active && (
                                <div style={{ position: "absolute", top: 14, right: 14, width: 22, height: 22, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff" }}>✓</div>
                            )}
                            <div style={{ fontSize: 30, marginBottom: 16, width: 52, height: 52, background: active ? p.bg : T.gray50, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${active ? p.border : T.gray200}` }}>{p.icon}</div>
                            <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em", color: T.gray900, marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
                            <p style={{ fontSize: 13, color: T.gray500, lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {p.tags.map(t => (
                                    <span key={t} style={{ fontSize: 11, fontWeight: 600, background: active ? "#fff" : T.gray50, border: `1px solid ${active ? p.border : T.gray200}`, borderRadius: 99, padding: "3px 10px", color: active ? p.color : T.gray500 }}>{t}</span>
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: T.gray400, marginTop: 20 }}>Click a card to proceed to the next step</p>
        </Layout>
    );
}

/* ============================================================
   PAGE 4a — EDUCATION RESULTS
   ============================================================ */
function EduResultsPage({ userData, setUserData, onViewDetail, onBack }) {
    const [interests, setInterests] = useState(userData.interests || []);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const toggle = (label) => {
        const next = interests.includes(label) ? interests.filter(i => i !== label) : [...interests, label];
        setInterests(next);
        setUserData(prev => ({ ...prev, interests: next }));
    };

    const search = () => {
        setResults(matchPaths(userData, EDU_PATHS, interests));
        setSearched(true);
        setTimeout(() => document.getElementById("edu-results")?.scrollIntoView({ behavior: "smooth" }), 120);
    };

    return (
        <Layout screen="results">
            <div className="fadeup" style={{ marginBottom: 24 }}>
                <button onClick={onBack} style={{ background: "none", border: "none", color: T.gray400, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, marginBottom: 20, padding: 0, fontFamily: "inherit" }}>← Back</button>
                <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: T.gray900, marginBottom: 6 }}>What excites you most?</h2>
                <p style={{ fontSize: 14, color: T.gray500, lineHeight: 1.6 }}>Pick your interests — we'll match education paths to them.</p>
            </div>

            {/* Interest grid */}
            <div className="fadeup fadeup-1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(105px,1fr))", gap: 10, marginBottom: 20 }}>
                {EDU_INTERESTS.map(({ label, emoji }) => (
                    <button key={label} className={`interest-pill ${interests.includes(label) ? "interest-pill-on" : "interest-pill-off"}`} onClick={() => toggle(label)}>
                        <span style={{ fontSize: 22, width: 42, height: 42, background: interests.includes(label) ? T.blue100 : T.gray50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{emoji}</span>
                        {label}
                    </button>
                ))}
            </div>

            {interests.length > 0 && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.blue50, border: `1px solid ${T.blue200}`, borderRadius: 99, padding: "5px 14px", marginBottom: 16, fontSize: 12, color: T.blue700, fontWeight: 700 }}>
                    ✓ {interests.length} interest{interests.length > 1 ? "s" : ""} selected
                </div>
            )}

            <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                <button className="btn-primary" onClick={search} disabled={interests.length === 0} style={{ flex: 1, justifyContent: "center" }}>
                    Get Education Suggestions →
                </button>
                {interests.length > 0 && (
                    <button className="btn-ghost" onClick={() => { setInterests([]); setResults([]); setSearched(false); setUserData(p => ({ ...p, interests: [] })); }}>Clear</button>
                )}
            </div>

            {/* Results */}
            {searched && (
                <div id="edu-results" className="fadeup">
                    <div className="sec-label" style={{ marginBottom: 14 }}>{results.length} paths matched for you</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {results.map(path => (
                            <div key={path.id} className="result-card">
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14.5, fontWeight: 700, color: T.gray900, marginBottom: 3 }}>{path.name}</div>
                                    <div style={{ fontSize: 12.5, color: T.gray400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{path.description.slice(0, 80)}…</div>
                                </div>
                                <button className="btn-outline" style={{ padding: "8px 16px", fontSize: 12.5, flexShrink: 0 }} onClick={() => onViewDetail(path)}>
                                    View Path →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}

/* ============================================================
   PAGE 4b — JOB RESULTS
   ============================================================ */
function JobResultsPage({ userData, setUserData, onViewDetail, onBack }) {
    const [interests, setInterests] = useState(userData.interests || []);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const toggle = (label) => {
        const next = interests.includes(label) ? interests.filter(i => i !== label) : [...interests, label];
        setInterests(next);
        setUserData(prev => ({ ...prev, interests: next }));
    };

    const search = () => {
        setResults(matchPaths(userData, JOB_PATHS, interests));
        setSearched(true);
    };

    return (
        <Layout screen="results">
            <div className="fadeup" style={{ marginBottom: 24 }}>
                <button onClick={onBack} style={{ background: "none", border: "none", color: T.gray400, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, marginBottom: 20, padding: 0, fontFamily: "inherit" }}>← Back</button>
                <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: T.gray900, marginBottom: 6 }}>How do you like to work?</h2>
                <p style={{ fontSize: 14, color: T.gray500, lineHeight: 1.6 }}>Pick work styles and skills you're comfortable with.</p>
            </div>

            <div className="fadeup fadeup-1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(115px,1fr))", gap: 10, marginBottom: 20 }}>
                {JOB_INTERESTS.map(({ label, emoji }) => (
                    <button key={label} className={`interest-pill ${interests.includes(label) ? "interest-pill-on" : "interest-pill-off"}`} onClick={() => toggle(label)}>
                        <span style={{ fontSize: 22, width: 42, height: 42, background: interests.includes(label) ? T.blue100 : T.gray50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{emoji}</span>
                        {label}
                    </button>
                ))}
            </div>

            {interests.length > 0 && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.green50, border: "1px solid #86EFAC", borderRadius: 99, padding: "5px 14px", marginBottom: 16, fontSize: 12, color: T.green600, fontWeight: 700 }}>
                    ✓ {interests.length} skill{interests.length > 1 ? "s" : ""} selected
                </div>
            )}

            <button className="btn-primary" onClick={search} disabled={interests.length === 0} style={{ width: "100%", justifyContent: "center", marginBottom: 32, background: interests.length > 0 ? "linear-gradient(135deg,#16A34A,#22C55E)" : undefined, boxShadow: interests.length > 0 ? "0 8px 28px rgba(34,197,94,.35)" : undefined }}>
                Get Job Suggestions →
            </button>

            {searched && (
                <div className="fadeup">
                    <div className="sec-label" style={{ marginBottom: 14 }}>{results.length} opportunities matched</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {results.map(path => (
                            <div key={path.id} className="result-card">
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14.5, fontWeight: 700, color: T.gray900, marginBottom: 3 }}>{path.name}</div>
                                    <div style={{ fontSize: 12.5, color: T.gray400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{path.description.slice(0, 80)}…</div>
                                </div>
                                <button className="btn-outline" style={{ padding: "8px 16px", fontSize: 12.5, flexShrink: 0, borderColor: "#86EFAC", color: T.green600 }} onClick={() => onViewDetail(path)}>
                                    View Path →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}

/* ============================================================
   PAGE 4c — PATH DETAIL
   ============================================================ */
function PathDetailPage({ path, onAddToPlan, onBack }) {
    if (!path) return null;
    const isEdu = !!path.educationRoute;
    const steps = isEdu ? (path.educationRoute || []) : (path.learningPath || []);
    const accent = isEdu ? T.blue600 : T.green600;
    const accentBg = isEdu ? T.blue50 : T.green50;
    const accentBorder = isEdu ? T.blue200 : "#86EFAC";

    return (
        <Layout screen="detail">
            <button onClick={onBack} style={{ background: "none", border: "none", color: T.gray400, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, marginBottom: 20, padding: 0, fontFamily: "inherit" }}>← Back to results</button>

            {/* Type badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 99, padding: "5px 14px", marginBottom: 16, fontSize: 11.5, fontWeight: 700, color: accent, letterSpacing: ".06em", textTransform: "uppercase" }}>
                {isEdu ? "🎓 Education Path" : "💼 Job Path"}
            </div>

            <h2 className="fadeup" style={{ fontSize: "clamp(20px,3vw,26px)", fontFamily: "'Lora',serif", fontWeight: 700, color: T.blue900, letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 12 }}>{path.name}</h2>
            <p className="fadeup fadeup-1" style={{ fontSize: 14.5, color: T.gray500, lineHeight: 1.8, marginBottom: 28 }}>{path.description}</p>

            {/* Roadmap */}
            <div className="fadeup fadeup-2" style={{ marginBottom: 32 }}>
                <div className="sec-label" style={{ marginBottom: 14 }}>Step-by-step roadmap</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 24 }}>
                                <div className="roadmap-dot" style={{ background: isEdu ? "linear-gradient(135deg,#2563EB,#1A4FCC)" : "linear-gradient(135deg,#16A34A,#22C55E)" }}>{i + 1}</div>
                                {i < steps.length - 1 && <div className="roadmap-line" style={{ background: isEdu ? T.blue100 : "#BBF7D0" }} />}
                            </div>
                            <div style={{ background: T.gray50, border: `1px solid ${T.gray100}`, borderRadius: 14, padding: "11px 16px", fontSize: 13.5, color: T.gray700, lineHeight: 1.6, flex: 1, marginBottom: 8 }}>{step}</div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="btn-primary"
                onClick={() => onAddToPlan(path)}
                style={{ width: "100%", justifyContent: "center", background: isEdu ? "linear-gradient(135deg,#2563EB,#1A4FCC)" : "linear-gradient(135deg,#16A34A,#22C55E)", boxShadow: isEdu ? shadowBlue : "0 8px 28px rgba(34,197,94,.35)" }}
            >
                ＋ Add to My Action Plan
            </button>
        </Layout>
    );
}

/* ============================================================
   PAGE 5 — ACTION PLAN
   ============================================================ */
function ActionPlanPage({ userData, selectedPaths, onStartOver }) {
    const unique = selectedPaths.filter((p, i, a) => i === a.findIndex(x => x.id === p.id && x.type === p.type));

    const copyPlan = () => {
        const text = `CAREER ACTION PLAN\n==================\nStatus: ${userData.status}, ${userData.stream}, age ${userData.age}\nFocus: ${userData.focus === "education" ? "Continue / restart education" : "Start working / earning"}\n\n${unique.map(p => {
            const steps = p.type === "education" ? p.educationRoute || [] : p.learningPath || [];
            return `${p.name} (${p.type})\n${steps.slice(0, 3).map(s => `• ${s}`).join("\n")}`;
        }).join("\n\n")}`.trim();
        navigator.clipboard.writeText(text);

        // ✅ LOG ACTIVITY
        logStudentActivity(
            "DROPOUT",
            "Copied Action Plan",
            "Student copied their personalized dropout action plan"
        );

        alert("✓ Plan copied to clipboard!");
    };

    useEffect(() => {
        logStudentActivity(
            "DROPOUT",
            "Viewed Action Plan",
            `Student viewed dropout action plan for ${userData.focus}`
        );
    }, []);

    return (
        <Layout screen="plan">
            <div className="fadeup">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.blue50, border: `1px solid ${T.blue200}`, borderRadius: 99, padding: "5px 14px", marginBottom: 16, fontSize: 11.5, color: T.blue700, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>
                    ✓ Plan ready
                </div>
                <h2 style={{ fontFamily: "'Lora',serif", fontSize: 26, fontWeight: 700, color: T.blue900, letterSpacing: "-0.02em", marginBottom: 6 }}>Your Personalised Action Plan</h2>
                <p style={{ fontSize: 14, color: T.gray500, marginBottom: 24, lineHeight: 1.6 }}>Here's everything tailored specifically to you.</p>
            </div>

            {/* Profile summary */}
            <div className="fadeup fadeup-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <div style={{ background: T.blue50, border: `1px solid ${T.blue200}`, borderRadius: 14, padding: "14px 18px" }}>
                    <div className="sec-label" style={{ marginBottom: 5 }}>Your Profile</div>
                    <div style={{ fontSize: 13.5, color: T.gray700, lineHeight: 1.65, fontWeight: 500 }}>{userData.status}<br />{userData.stream} · Age {userData.age}</div>
                </div>
                <div style={{ background: "#F0F9FF", border: "1px solid #BAE6FD", borderRadius: 14, padding: "14px 18px" }}>
                    <div className="sec-label" style={{ marginBottom: 5 }}>Focus</div>
                    <div style={{ fontSize: 13.5, color: T.gray700, lineHeight: 1.65, fontWeight: 600 }}>{userData.focus === "education" ? "🎓 Education path" : "💼 Job path"}</div>
                </div>
            </div>

            {/* Path cards */}
            <div className="fadeup fadeup-2" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {unique.map(path => {
                    const isEdu = path.type === "education";
                    const steps = isEdu ? path.educationRoute || [] : path.learningPath || [];
                    const accent = isEdu ? T.blue600 : T.green600;
                    const bg = isEdu ? T.blue50 : T.green50;
                    const border = isEdu ? T.blue200 : "#86EFAC";
                    return (
                        <div key={path.id + path.type} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 18, padding: "20px 22px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                <span style={{ fontSize: 22, width: 44, height: 44, background: "#fff", borderRadius: 12, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{isEdu ? "🎓" : "💼"}</span>
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: 800, color: T.gray900, letterSpacing: "-0.01em" }}>{path.name}</div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: ".06em" }}>{path.type}</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {steps.slice(0, 3).map((step, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                        <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", border: `1.5px solid ${border}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: accent, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                                        <span style={{ fontSize: 13, color: T.gray600, lineHeight: 1.6 }}>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="fadeup fadeup-3" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="btn-primary" onClick={copyPlan} style={{ justifyContent: "center", background: "linear-gradient(135deg,#16A34A,#22C55E)", boxShadow: "0 8px 28px rgba(34,197,94,.35)" }}>
                    📋 Copy Plan to Clipboard
                </button>
                <button className="btn-ghost" onClick={onStartOver} style={{ textAlign: "center" }}>
                    ↩ Start Over
                </button>
            </div>
        </Layout>
    );
}

/* ============================================================
   ROOT APP — state machine
   ============================================================ */
const STORAGE_KEY = "career_userData";
const PATHS_KEY = "career_selectedPaths";

export default function DropoutFlow() {
    const [screen, setScreen] = useState("home");
    const [userData, setUserData] = useState(() => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { status: "", stream: "", age: "", degree: "", focus: "", interests: [] }; }
        catch { return { status: "", stream: "", age: "", degree: "", focus: "", interests: [] }; }
    });
    const [selectedPaths, setSelectedPaths] = useState(() => {
        try { return JSON.parse(localStorage.getItem(PATHS_KEY)) || []; }
        catch { return []; }
    });
    const [currentPath, setCurrentPath] = useState(null);
    const [prevScreen, setPrevScreen] = useState("results");
    const startTime = useRef(Date.now());

    // Sync to localStorage
    useEffect(() => {
        if (screen === "home" || screen === "info") {
            startTime.current = Date.now();
        }
    }, [screen]);
    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(userData)); }
        catch { }
    }, [userData]);
    useEffect(() => {
        try { localStorage.setItem(PATHS_KEY, JSON.stringify(selectedPaths)); }
        catch { }
    }, [selectedPaths]);

    const go = (s) => { setPrevScreen(screen); setScreen(s); window.scrollTo({ top: 0, behavior: "smooth" }); };

    const handleAddToPlan = (path) => {
        const isEdu = !!path.educationRoute;
        const withType = { ...path, type: isEdu ? "education" : "job" };
        setSelectedPaths(prev => {
            const dup = prev.some(p => p.id === path.id && p.type === withType.type);
            return dup ? prev : [...prev, withType];
        });
        go("plan");
    };

    const handleViewDetail = (path) => {
        setCurrentPath(path);
        go("detail");
    };

    const handleStartOver = () => {
        setUserData({ status: "", stream: "", age: "", degree: "", focus: "", interests: [] });
        setSelectedPaths([]);
        setCurrentPath(null);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(PATHS_KEY);
        go("home");
    };

    // Screen router
    if (screen === "home") return <HomePage onNext={() => go("info")} />;
    if (screen === "info") return <InfoPage userData={userData} setUserData={setUserData} onNext={() => go("path")} />;
    if (screen === "path") return <PathChoicePage userData={userData} setUserData={setUserData} onEdu={() => go("edu")} onJob={() => go("job")} />;
    if (screen === "edu") return <EduResultsPage userData={userData} setUserData={setUserData} onViewDetail={handleViewDetail} onBack={() => go("path")} />;
    if (screen === "job") return <JobResultsPage userData={userData} setUserData={setUserData} onViewDetail={handleViewDetail} onBack={() => go("path")} />;
    if (screen === "detail") return <PathDetailPage path={currentPath} onAddToPlan={handleAddToPlan} onBack={() => go(prevScreen === "detail" ? (userData.focus === "education" ? "edu" : "job") : prevScreen)} />;
    if (screen === "plan") return <ActionPlanPage userData={userData} selectedPaths={selectedPaths} onStartOver={handleStartOver} />;
    return null;
}