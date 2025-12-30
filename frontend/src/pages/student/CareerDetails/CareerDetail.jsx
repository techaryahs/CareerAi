import React, { useState } from "react";
import {
  Briefcase,
  Laptop,
  Book,
  DollarSign,
  TrendingUp,
  Star,
  Search,
} from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { roadmaps } from "../../data/roadMap";
import PremiumPopup from "../../../components/PremiumPlans/PremiumPlans";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

/* =======================
   HELPERS (DO NOT REMOVE)
   ======================= */

// normalize text for comparison
const normalize = (str = "") => str.toLowerCase().trim();

// category mapping based on YOUR DATA
const categoryMap = {
  technology: ["technology", "automation technology", "aerospace & technology"],
  "ai & machine learning": [
    "artificial intelligence",
    "ai & machine learning",
    "ai policy & ethics",
  ],
  creative: ["creative arts", "creative technology", "design", "media"],
  design: ["design", "creative arts", "creative technology"],
  media: ["media", "creative arts", "creative technology"],
  science: ["science", "science & nutrition", "data & analytics"],
  engineering: [
    "technology",
    "automation technology",
    "aerospace & technology",
  ],
  finance: ["finance", "business", "data & analytics"],
  healthcare: ["healthcare", "science & nutrition", "medical", "nutrition"],
  business: ["business", "management", "finance", "data & analytics"],
  legal: ["law", "policy", "ethics"],
  culinary: ["food", "nutrition", "science & nutrition"],
  education: ["education", "science", "technology"],
};

export default function Roadmap() {
  const { user, loading: authLoading } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const routerLocation = useLocation();

  // Build career cards from data
  const careers = Object.keys(roadmaps).map((key, index) => ({
    id: index + 1,
    title: roadmaps[key].title,
    field: roadmaps[key].field || "General",
    salary: roadmaps[key].salaryRange || "Salary",
    growth: roadmaps[key].growth || "Moderate",
    category: roadmaps[key].category || "General",
    emoji: roadmaps[key].emoji,
  }));

  const categories = [
    "All",
    "Technology",
    "AI & Machine Learning",
    "Creative",
    "Healthcare",
    "Education",
    "Finance",
    "Science",
    "Engineering",
    "Media",
    "Design",
    "Business",
    "Legal",
    "Culinary",
  ];

  useEffect(() => {
    if (routerLocation.state?.careerTitle) {
      const title = routerLocation.state.careerTitle;
      const roadmapData = roadmaps[title];

      if (roadmapData) {
        setSelectedCareer(roadmapData);

        setTimeout(() => {
          document
            .getElementById("roadmap-content")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [routerLocation.state]);

  /* =======================
     FIXED FILTER LOGIC
     ======================= */
  const filteredCareers = careers.filter((career) => {
    if (selectedCategory === "All") return true;

    const selected = normalize(selectedCategory);
    const careerCategory = normalize(career.category);
    const mappedCategories = categoryMap[selected];

    const matchCategory = mappedCategories
      ? mappedCategories.some((cat) => careerCategory.includes(cat))
      : careerCategory.includes(selected);

    const matchSearch = career.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  /* =======================
     PREMIUM CHECK
     ======================= */
  const handleView = (title) => {
    // ❌ Not premium → show popup
    if (!user?.isPremium) {
      setShowPremiumPopup(true);
      return;
    }

    // ✅ Premium user
    const roadmapData = roadmaps[title];
    if (!roadmapData) return alert("No roadmap found!");

    setSelectedCareer(roadmapData);
    setTimeout(() => {
      document
        .getElementById("roadmap-content")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  /* =======================
     PDF DOWNLOAD (Premium)
     ======================= */
const downloadPDF = async () => {
  if (!user?.isPremium) {
    setShowPremiumPopup(true);
    return;
  }

  const element = document.getElementById("roadmap-content");
  if (!element) return;

  // 🔥 CLONE NODE TO AVOID OKLCH
  const clone = element.cloneNode(true);

  // force safe colors
  clone.style.background = "#ffffff";
  clone.style.color = "#000000";

  clone.querySelectorAll("*").forEach(el => {
    el.style.backgroundColor = "#ffffff";
    el.style.color = "#000000";
    el.style.borderColor = "#000000";
  });

  clone.style.position = "fixed";
  clone.style.top = "-9999px";
  document.body.appendChild(clone);

  const canvas = await html2canvas(clone, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true
  });

  document.body.removeChild(clone);

const imgData = canvas.toDataURL("image/png");
const pdf = new jsPDF("p", "mm", "a4");

const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight = pdf.internal.pageSize.getHeight();

const imgHeight = (canvas.height * pdfWidth) / canvas.width;
let heightLeft = imgHeight;
let position = 0;

pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
heightLeft -= pdfHeight;

while (heightLeft > 0) {
  position -= pdfHeight;
  pdf.addPage();
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  heightLeft -= pdfHeight;
}

pdf.save(`${selectedCareer.title}_Roadmap.pdf`);

};


  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6 text-gray-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Explore Career Paths
        </h1>
        <p className="text-gray-600 mt-2">
          Discover careers that fit your passion and skills
        </p>
      </div>

      {/* Search & Filter */}
      {!selectedCareer && (
        <>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search career..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-1/3 border border-gray-300 rounded-lg py-2 px-3 bg-white"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Career Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredCareers.map((career) => (
              <div
                key={career.id}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
              >
                <Briefcase className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {career.title} {career.emoji}
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional role in the {career.field} field.
                </p>

                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {career.salary}
                  </span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    {career.growth}
                  </span>
                  <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {career.category}
                  </span>
                </div>

                <button
                  onClick={() => handleView(career.title)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Roadmap
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Roadmap Section */}
      {selectedCareer && (
        <>
          <div
            id="roadmap-content"
            className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto mt-12"
          >
            <h1 className="text-4xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <Laptop /> {selectedCareer.title} {selectedCareer.emoji}
            </h1>

            <p className="mb-8">{selectedCareer.overview}</p>

            {/* Education */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Book /> Education Path
              </h2>
              <ol className="list-decimal pl-6">
                {selectedCareer.education.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </section>

            {/* Skills */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-3">Skills Required</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <ul className="list-disc pl-5">
                  {selectedCareer.skills.technical.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <ul className="list-disc pl-5">
                  {selectedCareer.skills.soft.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <ul className="list-disc pl-5">
                  {selectedCareer.skills.tools.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Salary Overview */}
            {selectedCareer.salary && (
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <DollarSign /> Salary Overview
                </h2>
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th className="border p-2">Role</th>
                      <th className="border p-2">Experience</th>
                      <th className="border p-2">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCareer.salary.map((row, i) => (
                      <tr key={i}>
                        <td className="border p-2">{row.role}</td>
                        <td className="border p-2">{row.experience}</td>
                        <td className="border p-2">{row.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {/* Future Trends */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <TrendingUp /> Future Trends
              </h2>
              <ul className="list-disc pl-6">
                {selectedCareer.futureTrends.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>

            {/* Personality */}
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg flex justify-between items-center">
              <h3 className="font-semibold">
                Personality Type: {selectedCareer.personalityType}
              </h3>
              <Star className="text-yellow-500" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={downloadPDF}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              📄 Download Roadmap as PDF
            </button>
            <button
              onClick={() => setSelectedCareer(null)}
              className="px-6 py-3 bg-gray-300 rounded-lg"
            >
              ⬅ Back to Careers
            </button>
          </div>
        </>
      )}

      {/* Premium Popup */}
      {showPremiumPopup && (
        <PremiumPopup
          onClose={() => setShowPremiumPopup(false)}
          onUpgrade={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
