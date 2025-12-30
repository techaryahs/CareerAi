import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import data from "./india_vs_abroad.json";

export default function CompareResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const field = location.state?.field;

  if (!field || !data[field]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Career not found</h1>
          <button
            onClick={() => navigate("/india-vs-abroad")}
          className="
  bg-blue-600
  text-white
  px-8 py-3
  rounded-xl
  font-semibold
  shadow-md
  hover:bg-blue-700
  transition
"

          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // const career = data[field];
  const career = data[field];

if (!career.india || !career.abroad) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Comparison data coming soon
        </h1>
        <p className="text-gray-600 mb-6">
          We are adding detailed India vs Abroad insights for this career.
        </p>
        <button
          onClick={() => navigate("/india-vs-abroad")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/india-vs-abroad")}
           className="
  bg-blue-600
  text-white
  px-8 py-3
  rounded-xl
  font-semibold
  shadow-md
  hover:bg-blue-700
  transition
"

          >
            <ChevronLeft />
            Back
          </button>
          <h1 className="font-bold text-lg">CareerGenAI</h1>
          <div />
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-14">
        {/* TITLE */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-3">
            {career.meta.title}
          </h1>
          <p className="text-lg text-gray-600">
            Domain: {career.meta.domain} • India vs Abroad
          </p>
        </div>

        {/* COMPARISON */}
        <div className="grid md:grid-cols-2 gap-10">
          <ComparisonCard title="India 🇮🇳" data={career.india} />
          <ComparisonCard title="Abroad 🌍" data={career.abroad} />
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center gap-6 mt-16">
          <button
            onClick={() => navigate("/india-vs-abroad")}
           className="
  bg-blue-600
  text-white
  px-8 py-3
  rounded-xl
  font-semibold
  shadow-md
  hover:bg-blue-700
  transition
"
          >
            <ChevronLeft />
            Choose Another Career
          </button>

          <button
            onClick={() => navigate("/")}
         className="
  bg-blue-600
  text-white
  px-8 py-3
  rounded-xl
  font-semibold
  shadow-md
  hover:bg-blue-700
  transition
"
          >
            Home
            <ChevronRight />
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t mt-20 py-10 text-center text-gray-600">
        © 2024 CareerGenAI — Career guidance for students
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ComparisonCard({ title, data }) {
  return (
   <div className="bg-white rounded-2xl shadow-md p-8">

      <h2 className="text-xl font-semibold text-gray-900 mb-4">
{title}</h2>

      <Feature label="Education Quality" value={data.education_quality} />
      <Feature label="Average Salary" value={data.average_salary} />
      <Feature label="Education Cost" value={data.education_cost} />
      <Feature label="ROI" value={data.roi} />
      <Feature label="Job Market" value={data.job_market} />
      <Feature label="Career Growth" value={data.career_growth} />
      <Feature label="Internships" value={data.internships} />
      <Feature label="Visa & Immigration" value={data.visa_immigration} />
      <Feature label="Quality of Life" value={data.quality_of_life} />
      <Feature label="Competition Level" value={data.competition_level} />
      <Feature label="Global Exposure" value={data.global_exposure} />
      <Feature label="Research Opportunities" value={data.research_opportunities} />
      <Feature label="Cultural Adaptability" value={data.cultural_adaptability} />
      <Feature label="Safety" value={data.safety} />
      <Feature label="Settlement Potential" value={data.settlement_potential} />
    </div>
  );
}

function Feature({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-sm uppercase font-bold text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}
