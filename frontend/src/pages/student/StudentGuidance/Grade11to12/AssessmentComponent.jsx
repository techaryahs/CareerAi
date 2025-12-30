import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QUESTIONS } from "./data";
import {
  FaSpinner,
  FaRedo,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa"; // Added icons for better UX
import { useAuth } from "../../../../context/AuthContext";

export default function AssessmentComponent() {
  const { user } = useAuth();
  const userId = user?._id;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({}); // Keep as Object for internal logic
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Configuration
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const STAGE_KEY = "stage11to12";
  const CATEGORY_NAME = "Specialized Skills 11th to 12th";

  // ------------------------------------------------
  // HELPERS: DATA CONVERSION (Fix for Mongoose [String])
  // ------------------------------------------------

  // 1. Convert Object { "1": 10, "2": 5 } -> Array ["1:10", "2:5"]
  const serializeAnswers = (answersObj) => {
    return Object.entries(answersObj).map(([qId, score]) => `${qId}:${score}`);
  };

  // 2. Convert Array ["1:10", "2:5"] -> Object { "1": 10, "2": 5 }
  const deserializeAnswers = (answersArray) => {
    if (!Array.isArray(answersArray)) return {};
    const obj = {};
    answersArray.forEach((str) => {
      // Expect format "id:score"
      const [qId, score] = str.split(":");
      if (qId && score) {
        obj[qId] = Number(score);
      }
    });
    return obj;
  };

  // ------------------------------------------------
  // 1. ON LOAD: CHECK PERMISSION & RESTORE PROGRESS
  // ------------------------------------------------
  useEffect(() => {
    const initPage = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/progress/get-progress/${userId}`
        );

        if (res.data.success && res.data.data) {
          const report = res.data.data;

          // A. Check for Completed Result first
          if (report.stageResults && report.stageResults[STAGE_KEY]) {
            setResult(report.stageResults[STAGE_KEY]);
            setLoading(false);
            return;
          }

          // B. Check for Partial Progress
          if (report.stageProgress && report.stageProgress[STAGE_KEY]) {
            const saved = report.stageProgress[STAGE_KEY];

            // Restore Step
            if (
              saved.currentQuestionIndex > 0 &&
              saved.currentQuestionIndex < QUESTIONS.length
            ) {
              setStep(saved.currentQuestionIndex);
            }

            // Restore Answers (Convert DB Array -> React Object)
            if (saved.answers && saved.answers.length > 0) {
              const parsedAnswers = deserializeAnswers(saved.answers);
              setAnswers(parsedAnswers);
            }
          }
        }
      } catch (error) {
        console.error("Error initializing assessment:", error);
      } finally {
        setLoading(false);
      }
    };

    initPage();
  }, [navigate, API_URL, userId]);

  // ------------------------------------------------
  // 2. HANDLE SELECTION
  // ------------------------------------------------
  const handleSelect = (score) => {
    setAnswers((prev) => ({ ...prev, [QUESTIONS[step].id]: score }));
  };

  // ------------------------------------------------
  // 3. NEXT BUTTON (SAVE PARTIAL PROGRESS)
  // ------------------------------------------------
  const handleNext = () => {
    // Validation
    if (answers[QUESTIONS[step].id] === undefined) {
      alert("Please select an option!");
      return;
    }

    const nextStep = step + 1;
    setStep(nextStep);

    if (userId) {
      // Prepare data for DB
      const formattedAnswers = serializeAnswers(answers); // Convert to ["id:score"]

      axios
        .post(`${API_URL}/api/progress/save-quiz-progress`, {
          userId,
          stage: STAGE_KEY,
          currentQuestionIndex: nextStep,
          answers: formattedAnswers, // Sending Array of Strings to match Schema
          totalQuestions: QUESTIONS.length,
          categoryName: CATEGORY_NAME,
        })
        .catch((err) => console.error("Partial save failed:", err));
    }
  };

  // ------------------------------------------------
  // 4. CALCULATE & SAVE FINAL RESULT
  // ------------------------------------------------
  const calculateResult = async () => {
    // Calculate Score (Using the Object state)
    const total = Object.values(answers).reduce((a, b) => a + b, 0);

    // Logic for Career Path (Example logic)
    let finalPath = "";
    if (total >= 95)
      finalPath = "Science & Technology (Engineering, AI, Research)";
    else if (total >= 75)
      finalPath = "Medical & Healthcare (MBBS, Biotech, Nursing)";
    else if (total >= 55)
      finalPath = "Commerce Fields (Finance, Marketing, Management)";
    else finalPath = "Arts & Humanities (Law, Psychology, Media)";

    const finalResultData = {
      score: total,
      finalPath: finalPath,
      date: new Date().toISOString(),
    };

    setResult(finalResultData);

    if (userId) {
      try {
        await axios.post(`${API_URL}/api/progress/save-result`, {
          userId,
          stage: STAGE_KEY,
          resultData: finalResultData,
          categoryName: CATEGORY_NAME,
          actionLog: `Completed 11th-12th Assessment: ${finalPath}`,
        });
      } catch (error) {
        console.error("Failed to save result:", error);
      }
    }

    // Update generic progress context if available
    // if (typeof updateProgress === 'function') {
    //     updateProgress(STAGE_KEY);
    // }
  };

  // ------------------------------------------------
  // 5. RETAKE (RESET DB & STATE)
  // ------------------------------------------------
  const handleRetake = async () => {
    setLoading(true);

    if (userId) {
      try {
        await axios.post(`${API_URL}/api/progress/reset-progress`, {
          userId,
          stage: STAGE_KEY,
          categoryName: CATEGORY_NAME,
        });
      } catch (error) {
        console.error("Reset failed", error);
      }
    }

    setResult(null);
    setAnswers({});
    setStep(0);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ------------------------------------------------
  // 6. RENDER
  // ------------------------------------------------
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-sky-600 text-3xl" />
        <span className="ml-3 text-gray-600 font-medium">
          Loading Assessment...
        </span>
      </div>
    );

  const current = QUESTIONS[step];
  const progressPercent = (step / QUESTIONS.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl mx-auto my-10">
      {!result ? (
        /* ============ QUIZ SECTION ============ */
        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
              <span>START</span>
              <span>
                Question {step + 1} / {QUESTIONS.length}
              </span>
              <span>FINISH</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-sky-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-snug">
            {current.text}
          </h3>

          <div className="space-y-3 mb-8">
            {current.options.map((o, i) => (
              <label
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                  ${
                    answers[current.id] === o.score
                      ? "bg-sky-50 border-sky-500 shadow-md transform scale-[1.01]"
                      : "bg-white border-gray-100 hover:border-sky-200 hover:bg-gray-50"
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                     ${
                       answers[current.id] === o.score
                         ? "border-sky-500"
                         : "border-gray-300 group-hover:border-sky-400"
                     }`}
                >
                  {answers[current.id] === o.score && (
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full"></div>
                  )}
                </div>

                <input
                  type="radio"
                  name={`q${current.id}`}
                  checked={answers[current.id] === o.score}
                  onChange={() => handleSelect(o.score)}
                  className="hidden"
                />
                <span
                  className={`text-lg font-medium ${
                    answers[current.id] === o.score
                      ? "text-sky-700"
                      : "text-gray-600"
                  }`}
                >
                  {o.label}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                step === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaArrowLeft /> Previous
            </button>

            <button
              onClick={() => {
                if (step + 1 < QUESTIONS.length) {
                  handleNext();
                } else {
                  if (answers[current.id] === undefined) {
                    alert("Please select an option to finish!");
                  } else {
                    calculateResult();
                  }
                }
              }}
              className="flex items-center gap-2 px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-bold shadow-lg shadow-sky-200 active:scale-95"
            >
              {step + 1 === QUESTIONS.length
                ? "Finish Assessment"
                : "Next Question"}
              {step + 1 !== QUESTIONS.length && <FaArrowRight />}
            </button>
          </div>
        </div>
      ) : (
        /* ============ RESULT SECTION ============ */
        <div className="p-10 bg-gradient-to-br from-sky-50 via-white to-gray-50 text-center animate-fade-in h-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
            <FaCheckCircle />
          </div>

          <h3 className="text-xl font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Assessment Completed
          </h3>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 max-w-2xl leading-tight">
            Based on your answers, your recommended path is:
            <br />
            <span className="text-sky-600 mt-2 block">{result.finalPath}</span>
          </h1>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Total Score</span>
              <span className="text-2xl font-bold text-sky-600">
                {result.score}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full"
                style={{ width: `${Math.min(result.score, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={handleRetake}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition font-medium"
            >
              <FaRedo /> Retake Assessment
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition font-medium shadow-xl"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
