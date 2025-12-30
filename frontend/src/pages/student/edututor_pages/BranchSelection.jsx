import React from 'react';

const BranchSelection = ({ 
    courseData, 
    selectedBranch, 
    onBranchSelect 
}) => {
    return (
        <div id="branch-selection" className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Your Branch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(courseData.branches).map(([branchKey, branchData]) => (
                    <div
                        key={branchKey}
                        onClick={() => onBranchSelect(branchKey)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 ${
                            selectedBranch === branchKey
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                    >
                        <div className="flex flex-col items-center text-center space-y-3">
                            {branchData.icon}
                            <h3 className="font-semibold text-gray-800">{branchKey}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchSelection;