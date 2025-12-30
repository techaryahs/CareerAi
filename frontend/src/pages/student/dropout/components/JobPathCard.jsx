// JobPathCard.jsx
import React from 'react';

const JobPathCard = ({ path, onViewDetails }) => {
  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 mb-4 border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{path.name}</h3>

      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800">
          Min edu: {path.minEducation}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-800">
          Age: {path.minAge}+
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-800">
          Learn time: {path.timeToLearn}
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full ${
            path.demand === 'High'
              ? 'bg-red-100 border border-red-300 text-red-800'
              : 'bg-yellow-100 border border-yellow-300 text-yellow-800'
          }`}
        >
          Demand: {path.demand}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">
          Skills Needed:
        </h4>
        <ul className="text-gray-700 text-sm">
          {path.skillsNeeded.slice(0, 2).map((skill, index) => (
            <li key={index}>• {skill}</li>
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

export default JobPathCard;
