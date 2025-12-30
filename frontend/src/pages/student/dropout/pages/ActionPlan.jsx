// ActionPlan.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';

const ActionPlan = ({ userData, selectedPaths, clearData }) => {
  const navigate = useNavigate();

  const handleStartOver = () => {
    clearData();
    navigate('/');
  };

  const handleDownload = () => {
    const planText = `
Status: ${userData.status}, ${userData.stream}, age ${userData.age}
Focus: ${userData.focus}

Selected Plans:
${selectedPaths
  .map(
    (path) => `
${path.name} (${path.type})
Next Steps:
${(
  path.type === 'education' ? path.educationRoute : path.learningPath
)
  .slice(0, 3)
  .map((step) => `- ${step}`)
  .join('\n')}
`
  )
  .join('\n')}
    `.trim();
    navigator.clipboard.writeText(planText);
    alert('Plan copied to clipboard!');
  };

  const uniquePaths = selectedPaths.filter(
    (path, index, arr) =>
      index === arr.findIndex((p) => p.id === path.id && p.type === path.type)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-5xl mx-auto">
        <ProgressBar currentStep={5} totalSteps={5} />

        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 border border-blue-200 text-center transform transition-all duration-500 animate-[fadeInUp_0.6s_ease-out]">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Your Personalized Action Plan
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Save this plan and start with the first 1–2 steps today.
          </p>

          {/* Status */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                    S
                  </span>
                  Status
                </h3>
                <p className="text-gray-700 text-sm">
                  {userData.status}, {userData.stream}, age {userData.age}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs">
                    F
                  </span>
                  Focus
                </h3>
                <p className="text-gray-700 text-sm">
                  {userData.focus === 'education'
                    ? 'Continue / restart education'
                    : 'Start working / earning (job)'}
                </p>
              </div>
            </div>
          </div>

          {/* Selected plans */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Your selected plan(s)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {uniquePaths.map((path) => (
                <div
                  key={path.id + path.type}
                  className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-left shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <h4 className="font-semibold text-gray-900 flex items-center justify-between mb-1">
                    <span className="truncate max-w-[150px] sm:max-w-[180px]">
                      {path.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 border border-blue-200 text-blue-700">
                      {path.type === 'education' ? 'Education' : 'Job'}
                    </span>
                  </h4>
                  <p className="text-gray-600 text-xs mb-2">
                    Next 3 steps you can start with:
                  </p>
                  <ul className="text-gray-700 text-xs sm:text-sm list-disc list-inside space-y-1">
                    {(path.type === 'education'
                      ? path.educationRoute
                      : path.learningPath
                    )
                      .slice(0, 3)
                      .map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-2.5 w-full transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              Copy Plan
            </button>
            <button
              onClick={handleStartOver}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-full px-6 py-2.5 w-full transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
