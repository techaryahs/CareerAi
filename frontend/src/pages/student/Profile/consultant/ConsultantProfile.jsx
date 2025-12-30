import React, { useState, useEffect } from "react";
import { FaUsers, FaStar, FaClock, FaCalendar, FaCheckCircle, FaDollarSign, FaHistory } from "react-icons/fa";
import "../components/styles/consultant/Profile.css";

export default function ConsultantProfile({ user }) {
    const [stats] = useState({
        totalBookings: 0,
        completedSessions: 0,
        upcomingSessions: 0,
        averageRating: 0,
        totalEarnings: 0
    });

    useEffect(() => {
        // TODO: Fetch consultant stats from API
        // For now, using placeholder data
    }, []);

    if (!user) {
        return (
            <div className="profile-loading">
                <div className="loading-spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-page-wrapper animate-entrance">
            {/* High-End Hero Section */}
            <div className="profile-header">
                <div className="profile-banner">
                    <div className="banner-pattern" />
                    <div className="banner-overlay" />
                </div>

                <div className="profile-header-content">
                    {/* Horizontal Top Row for Mobile */}
                    <div className="profile-header-top-row">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar-container pro-user">
                                <div className="avatar-initials">
                                    {(user.name || user.fullName || "C").substring(0, 2).toUpperCase()}
                                </div>
                            </div>
                        </div>

                        <div className="profile-header-info">
                            <div className="name-badge-grid">
                                <h1 className="profile-name">{user.name || user.fullName}!</h1>
                                <FaCheckCircle className="badge-verified" />
                                <span className="badge-pro">PRO</span>
                            </div>
                            <div className="profile-handle">
                                Consultant @CareerGenAI
                            </div>

                            <p className="profile-bio desktop-bio">
                                Expert Career Consultant dedicated to mapping student potential to global industrial landscapes.
                            </p>
                        </div>
                    </div>

                    {/* Mobile Bio Below Row */}
                    <p className="profile-bio mobile-only-bio">
                        Expert Career Consultant dedicated to mapping student potential to global industrial landscapes.
                    </p>

                    <div className="profile-meta-row">
                        <div className="meta-item">
                            <FaCheckCircle style={{ color: 'var(--primary-light)' }} />
                            <span>{user.isVerified ? "Verified Expert" : "Verification Pending"}</span>
                        </div>
                        <div className="meta-item">
                            <FaStar style={{ color: '#f59e0b' }} />
                            <span>{stats.averageRating.toFixed(1)} Rating</span>
                        </div>
                    </div>
                </div>

                {/* Actions Area */}
                <div className="header-actions-area">
                    <button className="btn-premium primary">
                        <span>Dashbaord</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="profile-layout">
                <div className="profile-main-column">
                    <div className="stats-grid-modern">
                        <div className="stat-card-v3">
                            <div className="stat-icon-v3"><FaUsers /></div>
                            <div className="stat-info-v3">
                                <span className="stat-value-v3">{stats.totalBookings}</span>
                                <span className="stat-label-v3">Total Clients</span>
                            </div>
                        </div>
                        <div className="stat-card-v3">
                            <div className="stat-icon-v3"><FaCheckCircle /></div>
                            <div className="stat-info-v3">
                                <span className="stat-value-v3">{stats.completedSessions}</span>
                                <span className="stat-label-v3">Completed</span>
                            </div>
                        </div>
                        <div className="stat-card-v3">
                            <div className="stat-icon-v3"><FaCalendar /></div>
                            <div className="stat-info-v3">
                                <span className="stat-value-v3">{stats.upcomingSessions}</span>
                                <span className="stat-label-v3">Upcoming</span>
                            </div>
                        </div>
                        <div className="stat-card-v3">
                            <div className="stat-icon-v3"><FaDollarSign /></div>
                            <div className="stat-info-v3">
                                <span className="stat-value-v3">₹{stats.totalEarnings}</span>
                                <span className="stat-label-v3">Earnings</span>
                            </div>
                        </div>
                    </div>

                    {/* Availability Card */}
                    <div className="card-v3" style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                            <FaClock style={{ color: 'var(--primary-light)' }} /> Availability
                        </h3>
                        <div className="availability-grid-modern">
                            {user.availability && user.availability.length > 0 ? (
                                user.availability.map((slot, idx) => (
                                    <div key={idx} className="availability-item-v4">
                                        <span className="day">{slot.day}</span>
                                        <span className="time">{slot.startTime} - {slot.endTime}</span>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--text-sub)', fontSize: '14px' }}>No availability slots set yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="profile-side-column">
                    <div className="card-v3" style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaDollarSign style={{ color: 'var(--primary-light)' }} />
                            Service Pricing
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                            <span style={{ fontWeight: '600', color: '#64748b' }}>Rate / Session</span>
                            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>₹{user.sessionPrice || "500"}</span>
                        </div>
                    </div>

                    <div className="card-v3" style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaHistory style={{ color: 'var(--primary-light)' }} />
                            Recent Activity
                        </h3>
                        <p style={{ color: 'var(--text-sub)', fontSize: '13px' }}>No recent activity to show.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
