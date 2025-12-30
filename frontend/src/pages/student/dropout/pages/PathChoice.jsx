// src/dropout/pages/PathChoice.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const STORAGE_KEY = "dropout_user_data";

const PathChoice = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  // 🔹 Load saved data (safe on refresh)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.focus) {
        setSelected(data.focus);
      }
    }
  }, []);

  const handleSelect = (focus) => {
    setSelected(focus);

    // 🔹 Update shared dropout data
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const updated = { ...existing, focus };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 🔹 Navigate using YOUR EXACT ROUTES
    if (focus === "education") {
      navigate("/services/dropout/education-results");
    } else {
      navigate("/services/dropout/job-results");
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg px-6 py-8 md:px-10 md:py-10">

        <ProgressBar currentStep={2} totalSteps={5} />

        <div className="text-center mt-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            What do you want to focus on right now?
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            You can always explore both later. Choose the path you want help with first.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* 🎓 Education */}
          <button
            type="button"
            onClick={() => handleSelect("education")}
            className={`group flex flex-col items-start rounded-2xl border-2 px-5 py-6 text-left transition-all
              ${
                selected === "education"
                  ? "border-indigo-600 bg-indigo-50 shadow-md"
                  : "border-gray-200 bg-gray-50 hover:bg-indigo-50/60 hover:border-indigo-300"
              }`}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-3">
              🎓
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              Continue or restart education
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Get exams, courses, and degree options that match your profile.
            </p>
            {selected === "education" && (
              <span className="mt-3 text-xs font-semibold text-indigo-600">
                Selected
              </span>
            )}
          </button>

          {/* 💼 Job */}
          <button
            type="button"
            onClick={() => handleSelect("job")}
            className={`group flex flex-col items-start rounded-2xl border-2 px-5 py-6 text-left transition-all
              ${
                selected === "job"
                  ? "border-indigo-600 bg-indigo-50 shadow-md"
                  : "border-gray-200 bg-gray-50 hover:bg-indigo-50/60 hover:border-indigo-300"
              }`}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-3">
              💼
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              Start working and earning
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Discover job roles, skill courses, and earning options.
            </p>
            {selected === "job" && (
              <span className="mt-3 text-xs font-semibold text-indigo-600">
                Selected
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PathChoice;
