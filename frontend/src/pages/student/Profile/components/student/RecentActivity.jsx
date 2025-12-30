import React, { useEffect, useState } from 'react';
import { FaClock, FaCalendar, FaTrophy, FaHistory, FaRocket, FaEdit, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import '../styles/student/RecentActivity.css';

const RecentActivity = ({ user }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const cleanAPI = React.useMemo(() => {
        const rawAPI = import.meta.env.VITE_API_URL || "http://localhost:5001";
        return rawAPI.endsWith("/") ? rawAPI.slice(0, -1) : rawAPI;
    }, []);

    useEffect(() => {
        fetchRecentActivity();
    }, [user, cleanAPI]);

    const fetchRecentActivity = async () => {
        const activityList = [];
        if (!user?._id) return;

        try {
            // 1. Account Creation
            if (user?.createdAt) {
                activityList.push({
                    type: 'account',
                    title: 'Joined CareerGenAI',
                    timestamp: new Date(user.createdAt),
                    icon: <FaRocket />
                });
            }

            // 2. Legacy Quiz Data
            if (user?.services?.quiz?.lastAttemptAt) {
                activityList.push({
                    type: 'quiz',
                    title: `Achieved ${user.services.quiz.bestScore}% Readiness Score`,
                    timestamp: new Date(user.services.quiz.lastAttemptAt),
                    icon: <FaTrophy />
                });
            }

            // 3. Bookings
            if (user?.email) {
                try {
                    const res = await axios.get(`${cleanAPI}/api/bookings/user/${user.email}`);
                    if (res.data && Array.isArray(res.data)) {
                        res.data.forEach(booking => {
                            activityList.push({
                                type: 'booking',
                                title: `Masterclass with ${booking.consultantName}`,
                                timestamp: new Date(booking.createdAt || booking.date),
                                icon: <FaCheckCircle />
                            });
                        });
                    }
                } catch (err) { }
            }

            // 4. Live Progress Report Milestones
            try {
                const res = await axios.get(`${cleanAPI}/api/progress/get-progress/${user._id}`);
                if (res.data?.success && res.data.data) {
                    const report = res.data.data;

                    if (report.stageResults) {
                        Object.entries(report.stageResults).forEach(([stage, result]) => {
                            activityList.push({
                                type: 'assessment',
                                title: `Completed ${stage.replace('stage', 'Stage ')} Assessment`,
                                timestamp: new Date(report.updatedAt),
                                icon: <FaCheckCircle />
                            });
                        });
                    }

                    if (report.stageProgress) {
                        Object.entries(report.stageProgress).forEach(([stage, prog]) => {
                            if (prog.currentQuestionIndex > 0) {
                                activityList.push({
                                    type: 'progress',
                                    title: `Advanced in ${stage.replace('stage', 'Stage ')} Quiz`,
                                    timestamp: new Date(prog.lastUpdated),
                                    icon: <FaRocket />
                                });
                            }
                        });
                    }
                }
            } catch (err) { }

            activityList.sort((a, b) => b.timestamp - a.timestamp);
            setActivities(activityList.slice(0, 5));
        } catch (error) {
            console.error("Recent activity fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatTimestamp = (date) => {
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Just moments ago';
        if (diffDays === 1) return 'Yesterday';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="recent-activity-v3 card-v3 animate-entrance" style={{ padding: 'var(--space-lg)' }}>
            <div className="section-header-v3">
                <h2 className="section-title-v3">
                    <div className="icon-box-v3">
                        <FaHistory />
                    </div>
                    Recent Pulse
                </h2>
            </div>

            <div className="timeline-container-v3" style={{ marginTop: 'var(--space-lg)' }}>
                {loading ? (
                    <div className="shimmer-line" style={{ height: '200px' }}></div>
                ) : activities.length > 0 ? (
                    <div className="timeline-v3">
                        {activities.map((activity, index) => (
                            <div key={index} className="timeline-item-v3">
                                <div className="timeline-marker-v3">
                                    {activity.icon}
                                </div>
                                <div className="timeline-content-v3">
                                    <h4>{activity.title}</h4>
                                    <span className="timeline-time-v3">{formatTimestamp(activity.timestamp)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-sub)', textAlign: 'center' }}>Your activity pulse will appear here as you grow.</p>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
