import { useBooking } from "../context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";
import { logStudentActivity } from "../../../../utils/logActivity";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
          animate={{ width: `${(Math.min(step, 7) / steps.length) * 100}%` }}
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
  const location = useLocation();
  const navigate = useNavigate();

  // Derive step from path
  const getStep = () => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "edu":
      case "career": return 1;
      case "branch": return 2;
      case "semester": return 3;
      case "subject": return 4;
      case "tutors": return 5;
      case "cart": return 6;
      case "payment": return 7;
      case "success": return 7; // Success and payment are final stages
      default: return 1;
    }
  };

  const step = getStep();

  useEffect(() => {
    if (step === 7) {
      logStudentActivity(
        "EDU_TUTOR",
        "Booked EduTutor Session",
        "Student successfully completed an EduTutor booking"
      );
    }
  }, [step]);

  const {
    setSelectedCareer,
    setSelectedBranch,
    setSelectedSubjects,
    setSelectedSemester,
    resetFlow,
  } = useBooking();

  const handleBack = () => {
    if (step === 1) return;

    if (step === 2) {
      setSelectedCareer(null);
      navigate("/edu/career");
    }
    if (step === 3) {
      setSelectedBranch(null);
      navigate("/edu/branch");
    }
    if (step === 4) {
      setSelectedSubjects([]);
      navigate("/edu/semester");
    }
    if (step === 5) {
      setSelectedSubjects([]);
      navigate("/edu/subject");
    }
    if (step === 6) {
      navigate("/edu/tutors");
    }
    if (step === 7) {
      resetFlow();
      navigate("/edu/career");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <ProgressBar step={step} />

        {step > 1 && step < 7 && (
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
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 sm:p-10 border border-white/50 backdrop-blur-sm"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
