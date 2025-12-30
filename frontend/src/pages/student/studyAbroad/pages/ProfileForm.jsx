// src/studyAbroad/pages/ProfileForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "study_abroad_user_data";

const ProfileForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    educationLevel: "",
    stream: "",
    percentage: "",
    intake: "",
    budget: "",
    englishTest: "",
    preferredCountries: [],
  });

  const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "Ireland",
    "France",
    "Other",
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCountry = (country) => {
    setFormData((prev) => ({
      ...prev,
      preferredCountries: prev.preferredCountries.includes(country)
        ? prev.preferredCountries.filter((c) => c !== country)
        : [...prev.preferredCountries, country],
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    navigate("/services/study-abroad/countries");
  };

  const isDisabled =
    !formData.educationLevel ||
    !formData.stream ||
    !formData.percentage ||
    !formData.intake ||
    !formData.budget ||
    !formData.englishTest;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border px-6 py-10 md:px-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Build Your Study Abroad Profile
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            This information helps us suggest the most suitable countries,
            courses, and universities for you.
          </p>
        </div>

        {/* ================= EDUCATION ================= */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Academic Background
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Highest Education Level
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) => handleChange("educationLevel", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select</option>
                <option>12th Pass</option>
                <option>Diploma</option>
                <option>Bachelor’s Degree</option>
                <option>Master’s Degree</option>
              </select>
            </div>

            {/* Stream */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Stream / Field of Study
              </label>
              <input
                type="text"
                placeholder="e.g. Science, Commerce, Engineering"
                value={formData.stream}
                onChange={(e) => handleChange("stream", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Percentage */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Percentage / CGPA
              </label>
              <input
                type="text"
                placeholder="e.g. 72% or 7.5 CGPA"
                value={formData.percentage}
                onChange={(e) => handleChange("percentage", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Intake */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Intake
              </label>
              <select
                value={formData.intake}
                onChange={(e) => handleChange("intake", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select</option>
                <option>Fall (Aug / Sep)</option>
                <option>Spring (Jan)</option>
                <option>Summer</option>
              </select>
            </div>
          </div>
        </section>

        {/* ================= FINANCIAL ================= */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Financial Planning
          </h2>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Budget Range (Total)
          </label>
          <select
            value={formData.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select</option>
            <option>Below ₹10 Lakhs</option>
            <option>₹10 – ₹20 Lakhs</option>
            <option>₹20 – ₹30 Lakhs</option>
            <option>Above ₹30 Lakhs</option>
          </select>
        </section>

        {/* ================= EXAMS ================= */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            English Language Exam
          </h2>

          <select
            value={formData.englishTest}
            onChange={(e) => handleChange("englishTest", e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select</option>
            <option>Not Taken Yet</option>
            <option>IELTS</option>
            <option>TOEFL</option>
            <option>PTE</option>
            <option>Duolingo</option>
          </select>
        </section>

        {/* ================= COUNTRIES ================= */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Preferred Countries (Optional)
          </h2>

          <div className="flex flex-wrap gap-3">
            {countries.map((country) => {
              const selected = formData.preferredCountries.includes(country);
              return (
                <button
                  key={country}
                  type="button"
                  onClick={() => toggleCountry(country)}
                  className={`px-4 py-2 rounded-full border text-sm transition
                    ${
                      selected
                        ? "bg-indigo-50 border-indigo-600 text-indigo-700"
                        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  {country}
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className="rounded-full bg-indigo-600 px-10 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 disabled:bg-slate-400 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
