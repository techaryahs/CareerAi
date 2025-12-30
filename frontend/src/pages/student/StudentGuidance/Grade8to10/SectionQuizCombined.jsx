import React, { useState } from "react";
import {
  QUESTIONS,
  STREAM_DESCRIPTION,
  CAREER_OPPORTUNITIES,
  LEARNING_PATHS,
} from "./data";

export default function SectionQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const STREAM_MAP = {
    Science: "🧠 Science & Technology",
    Commerce: "💼 Business & Finance",
    Arts: "🎨 Creativity & Media",
    Vocational: "🛠️ Practical Skills",
  };

  /* ------------------------------------
       WHEN USER SELECTS AN OPTION
  ------------------------------------ */
  const handleSelect = (opt) => {
    const updated = [...answers, opt];

    if (step + 1 < QUESTIONS.length) {
      setAnswers(updated);
      setStep(step + 1);
    } else {
      calculateResult(updated);
    }
  };

  /* ------------------------------------
       CALCULATE FINAL STREAM
  ------------------------------------ */
  const calculateResult = (finalAns) => {
    let score = { Science: 0, Commerce: 0, Arts: 0, Vocational: 0 };

    finalAns.forEach((ans) => {
      if (ans.includes("Math") || ans.includes("puzzle")) score.Science++;
      if (ans.includes("business") || ans.includes("Talking")) score.Commerce++;
      if (ans.includes("Drawing") || ans.includes("creative")) score.Arts++;
      if (ans.includes("Fixing") || ans.includes("hands")) score.Vocational++;
    });

    const top = Object.keys(score).reduce((a, b) =>
      score[a] > score[b] ? a : b
    );

    setResult(top);

    // 🔥 Pass result to parent component (Grade8to10Home)
    onComplete({
      stream: top,
      emoji: STREAM_MAP[top].split(" ")[0],
      title: STREAM_MAP[top].slice(2),
      description: STREAM_DESCRIPTION[top],
      careers: CAREER_OPPORTUNITIES[top],
      paths: LEARNING_PATHS[top],
    });
  };

  return (
    <section
      id="quiz-section"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <h2 className="text-center text-4xl font-extrabold text-blue-900">
        🎯 Career Discovery Quiz
      </h2>

      <p className="text-center text-gray-600 mt-2">
        A fun and science-backed quiz for students.
      </p>

      <div className="flex justify-center mt-12">
        <div className="bg-white shadow-xl rounded-3xl p-10 max-w-3xl border w-full text-center">

          {/* ---------------- QUIZ UI ---------------- */}
          {!result && (
            <>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Question {step + 1} of {QUESTIONS.length}
              </h2>

              <p className="text-gray-700 mb-6">{QUESTIONS[step].q}</p>

              <div className="space-y-3 max-w-xl mx-auto">
                {QUESTIONS[step].opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className="w-full bg-blue-50 border border-blue-300 py-3 rounded-xl 
                    hover:bg-blue-100 transition text-blue-900"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
