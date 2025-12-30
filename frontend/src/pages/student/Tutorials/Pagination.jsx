import React, { useState, useEffect } from 'react';

export default function Pagination({ currentIndex, total, onNavigate }) {
  const [inputValue, setInputValue] = useState(currentIndex + 1);

  useEffect(() => {
    setInputValue(currentIndex + 1);
  }, [currentIndex]);

  if (total <= 1) return null;

  const handlePrev = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) onNavigate(currentIndex + 1);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1 && num <= total) {
      onNavigate(num - 1);
    }
  };

  return (
    // Reduced mt-12 py-8 to mt-8 py-4
    <div className="mt-8 py-4 border-t border-slate-50 flex flex-col items-center">
      <div className="flex items-center gap-3">
        
        {/* Slim Prev Button */}
        <button 
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-400 font-bold border border-slate-100 disabled:opacity-30 transition-all hover:bg-slate-50 shadow-sm"
        >
          <span className="text-sm">←</span>
          <span className="text-[9px] uppercase tracking-wider">Prev</span>
        </button>

        {/* Compact Input Row */}
        <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
          <input 
            type="text" 
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => setInputValue(currentIndex + 1)}
            // Reduced width and height
            className="w-8 h-7 text-center font-black text-indigo-600 bg-slate-50 rounded text-[11px] border border-transparent focus:border-indigo-500 outline-none transition-all"
          />
          <span className="text-slate-300 font-medium text-[10px]">/</span>
          <span className="text-slate-500 font-bold text-[10px] pr-1">{total}</span>
        </div>

        {/* Slim Next Button */}
        <button 
          type="button"
          onClick={handleNext}
          disabled={currentIndex === total - 1}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-indigo-600 disabled:opacity-30 transition-all shadow-sm"
        >
          <span className="text-[9px] uppercase tracking-wider">Next</span>
          <span className="text-sm">→</span>
        </button>
      </div>
    </div>
  );
}