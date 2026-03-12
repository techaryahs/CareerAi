import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Zap,
  AlertCircle,
  Brain,
  Target,
  Lightbulb,
  Star,
  Users,
  TrendingUp,
  Lock
} from "lucide-react";

import { logStudentActivity } from "../../../utils/logActivity";
import { useAuth } from "../../../context/AuthContext";
import PremiumPlans from "../../../components/PremiumPlans/PremiumPlans";

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
const CareerDifferencesAnalyzer = () => {
  const startTime = useRef(Date.now());
  const [career1, setCareer1] = useState("");
  const [career2, setCareer2] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const isPremium = user?.isPremium == true;
  // ⭐ PREMIUM CHECK


  // ⭐ POPUP STATE
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const [careerSuggestions] = useState([
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX/UI Designer",
    "DevOps Engineer",
    "Marketing Manager",
    "Doctor (MBBS)",
    "Teacher",
    "Lawyer",
    "Web Developer",
    "Cybersecurity Analyst",
    "Entrepreneur",
    "Consultant",
  ]);

  const [filteredSuggestions1, setFilteredSuggestions1] = useState([]);
  const [filteredSuggestions2, setFilteredSuggestions2] = useState([]);
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);



  const filterSuggestions = (input, setFiltered, setShow) => {
    if (!input) return setShow(false);
    const filtered = careerSuggestions.filter((s) =>
      s.toLowerCase().includes(input.toLowerCase())
    );
    setFiltered(filtered.slice(0, 8));
    setShow(true);
  };

  // ------------------------------------------------------------------
  // GENERATE DIFFERENCES
  // ------------------------------------------------------------------
  const generateDifferences = async () => {
    if (!career1.trim() || !career2.trim()) {
      return setError("Please enter both career fields.");
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/data/Career_Comparision.json");
      const careerData = await response.json();

      // ⭐ CASE-INSENSITIVE MATCHING
      const input1 = career1.trim().toLowerCase();
      const input2 = career2.trim().toLowerCase();

      const matchedKey1 = Object.keys(careerData).find(
        (key) => key.toLowerCase() === input1
      );

      const matchedKey2 = Object.keys(careerData).find(
        (key) => key.toLowerCase() === input2
      );

      if (!matchedKey1 || !matchedKey2) {
        setError("Career not found in JSON file.");
        setLoading(false);
        return;
      }

      const data1 = careerData[matchedKey1];
      const data2 = careerData[matchedKey2];

      // 🔥 STORE FREE & PREMIUM DATA SEPARATELY
      setAnalysis({
        career1: { name: matchedKey1, free: data1.free, premium: data1.premium },
        career2: { name: matchedKey2, free: data2.free, premium: data2.premium },

        summary: `${matchedKey1} and ${matchedKey2} differ based on responsibilities, skills, education, salary, and industry demand.`,
        keyInsight: `The biggest difference is that ${data1.free.summary.toLowerCase()}, while ${data2.free.summary.toLowerCase()}.`,
      });

      // ✅ LOG ACTIVITY
      const durationInSeconds = Math.max(
        1,
        Math.floor((Date.now() - startTime.current) / 1000)
      );

      await logStudentActivity(
        "CAREER_COMPARE",
        "Compared Careers",
        `Student compared ${matchedKey1} vs ${matchedKey2}`,
        {
          career1: matchedKey1,
          career2: matchedKey2
        },
        durationInSeconds,   // duration
        null,                // score (no score here)
        "Completed"
      );

      // Reset start time for next action
      startTime.current = Date.now();

    } catch (err) {
      setError("Failed to load Career_Comparision.json");
    }

    setLoading(false);
  };

  // ------------------------------------------------------------------
  // UI
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50">

      {/* ⭐ PREMIUM POPUP */}
      {showPremiumPopup && (
        <PremiumPlans onClose={() => setShowPremiumPopup(false)} />
      )}

      {/* HEADER */}
      <div className="max-w-3xl mx-auto pt-16 text-center px-4">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-lg">
          <Users className="w-10 h-10 text-blue-600" />
        </div>

        <h1 className="text-4xl font-bold mt-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Courses & Career Analyzer
        </h1>

        <p className="text-gray-700 mt-3 text-lg">
          Compare two career fields and discover key differences with AI-powered insights.
        </p>
      </div>

      {/* SEARCH BOX */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 rounded-2xl">

          <div className="grid md:grid-cols-2 gap-6">
            {/* CAREER 1 */}
            <div className="relative">
              <label className="font-semibold text-gray-800">Career Field A</label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={career1}
                  onChange={(e) => {
                    setCareer1(e.target.value);
                    filterSuggestions(e.target.value, setFilteredSuggestions1, setShowSuggestions1);
                  }}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              {showSuggestions1 && filteredSuggestions1.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border">
                  {filteredSuggestions1.map((item, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        setCareer1(item);
                        setShowSuggestions1(false);
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* CAREER 2 */}
            <div className="relative">
              <label className="font-semibold text-gray-800">Career Field B</label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={career2}
                  onChange={(e) => {
                    setCareer2(e.target.value);
                    filterSuggestions(e.target.value, setFilteredSuggestions2, setShowSuggestions2);
                  }}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="e.g., Data Scientist"
                />
              </div>

              {showSuggestions2 && filteredSuggestions2.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border">
                  {filteredSuggestions2.map((item, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        setCareer2(item);
                        setShowSuggestions2(false);
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={generateDifferences}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 flex items-center justify-center gap-2"
          >
            {loading ? "Analyzing..." : (<><Zap className="w-5 h-5" /> Generate Comparison</>)}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-6 h-6" />
            {error}
          </div>
        )}
      </div>

      {/* RESULTS */}
      {analysis && (
        <div className="max-w-5xl mx-auto px-4 mt-16 space-y-12">

          {/* SUMMARY */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Brain className="w-8 h-8 text-blue-500" />
              Career Comparison Overview
            </h2>

            <p className="text-gray-700 text-lg text-center mt-4">{analysis.summary}</p>

            <div className="mt-6 flex items-start gap-3 bg-gradient-to-r from-purple-100 to-purple-200 p-5 rounded-xl border border-purple-300 shadow-md">
              <Star className="w-6 h-6 text-purple-700 mt-1" />
              <p className="text-purple-900 font-semibold text-base">{analysis.keyInsight}</p>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 gap-8">
            <CareerCard
              data={analysis.career1}
              isPremium={isPremium}
              color="blue"
              openPremiumPopup={() => setShowPremiumPopup(true)}
            />

            <CareerCard
              data={analysis.career2}
              isPremium={isPremium}
              color="purple"
              openPremiumPopup={() => setShowPremiumPopup(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDifferencesAnalyzer;

// ------------------------------------------------------------------
// REUSABLE CARD COMPONENT
// ------------------------------------------------------------------
const CareerCard = ({ data, isPremium, color, openPremiumPopup }) => {
  return (
    <div className="rounded-2xl bg-white shadow-lg border border-gray-200 p-8 hover:shadow-2xl transition-all">

      {/* TITLE */}
      <h3
        className={`text-2xl font-bold bg-gradient-to-r from-${color}-600 to-${color}-400 bg-clip-text text-transparent mb-6`}
      >
        {data.name}
      </h3>

      {/* FREE SECTION */}
      <SectionTitle icon={<Lightbulb className={`w-5 h-5 text-${color}-500`} />} title="Summary" />
      <p className="text-gray-700">{data.free.summary}</p>

      <SectionTitle icon={<Target className={`w-5 h-5 text-${color}-500`} />} title="Responsibilities" />
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {data.free.responsibilities?.map((r, i) => <li key={i}>{r}</li>)}
      </ul>

      <SectionTitle icon={<Brain className={`w-5 h-5 text-${color}-500`} />} title="Skills Required" />
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {data.free.skills?.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <SectionTitle icon={<Users className={`w-5 h-5 text-${color}-500`} />} title="Education" />
      <p className="text-gray-700">{data.free.education}</p>

      <SectionTitle icon={<Star className={`w-5 h-5 text-${color}-500`} />} title="Salary Range" />
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Entry Level: {data.free.salary.entry}</li>
        <li>Mid Level: {data.free.salary.mid}</li>
        <li>Senior Level: {data.free.salary.senior}</li>
      </ul>

      {/* PREMIUM PREVIEW FOR FREE USERS */}
      {!isPremium && (
        <div className="mt-6 bg-yellow-50 border border-yellow-300 p-4 rounded-xl text-yellow-900">
          <p className="font-semibold mb-3">
            Want deeper insights? Premium unlocks <span className="font-bold">10 advanced comparison points</span>:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Career Growth</li>
            <li>Work Environment</li>
            <li>Tools Used</li>
            <li>Career Roadmap</li>
            <li>Pros of the Career</li>
            <li>Cons of the Career</li>
            <li>Competition Level</li>
            <li>Work-Life Balance</li>
            <li>Job Security</li>
            <li>Top Hiring Companies</li>
          </ul>

          <button
            onClick={openPremiumPopup}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600
                 text-white py-3 rounded-xl font-bold shadow-lg hover:opacity-90"
          >
            Unlock Full Comparison
          </button>
        </div>
      )}

      {/* PREMIUM SECTION */}
      {isPremium && (
        <>
          <SectionTitle icon={<TrendingUp className={`w-5 h-5 text-${color}-500`} />} title="Career Growth" />
          <p className="text-gray-700">{data.premium.careerGrowth}</p>

          <SectionTitle icon={<Users className={`w-5 h-5 text-${color}-500`} />} title="Work Environment" />
          <p className="text-gray-700">{data.premium.workEnvironment}</p>

          <SectionTitle icon={<Zap className={`w-5 h-5 text-${color}-500`} />} title="Tools Used" />
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.premium.tools?.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <SectionTitle icon={<TrendingUp className={`w-5 h-5 text-${color}-500`} />} title="Career Roadmap" />
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>{data.premium.roadmap.step1}</li>
            <li>{data.premium.roadmap.step2}</li>
            <li>{data.premium.roadmap.step3}</li>
            <li>{data.premium.roadmap.step4}</li>
          </ol>

          <SectionTitle title="Pros" icon={<Star className={`w-5 h-5 text-${color}-500`} />} />
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.premium.pros?.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <SectionTitle title="Cons" icon={<AlertCircle className={`w-5 h-5 text-${color}-500`} />} />
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.premium.cons?.map((c, i) => <li key={i}>{c}</li>)}
          </ul>

          <SectionTitle title="Competition Level" icon={<Users className={`w-5 h-5 text-${color}-500`} />} />
          <p className="text-gray-700">{data.premium.competitionLevel}</p>

          <SectionTitle title="Work-life Balance" icon={<Users className={`w-5 h-5 text-${color}-500`} />} />
          <p className="text-gray-700">{data.premium.workLifeBalance}</p>

          <SectionTitle title="Job Security" icon={<Users className={`w-5 h-5 text-${color}-500`} />} />
          <p className="text-gray-700">{data.premium.jobSecurity}</p>

          <SectionTitle title="Freelancing Opportunities" icon={<Users className={`w-5 h-5 text-${color}-500`} />} />
          <p className="text-gray-700">{data.premium.freelancingOpportunities}</p>

          <SectionTitle title="Top Companies Hiring" icon={<Users className={`w-5 h-5 text-${color}-500`} />} />
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.premium.topCompaniesHiring?.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </>
      )}

    </div>
  );
};

// ------------------------------------------------------------------
const SectionTitle = ({ icon, title }) => (
  <div className="pt-4 mt-4 border-t flex items-center gap-2">
    {icon}
    <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
  </div>
);