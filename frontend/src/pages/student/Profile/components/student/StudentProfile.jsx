import React, { useState, useRef } from "react";
import ProfileHeader from "./ProfileHeader";
import CareerStats from "./CareerStats";
import CareerAICard from "./CareerAICard";
import UpcomingConsultations from "./UpcomingConsultations";
import CareerInterests from "./CareerInterests";
import ActivityHeatmap from "./ActivityHeatmap";
import EditProfileModal from "./EditProfileModal";
import { FaStar, FaChevronLeft, FaChevronRight, FaPlus, FaBriefcase, FaProjectDiagram, FaFileAlt, FaHeart, FaFileInvoice } from 'react-icons/fa';
import HighSchool from "./student_card/HighSchool";
import Masters from "./student_card/Masters";
import UnderGrad from "./student_card/UnderGrad";
import TestScores from "./student_card/TestScores";
import WorkExp from "./student_card/WorkExp";
import Research from "./student_card/Research";
import CareerAICheck from "./student_card/CareerAICheck";
import TargetUniversity from "./student_card/TargetUniversity";
import AddProjects from "./student_card/AddProjects";
import Volunteering from "./student_card/Volunteering";
import UnifiedProfileForm from "./UnifiedProfileForm";
import "../styles/student/Profile.css";

const RECOMMENDED_CARDS = [
    { id: 1, icon: "🏫", title: "Target University", description: "Where do you wish to pursue higher education?", skipped: false, added: false },
    { id: 2, icon: "🎓", title: "High School", description: "Where did you spend the final years of school life?", skipped: false, added: false },
    { id: 3, icon: "📘", title: "Undergrad Degree", description: "Enter your bachelor's degree details here.", skipped: false, added: false },
    { id: 4, icon: "🎓", title: "Master's Degree", description: "Do you hold a master's degree? Submit details here.", skipped: false, added: false },
    { id: 5, icon: "📝", title: "Test Scores", description: "Enter your standardized test scores (GRE, TOEFL, etc.)", skipped: false, added: false },
    { id: 6, icon: "💼", title: "Work Experience", description: "Submit your work experience details here.", skipped: false, added: false },
    { id: 7, icon: "🔬", title: "Add Research", description: "Did you know? Adding research experience boosts your profile!", skipped: false, added: false },
    { id: 8, icon: "💻", title: "Add Projects", description: "Include your professional or academic projects.", skipped: false, added: false },
    { id: 9, icon: "🤝", title: "Volunteering", description: "List your volunteering activities and contributions.", skipped: false, added: false },
];

const PROFILE_SECTIONS = [
    { id: 'work', title: 'Work Experience', icon: <FaBriefcase /> },
    { id: 'projects', title: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'research', title: 'Research Papers', icon: <FaFileAlt /> },
    { id: 'volunteering', title: 'Volunteering', icon: <FaHeart /> },
    { id: 'test_scores', title: 'Test Scores', icon: <FaFileInvoice /> },
];

export default function StudentProfile({ user, onProfileUpdate, onAddItem, onUpdateItem, onDeleteItem }) {
    const [isEditing, setIsEditing] = useState(false);
    const [cards, setCards] = useState(RECOMMENDED_CARDS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openFormId, setOpenFormId] = useState(null);

    const visibleCount = 2;

    // Sync added status with real user profile data
    React.useEffect(() => {
        if (!user || !user.profile) return;
        
        const sectionMapping = {
            1: 'targetUniversities',
            2: 'highSchool',
            3: 'underGrad',
            4: 'masters',
            5: 'testScores',
            6: 'workExperience',
            7: 'research',
            8: 'projects',
            9: 'volunteering'
        };

        setCards(prev => prev.map(card => {
            const profileKey = sectionMapping[card.id];
            if (profileKey && user.profile[profileKey] && user.profile[profileKey].length > 0) {
                return { ...card, added: true };
            }
            return card;
        }));
    }, [user]);

    const addedCount = cards.filter(c => c.added).length;
    const progressPercent = Math.round((addedCount / cards.length) * 100);

    const scroll = (direction) => {
        if (direction === 'right') {
            setCurrentIndex(prev => Math.min(prev + 1, cards.length - visibleCount));
        } else {
            setCurrentIndex(prev => Math.max(prev - 1, 0));
        }
    };

    const handleCardAction = (id, action) => {
        setCards(prev => prev.map(c => c.id === id ? { ...c, added: action === 'add', skipped: action === 'skip' } : c));
    };

    const remainingCards = cards.filter(c => !c.added && !c.skipped);
    const visibleCards = remainingCards.slice(currentIndex, currentIndex + visibleCount);

    if (!user) {
        return (
            <div className="profile-page-wrapper">
                <div className="shimmer-container" style={{ height: '80vh', borderRadius: '20px', background: '#fff' }}></div>
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="profile-page-wrapper animate-fade-in">
                <EditProfileModal 
                    user={user} 
                    onClose={() => setIsEditing(false)} 
                    onSave={async (data) => { await onProfileUpdate(data); setIsEditing(false); }} 
                    onAddItem={onAddItem}
                    onUpdateItem={onUpdateItem}
                    onDeleteItem={onDeleteItem}
                />
            </div>
        );
    }

    return (
        <div className="profile-page-wrapper">
            <ProfileHeader user={user} onEditRequest={() => setIsEditing(true)} />

            <div className="profile-layout">
                <div className="profile-main-column">
                    {/* RECOMMENDED FOR YOU SECTION */}
                    <div className="recommended-section-v3 card-v3">
                        <div className="section-header-v3">
                            <h2 className="section-title-v3">
                                <div className="icon-box-v3 star">
                                    <FaStar />
                                </div>
                                Recommended for you
                            </h2>
                        </div>

                        <div className="profile-status-v3">
                            <div className="status-label-v3">
                                <span>Profile Status</span>
                                <span className="status-count-v3">{addedCount}/{cards.length}</span>
                            </div>
                            <div className="progress-bar-v3">
                                <div className="progress-fill-v3" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                            <p className="status-tip-v3">
                                Complete your profile to enhance visibility and increase your reach. Help people know you better.
                            </p>
                        </div>

                        {remainingCards.length > 0 ? (
                            <div className="recommendations-carousel-v3">
                                <button className="carousel-btn prev" onClick={() => scroll('left')} disabled={currentIndex === 0}>
                                    <FaChevronLeft />
                                </button>
                                
                                <div className="carousel-track-v3">
                                    {visibleCards.map(card => (
                                        <div key={card.id} className="rec-card-v3">
                                            <div className="rec-card-header">
                                                <span className="rec-card-emoji">{card.icon}</span>
                                                <div className="rec-card-text">
                                                    <h4>{card.title}</h4>
                                                    <p>{card.description}</p>
                                                </div>
                                            </div>
                                            <div className="rec-card-actions">
                                                <button className="btn-skip-v3" onClick={() => handleCardAction(card.id, 'skip')}>Skip</button>
                                                <button className="btn-add-v3" onClick={() => {
                                                    setOpenFormId(card.id);
                                                }}>Add</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="carousel-btn next" onClick={() => scroll('right')} disabled={currentIndex >= remainingCards.length - visibleCount}>
                                    <FaChevronRight />
                                </button>
                            </div>
                        ) : (
                            <div className="all-completed-msg bg-blue-50 p-6 rounded-xl text-center">
                                <span className="text-2xl mb-2 block">🎉</span>
                                <h4 className="font-bold text-blue-900">Profile Complete!</h4>
                                <p className="text-blue-700 text-xs">You've addressed all recommendations.</p>
                            </div>
                        )}
                    </div>

                    {/* MODAL FOR FORMS */}
                    {openFormId && (
                        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-[1000] p-4 pt-20">
                            {(() => {
                                const card = cards.find(c => c.id === openFormId);
                                const getSectionKey = (id) => {
                                    switch(id) {
                                        case 1: return 'targetUniversities';
                                        case 2: return 'highSchool';
                                        case 3: return 'underGrad';
                                        case 4: return 'masters';
                                        case 5: return 'testScores';
                                        case 6: return 'workExperience';
                                        case 7: return 'research';
                                        case 8: return 'projects';
                                        case 9: return 'volunteering';
                                        default: return null;
                                    }
                                };
                                
                                const commonProps = {
                                    card: card,
                                    onClose: () => setOpenFormId(null),
                                    onSave: async (data) => {
                                        const key = getSectionKey(openFormId);
                                        if (key && onAddItem) {
                                            await onAddItem(key, data);
                                        }
                                        handleCardAction(openFormId, 'add');
                                        setOpenFormId(null);
                                    }
                                };
                                
                                switch(openFormId) {
                                    case 1: return <TargetUniversity {...commonProps} />;
                                    case 2: return <HighSchool {...commonProps} />;
                                    case 3: return <UnderGrad {...commonProps} />;
                                    case 4: return <Masters {...commonProps} />;
                                    case 5: return <TestScores {...commonProps} />;
                                    case 6: return <WorkExp {...commonProps} />;
                                    case 7: return <Research {...commonProps} />;
                                    case 8: return <AddProjects {...commonProps} />;
                                    case 9: return <Volunteering {...commonProps} />;
                                    default: return <UnifiedProfileForm {...commonProps} />;
                                }
                            })()}
                        </div>
                    )}

                    {/* PROFILE SECTIONS LIST */}
                    <div className="profile-sections-list-v3">
                        {PROFILE_SECTIONS.map(section => (
                            <div key={section.id} className="section-row-v3 card-v3">
                                <div className="section-row-left">
                                    <div className="section-row-icon">{section.icon}</div>
                                    <span className="section-row-title">{section.title}</span>
                                </div>
                                <button className="section-add-btn-v3">
                                    <FaPlus />
                                </button>
                            </div>
                        ))}
                    </div>

                    <CareerStats user={user} />
                    <UpcomingConsultations user={user} />
                    <ActivityHeatmap user={user} />
                </div>

                <div className="profile-side-column">
                    <CareerInterests user={user} />
                </div>
            </div>
        </div>
    );
}


