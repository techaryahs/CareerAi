import React from 'react';
import { FaLaptop, FaBuilding, FaWallet, FaMapPin } from 'react-icons/fa';
// Use local styling but adopt card-v3 from global context if available, 
// or just rely on the TeacherProfile import of student/Profile.css
import '../styles/teacher/TeachingDetails.css';

const TeachingDetails = ({ teacher }) => {
    return (
        <div className="card-v3 teaching-details-v4 animate-entrance" style={{ animationDelay: '0.2s' }}>
            <h2 className="details-title-v4" style={{ fontSize: '18px', marginBottom: '16px' }}>
                Teaching Model
            </h2>

            <div className="details-grid-v4">
                <div className="detail-item-v4" style={{ padding: '12px', background: 'var(--border-subtle)' }}>
                    <div className="detail-label-v4">
                        <FaLaptop /> Preference
                    </div>
                    <span className="mode-badge-v4" style={{ fontSize: '11px' }}>{teacher.teachingMode || 'Remote'}</span>
                </div>

                {(teacher.onlinePrice || teacher.teachingMode !== 'offline') && (
                    <div className="detail-item-v4" style={{ padding: '12px', background: 'var(--border-subtle)' }}>
                        <div className="detail-label-v4">
                            <FaWallet /> Online Rate
                        </div>
                        <span className="detail-value-v4" style={{ color: 'var(--primary)', fontWeight: '700' }}>₹{teacher.onlinePrice || 0}/hr</span>
                    </div>
                )}

                {(teacher.offlinePrice || teacher.teachingMode !== 'online') && (
                    <div className="detail-item-v4" style={{ padding: '12px', background: 'var(--border-subtle)' }}>
                        <div className="detail-label-v4">
                            <FaBuilding /> Offline Rate
                        </div>
                        <span className="detail-value-v4" style={{ color: 'var(--primary)', fontWeight: '700' }}>₹{teacher.offlinePrice || 0}/hr</span>
                    </div>
                )}

                {teacher.offlineLocation && (
                    <div className="detail-item-v4" style={{ padding: '12px', background: 'var(--border-subtle)' }}>
                        <div className="detail-label-v4">
                            <FaMapPin /> Teaching Hub
                        </div>
                        <span className="detail-value-v4" style={{ fontSize: '13px' }}>{teacher.offlineLocation}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeachingDetails;
