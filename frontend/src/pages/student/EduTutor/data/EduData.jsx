// src/data/EduData.js

import { EDU_CAREERS } from "./EduCareers";
import { EDU_BRANCHES } from "./EduBranches";
import { EDU_SUBJECTS } from "./EduSubjects";
import { EDU_TUTORS, getTutorsBySubjects } from "./EduTutors";
import { EDU_PRICING, calculatePriceBreakdown } from "./EduPricing";

/**
 * Central read-only data bundle for EduTutor
 * This file should NOT mutate or reshape core data incorrectly
 */

export const EDU_DATA = {
  careers: EDU_CAREERS,
  branches: EDU_BRANCHES,
  subjects: EDU_SUBJECTS,
  tutors: EDU_TUTORS,
  pricing: EDU_PRICING
};

/**
 * Indexes for fast lookup (UI convenience only)
 */
export const EDU_INDEX = {
  subjectsById: Object.fromEntries(
    EDU_SUBJECTS.map(s => [s.id, s])
  ),
  tutorsById: Object.fromEntries(
    EDU_TUTORS.map(t => [t.id, t])
  )
};

/**
 * ===== SAFE QUERY HELPERS =====
 * These helpers respect the FINAL data model
 */

export function getSubjectsByBranch(branchId) {
  return EDU_SUBJECTS.filter(
    subject => subject.branchId === branchId
  );
}

/**
 * Multi-subject tutor matching (CORE LOGIC)
 */
export function getTutorsForSelectedSubjects(selectedSubjectIds = []) {
  return getTutorsBySubjects(selectedSubjectIds);
}

/**
 * Pricing helper (cart usage)
 */
export function getCartPricing(baseAmount) {
  return calculatePriceBreakdown(baseAmount);
}
