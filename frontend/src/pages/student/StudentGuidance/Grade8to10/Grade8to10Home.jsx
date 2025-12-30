import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

// Components
import SectionHero from "./SectionHero";
import SectionServices from "./SectionServices";
import SectionWhyUs from "./SectionWhyUs";
import SectionCareers from "./SectionCareers";
import SectionTestimonials from "./SectionTestimonials";
import SectionQuiz from "./SectionQuiz";
import SectionResult from "./SectionResult";
import ProgressSidebar from "../Progress";

// Data
import {
  QUESTIONS,
  STREAM_DESCRIPTION,
  CAREER_OPPORTUNITIES,
  LEARNING_PATHS,
} from "./data";

export default function Grade8to10Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configuration
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const STAGE_KEY = "stage8to10";
  const CATEGORY_NAME = "Self-Assessment 8th to 10th";

  const STREAM_MAP = {
    Science: "🧠 Science & Technology",
    Commerce: "💼 Business & Finance",
    Arts: "🎨 Creativity & Media",
    Vocational: "🛠️ Practical Skills",
  };

  const { user } = useAuth();
  const userId = user?._id || user?.id;

  // -------------------------------------------
  // 1. ON LOAD: CHECK DB
  // -------------------------------------------
  useEffect(() => {
    const initPage = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${API_URL}/api/progress/get-progress/${userId}`
        );

        if (res.data.success && res.data.data) {
          const report = res.data.data;

          // A. Result Exists
          if (report.stageResults && report.stageResults[STAGE_KEY]) {
            setResult(report.stageResults[STAGE_KEY]);
            setIsLoading(false);
            return;
          }

          // B. Partial Progress
          if (report.stageProgress && report.stageProgress[STAGE_KEY]) {
            const saved = report.stageProgress[STAGE_KEY];
            if (
              saved.currentQuestionIndex >= 0 &&
              saved.currentQuestionIndex < QUESTIONS.length
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

  // -------------------------------------------
  // 2. HANDLE ANSWER
  // -------------------------------------------
  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [...answers, selectedOption];
    const nextIndex = currentQuestion + 1;

    setAnswers(updatedAnswers);

    if (nextIndex < QUESTIONS.length) {
      setCurrentQuestion(nextIndex);

      // Background Save
      if (userId) {
        axios
          .post(`${API_URL}/api/progress/save-quiz-progress`, {
            userId,
            stage: STAGE_KEY,
            currentQuestionIndex: nextIndex,
            answers: updatedAnswers,
            totalQuestions: QUESTIONS.length,
            categoryName: CATEGORY_NAME,
          })
          .catch((err) => console.error("Partial save failed", err));
      }
    } else {
      calculateResult(updatedAnswers);
    }
  };

  // -------------------------------------------
  // 3. CALCULATE & SAVE RESULT
  // -------------------------------------------
  const calculateResult = async (finalAnswers) => {
    // Score Calculation Logic
    let score = { Science: 0, Commerce: 0, Arts: 0, Vocational: 0 };

    finalAnswers.forEach((ans) => {
      if (
        ans.includes("Math") ||
        ans.includes("puzzle") ||
        ans.includes("Science")
      )
        score.Science++;
      if (
        ans.includes("business") ||
        ans.includes("Talking") ||
        ans.includes("manage")
      )
        score.Commerce++;
      if (
        ans.includes("Drawing") ||
        ans.includes("creative") ||
        ans.includes("Art")
      )
        score.Arts++;
      if (
        ans.includes("Fixing") ||
        ans.includes("hands") ||
        ans.includes("Build")
      )
        score.Vocational++;
    });

    const topStream = Object.keys(score).reduce((a, b) =>
      score[a] > score[b] ? a : b
    );

    const finalResultData = {
      stream: topStream,
      emoji: STREAM_MAP[topStream].split(" ")[0],
      title: STREAM_MAP[topStream].slice(2),
      description: STREAM_DESCRIPTION[topStream],
      careers: CAREER_OPPORTUNITIES[topStream],
      paths: LEARNING_PATHS[topStream],
    };

    setResult(finalResultData);

    // Save to DB
    if (userId) {
      try {
        await axios.post(`${API_URL}/api/progress/save-result`, {
          userId,
          stage: STAGE_KEY,
          resultData: finalResultData,
          categoryName: CATEGORY_NAME,
        });
      } catch (error) {
        console.error("Error saving result", error);
      }
    }
  };

  // -------------------------------------------
  // 4. RETAKE
  // -------------------------------------------
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
        console.error("Failed to reset progress", error);
      }
    }

    setResult(null);
    setAnswers([]);
    setCurrentQuestion(0);
    setStarted(false);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStart = () => {
    setStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Progress...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex">
      <div className="w-full md:w-[70%] px-6 md:px-12 lg:px-16 py-10 ">
        {result ? (
          <div className="animate-fade-in">
            <SectionResult result={result} onRetake={handleRetake} />
          </div>
        ) : (
          <>
            {!started ? (
              <>
                <SectionHero handleStart={handleStart} />
                <SectionServices />
                <SectionWhyUs />
                <SectionCareers />
                <SectionTestimonials />
              </>
            ) : (
              <SectionQuiz
                questions={QUESTIONS}
                currentQuestion={currentQuestion}
                handleAnswer={handleAnswer}
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
