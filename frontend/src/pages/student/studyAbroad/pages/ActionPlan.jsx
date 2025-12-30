// src/studyAbroad/pages/ActionPlan.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "study_abroad_user_data";

const ActionPlan = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !saved.selectedCoursesData) {
      navigate("/services/study-abroad/profile");
      return;
    }
    setProfile(saved);
  }, [navigate]);

  if (!profile) return null;

  const timeline = [
    {
      month: "Month 1",
      title: "Profile Preparation",
      steps: [
        "Finalize country & course shortlist",
        "Check eligibility criteria",
        "Start English exam preparation",
      ],
    },
    {
      month: "Month 2",
      title: "Documentation",
      steps: [
        "Prepare Statement of Purpose (SOP)",
        "Arrange Letters of Recommendation (LOR)",
        "Collect academic transcripts",
      ],
    },
    {
      month: "Month 3",
      title: "University Applications",
      steps: [
        "Apply to shortlisted universities",
        "Track application status",
        "Prepare for conditional offers",
      ],
    },
    {
      month: "Month 4",
      title: "Offer & Acceptance",
      steps: [
        "Review offer letters",
        "Pay deposit / confirm admission",
        "Arrange financial documents",
      ],
    },
    {
      month: "Month 5",
      title: "Visa Process",
      steps: [
        "Prepare visa documents",
        "Book biometrics / interview",
        "Submit visa application",
      ],
    },
    {
      month: "Month 6",
      title: "Pre-Departure",
      steps: [
        "Book accommodation",
        "Arrange travel & insurance",
        "Attend pre-departure briefing",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Your Personalized Study Abroad Action Plan
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            This roadmap is tailored based on your academic profile, selected
            countries, shortlisted courses, and visa requirements.
          </p>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-3xl border shadow-sm p-6 mb-12">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Profile Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
            <p><b>Education:</b> {profile.educationLevel}</p>
            <p><b>Stream:</b> {profile.stream}</p>
            <p><b>Budget:</b> {profile.budget}</p>
            <p><b>Intake:</b> {profile.intake}</p>
            <p><b>English Exam:</b> {profile.englishTest}</p>
            <p><b>Countries:</b> {profile.selectedCountries.join(", ")}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {timeline.map((phase, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  {phase.month}: {phase.title}
                </h3>
              </div>

              <ul className="list-disc list-inside text-slate-700 space-y-2 text-sm">
                {phase.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-indigo-50 border border-indigo-200 rounded-3xl px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Take the Next Step with Confidence
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            You now have a clear roadmap. For expert review, document support,
            or application assistance, connect with our counsellors.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            <button
              className="rounded-full bg-indigo-600 px-8 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              Download Action Plan (PDF)
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="rounded-full border border-slate-300 px-8 py-3 text-slate-700 font-semibold hover:bg-slate-100 transition"
            >
              Talk to Counsellor
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActionPlan;
