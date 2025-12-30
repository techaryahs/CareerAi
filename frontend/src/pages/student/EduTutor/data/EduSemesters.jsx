// src/data/EduSemesters.js

/**
 * Semester configuration for EduTutor
 *
 * IMPORTANT:
 * - Semesters are ADVISORY, not restrictive
 * - Actual subjects may vary by university
 * - This file exists only to guide students
 *
 * Reference:
 * - UGC & AICTE allow curriculum flexibility across universities
 */

export const EDU_SEMESTERS = [
  {
    id: "ug_engineering",
    label: "Undergraduate Engineering",
    totalSemesters: 8,
    displaySemesters: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    id: "ug_science",
    label: "Undergraduate Science (B.Sc)",
    totalSemesters: 6,
    displaySemesters: [1, 2, 3, 4, 5, 6]
  },
  {
    id: "pg",
    label: "Postgraduate (M.Tech / M.Sc / MBA etc.)",
    totalSemesters: 4,
    displaySemesters: [1, 2, 3, 4]
  },
  {
    id: "phd",
    label: "Doctoral (PhD)",
    totalSemesters: null,
    displaySemesters: []
  },
  {
    id: "medical",
    label: "Medical Programs (MBBS & Allied)",
    totalSemesters: null,
    displaySemesters: [],
    note: "Medical programs follow professional phases, not semester-based structure"
  }
];

/**
 * Helper: get semesters by program type
 * (Used only for UI hints)
 */
export const getSemestersByProgram = (programId) =>
  EDU_SEMESTERS.find(p => p.id === programId);
