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
        <div className="career-interests-v3 card-v3 animate-entrance heatmap-card-v3" style={{ padding: 'var(--space-lg)' }}>
            <div className="section-header-v3">
                <h2 className="section-title-v3">
                    <div className="icon-box-v3">
                        <FaBullseye />
                    </div>
                    Career IQ
                </h2>
            </div>

            <div className="interests-content-v3" style={{ marginTop: 'var(--space-lg)' }}>
                {hasQuizData ? (
                    <div className="quiz-results-v3">
                        <div className="score-card-v3">
                            <div className="score-visual-v3">
                                <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
                                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(quizScore / 100) * 314} 314`} />
                                </svg>
                                <div className="score-label-v3">
                                    <span className="score-value-v3">{quizScore}%</span>
                                    <span className="score-text-v3">Score</span>
                                </div>
                            </div>
                            <div className="score-info-v3">
                                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Mastery Level</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-sub)' }}>{quizAttempts} assessment cycles completed</p>
                            </div>
                        </div>

                        <div className="action-stack-v3" style={{ display: 'grid', gap: '10px', marginTop: 'var(--space-lg)' }}>
                            <button className="btn-premium primary" onClick={() => navigate('/career-roadmap')}>
                                <FaRocket /> Personalized Roadmap
                            </button>
                            <button className="btn-premium outline" onClick={() => navigate('/services')}>
                                <FaHistory /> Retake Assessment
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="marketing-hero-v3">
                        <div className="hero-icon-v3">
                            <FaStar />
                        </div>
                        <h3>Unlock Your Future</h3>
                        <p>Our AI-powered Career IQ assessment maps your genetic potential to modern industry demands.</p>

                        <div className="benefit-grid-v3">
                            <div className="benefit-tag-v3"><FaChartLine /> Precision Career Mapping</div>
                            <div className="benefit-tag-v3"><FaLightbulb /> Intelligence Analysis</div>
                            <div className="benefit-tag-v3"><FaRocket /> Professional Trajectory</div>
                        </div>

                        <button className="btn-premium primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/services')}>
                            Launch Assessment Now
                        </button>

                        <div className="career-meta-v3">
                            <span>⏱️ 5 min</span>
                            <span>📊 Live Analytics</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerInterests;
