import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import '../styles/teacher/SubjectsGrid.css';

const SubjectsGrid = ({ teacher }) => {
    const subjects = teacher.selectedSubjects || [];

    return (
        <div className="card-v3 subjects-grid-v4 animate-entrance" style={{ animationDelay: '0.3s' }}>
            <div className="subjects-header-v4" style={{ marginBottom: '16px' }}>
                <h2 className="subjects-title-v4" style={{ fontSize: '18px' }}>
                    <FaBookOpen /> Mastery Areas
                </h2>
            </div>

            <div className="subjects-container-v4">
                {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                        <div key={index} className="subject-chip-v4" style={{ fontSize: '12px', padding: '8px 12px' }}>
                            {subject}
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-sub)', fontSize: '13px' }}>Expertise segments coming soon.</p>
                )}
            </div>
        </div>
    );
};

export default SubjectsGrid;
