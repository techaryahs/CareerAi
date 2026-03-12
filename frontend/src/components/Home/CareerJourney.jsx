import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------
// DATA
// --------------------------------------------------
const careers = [
  {
    name: "Teacher",
    finalEmoji: "👩‍🏫",
    accent: "#6366f1",
    accentLight: "#e0e7ff",
    accentMid: "#a5b4fc",
    outcome: "Teaching in schools & institutions",
    tag: "Education",
  },
  {
    name: "Advocate",
    finalEmoji: "⚖️",
    accent: "#3b82f6",
    accentLight: "#dbeafe",
    accentMid: "#93c5fd",
    outcome: "Legal practice & advisory services",
    tag: "Law & Justice",
  },
  {
    name: "Doctor",
    finalEmoji: "👨‍⚕️",
    accent: "#10b981",
    accentLight: "#d1fae5",
    accentMid: "#6ee7b7",
    outcome: "Clinical practice & healthcare services",
    tag: "Healthcare",
  },
];

const steps = [
  {
    title: "Career Foundation",
    subtitle: "5th–12th Grade",
    description: "Interest discovery, aptitude assessment & early guidance to set the right direction.",
    emoji: "👦",
    icon: "🌱",
  },
  {
    title: "Assessment",
    subtitle: "Know Yourself",
    description: "Deep dive into skills, personality traits & core strengths to uncover your ideal path.",
    emoji: "🎓",
    icon: "🔬",
  },
  {
    title: "Exploration",
    subtitle: "Discover Options",
    description: "Explore careers, colleges & real-world opportunities curated for your profile.",
    emoji: "🔍",
    icon: "🌍",
  },
  {
    title: "Planning",
    subtitle: "Build Your Roadmap",
    description: "Create structured roadmaps, exam strategies & preparation timelines.",
    emoji: "🗺️",
    icon: "📋",
  },
  {
    title: "Execution",
    subtitle: "Launch Your Career",
    description: "Take off with expert mentorship, resources & community support.",
    emoji: null,
    icon: "🚀",
  },
];

// --------------------------------------------------
// FLOATING PARTICLES
// --------------------------------------------------
const Particle = ({ accent, delay, x, y, size }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: accent, opacity: 0.15 }}
    animate={{ y: [0, -30, 0], opacity: [0.1, 0.25, 0.1], scale: [1, 1.3, 1] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

// --------------------------------------------------
// STEP DOT
// --------------------------------------------------
const StepDot = ({ step, index, stepIndex, accent, onClick }) => {
  const done = index < stepIndex;
  const active = index === stepIndex;
  return (
    <motion.button
      onClick={() => onClick(index)}
      className="flex items-center gap-3 w-full text-left group"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative flex-shrink-0">
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
          animate={{
            background: active ? accent : done ? accent + "cc" : "#e2e8f0",
            scale: active ? 1.2 : 1,
          }}
          transition={{ duration: 0.35 }}
          style={{ color: active || done ? "#fff" : "#94a3b8" }}
        >
          {done ? "✓" : index + 1}
        </motion.div>
        {active && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${accent}` }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </div>
      <div className="overflow-hidden">
        <p className={`text-sm font-semibold leading-tight transition-colors ${active ? "text-gray-900" : done ? "text-gray-600" : "text-gray-400"}`}>
          {step.title}
        </p>
        <p className={`text-xs mt-0.5 transition-colors ${active ? "text-gray-500" : "text-gray-300"}`}>
          {step.subtitle}
        </p>
      </div>
    </motion.button>
  );
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------
const CareerJourneySection = () => {
  const navigate = useNavigate();
  const [careerIndex, setCareerIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);

  const career = careers[careerIndex];
  const step = steps[stepIndex];
  const isFinal = stepIndex === steps.length - 1;
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const charEmoji = isFinal ? career.finalEmoji : step.emoji;

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        setCareerIndex((c) => (c + 1) % careers.length);
        return 0;
      });
    }, 2800);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const particles = [
    { x: 8, y: 15, size: 10, delay: 0 },
    { x: 88, y: 10, size: 14, delay: 1 },
    { x: 75, y: 80, size: 8, delay: 0.5 },
    { x: 20, y: 75, size: 12, delay: 1.5 },
    { x: 50, y: 5, size: 6, delay: 2 },
    { x: 95, y: 50, size: 10, delay: 0.8 },
    { x: 5, y: 50, size: 8, delay: 1.2 },
  ];

  return (
    <section
      className="relative py-28 px-4 sm:px-8 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8faff 0%, #f0f4ff 40%, #f5fff8 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); mouseX.set(0); mouseY.set(0); }}
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .cj-root { font-family: 'DM Sans', sans-serif; }
        .cj-root .sora { font-family: 'Sora', sans-serif; }
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="cj-root relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: career.accentLight, color: career.accent }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: career.accent }}
            />
            Guided Career Journeys
          </motion.div>

          <motion.h2
            className="sora text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your Career Journey,{" "}
            <span className="relative inline-block">
              <span style={{ color: career.accent }} className="transition-colors duration-700">Step by Step</span>
              <motion.span
                className="absolute bottom-0 left-0 h-1 rounded-full"
                style={{ background: career.accent }}
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-500 mt-4 max-w-xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From school to profession — we guide students with clarity, structure, and confidence.
          </motion.p>
        </div>

        {/* ── Main Card ── */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Animated background layer */}
          <AnimatePresence>
            <motion.div
              key={careerIndex}
              className="absolute inset-0 noise-bg"
              style={{ background: `linear-gradient(135deg, ${career.accentLight} 0%, #ffffff 60%, ${career.accentLight}88 100%)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>

          {/* Glowing orbs */}
          <motion.div
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: career.accent + "30" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: career.accentMid + "40" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />

          {/* Floating particles */}
          {particles.map((p, i) => (
            <Particle key={i} accent={career.accent} {...p} />
          ))}

          {/* Border ring */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: `1.5px solid ${career.accentMid}55` }} />

          {/* Grid layout */}
          <div className="relative grid md:grid-cols-[1fr_1.6fr_1fr] gap-0">

            {/* ── LEFT: CHARACTER ── */}
            <div className="flex flex-col items-center justify-center py-14 px-6">
              {/* Career tag */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={careerIndex + "tag"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
                  style={{ background: career.accent + "18", color: career.accent }}
                >
                  {career.tag}
                </motion.div>
              </AnimatePresence>

              {/* Emoji character */}
              <div className="relative">
                {/* Halo ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `radial-gradient(circle, ${career.accentMid}40 0%, transparent 70%)` }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={charEmoji}
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -14, 0] }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                    transition={{
                      duration: 0.55,
                      y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                    }}
                    className="text-8xl sm:text-[6.5rem] drop-shadow-xl select-none"
                  >
                    {charEmoji}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Name badge on final */}
              <AnimatePresence>
                {isFinal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mt-6 px-5 py-2 rounded-full text-sm font-bold shadow-lg"
                    style={{ background: career.accent, color: "#fff" }}
                  >
                    {career.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── CENTER: CONTENT ── */}
            <div
              className="relative flex flex-col justify-center py-14 px-8"
              style={{ borderLeft: `1px solid ${career.accentMid}33`, borderRight: `1px solid ${career.accentMid}33` }}
            >
              {/* Step number pill */}
              <motion.div
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-5 self-start px-3 py-1.5 rounded-full"
                style={{ background: career.accentLight, color: career.accent }}
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>{step.icon}</span>
                Step {stepIndex + 1} of {steps.length}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                >
                  <h3 className="sora text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: career.accent }}>
                    {step.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {step.description}
                  </p>

                  <AnimatePresence>
                    {isFinal && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-5 overflow-hidden"
                      >
                        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: career.accentLight }}>
                          <span className="font-semibold" style={{ color: career.accent }}>🎯 Outcome: </span>
                          <span className="text-gray-700">{career.outcome}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <AnimatePresence>
                {isFinal && (
                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    whileHover={{ scale: 1.05, boxShadow: `0 12px 30px ${career.accent}55` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/services")}
                    className="mt-7 self-start px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg flex items-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${career.accent}, ${career.accentMid})` }}
                  >
                    <span>Let's Explore</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Progress */}
              <div className="mt-10">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                  <span className="font-medium">Journey Progress</span>
                  <motion.span
                    key={stepIndex}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                    className="font-bold text-gray-700"
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: career.accentLight }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${career.accent}, ${career.accentMid})` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.div
                      className="h-full w-full rounded-full"
                      style={{ background: "linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.4))" }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: TIMELINE ── */}
            <div className="hidden md:flex flex-col justify-center gap-2 py-14 px-8">
              <p className="sora text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Milestones</p>
              <div className="relative">
                {/* Connector line */}
                <div className="absolute left-3.5 top-4 bottom-4 w-px" style={{ background: `linear-gradient(180deg, ${career.accent}44, ${career.accentMid}22)` }} />
                <div className="flex flex-col gap-5">
                  {steps.map((s, i) => (
                    <StepDot
                      key={i}
                      step={s}
                      index={i}
                      stepIndex={stepIndex}
                      accent={career.accent}
                      onClick={(idx) => { setStepIndex(idx); setPaused(true); }}
                    />
                  ))}
                </div>
              </div>

              {/* Career switcher */}
              <div className="mt-8 flex gap-2">
                {careers.map((c, i) => (
                  <motion.button
                    key={i}
                    onClick={() => { setCareerIndex(i); setStepIndex(0); setPaused(true); }}
                    className="w-3 h-3 rounded-full transition-all"
                    style={{ background: i === careerIndex ? c.accent : "#e2e8f0" }}
                    whileHover={{ scale: 1.4 }}
                    animate={{ scale: i === careerIndex ? 1.3 : 1 }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom cards ── */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {careers.map((c, i) => (
            <motion.button
              key={i}
              onClick={() => { setCareerIndex(i); setStepIndex(0); setPaused(true); }}
              className="relative rounded-2xl p-4 text-left overflow-hidden transition-all"
              style={{
                background: i === careerIndex ? c.accent : "rgba(255,255,255,0.8)",
                border: `1.5px solid ${i === careerIndex ? c.accent : c.accentLight}`,
              }}
              whileHover={{ y: -3, boxShadow: `0 16px 40px ${c.accent}33` }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl block mb-2">{c.finalEmoji}</span>
              <p className={`sora text-sm font-bold ${i === careerIndex ? "text-white" : "text-gray-800"}`}>
                {c.name}
              </p>
              <p className={`text-xs mt-0.5 ${i === careerIndex ? "text-white/70" : "text-gray-400"}`}>
                {c.tag}
              </p>
              {i === careerIndex && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          className="text-center text-sm text-gray-400 mt-12"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨ One platform. Multiple careers. Guided from start to success.
        </motion.p>
      </div>
    </section>
  );
};

export default CareerJourneySection;