import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRedo, FaArrowRight } from "react-icons/fa"; // npm install react-icons

export default function SectionResult({ result,  onRetake }) {
  useEffect(() => {
    try { window.dispatchEvent(new Event('progressUpdated')); } catch (e) { /* ignore */ }
  }, []);

  return (
    <>
      {/* ---------------- HEADER SECTION ---------------- */}
      <section className="bg-gradient-to-br from-sky-500 to-sky-400 py-16 text-white text-center rounded-3xl shadow-xl mx-4 md:mx-0">
        
        <div className="text-8xl animate-bounce-slow">{result.emoji}</div>

        <h1 className="text-4xl font-extrabold mt-4 tracking-wide">
          You're a {result.title}!
        </h1>

        <p className="text-white/90 mt-4 text-lg max-w-2xl mx-auto leading-relaxed px-4">
          {result.description}
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 px-6">
          
          {/* Retake Button */}
          <button
            onClick={onRetake}
            className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/40 px-6 py-3 rounded-full font-semibold transition-all backdrop-blur-sm"
          >
            <FaRedo /> Retake Quiz
          </button>

          {/* Next Level Button */}
          <Link
            to="/student-guidance/8th-10th"
            className="flex items-center justify-center gap-2 bg-white text-sky-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-50 hover:scale-105 transition-all"
          >
            Next Level <FaArrowRight />
          </Link>
          
        </div>
        
        {/* PDF Download Link */}
       

      </section>

      {/* ---------------- DETAILS SECTION ---------------- */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8">

          {/* SUBJECTS */}
          <div className="p-8 bg-sky-50 rounded-2xl border border-sky-100">
            <h2 className="text-2xl font-bold text-sky-800 mb-4 flex items-center gap-2">
              📚 Subjects You’ll Love
            </h2>

            {result.subjects.map((s, i) => (
              <div
                key={i}
                className="p-3 bg-white rounded-xl shadow-sm mb-3 flex items-center border border-gray-100"
              >
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                <p className="text-gray-700 font-medium">{s}</p>
              </div>
            ))}
          </div>

          {/* ACTIVITIES */}
          <div className="p-8 bg-orange-50 rounded-2xl border border-orange-100">
            <h2 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              🎨 Fun Activities
            </h2>

            {result.activities.map((a, i) => (
              <div
                key={i}
                className="flex items-center p-3 bg-white rounded-xl shadow-sm mb-3 border border-gray-100"
              >
                <div className="w-8 h-8 bg-orange-400 text-white flex items-center justify-center mr-3 rounded-full font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-700 font-medium">{a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}