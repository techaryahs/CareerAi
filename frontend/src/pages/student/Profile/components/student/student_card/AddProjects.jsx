import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 text-center italic">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 rounded-[2rem] shadow-2xl max-w-sm w-full">
        <div className="w-16 h-16 bg-[#F0F7FF] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004080" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic leading-relaxed">Project Saved!</h2>
      <p className="text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest italic leading-relaxed">Your professional portfolio has been successfully updated with this project.</p>
      <button onClick={onClose} className="w-full bg-[#004080] text-white py-4 rounded-3xl font-black hover:bg-[#003366] transition-all shadow-xl active:scale-95 uppercase tracking-widest italic">Great!</button>
    </motion.div>
  </div>
);

export default function AddProjects({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    role: "",
    purpose: "",
    startDate: "",
    endDate: "",
    url: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const isStepValid = () => {
    if (step === 1) return formData.title && formData.role && formData.purpose;
    if (step === 2) return formData.startDate && (isOngoing || formData.endDate);
    if (step === 3) return formData.url && formData.description;
    return true;
  };

  const nextStep = async () => {
    if (isStepValid()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        if (onSave) await onSave(formData);
        setShowSuccess(true);
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const ProjectIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90 transition-all duration-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[460px] relative font-sans animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="w-full md:w-[35%] bg-[#004282] p-8 flex flex-col items-center justify-center text-center text-white relative">
             <div className="mb-6 p-5 bg-white/10 rounded-2xl backdrop-blur-xl animate-float border border-white/20 relative z-10 shadow-2xl">
                <ProjectIcon />
             </div>
             <h2 className="text-xl font-black mb-2 leading-tight tracking-tighter uppercase italic z-10">Add Projects</h2>
             <p className="text-white/80 text-[10px] max-w-[200px] font-medium leading-relaxed italic uppercase tracking-[0.2em] z-10 font-black">
               Include your professional or academic projects to showcase your expertise.
             </p>
        </div>

        <div className="flex-1 p-8 flex flex-col bg-slate-50/20">
          <div className="mb-4 text-center">
            <h1 className="text-lg font-black text-[#004080] mb-2 uppercase tracking-[0.4em] italic leading-tight">Project Details</h1>
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
              {step === 1 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Project Title</label>
                        <input name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. AI Career Recommender" className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Your Role</label>
                        <input name="role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="e.g. Lead Developer" className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic uppercase tracking-wider border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Project Purpose</label>
                        <select name="purpose" value={formData.purpose} onChange={(e) => setFormData({...formData, purpose: e.target.value})} className="w-full px-4 py-3 text-xs border-b-2 bg-transparent rounded-none appearance-none outline-none font-bold text-gray-800 italic uppercase border-gray-100 focus:border-[#004080] transition-all">
                            <option value="">Select Purpose</option><option value="Industrial">Industrial</option><option value="Academic">Academic</option><option value="Personal">Personal</option><option value="Other">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-gray-800 italic uppercase border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">End Date</label>
                        <input type="date" name="endDate" disabled={isOngoing} value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold text-gray-800 italic uppercase border-gray-100 focus:border-[#004080] ${isOngoing ? "opacity-30" : ""}`} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${isOngoing ? "bg-[#004080] border-[#004080]" : "border-gray-200 group-hover:border-[#004080]/30"}`} onClick={() => setIsOngoing(!isOngoing)}>
                        {isOngoing && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic group-hover:text-gray-600 transition-colors">Currently Ongoing</span>
                  </label>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6 pt-2">
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Project URL</label>
                        <input name="url" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} placeholder="e.g. github.com/user/repo" className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic border-gray-100 focus:border-[#004080]" />
                  </div>
                  <div className="relative pt-4">
                        <label className="absolute left-4 -top-2 bg-transparent px-2 text-[10px] font-black italic uppercase tracking-[0.2em] z-10 text-gray-400">Description</label>
                        <textarea name="description" rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Explain your contribution..." className="w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic border-gray-100 focus:border-[#004080] resize-none" />
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
                   <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight italic">Portfolio Ready</h2>
                   <p className="text-gray-400 text-[10px] font-black px-8 italic uppercase tracking-widest leading-relaxed">Your professional display is configured. Click Submit to save and refine your profile path.</p>
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
              className={`px-12 py-3 text-white text-[11px] font-black rounded-xl transition-all shadow-xl uppercase tracking-[0.2em] italic transform active:scale-95 ${isStepValid() ? 'bg-[#004080] hover:bg-[#003366]' : 'bg-gray-200 cursor-not-allowed opacity-50'}`}
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
