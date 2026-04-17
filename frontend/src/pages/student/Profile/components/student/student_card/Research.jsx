import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_CONTRIBUTORS = [
  { id: 1, name: "Soma Roy", avatar: "https://i.pravatar.cc/150?u=soma" },
  { id: 2, name: "Sabrina Maxkamova", avatar: "https://i.pravatar.cc/150?u=sabrina" },
  { id: 3, name: "Rahul Sharma", avatar: "https://i.pravatar.cc/150?u=rahul" },
];

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 text-center italic">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 rounded-[2rem] shadow-2xl max-w-sm w-full">
        <div className="w-16 h-16 bg-[#F0F7FF] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic leading-relaxed">Research Added!</h2>
      <p className="text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest italic leading-relaxed">Your intellectual contribution has been successfully updated.</p>
      <button onClick={onClose} className="w-full bg-[#004080] text-white py-4 rounded-3xl font-black hover:bg-[#003366] transition-all shadow-xl active:scale-95 uppercase tracking-widest italic">Great!</button>
    </motion.div>
  </div>
);

export default function Research({ onClose, onSave }) {
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({
    title: "",
    publisher: "",
    date: "",
    url: "",
    description: "",
    contributors: [],
  });
  
  const [contributorQuery, setContributorQuery] = useState("");
  const [showContributors, setShowContributors] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAddingContributors, setIsAddingContributors] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowContributors(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!formData.title) newErrors.title = true;
      if (!formData.publisher) newErrors.publisher = true;
    } else if (currentStep === 1) {
      if (!formData.date) newErrors.date = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(prev => prev + 1);
      } else {
        if (onSave) await onSave(formData);
        setShowSuccess(true);
      }
    }
  };
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const filteredContributors = useMemo(() => {
    if (!contributorQuery) return MOCK_CONTRIBUTORS;
    return MOCK_CONTRIBUTORS.filter(c => c.name.toLowerCase().includes(contributorQuery.toLowerCase()));
  }, [contributorQuery]);

  const toggleContributor = (id) => {
    setFormData(prev => ({
      ...prev,
      contributors: prev.contributors.includes(id) 
        ? prev.contributors.filter(cid => cid !== id)
        : [...prev.contributors, id]
    }));
  };

  const ResearchIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90 transition-all duration-500">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[460px] relative font-sans animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="w-full md:w-[35%] bg-[#004282] p-8 flex flex-col items-center justify-center text-center text-white relative">
             <div className="mb-6 p-5 bg-white/10 rounded-2xl backdrop-blur-xl animate-float border border-white/20 relative z-10 shadow-2xl">
                <ResearchIcon />
             </div>
             <h2 className="text-xl font-black mb-2 leading-tight tracking-tighter uppercase italic z-10">Add Researches</h2>
             <p className="text-white/80 text-[10px] max-w-[200px] font-medium leading-relaxed italic uppercase tracking-[0.2em] z-10 font-black">
               Adding research experience boosts your profile significantly!
             </p>
        </div>

        <div className="flex-1 p-8 flex flex-col bg-slate-50/20">
          <div className="mb-4 text-center">
            <h1 className="text-lg font-black text-[#004080] mb-2 uppercase tracking-[0.4em] italic leading-tight">Research Details</h1>
            <div className="relative pt-1 max-w-[240px] mx-auto">
              <div className="flex mb-2 items-end justify-center">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Step {step} of 3 completed</span>
              </div>
              <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-gray-100 shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }} className="h-full bg-[#004080]" />
              </div>
            </div>
          </div>

          <div className="flex-1 relative overflow-y-auto px-1 custom-scrollbar">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.title ? 'text-red-400' : 'text-gray-400'}`}>Paper Title</label>
                    <input type="text" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="e.g. Advancements in ML" className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.title ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`} />
                  </div>
                  <div className="relative pt-4">
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.publisher ? 'text-red-400' : 'text-gray-400'}`}>Publisher Name</label>
                    <input type="text" value={formData.publisher} onChange={(e) => handleInputChange("publisher", e.target.value)} placeholder="e.g. IEEE Journal" className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.publisher ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`} />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2 h-full flex flex-col">
                  <div className="relative pt-4">
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.date ? 'text-red-400' : 'text-gray-400'}`}>Publication Date</label>
                    <input type="date" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-gray-800 italic border-gray-100 focus:border-[#004080]" />
                  </div>
                  
                  <div className="relative pt-4 flex-1" ref={searchRef}>
                    <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Contributors</label>
                    <div onClick={() => setIsAddingContributors(!isAddingContributors)} className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-[#004080] italic uppercase cursor-pointer border-gray-100 hover:border-[#004080]/30 flex justify-between items-center">
                        {formData.contributors.length > 0 ? `${formData.contributors.length} Selected` : "Select Contributors"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    {isAddingContributors && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#004080]/10 rounded-xl shadow-2xl max-h-[150px] overflow-y-auto custom-scrollbar">
                         {MOCK_CONTRIBUTORS.map(c => (
                            <div key={c.id} onClick={() => toggleContributor(c.id)} className={`px-5 py-3 hover:bg-[#004080]/5 cursor-pointer text-xs font-black uppercase italic transition-colors flex items-center justify-between ${formData.contributors.includes(c.id) ? 'text-[#004080] bg-[#004080]/5' : 'text-gray-600'}`}>
                                {c.name}
                                {formData.contributors.includes(c.id) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                            </div>
                         ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 py-4">
                     {formData.contributors.map(id => (
                        <div key={id} className="bg-[#004080]/5 border border-[#004080]/10 px-3 py-1 rounded-full text-[9px] font-black uppercase italic text-[#004080] flex items-center gap-2">
                            {MOCK_CONTRIBUTORS.find(u => u.id === id)?.name}
                            <svg onClick={() => toggleContributor(id)} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="cursor-pointer hover:text-red-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                     ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2 flex flex-col h-full">
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Paper Link</label>
                        <input type="url" value={formData.url} onChange={(e) => handleInputChange("url", e.target.value)} placeholder="e.g. researchgate.net/..." className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4 flex-1">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Brief Overview</label>
                        <textarea rows={4} value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Explain the key findings of your research..." className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic border-gray-100 focus:border-[#004080] resize-none h-32" />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-col items-center text-center justify-center h-full pb-8">
                   <div className="w-20 h-20 bg-[#F0F7FF] rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-blue-50/50">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                   </div>
                   <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic text-center">Research Verified</h2>
                   <p className="text-gray-400 text-[10px] font-black px-8 italic uppercase tracking-widest leading-relaxed text-center">Your intellectual footprint is registered. Click Submit to save and refine your profile path.</p>
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
              {step === 3 ? 'Finalize' : 'Continue'}
            </button>
          </div>
        </div>

        <AnimatePresence>
            {showSuccess && <SuccessModal onClose={() => { setShowSuccess(false); onClose(); }} />}
        </AnimatePresence>

        <style jsx="true" global="true">{`
          @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-1deg); } }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        `}</style>
    </div>
  );
}
