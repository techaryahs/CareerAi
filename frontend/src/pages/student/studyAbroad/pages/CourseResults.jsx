// src/studyAbroad/pages/CourseResults.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coursesData from "../data/courses.json";

const STORAGE_KEY = "study_abroad_user_data";

const CourseResults = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Load profile + selected countries
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !saved.selectedCountries || saved.selectedCountries.length === 0) {
      navigate("/services/study-abroad/countries");
      return;
    }
    setProfile(saved);
    setSelectedCourses(saved.selectedCoursesData || []);
  }, [navigate]);

  const toggleCourse = (course) => {
    setSelectedCourses((prev) => {
      const exists = prev.find((c) => c.id === course.id);
      if (exists) {
        return prev.filter((c) => c.id !== course.id);
      }
      return [...prev, course];
    });
  };

  const handleContinue = () => {
    const updated = {
      ...profile,
      selectedCoursesData: selectedCourses,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    navigate("/services/study-abroad/visa");
  };

  if (!profile) return null;

  // Filter courses based on selected countries + education level
  const filteredCourses = coursesData.filter(
    (course) =>
      profile.selectedCountries.includes(course.countryCode) &&
      course.level.includes(profile.educationLevel)
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Shortlist Courses & Universities
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            These courses align with your academic background, selected
            countries, and future goals. You may shortlist multiple options.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const selected = selectedCourses.find((c) => c.id === course.id);

            return (
              <div
                key={course.id}
                className={`rounded-3xl border bg-white p-6 shadow-sm transition
                  ${
                    selected
                      ? "border-indigo-600 shadow-md"
                      : "border-slate-200 hover:shadow-md"
                  }`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {course.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {course.university} · {course.country}
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-slate-700">
                  <li>
                    <b>Degree:</b> {course.level}
                  </li>
                  <li>
                    <b>Duration:</b> {course.duration}
                  </li>
                  <li>
                    <b>Annual Tuition:</b> {course.tuition}
                  </li>
                  <li>
                    <b>Intake:</b> {course.intake}
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => toggleCourse(course)}
                  className={`mt-6 w-full rounded-full px-6 py-2.5 text-sm font-semibold transition
                    ${
                      selected
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-600"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                  {selected ? "Remove from Shortlist" : "Shortlist Course"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
          <p className="text-sm text-slate-600">
            You can modify your shortlisted courses later during counselling.
          </p>

          <button
            onClick={handleContinue}
            disabled={selectedCourses.length === 0}
            className="rounded-full bg-indigo-600 px-10 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 disabled:bg-slate-400 transition"
          >
            Continue to Visa Guidance
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseResults;
