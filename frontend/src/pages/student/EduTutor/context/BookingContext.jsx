import React, { createContext, useContext, useState, useMemo } from "react";
import { EDU_CAREERS } from "../data/EduCareers";
import { EDU_BRANCHES } from "../data/EduBranches";
import { EDU_SUBJECTS } from "../data/EduSubjects";
import { EDU_TUTORS } from "../data/EduTutors";
import { getStagesByBranch, resolveStageTemplateForProgram } from "../data/EduStageTemplates";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // =========================
  // USER SELECTION STATE
  // =========================

  const [selectedCareer, setSelectedCareer] = useState(null);        // e.g. "eng", "medical"
  const [selectedProgram, setSelectedProgram] = useState(null);      // e.g. "cse", "mbbs" (Replaces selectedBranch)
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);      // array of subjectIds
  const [selectedTutor, setSelectedTutor] = useState(null);          // tutor id
  const [selectedTutorObj, setSelectedTutorObj] = useState(null);    // full tutor object
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Cart for final checkout (optional but good for structure)
  const [cart, setCart] = useState([]);

  // =========================
  // DERIVED DATA (FILTERS)
  // =========================

  // "Branches" or "Programs" based on career
  const availablePrograms = useMemo(() => {
    if (!selectedCareer) return [];
    return EDU_BRANCHES.filter((b) => b.careerId === selectedCareer);
  }, [selectedCareer]);

  const programTemplate = useMemo(() => {
    if (!selectedProgram) return null;
    return resolveStageTemplateForProgram(selectedProgram) || null;
  }, [selectedProgram]);

  const programStructure = useMemo(() => {
    if (!programTemplate) return null;
    if (programTemplate.startsWith("SEMESTER")) return "semester";
    if (programTemplate.startsWith("YEAR")) return "year";
    if (programTemplate === "MBBS_PHASES") return "phase";
    if (programTemplate === "CA_LEVELS") return "level";
    return null;
  }, [programTemplate]);

  const availableStages = useMemo(() => {
    if (!selectedProgram) return [];
    return getStagesByBranch(selectedProgram);
  }, [selectedProgram]);

  const availableSubjects = useMemo(() => {
    if (!selectedProgram) return [];
    const byProgram = EDU_SUBJECTS.filter((s) => s.branchId === selectedProgram);
    if (selectedSemester == null && programStructure) {
      return [];
    }
    const selectedStageId =
      programStructure === "semester"
        ? `sem_${selectedSemester}`
        : programStructure === "year"
          ? `year_${selectedSemester}`
          : programStructure === "phase"
            ? `phase_${selectedSemester}`
            : programStructure === "level"
              ? `year_${selectedSemester}`
              : null;
    if (!selectedStageId) return byProgram;
    const subjectHasStage = (s) => {
      const stageIds = [];
      if (Array.isArray(s.semesters) && s.semesters.length > 0) {
        s.semesters.forEach((n) => stageIds.push(`sem_${n}`));
      }
      if (Array.isArray(s.years) && s.years.length > 0) {
        s.years.forEach((n) => stageIds.push(`year_${n}`));
      }
      if (typeof s.phase === "number") {
        stageIds.push(`phase_${s.phase}`);
      }
      return stageIds.includes(selectedStageId);
    };
    const filtered = byProgram.filter(subjectHasStage);
    return filtered.length ? filtered : byProgram;
  }, [selectedProgram, selectedSemester, programStructure]);

  const availableTutors = useMemo(() => {
    if (selectedSubjects.length === 0) return [];
    // Tutors who teach AT LEAST ONE of the selected subjects
    return EDU_TUTORS.filter((t) =>
      t.subjectIds.some((sid) => selectedSubjects.includes(sid))
    );
  }, [selectedSubjects]);

  // =========================
  // ACTIONS
  // =========================

  const handleSetCareer = (careerId) => {
    setSelectedCareer(careerId);
    setSelectedProgram(null); // Reset next step
    setSelectedSemester(null);
    setSelectedSubjects([]);
  };

  const handleSetProgram = (programId) => {
    setSelectedProgram(programId);
    setSelectedSemester(null);
    setSelectedSubjects([]); // Reset next step
  };

  const handleSetSemester = (semesterNumber) => {
    const num = typeof semesterNumber === "string" ? Number(semesterNumber) : semesterNumber;
    setSelectedSemester(num);
    setSelectedSubjects([]); // reset subjects whenever semester changes
  };

  const toggleSubject = (subjectId) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subjectId)) {
        return prev.filter((id) => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  const selectTutorAndSlot = (tutor, slot) => {
    setSelectedTutor(typeof tutor === 'object' ? tutor.id || tutor._id : tutor);
    setSelectedTutorObj(typeof tutor === 'object' ? tutor : null);
    setSelectedSlot(slot);
  };

  const addToCart = () => {
    if (selectedTutor && selectedSlot) {
      // Find tutor details
      const tutor = EDU_TUTORS.find(t => t.id === selectedTutor);
      setCart(prev => [...prev, {
        tutor,
        slot: selectedSlot,
        subjects: selectedSubjects
      }]);
    }
  };

  const resetBooking = () => {
    setSelectedCareer(null);
    setSelectedProgram(null);
    setSelectedSemester(null);
    setSelectedSubjects([]);
    setSelectedTutor(null);
    setSelectedSlot(null);
  };

  // Debug logs removed after verification

  const value = {
    // selections
    selectedCareer,
    selectedProgram, // Exposed as generic "Program"
    selectedBranch: selectedProgram, // Backward compatibility alias if needed
    selectedSubjects,
    selectedTutor,
    selectedTutorObj,
    selectedSlot,
    cart,
    selectedSemester,

    // derived
    availablePrograms, // Exposed as generic "Programs"
    availableBranches: availablePrograms, // Backward compatibility alias
    programStructure,
    availableStages,
    availableSubjects,
    availableTutors,

    // setters
    setSelectedCareer: handleSetCareer,
    setSelectedProgram: handleSetProgram,
    setSelectedBranch: handleSetProgram, // Backward compatibility alias
    setSelectedSubjects,
    toggleSubject,
    selectTutorAndSlot,
    addToCart,
    resetBooking,
    setSelectedSemester: handleSetSemester,

    // Backward compatibility / aliases for existing components
    addTutorAndSlot: selectTutorAndSlot,
    resetFlow: resetBooking,

    // Raw Data Access
    allCareers: EDU_CAREERS || [],
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
