// QuestionStep.jsx
import React from 'react';

const QuestionStep = ({ question, options, type = 'radio', value, onChange, placeholder }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{question}</h3>
      {type === 'radio' && options && (
        <div className="space-y-3">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name={question}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
      {type === 'select' && options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      )}
      {type === 'input' && (
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default QuestionStep;