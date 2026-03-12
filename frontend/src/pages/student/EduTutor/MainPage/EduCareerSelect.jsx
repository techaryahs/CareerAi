import { EDU_CAREERS } from "../data/EduCareers.jsx";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EduCareerSelect({ onSelect }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const careers = useMemo(() => {
    const query = search.toLowerCase();
    // Filter enabled careers
    const active = EDU_CAREERS.filter(c => c.enabled !== false);

    if (!query) return active;

    return active.filter(
      (career) =>
        career.name.toLowerCase().includes(query) ||
        (career.description || "").toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800">
          Select Your Career Path
        </h2>
        <p className="text-base md:text-lg text-gray-600">
          Start with your broad career stream to find the right programs and tutors.
        </p>
      </motion.div>

      <div className="mb-6">
        <input
          type="search"
          placeholder="Search careers (e.g. Engineering, Medical)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 md:p-4 text-sm truncate border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder:text-sm"
          aria-label="Search careers"
        />
      </div>

      {careers.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500 text-sm">
            No careers match "{search}".
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-10">
        {careers.map((career, idx) => (
          <motion.button
            key={career.id}
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (onSelect) onSelect(career.id);
              navigate("/edu/branch");
            }}
            className="group relative flex flex-col items-start p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all text-left overflow-hidden ring-1 ring-black/[0.03]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500" />

            <div className="relative z-10 w-full">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-2xl md:text-3xl">
                  {career.icon || "🎓"}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {career.name}
                </h3>
              </div>

              {career.description && (
                <p className="text-sm text-gray-500 group-hover:text-gray-600 leading-relaxed line-clamp-2">
                  {career.description}
                </p>
              )}

              <div className="mt-6 flex justify-end">
                <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 text-sm font-bold flex items-center">
                  Get Started <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" /></svg>
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
