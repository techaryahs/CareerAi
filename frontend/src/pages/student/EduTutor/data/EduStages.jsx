// src/data/EduStages.js

/**
 * Academic Stages for each Program / Degree
 *
 * Notes:
 * - programId must match EDU_BRANCHES.id
 * - Stage naming is program-specific (semester / year / phase / level)
 * - Order defines progression
 */

export const EDU_STAGES = [
  // ===================== ENGINEERING =====================
  { id: "cse_sem_1", name: "Semester 1", programId: "cse", order: 1 },
  { id: "cse_sem_2", name: "Semester 2", programId: "cse", order: 2 },
  { id: "cse_sem_3", name: "Semester 3", programId: "cse", order: 3 },
  { id: "cse_sem_4", name: "Semester 4", programId: "cse", order: 4 },
  { id: "cse_sem_5", name: "Semester 5", programId: "cse", order: 5 },
  { id: "cse_sem_6", name: "Semester 6", programId: "cse", order: 6 },
  { id: "cse_sem_7", name: "Semester 7", programId: "cse", order: 7 },
  { id: "cse_sem_8", name: "Semester 8", programId: "cse", order: 8 },

  // ===================== MBBS =====================
  { id: "mbbs_phase_1", name: "Phase 1 (Pre-Clinical)", programId: "mbbs", order: 1 },
  { id: "mbbs_phase_2", name: "Phase 2 (Para-Clinical)", programId: "mbbs", order: 2 },
  { id: "mbbs_phase_3", name: "Phase 3 (Clinical)", programId: "mbbs", order: 3 },
  { id: "mbbs_intern", name: "Internship", programId: "mbbs", order: 4 },

  // ===================== COMMERCE =====================
  { id: "bcom_year_1", name: "Year 1", programId: "bcom", order: 1 },
  { id: "bcom_year_2", name: "Year 2", programId: "bcom", order: 2 },
  { id: "bcom_year_3", name: "Year 3", programId: "bcom", order: 3 },

  // ===================== CA =====================
  { id: "ca_foundation", name: "Foundation", programId: "ca", order: 1 },
  { id: "ca_inter", name: "Intermediate", programId: "ca", order: 2 },
  { id: "ca_final", name: "Final", programId: "ca", order: 3 },

  // ===================== ARTS =====================
  { id: "ba_year_1", name: "Year 1", programId: "history", order: 1 },
  { id: "ba_year_2", name: "Year 2", programId: "history", order: 2 },
  { id: "ba_year_3", name: "Year 3", programId: "history", order: 3 },

  // ===================== CIVIL SERVICES =====================
  { id: "upsc_prelims", name: "Prelims", programId: "upsc", order: 1 },
  { id: "upsc_mains", name: "Mains", programId: "upsc", order: 2 },
  { id: "upsc_interview", name: "Interview", programId: "upsc", order: 3 },
];

/**
 * Helper: get stages for selected program
 */
export const getStagesByProgram = (programId) =>
  EDU_STAGES
    .filter(stage => stage.programId === programId)
    .sort((a, b) => a.order - b.order);
