import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import CareerStats from "./CareerStats";
import UpcomingConsultations from "./UpcomingConsultations";
import CareerInterests from "./CareerInterests";
import ActivityHeatmap from "./ActivityHeatmap";
import EditProfileModal from "./EditProfileModal";
import "../styles/student/Profile.css";

export default function StudentProfile({ user, onProfileUpdate }) {
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
            {/* High-End Profile Header */}
            <ProfileHeader
                user={user}
                onEditRequest={() => setShowEditModal(true)}
            />

            {/* Production-Level Layout Grid */}
            <div className="profile-layout">
                {/* Primary Column */}
                <div className="profile-main-column">
                    <CareerStats user={user} />
                    <UpcomingConsultations user={user} />
                    <ActivityHeatmap user={user} />
                </div>

                {/* Secondary Column */}
                <div className="profile-side-column">
                    <CareerInterests user={user} />
                    {/* <RecentActivity user={user} /> */}
                </div>
            </div>

            {/* Modal at ROOT level to avoid transform clipping */}
            {showEditModal && (
                <EditProfileModal
                    user={user}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleEditProfile}
                />
            )}
        </div>
    );
}
