import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Compass,
  Target,
  Sparkles,
  Star,
  Briefcase,
  Lock,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import ProgressSidebar from "./Progress";
import PremiumPlans from "../../../components/PremiumPlans/PremiumPlans";
export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (user?.isPremium === true) {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  }, [user]);

  // POPUP STATE
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // ⭐ FIXED PREMIUM NAVIGATION HANDLER ⭐
  const handleNavigate = (path, premiumOnly = false) => {
    if (premiumOnly && !isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#F9FBFF]">
      {/* PREMIUM POPUP */}
      {showPremiumPopup && (
        <PremiumPlans onClose={() => setShowPremiumPopup(false)} />
      )}

      <div className="max-w-7xl mx-auto pt-24 pb-20 px-6 flex gap-10">
        {/* LEFT SECTION */}
        <div className="w-full md:w-[70%]">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h1 className="text-5xl font-extrabold text-blue-800 tracking-tight">
              Welcome to <span className="text-blue-600">CareerGen AI</span>{" "}
              Guidance
            </h1>

            <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
              Unlock your future with AI-powered career insights. Choose your
              learning path and begin your personalized journey.
            </p>

            <div className="flex justify-center mt-6 gap-3 opacity-80">
              <Sparkles className="text-blue-600 w-6 h-6" />
              <Star className="text-yellow-500 w-6 h-6" />
              <Briefcase className="text-blue-600 w-6 h-6" />
            </div>
          </motion.div>

          {/* LEVEL CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 5th–7th */}
            <motion.div
              onClick={() => handleNavigate("/student-guidance/5th-7th")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 
                         hover:border-blue-300 hover:shadow-2xl transition cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <Compass className="text-blue-700 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800 text-center">
                5th–7th
              </h2>
              <p className="text-gray-600 text-center mt-3 text-sm">
                Build curiosity • Explore interests • Foundation skills
              </p>
            </motion.div>

            {/* 8th–10th */}
            <motion.div
              onClick={() => handleNavigate("/student-guidance/8th-10th")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 
                         hover:border-blue-300 hover:shadow-2xl transition cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <Target className="text-blue-700 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800 text-center">
                8th–10th
              </h2>
              <p className="text-gray-600 text-center mt-3 text-sm">
                Identify strengths • Choose subjects • Career direction
              </p>
            </motion.div>

            {/* 11th–12th PREMIUM */}
            <motion.div
              onClick={() =>
                handleNavigate("/student-guidance/11th-12th", true)
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-white p-8 rounded-3xl shadow-xl border 
                ${isPremium ? "border-blue-200" : "border-yellow-300"} 
                hover:shadow-2xl transition cursor-pointer`}
            >
              <div className="flex justify-center mb-4">
                {isPremium ? (
                  <GraduationCap className="text-blue-700 w-10 h-10" />
                ) : (
                  <Lock className="text-yellow-600 w-10 h-10" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-blue-800 text-center">
                11th–12th
                {isPremium ? "" : "(Premium)"}
              </h2>

              <p className="text-gray-600 text-center mt-3 text-sm">
                Career mapping • College planning • Entrance preparation
              </p>
            </motion.div>
          </div>

          {/* OTHER SECTIONS */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              Smart AI Tools for Your Growth
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "AI Career Predictor",
                  desc: "Find your ideal future career using AI prediction models.",
                },
                {
                  title: "Subject & Skill Mapping",
                  desc: "Understand which subjects match your strengths.",
                },
                {
                  title: "Personal Roadmap Builder",
                  desc: "Step-by-step customized learning plan.",
                },
                {
                  title: "Scholarship & College Insights",
                  desc: "Explore top colleges and scholarship options.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition"
                >
                  <h3 className="font-semibold text-blue-700 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WHY US */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              Why Choose CareerGenAI?
            </h2>

            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <Star className="text-yellow-500 w-6 h-6" />
                <p className="text-gray-700">
                  Trusted guidance backed by AI and educators.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <Star className="text-yellow-500 w-6 h-6" />
                <p className="text-gray-700">
                  Personalized insights for every student.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <Star className="text-yellow-500 w-6 h-6" />
                <p className="text-gray-700">Smart dashboards and clean UI.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden md:block w-[30%]">
          <ProgressSidebar />
        </div>
      </div>

      <footer className="text-center py-6 text-gray-600 text-sm mt-10 border-t">
        © {new Date().getFullYear()} CareerGenAI • AI-Driven Career Guidance
        Platform
      </footer>
    </div>
  );
}
