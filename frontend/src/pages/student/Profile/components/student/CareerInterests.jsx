import React from 'react';
import { FaLightbulb, FaRocket, FaBullseye, FaChartLine, FaStar, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/student/CareerInterests.css';

const CareerInterests = ({ user }) => {
    const navigate = useNavigate();

    const hasQuizData = user?.services?.quiz?.attempted;
    const quizScore = user?.services?.quiz?.bestScore || 0;
    const quizAttempts = user?.services?.quiz?.totalAttempts || 0;

    return (
        <div className="study-card-v3 career-iq-study-style animate-entrance">
            <div className="study-card-inner items-start">
                <div className="study-card-icon">
                    <FaBullseye />
                </div>
                <div className="study-card-info">
                    <h3 className="study-card-value">Career IQ</h3>
                    
                    {hasQuizData ? (
                        <div className="quiz-results-study mt-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="score-badge-study">
                                    {quizScore}%
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-gray-800">Mastery Level</p>
                                    <p className="text-gray-500 text-xs">{quizAttempts} assessments</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <button className="study-action-btn-blue w-full justify-center" onClick={() => navigate('/careerquiz')}>
                                    <FaRocket /> Personalized Roadmap
                                </button>
                                <button className="study-action-btn-blue outline w-full justify-center" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary) !important' }} onClick={() => navigate('/services')}>
                                    <FaHistory /> Retake Assessment
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="marketing-study mt-4">
                            <p className="study-card-description mb-4">
                                Our AI-powered Career IQ assessment maps your genetic potential to modern industry demands.
                            </p>
                            
                            <div className="benefit-list-study mb-6 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <FaChartLine className="text-blue-500" /> Precision Career Mapping
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <FaLightbulb className="text-yellow-500" /> Intelligence Analysis
                                </div>
                            </div>

                            <button className="study-action-btn-blue w-full justify-center" onClick={() => navigate('/services')}>
                                Launch Assessment
                            </button>
                            
                            <div className="mt-3 flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <span>⏱️ 5 min</span>
                                <span>📊 Live Analytics</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default CareerInterests;
