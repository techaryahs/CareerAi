// ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;