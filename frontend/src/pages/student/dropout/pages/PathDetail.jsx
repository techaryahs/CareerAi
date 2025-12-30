// PathDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import educationPaths from '../data/educationPaths.json';
import jobPaths from '../data/jobPaths.json';

const PathDetail = ({ addToPlan }) => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const paths = type === 'education' ? educationPaths : jobPaths;
  const path = paths.find((p) => p.id === id);

  if (!path) return <div>Path not found</div>;

  const handleAddToPlan = () => {
    addToPlan(path);
    navigate('/services/dropout/action-plan');
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl mx-auto">
        <ProgressBar currentStep={4} totalSteps={5} />

        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 border border-blue-200 text-center transform transition-all duration-500 animate-[fadeInUp_0.6s_ease-out]">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
            {path.name}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            {type === 'education' ? 'Education Path Details' : 'Job Path Details'}
          </p>
          <p className="text-gray-700 mb-6 text-sm">{path.description}</p>

          <div className="mb-6 text-left space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {type === 'education'
                ? 'Education Route Details'
                : 'Job Opportunity Details'}
            </h3>

            {/* responsive grid like interest cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Eligibility */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                    1
                  </span>
                  Eligibility
                </h4>
                {type === 'education' ? (
                  <>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Status:</span>{' '}
                      {path.eligibleStatus.join(', ')}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Stream:</span>{' '}
                      {path.streamSuitable.join(', ')}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Min Education:</span>{' '}
                      {path.minEducation}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Min Education:</span>{' '}
                      {path.minEducation}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Min Age:</span> {path.minAge}
                    </p>
                  </>
                )}
              </div>

              {/* Exams or Time / Demand */}
              {type === 'education' ? (
                path.exams.length > 0 && (
                  <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs">
                        2
                      </span>
                      Exams
                    </h4>
                    {path.exams.map((exam, index) => (
                      <div key={index} className="text-gray-700 text-sm mb-1">
                        <strong>{exam.name}</strong>: {exam.minEducation},{' '}
                        {exam.ageNote}, {exam.attempts}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs">
                      2
                    </span>
                    Time & Demand
                  </h4>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Time to Learn:</span>{' '}
                    {path.timeToLearn}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Demand:</span> {path.demand}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Salary:</span> {path.salary}
                  </p>
                </div>
              )}

              {/* Route / Skills + Career */}
              {type === 'education' ? (
                <>
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                        3
                      </span>
                      Education Route
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      {path.educationRoute.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white text-xs">
                        4
                      </span>
                      Career Options
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      {path.careerOptions.map((career, index) => (
                        <li key={index}>{career}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                        3
                      </span>
                      Skills Needed
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      {path.skillsNeeded.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white text-xs">
                        4
                      </span>
                      Learning Roadmap
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      {path.learningPath.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Compact roadmap */}
          <div className="mb-6 text-left">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                →
              </span>
              Quick Roadmap
            </h4>
            <ul className="text-gray-700 text-sm space-y-1">
              {(type === 'education' ? path.educationRoute : path.learningPath)
                .slice(0, 4)
                .map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 animate-[fadeIn_0.4s_ease-out]"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                    {step}
                  </li>
                ))}
            </ul>
          </div>

          <button
            onClick={handleAddToPlan}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2.5 w-full transition-all hover:shadow-lg hover:scale-[1.02]"
          >
            Add to My Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PathDetail;
