import React, { useState } from "react";
import TeacherHeader from "./TeacherHeader";
import TeacherStats from "./TeacherStats";
import TeachingDetails from "./TeachingDetails";
import SubjectsGrid from "./SubjectsGrid";
import AvailabilitySlots from "./AvailabilitySlots";
import TeacherEditModal from "./TeacherEditModal";
// ✅ Import student styles to get identical design tokens and layout
import "../styles/student/Profile.css";

export default function TeacherProfile({ user, onProfileUpdate }) {
    const [showEditModal, setShowEditModal] = useState(false);

    if (!user) {
        return (
            <div className="profile-page-wrapper">
                <div className="shimmer-container" style={{ height: '80vh', borderRadius: '20px', background: '#fff' }}></div>
            </div>
        );
    }

    return (
        <div className="profile-page-wrapper">
            {/* High-End Teacher Header (Mirrors Student ProfileHeader) */}
            <TeacherHeader
                teacher={user}
                onEditRequest={() => setShowEditModal(true)}
            />

            {/* Production-Level Layout Grid (Mirrors Student Layout) */}
            <div className="profile-layout">
                {/* Primary Column */}
                <div className="profile-main-column">
                    <TeacherStats teacher={user} />
                    <SubjectsGrid teacher={user} />
                    <AvailabilitySlots teacher={user} />
                </div>

                {/* Secondary Column */}
                <div className="profile-side-column">
                    <TeachingDetails teacher={user} />
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <TeacherEditModal
                    user={user}
                    onClose={() => setShowEditModal(false)}
                    onSave={onProfileUpdate}
                />
            )}
        </div>
    );
}
