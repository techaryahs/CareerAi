import React, { useState } from "react";
import { FaRedo, FaArrowRight, FaGraduationCap, FaRoad } from "react-icons/fa";
import PremiumPlans from "../../../../components/PremiumPlans/PremiumPlans";
import { useAuth } from "../../../../context/AuthContext";
export default function SectionResult({ result, onRetake }) {
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const { user } = useAuth();
  const isPremium = user?.isPremium === true;
  
  React.useEffect(() => {
    try { window.dispatchEvent(new Event('progressUpdated')); } catch (e) { /* ignore */ }
  }, []);

  if (!result) return null;

  return (
    <article className="animate-fade-in w-full">
      {showPremiumPopup && (
        <PremiumPlans onClose={() => setShowPremiumPopup(false)} />
      )}

      {/* HERO / HEADER */}
      <header className="mb-8 md:mb-10 px-4 md:px-0">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
          
          <div className="flex flex-col-reverse md:flex-row items-stretch">
            {/* TEXT CONTENT */}
            <div className="w-full md:w-2/3 p-6 md:p-10 text-white flex flex-col justify-center text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <span className="inline-block px-3 py-1 bg-white/12 rounded-full text-xs md:text-sm font-medium mb-4 border border-white/10">
                  Recommended Stream
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3 md:mb-4">
                {result.title}
              </h1>
              
              <p className="text-blue-100 text-base md:text-lg max-w-3xl leading-relaxed mb-8">
                {result.description}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start" role="group">
                <button
                  onClick={() => isPremium ? window.location.href = "/student-guidance/11th-12th" : setShowPremiumPopup(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-indigo-700 px-6 py-3.5 rounded-xl md:rounded-full font-bold shadow-lg hover:bg-blue-50 hover:scale-[1.02] transition-all active:scale-95"
                >
                  Proceed to 11th–12th
                  <FaArrowRight />
                </button>

                <button
                  onClick={onRetake}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-6 py-3.5 rounded-xl md:rounded-full font-medium transition-all"
                >
                  <FaRedo />
                  <span>Retake</span>
                </button>
              </div>
            </div>

            {/* EMOJI / ICON BOX */}
            <div className="w-full md:w-1/3 bg-white/5 flex items-center justify-center p-8 md:p-0">
              <div className="w-32 h-32 md:w-56 md:h-56 rounded-full md:rounded-2xl bg-white/10 flex items-center justify-center shadow-inner backdrop-blur-sm border border-white/10">
                 <span className="text-6xl md:text-8xl drop-shadow-md filter">
                    {result.emoji}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN DETAILS GRID */}
      {/* Fixed: Removed 'mx-8' which squeezes mobile, used px-4 instead */}
      <main className="max-w-5xl mx-auto px-4 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-10">
        
        {/* Recommended Careers */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow">
          {/* Fixed: Removed weird m-4 md:m-12, used simple mb-6 */}
       
          <div className="flex items-center gap-3 mb-6 md:mx-8 px-8 pt-4">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                <FaGraduationCap size={22} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Recommended Careers</h2>
          </div>
          
          <ul className="grid gap-3 px-8 pb-4">
            {result.careers?.map((career, idx) => (
              <li key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-blue-50">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 shadow-sm" />
                <span className="text-slate-700 font-medium text-base">{career}</span>
              </li>
            ))}
          </ul>
       
        </section>

        {/* Learning Path */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6 px-8 ">
            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg flex-shrink-0">
                <FaRoad size={22} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Learning Path</h2>
          </div>

          {/* Timeline Container */}
          {/* Fixed: Added pl-6 to ensure dots don't touch the edge */}
          <div className="relative pl-6 border-l-2 border-indigo-100 space-y-8 my-2 ml-8">
            {result.paths?.map((path, idx) => (
              <div key={idx} className="relative ">
                 {/* Timeline Dot */}
                 <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm ring-1 ring-indigo-100"></div>
                 
                 <h3 className="text-sm font-bold text-indigo-900 mb-1 uppercase tracking-wide opacity-80">Step {idx + 1}</h3>
                 <p className="text-slate-700 text-base leading-relaxed">{path}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </article>
  );
}