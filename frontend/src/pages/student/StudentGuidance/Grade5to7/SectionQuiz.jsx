import React from "react";

export default function SectionQuiz({
  questions,
  currentQuestion,
  handleAnswer,
  handlePrevious,
  progressPercent,
}) {
  const q = questions[currentQuestion];

  return (
    <>
      {/* PROGRESS BAR */}
      <section className="bg-gradient-to-br from-sky-500 to-sky-400 py-6 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <div>Question {currentQuestion + 1} of {questions.length}</div>
              <div>{progressPercent}%</div>
            </div>

            <div className="w-1/2 bg-white/30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUESTION SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-sky-800 text-center mb-6">
            {q.question}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.type)}
                className="p-8 rounded-2xl shadow bg-sky-50 hover:bg-sky-100 transition text-left"
              >
                <div className="text-5xl mb-3">{opt.emoji}</div>
                <div className="text-xl font-semibold text-sky-800">{opt.text}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-white border px-4 py-2 rounded-full shadow"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
