import React from "react";
import { ArrowRight, PlayCircle, BookOpen, Calculator, Palette } from "lucide-react";

export default function SectionHero({ handleStart }) {
  return (
    <section className="relative w-full  bg-blue-50 overflow-hidden">
      
      {/* BACKGROUND DECORATION (Subtle Blobs) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* MAIN CARD CONTAINER */}
      <div className="relative max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl shadow-blue-100 overflow-hidden border border-white/50">
        
        <div className="flex flex-col items-center p-4 justify-center text-center relative z-10">
          
          {/* BADGE */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5  mt-4 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-xs md:text-sm font-bold tracking-wide uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Class 8th to 10th Assessment
          </span>

          {/* HEADLINE */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Discover Your Ideal <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Career Stream
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Confused between <span className="font-semibold text-slate-700">Science</span>, <span className="font-semibold text-slate-700">Commerce</span>, or <span className="font-semibold text-slate-700">Arts</span>? 
            Take our AI-powered assessment to find the perfect fit for your Class 11 & 12 journey.
          </p>

          {/* BUTTON GROUP */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <button 
              onClick={handleStart}
              className="group relative flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
          
          </div>

          {/* STATS / TRUST INDICATOR */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm font-medium text-slate-400">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <BookOpen size={18} /> 
                </div>
                <span>Science Analysis</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <Calculator size={18} />
                </div>
                <span>Commerce Aptitude</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Palette size={18} />
                </div>
                <span>Arts & Creative</span>
             </div>
          </div>

        </div>

        {/* DECORATIVE GRID PATTERN (Optional) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
      </div>
    </section>
  );
}