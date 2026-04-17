import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COUNTRIES = [
  { name: "India", states: ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Gujarat", "Rajasthan", "Punjab", "West Bengal", "Madhya Pradesh", "Haryana", "Bihar", "Odisha"] },
  { name: "United States", states: ["California", "New York", "Texas", "Florida", "Illinois", "Washington", "Massachusetts", "Georgia", "Ohio", "Michigan", "Virginia", "Colorado"] },
  { name: "United Kingdom", states: ["England", "Scotland", "Wales", "Northern Ireland"] },
  { name: "Canada", states: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan"] },
];

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 text-center italic">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 rounded-[2rem] shadow-2xl max-w-sm w-full">
        <div className="w-16 h-16 bg-[#F0F7FF] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic leading-relaxed">Experience Added!</h2>
      <p className="text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest italic leading-relaxed">Your professional journey has been updated successfully.</p>
      <button onClick={onClose} className="w-full bg-[#004080] text-white py-4 rounded-3xl font-black hover:bg-[#003366] transition-all shadow-xl active:scale-95 uppercase tracking-widest italic">Great!</button>
    </motion.div>
  </div>
);

export default function WorkExp({ onClose, onSave }) {
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({
    role: "",
    organization: "",
    type: "",
    startDate: "",
    endDate: "",
    isOngoing: false,
    urlInput: "",
    addedUrl: "", 
    description: "",
    country: "",
    state: "",
  });
  
  const [countryQuery, setCountryQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const countryRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) setShowCountrySuggestions(false);
      if (stateRef.current && !stateRef.current.contains(e.target)) setShowStateSuggestions(false);
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
      if (!formData.role) newErrors.role = true;
      if (!formData.organization) newErrors.organization = true;
    } else if (currentStep === 1) {
      if (!formData.country) newErrors.country = true;
      if (!formData.state) newErrors.state = true;
    } else if (currentStep === 2) {
      if (!formData.startDate) newErrors.startDate = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => { 
    if (validateStep(step)) {
      if (step < 4) {
        setStep(prev => prev + 1);
      } else {
        if (onSave) await onSave(formData);
        setShowSuccess(true);
      }
    }
  };
  const prevStep = () => { setStep(prev => Math.max(prev - 1, 0)); };

  const filteredCountries = useMemo(() => {
    if (!countryQuery) return COUNTRIES;
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(countryQuery.toLowerCase()));
  }, [countryQuery]);

  const filteredStates = useMemo(() => {
    const currentCountryData = COUNTRIES.find(c => c.name === formData.country);
    if (!currentCountryData) return [];
    if (!stateQuery) return currentCountryData.states;
    return currentCountryData.states.filter(s => s.toLowerCase().includes(stateQuery.toLowerCase()));
  }, [formData.country, stateQuery]);

  const handleAddUrl = () => {
    if (formData.urlInput) {
      setFormData(prev => ({ ...prev, addedUrl: prev.urlInput, urlInput: "" }));
      setIsAddingUrl(false);
    }
  };

  const removeUrl = () => setFormData(prev => ({ ...prev, addedUrl: "" }));

  const WorkIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90 transition-all duration-500">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[460px] relative font-sans animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="w-full md:w-[35%] bg-[#004282] p-8 flex flex-col items-center justify-center text-center text-white relative">
             <div className="mb-6 p-5 bg-white/10 rounded-2xl backdrop-blur-xl animate-float border border-white/20 relative z-10 shadow-2xl">
                <WorkIcon />
             </div>
             <h2 className="text-xl font-black mb-2 leading-tight tracking-tighter uppercase italic z-10">Work History</h2>
             <p className="text-white/80 text-[10px] max-w-[200px] font-medium leading-relaxed italic uppercase tracking-[0.2em] z-10 font-black">
               Include your professional or academic expertise to showcase your career path.
             </p>
        </div>

        <div className="flex-1 p-8 flex flex-col bg-slate-50/20">
          <div className="mb-4 text-center">
            <h1 className="text-lg font-black text-[#004080] mb-2 uppercase tracking-[0.4em] italic leading-tight">Career Details</h1>
            <div className="relative pt-1 max-w-[240px] mx-auto">
              <div className="flex mb-2 items-end justify-center">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Step {step} of 4 completed</span>
              </div>
              <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-gray-100 shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 4) * 100}%` }} className="h-full bg-[#004080]" />
              </div>
            </div>
          </div>

          <div className="flex-1 relative overflow-y-auto px-1 custom-scrollbar">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.role ? 'text-red-400' : 'text-gray-400'}`}>Role</label>
                    <input type="text" value={formData.role} onChange={(e) => handleInputChange("role", e.target.value)} placeholder="e.g. Software Engineer" className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.role ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`} />
                  </div>
                  <div className="relative pt-4">
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.organization ? 'text-red-400' : 'text-gray-400'}`}>Organization</label>
                    <input type="text" value={formData.organization} onChange={(e) => handleInputChange("organization", e.target.value)} placeholder="e.g. Google" className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.organization ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`} />
                  </div>
                  <div className="relative pt-4">
                    <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Employment Type</label>
                    <select value={formData.type} onChange={(e) => handleInputChange("type", e.target.value)} className="w-full px-4 py-3 text-xs border-b-2 bg-transparent rounded-none appearance-none outline-none font-bold text-gray-800 italic uppercase border-gray-100 focus:border-[#004080] transition-all">
                      <option value="">Select Type</option><option value="Full Time">Full Time</option><option value="Part Time">Part Time</option><option value="Internship">Internship</option><option value="Freelance">Freelance</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4" ref={countryRef}>
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.country ? 'text-red-400' : 'text-gray-400'}`}>Country</label>
                    <input type="text" value={countryQuery || formData.country} onChange={(e) => {setCountryQuery(e.target.value); setShowCountrySuggestions(true); handleInputChange("country", "");}} onFocus={() => setShowCountrySuggestions(true)} placeholder="Search Country" className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.country ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`} />
                    {showCountrySuggestions && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#004080]/10 rounded-xl shadow-2xl max-h-[150px] overflow-y-auto custom-scrollbar">
                         {filteredCountries.map(c => (<div key={c.name} onClick={() => {handleInputChange("country", c.name); setCountryQuery(c.name); setShowCountrySuggestions(false);}} className="px-5 py-3 hover:bg-[#004080]/5 cursor-pointer text-xs font-black uppercase italic text-gray-600 transition-colors">{c.name}</div>))}
                      </div>
                    )}
                  </div>
                  <div className="relative pt-4" ref={stateRef}>
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.state ? 'text-red-400' : 'text-gray-400'}`}>State</label>
                    <input type="text" disabled={!formData.country} value={stateQuery || formData.state} onChange={(e) => {setStateQuery(e.target.value); setShowStateSuggestions(true); handleInputChange("state", "");}} onFocus={() => setShowStateSuggestions(true)} placeholder="Search State" className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider ${errors.state ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'} disabled:opacity-30`} />
                    {showStateSuggestions && formData.country && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#004080]/10 rounded-xl shadow-2xl max-h-[150px] overflow-y-auto custom-scrollbar">
                         {filteredStates.map(s => (<div key={s} onClick={() => {handleInputChange("state", s); setStateQuery(s); setShowStateSuggestions(false);}} className="px-5 py-3 hover:bg-[#004080]/5 cursor-pointer text-xs font-black uppercase italic text-gray-600 transition-colors">{s}</div>))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                    <label className={`absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 ${errors.startDate ? 'text-red-400' : 'text-gray-400'}`}>Start Date</label>
                    <input type="date" value={formData.startDate} onChange={(e) => handleInputChange("startDate", e.target.value)} className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-gray-800 italic border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4">
                    <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">End Date</label>
                    <input type="date" disabled={formData.isOngoing} value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-gray-800 italic border-gray-100 focus:border-[#004080] ${formData.isOngoing ? "opacity-30" : ""}`} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${formData.isOngoing ? "bg-[#004080] border-[#004080]" : "border-gray-200 group-hover:border-[#004080]/30"}`} onClick={() => handleInputChange("isOngoing", !formData.isOngoing)}>
                        {formData.isOngoing && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic group-hover:text-gray-600 transition-colors">Currently Ongoing</span>
                  </label>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                    <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Job URL (optional)</label>
                    <input type="text" value={formData.urlInput} onChange={(e) => handleInputChange("urlInput", e.target.value)} placeholder="e.g. linkedin.com/in/..." className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4 flex-1">
                    <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Highlight your Work</label>
                    <textarea rows={4} value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Describe your key responsibilities..." className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic border-gray-100 focus:border-[#004080] resize-none h-32" />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-col items-center text-center justify-center h-full pb-8">
                   <div className="w-20 h-20 bg-[#F0F7FF] rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-blue-50/50">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                   </div>
                   <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic">Profile Enhanced</h2>
                   <p className="text-gray-400 text-[10px] font-black px-8 italic uppercase tracking-widest leading-relaxed">Your professional records are verified. Click Submit to save and refine your career path.</p>
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
              {step === 4 ? 'Submit' : 'Continue'}
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
