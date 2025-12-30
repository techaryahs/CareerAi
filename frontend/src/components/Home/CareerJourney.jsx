import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------
// DATA
// --------------------------------------------------
const careers = [
  {
    name: "Teacher",
    finalEmoji: "👩‍🏫",
    color: "from-indigo-100 to-indigo-50",
    outcome: "Teaching in schools & institutions",
  },
  {
    name: "Advocate",
    finalEmoji: "⚖️",
    color: "from-blue-100 to-blue-50",
    outcome: "Legal practice & advisory services",
  },
  {
    name: "Doctor",
    finalEmoji: "👨‍⚕️",
    color: "from-green-100 to-green-50",
    outcome: "Clinical practice & healthcare services",
  },
];

const steps = [
  {
    title: "Career Foundation (5th–12th)",
    description: "Interest discovery, aptitude & early guidance",
    emoji: "👦",
  },
  {
    title: "Assessment",
    description: "Skills, personality & strengths analysis",
    emoji: "🎓",
  },
  {
    title: "Exploration",
    description: "Careers, colleges & real-world opportunities",
    emoji: "🔍",
  },
  {
    title: "Planning",
    description: "Roadmaps, exams & preparation strategy",
    emoji: "🗺️",
  },
  {
    title: "Execution",
    description: "Career launch with expert guidance",
    emoji: null,
  },
];

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------
const CareerJourneySection = () => {
  const navigate = useNavigate();

  const [careerIndex, setCareerIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // --------------------------------------------------
  // AUTO PROGRESSION (LOOPS FOREVER)
  // --------------------------------------------------
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setCareerIndex((c) => (c + 1) % careers.length);
          return 0;
        }
      });
    }, 2600);

    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const currentCareer = careers[careerIndex];
  const currentStep = steps[stepIndex];

  const characterEmoji =
    stepIndex === steps.length - 1
      ? currentCareer.finalEmoji
      : currentStep.emoji;

  const progressPercent = ((stepIndex + 1) / steps.length) * 100;

  return (
    <section
      className="py-24 px-6 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Your Career Journey, Step by Step
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            From school to profession — we guide students with clarity,
            structure, and confidence.
          </p>
        </div>

        {/* MAIN CARD */}
        <div
          className={`relative grid md:grid-cols-3 gap-10 items-center rounded-3xl p-12
          bg-gradient-to-br ${currentCareer.color}
          shadow-xl border border-white/40 backdrop-blur-md`}
        >
          {/* LEFT: CHARACTER */}
          <div className="flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={characterEmoji}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -12, 0],
                }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  duration: 0.6,
                  y: { repeat: Infinity, duration: 3.5 },
                }}
                className="text-8xl sm:text-9xl drop-shadow-lg"
              >
                {characterEmoji}
              </motion.div>
            </AnimatePresence>

            {stepIndex === steps.length - 1 && (
              <span className="mt-4 text-xs tracking-wide uppercase bg-white/70 px-4 py-1 rounded-full text-gray-800 shadow">
                {currentCareer.name} Career Path
              </span>
            )}
          </div>

          {/* CENTER: STEP DETAILS */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {currentStep.title}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {currentStep.description}
                </p>

                {stepIndex === steps.length - 1 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Final Outcome:
                    <span className="font-semibold text-gray-800 ml-1">
                      {currentCareer.outcome}
                    </span>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* CTA BUTTON */}
            {stepIndex === steps.length - 1 && (
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/services")}
                className="mt-8 px-8 py-3 rounded-full text-sm font-semibold
                bg-indigo-600 text-white shadow-lg
                hover:bg-indigo-700 transition-all"
              >
                Let’s Explore
              </motion.button>
            )}

            {/* PROGRESS BAR */}
            <div className="mt-8">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>
                  {stepIndex + 1} / {steps.length}
                </span>
              </div>
              <div className="w-full bg-white/60 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-indigo-600 rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: MINI TIMELINE */}
          <div className="hidden md:flex flex-col gap-3">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 text-sm ${
                  i === stepIndex
                    ? "text-indigo-700 font-semibold"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    i <= stepIndex ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                />
                {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-sm text-gray-500 mt-12">
          One platform. Multiple careers. Guided from start to success.
        </p>
      </div>
    </section>
  );
};

export default CareerJourneySection;
