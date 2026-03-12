import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  User, Briefcase, Calendar, Award, CheckCircle2,
  Search, Filter, IndianRupee, Sparkles, Star,
} from "lucide-react";
import PremiumPopup from "../../../components/PremiumPlans/PremiumPlans";
import Loader from "../../../components/PageLoader/PageLoader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { logStudentActivity } from "../../../utils/logActivity";

/* ─────────── Inject keyframes once ─────────── */
const injectStyles = () => {
  if (document.getElementById("consult-styles")) return;
  const style = document.createElement("style");
  style.id = "consult-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    .consult-root { font-family: 'DM Sans', sans-serif; }
    .consult-root h1, .consult-root h2 { font-family: 'Syne', sans-serif; }

    @keyframes floatOrb {
      0%,100% { transform: translateY(0) scale(1); }
      50%      { transform: translateY(-28px) scale(1.04); }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes cardIn {
      from { opacity:0; transform:translateY(32px) scale(.97); }
      to   { opacity:1; transform:translateY(0)   scale(1);    }
    }
    @keyframes pulseBadge {
      0%,100% { box-shadow: 0 0 0 0 rgba(234,179,8,.35); }
      50%      { box-shadow: 0 0 0 6px rgba(234,179,8,0); }
    }

    .orb-1 { animation: floatOrb 7s ease-in-out infinite; }
    .orb-2 { animation: floatOrb 9s ease-in-out infinite 1.5s; }
    .orb-3 { animation: floatOrb 11s ease-in-out infinite 3s; }

    .hero-text  { animation: fadeUp .7s ease both; }
    .hero-sub   { animation: fadeUp .7s ease .15s both; }
    .filter-bar { animation: fadeUp .7s ease .25s both; }

    .mentor-card {
      animation: cardIn .5s ease both;
      transform-style: preserve-3d;
    }
    .mentor-card:hover .card-glow { opacity: 1; }
    .card-glow {
      opacity: 0;
      transition: opacity .3s ease;
    }
    .mentor-card:hover {
      transform: translateY(-6px);
    }

    .shimmer-btn {
      background: linear-gradient(90deg, #007BFF 0%, #00b4ff 40%, #007BFF 80%);
      background-size: 200% auto;
      transition: background-position .4s ease, box-shadow .2s ease;
    }
    .shimmer-btn:hover {
      background-position: right center;
      box-shadow: 0 6px 20px rgba(0,123,255,.45);
    }

    .premium-badge { animation: pulseBadge 2.5s infinite; }

    .avatar-ring {
      background: conic-gradient(from 180deg, #007BFF, #00d4ff, #1E3A8A, #007BFF);
      animation: spin 4s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .filter-pill {
      transition: all .25s cubic-bezier(.34,1.56,.64,1);
    }
    .filter-pill.active {
      transform: scale(1.05);
    }

    .no-results-card {
      animation: fadeUp .5s ease both;
    }

    .grid-card:nth-child(1)  { animation-delay: .05s; }
    .grid-card:nth-child(2)  { animation-delay: .10s; }
    .grid-card:nth-child(3)  { animation-delay: .15s; }
    .grid-card:nth-child(4)  { animation-delay: .20s; }
    .grid-card:nth-child(5)  { animation-delay: .25s; }
    .grid-card:nth-child(6)  { animation-delay: .30s; }
    .grid-card:nth-child(7)  { animation-delay: .35s; }
    .grid-card:nth-child(8)  { animation-delay: .40s; }
  `;
  document.head.appendChild(style);
};

/* ─────────── Main Component ─────────── */
const Consult = () => {
  injectStyles();

  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const startTime = React.useRef(Date.now());
  const { user, loading: authLoading } = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/consultants`);
        setConsultants(res.data.consultants || []);
      } catch (err) {
        console.error("❌ Failed to fetch consultants:", err.message);
        setConsultants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultants();
  }, []);

  const filteredConsultants = useMemo(() => {
    return consultants.filter((c) => {
      const matchesSearch =
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.expertise?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriceType =
        priceFilter === "all" ||
        (priceFilter === "free" && (c.price === 0 || !c.price)) ||
        (priceFilter === "paid" && c.price > 0);
      const matchesPriceRange = priceFilter === "paid" ? c.price <= maxPrice : true;
      return matchesSearch && matchesPriceType && matchesPriceRange;
    });
  }, [consultants, searchTerm, priceFilter, maxPrice]);

  const isPremiumConsultant = (c) => c.isPremium || c.name === "Personal Counselor";

  const handleBookClick = (consultant) => {
    if (isPremiumConsultant(consultant) && !user?.isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    navigate(`/book-slot/${consultant._id}`, { state: { consultant } });

    // ✅ LOG ACTIVITY
    const durationInSeconds = Math.max(1, Math.floor((Date.now() - startTime.current) / 1000));

    logStudentActivity(
      "CONSULTANT",
      "Initiated Consultant Booking",
      `Student clicked book for ${consultant.name} (${consultant.role})`,
      { consultantId: consultant._id, consultantName: consultant.name },
      durationInSeconds,
      null,
      "Initiated"
    );
  };

  if (loading || authLoading) return <Loader />;

  return (
    <div
      className="consult-root"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(155deg, #f0f5ff 0%, #fafcff 50%, #e8f0fe 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Floating background orbs ── */}
      <div
        className="orb-1"
        style={{
          position: "absolute", top: "8%", left: "5%",
          width: 340, height: 340,
          background: "radial-gradient(circle, rgba(0,123,255,.10) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }}
      />
      <div
        className="orb-2"
        style={{
          position: "absolute", top: "30%", right: "3%",
          width: 280, height: 280,
          background: "radial-gradient(circle, rgba(0,212,255,.09) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }}
      />
      <div
        className="orb-3"
        style={{
          position: "absolute", bottom: "10%", left: "30%",
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(30,58,138,.07) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }}
      />

      {/* ── Decorative dot grid ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(0,123,255,.07) 1.5px, transparent 1.5px)",
        backgroundSize: "32px 32px",
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          {/* eyebrow */}
          <div className="hero-text" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 16px", borderRadius: 100,
              background: "linear-gradient(90deg,rgba(0,123,255,.12),rgba(0,212,255,.12))",
              border: "1px solid rgba(0,123,255,.2)",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
              color: "#007BFF", textTransform: "uppercase",
            }}>
              <Sparkles size={12} /> Expert Guidance
            </span>
          </div>

          <h1 className="hero-text" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            fontWeight: 800, lineHeight: 1.1,
            color: "#0F172A", marginBottom: 16,
            letterSpacing: "-0.02em",
          }}>
            Meet Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #007BFF 0%, #00b4ff 50%, #1E3A8A 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Career Mentors
            </span>
          </h1>

          <p className="hero-sub" style={{
            maxWidth: 520, margin: "0 auto 0",
            color: "#64748B", fontSize: "1.05rem", lineHeight: 1.7,
            fontWeight: 400,
          }}>
            Hand-picked industry experts ready to guide you at every
            stage of your career journey.
          </p>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="filter-bar" style={{ maxWidth: 860, margin: "0 auto 56px" }}>
          <div style={{
            background: "rgba(255,255,255,.85)",
            backdropFilter: "blur(20px)",
            borderRadius: 24,
            border: "1px solid rgba(0,123,255,.12)",
            boxShadow: "0 8px 40px rgba(0,123,255,.08), 0 1px 0 rgba(255,255,255,.9) inset",
            padding: "20px 24px",
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>

              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 220px" }}>
                <Search style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                  color: "#94A3B8",
                }} size={18} />
                <input
                  type="text"
                  placeholder="Search by name, role or expertise…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%", paddingLeft: 48, paddingRight: 16,
                    paddingTop: 13, paddingBottom: 13,
                    background: "#F1F5F9",
                    border: "1.5px solid transparent",
                    borderRadius: 14, fontSize: 14,
                    color: "#1E293B", outline: "none",
                    transition: "border-color .2s, box-shadow .2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#007BFF";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,123,255,.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "transparent";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Price type pills */}
              <div style={{
                display: "flex", gap: 4, padding: 4,
                background: "#F1F5F9", borderRadius: 14,
              }}>
                {["all", "free", "paid"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPriceFilter(type)}
                    className={`filter-pill ${priceFilter === type ? "active" : ""}`}
                    style={{
                      padding: "9px 20px", borderRadius: 10, border: "none",
                      cursor: "pointer", fontWeight: 700, fontSize: 13,
                      textTransform: "capitalize", letterSpacing: "0.02em",
                      background: priceFilter === type
                        ? "#007BFF"
                        : "transparent",
                      color: priceFilter === type ? "#fff" : "#94A3B8",
                      boxShadow: priceFilter === type
                        ? "0 4px 14px rgba(0,123,255,.35)"
                        : "none",
                      transition: "all .25s ease",
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Max price */}
              {priceFilter === "paid" && (
                <div style={{ position: "relative", minWidth: 160 }}>
                  <IndianRupee style={{
                    position: "absolute", left: 14, top: "50%",
                    transform: "translateY(-50%)", color: "#007BFF",
                  }} size={15} />
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    style={{
                      width: "100%", paddingLeft: 38, paddingRight: 16,
                      paddingTop: 13, paddingBottom: 13,
                      background: "#F1F5F9", border: "none",
                      borderRadius: 14, fontSize: 13, fontWeight: 700,
                      color: "#1E293B", cursor: "pointer", appearance: "none",
                      outline: "none",
                    }}
                  >
                    <option value={500}>Under ₹500</option>
                    <option value={1000}>Under ₹1,000</option>
                    <option value={2000}>Under ₹2,000</option>
                    <option value={5000}>Any Price</option>
                  </select>
                </div>
              )}
            </div>

            {/* Count row */}
            <div style={{
              marginTop: 14, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6,
              fontSize: 12, color: "#94A3B8", fontWeight: 500,
            }}>
              <Filter size={11} />
              Showing{" "}
              <strong style={{ color: "#007BFF" }}>{filteredConsultants.length}</strong>
              {" "}of{" "}
              <strong style={{ color: "#1E3A8A" }}>{consultants.length}</strong>
              {" "}mentors
            </div>
          </div>
        </div>

        {/* ── CARD GRID ── */}
        {Array.isArray(filteredConsultants) && filteredConsultants.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(268px, 1fr))",
            gap: 28, maxWidth: 1200, margin: "0 auto",
          }}>
            {filteredConsultants.map((c) => (
              <MentorCard
                key={c._id}
                consultant={c}
                isPremium={isPremiumConsultant(c)}
                onBook={handleBookClick}
              />
            ))}
          </div>
        ) : (
          <div className="no-results-card" style={{
            maxWidth: 480, margin: "0 auto",
            background: "rgba(255,255,255,.9)",
            backdropFilter: "blur(20px)",
            borderRadius: 28,
            border: "1px solid rgba(0,123,255,.12)",
            boxShadow: "0 8px 40px rgba(0,0,0,.06)",
            padding: "52px 40px",
            textAlign: "center",
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg,rgba(0,123,255,.1),rgba(0,212,255,.1))",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Search size={32} color="#007BFF" />
            </div>
            <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1E3A8A", marginBottom: 8 }}>
              No mentors found
            </p>
            <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 24 }}>
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setPriceFilter("all"); }}
              style={{
                padding: "10px 28px", borderRadius: 12,
                background: "linear-gradient(135deg, #007BFF, #0056B3)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,123,255,.35)",
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {showPremiumPopup && (
        <PremiumPopup
          onClose={() => setShowPremiumPopup(false)}
          onUpgrade={() => setShowPremiumPopup(false)}
        />
      )}
    </div>
  );
};

/* ─────────── Mentor Card ─────────── */
const MentorCard = ({ consultant: c, isPremium, onBook }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="mentor-card grid-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "rgba(255,255,255,1)"
          : "rgba(255,255,255,.92)",
        backdropFilter: "blur(20px)",
        borderRadius: 24,
        border: hovered
          ? "1.5px solid rgba(0,123,255,.25)"
          : "1.5px solid rgba(0,123,255,.08)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,123,255,.14), 0 4px 16px rgba(0,0,0,.06)"
          : "0 4px 24px rgba(0,0,0,.05)",
        padding: "28px 24px 24px",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
        transition: "all .3s cubic-bezier(.34,1.56,.64,1)",
        cursor: "default",
      }}
    >
      {/* Glowing background blob on hover */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 24, overflow: "hidden",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
          width: 200, height: 160,
          background: "radial-gradient(ellipse, rgba(0,180,255,.08) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity .4s ease",
        }} />
      </div>

      {/* Premium / Standard badge */}
      <div
        className={isPremium ? "premium-badge" : ""}
        style={{
          position: "absolute", top: 18, right: 18,
          display: "flex", alignItems: "center", gap: 5,
          padding: "5px 12px", borderRadius: 100,
          background: isPremium
            ? "linear-gradient(135deg, #FEF9C3, #FEF08A)"
            : "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
          border: isPremium
            ? "1px solid rgba(234,179,8,.3)"
            : "1px solid rgba(16,185,129,.25)",
          fontSize: 11, fontWeight: 700,
          color: isPremium ? "#92400E" : "#065F46",
          letterSpacing: "0.04em",
        }}
      >
        {isPremium ? <><Star size={10} fill="#F59E0B" color="#F59E0B" /> Premium</> : <><CheckCircle2 size={10} /> Standard</>}
      </div>

      {/* Avatar */}
      <div style={{ marginBottom: 20, position: "relative" }}>
        {/* spinning ring */}
        <div
          className="avatar-ring"
          style={{
            width: 96, height: 96, borderRadius: "50%",
            padding: 2.5,
            opacity: hovered ? 1 : 0,
            transition: "opacity .3s ease",
            position: "absolute", inset: -2,
          }}
        />
        <div style={{
          width: 92, height: 92, borderRadius: "50%",
          padding: 3,
          background: hovered
            ? "linear-gradient(135deg, #007BFF, #00d4ff)"
            : "linear-gradient(135deg, #CBD5E1, #94A3B8)",
          transition: "background .3s ease",
          position: "relative",
        }}>
          <img
            src={c.image || "/default-avatar.jpg"}
            alt={c.name}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", borderRadius: "50%",
              border: "3px solid white",
            }}
          />
        </div>
      </div>

      {/* Name */}
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "1.15rem", fontWeight: 800,
        color: "#0F172A", marginBottom: 4, lineHeight: 1.2,
      }}>
        {c.name}
      </h2>

      {/* Role */}
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "#94A3B8", marginBottom: 12,
      }}>
        {c.role}
      </p>

      {/* Expertise chip */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 100,
        background: "linear-gradient(135deg, rgba(0,123,255,.08), rgba(0,212,255,.08))",
        border: "1px solid rgba(0,123,255,.15)",
        color: "#007BFF", fontSize: 12, fontWeight: 600,
        marginBottom: 14,
      }}>
        <Briefcase size={12} /> {c.expertise}
      </div>

      {/* Bio */}
      <p style={{
        color: "#64748B", fontSize: 13.5, lineHeight: 1.65,
        marginBottom: 20, flexGrow: 1,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {c.bio}
      </p>

      {/* Divider */}
      <div style={{
        width: "100%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,123,255,.12), transparent)",
        marginBottom: 20,
      }} />

      {/* Footer row */}
      <div style={{
        width: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        {/* Experience + Price */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 8,
            background: "rgba(0,123,255,.07)",
            color: "#1E3A8A", fontSize: 11, fontWeight: 700,
          }}>
            <User size={11} /> {c.experience}
          </div>
          <span style={{
            fontSize: 15, fontWeight: 800,
            color: c.price > 0 ? "#1E3A8A" : "#059669",
          }}>
            {c.price > 0 ? `₹${c.price}` : "FREE"}
          </span>
        </div>

        {/* Book button */}
        <button
          className="shimmer-btn"
          onClick={() => onBook(c)}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "11px 22px", borderRadius: 14,
            border: "none", cursor: "pointer",
            color: "#fff", fontSize: 13, fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          <Calendar size={14} /> Book
        </button>
      </div>
    </div>
  );
};

export default Consult;