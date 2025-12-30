import React from "react";

// ✅ Receive props from Parent. Do NOT use useState here.
export default function SectionQuiz({ questions, currentQuestion, handleAnswer }) {

  // Safety check to prevent crash if data is missing
  if (!questions || !questions[currentQuestion]) {
    return <div>Loading Question...</div>;
  }

  const data = questions[currentQuestion];
  const progressPercent = Math.round(((currentQuestion) / questions.length) * 100);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <h2 className="text-center text-4xl font-extrabold text-blue-900">
        🎯 Career Discovery Quiz
      </h2>

      <p className="text-center text-gray-600 mt-2">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      {/* Progress Bar */}
      <div className="max-w-xl mx-auto mt-4 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-xl rounded-3xl p-10 max-w-3xl border w-full text-center">

          {/* Question Text */}
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            {data.q}
          </h2>

          {/* Options */}
          <div className="space-y-3 max-w-xl mx-auto">
            {data.opts.map((opt, i) => (
              <button
                key={i}
                // ✅ When clicked, tell Parent: "User chose X"
                onClick={() => handleAnswer(opt)}
                className="w-full bg-blue-50 border border-blue-300 py-3 rounded-xl 
                hover:bg-blue-600 hover:text-white hover:border-blue-600 
                transition-all duration-200 text-blue-900 font-medium"
              >
                {opt}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}