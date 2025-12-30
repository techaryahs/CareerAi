import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";

// ===============================
// IMPORT ALL STEPS
// ===============================
import EduCareerSelect from "./EduCareerSelect";
import EduBranchSelect from "./EduBranchSelect";
import EduSemesterSelect from "./EduSemesterSelect";
import EduSubjectSelect from "./EduSubjectSelect";
import EduTutorList from "./EduTutorList";
import EduCartPage from "./EduCartPage";
import PaymentRedirection from "./PaymentRedirection";
import EduSuccessPage from "./EduSuccessPage";

// ===============================
// PROGRESS BAR
// ===============================
function ProgressBar({ step }) {
  const steps = [
    "Path",
    "Branch",
    "Stage",
    "Subjects",
    "Expert",
    "Cart",
    "Verify"
  ];

  return (
    <div className="mb-10 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Step {step} <span className="text-gray-300 font-normal">/ {steps.length}</span></h1>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
          Premium Booking
        </span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${(step / steps.length) * 100}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />
      </div>

      <div className="flex justify-between mt-3 gap-1">
        {steps.map((label, index) => {
          const isActive = step === index + 1;
          const isCompleted = step > index + 1;
          return (
            <div
              key={label}
              className="flex flex-col items-center flex-1"
            >
              <div className={`h-1 w-full rounded-full transition-all duration-500 mb-2 ${isActive ? "bg-blue-600" : isCompleted ? "bg-green-500" : "bg-gray-200"
                }`} />
              <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors duration-500 ${isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                } hidden md:block`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===============================
// MAIN PAGE
// ===============================
export default function EduHomePage() {
  const [step, setStep] = useState(1);

  const {
    selectedSubjects,
    // actions
    setSelectedCareer,
    setSelectedBranch,
    setSelectedSubjects,
    setSelectedSemester,
    addTutorAndSlot,
    resetFlow,
  } = useBooking();

  const handleBack = () => {
    if (step === 1) return;

    if (step === 2) setSelectedCareer(null);
    if (step === 3) setSelectedBranch(null);
    if (step === 4) setSelectedSubjects([]);
    if (step === 5) setSelectedSubjects([]);
    if (step === 6) resetFlow();

    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <ProgressBar step={step} />

        {step > 1 && step < 8 && (
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="mb-6 px-5 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-sm font-bold text-gray-600 flex items-center gap-2 group"
          >
            <svg className="w-4 h-4 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Back
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 sm:p-10 border border-white/50 backdrop-blur-sm"
          >
            {step === 1 && (
              <EduCareerSelect
                onSelect={(careerId) => {
                  setSelectedCareer(careerId);
                  setSelectedBranch(null);
                  setSelectedSubjects([]);
                  setStep(2);
                }}
              />
            )}

            {step === 2 && (
              <EduBranchSelect
                onSelect={(branchId) => {
                  setSelectedBranch(branchId);
                  setSelectedSubjects([]);
                  setStep(3);
                }}
              />
            )}

            {step === 3 && (
              <EduSemesterSelect
                onSelect={(semesterId) => {
                  // semester now drives subject filtering in context
                  setSelectedSemester(semesterId);
                  setStep(4);
                }}
              />
            )}

            {step === 4 && (
              <EduSubjectSelect
                selectedSubjects={selectedSubjects}
                setSelectedSubjects={setSelectedSubjects}
                onNext={() => setStep(5)}
              />
            )}

            {step === 5 && (
              <EduTutorList
                onSelect={(tutorId, slot) => {
                  addTutorAndSlot(tutorId, slot);
                  setStep(6);
                }}
              />
            )}

            {step === 6 && <EduCartPage onCheckout={() => setStep(7)} />}

            {step === 7 && (
              <PaymentRedirection onSuccess={() => setStep(8)} />
            )}

            {step === 8 && <EduSuccessPage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
