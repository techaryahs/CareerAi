// src/studyAbroad/pages/CountryResults.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import countriesData from "../data/countries.json";

const STORAGE_KEY = "study_abroad_user_data";

const CountryResults = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);

  // Load user profile
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setProfile(saved);
      setSelectedCountries(saved.selectedCountries || []);
    } else {
      navigate("/services/study-abroad/profile");
    }
  }, [navigate]);

  const toggleCountry = (countryCode) => {
    setSelectedCountries((prev) =>
      prev.includes(countryCode)
        ? prev.filter((c) => c !== countryCode)
        : [...prev, countryCode]
    );
  };

  const handleContinue = () => {
    const updated = {
      ...profile,
      selectedCountries,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    navigate("/services/study-abroad/courses");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Explore Study Destinations
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            Based on your academic profile and budget, these countries offer
            the most suitable study opportunities. You may select more than one.
          </p>
        </div>

        {/* Country Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {countriesData.map((country) => {
            const selected = selectedCountries.includes(country.code);

            return (
              <div
                key={country.code}
                className={`rounded-3xl border bg-white p-6 shadow-sm transition
                  ${
                    selected
                      ? "border-indigo-600 shadow-md"
                      : "border-slate-200 hover:shadow-md"
                  }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {country.flag} {country.name}
                  </h3>
                  {selected && (
                    <span className="text-xs font-semibold text-indigo-600">
                      Selected
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-sm text-slate-700">
                  <li>
                    <b>Tuition Range:</b> {country.tuition}
                  </li>
                  <li>
                    <b>Work Rights:</b> {country.workRights}
                  </li>
                  <li>
                    <b>Visa Success:</b> {country.visaSuccess}
                  </li>
                  <li>
                    <b>PR / Stay Options:</b> {country.prOptions}
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => toggleCountry(country.code)}
                  className={`mt-6 w-full rounded-full px-6 py-2.5 text-sm font-semibold transition
                    ${
                      selected
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-600"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                  {selected ? "Remove Selection" : "Select Country"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
          <p className="text-sm text-slate-600">
            You can refine or change countries later while selecting courses.
          </p>

          <button
            onClick={handleContinue}
            disabled={selectedCountries.length === 0}
            className="rounded-full bg-indigo-600 px-10 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 disabled:bg-slate-400 transition"
          >
            Continue to Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryResults;
