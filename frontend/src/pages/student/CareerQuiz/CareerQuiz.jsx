import React, { useState, useEffect } from "react";
import axios from "axios";
import { Lock, RefreshCw, ChevronRight } from "lucide-react"; // Icons

// Components
import { questions } from "./data";
import QuizHome from "./QuizHome";
import QuizGame from "./QuizGame";
import QuizResults from "./QuizResults";
import PremiumPopup from "../../../components/PremiumPlans/PremiumPlans";
import { useAuth } from "../../../context/AuthContext";
const CareerQuiz = () => {
  const { user, loading: authLoading } = useAuth();
  // --- State ---
  const [currentScreen, setCurrentScreen] = useState("loading");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false); // Stores the result object
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  console.log(user)
  // --- Configuration ---
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const STAGE_KEY = "career_quiz";
  const CATEGORY_NAME = "Career Path Assessment";
  // --- H elpers ---

  const serializeAnswers = (answersObj) =>
    Object.entries(answersObj).map(([qId, score]) => `${qId}:${score}`);

  const deserializeAnswers = (answersArray) => {
    if (!Array.isArray(answersArray)) return {};
    const obj = {};
    answersArray.forEach((str) => {
      if (typeof str === "string") {
        const [qId, score] = str.split(":");
        if (qId && score) obj[qId] = Number(score);
      }
    });
    return obj;
  };

  // --- 1. On Load: Check User & Restore Progress ---
  useEffect(() => {
    const initPage = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get(
          `${API_URL}/api/progress/get-progress/${user._id}`
        );

        if (response.data.success && response.data.data) {
          const report = response.data.data;

          // A. If Result Exists -> Go to Result Screen (Locked or Unlocked handled in Render)
          if (report.stageResults && report.stageResults[STAGE_KEY]) {
            setShowResults(report.stageResults[STAGE_KEY]);
            setCurrentScreen("results");
            return;
          }

          // B. If Partial Progress -> Resume Quiz
          if (report.stageProgress && report.stageProgress[STAGE_KEY]) {
            const saved = report.stageProgress[STAGE_KEY];
            if (
              saved.currentQuestionIndex >= 0 &&
              saved.currentQuestionIndex < questions.length
            ) {
              setAnswers(deserializeAnswers(saved.answers));
              setCurrentQuestion(saved.currentQuestionIndex);
              setCurrentScreen("quiz");
              return;
            }
          }
        }
        setCurrentScreen("home");
      } catch (error) {
        console.error("Sync Error:", error);
        setCurrentScreen("home");
      }
    };

    initPage();
  }, [API_URL, user]);

  // --- 2. Logic: Calculate & Save ---
  const calculateResults = async () => {
    console.log("🧠 Calculating Results...");

    let introvertScore = 0;
    let extrovertScore = 0;
    const pathScores = {};

    Object.entries(answers).forEach(([id, value]) => {
      const q = questions.find((x) => x.id === parseInt(id));
      if (q) {
        if (q.personality === "Introvert") introvertScore += value;
        else extrovertScore += value;

        q.bestPaths.forEach((path) => {
          if (!pathScores[path]) pathScores[path] = 0;
          pathScores[path] += value;
        });
      }
    });

    const personalityType =
      introvertScore >= extrovertScore ? "Introvert" : "Extrovert";
    const maxScore = Math.max(...Object.values(pathScores));
    const percentageScores = Object.entries(pathScores).map(([k, v]) => [
      k,
      Math.round((v / maxScore) * 100),
    ]);
    const topPaths = [...percentageScores]
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const resultData = {
      personalityType,
      topPaths,
      allScores: percentageScores,
      dateTaken: new Date(),
    };

    // 1. Update State (Go to Results Screen)
    setShowResults(resultData);
    setCurrentScreen("results");

    // 2. Save to DB (We save it even if they are free, so it's ready when they upgrade)
    if (user?._id) {
      try {
        await axios.post(`${API_URL}/api/progress/save-result`, {
          userId: user._id,
          stage: STAGE_KEY,
          resultData: resultData,
          categoryName: CATEGORY_NAME,
        });
      } catch (error) {
        console.error("❌ Error saving result:", error);
      }
    }
  };

  // --- Handlers ---
  const startQuiz = () => {
    setCurrentScreen("quiz");
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (id, val) => {
    const updatedAnswers = { ...answers, [id]: val };
    setAnswers(updatedAnswers);

    // Background save
    if (user?._id) {
      axios
        .post(`${API_URL}/api/progress/save-quiz-progress`, {
          userId: user._id,
          stage: STAGE_KEY,
          currentQuestionIndex: currentQuestion,
          answers: serializeAnswers(updatedAnswers),
          totalQuestions: questions.length,
          categoryName: CATEGORY_NAME,
        })
        .catch((err) => console.error(err));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextIdx = currentQuestion + 1;
      setCurrentQuestion(nextIdx);

      if (user?._id) {
        axios
          .post(`${API_URL}/api/progress/save-quiz-progress`, {
            userId: user._id,
            stage: STAGE_KEY,
            currentQuestionIndex: nextIdx,
            answers: serializeAnswers(answers),
            totalQuestions: questions.length,
            categoryName: CATEGORY_NAME,
          })
          .catch((err) => console.error(err));
      }
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () =>
    currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

  const goToHome = () => {
    setCurrentScreen("home");
    setAnswers({});
    setCurrentQuestion(0);
  };

  const handleRetake = async () => {
    if (user?._id) {
      await axios
        .post(`${API_URL}/api/progress/reset-progress`, {
          userId: user._id,
          stage: STAGE_KEY,
          categoryName: CATEGORY_NAME,
        })
        .catch(console.error);
    }
    startQuiz();
  };

  // --- RENDER ---

  if (currentScreen === "loading" || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (currentScreen === "home") {
    return <QuizHome onStart={startQuiz} />;
  }

  // logic: If Premium -> Show Full Results. If Free -> Show Locked View
  if (currentScreen === "results") {
    if (user.isPremium) {
      return (
        <QuizResults
          showResults={showResults}
          onRetake={handleRetake}
          onHome={goToHome}
        />
      );
    } else {
      // 🔒 LOCKED / FREE VIEW
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center space-y-8 animate-fadeInUp">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🎉</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Quiz Completed!
              </h2>
              <p className="text-gray-600 mt-2">
                We have analyzed your answers and generated your personalized
                career report.
              </p>
            </div>

            {/* Locked Content Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <div className="opacity-30 filter blur-sm select-none">
                <h3 className="text-xl font-bold">
                  Your Top Career: Engineering
                </h3>
                <div className="mt-4 h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setShowPremiumPopup(true)}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Show My Results <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleRetake}
                className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Retake Quiz
              </button>
            </div>
          </div>

          {/* POPUP OVERLAY */}
          {showPremiumPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
              <PremiumPopup
                onClose={() => setShowPremiumPopup(false)} // Just close popup, stay on locked screen
                onUpgrade={() => window.location.reload()} // Reload to refresh user status
              />
            </div>
          )}
        </div>
      );
    }
  }

  // Quiz Game View
  return (
    <QuizGame
      question={questions[currentQuestion]}
      currentQuestionIndex={currentQuestion}
      totalQuestions={questions.length}
      answers={answers}
      handleAnswer={handleAnswer}
      nextQuestion={nextQuestion}
      prevQuestion={prevQuestion}
    />
  );
};

export default CareerQuiz;
