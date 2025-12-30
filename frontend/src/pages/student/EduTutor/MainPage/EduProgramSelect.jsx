import React, { useState, useMemo } from "react";
import { useBooking } from "../context/BookingContext";

export default function EduProgramSelect({ onSelect }) {
  const { availablePrograms, selectedCareer, allCareers } = useBooking();
  const [search, setSearch] = useState("");

  const careerObj = useMemo(() => {
    return allCareers.find((item) => item.id === selectedCareer);
  }, [selectedCareer, allCareers]);

  const careerType = careerObj?.type || "program";
  const careerName = careerObj?.name || "Career";

  // Dynamic Labels based on Career Type
  const getLabels = (type) => {
    switch (type) {
      case "branch":
        return {
          title: "Select Your Branch",
          subtitle: "Choose your engineering specialization.",
          placeholder: "Search branches (e.g. CSE, Mechanical)...",
          empty: "No branches found matching"
        };
      case "exam":
        return {
          title: "Select Exam / Category",
          subtitle: "Choose the specific exam or category you are preparing for.",
          placeholder: "Search exams (e.g. UPSC, NDA)...",
          empty: "No exams found matching"
        };
      case "program":
      default:
        return {
          title: "Select Program / Degree",
          subtitle: "Choose your degree program or course.",
          placeholder: "Search programs (e.g. MBBS, B.Com)...",
          empty: "No programs found matching"
        };
    }
  };

  const labels = getLabels(careerType);

  const filteredPrograms = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return availablePrograms;
    return availablePrograms.filter((b) =>
      b.name.toLowerCase().includes(query)
    );
  }, [availablePrograms, search]);

  return (
    <div className="animate-fade-in-up">
      {/* SUMMARY BAR */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-2 text-sm text-blue-800">
        <span className="font-semibold text-blue-900">Context:</span>
        <span>{careerName}</span>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-800">
        {labels.title}
      </h2>
      <p className="text-sm md:text-base text-gray-600 mb-6">
        {labels.subtitle}
      </p>

      {/* SEARCH */}
      <div className="relative mb-6">
        <input
            type="text"
            placeholder={labels.placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 md:py-3 text-sm truncate border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-sm"
        />
        <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">
            {labels.empty} "{search}".
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrograms.map((program) => (
          <button
            key={program.id}
            type="button"
            onClick={() => onSelect(program.id)}
            className="group relative flex flex-col items-start p-4 md:p-6 min-h-[64px] md:min-h-[112px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all text-left"
          >
            <div className="w-full flex justify-between items-start mb-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                {program.name}
                </h3>
            </div>
            {/* Optional: Add icon or small details if available in future */}
            <div className="mt-auto pt-2 w-full flex justify-end">
                <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold flex items-center">
                    Select <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
