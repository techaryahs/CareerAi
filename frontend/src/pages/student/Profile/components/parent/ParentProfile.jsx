import React, { useState } from "react";
import ParentHeader from "./ParentHeader";
import LinkedStudentCard from "./LinkedStudentCard";
import ParentEditModal from "./ParentEditModal";
import "../styles/parent/Profile.css";

export default function ParentProfile({ user, onProfileUpdate }) {
    const [showEditModal, setShowEditModal] = useState(false);

    if (!user) {
        return (
            <div className="profile-page-wrapper">
                <div className="shimmer-container" style={{ height: '80vh', borderRadius: '20px', background: '#fff' }}></div>
            </div>
        );
    }

    const handleEditProfile = async (profileData) => {
        await onProfileUpdate(profileData);
    };

    return (
        <div className="profile-page-wrapper">
            <ParentHeader
                user={user}
                onEditRequest={() => setShowEditModal(true)}
            />

            <div className="profile-layout">
                {/* Primary Column */}
                <div className="profile-main-column">
                    <LinkedStudentCard user={user} />

                    <div className="stats-card" style={{ marginTop: '20px' }}>
                        <div className="card-header">
                            <h3>About Me</h3>
                        </div>
                        <div className="card-body">
                            <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                {user.bio || "No biography provided yet. Editing your profile allows you to share your parenting philosophy and career guidance goals."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secondary Column */}
                <div className="profile-side-column">
                    <div className="stats-card">
                        <div className="card-header">
                            <h3>Contact Details</h3>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: '600', color: '#64748b' }}>Email:</span>
                                <span style={{ color: '#1e293b' }}>{user.email}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: '600', color: '#64748b' }}>Phone:</span>
                                <span style={{ color: '#1e293b' }}>{user.mobile || 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: '600', color: '#64748b' }}>Location:</span>
                                <span style={{ color: '#1e293b' }}>{user.location || 'Global'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <ParentEditModal
                    user={user}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleEditProfile}
                />
            )}
        </div>
    );
}
