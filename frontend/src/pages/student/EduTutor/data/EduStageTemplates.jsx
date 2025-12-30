// src/data/EduStageTemplates.js

import { EDU_PROGRAM_STAGE_MAP } from "./EduProgramStageMap";
import { EDU_SUBJECTS } from "./EduSubjects";

export const EDU_STAGE_TEMPLATES = {
  SEMESTER_8: {
    label: "Semester",
    stages: [
      { id: 1, name: "Semester 1" },
      { id: 2, name: "Semester 2" },
      { id: 3, name: "Semester 3" },
      { id: 4, name: "Semester 4" },
      { id: 5, name: "Semester 5" },
      { id: 6, name: "Semester 6" },
      { id: 7, name: "Semester 7" },
      { id: 8, name: "Semester 8" },
    ],
  },
  SEMESTER_6: {
    label: "Semester",
    stages: [
      { id: 1, name: "Semester 1" },
      { id: 2, name: "Semester 2" },
      { id: 3, name: "Semester 3" },
      { id: 4, name: "Semester 4" },
      { id: 5, name: "Semester 5" },
      { id: 6, name: "Semester 6" },
    ],
  },
  SEMESTER_4: {
    label: "Semester",
    stages: [
      { id: 1, name: "Semester 1" },
      { id: 2, name: "Semester 2" },
      { id: 3, name: "Semester 3" },
      { id: 4, name: "Semester 4" },
    ],
  },

  YEAR_3: {
    label: "Year",
    stages: [
      { id: 1, name: "Year 1" },
      { id: 2, name: "Year 2" },
      { id: 3, name: "Year 3" },
    ],
  },
  
  YEAR_2: {
    label: "Year",
    stages: [
      { id: 1, name: "Year 1" },
      { id: 2, name: "Year 2" },
    ],
  },
  
  YEAR_4: {
    label: "Year",
    stages: [
      { id: 1, name: "Year 1" },
      { id: 2, name: "Year 2" },
      { id: 3, name: "Year 3" },
      { id: 4, name: "Year 4" },
    ],
  },

  YEAR_5: {
    label: "Year",
    stages: [
      { id: 1, name: "Year 1" },
      { id: 2, name: "Year 2" },
      { id: 3, name: "Year 3" },
      { id: 4, name: "Year 4" },
      { id: 5, name: "Year 5" },
    ],
  },

  MBBS_PHASES: {
    label: "Phase",
    stages: [
      { id: 1, name: "Phase 1 (Pre-Clinical)" },
      { id: 2, name: "Phase 2 (Para-Clinical)" },
      { id: 3, name: "Phase 3 (Clinical)" },
      { id: 4, name: "Internship" },
    ],
  },

  CA_LEVELS: {
    label: "Level",
    stages: [
      { id: 1, name: "Foundation" },
      { id: 2, name: "Intermediate" },
      { id: 3, name: "Final" },
    ],
  },
};

/**
 * Helper: get academic stages (semester / year / phase / level)
 * for a given program / branch id.
 */
export const resolveStageTemplateForProgram = (programId) => {
  const mapped = EDU_PROGRAM_STAGE_MAP[programId];
  if (mapped) return mapped;
  const subs = EDU_SUBJECTS.filter(s => s.branchId === programId);
  const sems = subs.flatMap(s => Array.isArray(s.semesters) ? s.semesters : []);
  const years = subs.flatMap(s => Array.isArray(s.years) ? s.years : []);
  const phases = subs.map(s => typeof s.phase === "number" ? s.phase : null).filter(Boolean);
  if (sems.length > 0) {
    const max = Math.max(...sems);
    if (max >= 8) return "SEMESTER_8";
    if (max >= 6) return "SEMESTER_6";
    if (max >= 4) return "SEMESTER_4";
    return "SEMESTER_6";
  }
  if (years.length > 0) {
    const max = Math.max(...years);
    if (max >= 5) return "YEAR_5";
    if (max >= 4) return "YEAR_4";
    if (max >= 3) return "YEAR_3";
    if (max >= 2) return "YEAR_2";
    return "YEAR_3";
  }
  if (phases.length > 0) {
    return "MBBS_PHASES";
  }
  return null;
};

export const getStagesByBranch = (branchId) => {
  const templateId = resolveStageTemplateForProgram(branchId);
  if (!templateId) return [];
  return EDU_STAGE_TEMPLATES[templateId]?.stages || [];
};

// Helper: returns label for the academic stage type for a program/branch
export const getStageLabelByBranch = (branchId) => {
  const templateId = resolveStageTemplateForProgram(branchId);
  if (!templateId) return "Stage";
  return EDU_STAGE_TEMPLATES[templateId]?.label || "Stage";
};
