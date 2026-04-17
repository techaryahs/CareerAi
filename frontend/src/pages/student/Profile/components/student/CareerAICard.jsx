import React from 'react';
import { FaRobot, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/student/CareerAICard.css';

const CareerAICard = () => {
    const navigate = useNavigate();

    return (
        <div className="study-card-v3 career-ai-study-style animate-entrance">
            <div className="study-card-inner items-start">
                <div className="study-card-icon">
                    <FaRobot />
                </div>
                <div className="study-card-info">
                    <h3 className="study-card-value">Career AI Check</h3>
                    <p className="study-card-description">
                        Get AI-powered career recommendations based on your unique profile and market trends.
                    </p>
                    
                    <button 
                        className="study-action-btn-blue mt-4"
                        onClick={() => navigate('/careerquiz')}
                    >
                        <span>Check Now</span>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CareerAICard;
