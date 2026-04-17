import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTS = [
  {
    id: "toefl",
    name: "TOEFL",
    fields: [
      { name: "reading", label: "TOEFL Reading Score", min: 0, max: 30 },
      { name: "speaking", label: "TOEFL Speaking Score", min: 0, max: 30 },
      { name: "listening", label: "TOEFL Listening Score", min: 0, max: 30 },
      { name: "writing", label: "TOEFL Writing Score", min: 0, max: 30 },
    ],
  },
  {
    id: "ielts",
    name: "IELTS",
    fields: [
      { name: "reading", label: "IELTS Reading Score", min: 0, max: 9, step: 0.5 },
      { name: "speaking", label: "IELTS Speaking Score", min: 0, max: 9, step: 0.5 },
      { name: "listening", label: "IELTS Listening Score", min: 0, max: 9, step: 0.5 },
      { name: "writing", label: "IELTS Writing Score", min: 0, max: 9, step: 0.5 },
    ],
  },
  {
    id: "duolingo",
    name: "Duolingo",
    fields: [
      { name: "literacy", label: "Literacy Score", min: 10, max: 160 },
      { name: "conversation", label: "Conversation Score", min: 10, max: 160 },
      { name: "comprehension", label: "Comprehension Score", min: 10, max: 160 },
      { name: "production", label: "Production Score", min: 10, max: 160 },
    ],
  },
  {
    id: "gre",
    name: "GRE",
    fields: [
      { name: "verbal", label: "Verbal Reasoning", min: 130, max: 170 },
      { name: "quantitative", label: "Quantitative Reasoning", min: 130, max: 170 },
      { name: "writing", label: "Analytical Writing", min: 0, max: 6, step: 0.5 },
    ],
  },
  {
    id: "gmat",
    name: "GMAT",
    fields: [
      { name: "verbal", label: "Verbal Score", min: 0, max: 60 },
      { name: "quantitative", label: "Quantitative Score", min: 0, max: 60 },
      { name: "reasoning", label: "Integrated Reasoning", min: 1, max: 8 },
      { name: "writing", label: "Analytical Writing", min: 0, max: 6, step: 0.5 },
    ],
  },
  {
    id: "mcat",
    name: "MCAT",
    fields: [
      { name: "physical", label: "Chemical and Physical", min: 118, max: 132 },
      { name: "analysis", label: "Critical Analysis", min: 118, max: 132 },
      { name: "biological", label: "Biological and Biochemical", min: 118, max: 132 },
      { name: "social", label: "Psychological and Social", min: 118, max: 132 },
    ],
  },
  {
    id: "pte",
    name: "PTE",
    fields: [
      { name: "reading", label: "Reading Score", min: 10, max: 90 },
      { name: "speaking", label: "Speaking Score", min: 10, max: 90 },
      { name: "listening", label: "Listening Score", min: 10, max: 90 },
      { name: "writing", label: "Writing Score", min: 10, max: 90 },
    ],
  },
  {
    id: "sat",
    name: "SAT",
    fields: [
      { name: "reading_writing", label: "Reading & Writing", min: 200, max: 800 },
      { name: "math", label: "Math Score", min: 200, max: 800 },
    ],
  },
  {
    id: "act",
    name: "ACT",
    fields: [
      { name: "english", label: "English Score", min: 1, max: 36 },
      { name: "math", label: "Math Score", min: 1, max: 36 },
      { name: "reading", label: "Reading Score", min: 1, max: 36 },
      { name: "science", label: "Science Score", min: 1, max: 36 },
    ],
  },
];

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 text-center italic">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 rounded-[2rem] shadow-2xl max-w-sm w-full">
      <p className="text-gray-600 text-lg font-medium mb-8 uppercase tracking-widest italic leading-relaxed">Your scores have been updated successfully</p>
      <button onClick={onClose} className="bg-[#004080] text-white px-14 py-3 rounded-full font-black hover:bg-[#003366] transition-all shadow-md active:scale-95 uppercase tracking-widest italic">Close</button>
    </motion.div>
  </div>
);

export default function TestScores({ onClose, onSave }) {
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [testScores, setTestScores] = useState({});
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const currentTest = TESTS.find(t => t.id === selectedTestId);
  const completedCount = Object.keys(testScores).length;

  const handleInputChange = (fieldName, value) => {
    if (!selectedTestId) return;
    setTestScores(prev => ({
      ...prev,
      [selectedTestId]: {
        ...(prev[selectedTestId] || {}),
        [fieldName]: value
      }
    }));
    if (errors[fieldName]) {
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentTest) return;

    const scoresForThisTest = testScores[selectedTestId] || {};
    const filledFields = Object.keys(scoresForThisTest).filter(k => scoresForThisTest[k] !== "");

    if (filledFields.length === 0) {
      alert("Please enter at least one score to save.");
      return;
    }

    const newErrors = {};
    filledFields.forEach(fieldName => {
      const field = currentTest.fields.find(f => f.name === fieldName);
      const value = scoresForThisTest[fieldName];
      const num = parseFloat(value);
      if (isNaN(num) || num < field.min || num > field.max) {
        newErrors[fieldName] = `invalid (Range: ${field.min}-${field.max})`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSave) {
        // Calculate a total score string for display
        const total = filledFields.reduce((acc, k) => acc + parseFloat(scoresForThisTest[k]), 0);
        
        await onSave({
            testType: currentTest.name,
            sectionScores: scoresForThisTest,
            score: total.toString() // Simplified total
        });
    }

    setShowSuccess(true);
  };

  return (
    <div className="w-full max-w-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[480px] relative font-sans animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="w-full md:w-[35%] bg-[#004282] p-8 flex flex-col items-center justify-center text-center text-white relative">
            <div className="mb-6 p-4 bg-white/10 rounded-2xl backdrop-blur-md animate-float border border-white/20">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <h2 className="text-2xl font-black mb-3 tracking-tighter uppercase italic leading-none">Standardized Tests</h2>
            <p className="text-white/80 text-[11px] max-w-[180px] font-medium leading-relaxed italic uppercase tracking-wider">
                {selectedTestId ? `Entering your scores for ${currentTest.name}. Keep it real!` : "List the standardized tests you have appeared for."}
            </p>
        </div>

        <div className="flex-1 p-8 flex flex-col bg-slate-50/30">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Test Scores</h3>
                <span className="text-[10px] font-black text-[#004080] uppercase tracking-[0.2em] italic">{completedCount} of {TESTS.length} Added</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-8">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(completedCount / TESTS.length) * 100}%` }} className="h-full bg-[#004080]" />
            </div>

            <div className="flex-1 relative overflow-y-auto px-1 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {!selectedTestId ? (
                        <motion.div key="selection" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="grid grid-cols-1 gap-2.5 pb-4">
                            <p className="text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest italic ml-1 select-none">Select your test:</p>
                            {TESTS.map(test => (
                                <button key={test.id} onClick={() => setSelectedTestId(test.id)} className={`group w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 transform active:scale-[0.98] ${testScores[test.id] ? 'border-[#004080]/30 bg-white shadow-md' : 'border-white bg-white hover:border-[#004080]/20 hover:shadow-lg'}`}>
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${testScores[test.id] ? 'bg-[#004080] border-[#004080]' : 'border-gray-200 group-hover:border-[#004080]'}`}>
                                        {testScores[test.id] && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                    </div>
                                    <span className="text-[12px] font-bold text-gray-600 uppercase tracking-widest italic transition-colors group-hover:text-[#004080]">{test.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div key="form" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => setSelectedTestId(null)}>
                                <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-[#004080] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:text-white"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic group-hover:text-gray-600">Back to List</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                                <div className="grid grid-cols-1 gap-6">
                                    {currentTest.fields.map(field => (
                                        <div key={field.name} className="relative pt-4">
                                            <label className={`absolute left-4 -top-2 bg-slate-50/0 px-2 text-[10px] font-black z-10 uppercase tracking-[0.2em] italic transition-colors ${errors[field.name] ? 'text-red-400' : 'text-gray-400 focus-within:text-[#004080]'}`}>
                                                {field.label}
                                            </label>
                                            <input 
                                                type="number" step={field.step || 1} min={field.min} max={field.max}
                                                value={testScores[selectedTestId]?.[field.name] || ""}
                                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                placeholder={`Enter (Range: ${field.min}-${field.max})`}
                                                className={`w-full px-4 py-3 text-sm border-b-2 bg-transparent rounded-none transition-all outline-none font-bold placeholder:text-gray-200 text-gray-800 italic ${errors[field.name] ? 'border-red-300' : 'border-gray-100 focus:border-[#004080]'}`}
                                            />
                                            {errors[field.name] && <span className="text-red-500 text-[9px] font-black uppercase italic mt-1 ml-2 animate-pulse">{errors[field.name]}</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto pt-8 pb-4">
                                    <button type="submit" className="w-full py-4 bg-[#004080] text-white text-[11px] font-black rounded-xl hover:bg-[#003366] transition-all shadow-xl uppercase tracking-[0.3em] italic transform active:scale-95">Save {currentTest.name} Scores</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        <AnimatePresence>
            {showSuccess && <SuccessModal onClose={() => { setShowSuccess(false); onClose(); }} />}
        </AnimatePresence>

        <style jsx="true">{`
          @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
          .animate-float { animation: float 5s ease-in-out infinite; }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        `}</style>
    </div>
  );
}
