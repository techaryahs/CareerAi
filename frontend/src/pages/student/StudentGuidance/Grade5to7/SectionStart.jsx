import React from "react";

export default function SectionStart({ handleStart }) {
  return (
    <section
      aria-labelledby="start-title"
      className="bg-gradient-to-br from-sky-600 to-indigo-600 py-16 md:py-24 text-white rounded-3xl"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Left: Text */}
          <header>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl">✨</div>
              <span className="text-sm bg-white/10 px-3 py-1 rounded-full">For Classes 5–7</span>
            </div>

            <h1 id="start-title" className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Discover what you love — play a short, fun quiz
            </h1>

            <p className="text-white/90 text-base md:text-lg mb-6 max-w-xl">
              A friendly, activity-based assessment that suggests subjects, activities and learning paths tailored to a young learner's interests.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-3 bg-white text-indigo-700 font-semibold px-5 py-3 rounded-md shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                aria-label="Start the quiz"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.76A1 1 0 006 8.273v7.454a1 1 0 001.234.97l6.518-1.34a1 1 0 00.752-.97v-2.92a1 1 0 00-.252-.299z" />
                </svg>
                <span>Start Quiz</span>
              </button>

              <a href="#" className="text-sm text-white/90 underline ml-2">How it works</a>
            </div>
          </header>

          {/* Right: Visual / Cards */}
          <aside className="order-first md:order-last">
            <div className="bg-white/6 border border-white/10 rounded-2xl p-4 md:p-6 shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-3xl">🎨</div>
                <div>
                  <h4 className="text-white font-semibold">Playful & Quick</h4>
                  <p className="text-white/80 text-sm">Takes a few minutes, designed for kids.</p>
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <li className="p-2 bg-white/5 rounded-md">Subjects</li>
                <li className="p-2 bg-white/5 rounded-md">Activities</li>
                <li className="p-2 bg-white/5 rounded-md">Fun Tasks</li>
                <li className="p-2 bg-white/5 rounded-md">Downloadable Report</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
