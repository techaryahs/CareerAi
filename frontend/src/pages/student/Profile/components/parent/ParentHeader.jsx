import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import "../styles/parent/ProfileHeader.css";

const ParentHeader = ({ user, onEditRequest }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Jan 2024';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const getInitials = (name) => {
        if (!name) return 'P';
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
                    {/* Horizontal Top Row for Mobile */}
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
                                <h1 className="profile-name">{user?.name || 'Caring Parent'}</h1>
                                {user?.isVerified && <FaCheckCircle className="badge-verified" title="Verified" />}
                                {user?.isPremium && <span className="badge-pro">PRO</span>}
                            </div>
                            <p className="profile-handle">@{user?.email?.split('@')[0] || 'parent'}</p>

                            <p className="profile-bio desktop-bio">
                                {user?.bio || "Empowering the next generation through guidance, support, and informed career choices."}
                            </p>
                        </div>
                    </div>

                    {/* Mobile Bio Below Row */}
                    <p className="profile-bio mobile-only-bio">
                        {user?.bio || "Empowering the next generation through guidance, support, and informed career choices."}
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
                    </div>
                </div>
            </div>

            <div className="header-actions-area">
                <button
                    className="btn-premium primary"
                    onClick={onEditRequest}
                >
                    <FaEdit />
                    <span>Edit Profile</span>
                </button>
            </div>
        </div>
    );
};

export default ParentHeader;
