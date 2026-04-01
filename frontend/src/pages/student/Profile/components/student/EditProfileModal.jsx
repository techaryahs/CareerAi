import React, { useState } from 'react';
import {
    FaUser, FaCog, FaUniversity, FaGraduationCap,
    FaFileAlt, FaChevronLeft, FaPhone, FaMapMarkerAlt,
    FaLink, FaParagraph, FaEnvelope, FaLock, FaTransgender, FaCalendarAlt,
    FaChevronDown, FaUsers
} from 'react-icons/fa';
import '../styles/student/EditProfileModal.css';

const EditProfileModal = ({ user, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
        bio: user?.profile?.bio || '',
        location: user?.profile?.location || '',
        portfolio: user?.profile?.portfolio || '',
        targetUniversity: user?.profile?.targetUniversity || 'Inter American University of Puerto Rico - San German',
        interestedMajor: user?.profile?.interestedMajor || 'Biology',
        interestedTerm: user?.profile?.interestedTerm || 'Fall',
        interestedYear: user?.profile?.interestedYear || '2025'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const universities = [
        'ABM College', 'Aalborg University', 'Aarhus University',
        'Aberystwyth University', 'Abilene Christian University',
        'Abraham Baldwin Agricultural College', 'Academy of Art University'
    ];

    const majors = [
        '3D Computer Animation and Modelling', 'ACS: Advanced Web Technologies',
        'ACS: Computer Security', 'ATLAS - Creative Technologies and Design Track',
        'Accelerated Second Degree BSN'
    ];

    const terms = [
        'Fall (August/September)', 'Spring (January)', 'Summer (June/July)'
    ];

    const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031'];

    const handleSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setActiveDropdown(null);
    };

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Structuring data for the new backend updateProfile (merging into profile)
            const updates = {
                name: formData.name,
                mobile: formData.mobile,
                profile: {
                    bio: formData.bio,
                    location: formData.location,
                    portfolio: formData.portfolio,
                    targetUniversity: formData.targetUniversity,
                    interestedMajor: formData.interestedMajor,
                    interestedTerm: formData.interestedTerm,
                    interestedYear: formData.interestedYear
                }
            };
            await onSave(updates);
            onClose();
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
        { id: 'settings', label: 'Profile Settings', icon: <FaCog /> },
        { id: 'university', label: 'Target University Details', icon: <FaUniversity /> },
        { id: 'scores', label: 'Tests Scores', icon: <FaGraduationCap /> },
        { id: 'resume', label: 'Upload Resume', icon: <FaFileAlt /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        {/* 1. BASIC INFO CARD */}
                        <div className="wide-card-section">
                            <div className="wide-card-header">
                                <h2>Basic info</h2>
                                <div className="header-line"></div>
                            </div>

                            <div className="wide-profile-avatar-section">
                                <div className="wide-avatar-placeholder">
                                    {user?.name?.charAt(0) || 'U'}
                                    <div className="wide-avatar-edit-badge">
                                        <FaCog />
                                    </div>
                                </div>
                                <h3 className="wide-avatar-name">{formData.name || 'User Name'}</h3>
                            </div>

                            <div className="wide-form-grid">
                                <div className="wide-form-group full-width">
                                    <label>Full Name</label>
                                    <div className="wide-input-with-icon">
                                        <FaUser />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="wide-form-group">
                                    <label>Gender</label>
                                    <button type="button" className="wide-custom-selector disabled">
                                        <span>Female</span>
                                        <FaChevronLeft className="rotate-icon-90" style={{ transform: 'rotate(180deg)' }} />
                                    </button>
                                </div>

                                <div className="wide-form-group">
                                    <label>Date of Birth</label>
                                    <button type="button" className="wide-custom-selector disabled">
                                        <span>Jul 01, 2004</span>
                                        <FaChevronLeft className="rotate-icon-90" style={{ transform: 'rotate(180deg)' }} />
                                    </button>
                                </div>

                                <div className="wide-form-group full-width">
                                    <label>Mobile Number</label>
                                    <div className="wide-input-with-icon">
                                        <FaPhone />
                                        <input 
                                            type="tel" 
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="10-digit number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. PROFESSIONAL PRESENCE */}
                        <div className="wide-card-section">
                            <div className="wide-card-header">
                                <h2>Professional Presence</h2>
                                <div className="header-line"></div>
                            </div>
                            <div className="wide-form-grid">
                                <div className="wide-form-group full-width">
                                    <label>Location</label>
                                    <div className="wide-input-with-icon">
                                        <FaMapMarkerAlt />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="e.g. Mumbai, India"
                                        />
                                    </div>
                                </div>
                                <div className="wide-form-group full-width">
                                    <label>Portfolio / Links</label>
                                    <div className="wide-input-with-icon">
                                        <FaLink />
                                        <input
                                            type="url"
                                            name="portfolio"
                                            value={formData.portfolio}
                                            onChange={handleChange}
                                            placeholder="https://yourportfolio.com"
                                        />
                                    </div>
                                </div>
                                <div className="wide-form-group full-width">
                                    <label>Professional Bio</label>
                                    <div className="wide-input-with-icon align-top">
                                        <FaParagraph />
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Write a short professional bio..."
                                            rows="4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wide-form-actions-bottom sticky-footer">
                            <button
                                onClick={handleSubmit}
                                className="wide-btn-save main-action"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        <div className="wide-section-header">
                            <h2>Profile Settings</h2>
                            <p>Manage your contact details, account security, and preferences.</p>
                        </div>

                        {/* 1. CONTACT INFO CARD */}
                        <div className="wide-card-section">
                            <div className="wide-card-header">
                                <h2>Contact info</h2>
                                <div className="header-line"></div>
                            </div>
                            <div className="wide-form-grid">
                                <div className="wide-form-group full-width">
                                    <label>Email</label>
                                    <div className="wide-input-with-icon disabled">
                                        <input type="email" value={user?.email || ''} disabled />
                                        <FaLock className="wide-lock-icon" />
                                    </div>
                                </div>
                                <div className="wide-action-row">
                                    <button type="button" className="btn-inline-action">Change Email</button>
                                </div>
                            </div>
                        </div>
                        {/* 2. ACCOUNT SETTINGS CARD */}
                        <div className="wide-card-section">
                            <div className="wide-card-header">
                                <h2>Account settings</h2>
                                <div className="header-line"></div>
                            </div>
                            <div className="wide-form-grid">
                                <div className="wide-form-group full-width">
                                    <label>Username</label>
                                    <div className="wide-input-with-icon disabled">
                                        <input type="text" value={`shree001`} disabled />
                                    </div>
                                </div>
                                <div className="wide-form-group full-width">
                                    <div className="wide-row-horizontal">
                                        <span className="row-label" title="Private profiles are only visible to approved followers">Private profile</span>
                                        <div className="toggle-switch">
                                            <input type="checkbox" id="private-profile" />
                                            <label htmlFor="private-profile"></label>
                                        </div>
                                    </div>
                                    <div className="wide-row-horizontal">
                                        <span className="row-label">Blocked Users</span>
                                        <button type="button" className="btn-small-outline">View List</button>
                                    </div>
                                    <div className="wide-row-horizontal">
                                        <span className="row-label">Password</span>
                                        <button type="button" className="btn-inline-action">Reset Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wide-form-actions-bottom sticky-footer">
                            <button
                                onClick={handleSubmit}
                                className="wide-btn-save main-action"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                );
            case 'university':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        <div className="wide-card-section">
                            <div className="wide-card-header">
                                <h2 style={{ fontSize: '36px', color: '#64748b', fontWeight: '500', marginBottom: '16px' }}>Target University Details</h2>
                                <div className="header-line"></div>
                            </div>

                            {/* University Dropdown */}
                            <div className="wide-row-horizontal">
                                <span className="row-label">University</span>
                                <div className="wide-dropdown-container">
                                    <button 
                                        type="button" 
                                        className={`wide-custom-selector ${activeDropdown === 'university' ? 'active' : ''}`}
                                        onClick={() => toggleDropdown('university')}
                                    >
                                        <span>{formData.targetUniversity}</span>
                                        <FaChevronDown className="rotate-icon-90" style={{ opacity: 0.5 }} />
                                    </button>
                                    <div className={`wide-dropdown-list ${activeDropdown === 'university' ? 'show' : ''}`}>
                                        {universities.map(uni => (
                                            <div 
                                                key={uni} 
                                                className={`wide-dropdown-item ${formData.targetUniversity === uni ? 'selected' : ''}`}
                                                onClick={() => handleSelect('targetUniversity', uni)}
                                            >
                                                {uni}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Interested Major Dropdown */}
                            <div className="wide-row-horizontal">
                                <span className="row-label">Interested Major</span>
                                <div className="wide-dropdown-container">
                                    <button 
                                        type="button" 
                                        className={`wide-custom-selector ${activeDropdown === 'major' ? 'active' : ''}`}
                                        onClick={() => toggleDropdown('major')}
                                    >
                                        <span>{formData.interestedMajor}</span>
                                        <FaChevronDown className="rotate-icon-90" style={{ opacity: 0.5 }} />
                                    </button>
                                    <div className={`wide-dropdown-list ${activeDropdown === 'major' ? 'show' : ''}`}>
                                        {majors.map(major => (
                                            <div 
                                                key={major} 
                                                className={`wide-dropdown-item ${formData.interestedMajor === major ? 'selected' : ''}`}
                                                onClick={() => handleSelect('interestedMajor', major)}
                                            >
                                                {major}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Interested Term Dropdown */}
                            <div className="wide-row-horizontal">
                                <span className="row-label">Interested Term</span>
                                <div className="wide-dropdown-container">
                                    <button 
                                        type="button" 
                                        className={`wide-custom-selector ${activeDropdown === 'term' ? 'active' : ''}`}
                                        onClick={() => toggleDropdown('term')}
                                    >
                                        <span>{formData.interestedTerm}</span>
                                        <FaChevronDown className="rotate-icon-90" style={{ opacity: 0.5 }} />
                                    </button>
                                    <div className={`wide-dropdown-list ${activeDropdown === 'term' ? 'show' : ''}`}>
                                        {terms.map(term => (
                                            <div 
                                                key={term} 
                                                className={`wide-dropdown-item ${formData.interestedTerm === term ? 'selected' : ''}`}
                                                onClick={() => handleSelect('interestedTerm', term)}
                                            >
                                                {term}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Interested Year Dropdown */}
                            <div className="wide-row-horizontal" style={{ borderBottom: 'none' }}>
                                <span className="row-label">Interested Year</span>
                                <div className="wide-dropdown-container">
                                    <button 
                                        type="button" 
                                        className={`wide-custom-selector ${activeDropdown === 'year' ? 'active' : ''}`}
                                        onClick={() => toggleDropdown('year')}
                                    >
                                        <span>{formData.interestedYear}</span>
                                        <FaChevronDown className="rotate-icon-90" style={{ opacity: 0.5 }} />
                                    </button>
                                    <div className={`wide-dropdown-list ${activeDropdown === 'year' ? 'show' : ''}`}>
                                        {years.map(year => (
                                            <div 
                                                key={year} 
                                                className={`wide-dropdown-item ${formData.interestedYear === year ? 'selected' : ''}`}
                                                onClick={() => handleSelect('interestedYear', year)}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wide-form-actions-bottom sticky-footer">
                            <button
                                onClick={handleSubmit}
                                className="wide-btn-save main-action"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                );
            case 'scores':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        <div className="wide-card-section">
                            <div className="wide-card-header">
                                <h2 style={{ fontSize: '36px', color: '#64748b', fontWeight: '500', marginBottom: '16px' }}>Language Score</h2>
                                <div className="header-line"></div>
                            </div>
                            <div style={{ padding: '24px 0' }}>
                                <button type="button" className="wide-btn-light-blue">
                                    Add or Edit Tests
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'resume':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        <div className="wide-card-section">
                            <div className="wide-resume-icon-header">
                                <FaUsers />
                                <span>Resume</span>
                            </div>
                            
                            <div className="wide-resume-card-content">
                                <p className="wide-resume-hint-text">
                                    No Resume Uploaded. Only doc, docx and pdf file are allowed
                                </p>
                                <button type="button" className="wide-btn-upload-resume">
                                    Upload Resume
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="wide-edit-page-container">
            <div className="wide-edit-layout">
                {/* Sidebar Navigation */}
                <div className="wide-edit-sidebar">
                    <div className="wide-sidebar-sticky-wrapper">
                        <button className="wide-back-to-profile" onClick={onClose}>
                            <FaChevronLeft />
                            <span>Back to Profile</span>
                        </button>

                        <div className="wide-sidebar-menu">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`wide-sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <span className="wide-item-icon">{tab.icon}</span>
                                    <span className="wide-item-label">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="wide-edit-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
