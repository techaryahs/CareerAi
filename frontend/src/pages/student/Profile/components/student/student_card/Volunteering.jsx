import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 text-center italic">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 rounded-[2rem] shadow-2xl max-w-sm w-full">
        <div className="w-16 h-16 bg-[#F0F7FF] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic leading-relaxed">Impact Added!</h2>
      <p className="text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest italic leading-relaxed">Your volunteering experience has been successfully documented in your profile.</p>
      <button onClick={onClose} className="w-full bg-[#004080] text-white py-4 rounded-3xl font-black hover:bg-[#003366] transition-all shadow-xl active:scale-95 uppercase tracking-widest italic">Great!</button>
    </motion.div>
  </div>
);

export default function Volunteering({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    organization: "",
    role: "",
    startDate: "",
    endDate: "",
    ongoing: false,
    cause: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isValid = () => {
    if (step === 1) return form.organization && form.role;
    if (step === 2) return form.startDate;
    if (step === 3) return form.cause && form.description;
    return true;
  };

  const nextStep = async () => {
    if (isValid()) {
      if (step === totalSteps) {
        if (onSave) await onSave(form);
        setShowSuccess(true);
      } else {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const VolunteerIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90 transition-all duration-500">
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 21l7.65-7.65.77-.78a5.4 5.4 0 0 0 0-7.65z" />
    </svg>
  );

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[460px] relative font-sans animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="w-full md:w-[35%] bg-[#004282] p-8 flex flex-col items-center justify-center text-center text-white relative">
             <div className="mb-6 p-5 bg-white/10 rounded-2xl backdrop-blur-xl animate-float border border-white/20 relative z-10 shadow-2xl">
                <VolunteerIcon />
             </div>
             <h2 className="text-xl font-black mb-2 leading-tight tracking-tighter uppercase italic z-10">Volunteering</h2>
             <p className="text-white/80 text-[10px] max-w-[200px] font-medium leading-relaxed italic uppercase tracking-[0.2em] z-10 font-black">
               List your volunteering activities and contributions to show your social impact.
             </p>
        </div>

        <div className="flex-1 p-8 flex flex-col bg-slate-50/20">
          <div className="mb-4 text-center">
            <h1 className="text-lg font-black text-[#004080] mb-2 uppercase tracking-[0.4em] italic leading-tight">Social Contribution</h1>
            <div className="relative pt-1 max-w-[240px] mx-auto">
              <div className="flex mb-2 items-end justify-center">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Step {step} of 3 completed</span>
              </div>
              <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-gray-100 shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }} className="h-full bg-[#004080]" />
              </div>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Organization Name</label>
                        <input name="organization" value={form.organization} onChange={handleChange} placeholder="e.g. Red Cross, NGO" className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Role / Position</label>
                        <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Volunteer Teacher" className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider border-gray-100 focus:border-[#004080]" />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${form.ongoing ? "bg-[#004080] border-[#004080]" : "border-gray-200 group-hover:border-[#004080]/30"}`}>
                        <input type="checkbox" name="ongoing" checked={form.ongoing} onChange={handleChange} className="hidden" />
                        {form.ongoing && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic group-hover:text-gray-600 transition-colors">Currently Ongoing</span>
                  </label>
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Start Date</label>
                        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-gray-800 italic uppercase border-gray-100 focus:border-[#004080]" />
                  </div>
                  {!form.ongoing && (
                    <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">End Date</label>
                        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-gray-800 italic uppercase border-gray-100 focus:border-[#004080]" />
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2 h-full flex flex-col pb-4">
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Cause / Category</label>
                        <select name="cause" value={form.cause} onChange={handleChange} className="w-full px-4 py-3 text-xs border-b-2 bg-transparent rounded-none appearance-none outline-none font-bold text-gray-800 italic uppercase border-gray-100 focus:border-[#004080] transition-all">
                            <option value="">Select Cause</option>
                            <option>Arts And Culture</option><option>Children</option><option>Animal Welfare</option><option>Civil Rights</option><option>Social Rights</option><option>Economic Empowerment</option><option>Education</option><option>Environment</option><option>Human Rights</option><option>Disaster Support</option><option>Politics</option><option>Poverty Alleviation</option><option>Science & Tech</option><option>Social Services</option><option>Health</option><option>Others</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                  </div>
                  <div className="relative pt-4 flex-1">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Your Contribution</label>
                        <textarea name="description" rows={4} value={form.description} onChange={handleChange} placeholder="Explain your contribution..." className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic border-gray-100 focus:border-[#004080] resize-none h-24" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-6 flex gap-4 justify-between">
            {step > 1 ? (
              <button onClick={prevStep} className="px-8 py-3 text-[10px] font-black text-gray-400 border-2 border-white bg-white rounded-xl shadow-sm hover:shadow-md transition-all uppercase tracking-widest italic">
                Previous
              </button>
            ) : <div />}
            <button 
              onClick={nextStep}
              className={`px-12 py-3 text-white text-[11px] font-black rounded-xl transition-all shadow-xl uppercase tracking-[0.2em] italic transform active:scale-95 ${isValid() ? 'bg-[#004080] hover:bg-[#003366]' : 'bg-gray-200 cursor-not-allowed opacity-50'}`}
            >
              {step === totalSteps ? 'Finalize' : 'Continue'}
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
