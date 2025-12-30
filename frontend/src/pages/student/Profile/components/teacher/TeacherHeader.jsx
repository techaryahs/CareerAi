import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import '../styles/teacher/TeacherHeader.css';

const TeacherHeader = ({ teacher, onEditRequest }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Member';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const getInitials = (name) => {
        if (!name) return 'T';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="teacher-header-v4 animate-entrance">
            {/* Cover Banner */}
            <div className="teacher-cover-v4">
                <div className="banner-overlay" />
            </div>

            <div className="teacher-header-content-v4">
                <div className="teacher-avatar-section-v4">
                    {/* Horizontal Top Row for Mobile */}
                    <div className="profile-header-top-row">
                        <div className="teacher-pfp-wrapper">
                            <div className={`teacher-pfp-container ${teacher?.isPremium ? 'pro-user' : ''}`}>
                                <div className="avatar-initials">
                                    {getInitials(teacher?.fullName || teacher?.name)}
                                </div>
                            </div>
                        </div>

                        <div className="teacher-title-v4">
                            <div className="name-badge-grid">
                                <h1>{teacher?.fullName || teacher?.name || 'Expert Educator'}</h1>
                                {teacher?.isVerified && <FaCheckCircle className="badge-verified" title="Verified Expert" />}
                                {teacher?.isPremium && <span className="badge-pro">PRO</span>}
                            </div>

                            <div className="teacher-tagline-v4">
                                <span>@{teacher?.teachingField?.fieldName || 'Mentorship Lead'}</span>
                            </div>

                            <p className="teacher-bio-v4 desktop-bio">
                                {teacher?.bio || "Empowering students through personalized guidance and industrial insights."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile Bio Below Row */}
                <p className="teacher-bio-v4 mobile-only-bio">
                    {teacher?.bio || "Empowering students through personalized guidance and industrial insights."}
                </p>

                <div className="teacher-contact-bar-v4">
                    <div className="contact-item-v4">
                        <FaMapMarkerAlt />
                        <span>{teacher?.offlineLocation || teacher?.location || 'Global'}</span>
                    </div>
                    <div className="contact-item-v4">
                        <FaCalendarAlt />
                        <span>Joined {formatDate(teacher?.createdAt)}</span>
                    </div>
                    {teacher?.phone && (
                        <div className="contact-item-v4">
                            <FaPhone />
                            <span>{teacher.phone}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions Area moved to root */}
            <div className="header-actions-area">
                <button className="btn-premium primary" onClick={onEditRequest}>
                    <FaEdit />
                    <span>Edit Profile</span>
                </button>
            </div>
        </div>
    );
};

export default TeacherHeader;
