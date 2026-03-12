import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalculator, FaPalette, FaHandsHelping, FaCode, FaPenFancy, FaTree,
  FaUserCog, FaMicroscope, FaLaptop, FaHeartbeat, FaChartLine, FaComments,
  FaSearch, FaPuzzlePiece, FaChalkboardTeacher, FaLightbulb, FaChartBar, FaPaintBrush,
} from "react-icons/fa";
import PageLoader from "../../../components/PageLoader/PageLoader";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { logStudentActivity } from "../../../utils/logActivity";

/* ── Inject styles once ── */
const injectStyles = () => {
  if (document.getElementById("interest-styles")) return;
  const s = document.createElement("style");
  s.id = "interest-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    .if-root { font-family: 'DM Sans', sans-serif; }
    .if-root h1, .if-root h2, .if-root h3, .if-root h4 { font-family: 'Syne', sans-serif; }

    @keyframes if-fadeUp {
      from { opacity:0; transform:translateY(22px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes if-floatOrb {
      0%,100% { transform:translateY(0) scale(1); }
      50%      { transform:translateY(-26px) scale(1.04); }
    }
    @keyframes if-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes if-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes if-cardIn {
      from { opacity:0; transform:translateY(28px) scale(.97); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    @keyframes if-pulse {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(1.06); }
    }
    @keyframes if-bounce {
      0%,100% { transform:translateY(0); }
      50%      { transform:translateY(-4px); }
    }

    .if-orb1 { animation: if-floatOrb 7s ease-in-out infinite; }
    .if-orb2 { animation: if-floatOrb 9s ease-in-out 1.5s infinite; }
    .if-orb3 { animation: if-floatOrb 11s ease-in-out 3s infinite; }

    .if-hero   { animation: if-fadeUp .6s ease both; }
    .if-sub    { animation: if-fadeUp .6s ease .12s both; }
    .if-grid   { animation: if-fadeUp .6s ease .2s both; }
    .if-btns   { animation: if-fadeUp .6s ease .28s both; }

    .if-interest-item {
      cursor: pointer;
      transition: all .25s cubic-bezier(.34,1.56,.64,1);
    }
    .if-interest-item:hover {
      transform: translateY(-4px) scale(1.04);
    }
    .if-interest-item.sel {
      transform: translateY(-4px) scale(1.04);
    }

    .if-shimmer-btn {
      background: linear-gradient(90deg, #007BFF 0%, #00b4ff 45%, #007BFF 90%);
      background-size: 200% auto;
      transition: background-position .4s ease, box-shadow .25s ease, transform .2s ease;
    }
    .if-shimmer-btn:hover:not(:disabled) {
      background-position: right center;
      box-shadow: 0 8px 28px rgba(0,123,255,.45);
      transform: translateY(-2px);
    }
    .if-shimmer-btn:disabled { opacity:.6; cursor:not-allowed; }

    .if-clear-btn {
      transition: all .2s ease;
    }
    .if-clear-btn:hover {
      background: #F1F5F9;
      transform: translateY(-1px);
    }

    .if-chip { transition: all .2s ease; cursor:pointer; }
    .if-chip:hover { transform: translateY(-2px); }

    .if-career-card {
      animation: if-cardIn .45s ease both;
      transition: transform .3s ease, box-shadow .3s ease;
    }
    .if-career-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 60px rgba(0,123,255,.12), 0 4px 16px rgba(0,0,0,.06);
    }

    .if-career-card:nth-child(1) { animation-delay:.05s }
    .if-career-card:nth-child(2) { animation-delay:.10s }
    .if-career-card:nth-child(3) { animation-delay:.15s }
    .if-career-card:nth-child(4) { animation-delay:.20s }
    .if-career-card:nth-child(5) { animation-delay:.25s }
    .if-career-card:nth-child(6) { animation-delay:.30s }

    .if-roadmap-btn {
      background: linear-gradient(135deg, #1E3A8A, #007BFF);
      transition: all .25s ease;
    }
    .if-roadmap-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(30,58,138,.35);
    }

    .if-selected-counter {
      animation: if-pulse .4s ease;
    }
  `;
  document.head.appendChild(s);
};

const interestsList = [
  { label: "Mathematics", icon: <FaCalculator /> },
  { label: "Designing", icon: <FaPalette /> },
  { label: "Helping People", icon: <FaHandsHelping /> },
  { label: "Coding", icon: <FaCode /> },
  { label: "Writing", icon: <FaPenFancy /> },
  { label: "Nature", icon: <FaTree /> },
  { label: "Management", icon: <FaUserCog /> },
  { label: "Science", icon: <FaMicroscope /> },
  { label: "Art", icon: <FaPaintBrush /> },
  { label: "Technology", icon: <FaLaptop /> },
  { label: "Health", icon: <FaHeartbeat /> },
  { label: "Business", icon: <FaChartLine /> },
  { label: "Communication", icon: <FaComments /> },
  { label: "Research", icon: <FaSearch /> },
  { label: "Analysis", icon: <FaChartBar /> },
  { label: "Problem Solving", icon: <FaPuzzlePiece /> },
  { label: "Teaching", icon: <FaChalkboardTeacher /> },
  { label: "Creativity", icon: <FaLightbulb /> },
];

/* colour per interest for personality */
const INTEREST_COLORS = {
  Mathematics: { bg: "rgba(99,102,241,.1)", border: "rgba(99,102,241,.3)", icon: "#6366F1" },
  Designing: { bg: "rgba(236,72,153,.1)", border: "rgba(236,72,153,.3)", icon: "#EC4899" },
  "Helping People": { bg: "rgba(16,185,129,.1)", border: "rgba(16,185,129,.3)", icon: "#10B981" },
  Coding: { bg: "rgba(0,123,255,.1)", border: "rgba(0,123,255,.3)", icon: "#007BFF" },
  Writing: { bg: "rgba(245,158,11,.1)", border: "rgba(245,158,11,.3)", icon: "#F59E0B" },
  Nature: { bg: "rgba(34,197,94,.1)", border: "rgba(34,197,94,.3)", icon: "#22C55E" },
  Management: { bg: "rgba(168,85,247,.1)", border: "rgba(168,85,247,.3)", icon: "#A855F7" },
  Science: { bg: "rgba(14,165,233,.1)", border: "rgba(14,165,233,.3)", icon: "#0EA5E9" },
  Art: { bg: "rgba(244,63,94,.1)", border: "rgba(244,63,94,.3)", icon: "#F43F5E" },
  Technology: { bg: "rgba(0,123,255,.1)", border: "rgba(0,123,255,.3)", icon: "#007BFF" },
  Health: { bg: "rgba(239,68,68,.1)", border: "rgba(239,68,68,.3)", icon: "#EF4444" },
  Business: { bg: "rgba(16,185,129,.1)", border: "rgba(16,185,129,.3)", icon: "#10B981" },
  Communication: { bg: "rgba(251,191,36,.1)", border: "rgba(251,191,36,.3)", icon: "#FBBF24" },
  Research: { bg: "rgba(99,102,241,.1)", border: "rgba(99,102,241,.3)", icon: "#6366F1" },
  Analysis: { bg: "rgba(59,130,246,.1)", border: "rgba(59,130,246,.3)", icon: "#3B82F6" },
  "Problem Solving": { bg: "rgba(249,115,22,.1)", border: "rgba(249,115,22,.3)", icon: "#F97316" },
  Teaching: { bg: "rgba(16,185,129,.1)", border: "rgba(16,185,129,.3)", icon: "#10B981" },
  Creativity: { bg: "rgba(234,179,8,.1)", border: "rgba(234,179,8,.3)", icon: "#EAB308" },
};

const defaultColor = { bg: "rgba(0,123,255,.08)", border: "rgba(0,123,255,.2)", icon: "#007BFF" };

export default function InterestForm() {
  injectStyles();

  const [selected, setSelected] = useState([]);
  const [careers, setCareers] = useState([]);
  const [showCareers, setShowCareers] = useState(false);
  const [loading, setLoading] = useState(false);
  const startTime = React.useRef(Date.now());
  const [pageLoading, setPageLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [, setUser] = useState(null);
  const { user } = useAuth();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    if (user?.email) {
      fetch(`${API}/api/user/${user.email}`)
        .then(r => r.json())
        .then(data => { setUser(data); localStorage.setItem("user", JSON.stringify(data)); })
        .catch(() => setUser(user));
    }
    const t = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(t);
  }, [API, user]);

  const toggleSelect = (label) =>
    setSelected(p => p.includes(label) ? p.filter(l => l !== label) : [...p, label]);

  const handleSuggest = async () => {
    if (selected.length === 0) { alert("Please select at least one interest."); return; }
    setLoading(true); setShowCareers(false); setErrorMsg(""); setCareers([]);
    try {
      const res = await axios.post(`${API}/api/careers/recommend`, { interests: selected });
      if (Array.isArray(res.data.careers)) {
        setTimeout(() => { setCareers(res.data.careers); setShowCareers(true); setLoading(false); }, 1000);

        // ✅ LOG ACTIVITY
        const durationInSeconds = Math.max(1, Math.floor((Date.now() - startTime.current) / 1000));

        logStudentActivity(
          "INTEREST_FORM",
          "Submitted Interest Form",
          `Student selected ${selected.length} interests: ${selected.join(", ")}`,
          { interests: selected },
          durationInSeconds,
          null,
          "Completed"
        );
      } else {
        setErrorMsg("⚠️ Received unexpected response. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      if (err.response?.status === 402) {
        setErrorMsg("⚠️ You've hit your free quota limit. Try again later or reduce selections.");
      } else {
        setErrorMsg("😔 Sorry! We couldn't fetch recommendations right now. Please try again soon.");
      }
      setLoading(false);
    }
  };

  const filteredCareers = careers.filter(c => activeCategory === "All" || c.category === activeCategory);
  const categories = ["All", ...new Set(careers.map(c => c.category))];

  if (pageLoading) return <PageLoader />;

  return (
    <div className="if-root" style={{
      minHeight: "100vh",
      background: "linear-gradient(155deg, #f0f5ff 0%, #fafcff 50%, #e8f0fe 100%)",
      position: "relative", overflow: "hidden",
    }}>

      {/* ── Orbs ── */}
      {[
        { cls: "if-orb1", top: "6%", left: "4%", size: 320, color: "rgba(0,123,255,.09)" },
        { cls: "if-orb2", top: "35%", right: "3%", size: 260, color: "rgba(0,212,255,.08)" },
        { cls: "if-orb3", bottom: "8%", left: "28%", size: 180, color: "rgba(30,58,138,.07)" },
      ].map((o, i) => (
        <div key={i} className={o.cls} style={{
          position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
          background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          top: o.top, left: o.left, right: o.right, bottom: o.bottom,
          pointerEvents: "none",
        }} />
      ))}

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(0,123,255,.06) 1.5px, transparent 1.5px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "72px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── HERO ── */}
        <div className="if-hero" style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 16px", borderRadius: 100,
              background: "linear-gradient(90deg,rgba(0,123,255,.12),rgba(0,212,255,.12))",
              border: "1px solid rgba(0,123,255,.2)",
              fontSize: 11, fontWeight: 600, letterSpacing: "0.09em",
              color: "#007BFF", textTransform: "uppercase",
            }}>
              ✦ Career Discovery
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800,
            color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 14,
          }}>
            What Are You{" "}
            <span style={{
              background: "linear-gradient(135deg, #007BFF 0%, #00b4ff 50%, #1E3A8A 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Passionate About?
            </span>
          </h1>
          <p className="if-sub" style={{
            maxWidth: 500, margin: "0 auto", color: "#64748B",
            fontSize: "1rem", lineHeight: 1.7, fontWeight: 400,
          }}>
            Select your interests below and we'll recommend the perfect career paths tailored just for you.
          </p>
        </div>

        {/* ── INTEREST GRID ── */}
        <div className="if-grid">

          {/* Selection counter */}
          {selected.length > 0 && (
            <div className="if-selected-counter" style={{
              textAlign: "center", marginBottom: 20,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 20px", borderRadius: 100,
                background: "linear-gradient(135deg, rgba(0,123,255,.1), rgba(0,212,255,.1))",
                border: "1px solid rgba(0,123,255,.2)",
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "linear-gradient(135deg, #007BFF, #00b4ff)",
                  color: "#fff", fontSize: 11, fontWeight: 800,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  {selected.length}
                </span>
                <span style={{ color: "#1E3A8A", fontWeight: 600, fontSize: 13 }}>
                  interest{selected.length > 1 ? "s" : ""} selected
                </span>
              </div>
            </div>
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 14,
          }}>
            {interestsList.map((item, idx) => {
              const isSel = selected.includes(item.label);
              const col = INTEREST_COLORS[item.label] || defaultColor;
              return (
                <div
                  key={idx}
                  className={`if-interest-item${isSel ? " sel" : ""}`}
                  onClick={() => toggleSelect(item.label)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: 10, padding: "20px 12px",
                    borderRadius: 20, cursor: "pointer",
                    background: isSel
                      ? col.bg
                      : "rgba(255,255,255,.85)",
                    border: isSel
                      ? `2px solid ${col.border}`
                      : "1.5px solid rgba(0,0,0,.06)",
                    boxShadow: isSel
                      ? `0 4px 20px ${col.bg.replace(".1", "0.2")}`
                      : "0 2px 12px rgba(0,0,0,.04)",
                    backdropFilter: "blur(10px)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* Selection checkmark */}
                  {isSel && (
                    <div style={{
                      position: "absolute", top: 8, right: 8,
                      width: 18, height: 18, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${col.icon}, ${col.icon}CC)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>✓</span>
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{
                    fontSize: 26, color: isSel ? col.icon : "#94A3B8",
                    transition: "color .2s ease",
                    filter: isSel ? `drop-shadow(0 2px 6px ${col.icon}55)` : "none",
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: isSel ? 700 : 500,
                    color: isSel ? "#0F172A" : "#64748B",
                    textAlign: "center", lineHeight: 1.3,
                    transition: "color .2s ease",
                  }}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BUTTONS ── */}
        <div className="if-btns" style={{
          display: "flex", flexWrap: "wrap", gap: 14,
          justifyContent: "center", marginTop: 36,
        }}>
          <button
            className="if-shimmer-btn"
            onClick={handleSuggest}
            disabled={loading}
            style={{
              padding: "14px 38px", borderRadius: 16, border: "none",
              color: "#fff", fontSize: 15, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.02em",
              display: "flex", alignItems: "center", gap: 10,
              minWidth: 220,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)",
                  borderTop: "2px solid #fff", borderRadius: "50%",
                  display: "inline-block", animation: "if-spin .7s linear infinite",
                }} />
                Generating…
              </>
            ) : (
              <> ✦ Get Career Suggestions</>
            )}
          </button>

          <button
            className="if-clear-btn"
            onClick={() => {
              setSelected([]); setShowCareers(false);
              setCareers([]); setActiveCategory("All"); setErrorMsg("");
            }}
            style={{
              padding: "14px 30px", borderRadius: 16,
              border: "1.5px solid rgba(0,0,0,.09)",
              background: "rgba(255,255,255,.85)", backdropFilter: "blur(10px)",
              color: "#64748B", fontSize: 15, fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Clear Selection
          </button>
        </div>

        {/* ── ERROR ── */}
        {errorMsg && (
          <div style={{
            marginTop: 24, maxWidth: 560, margin: "24px auto 0",
            background: "rgba(254,226,226,.9)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(239,68,68,.25)", borderRadius: 16,
            padding: "16px 24px", color: "#991B1B", fontSize: 14,
            fontWeight: 500, textAlign: "center",
            animation: "if-fadeUp .4s ease both",
          }}>
            {errorMsg}
          </div>
        )}

        {/* ── CAREER RESULTS ── */}
        {showCareers && (
          <div style={{ marginTop: 64, animation: "if-fadeUp .5s ease both" }}>

            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2 style={{
                fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800,
                color: "#0F172A", letterSpacing: "-0.02em", marginBottom: 8,
              }}>
                Your Recommended{" "}
                <span style={{
                  background: "linear-gradient(135deg,#007BFF,#00b4ff,#1E3A8A)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Career Paths
                </span>
              </h2>
              <p style={{ color: "#94A3B8", fontSize: 14 }}>
                Based on <strong style={{ color: "#1E3A8A" }}>{selected.length}</strong> selected interest{selected.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Category chips */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 10,
              justifyContent: "center", marginBottom: 36,
            }}>
              {categories.map((cat, i) => {
                const isAct = activeCategory === cat;
                return (
                  <span
                    key={i}
                    className="if-chip"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "8px 20px", borderRadius: 100,
                      fontSize: 13, fontWeight: 700,
                      cursor: "pointer",
                      background: isAct
                        ? "linear-gradient(135deg,#007BFF,#0056B3)"
                        : "rgba(255,255,255,.85)",
                      color: isAct ? "#fff" : "#64748B",
                      border: isAct
                        ? "none"
                        : "1.5px solid rgba(0,0,0,.08)",
                      boxShadow: isAct
                        ? "0 4px 14px rgba(0,123,255,.35)"
                        : "0 2px 8px rgba(0,0,0,.04)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {cat}
                  </span>
                );
              })}
            </div>

            {/* Cards */}
            <div style={{
              display: "grid", gap: 24,
              gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
            }}>
              {filteredCareers.map((career, index) => (
                <CareerCard key={index} career={career} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Career Card ─── */
function CareerCard({ career }) {
  return (
    <div className="if-career-card" style={{
      background: "rgba(255,255,255,.92)",
      backdropFilter: "blur(20px)",
      borderRadius: 24,
      border: "1.5px solid rgba(0,123,255,.09)",
      boxShadow: "0 4px 24px rgba(0,0,0,.05)",
      padding: "28px",
      display: "flex", flexDirection: "column", gap: 20,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <h4 style={{
            fontFamily: "'Syne',sans-serif", fontSize: "1.2rem",
            fontWeight: 800, color: "#0F172A", marginBottom: 4,
          }}>
            {career.title}
          </h4>
          <p style={{ color: "#64748B", fontSize: 13.5, lineHeight: 1.65 }}>
            {career.description}
          </p>
        </div>
        <span style={{
          padding: "5px 14px", borderRadius: 100, whiteSpace: "nowrap", flexShrink: 0,
          background: "linear-gradient(135deg,rgba(99,102,241,.1),rgba(139,92,246,.1))",
          border: "1px solid rgba(99,102,241,.2)",
          color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
        }}>
          {career.category}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,123,255,.15), transparent)",
      }} />

      {/* Info grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Skills */}
        <Section label="Required Skills" accent="#6366F1">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {career.skills?.map(skill => (
              <Tag key={skill} bg="rgba(99,102,241,.08)" color="#6366F1" border="rgba(99,102,241,.2)">
                {skill}
              </Tag>
            ))}
          </div>
        </Section>

        {/* Roadmap */}
        <Section label="Education Roadmap" accent="#10B981">
          <ul style={{ marginTop: 8, paddingLeft: 16, color: "#475569", fontSize: 13, lineHeight: 1.8 }}>
            {career.roadmap?.map((step, i) => (
              <li key={i} style={{ marginBottom: 2 }}>{step}</li>
            ))}
          </ul>
        </Section>

        {/* Salary */}
        <Section label="Salary & Growth" accent="#F43F5E">
          <div style={{
            marginTop: 8, padding: "12px 14px", borderRadius: 12,
            background: "rgba(244,63,94,.06)", border: "1px solid rgba(244,63,94,.15)",
          }}>
            <strong style={{ display: "block", color: "#E11D48", fontSize: 14, marginBottom: 4 }}>
              {career.salary}
            </strong>
            <span style={{ fontSize: 12, color: "#94A3B8" }}>Growth potential varies by field</span>
          </div>
        </Section>

        {/* Colleges */}
        <Section label="Top Colleges" accent="#F59E0B">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {career.colleges?.map(c => (
              <Tag key={c} bg="rgba(245,158,11,.08)" color="#B45309" border="rgba(245,158,11,.2)">
                {c}
              </Tag>
            ))}
          </div>
        </Section>
      </div>

      {/* Roadmap button */}
      <Link
        to="/careerDetail"
        state={{ careerTitle: career.title, roadmapKey: career.roadmapKey }}
        className="if-roadmap-btn"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "13px 28px", borderRadius: 14,
          color: "#fff", fontWeight: 700, fontSize: 14,
          textDecoration: "none", border: "none",
          letterSpacing: "0.02em",
        }}
      >
        ✦ Get Full Roadmap
      </Link>
    </div>
  );
}

function Section({ label, accent, children }) {
  return (
    <div>
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
        textTransform: "uppercase", color: accent, marginBottom: 0,
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function Tag({ bg, color, border, children }) {
  return (
    <span style={{
      padding: "4px 10px", borderRadius: 8,
      background: bg, color: color, border: `1px solid ${border}`,
      fontSize: 11, fontWeight: 600,
    }}>
      {children}
    </span>
  );
}