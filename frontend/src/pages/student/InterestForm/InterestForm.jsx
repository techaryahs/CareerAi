import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InterestForm.css";
import {
  FaCalculator,
  FaPalette,
  FaHandsHelping,
  FaCode,
  FaPenFancy,
  FaTree,
  FaUserCog,
  FaMicroscope,
  FaLaptop,
  FaHeartbeat,
  FaChartLine,
  FaComments,
  FaSearch,
  FaPuzzlePiece,
  FaChalkboardTeacher,
  FaLightbulb,
  FaChartBar,
  FaPaintBrush,
} from "react-icons/fa";
// import PremiumPopup from '../components/PremiumPlans';
import PageLoader from "../../../components/PageLoader/PageLoader"; // ✅ import the loader
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const interestsList = [
  { label: "Mathematics", icon: <FaCalculator /> },
  { label: "Designing", icon: <FaPalette /> },
  { label: "Helping People", icon: <FaHandsHelping /> },
  { label: "Coding", icon: <FaCode /> },
  { label: "Writing", icon: <FaPenFancy /> },
  { label: "Nature", icon: <FaTree /> },
  { label: "Management", icon: <FaUserCog /> },
  { label: "Science", icon: <FaMicroscope /> },
  { label: "Art", icon: <FaPaintBrush /> },
  { label: "Technology", icon: <FaLaptop /> },
  { label: "Health", icon: <FaHeartbeat /> },
  { label: "Business", icon: <FaChartLine /> },
  { label: "Communication", icon: <FaComments /> },
  { label: "Research", icon: <FaSearch /> },
  { label: "Analysis", icon: <FaChartBar /> },
  { label: "Problem Solving", icon: <FaPuzzlePiece /> },
  { label: "Teaching", icon: <FaChalkboardTeacher /> },
  { label: "Creativity", icon: <FaLightbulb /> },
];

export default function InterestForm() {
  const [selected, setSelected] = useState([]);
  const [careers, setCareers] = useState([]);
  const [showCareers, setShowCareers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // ✅ page loader state
  const [errorMsg, setErrorMsg] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [, setUser] = useState(null);
  // const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const { user } = useAuth();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const localUser = user;
    if (localUser?.email) {
      fetch(`${API}/api/user/${localUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setUser(localUser);
        });
    }

    // ✅ Fake delay for nice page loader effect
    const timer = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [API, user]);

  const toggleSelect = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleSuggest = async () => {
    if (selected.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    // if (!user?.isPremium) {
    //   setShowPremiumPopup(true);
    //   return;
    // }

    setLoading(true);
    setShowCareers(false);
    setErrorMsg("");
    setCareers([]);

    try {
      const res = await axios.post(`${API}/api/careers/recommend`, {
        interests: selected,
      });

      if (Array.isArray(res.data.careers)) {
        // ⏳ Add a fake 1 sec delay before showing careers
        setTimeout(() => {
          setCareers(res.data.careers);
          setShowCareers(true);
          setLoading(false); // stop loader after delay
        }, 1000);
      } else {
        setErrorMsg("⚠️ Received unexpected response. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 402) {
        setErrorMsg(
          "⚠️ You've hit your free quota limit. Try again later or reduce selections."
        );
      } else {
        setErrorMsg(
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4 text-center">
            😔 Sorry! We couldn’t fetch recommendations right now.
            <br />
            🚀 Don’t worry, we’ll fix this issue quickly, please try again soon.
          </div>
        );
      }
      setLoading(false);
    }
  };

  // ✅ keep this outside handleSuggest but inside InterestForm
  const filteredCareers = careers.filter(
    (c) => activeCategory === "All" || c.category === activeCategory
  );

  if (pageLoading) {
    return <PageLoader />; // ✅ page loader
  }

  return (
    <div className="interest-page-container">
      <h2>Select Your Interests</h2>

      <div className="interest-grid">
        {interestsList.map((interest, idx) => (
          <div
            key={idx}
            className={`interest-item ${
              selected.includes(interest.label) ? "selected" : ""
            }`}
            onClick={() => toggleSelect(interest.label)}
          >
            <span className="icon">{interest.icon}</span>
            <span>{interest.label}</span>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="btn-prim" onClick={handleSuggest} disabled={loading}>
          {loading ? "Generating..." : "Get Career Suggestions"}
        </button>
        <button
          className="btn-second"
          onClick={() => {
            setSelected([]);
            setShowCareers(false);
            setCareers([]);
            setActiveCategory("All");
            setErrorMsg("");
          }}
        >
          Clear Selection
        </button>
      </div>

      {loading && <PageLoader />}
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      {showCareers && (
        <div className="career-suggestions">
          <h3>Recommended Careers</h3>

          <div className="filter-chips">
            {["All", ...new Set(careers.map((c) => c.category))].map(
              (cat, i) => (
                <span
                  key={i}
                  className={`chip ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </span>
              )
            )}
          </div>

          <div className="career-list grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {filteredCareers.map((career, index) => (
              <div
                key={index}
                className="career-card bg-white rounded-2xl shadow-lg p-6 border border-gray-100 
                 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-2xl font-bold text-gray-800">
                    {career.title}
                  </h4>
                  <span className="badge text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                    {career.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                  {career.description}
                </p>

                {/* Info Grid (2 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {/* Skills */}
                  <div>
                    <h5 className="font-semibold text-indigo-600 mb-2">
                      Required Skills
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {career.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education Roadmap */}
                  <div>
                    <h5 className="font-semibold text-green-600 mb-2">
                      Education Roadmap
                    </h5>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {career.roadmap?.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Salary & Growth */}
                  <div>
                    <h5 className="font-semibold text-pink-600 mb-2">
                      Salary & Growth
                    </h5>
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <strong className="block text-pink-700">
                        {career.salary}
                      </strong>
                      <p className="text-xs text-gray-500">
                        Growth potential varies by field
                      </p>
                    </div>
                  </div>

                  {/* Top Colleges */}
                  <div>
                    <h5 className="font-semibold text-yellow-600 mb-2">
                      Top Colleges
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {career.colleges?.map((c) => (
                        <span
                          key={c}
                          className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/careerDetail"
                    state={{
                      careerTitle: career.title,
                      roadmapKey: career.roadmapKey, // 🔥 IMPORTANT
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center justify-center mx-auto"
                  >
                    Get Roadmap
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {showPremiumPopup && (
        <PremiumPopup
          onClose={() => setShowPremiumPopup(false)}
          onUpgrade={() => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setUser(updatedUser);
            setShowPremiumPopup(false);
            handleSuggest();
          }}
        />
      )} */}
    </div>
  );
}
