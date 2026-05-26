import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 text-center italic">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 rounded-[2rem] shadow-2xl max-w-sm w-full">
        <div className="w-16 h-16 bg-[#F0F7FF] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic leading-relaxed">Goal Set!</h2>
      <p className="text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest italic leading-relaxed">Your target university details have been saved successfully.</p>
      <button onClick={onClose} className="w-full bg-[#004080] text-white py-4 rounded-3xl font-black hover:bg-[#003366] transition-all shadow-xl active:scale-95 uppercase tracking-widest italic">Great!</button>
    </motion.div>
  </div>
);

export default function TargetUniversity({ onClose, onSave }) {
  const [step, setStep] = useState(0);
  const totalSteps = 3;
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    degree: '',
    university: '',
    major: '',
    term: '',
    year: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    if (step === 0) {
      if (!formData.degree) newErrors.degree = true;
    } else if (step === 1) {
      if (!formData.university.trim()) newErrors.university = true;
      if (!formData.major.trim()) newErrors.major = true;
      if (!formData.term) newErrors.term = true;
      if (!formData.year) newErrors.year = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (validateStep()) {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        if (onSave) {
            // Map 'university' to 'uniName' to match backend schema
            const submissionData = {
                ...formData,
                uniName: formData.university
            };
            await onSave(submissionData);
        }
        setShowSuccess(true);
      }
    }
  };

  const prevStep = () => {
    setErrors({});
    if (step > 0) setStep(step - 1);
  };

  const UniversityIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90 transition-all duration-500">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
    </svg>
  );

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[420px] relative font-sans animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="w-full md:w-[35%] bg-[#004282] p-8 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#ffffff30,transparent)]" />
             <div className="mb-6 p-5 bg-white/10 rounded-2xl backdrop-blur-xl animate-float border border-white/20 relative z-10 shadow-2xl">
                <UniversityIcon />
             </div>
             <h2 className="text-xl font-black mb-2 leading-tight tracking-tighter uppercase italic z-10">Target University</h2>
             <p className="text-white/80 text-[10px] max-w-[200px] font-medium leading-relaxed italic uppercase tracking-[0.2em] z-10">
               {step === 0 && "Select the degree level you are aiming for."}
               {step === 1 && "Which institution and major are your primary targets?"}
               {step === 2 && "Great choice! This will help us tailor recommendations."}
             </p>
        </div>

        <div className="flex-1 p-8 flex flex-col bg-slate-50/20">
          <div className="mb-4 text-center">
            <h1 className="text-lg font-black text-[#004080] mb-2 uppercase tracking-[0.4em] italic leading-tight">Your Aspiration</h1>
            <div className="relative pt-1 max-w-[240px] mx-auto">
              <div className="flex mb-2 items-end justify-center">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">{step} of 2 completed</span>
              </div>
              <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-gray-100 shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 2) * 100}%` }} className="h-full bg-[#004080]" />
              </div>
            </div>
          </div>

          <div className="flex-1 relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-3 px-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block mb-4 italic select-none">Select Degree Level:</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {['Bachelors', 'Masters', 'PhD'].map((degree) => (
                      <button
                        key={degree}
                        onClick={() => {
                          setFormData({ ...formData, degree });
                          setErrors({ ...errors, degree: false });
                        }}
                        className={`group w-full px-5 py-3 rounded-xl border-2 text-[12px] font-black transition-all text-left flex items-center justify-between uppercase italic tracking-widest ${
                          formData.degree === degree 
                            ? 'border-[#004080] bg-[#004080]/5 text-[#004080] shadow-sm' 
                            : 'border-white bg-white text-gray-400 hover:border-[#004080]/20 hover:text-gray-600 hover:shadow-md'
                        }`}
                      >
                        {degree}
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.degree === degree ? 'bg-[#004080] border-[#004080]' : 'border-gray-200 group-hover:border-[#004080]/30'}`}>
                           {formData.degree === degree && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.degree && <p className="text-red-400 text-[10px] text-left ml-2 animate-pulse font-black italic mt-4">*Select degree to continue</p>}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="relative pt-4">
                        <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 transition-colors ${errors.university ? 'text-red-400' : 'text-gray-400 focus-within:text-[#004080]'}`}>Target Institution</label>
                        <input 
                            type="text" placeholder="e.g. Harvard University" value={formData.university}
                            onChange={(e) => {
                                setFormData({ ...formData, university: e.target.value });
                                if (errors.university) setErrors({ ...errors, university: false });
                            }}
                            list="universities"
                            className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.university ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`}
                        />
                        <datalist id="universities">
                          <option value="Harvard University" /><option value="MIT" /><option value="Oxford University" /><option value="Stanford University" />
                        </datalist>
                    </div>

                    <div className="relative pt-4">
                        <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 transition-colors ${errors.major ? 'text-red-400' : 'text-gray-400 focus-within:text-[#004080]'}`}>Target Major</label>
                        <input 
                            type="text" placeholder="e.g. Computer Science" value={formData.major}
                            onChange={(e) => {
                                setFormData({ ...formData, major: e.target.value });
                                if (errors.major) setErrors({ ...errors, major: false });
                            }}
                            list="majors"
                            className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.major ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`}
                        />
                        <datalist id="majors">
                          <option value="Computer Science" /><option value="Business Administration" /><option value="Data Science" /><option value="Psychology" />
                        </datalist>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative pt-4">
                        <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase z-10 transition-colors ${errors.term ? 'text-red-400' : 'text-gray-400 focus-within:text-[#004080]'}`}>Term</label>
                        <select
                          value={formData.term}
                          onChange={(e) => {
                            setFormData({ ...formData, term: e.target.value });
                            if (errors.term) setErrors({ ...errors, term: false });
                          }}
                          className={`w-full px-4 py-3 text-xs border-b-2 bg-transparent rounded-none appearance-none outline-none font-bold text-gray-800 italic uppercase ${errors.term ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`}
                        >
                          <option value="">Term</option><option value="Fall">Fall</option><option value="Spring">Spring</option><option value="Summer">Summer</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>

                      <div className="relative pt-4">
                        <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase z-10 transition-colors ${errors.year ? 'text-red-400' : 'text-gray-400 focus-within:text-[#004080]'}`}>Year</label>
                        <select
                          value={formData.year}
                          onChange={(e) => {
                            setFormData({ ...formData, year: e.target.value });
                            if (errors.year) setErrors({ ...errors, year: false });
                          }}
                          className={`w-full px-4 py-3 text-xs border-b-2 bg-transparent rounded-none appearance-none outline-none font-bold text-gray-800 italic uppercase ${errors.year ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`}
                        >
                          <option value="">Year</option>
                          {[...Array(6)].map((_, i) => {
                            const y = new Date().getFullYear() + i;
                            return <option key={y} value={y}>{y}</option>;
                          })}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-col items-center text-center justify-center h-full pb-8">
                   <div className="w-20 h-20 bg-[#F0F7FF] rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-blue-50/50">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                   </div>
                   <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic">Mission Ready</h2>
                   <p className="text-gray-400 text-[10px] font-black px-8 italic uppercase tracking-widest leading-relaxed">Your objective is locked. Click Submit to save and refine your profile path.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-6 flex gap-4 justify-between">
            {step > 0 ? (
              <button onClick={prevStep} className="px-8 py-3 text-[10px] font-black text-gray-400 border-2 border-white bg-white rounded-xl shadow-sm hover:shadow-md transition-all uppercase tracking-widest italic">
                Previous
              </button>
            ) : <div />}
            <button 
              onClick={nextStep}
              className="px-12 py-3 bg-[#004080] text-white text-[11px] font-black rounded-xl hover:bg-[#003366] transition-all shadow-xl uppercase tracking-[0.2em] italic transform active:scale-95"
            >
              {step === totalSteps - 1 ? 'Execute' : 'Continue'}
            </button>
          </div>
        </div>

        <AnimatePresence>
            {showSuccess && <SuccessModal onClose={() => { setShowSuccess(false); onClose(); }} />}
        </AnimatePresence>

        <style jsx="true" global="true">{`
          @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-1deg); } }
          .animate-float { animation: float 6s ease-in-out infinite; }
        `}</style>
    </div>
  );
}
