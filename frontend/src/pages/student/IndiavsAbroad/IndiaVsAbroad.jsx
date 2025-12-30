import { useNavigate } from "react-router-dom";
import data from "./india_vs_abroad.json";
import { useState } from "react";

export default function IndiaVsAbroad() {
  const navigate = useNavigate();
  const [field, setField] = useState("");

  return (
   <div className="min-h-screen bg-[#f4f7ff] flex items-center justify-center px-4">
<div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          India vs Abroad
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Select your career field to see where studying is better for you.
        </p>

        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select Career Field --</option>

          {Object.keys(data).map((key) => (
            <option key={key} value={key}>
              {data[key].meta.title}
            </option>
          ))}
        </select>

        <button
          disabled={!field}
          onClick={() =>
            navigate("/compare-result", { state: { field } })
          }
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
          Compare Now
        </button>
      </div>
    </div>
  );
}
