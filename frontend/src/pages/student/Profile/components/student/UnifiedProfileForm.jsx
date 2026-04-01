import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

const UnifiedProfileForm = ({ card, onClose, onSave }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    if (showSuccess) {
        return (
            <div className="bg-white p-10 rounded-xl text-center shadow-2xl max-w-sm w-full animate-entrance">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    <FaCheck />
                </div>
                <h3 className="font-bold text-gray-800 mb-4 text-xl italic">Details Added Successfully</h3>
                <p className="text-gray-500 text-sm mb-8">Your profile has been updated with your new {card.title} information.</p>
                <button 
                    onClick={onClose} 
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 active:scale-95 transition-all text-sm"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[450px] relative font-sans animate-entrance border border-gray-100">
            {/* LEFT PANEL (DYNAMIC THEME COLOR) */}
            <div className="w-full md:w-1/3 bg-blue-600 p-8 flex flex-col items-center justify-center text-center gap-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {card.icon}
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight uppercase">
                    {card.title}
                </h2>
                <p className="text-white text-xs font-medium opacity-90 italic">
                    {card.description}
                </p>
                <div className="mt-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                </div>
            </div>

            {/* RIGHT PANEL (FORM) */}
            <div className="flex-1 p-8 bg-white flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold text-gray-700">Enter Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                        <FaTimes />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Name / Title</label>
                        <input 
                            type="text" 
                            placeholder={`${card.title} name...`}
                            className="w-full border-b border-gray-200 p-3 outline-none focus:border-blue-500 transition-all font-medium text-sm bg-transparent" 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Primary detail</label>
                            <input 
                                type="text" 
                                placeholder="Year / Score / Role"
                                className="w-full border-b border-gray-200 p-3 outline-none focus:border-blue-500 transition-all font-medium text-sm bg-transparent" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Secondary detail</label>
                            <input 
                                type="text" 
                                placeholder="GPA / Type / Org"
                                className="w-full border-b border-gray-200 p-3 outline-none focus:border-blue-500 transition-all font-medium text-sm bg-transparent" 
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Description (Optional)</label>
                        <textarea 
                            placeholder="Add a short summary about your achievement..."
                            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500 transition-all font-medium text-sm min-h-[100px] resize-none"
                        />
                    </div>
                </div>

                <div className="mt-auto pt-8 flex justify-end">
                    <button 
                        onClick={() => setShowSuccess(true)} 
                        className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95 text-sm"
                    >
                        Save Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnifiedProfileForm;
