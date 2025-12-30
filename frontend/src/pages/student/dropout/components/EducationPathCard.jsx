// EducationPathCard.jsx
import React from 'react';

const EducationPathCard = ({ path, onViewDetails }) => {
  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 mb-4 border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{path.name}</h3>

      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800">
          Min edu: {path.minEducation}
        </span>
        {path.minAge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-800">
            Age: {path.minAge}+
          </span>
        )}
        {path.timeToComplete && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-800">
            Duration: {path.timeToComplete}
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-4 text-sm">{path.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">
          Career Options:
        </h4>
        <ul className="text-gray-700 text-sm">
          {path.careerOptions.slice(0, 2).map((career, index) => (
            <li key={index}>• {career}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">
          Education Route:
        </h4>
        <ul className="text-gray-700 text-sm">
          {path.educationRoute.slice(0, 2).map((step, index) => (
            <li key={index}>• {step}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onViewDetails(path)}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2.5 w-full transition-all"
      >
        View Details
      </button>
    </div>
  );
};

export default EducationPathCard;
