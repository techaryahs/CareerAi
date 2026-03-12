import React, { useState } from "react";
import {
  Briefcase,
  Laptop,
  Book,
  DollarSign,
  TrendingUp,
  Star,
  Search,
} from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { roadmaps } from "../../data/roadMap";
import PremiumPopup from "../../../components/PremiumPlans/PremiumPlans";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { logStudentActivity } from "../../../utils/logActivity";

/* =======================
   HELPERS (DO NOT REMOVE)
   ======================= */

const normalize = (str = "") => str.toLowerCase().trim();

const categoryMap = {
  technology: ["technology", "automation technology", "aerospace & technology"],
  "ai & machine learning": [
    "artificial intelligence",
    "ai & machine learning",
    "ai policy & ethics",
  ],
  creative: ["creative arts", "creative technology", "design", "media"],
  design: ["design", "creative arts", "creative technology"],
  media: ["media", "creative arts", "creative technology"],
  science: ["science", "science & nutrition", "data & analytics"],
  engineering: [
    "technology",
    "automation technology",
    "aerospace & technology",
  ],
  finance: ["finance", "business", "data & analytics"],
  healthcare: ["healthcare", "science & nutrition", "medical", "nutrition"],
  business: ["business", "management", "finance", "data & analytics"],
  legal: ["law", "policy", "ethics"],
  culinary: ["food", "nutrition", "science & nutrition"],
  education: ["education", "science", "technology"],
};

export default function Roadmap() {
  const { user, loading: authLoading } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const startTime = React.useRef(Date.now());
  const routerLocation = useLocation();

  const careers = Object.keys(roadmaps).map((key, index) => ({
    id: index + 1,
    title: roadmaps[key].title,
    field: roadmaps[key].field || "General",
    salary: roadmaps[key].salaryRange || "Salary",
    growth: roadmaps[key].growth || "Moderate",
    category: roadmaps[key].category || "General",
    emoji: roadmaps[key].emoji,
  }));

  const categories = [
    "All",
    "Technology",
    "AI & Machine Learning",
    "Creative",
    "Healthcare",
    "Education",
    "Finance",
    "Science",
    "Engineering",
    "Media",
    "Design",
    "Business",
    "Legal",
    "Culinary",
  ];

  useEffect(() => {
    if (routerLocation.state?.careerTitle) {
      const title = routerLocation.state.careerTitle;
      const roadmapData = roadmaps[title];
      if (roadmapData) {
        setSelectedCareer(roadmapData);
        setTimeout(() => {
          document
            .getElementById("roadmap-content")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [routerLocation.state]);

  /* =======================
     FIXED FILTER LOGIC
     ======================= */
  const filteredCareers = careers.filter((career) => {
    if (selectedCategory === "All") return true;

    const selected = normalize(selectedCategory);
    const careerCategory = normalize(career.category);
    const mappedCategories = categoryMap[selected];

    const matchCategory = mappedCategories
      ? mappedCategories.some((cat) => careerCategory.includes(cat))
      : careerCategory.includes(selected);

    const matchSearch = career.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  /* =======================
     PREMIUM CHECK
     ======================= */
  const handleView = (title) => {
    if (!user?.isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    const roadmapData = roadmaps[title];
    if (!roadmapData) return alert("No roadmap found!");
    setSelectedCareer(roadmapData);

    // ✅ LOG ACTIVITY
    const durationInSeconds = Math.max(1, Math.floor((Date.now() - startTime.current) / 1000));

    logStudentActivity(
      "CAREER_DETAILS",
      "Viewed Career Roadmap",
      `Student viewed roadmap for ${title}`,
      { careerTitle: title },
      durationInSeconds,
      null,
      "Completed"
    );

    setTimeout(() => {
      document
        .getElementById("roadmap-content")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  /* =======================
     PDF DOWNLOAD (Premium)
     ======================= */
  const downloadPDF = async () => {
    if (!user?.isPremium) {
      setShowPremiumPopup(true);
      return;
    }

    // ✅ LOG ACTIVITY
    const durationInSeconds = Math.max(1, Math.floor((Date.now() - startTime.current) / 1000));

    logStudentActivity(
      "CAREER_DETAILS",
      "Downloaded Career PDF",
      `Student downloaded roadmap PDF for ${selectedCareer.title}`,
      { careerTitle: selectedCareer.title },
      durationInSeconds,
      null,
      "Completed"
    );

    const element = document.getElementById("roadmap-content");
    if (!element) return;

    const clone = element.cloneNode(true);
    clone.style.background = "#ffffff";
    clone.style.color = "#000000";
    clone.querySelectorAll("*").forEach((el) => {
      el.style.backgroundColor = "#ffffff";
      el.style.color = "#000000";
      el.style.borderColor = "#000000";
    });
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${selectedCareer.title}_Roadmap.pdf`);
  };

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        Loading...
      </div>
    );

  return (
    <>
      {/* ── Design-only styles (no logic touched) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

        .rm-page { font-family: 'Sora', sans-serif; }

        /* Hero */
        .rm-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%);
          padding: 64px 24px 100px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .rm-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .rm-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: #38bdf8;
          background: rgba(56,189,248,.12);
          border: 1px solid rgba(56,189,248,.3);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .rm-hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 3.4rem);
          color: #fff;
          line-height: 1.1;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .rm-hero-title span { font-style: italic; color: #38bdf8; }
        .rm-hero-sub {
          color: rgba(255,255,255,.7);
          font-size: 1rem;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }

        /* Controls float over hero */
        .rm-controls-wrap {
          max-width: 760px;
          margin: -32px auto 0;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }
        .rm-controls-inner {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(37,99,235,.14), 0 2px 10px rgba(0,0,0,.06);
          padding: 18px 20px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          border: 1.5px solid rgba(37,99,235,.1);
        }
        .rm-search-box {
          position: relative;
          flex: 1 1 220px;
        }
        .rm-search-box svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #60a5fa;
          width: 17px;
          height: 17px;
        }
        .rm-search-box input {
          width: 100%;
          padding: 10px 14px 10px 40px;
          border-radius: 10px;
          border: 1.5px solid #dbeafe;
          background: #f8faff;
          font-family: 'Sora', sans-serif;
          font-size: .85rem;
          color: #1e3a8a;
          outline: none;
          transition: border-color .2s;
        }
        .rm-search-box input:focus { border-color: #3b82f6; background: #fff; }
        .rm-select-box {
          flex: 0 1 190px;
        }
        .rm-select-box select {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #dbeafe;
          background: #f8faff;
          font-family: 'Sora', sans-serif;
          font-size: .85rem;
          color: #1e3a8a;
          outline: none;
          cursor: pointer;
          transition: border-color .2s;
        }
        .rm-select-box select:focus { border-color: #3b82f6; }

        /* Cards section */
        .rm-cards-section {
          max-width: 1140px;
          margin: 56px auto 0;
          padding: 0 24px 80px;
        }
        .rm-section-label {
          text-align: center;
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #3b82f6;
          margin-bottom: 28px;
        }

        /* Card */
        .rm-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px 22px 20px;
          border: 1.5px solid rgba(37,99,235,.09);
          box-shadow: 0 4px 18px rgba(37,99,235,.07), 0 1px 4px rgba(0,0,0,.04);
          transition: transform .22s, box-shadow .22s, border-color .22s;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .rm-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2563eb, #38bdf8);
          opacity: 0;
          transition: opacity .22s;
        }
        .rm-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(37,99,235,.13); border-color: rgba(37,99,235,.2); }
        .rm-card:hover::before { opacity: 1; }

        .rm-card-icon-box {
          width: 44px; height: 44px;
          border-radius: 13px;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(37,99,235,.28);
          margin-bottom: 14px;
          flex-shrink: 0;
        }

        .rm-badge {
          font-size: .69rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
        }
        .rm-badge-blue  { background: #dbeafe; color: #1d4ed8; }
        .rm-badge-green { background: #dcfce7; color: #15803d; }
        .rm-badge-amber { background: #fef9c3; color: #a16207; }

        .rm-view-btn {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 10px 0;
          border-radius: 11px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: .82rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(37,99,235,.28);
          transition: opacity .18s, transform .18s;
          margin-top: auto;
        }
        .rm-view-btn:hover { opacity: .9; transform: translateY(-1px); }

        /* Detail */
        .rm-detail-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
          border-radius: 20px 20px 0 0;
          padding: 40px 40px 36px;
          position: relative;
          overflow: hidden;
        }
        .rm-detail-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .rm-detail-card {
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(37,99,235,.12), 0 2px 10px rgba(0,0,0,.06);
          border: 1.5px solid rgba(37,99,235,.1);
        }

        .rm-section-heading {
          display: flex; align-items: center; gap: 10px;
          font-size: 1.08rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 2px solid #dbeafe;
        }
        .rm-section-heading-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: #eff6ff;
          display: flex; align-items: center; justify-content: center;
          color: #3b82f6;
          flex-shrink: 0;
        }

        .rm-edu-item {
          display: flex; gap: 12px; align-items: flex-start;
          font-size: .87rem; color: #374151; line-height: 1.6;
          margin-bottom: 10px;
        }
        .rm-edu-num {
          width: 26px; height: 26px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: #fff; font-size: .7rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        .rm-skill-box {
          background: #eff6ff;
          border-radius: 14px;
          padding: 16px;
          border: 1px solid #dbeafe;
        }
        .rm-skill-box-title {
          font-size: .68rem; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: #3b82f6; margin-bottom: 10px;
        }
        .rm-skill-item {
          display: flex; align-items: center; gap: 8px;
          font-size: .82rem; color: #1e3a8a; margin-bottom: 6px;
        }
        .rm-skill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #60a5fa; flex-shrink: 0;
        }

        .rm-salary-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #dbeafe;
          font-size: .85rem;
        }
        .rm-salary-table thead tr {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff;
        }
        .rm-salary-table th {
          padding: 12px 16px; text-align: left;
          font-size: .73rem; font-weight: 600;
          letter-spacing: .06em; text-transform: uppercase;
        }
        .rm-salary-table td {
          padding: 11px 16px; color: #374151;
          border-top: 1px solid #dbeafe;
        }
        .rm-salary-table tbody tr:hover td { background: #eff6ff; }

        .rm-trend-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: .87rem; color: #374151; line-height: 1.6;
          background: #f8faff; border: 1px solid #dbeafe;
          border-radius: 10px; padding: 12px 14px; margin-bottom: 8px;
        }
        .rm-trend-arrow { color: #3b82f6; font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        .rm-personality-bar {
          margin-top: 8px;
          padding: 14px 18px;
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          border-radius: 12px;
          display: flex; justify-content: space-between; align-items: center;
          border: 1px solid #bfdbfe;
        }

        .rm-btn-back {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 10px;
          background: #fff; border: 1.5px solid #bfdbfe;
          color: #1d4ed8; font-family: 'Sora', sans-serif;
          font-size: .82rem; font-weight: 600; cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,.05);
          transition: background .18s, border-color .18s;
        }
        .rm-btn-back:hover { background: #eff6ff; border-color: #60a5fa; }

        .rm-btn-pdf {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 20px; border-radius: 10px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff; font-family: 'Sora', sans-serif;
          font-size: .82rem; font-weight: 600; cursor: pointer;
          border: none; box-shadow: 0 4px 14px rgba(37,99,235,.3);
          transition: opacity .18s;
        }
        .rm-btn-pdf:hover { opacity: .9; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .rm-card { animation: fadeUp .35s ease both; }
        @media(max-width:640px){
          .rm-detail-hero { padding: 26px 20px 22px; }
          .rm-controls-inner { flex-direction: column; }
        }
      `}</style>

      <div className="rm-page min-h-screen" style={{ background: "linear-gradient(160deg,#e8f1ff 0%,#f0f7ff 40%,#e0ecff 100%)" }}>

        {/* ── Hero ── */}
        <div className="rm-hero">
          <div className="rm-hero-eyebrow">✦ Career Intelligence Platform</div>
          <h1 className="rm-hero-title">Chart Your <span>Career Path</span></h1>
          <p className="rm-hero-sub">Discover step-by-step roadmaps crafted for every ambition</p>
        </div>

        {/* ── Search & Filter ── */}
        {!selectedCareer && (
          <>
            <div className="rm-controls-wrap">
              <div className="rm-controls-inner">
                <div className="rm-search-box">
                  <Search />
                  <input
                    type="text"
                    placeholder="Search career..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="rm-select-box">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── Career Cards ── */}
            <div className="rm-cards-section">
              <p className="rm-section-label">
                {filteredCareers.length} career{filteredCareers.length !== 1 ? "s" : ""} found
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {filteredCareers.map((career) => (
                  <div key={career.id} className="rm-card">
                    <div className="rm-card-icon-box">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>

                    <div className="text-2xl mb-1">{career.emoji}</div>
                    <h3 className="text-lg font-bold text-blue-900 mb-1 leading-snug">
                      {career.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Professional role in the {career.field} field.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="rm-badge rm-badge-blue">{career.salary}</span>
                      <span className="rm-badge rm-badge-green">{career.growth}</span>
                      <span className="rm-badge rm-badge-amber">{career.category}</span>
                    </div>

                    <button
                      className="rm-view-btn"
                      onClick={() => handleView(career.title)}
                    >
                      View Roadmap →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Roadmap Detail ── */}
        {selectedCareer && (
          <>
            <div className="max-w-5xl mx-auto mt-10 px-6">
              {/* Top buttons */}
              <div className="flex justify-between items-center mb-6">
                <button className="rm-btn-back" onClick={() => setSelectedCareer(null)}>
                  ← Back to Careers
                </button>
                <button className="rm-btn-pdf" onClick={downloadPDF}>
                  📄 Download PDF
                </button>
              </div>

              {/* Detail card */}
              <div id="roadmap-content" className="rm-detail-card mb-16">

                {/* Hero strip */}
                <div className="rm-detail-hero">
                  <div className="text-4xl mb-3 relative z-10">{selectedCareer.emoji}</div>
                  <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-2 relative z-10"
                    style={{ fontFamily: "'DM Serif Display', serif" }}>
                    <Laptop className="w-8 h-8" /> {selectedCareer.title}
                  </h1>
                  <p className="text-blue-200 font-light leading-relaxed max-w-2xl relative z-10">
                    {selectedCareer.overview}
                  </p>
                </div>

                <div className="p-8">

                  {/* Education */}
                  <section className="mb-8">
                    <h2 className="rm-section-heading">
                      <span className="rm-section-heading-icon"><Book size={16} /></span>
                      Education Path
                    </h2>
                    <ol style={{ listStyle: "none", padding: 0 }}>
                      {selectedCareer.education.map((item, i) => (
                        <li key={i} className="rm-edu-item">
                          <span className="rm-edu-num">{i + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </section>

                  {/* Skills */}
                  <section className="mb-8">
                    <h2 className="rm-section-heading">
                      <span className="rm-section-heading-icon"><Laptop size={16} /></span>
                      Skills Required
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: "Technical", items: selectedCareer.skills.technical },
                        { label: "Soft Skills", items: selectedCareer.skills.soft },
                        { label: "Tools", items: selectedCareer.skills.tools },
                      ].map(({ label, items }) => (
                        <div key={label} className="rm-skill-box">
                          <div className="rm-skill-box-title">{label}</div>
                          {items.map((s, i) => (
                            <div key={i} className="rm-skill-item">
                              <span className="rm-skill-dot" />{s}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Salary */}
                  {selectedCareer.salary && (
                    <section className="mb-8">
                      <h2 className="rm-section-heading">
                        <span className="rm-section-heading-icon"><DollarSign size={16} /></span>
                        Salary Overview
                      </h2>
                      <table className="rm-salary-table">
                        <thead>
                          <tr>
                            <th>Role</th>
                            <th>Experience</th>
                            <th>Salary</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCareer.salary.map((row, i) => (
                            <tr key={i}>
                              <td>{row.role}</td>
                              <td>{row.experience}</td>
                              <td style={{ fontWeight: 700, color: "#1d4ed8" }}>{row.salary}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>
                  )}

                  {/* Future Trends */}
                  <section className="mb-8">
                    <h2 className="rm-section-heading">
                      <span className="rm-section-heading-icon"><TrendingUp size={16} /></span>
                      Future Trends
                    </h2>
                    {selectedCareer.futureTrends.map((t, i) => (
                      <div key={i} className="rm-trend-item">
                        <span className="rm-trend-arrow">→</span> {t}
                      </div>
                    ))}
                  </section>

                  {/* Personality */}
                  <div className="rm-personality-bar">
                    <h3 className="font-semibold text-blue-800 text-sm">
                      Personality Type: {selectedCareer.personalityType}
                    </h3>
                    <Star className="text-yellow-400 w-5 h-5" />
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {/* Premium Popup */}
        {showPremiumPopup && (
          <PremiumPopup
            onClose={() => setShowPremiumPopup(false)}
            onUpgrade={() => { window.location.reload(); }}
          />
        )}
      </div>
    </>
  );
}