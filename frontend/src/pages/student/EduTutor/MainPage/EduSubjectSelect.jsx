// src/MainPage/EduSubjectSelect.jsx
import React, { useMemo, useState } from "react";
import { useBooking } from "../context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function EduSubjectSelect({ onNext }) {
  const {
    availableSubjects,
    selectedSubjects,
    toggleSubject,
    allCareers,
    selectedCareer,
    availableBranches,
    selectedBranch,
    selectedSemester
  } = useBooking();
  const [query, setQuery] = useState("");

  // filtered by search
  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return availableSubjects;
    return availableSubjects.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [availableSubjects, query]);

  if (!availableSubjects || availableSubjects.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">No Subjects Found</h2>
        <p className="text-sm text-gray-500 mb-6">
          There are no specific subjects listed for this program yet, but you can still find expert tutors for this field.
        </p>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
        >
          View Available Tutors
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* SUMMARY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 p-4 bg-white border border-blue-50 rounded-2xl shadow-sm flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-gray-500"
      >
        <div className="flex items-center gap-2">
          <span className="text-blue-600">Career:</span>
          <span className="text-gray-900">{allCareers.find(c => c.id === selectedCareer)?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">Branch:</span>
          <span className="text-gray-900">{availableBranches.find(b => b.id === selectedBranch)?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">Semester:</span>
          <span className="text-gray-900">Stage {selectedSemester}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
          Select Subjects
        </h2>
        <p className="text-base text-gray-600 mb-6">
          Choose the subjects you need help with. You can select multiple.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative mb-6"
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input
          type="text"
          placeholder="Search subjects (e.g. Maths, Physics)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm md:text-base"
        />
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">No subjects found matching "{query}".</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filtered.map((subject) => {
            const isSelected = selectedSubjects.includes(subject.id);
            return (
              <motion.button
                key={subject.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => toggleSubject(subject.id)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${isSelected
                  ? "bg-blue-50 border-blue-600 shadow-sm"
                  : "bg-white border-gray-100 hover:border-blue-200"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${isSelected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
                    }`}>
                    {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                  </div>
                  <span className={`font-bold transition-colors ${isSelected ? "text-blue-900" : "text-gray-700"}`}>
                    {subject.name}
                  </span>
                </div>
                {subject.code && <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-mono text-gray-500">{subject.code}</span>}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        className="sticky bottom-0 bg-white pt-4 border-t"
      >
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25 active:scale-[0.98]"
        >
          {selectedSubjects.length === 0
            ? "Skip & Browse Tutors"
            : `Proceed with ${selectedSubjects.length} Subject${selectedSubjects.length > 1 ? 's' : ''}`}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" /></svg>
        </button>
      </motion.div>
    </div>
  );
}
