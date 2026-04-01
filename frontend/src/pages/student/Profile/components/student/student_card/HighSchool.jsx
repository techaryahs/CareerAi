import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Success Modal Component
export const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/30 backdrop-blur-sm"
    />
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative bg-white p-10 rounded-[2rem] shadow-2xl max-w-sm w-full text-center"
    >
      <p className="text-gray-600 text-lg font-medium mb-8">Your details has been added successfully</p>
      <button 
        onClick={onClose}
        className="bg-[#004080] text-white px-14 py-3 rounded-full font-bold hover:bg-[#003366] transition-all shadow-md active:scale-95"
      >
        Close
      </button>
    </motion.div>
  </div>
);

export default function HighSchool({ onClose, onSave }) {
  const [step, setStep] = useState(0); // 0, 1, 2
  const [formData, setFormData] = useState({
    schoolName: '',
    cgpa: '',
    outOf: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 3;
  const progressPercent = (step / 2) * 100;

  const validateStep = (currentStep) => {
    let newErrors = {};
    if (currentStep === 0) {
      if (!formData.schoolName.trim()) newErrors.schoolName = true;
    } else if (currentStep === 1) {
      if (!formData.cgpa.trim()) newErrors.cgpa = true;
      if (!formData.outOf) newErrors.outOf = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (validateStep(step)) {
        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            if (onSave) await onSave(formData);
            setShowSuccess(true);
        }
    }
  };

  const prevStep = () => {
    setErrors({});
    if (step > 0) setStep(step - 1);
  };

  const SchoolIcon = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 110H110V50L60 20L10 50V110Z" fill="white" />
      <path d="M60 20L10 50L60 35L110 50L60 20Z" fill="#D32F2F" />
      <rect x="25" y="60" width="15" height="15" fill="#1976D2" rx="2" />
      <rect x="80" y="60" width="15" height="15" fill="#1976D2" rx="2" />
      <rect x="50" y="80" width="20" height="30" fill="#795548" />
      <rect x="20" y="110" width="80" height="2" fill="#E0E0E0" />
      <rect x="30" y="50" width="5" height="60" fill="#EFEBE9" />
      <rect x="85" y="50" width="5" height="60" fill="#EFEBE9" />
    </svg>
  );

  const DoneIcon = () => (
    <div className="relative inline-block mb-10 text-[#004080]">
        <svg width="100" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 ring-4 ring-white">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 11 12 14 15 8"></polyline>
            </svg>
        </div>
    </div>
  );

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[420px] relative font-sans animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-20 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Left Side Panel */}
        <div className="w-full md:w-[38%] bg-[#004080] p-8 flex flex-col items-center justify-center text-center text-white relative">
             <div className="mb-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm animate-float">
                <SchoolIcon />
             </div>
             <h2 className="text-xl font-extrabold mb-2 leading-tight tracking-tight uppercase italic">Add High School</h2>
             <p className="text-white/90 text-[11px] max-w-[200px] font-medium leading-relaxed italic">
               {step === 0 && "Where did you spend the final years of school life?"}
               {step === 1 && "Provide your CGPA or percentage."}
               {step === 2 && "This is the last step! All you have to do is click submit to save the details."}
             </p>
        </div>

        {/* Right Side Panel / Form */}
        <div className="flex-1 p-6 md:p-8 flex flex-col">
          <div className="mb-4 text-center">
            <h1 className="text-lg font-bold text-[#004080] mb-2 uppercase tracking-widest italic">High School</h1>
            <div className="relative pt-1 font-sans">
              <div className="flex mb-2 items-end justify-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">
                  {step} of 2 completed
                </span>
              </div>
              <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-gray-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#004080] h-full"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full text-center">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-1">
                  <div className="relative pt-4">
                    <label className="absolute left-4 -top-2 bg-white px-2 text-[10px] font-black text-gray-400 z-10 uppercase tracking-widest italic">High School Name</label>
                    <input 
                        type="text" placeholder="High School Name" value={formData.schoolName}
                        onChange={(e) => { 
                            setFormData({...formData, schoolName: e.target.value});
                            if (errors.schoolName) setErrors({...errors, schoolName: false});
                        }}
                        className={`w-full px-4 py-2.5 text-sm border-b-2 rounded-none transition-all outline-none font-medium text-gray-800 placeholder:text-gray-300 italic ${errors.schoolName ? 'border-red-400' : 'border-gray-200 focus:border-[#004080]'}`}
                    />
                  </div>
                  {errors.schoolName && <p className="text-red-500 text-[10px] text-left ml-2 animate-pulse italic">*required</p>}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <div className="space-y-1">
                    <input 
                        type="text" placeholder="CGPA Or Percentage" value={formData.cgpa}
                        maxLength={3}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9.]/g, '');
                            if (val === '' || parseFloat(val) <= 100) {
                                setFormData({...formData, cgpa: val});
                                if (errors.cgpa) setErrors({...errors, cgpa: false});
                            }
                        }}
                        className={`w-full px-4 py-2.5 text-sm border-b-2 rounded-none transition-all outline-none font-medium text-gray-800 placeholder:text-gray-300 italic ${errors.cgpa ? 'border-red-400' : 'border-gray-200 focus:border-[#004080]'}`}
                    />
                    {errors.cgpa && <p className="text-red-500 text-[10px] text-left ml-2 italic">*required</p>}
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <select 
                        value={formData.outOf} onChange={(e) => {
                            setFormData({...formData, outOf: e.target.value});
                            if (errors.outOf) setErrors({...errors, outOf: false});
                        }}
                        className={`w-full px-4 py-2.5 text-sm border-b-2 rounded-none appearance-none outline-none font-medium bg-white text-gray-800 italic ${errors.outOf ? 'border-red-400' : 'border-gray-200 focus:border-[#004080]'}`}
                      >
                        <option value="" className="text-gray-400">Out Of</option>
                        {[4, 5, 7, 8, 10, 20, 100].map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                    {errors.outOf && <p className="text-red-500 text-[10px] text-left ml-2 italic">*required</p>}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step3" 
                  initial={{ x: 20, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ x: -20, opacity: 0 }} 
                  className="flex flex-col items-center text-center justify-center h-full pb-4"
                >
                   <DoneIcon />
                   <h2 className="text-xl font-black text-gray-800 mb-1 uppercase tracking-tighter italic">All Done</h2>
                   <p className="text-gray-500 text-[11px] font-medium px-4 italic">Click Submit to save details or Previous to edit.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-4 flex gap-4 justify-end">
            {step > 0 && (
              <button onClick={prevStep} className="px-6 py-2.5 text-[10px] font-black text-gray-400 border-b-2 border-transparent hover:border-gray-200 transition-all uppercase tracking-widest italic">
                Previous
              </button>
            )}
            <button 
              onClick={nextStep}
              className="px-10 py-3 bg-[#004080] text-white text-[10px] font-black rounded-lg hover:bg-[#003366] transition-all shadow-lg uppercase tracking-[0.2em] italic transform active:scale-95"
            >
              {step === totalSteps - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <SuccessModal onClose={() => { setShowSuccess(false); onClose(); }} />
          )}
        </AnimatePresence>

        <style jsx="true" global="true">{`
          @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
          .animate-float { animation: float 4s ease-in-out infinite; }
        `}</style>
    </div>
  );
}
