"use client";

import { useEffect, useState } from "react";
import api from "../../../api";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaInfoCircle,
  FaClipboardList,
  FaFileWord,
  FaGlobe,
  FaUserTie,
  FaQuestionCircle,
  FaUniversity,
  FaExclamationTriangle,
  FaBook,
  FaClock,
  FaStar,
  FaChartBar,
  FaFire,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

/* ─────────────────────────────────────────
   FEATURE CONFIG
───────────────────────────────────────── */
const FEATURES = [
  { key: "CAREER_COMPARE", title: "Career Compare", icon: FaBriefcase, gradient: "from-indigo-500 to-violet-500", text: "text-indigo-600" },
  { key: "CAREER_DETAILS", title: "Career Details", icon: FaInfoCircle, gradient: "from-violet-500 to-purple-500", text: "text-violet-600" },
  { key: "INTEREST_FORM", title: "Interest Form", icon: FaClipboardList, gradient: "from-sky-500 to-cyan-500", text: "text-sky-600" },
  { key: "RESUME_BUILDER", title: "Resume Builder", icon: FaFileWord, gradient: "from-blue-500 to-indigo-500", text: "text-blue-600" },
  { key: "STUDY_ABROAD", title: "Study Abroad", icon: FaGlobe, gradient: "from-emerald-500 to-teal-500", text: "text-emerald-600" },
  { key: "CONSULTANT", title: "Consultant", icon: FaUserTie, gradient: "from-amber-500 to-orange-500", text: "text-amber-600" },
  { key: "CAREER_QUIZ", title: "Career Quiz", icon: FaQuestionCircle, gradient: "from-pink-500 to-rose-500", text: "text-pink-600" },
  { key: "COLLEGE_BY_LOCATION", title: "Colleges by Location", icon: FaUniversity, gradient: "from-indigo-500 to-blue-500", text: "text-indigo-600" },
  { key: "DROPOUT", title: "Dropout Flow", icon: FaExclamationTriangle, gradient: "from-red-500 to-rose-500", text: "text-red-600" },
  { key: "EDUTUTOR", title: "EduTutor", icon: FaBook, gradient: "from-purple-500 to-violet-500", text: "text-purple-600" },
];

const STATS = [
  { key: "overallPerformance", label: "Overall Performance", suffix: "%", icon: FaFire, bar: "from-indigo-500 to-violet-500", ib: "bg-indigo-100", it: "text-indigo-600" },
  { key: "totalActivities", label: "Total Activities", suffix: "", icon: FaChartBar, bar: "from-sky-500 to-cyan-500", ib: "bg-sky-100", it: "text-sky-600" },
  { key: "avgScore", label: "Average Score", suffix: "%", icon: FaStar, bar: "from-violet-500 to-purple-500", ib: "bg-violet-100", it: "text-violet-600" },
  { key: "totalTime", label: "Time Spent", suffix: " min", icon: FaClock, bar: "from-emerald-500 to-teal-500", ib: "bg-emerald-100", it: "text-emerald-600" },
];

/* ─────────────────────────────────────────
   PAGE LOADER
───────────────────────────────────────── */
const PageLoader = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 gap-5">
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 animate-spin" />
      <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-violet-400 animate-[spin_1.3s_linear_infinite_reverse]" />
      <div className="absolute inset-[18px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 animate-pulse" />
    </div>
    <p className="text-[11px] font-black tracking-[0.18em] uppercase text-indigo-500 animate-pulse">
      Loading Dashboard
    </p>
  </div>
);

/* ─────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────── */
const SectionHeader = ({ label }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[11px] font-black tracking-[0.16em] uppercase text-indigo-500 whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-indigo-200/80 to-transparent" />
  </div>
);

/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */
const StatCard = ({ label, value, suffix, icon: Icon, bar, ib, it }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white/75 backdrop-blur-xl border border-indigo-100/80 shadow-[0_4px_24px_rgba(99,102,241,0.08)] hover:shadow-[0_20px_56px_rgba(99,102,241,0.18)] hover:-translate-y-2 transition-all duration-300 p-7">
    {/* Top gradient bar */}
    <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${bar}`} />

    {/* Icon */}
    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${ib} ${it} mb-5`}>
      <Icon size={18} />
    </div>

    <p className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-slate-400 mb-2">{label}</p>
    <p className="text-4xl font-black tracking-tight text-slate-800 leading-none" style={{ fontFamily: "Outfit, sans-serif" }}>
      {value}
      <span className="text-2xl text-slate-400 font-semibold">{suffix}</span>
    </p>

    {/* Glow blob */}
    <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${bar} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
  </div>
);

/* ─────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────── */
const FeatureCard = ({ title, icon: Icon, gradient, text, count, totalTime, avgScore }) => {
  const active = count > 0;
  const timeLabel = totalTime < 60 ? `${totalTime}s` : `${Math.floor(totalTime / 60)}m`;

  return (
    <div className={`group relative overflow-hidden rounded-xl bg-white/72 backdrop-blur-xl border transition-all duration-300 p-5
      ${active
        ? "border-indigo-100 shadow-[0_2px_16px_rgba(99,102,241,0.07)] hover:shadow-[0_14px_44px_rgba(99,102,241,0.18)] hover:-translate-y-1.5"
        : "border-slate-100/80 opacity-55 hover:opacity-75"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} shadow-sm`}>
          <Icon size={14} className="text-white" />
        </div>
        {active
          ? <FaCheckCircle className="text-emerald-400 text-base" style={{ filter: "drop-shadow(0 0 4px rgba(52,211,153,0.6))" }} />
          : <FaTimesCircle className="text-slate-200 text-base" />
        }
      </div>

      <p className="text-[12.5px] font-bold text-slate-700 leading-snug mb-3">{title}</p>

      <p className={`text-3xl font-black tracking-tight leading-none ${active ? text : "text-slate-300"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
        {count}
      </p>
      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-1 mb-3">
        Activities
      </p>

      {active && (totalTime > 0 || avgScore > 0) && (
        <div className="border-t border-slate-100 pt-3 flex flex-col gap-1.5">
          {totalTime > 0 && (
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <FaClock className="text-slate-300" size={9} /> {timeLabel}
            </span>
          )}
          {avgScore > 0 && (
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <FaStar className="text-amber-300" size={9} /> {avgScore}% avg
            </span>
          )}
        </div>
      )}

      {/* Hover glow */}
      <div className={`absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
    </div>
  );
};

/* ─────────────────────────────────────────
   ACTIVITY CARD
───────────────────────────────────────── */
const ActivityCard = ({ activity }) => {
  const dur = activity.duration || 0;
  const timeLabel = dur < 60 ? `${dur} secs` : `${Math.floor(dur / 60)} mins`;
  const done = activity.status?.toLowerCase() === "completed";

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/75 backdrop-blur-xl border border-indigo-100/80 shadow-[0_2px_16px_rgba(99,102,241,0.06)] hover:shadow-[0_18px_52px_rgba(99,102,241,0.16)] hover:-translate-y-1.5 transition-all duration-300 p-6 pl-7">
      {/* Accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-indigo-500 to-violet-500" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-[15px] font-bold text-slate-800 leading-snug">{activity.title}</h4>
        <span className="shrink-0 text-[10px] font-black tracking-[0.08em] uppercase px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          {activity.featureType?.replace(/_/g, " ")}
        </span>
      </div>

      {/* Description */}
      {activity.description && (
        <p className="text-[13px] text-slate-500 leading-relaxed mb-4 font-medium">{activity.description}</p>
      )}

      {/* Career compare */}
      {activity.meta?.career1 && (
        <div className="mb-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 p-3">
          <p className="text-[12.5px] text-slate-700 font-semibold">
            <span className="text-indigo-600 font-bold">Compared: </span>
            {activity.meta.career1}
            <span className="text-slate-400 mx-2 font-normal">vs</span>
            {activity.meta.career2}
          </p>
        </div>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {activity.score != null && (
          <span className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            <FaCheckCircle size={9} /> {activity.score}% Score
          </span>
        )}
        <span className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-500 border border-indigo-100">
          <FaClock size={9} /> {timeLabel}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100/80">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
          <FaCalendarAlt size={9} />
          {new Date(activity.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
          })}
        </span>
        <span className={`text-[10px] font-black tracking-[0.12em] uppercase px-2.5 py-1 rounded-full
          ${done
            ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
            : "bg-indigo-50 text-indigo-400 border border-indigo-100"
          }`}
        >
          {activity.status}
        </span>
      </div>

      {/* Hover shimmer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/[0.02] group-hover:to-violet-500/[0.02] transition-all duration-500 pointer-events-none" />
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
const MyActivity = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [featureActivities, setFeatureActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      try {
        setLoading(true);
        const [sRes, aRes] = await Promise.all([
          api.get("/api/feature-activity/summary"),
          api.get("/api/feature-activity/my"),
        ]);
        setSummary(sRes.data.summary);
        setFeatureActivities(aRes.data.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <PageLoader />;
  if (!user) return <p className="text-center mt-10 text-slate-500 font-medium">Please log in.</p>;

  const totalActivities = summary?.totalActivities || 0;
  const overallPerformance = summary?.overallPerformance || 0;
  const avgScore = summary?.avgScore || 0;
  const totalTime = summary?.totalTimeMinutes || 0;
  const featureBreakdown = summary?.featureBreakdown || {};

  const statValues = { overallPerformance, totalActivities, avgScore, totalTime };

  return (
    <>
      {/* Outfit font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');`}</style>

      <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50/70 to-purple-50 overflow-x-hidden">

        {/* ── Decorative background ── */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          {/* Soft blobs */}
          <div className="absolute -top-52 -right-52 w-[640px] h-[640px] rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute -bottom-52 -left-52 w-[560px] h-[560px] rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-sky-200/25 blur-2xl" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.028]"
            style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "30px 30px" }}
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-8 py-12 pb-28">

          {/* ══════════════════════
              HEADER
          ══════════════════════ */}
          <div className="flex flex-wrap items-start justify-between gap-5 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-[11px] font-black tracking-[0.16em] uppercase text-indigo-500">
                  Activity Dashboard
                </span>
              </div>
              <h1 className="text-4xl md:text-[46px] font-black tracking-tight text-slate-900 leading-[1.04]" style={{ fontFamily: "Outfit, sans-serif" }}>
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {user.name}
                </span>
              </h1>
              <p className="mt-3 text-[15px] text-slate-500 font-medium">
                A complete snapshot of your learning journey
              </p>
            </div>

            {/* Live badge */}
            <div className="flex items-center gap-2.5 self-start mt-1 bg-white/75 backdrop-blur-xl border border-indigo-100 rounded-full px-5 py-2.5 shadow-[0_4px_20px_rgba(99,102,241,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[13px] font-bold text-indigo-700 tracking-tight">Live Sync</span>
            </div>
          </div>

          {/* ══════════════════════
              STAT CARDS
          ══════════════════════ */}
          <SectionHeader label="Summary Overview" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-16">
            {STATS.map((s) => (
              <StatCard
                key={s.key}
                label={s.label}
                value={statValues[s.key]}
                suffix={s.suffix}
                icon={s.icon}
                bar={s.bar}
                ib={s.ib}
                it={s.it}
              />
            ))}
          </div>

          {/* ══════════════════════
              FEATURE GRID
          ══════════════════════ */}
          <SectionHeader label="Feature Activity Overview" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
            {FEATURES.map(({ key, title, icon, gradient, text }) => {
              const raw = featureBreakdown[key];
              const count = typeof raw === "number" ? raw : raw?.count || 0;
              const ftTime = typeof raw === "object" ? raw?.totalTime || 0 : 0;
              const ftScore = typeof raw === "object" ? raw?.avgScore || 0 : 0;
              return (
                <FeatureCard
                  key={key}
                  title={title}
                  icon={icon}
                  gradient={gradient}
                  text={text}
                  count={count}
                  totalTime={ftTime}
                  avgScore={ftScore}
                />
              );
            })}
          </div>

          {/* ══════════════════════
              ACTIVITY HISTORY
          ══════════════════════ */}
          <SectionHeader label="Detailed Activity History" />

          {featureActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featureActivities.map((activity, i) => (
                <ActivityCard key={i} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/72 backdrop-blur-xl border border-dashed border-indigo-200 p-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
                <FaClipboardList className="text-indigo-200" size={28} />
              </div>
              <p className="text-xl font-black text-slate-700 mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                No Activity Yet
              </p>
              <p className="text-[13px] text-slate-400 font-medium">
                Start exploring features to see your activity history here.
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MyActivity;