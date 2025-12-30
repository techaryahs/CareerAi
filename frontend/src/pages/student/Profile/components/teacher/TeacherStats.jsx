import React from 'react';
import { FaGraduationCap, FaBookOpen, FaClock, FaUsers } from 'react-icons/fa';
// ✅ Reusing student career stats styles for exact match
import '../styles/student/CareerStats.css';

const TeacherStats = ({ teacher }) => {
    const statCards = [
        {
            icon: <FaGraduationCap />,
            value: `${teacher.experienceYears || 0} Yrs`,
            label: 'Experience',
            className: 'score' // Reusing student class names for color consistency
        },
        {
            icon: <FaBookOpen />,
            value: teacher.selectedSubjects?.length || 0,
            label: 'Subjects',
            className: 'sessions'
        },
        {
            icon: <FaClock />,
            value: teacher.slots?.length || 0,
            label: 'Active Slots',
            className: 'roadmaps'
        },
        {
            icon: <FaUsers />,
            value: '0',
            label: 'Mentees',
            className: 'streak'
        }
    ];

    return (
        <div className="career-stats-modern" style={{ padding: 0, marginBottom: 0 }}>
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

export default TeacherStats;
