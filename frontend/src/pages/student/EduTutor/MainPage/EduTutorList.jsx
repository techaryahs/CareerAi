import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
// import { getTutorsBySubjects } from "../data/EduTutors";
import { EDU_SUBJECTS } from "../data/EduSubjects";
import { EDU_CAREERS } from "../data/EduCareers";

export default function EduTutorList() {
  const navigate = useNavigate();

  const {
    selectedSubjects,
    selectTutorAndSlot,
    selectedCareer,
    selectedProgram,
    availablePrograms,
  } = useBooking();

  const [query, setQuery] = useState("");
  const [fetching, setFetching] = useState(true); // New state for loading

  // Redirect if no basic context exists
  useEffect(() => {
    if (!selectedCareer && !selectedProgram && (!selectedSubjects || selectedSubjects.length === 0)) {
      navigate("/edu");
    }
  }, [selectedCareer, selectedProgram, selectedSubjects, navigate]);

  // --- Summary Logic ---
  const careerName = useMemo(() => {
    const c = EDU_CAREERS.find((i) => i.id === selectedCareer);
    return c ? c.name : "Career";
  }, [selectedCareer]);

  const programName = useMemo(() => {
    if (!selectedProgram || !availablePrograms) return "Program";
    const b = availablePrograms.find((i) => i.id === selectedProgram);
    return b ? b.name : "Program";
  }, [selectedProgram, availablePrograms]);

  // --- Data Logic ---

  // Map subjectId → subject object
  const subjectsById = useMemo(() => {
    const map = {};
    EDU_SUBJECTS.forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, []);

  // Get tutors who teach AT LEAST ONE of the selected subjects
  // Then filter by search query
  // Then sort by "relevance" (match count > rating)
  const [matchedTutors, setMatchedTutors] = useState([]);

  // Fetch real teachers from backend based on selected subjects
  useEffect(() => {
    const fetchRealTutors = async () => {
      // Allow fetching if we have career/program context or a manual query
      if (!selectedSubjects.length && !selectedCareer && !selectedProgram && !query) {
        setFetching(false);
        return;
      }

      setFetching(true);
      try {
        const API = process.env.REACT_APP_API_URL || "http://localhost:5001";

        // Combine subject names and manual query
        const subjectNames = selectedSubjects.map(id => subjectsById[id]?.name).filter(Boolean).join(" ");
        const combinedQuery = (query + " " + subjectNames).trim();

        const res = await axios.get(`${API}/api/bookings/search-teachers`, {
          params: {
            query: combinedQuery,
            fieldId: selectedCareer,
            programId: selectedProgram
          }
        });

        // Transform backend teachers to match EduTutorList expectations if necessary
        // Backend teacher format: { _id, fullName, experienceYears, selectedSubjects, onlinePrice, offlinePrice... }
        // EduTutorList format: { id, name, rating, experienceYears, hourlyPrice, subjectIds, slots }

        const transformed = (res.data.teachers || []).map(t => ({
          id: t._id,
          name: t.fullName,
          rating: t.rating || 4.8, // Fallback for now
          experienceYears: t.experienceYears,
          hourlyPrice: t.onlinePrice || t.offlinePrice || 500,
          subjectIds: t.selectedSubjects, // Note: these are strings, not IDs from EDU_SUBJECTS
          slots: t.slots || [],
          profilePicture: t.profilePicture,
          classMode: t.classMode,
          totalStudents: t.totalStudents
        }));

        setMatchedTutors(transformed);
      } catch (err) {
        console.error("Error fetching tutors:", err);
        setMatchedTutors([]); // Clear tutors on error
      } finally {
        setFetching(false);
      }
    };

    fetchRealTutors();
  }, [selectedSubjects, subjectsById, query]);

  const handleSelect = (tutor, slot) => {
    selectTutorAndSlot(tutor, slot);
    navigate("/edu/cart");
  };

  if (!selectedCareer && !selectedProgram && (!selectedSubjects || selectedSubjects.length === 0)) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-lg">Please start the journey first.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* Summary Bar */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-800">Context:</span>
          <span>{careerName}</span>
          <span className="text-gray-400">/</span>
          <span>{programName}</span>
        </div>
        <div className="hidden sm:block text-gray-300">|</div>
        <div>
          <span className="font-semibold text-blue-600">{selectedSubjects.length}</span> subjects selected
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Available Tutors</h2>
        <p className="text-base text-gray-600">
          Found {matchedTutors.length} expert{matchedTutors.length !== 1 ? 's' : ''} for your selected subjects.
        </p>
      </motion.div>

      {/* SEARCH/FILTER */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {fetching ? (
          // Skeleton Loading State
          Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row animate-pulse mb-6"
            >
              <div className="md:w-64 bg-slate-50 relative">
                <div className="w-full h-48 md:h-full bg-gray-200 flex items-center justify-center p-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-3xl"></div>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-2xl w-24"></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-24"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-36 mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-10 bg-gray-200 rounded-xl w-20"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-20"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-20"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {matchedTutors.map((tutor, idx) => (
              <motion.div
                key={tutor.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row"
              >
                {/* Profile Image / Side Bar */}
                <div className="md:w-64 bg-slate-50 relative">
                  <div className="w-full h-48 md:h-full bg-blue-100 flex items-center justify-center p-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl overflow-hidden border-4 border-white">
                      {tutor.profilePicture ? <img src={tutor.profilePicture} alt={tutor.name} className="w-full h-full object-cover" /> : tutor.name.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {tutor.classMode || 'Online'}
                    </span>
                  </div>
                </div>

                {/* Data Section */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1">{tutor.name}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex text-yellow-500 text-sm">{"★".repeat(Math.round(tutor.rating || 5))}<span className="text-gray-300">{"★".repeat(5 - Math.round(tutor.rating || 5))}</span></div>
                        <span className="text-xs font-bold text-gray-500">{tutor.rating || 5}.0 ({tutor.totalStudents || 120}+ Students)</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 flex flex-col items-center">
                      <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Rate</span>
                      <span className="text-xl font-black text-blue-900">₹{tutor.hourlyPrice || 500}<span className="text-sm font-medium text-blue-600">/hr</span></span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(Array.isArray(tutor.subjectIds) ? tutor.subjectIds : []).slice(0, 3).map(sub => (
                      <span key={sub} className="px-3 py-1 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-lg border border-gray-200">
                        {sub}
                      </span>
                    ))}
                    {(tutor.subjectIds?.length > 3) && <span className="text-xs font-bold text-gray-400">+{tutor.subjectIds.length - 3} more</span>}
                  </div>

                  {/* Slots */}
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Available Slots Today</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.slots?.map((slot, idx) => (
                        <button
                          key={`${slot.day}-${idx}`}
                          onClick={() => handleSelect(tutor, slot)}
                          className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 shadow-sm"
                        >
                          {slot.day}: {slot.startTime} - {slot.endTime}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {!fetching && matchedTutors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Tutors Found</h3>
          <p className="text-gray-500">We couldn't find any tutors matching your current filters.</p>
        </motion.div>
      )}
    </div>
  );
}
