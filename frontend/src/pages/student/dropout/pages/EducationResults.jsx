// src/dropout/pages/EducationResults.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import ResultsList from "../components/ResultsList";
import educationPaths from "../data/educationPaths.json";
import matchEducationPaths from "../utils/educationMatcher";

const STORAGE_KEY = "dropout_user_data";

// one-word / short interest options
const interestOptions = [
  "Coding",
  "Technology",
  "Business",
  "Money",
  "Design",
  "Creativity",
  "Health",
  "Helping",
  "Science",
  "Problem-Solving",
  "People",
  "Media",
  "Teaching",
  "Hands-on",
];

// emojis for each interest
const interestEmojis = {
  Coding: "💻",
  Technology: "🖥️",
  Business: "📈",
  Money: "💰",
  Design: "🎨",
  Creativity: "✨",
  Health: "💙",
  Helping: "🤝",
  Science: "🔬",
  "Problem-Solving": "🧠",
  People: "🗣️",
  Media: "🎥",
  Teaching: "📚",
  "Hands-on": "🛠️",
};

const EducationResults = () => {
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);
  const [filteredPaths, setFilteredPaths] = useState([]);

  // 🔹 Load saved interests on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    if (saved.interests) {
      setInterests(saved.interests);
    }
  }, []);

  const handleInterestChange = (interest) => {
    const newInterests = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];

    setInterests(newInterests);

    // 🔹 Persist globally
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existing, interests: newInterests })
    );
  };

  const handleGetSuggestions = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    if (interests.length > 0) {
      const matched = matchEducationPaths(
        { ...saved, interests },
        educationPaths
      );
      setFilteredPaths(matched);

      // scroll to results
      setTimeout(() => {
        const el = document.getElementById("results-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      setFilteredPaths([]);
    }
  };

  const handleViewDetails = (path) => {
    // 🔹 Save selected path
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...saved, selectedPath: path })
    );

    // 🔹 Navigate using your exact route
    navigate(`/services/dropout/path/${path.id}`);
  };

  const handleClear = () => {
    setInterests([]);
    setFilteredPaths([]);

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...saved, interests: [] })
    );
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 flex justify-center">
      <div className="w-full max-w-5xl mx-auto">

        <ProgressBar currentStep={3} totalSteps={5} />

        {/* Heading */}
        <div className="text-center mt-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Select Your Interests
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Choose what excites you most so we can match better education options.
          </p>
        </div>

        {/* Interest grid */}
        <div className="bg-white rounded-3xl shadow-lg px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {interestOptions.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestChange(interest)}
                  className={`flex flex-col items-center justify-center rounded-2xl border px-4 py-4 text-sm transition-all
                    ${
                      selected
                        ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm"
                        : "bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/60"
                    }`}
                >
                  <div className="mb-2 w-9 h-9 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg">
                    {interestEmojis[interest]}
                  </div>
                  {interest}
                </button>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button
              type="button"
              onClick={handleGetSuggestions}
              disabled={interests.length === 0}
              className="w-full md:w-1/2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-full py-3"
            >
              Get Education Suggestions
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="w-full md:w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full py-3"
            >
              Clear Selection
            </button>
          </div>
        </div>

        {/* Results */}
        {filteredPaths.length > 0 && (
          <div id="results-section" className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Recommended Education Paths
            </h3>

            <ResultsList
              paths={filteredPaths}
              type="education"
              onViewDetails={handleViewDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationResults;
