// src/studyAbroad/pages/VisaGuide.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import visaInfoData from "../data/visaInfo.json";

const STORAGE_KEY = "study_abroad_user_data";

const VisaGuide = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !saved.selectedCountries || !saved.selectedCoursesData) {
      navigate("/services/study-abroad/profile");
      return;
    }
    setProfile(saved);
  }, [navigate]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Student Visa Guidance
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            Country-wise visa requirements, timelines, and approval tips
            based on your shortlisted destinations.
          </p>
        </div>

        {/* Visa Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {profile.selectedCountries.map((code) => {
            const info = visaInfoData[code];
            if (!info) return null;

            return (
              <div
                key={code}
                className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {info.country}
                </h3>

                <ul className="space-y-2 text-sm text-slate-700">
                  <li><b>Visa Type:</b> {info.visa}</li>
                  <li><b>English Exam:</b> {info.exam}</li>
                  <li><b>Financial Proof:</b> {info.funds}</li>
                  <li><b>Processing Time:</b> {info.processing}</li>
                  <li><b>Success Rate:</b> {info.success}</li>
                </ul>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-800 mb-2">
                    Key Approval Tips
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {info.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-indigo-50 border border-indigo-200 rounded-3xl px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Ready for Your Personalized Action Plan?
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            We’ll convert your profile, courses, and visa requirements into
            a clear step-by-step timeline.
          </p>

          <button
            onClick={() => navigate("/services/study-abroad/action-plan")}
            className="mt-6 rounded-full bg-indigo-600 px-10 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            View My Action Plan
          </button>
        </div>

      </div>
    </div>
  );
};

export default VisaGuide;
