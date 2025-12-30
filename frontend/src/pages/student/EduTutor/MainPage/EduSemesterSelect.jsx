import { useBooking } from "../context/BookingContext";
import React, { useMemo } from "react";
import { getStagesByBranch } from "../data/EduStageTemplates";
import { motion } from "framer-motion";

export default function EduSemesterSelect({ onSelect }) {
  const { selectedBranch, allCareers, selectedCareer, availableBranches } = useBooking();

  const stages = useMemo(() => {
    if (!selectedBranch) return [];
    return getStagesByBranch(selectedBranch);
  }, [selectedBranch]);

  // Summary Data
  const careerName = useMemo(() => {
    const c = allCareers.find((item) => item.id === selectedCareer);
    return c ? c.name : selectedCareer;
  }, [selectedCareer, allCareers]);

  const branchName = useMemo(() => {
    const b = availableBranches.find((item) => item.id === selectedBranch);
    return b ? b.name : selectedBranch;
  }, [selectedBranch, availableBranches]);

  if (!selectedBranch) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-sm">
          Please select a program / degree first.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* SUMMARY */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-blue-50"
      >
        <div className="flex-1 p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <p className="text-[10px] text-blue-600 font-extrabold uppercase tracking-widest mb-1">Career</p>
          <p className="text-sm font-bold text-gray-900">{careerName}</p>
        </div>
        <div className="flex-1 p-4">
          <p className="text-[10px] text-indigo-500 font-extrabold uppercase tracking-widest mb-1">Program</p>
          <p className="text-sm font-bold text-gray-900">{branchName}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">
          Select Your Semester
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-10">
        {stages.map((stage, idx) => (
          <motion.button
            key={stage.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(stage.id)}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-500 hover:text-blue-700 transition-all text-center aspect-square md:aspect-auto"
          >
            <span className="text-3xl font-black text-blue-600 mb-2">{(stage.name || "").match(/\d+/)}</span>
            <span className="text-sm font-bold text-gray-700">{(stage.name || "").replace(/\d+/g, "").trim() || "Stage"}</span>
          </motion.button>
        ))}

        {stages.length === 0 && (
          <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-500 text-sm">
              No specific stages found. You can proceed to view all subjects.
            </p>
            <button
              onClick={() => onSelect(1)} // Default to 1 if no stages defined
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Proceed to Subjects &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
