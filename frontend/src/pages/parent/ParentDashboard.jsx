import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaGraduationCap,
  FaChartLine,
  FaFileAlt,
  FaCheckCircle,
  FaSpinner,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaUserGraduate,
  FaArrowRight
} from "react-icons/fa";
import "./Dashboard.css";

/* =========================
   PARENT DASHBOARD
========================= */
export default function ParentDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [parent, setParent] = useState(null);
  const [student, setStudent] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DASHBOARD DATA
  ========================= */
  const cleanAPI = useMemo(() => {
    const rawAPI = import.meta.env.VITE_API_URL || "http://localhost:5001";
    return rawAPI.endsWith("/") ? rawAPI.slice(0, -1) : rawAPI;
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      console.log("DEBUG: Fetching dashboard from:", `${cleanAPI}/api/parent/dashboard`);

      if (!token) {
        console.warn("DEBUG: No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${cleanAPI}/api/parent/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("DEBUG: Dashboard response data:", res.data);

        setParent(res.data.parentProfile);
        setStudent(res.data.studentProfile);
        setProgress(res.data.studentProgress);

        if (!res.data.studentProfile) {
          console.warn("DEBUG: No studentProfile received from backend");
        }
      } catch (err) {
        console.error("DEBUG: Parent dashboard fetch error:", err.response?.data || err.message);
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [cleanAPI, token, navigate]);

  /* =========================
     HELPERS
  ========================= */
  const calculateOverallProgress = () => {
    if (!progress || !progress.categories) return 0;
    const values = Object.values(progress.categories);
    if (values.length === 0) return 0;
    const totalSum = values.reduce((acc, curr) => acc + curr, 0);
    return Math.round(totalSum / values.length);
  };

  const getStageStatus = (stageKey) => {
    if (!progress) return 'locked';
    if (progress.stageResults?.[stageKey]) return 'completed';
    if (progress.stageProgress?.[stageKey]?.currentQuestionIndex > 0) return 'in-progress';
    return 'locked';
  };

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p style={{ marginTop: '16px', fontWeight: '600', color: '#1e40af' }}>Loading Dashboard Data...</p>
    </div>
  );

  /* =========================
     MAIN UI
  ========================= */
  const overallPct = calculateOverallProgress();
  const services = student?.services || {};

  return (
    <div className="parent-dashboard-modern">
      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div className="dashboard-hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome, {parent?.name}! 👋</h1>
            <p className="hero-subtitle">Monitoring your child's career journey and progress.</p>
          </div>
          <div className="hero-badge">
            <div className="status-badge verified" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
              <FaUserShield /> Parent Account
            </div>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon blue"><FaUserGraduate /></div>
            <div className="stat-details">
              <div className="stat-value">{student?.name || "N/A"}</div>
              <div className="stat-label">Linked Student</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon indigo"><FaChartLine /></div>
            <div className="stat-details">
              <div className="stat-value">{overallPct}%</div>
              <div className="stat-label">Overall Progress</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon emerald"><FaFileAlt /></div>
            <div className="stat-details">
              <div className="stat-value">{Object.keys(services).length}</div>
              <div className="stat-label">Services Used</div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="content-grid">

          {/* PARENT PROFILE */}
          <div className="info-card">
            <div className="card-header">
              <FaUserShield className="header-icon" />
              <h3>Parent Profile</h3>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label"><FaEnvelope /> Email</span>
                <span className="info-value">{parent?.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label"><FaPhone /> Mobile</span>
                <span className="info-value">{parent?.mobile || "Not provided"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Account Status</span>
                <span className="info-value" style={{ color: '#10b981', fontWeight: 'bold' }}>Active</span>
              </div>
            </div>
          </div>

          {/* STUDENT QUICK INFO */}
          <div className="info-card">
            <div className="card-header">
              <FaGraduationCap className="header-icon" />
              <h3>Student Info</h3>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Student Name</span>
                <span className="info-value">{student?.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Plan Type</span>
                <span className="info-value">
                  {student?.isPremium ? (
                    <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Premium
                    </span>
                  ) : "Standard"}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Mobile</span>
                <span className="info-value">{student?.mobile || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* ASSESSMENT PROGRESS SECTION */}
          <div className="info-card full-width">
            <div className="card-header">
              <FaChartLine className="header-icon" />
              <h3>Career Assessment Progress</h3>
            </div>

            <div className="assessment-container">
              {/* CIRCLE */}
              <div className="progress-circle-wrap">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path className="text-blue-600" strokeDasharray={`${overallPct}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="progress-circle-text">
                  <span className="progress-pct">{overallPct}%</span>
                  <span className="progress-sub">Average</span>
                </div>
              </div>

              {/* STAGES PILLS */}
              <div className="stages-grid">
                <StagePill title="Self Assessment" status={getStageStatus("stage5to7")} />
                <StagePill title="Career Exploration" status="locked" />
                <StagePill title="Skill Development" status="locked" />
                <StagePill title="Expert Guidance" status="locked" />
              </div>
            </div>

            {/* SKILL BREAKDOWN */}
            {progress?.categories && Object.keys(progress.categories).length > 0 && (
              <div className="skill-breakdown">
                <h4 style={{ fontSize: '14px', marginBottom: '16px', color: '#475569' }}>Category Performance</h4>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(progress.categories).map(([name, score]) => (
                    <div key={name} className="skill-item">
                      <div className="skill-info">
                        <span>{name}</span>
                        <span>{score}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div className="skill-bar-fill" style={{ width: `${score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SERVICE ACTIVITY SECTION */}
          <div className="info-card full-width" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
            <div className="section-header">
              <h2><FaFileAlt /> Service Usage Details</h2>
            </div>
            <div className="service-grid">
              <ServiceCard
                title="Career Quiz"
                active={services.quiz?.attempted}
                info={`Best Score: ${services.quiz?.bestScore || 0}`}
                extra={`Attempts: ${services.quiz?.totalAttempts || 0}`}
              />
              <ServiceCard
                title="AI Recommendations"
                active={services.aiCareerRecommendation?.generated}
                info={`Careers: ${services.aiCareerRecommendation?.recommendedCareers?.length || 0}`}
              />
              <ServiceCard
                title="Resume Builder"
                active={services.resumeBuilder?.created}
                info={`Resumes: ${services.resumeBuilder?.resumeCount || 0}`}
              />
              <ServiceCard
                title="Mock Interviews"
                active={services.mockInterviews?.attempted}
                info={`Avg Score: ${services.mockInterviews?.averageScore || 0}`}
              />
              <ServiceCard
                title="Career Roadmap"
                active={services.careerRoadmap?.started}
                info={`Progress: ${services.careerRoadmap?.progressPercent || 0}%`}
              />
              <ServiceCard
                title="Skill Learning"
                active={services.skillLearningPaths?.skillsCompleted?.length > 0}
                info={`Completed: ${services.skillLearningPaths?.skillsCompleted?.length || 0}`}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */
function StagePill({ title, status }) {
  const icon = {
    completed: <FaCheckCircle style={{ color: '#10b981' }} />,
    'in-progress': <FaSpinner className="animate-spin" style={{ color: '#f59e0b' }} />,
    locked: <FaLock style={{ opacity: 0.5 }} />
  }[status];

  return (
    <div className={`stage-pill ${status}`}>
      <span style={{ fontWeight: '700' }}>{title}</span>
      {icon}
    </div>
  );
}

function ServiceCard({ title, active, info, extra }) {
  return (
    <div className="service-card">
      <div className="service-header">
        <h4 className="service-title">{title}</h4>
        <span className={`activity-badge ${active ? 'active' : 'inactive'}`}>
          {active ? "Active" : "Inactive"}
        </span>
      </div>
      <p className="service-info">{info}</p>
      {extra && <p className="service-extra">{extra}</p>}
    </div>
  );
}
