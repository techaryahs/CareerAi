import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaLink, FaEdit, FaUserPlus, FaCalendarAlt } from 'react-icons/fa';
import '../styles/student/ProfileHeader.css';

const ProfileHeader = ({ user, onEditRequest }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Jan 2024';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="profile-header animate-entrance">
            <div className="profile-banner">
                <div className="banner-overlay" />
            </div>

            <div className="profile-header-content">
                <div className="profile-header-left">
                    {/* Horizontal Top Row for Mobile (handled via CSS) */}
                    <div className="profile-header-top-row">
                        <div className="profile-avatar-wrapper">
                            <div className={`profile-avatar-container ${user?.isPremium ? 'pro-user' : ''}`}>
                                <div className="avatar-initials">
                                    {getInitials(user?.name)}
                                </div>
                            </div>
                        </div>

                        <div className="profile-header-info">
                            <div className="name-badge-grid">
                                <h1 className="profile-name">{user?.name || 'Inquisitive User'}</h1>
                                {user?.isVerified && <FaCheckCircle className="badge-verified" title="Verified" />}
                                {user?.isPremium && <span className="badge-pro">PRO</span>}
                            </div>
                            <p className="profile-handle">@{user?.email?.split('@')[0] || 'citizen'}</p>

                            <p className="profile-bio desktop-bio">
                                {user?.bio || "Mapping potential to global industrial landscapes with AI-driven insights."}
                            </p>
                        </div>
                    </div>

                    {/* Mobile Bio Below Row */}
                    <p className="profile-bio mobile-only-bio">
                        {user?.bio || "Mapping potential to global industrial landscapes with AI-driven insights."}
                    </p>

                    <div className="profile-meta-row">
                        <div className="meta-item">
                            <FaMapMarkerAlt />
                            <span>{user?.location || 'Global'}</span>
                        </div>
                        <div className="meta-item">
                            <FaCalendarAlt />
                            <span>Joined {formatDate(user?.createdAt)}</span>
                        </div>
                        {user?.portfolio && (
                            <div className="meta-item">
                                <FaLink />
                                <a href={user.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="content-actions-area">
                    {user?.role === 'student' && (!user?.parents || user.parents.length < 2) && (
                        <button
                            className="btn-premium outline"
                            onClick={() => window.dispatchEvent(new CustomEvent('openParentModal'))}
                        >
                            <FaUserPlus />
                            <span>{user?.parents?.length === 1 ? 'Add Second Parent' : 'Add Parent'}</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="header-actions-area">
                <button
                    className="btn-premium primary"
                    onClick={onEditRequest}
                >
                    <FaEdit />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;
