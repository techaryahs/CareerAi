import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

// Components
import SectionStart from "./SectionStart";
import SectionDiscover from "./SectionDiscover";
import SectionQuiz from "./SectionQuiz";
import SectionResult from "./SectionResult";
import ProgressSidebar from "../Progress";

// Data
import { questions, resultsMap } from "./data";

export default function Grade5to7Home() {
  const { user } = useAuth();
  const userId = user?._id || user?.id;

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configuration
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const STAGE_KEY = "stage5to7";
  const CATEGORY_NAME = "Self-Assessment 5th to 7th";

  // ------------------------------------
  // 1. ON LOAD: SYNC WITH DB
  // ------------------------------------
  useEffect(() => {
    const initPage = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/api/progress/get-progress/${userId}`
        );

        if (response.data.success && response.data.data) {
          const report = response.data.data;

          // A. Check for COMPLETED Result
          if (report.stageResults && report.stageResults[STAGE_KEY]) {
            setResult(report.stageResults[STAGE_KEY]);
            setIsLoading(false);
            return;
          }

          // B. Check for PARTIAL Progress
          if (report.stageProgress && report.stageProgress[STAGE_KEY]) {
            const saved = report.stageProgress[STAGE_KEY];
            // Validate bounds
            if (
              saved.currentQuestionIndex > 0 &&
              saved.currentQuestionIndex < questions.length
            ) {
              setAnswers(saved.answers || []);
              setCurrentQuestion(saved.currentQuestionIndex);
              setStarted(true);
            }
          }
        }
      } catch (error) {
        console.error("Sync Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [API_URL]);

  // ------------------------------------
  // 2. HANDLE ANSWER
  // ------------------------------------
  const handleAnswer = (type) => {
    const nextIndex = currentQuestion + 1;
    const updatedAnswers = [...answers, type];

    // 1. Update UI Immediately
    setAnswers(updatedAnswers);

    if (nextIndex < questions.length) {
      setCurrentQuestion(nextIndex);

      // 2. Background Save (Partial)
      if (userId) {
        axios
          .post(`${API_URL}/api/progress/save-quiz-progress`, {
            userId,
            stage: STAGE_KEY,
            currentQuestionIndex: nextIndex,
            answers: updatedAnswers,
            totalQuestions: questions.length,
            categoryName: CATEGORY_NAME,
          })
          .catch((err) => console.error("Background save error:", err));
      }
    } else {
      // 3. Finish Quiz
      calculateResult(updatedAnswers);
    }
  };

  // ------------------------------------
  // 3. FINISH & SAVE FINAL RESULT
  // ------------------------------------
  const calculateResult = async (finalAnswers) => {
    const count = {};
    finalAnswers.forEach((a) => {
      count[a] = (count[a] || 0) + 1;
    });

    const top = Object.keys(count).reduce((a, b) =>
      count[a] >= count[b] ? a : b
    );

    const finalResult = resultsMap[top];
    setResult(finalResult);

    // Save Result to DB
    if (userId) {
      try {
        await axios.post(`${API_URL}/api/progress/save-result`, {
          userId,
          stage: STAGE_KEY,
          resultData: finalResult,
          categoryName: CATEGORY_NAME,
        });
      } catch (error) {
        console.error("Error saving result:", error);
      }
    }
  };

  // ------------------------------------
  // 4. RETAKE HANDLER
  // ------------------------------------
  const handleRetake = async () => {
    setIsLoading(true);
    if (userId) {
      try {
        await axios.post(`${API_URL}/api/progress/reset-progress`, {
          userId,
          stage: STAGE_KEY,
          categoryName: CATEGORY_NAME,
        });
      } catch (error) {
        console.error("Reset error:", error);
      }
    }

    setResult(null);
    setAnswers([]);
    setCurrentQuestion(0);
    setStarted(false);
    setIsLoading(false);
  };

  const handleStart = () => setStarted(true);
  const progressPercent = Math.round(
    (currentQuestion / questions.length) * 100
  );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex">
      <div className="w-full md:w-[70%] px-6 py-10">
        {result ? (
          <div className="animate-fade-in">
            <SectionResult result={result} onRetake={handleRetake} />
          </div>
        ) : (
          <>
            {!started ? (
              <>
                <SectionStart handleStart={handleStart} />
                <SectionDiscover />
              </>
            ) : (
              <SectionQuiz
                questions={questions}
                currentQuestion={currentQuestion}
                handleAnswer={handleAnswer}
                progressPercent={progressPercent}
              />
            )}
          </>
        )}
      </div>

      <div className="hidden md:block w-[30%] pr-6">
        <ProgressSidebar />
      </div>
    </div>
  );
}
