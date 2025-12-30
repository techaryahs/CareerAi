import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaLock,
  FaCrown,
  FaChartLine,
  FaFileAlt,
  FaSpinner,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-gray-50">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
  </div>
);

const MyActivity = () => {
  const [services, setServices] = useState({});
  const [progressReport, setProgressReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5001";
 const { user, loading: authLoading } = useAuth();

 useEffect(() => {
  if (!user?._id) return; // ⛔ wait until user exists

  const fetchData = async () => {
    try {
      setLoading(true);

      const userRes = await axios.get(`${API}/api/profile/${user._id}`);
      setServices(userRes.data.services || {});

      try {
        const reportRes = await axios.get(
          `${API}/api/progress/get-progress/${user._id}`
        );
        if (reportRes.data.success) {
          setProgressReport(reportRes.data.data);
        }
      } catch {
        console.log("No progress report found");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [API, user]);


  if (loading) return <PageLoader />;
  if (!user)
    return <p className="text-center mt-10">Please log in to view activity.</p>;

  // --- HELPERS ---

  // 1. Calculate Average % (UPDATED LOGIC)
  const calculateOverallProgress = () => {
    if (!progressReport || !progressReport.categories) return 0;

    const categories = progressReport.categories;
    const values = Object.values(categories);

    // Avoid division by zero
    if (values.length === 0) return 0;

    // Sum all values
    const totalSum = values.reduce((acc, curr) => acc + curr, 0);

    // Calculate Average
    const average = totalSum / values.length;

    // Return rounded number (e.g., 33.33 -> 33)
    return Math.round(average);
  };

  const overallProgress = calculateOverallProgress();

  // 2. Check Stage Status
  const getStageStatus = (stageKey) => {
    if (!progressReport) return "locked";

    if (progressReport.stageResults && progressReport.stageResults[stageKey]) {
      return "completed";
    }

    if (
      progressReport.stageProgress &&
      progressReport.stageProgress[stageKey]
    ) {
      if (progressReport.stageProgress[stageKey].currentQuestionIndex > 0) {
        return "in-progress";
      }
    }

    return "locked";
  };

  // Status Badge Component
  const StatusBadge = ({ active, premium }) => {
    if (premium && !user.isPremium) {
      return (
        <span className="flex items-center gap-2 text-xs font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          <FaLock size={10} /> Premium
        </span>
      );
    }
    if (active) {
      return (
        <span className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
          <FaCheckCircle size={10} /> Active
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        <FaTimesCircle size={10} /> Inactive
      </span>
    );
  };

  const ActivityCard = ({
    title,
    description,
    active,
    info,
    premium,
    icon,
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-sky-500 bg-sky-50 p-2 rounded-lg">{icon}</div>
          )}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <StatusBadge active={active} premium={premium} />
      </div>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="pt-4 border-t border-gray-50">
        <p className="text-sm font-medium text-gray-800">
          {info || "No activity yet"}
        </p>
      </div>
    </div>
  );

  const stage1Status = getStageStatus("stage5to7");

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 font-sans">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          📊 My Activity Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}.</p>
      </div>

      {/* ASSESSMENT PROGRESS */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaChartLine className="text-sky-600" /> Assessment Progress
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
          {/* Progress Circle */}
          <div className="flex-shrink-0 text-center md:text-left">
            <div className="relative w-32 h-32 mx-auto md:mx-0">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                {/* Background Ring */}
                <path
                  className="text-gray-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                {/* Progress Ring */}
                <path
                  className="text-sky-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${overallProgress}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-sky-700">
                  {overallProgress}%
                </span>
                <span className="text-[10px] text-gray-500 uppercase font-bold">
                  Average
                </span>
              </div>
            </div>
          </div>

          {/* Stages List */}
          <div className="flex-grow w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* STAGE 1 CARD */}
              <div
                className={`p-4 rounded-xl border transition-all 
                        ${
                          stage1Status === "completed"
                            ? "bg-green-50 border-green-200"
                            : stage1Status === "in-progress"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-700">
                    Self Assessment
                  </span>
                  {stage1Status === "completed" && (
                    <FaCheckCircle className="text-green-500" />
                  )}
                  {stage1Status === "in-progress" && (
                    <FaSpinner className="text-yellow-500 animate-spin" />
                  )}
                  {stage1Status === "locked" && (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  {stage1Status === "completed" && "Completed"}
                  {stage1Status === "in-progress" && "In Progress - Resume now"}
                  {stage1Status === "locked" && "Not Started"}
                </p>
              </div>

              {/* STAGE 2 CARD */}
              <div className="p-4 rounded-xl border bg-gray-50 border-gray-200 opacity-60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-700">
                    Career Exploration
                  </span>
                  <FaLock className="text-gray-400" size={12} />
                </div>
                <p className="text-xs text-gray-500">Locked</p>
              </div>
            </div>

            {/* Categories Bar */}
            {progressReport?.categories && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                  Skill Competency Breakdown
                </h4>
                <div className="space-y-3">
                  {Object.entries(progressReport.categories).map(
                    ([catName, score]) => (
                      <div key={catName}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-700 font-medium">
                            {catName}
                          </span>
                          <span className="text-gray-500">{score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-sky-500 h-2 rounded-full transition-all duration-700"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SERVICE GRID */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaFileAlt className="text-orange-500" /> Service Activity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActivityCard
            title="Career Roadmap"
            description="Your personalized career journey"
            active={services.careerRoadmap?.started}
            info={`Progress: ${services.careerRoadmap?.progressPercent || 0}%`}
          />
          <ActivityCard
            title="Skill Learning Paths"
            description="Skills you are currently learning"
            active={services.skillLearningPaths?.skillsCompleted?.length > 0}
            info={`Skills Completed: ${
              services.skillLearningPaths?.skillsCompleted?.length || 0
            }`}
          />
          <ActivityCard
            title="AI Career Recommendation"
            description="Careers suggested by AI"
            active={services.aiCareerRecommendation?.generated}
            info={
              services.aiCareerRecommendation?.recommendedCareers?.join(", ") ||
              "No recommendations yet"
            }
          />
          <ActivityCard
            title="Resume Builder"
            description="AI-powered resume creation"
            active={services.resumeBuilder?.created}
            info={`Resumes Created: ${
              services.resumeBuilder?.resumeCount || 0
            }`}
            premium
          />
          <ActivityCard
            title="Mock Interviews"
            description="Practice interviews with AI"
            active={services.mockInterviews?.attempted}
            info={`Attempts: ${services.mockInterviews?.totalAttempts || 0}`}
            premium
          />
          <ActivityCard
            title="PDF Downloads"
            description="Downloaded study resources"
            active={services.pdfDownloads?.totalDownloads > 0}
            info={`Downloads: ${services.pdfDownloads?.totalDownloads || 0}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
