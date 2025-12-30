import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaCrown, FaCalendarCheck, FaFire, FaTrophy, FaLightbulb, FaRocket, FaChartLine } from 'react-icons/fa';
import '../styles/student/CareerStats.css';

const CareerStats = ({ user }) => {
    const [stats, setStats] = useState({
        accountAge: 0,
        isPremium: false,
        role: 'student'
    });

    useEffect(() => {
        if (user) {
            const joinDate = new Date(user.createdAt || Date.now());
            const today = new Date();
            const daysActive = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));
            const monthsActive = Math.max(1, Math.floor(daysActive / 30));

            setStats({
                accountAge: monthsActive,
                isPremium: user.isPremium || false,
                role: user.role || 'student'
            });
        }
    }, [user]);

    const statCards = [
        {
            icon: <FaRocket />,
            value: user?.services?.quiz?.bestScore ? `${user.services.quiz.bestScore}%` : '85%',
            label: 'Career  ',
            className: 'score'
        },
        {
            icon: <FaChartLine />,
            value: user?.services?.bookings?.count || '12',
            label: 'Consultations',
            className: 'sessions'
        },
        {
            icon: <FaLightbulb />,
            value: '4',
            label: 'Active Roadmaps',
            className: 'roadmaps'
        },
        {
            icon: <FaFire />,
            value: '7 Days',
            label: 'Learning Streak',
            className: 'streak'
        }
    ];

    return (
        <div className="career-stats-modern">
            <div className="stats-grid-modern">
                {statCards.map((card, index) => (
                    <div key={index} className={`stat-card-v3 animate-entrance ${card.className}`}>
                        <div className="stat-icon-v3">
                            {card.icon}
                        </div>
                        <div className="stat-info-v3">
                            <h3 className="stat-value-v3">{card.value}</h3>
                            <p className="stat-label-v3">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CareerStats;
