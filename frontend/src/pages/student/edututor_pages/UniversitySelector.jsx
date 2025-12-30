import React from 'react';
import { University } from 'lucide-react';

const UniversitySelector = ({ 
    selectedUniversity, 
    universities, 
    onUniversityChange 
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <University className="w-7 h-7 mr-3 text-blue-500"/> Select University
            </h2>
            <select
                value={selectedUniversity}
                onChange={onUniversityChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
                {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                ))}
            </select>
        </div>
    );
};

export default UniversitySelector;