// src/dropout/pages/DropoutInfo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const STORAGE_KEY = "dropout_user_data";

const DropoutInfo = () => {
  const navigate = useNavigate();

  // 🔹 Load existing data safely (if user comes back / refreshes)
  const [localData, setLocalData] = useState({
    status: "",
    stream: "",
    age: "",
    degree: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setLocalData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };

    if (field === "stream") {
      newData.degree = ""; // reset degree on stream change
    }

    setLocalData(newData);
  };

  const handleNext = () => {
    // ✅ Persist data globally for next pages
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localData));
    navigate("/services/dropout/path-choice");
  };

  const statusOptions = [
    "Dropped out before 10th",
    "Dropped out after 10th",
    "Dropped out after 11th",
    "Dropped out after 12th",
    "Dropped out from college",
  ];

  const streamOptions = ["Science", "Commerce", "Arts", "Vocational", "Other"];

  const degreesByStream = {
    Science: [
      "Engineering (B.Tech / BE)",
      "Medical / Healthcare (MBBS / BDS / Nursing / Pharmacy)",
      "Science (B.Sc Physics / Chemistry / Biology / CS / IT)",
    ],
    Commerce: [
      "Commerce (B.Com General / Accounting / Finance / Banking)",
      "Management (BBA / BMS Marketing, HR)",
      "Professional Commerce Courses (CA, CS, CMA, CFA)",
    ],
    Arts: [
      "Arts / Humanities (BA Psychology, Economics, Political Science)",
      "Fine Arts / Design (BA / BFA / B.Des Animation, Fashion)",
      "Journalism & Mass Communication",
      "Law (BA LLB / LLB)",
    ],
    Vocational: [
      "Vocational IT (Diplomas in Web Dev, Software, Hardware & Networking)",
      "Vocational Engineering (Diplomas in Mechanical / Civil / Automobile / Electrical)",
      "Vocational Design / Hospitality (Diplomas in Fashion / Interior Design, Hotel Management, Beauty / Cosmetology, Paramedical)",
    ],
    Other: ["Other (Distance / online degrees, Skill-first programs)"],
  };

  const degreeOptions = degreesByStream[localData.stream] || [];

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg px-6 py-8 md:px-10 md:py-10">

        <ProgressBar currentStep={1} totalSteps={5} />

        <div className="text-center mt-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
            Tell us about your situation
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Answer a few quick questions so your options match your real story.
          </p>
        </div>

        {/* STATUS */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">What is your current status?</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleChange("status", status)}
                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                  localData.status === status
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* STREAM */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Stream</h3>
          <div className="flex flex-wrap gap-3">
            {streamOptions.map((stream) => (
              <button
                key={stream}
                onClick={() => handleChange("stream", stream)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  localData.stream === stream
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>

        {/* DEGREE */}
        {localData.status === "Dropped out from college" && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Which degree were you pursuing?</h3>
            <div className="flex flex-wrap gap-3">
              {degreeOptions.map((degree) => (
                <button
                  key={degree}
                  onClick={() => handleChange("degree", degree)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    localData.degree === degree
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {degree}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AGE */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Your age</h3>
          <input
            type="number"
            value={localData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="w-full rounded-2xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your age"
          />
        </div>

        {/* NEXT */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={
              !localData.status ||
              !localData.stream ||
              !localData.age ||
              (localData.status === "Dropped out from college" && !localData.degree)
            }
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-full px-8 py-2.5"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default DropoutInfo;
