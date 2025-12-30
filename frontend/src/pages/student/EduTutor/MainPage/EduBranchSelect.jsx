import { useBooking } from "../context/BookingContext";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function EduBranchSelect({ onSelect }) {
  const { availableBranches, selectedCareer, allCareers } = useBooking();
  const [search, setSearch] = useState("");

  const careerName = useMemo(() => {
    const c = allCareers.find((item) => item.id === selectedCareer);
    return c ? c.name : selectedCareer;
  }, [selectedCareer, allCareers]);

  const filteredBranches = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return availableBranches;
    return availableBranches.filter((b) =>
      b.name.toLowerCase().includes(query)
    );
  }, [availableBranches, search]);

  return (
    <div>
      {/* SUMMARY */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex items-center gap-4 text-sm shadow-sm"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl font-bold">
          {(allCareers.find(c => c.id === selectedCareer)?.icon) || "🎓"}
        </div>
        <div>
          <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Active Path</p>
          <p className="text-base font-bold text-blue-900">{careerName}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900">
          Select Your Branch
        </h2>
        <p className="text-base text-gray-600 mb-6">
          Choose your specialization or degree program.
        </p>
      </motion.div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search branches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2.5 md:py-3 text-sm truncate border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
      />

      {filteredBranches.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500 text-sm">
            No branches match "{search}".
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10">
        {filteredBranches.map((branch, idx) => (
          <motion.button
            key={branch.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 246, 255, 1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(branch.id)}
            className="group relative flex flex-col items-start p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-left overflow-hidden"
          >
            <div className="flex w-full justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700">
                {branch.name}
              </h3>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
            {branch.count && (
              <p className="mt-2 text-xs font-semibold text-gray-500 uppercase tracking-tighter">
                {branch.count} Specializations
              </p>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
