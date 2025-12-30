import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  Lock,
  Star,
  ArrowRight,
  FileDown,
  Crown,
  PlayCircle,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import PremiumPlans from "../../../components/PremiumPlans/PremiumPlans";

export default function ProgressSidebar() {
  const [progressReport, setProgressReport] = useState(null);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const location = useLocation(); // Triggers re-render on route change

  const { user } = useAuth();
  const userId = user?._id || user?.id;
  const isPremium = user?.isPremium === true;

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const fetchProgress = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `${API_URL}/api/progress/get-progress/${userId}`
      );
      if (res.data.success) {
        setProgressReport(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching sidebar progress:", error);
    }
  };

  // 2. Fetch Progress from Backend and listen for updates
  useEffect(() => {
    fetchProgress();

    const handler = () => fetchProgress();
    window.addEventListener("progressUpdated", handler);
    return () => window.removeEventListener("progressUpdated", handler);
  }, [userId, API_URL, location.pathname]);

  // 3. Define Steps
  const steps = [
    {
      id: "stage5to7",
      title: "5th–7th Guidance",
      link: "/student-guidance/5th-7th",
      premium: false,
    },
    {
      id: "stage8to10",
      title: "8th–10th Guidance",
      link: "/student-guidance/8th-10th",
      premium: false,
    },
    {
      id: "stage11to12",
      title: "11th–12th Guidance",
      link: "/student-guidance/11th-12th",
      premium: true,
    },
  ];

  // 4. STRICT SEQUENTIAL STATUS LOGIC
  const getStatus = (index) => {
    const currentStep = steps[index];
    const prevStep = index > 0 ? steps[index - 1] : null;

    // A. Check if current step is already completed in DB
    const isCompleted = progressReport?.stageResults?.[currentStep.id];
    if (isCompleted) return "completed";

    // B. SEQUENTIAL LOCK: Check if previous step is done
    if (prevStep) {
      const isPrevCompleted = progressReport?.stageResults?.[prevStep.id];
      // If previous is NOT completed, this step is STRICTLY LOCKED (Hidden)
      if (!isPrevCompleted) return "locked";
    }

    // C. PREMIUM LOCK: Only checked if sequence is valid (Previous is done)
    if (currentStep.premium && !isPremium) {
      return "lockedpremium";
    }

    // D. In Progress Check (Optional visual cue)
    const inProgress =
      progressReport?.stageProgress?.[currentStep.id]?.currentQuestionIndex > 0;

    // E. Default to Active (Ready to start)
    return inProgress ? "inprogress" : "active";
  };

  // Check if everything is done for Final Report
  const allCompleted =
    progressReport?.stageResults?.["stage5to7"] &&
    progressReport?.stageResults?.["stage8to10"] &&
    progressReport?.stageResults?.["stage11to12"];

  return (
    <aside className="bg-white shadow-xl border border-blue-50 rounded-3xl p-6 sticky top-24 w-72 h-fit">
      {showPremiumPopup && (
        <PremiumPlans onClose={() => setShowPremiumPopup(false)} />
      )}

      {/* HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-extrabold text-blue-900 flex items-center justify-center gap-2">
          <Star className="text-yellow-400 fill-yellow-400" size={20} /> Career
          Journey
        </h2>
        <p className="text-gray-500 text-xs mt-1">Track your milestones</p>
      </div>

      {/* TIMELINE */}
      <div className="relative ml-4">
        {/* Vertical Line */}
        <div className="absolute left-3 top-2 bottom-4 w-0.5 bg-gray-200 rounded-full"></div>

        {steps.map((step, index) => {
          const status = getStatus(index);

          // --- DYNAMIC STYLING ---
          let iconStyles = "border-gray-300 text-gray-400 bg-white";
          let cardStyles = "bg-gray-50 border-gray-200 opacity-70";
          let textStyles = "text-gray-500";

          if (status === "completed") {
            iconStyles =
              "border-green-500 text-white bg-green-500 shadow-green-200";
            cardStyles = "bg-green-50 border-green-200";
            textStyles = "text-green-800";
          } else if (status === "inprogress") {
            iconStyles =
              "border-blue-500 text-blue-600 bg-white shadow-blue-200 ring-2 ring-blue-100";
            cardStyles = "bg-blue-50 border-blue-200 shadow-sm";
            textStyles = "text-blue-800";
          } else if (status === "active") {
            iconStyles = "border-blue-400 text-blue-400 bg-white border-dashed";
            cardStyles =
              "bg-white border-blue-100 shadow-sm hover:border-blue-300 transition";
            textStyles = "text-blue-700";
          } else if (status === "lockedpremium") {
            iconStyles = "border-yellow-500 text-yellow-600 bg-yellow-50";
            cardStyles = "bg-yellow-50/50 border-yellow-200";
            textStyles = "text-yellow-800";
          }

          return (
            <div
              key={step.id}
              className="relative flex items-center mb-8 last:mb-0 group"
            >
              {/* ICON BUBBLE */}
              <div
                className={`w-7 h-7 flex flex-shrink-0 items-center justify-center rounded-full shadow-md z-10 border-2 transition-all duration-300 ${iconStyles}`}
              >
                {status === "completed" && <CheckCircle size={16} />}
                {(status === "active" || status === "inprogress") && (
                  <PlayCircle size={16} />
                )}
                {status === "lockedpremium" && <Crown size={14} />}
                {status === "locked" && <Lock size={14} />}
              </div>

              {/* CARD CONTENT */}
              <div
                className={`ml-4 px-4 py-3 w-full rounded-xl border transition-all duration-300 ${cardStyles}`}
              >
                <p className={`font-bold text-sm mb-1 ${textStyles}`}>
                  {step.title}
                </p>

                {/* ACTION AREA */}
                <div className="text-xs">
                  {status === "lockedpremium" ? (
                    <button
                      onClick={() => setShowPremiumPopup(true)}
                      className="text-yellow-700 font-semibold underline flex items-center gap-1 hover:text-yellow-800"
                    >
                      Unlock Premium <Crown size={10} />
                    </button>
                  ) : status === "locked" ? (
                    <span className="text-gray-400 italic flex items-center gap-1">
                      <Lock size={10} /> Locked
                    </span>
                  ) : (
                    <Link
                      to={
                        step.id === "stage11to12" && status === "completed"
                          ? "/student-guidance/final-report"
                          : step.link
                      }
                      className={`flex items-center gap-1 font-medium hover:underline
                            ${
                              status === "completed"
                                ? "text-green-600"
                                : "text-blue-600"
                            }
                        `}
                    >
                      {status === "completed"
                        ? "View Results"
                        : status === "inprogress"
                        ? "Resume"
                        : "Start Now"}
                      <ArrowRight size={10} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL REPORT BUTTON (Only if all done) */}
      {allCompleted && (
        <div className="mt-8 pt-6 border-t border-dashed border-gray-200 animate-fade-in-up">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 text-center shadow-sm">
            <h3 className="font-bold text-green-800 text-sm mb-2 flex items-center justify-center gap-1">
              🎉 Journey Complete!
            </h3>
            <Link
              to="/student-guidance/final-report"
              className="w-full py-2.5 bg-green-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-200"
            >
              <FileDown size={14} /> Download Full Report
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
