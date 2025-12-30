import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomProgressBar = ({ currentStep = 1, totalSteps = 4, stepTitle = "Self-Assessment" }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-4xl mx-auto bg-white border border-[#f1f5f9] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] rounded-full p-2.5 pointer-events-auto flex items-center justify-between gap-8 pl-8"
            >
                {/* Progress Info */}
                <div className="flex items-center gap-8">
                    <div className="flex gap-2">
                        {[...Array(totalSteps)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{
                                    width: (i + 1) === currentStep ? 24 : 10,
                                    backgroundColor: (i + 1) <= currentStep ? '#22c55e' : '#e2e8f0'
                                }}
                                className="h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    backgroundColor: (i + 1) === currentStep ? '#3b82f6' : undefined
                                }}
                            />
                        ))}
                    </div>

                    <div className="hidden md:block border-l border-gray-100 pl-8">
                        <p className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                            Career Journey, <span className="text-[#0f172a] font-black">Step {currentStep} of {totalSteps} — {stepTitle}</span>
                        </p>
                    </div>
                </div>

                {/* Pill Action Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/chat')}
                    className="bg-[#0056d2] hover:bg-[#0041a3] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-4 shadow-[0_10px_25px_-5px_rgba(0,86,210,0.4)] transition-all min-w-[240px] justify-center"
                >
                    <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
                        <MessageCircle size={14} className="fill-white" />
                    </div>
                    <span>Ask Career AI</span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default BottomProgressBar;
