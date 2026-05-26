import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheck } from "react-icons/fa";

const STEPS = [
  {
    id: "interests",
    title: "Core Interests",
    question: "What drives your professional curiosity?",
    options: [
      { id: "tech", label: "Technology & Innovation", icon: "💻" },
      { id: "business", label: "Strategy & Management", icon: "📊" },
      { id: "creative", label: "Design & Arts", icon: "🎨" },
      { id: "science", label: "Research & Development", icon: "🔬" },
    ],
  },
  {
    id: "workspace",
    title: "Ideal Workspace",
    question: "Where do you see yourself thriving?",
    options: [
      { id: "corp", label: "Global Corporations", icon: "🏢" },
      { id: "startup", label: "Dynamic Startups", icon: "🚀" },
      { id: "academia", label: "Research Institutions", icon: "🎓" },
      { id: "freelance", label: "Independent Practice", icon: "🌍" },
    ],
  },
  {
    id: "impact",
    title: "Impact Goal",
    question: "What kind of impact do you want to create?",
    options: [
      { id: "profit", label: "Economic Growth", icon: "💰" },
      { id: "social", label: "Social Transformation", icon: "🤝" },
      { id: "eco", label: "Environmental Sustainability", icon: "🌿" },
      { id: "tech_adv", label: "Technological Breakthrough", icon: "⚡" },
    ],
  },
];

export default function CareerAICheck({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (optionId) => {
    setSelections((prev) => ({ ...prev, [STEPS[currentStep].id]: optionId }));
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setResult("Based on your profile, you are ideally suited for Technical Leadership tracks.");
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-[650px] mx-auto bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[480px] relative font-sans animate-in fade-in zoom-in duration-300 border border-gray-100 italic">
      <div className="w-full md:w-[33%] bg-black p-8 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-0 bg-blue-500/10 blur-[50px] rounded-full" />
        <div className="w-[100px] h-[100px] bg-gray-900 border border-blue-500/30 rounded-full flex items-center justify-center shadow-2xl relative z-10 text-4xl">🤖</div>
        <div className="z-10">
          <h2 className="text-[20px] font-black text-blue-500 mb-6 uppercase tracking-[0.2em] italic">Career AI Check</h2>
          <p className="text-white/60 font-medium leading-tight px-2 text-[12px]">Our proprietary algorithm analyzes your optimal path.</p>
        </div>
      </div>

      <div className="flex-1 p-8 bg-white flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-[18px] font-bold text-black uppercase tracking-widest italic">AI Assessment</h1>
          <button onClick={onClose} className="text-black hover:opacity-70 transition-opacity"><FaTimes /></button>
        </div>
        
        <div className="w-full h-[3px] bg-gray-100 rounded-full overflow-hidden mb-8">
          <motion.div className="h-full bg-blue-600" animate={{ width: `${((currentStep + (result ? 1 : 0)) / STEPS.length) * 100}%` }} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 text-center">
                <div className="relative w-20 h-20 text-4xl">🧠</div>
                <h3 className="text-xl font-bold text-black tracking-tight uppercase italic">Analyzing Potential...</h3>
              </motion.div>
            ) : result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl"><FaCheck /></div>
                <h3 className="text-xl font-bold text-black tracking-tight uppercase italic">Recommendation Ready</h3>
                <div className="bg-gray-50 border border-blue-500/20 p-6 rounded-2xl">
                  <p className="text-black text-sm leading-relaxed italic font-medium">"{result}"</p>
                </div>
                <button onClick={onClose} className="bg-blue-600 text-white px-8 py-3 rounded-full font-black text-[12px] uppercase active:scale-95">Complete</button>
              </motion.div>
            ) : (
              <motion.div key="step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{STEPS[currentStep].title}</span>
                  <h3 className="text-xl font-bold text-black tracking-tight uppercase italic mt-1">{STEPS[currentStep].question}</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {STEPS[currentStep].options.map((option) => (
                    <button key={option.id} onClick={() => handleSelect(option.id)} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-semibold text-gray-700 uppercase tracking-wider text-[13px] italic">{option.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
