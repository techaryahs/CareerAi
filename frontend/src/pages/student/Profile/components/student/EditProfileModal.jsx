import React, { useState } from 'react';
import {
    FaUser, FaCog, FaUniversity, FaGraduationCap,
    FaFileAlt, FaChevronLeft, FaPhone, FaMapMarkerAlt,
    FaLink, FaParagraph, FaEnvelope, FaLock, FaTransgender, FaCalendarAlt,
    FaChevronDown, FaUsers, FaTrash, FaPlus, FaSchool
} from 'react-icons/fa';
import TestScores from './student_card/TestScores';
import '../styles/student/EditProfileModal.css';

const EditProfileModal = ({ user, onClose, onSave, onAddItem, onUpdateItem, onDeleteItem }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
        country: user?.country || '',
        state: user?.state || '',
        bio: user?.profile?.bio || '',
        portfolio: user?.profile?.portfolio || '',
        targetUniversity: user?.profile?.targetUniversity || 'Inter American University of Puerto Rico - San German',
        interestedMajor: user?.profile?.interestedMajor || 'Biology',
        interestedTerm: user?.profile?.interestedTerm || 'Fall',
        interestedYear: user?.profile?.interestedYear || '2025',
        education: [
            ...(user?.profile?.highSchool?.map(i => ({ ...i, type: 'High School', section: 'highSchool' })) || []),
            ...(user?.profile?.underGrad?.map(i => ({ ...i, type: "Bachelor's", section: 'underGrad' })) || []),
            ...(user?.profile?.masters?.map(i => ({ ...i, type: "Master's", section: 'masters' })) || [])
        ]
    });
    
    // Fallback for initial state if empty
    React.useEffect(() => {
        if (formData.education.length === 0) {
            setFormData(prev => ({
                ...prev,
                education: [
                    { type: 'High School', section: 'highSchool', schoolName: '', cgpa: '', outOf: '100', backlogs: '0' },
                    { type: "Bachelor's", section: 'underGrad', university: '', major: '', cgpa: '', outOf: '100', backlogs: '0' }
                ]
            }));
        }
    }, []);

    const [initialEducation] = useState(JSON.parse(JSON.stringify(formData.education)));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showTestScorePopup, setShowTestScorePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const hasValidationError = formData.education.some(edu => {
        const score = parseFloat(edu.cgpa);
        const scale = parseFloat(edu.outOf);
        return !isNaN(score) && !isNaN(scale) && score > scale;
    });

    const DeleteConfirmationModal = ({ onCancel, onConfirm, type }) => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[3000] p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTrash className="text-red-500 text-2xl" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-2 uppercase italic">Really want to delete?</h3>
                <p className="text-gray-500 text-xs mb-8 leading-relaxed font-medium italic">
                    Are you sure you want to remove your **{type}** details? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                    <button 
                        onClick={onCancel}
                        className="flex-1 py-3 bg-gray-100 text-gray-500 text-xs font-black rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest italic"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-1 py-3 bg-red-500 text-white text-xs font-black rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200 uppercase tracking-widest italic"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );

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
        
        // Add character limits
        const limits = {
            name: 50,
            mobile: 10,
            location: 100,
            portfolio: 200,
            bio: 500
        };

        if (limits[name] && value.length > limits[name]) return;

        // Numeric filtering for mobile
        if (name === 'mobile') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
            return;
        }

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
                country: formData.country,
                state: formData.state,
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
            if (hasValidationError) return;
            await onSave(updates);

            // Handle Education modular updates
            for (const edu of formData.education) {
                const section = edu.section || (edu.type === 'High School' ? 'highSchool' : edu.type === "Bachelor's" ? 'underGrad' : 'masters');
                const cleanData = { ...edu };
                delete cleanData.type;
                delete cleanData.section;
                const itemId = cleanData._id;
                delete cleanData._id;

                if (itemId) {
                    // Update existing item if it changed
                    const initial = initialEducation.find(i => i._id === itemId);
                    if (JSON.stringify(initial) !== JSON.stringify(edu)) {
                        await onUpdateItem(section, itemId, cleanData);
                    }
                } else {
                    // Add new item (only if it has content)
                    const hasContent = cleanData.schoolName || cleanData.university || cleanData.cgpa;
                    if (hasContent) {
                        await onAddItem(section, cleanData);
                    }
                }
            }

            onClose();
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasEducation = (user?.profile?.highSchool?.length > 0 || user?.profile?.underGrad?.length > 0 || user?.profile?.masters?.length > 0);
    const hasUniversity = (user?.profile?.targetUniversity || user?.profile?.targetUniversities?.length > 0);

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
        { id: 'settings', label: 'Profile Settings', icon: <FaCog /> },
        ...(hasEducation ? [{ id: 'education', label: 'Education Details', icon: <FaGraduationCap /> }] : []),
        ...(hasUniversity ? [{ id: 'university', label: 'Target University Details', icon: <FaUniversity /> }] : []),
        { id: 'scores', label: 'Tests Scores', icon: <FaFileAlt /> },
        { id: 'resume', label: 'Upload Resume', icon: <FaUsers /> },
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
                                            maxLength={50}
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
                                            type="text" 
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="10-digit number"
                                            maxLength={10}
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
                                <div className="wide-form-group">
                                    <label>Country</label>
                                    <div className="wide-input-with-icon">
                                        <FaMapMarkerAlt />
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder="e.g. India"
                                            maxLength={50}
                                        />
                                    </div>
                                </div>
                                <div className="wide-form-group">
                                    <label>State</label>
                                    <div className="wide-input-with-icon">
                                        <FaMapMarkerAlt />
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="e.g. Maharashtra"
                                            maxLength={50}
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
                                            maxLength={200}
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
                                            maxLength={500}
                                            rows="4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wide-form-actions-bottom sticky-footer">
                            <button
                                onClick={handleSubmit}
                                className={`wide-btn-save main-action ${hasValidationError ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}`}
                                disabled={isSubmitting || hasValidationError}
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
                                className={`wide-btn-save main-action ${hasValidationError ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}`}
                                disabled={isSubmitting || hasValidationError}
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
                                className={`wide-btn-save main-action ${hasValidationError ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}`}
                                disabled={isSubmitting || hasValidationError}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        <div className="wide-section-header">
                            <h2>Educational Details</h2>
                        </div>

                        <div className="education-list-container space-y-4">
                            {formData.education.map((edu, index) => (
                                <div key={index} className="wide-card-section animate-slide-up" style={{ padding: '20px' }}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="edu-icon-circle" style={{ 
                                                width: '36px', 
                                                height: '36px', 
                                                backgroundColor: '#f1f5f9', 
                                                borderRadius: '50%', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                color: '#4f46e5',
                                                fontSize: '16px'
                                            }}>
                                                {edu.type === 'High School' ? <FaSchool /> : <FaGraduationCap />}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{edu.type}</h3>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="text-red-400 hover:text-red-600 p-2 transition-colors"
                                            onClick={() => setItemToDelete({ index, type: edu.type, section: edu.section || (edu.type === 'High School' ? 'highSchool' : edu.type === "Bachelor's" ? 'underGrad' : 'masters'), itemId: edu._id })}
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>

                                    <div className="wide-form-grid" style={{ gap: '12px' }}>
                                        {edu.type === 'High School' ? (
                                            <div className="wide-form-group full-width">
                                                <label>School Name</label>
                                                <input
                                                    type="text"
                                                    value={edu.schoolName}
                                                    onChange={(e) => {
                                                        const val = e.target.value.slice(0, 100);
                                                        const newEdu = [...formData.education];
                                                        newEdu[index].schoolName = val;
                                                        setFormData(prev => ({ ...prev, education: newEdu }));
                                                    }}
                                                    placeholder="Enter school name"
                                                    style={{ border: '1px solid #e2e8f0', background: '#fff' }}
                                                    maxLength={100}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="wide-form-group full-width">
                                                    <label>University</label>
                                                    <div className="wide-dropdown-container">
                                                        <button 
                                                            type="button" 
                                                            className={`wide-custom-selector ${activeDropdown === `uni-${index}` ? 'active' : ''}`}
                                                            onClick={() => toggleDropdown(`uni-${index}`)}
                                                            style={{ background: '#fff', border: '1px solid #e2e8f0' }}
                                                        >
                                                            <span>{edu.university || 'Select University'}</span>
                                                            <FaChevronDown style={{ opacity: 0.3 }} />
                                                        </button>
                                                        <div className={`wide-dropdown-list ${activeDropdown === `uni-${index}` ? 'show' : ''}`}>
                                                            {universities.map(uni => (
                                                                <div 
                                                                    key={uni} 
                                                                    className="wide-dropdown-item"
                                                                    onClick={() => {
                                                                        const newEdu = [...formData.education];
                                                                        newEdu[index].university = uni;
                                                                        setFormData(prev => ({ ...prev, education: newEdu }));
                                                                        setActiveDropdown(null);
                                                                    }}
                                                                >
                                                                    {uni}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="wide-form-group full-width">
                                                    <label>Major Studied</label>
                                                    <div className="wide-dropdown-container">
                                                        <button 
                                                            type="button" 
                                                            className={`wide-custom-selector ${activeDropdown === `major-${index}` ? 'active' : ''}`}
                                                            onClick={() => toggleDropdown(`major-${index}`)}
                                                            style={{ background: '#fff', border: '1px solid #e2e8f0' }}
                                                        >
                                                            <span>{edu.major || 'Select Major'}</span>
                                                            <FaChevronDown style={{ opacity: 0.3 }} />
                                                        </button>
                                                        <div className={`wide-dropdown-list ${activeDropdown === `major-${index}` ? 'show' : ''}`}>
                                                            {majors.map(major => (
                                                                <div 
                                                                    key={major} 
                                                                    className="wide-dropdown-item"
                                                                    onClick={() => {
                                                                        const newEdu = [...formData.education];
                                                                        newEdu[index].major = major;
                                                                        setFormData(prev => ({ ...prev, education: newEdu }));
                                                                        setActiveDropdown(null);
                                                                    }}
                                                                >
                                                                    {major}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="wide-form-group" style={{ flex: '1' }}>
                                            <label>CGPA</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    value={edu.cgpa}
                                                    onChange={(e) => {
                                                        // Allow numbers and one decimal point
                                                        const val = e.target.value.replace(/[^0-9.]/g, '').slice(0, 5);
                                                        if ((val.match(/\./g) || []).length > 1) return;
                                                        const newEdu = [...formData.education];
                                                        newEdu[index].cgpa = val;
                                                        setFormData(prev => ({ ...prev, education: newEdu }));
                                                    }}
                                                    placeholder="Score"
                                                    style={{ maxWidth: '120px', border: '1px solid #e2e8f0', background: '#fff' }}
                                                    maxLength={5}
                                                />
                                                <span className="text-gray-400">out of</span>
                                                    <div className="wide-dropdown-container" style={{ width: '120px' }}>
                                                        <button 
                                                            type="button" 
                                                            className={`wide-custom-selector ${activeDropdown === `scale-${index}` ? 'active' : ''}`}
                                                            onClick={() => toggleDropdown(`scale-${index}`)}
                                                            style={{ background: '#fff', border: '1px solid #e2e8f0' }}
                                                        >
                                                            <span>{edu.outOf}</span>
                                                            <FaChevronDown style={{ opacity: 0.3, fontSize: '10px' }} />
                                                        </button>
                                                        <div className={`wide-dropdown-list ${activeDropdown === `scale-${index}` ? 'show' : ''}`}>
                                                            {['100', '10', '4'].map(scale => (
                                                                <div 
                                                                    key={scale} 
                                                                    className="wide-dropdown-item"
                                                                    onClick={() => {
                                                                        const newEdu = [...formData.education];
                                                                        newEdu[index].outOf = scale;
                                                                        setFormData(prev => ({ ...prev, education: newEdu }));
                                                                        setActiveDropdown(null);
                                                                    }}
                                                                >
                                                                    {scale}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                            </div>
                                            {parseFloat(edu.cgpa) > parseFloat(edu.outOf) && (
                                                <p className="text-red-500 text-[10px] font-black uppercase italic mt-1 ml-2 animate-pulse">
                                                    * score should be less than equal to out of number
                                                </p>
                                            )}
                                        </div>

                                        <div className="wide-form-group" style={{ flex: '1' }}>
                                            <label>Backlogs</label>
                                            <input
                                                type="text"
                                                value={edu.backlogs}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                                                    const newEdu = [...formData.education];
                                                    newEdu[index].backlogs = val;
                                                    setFormData(prev => ({ ...prev, education: newEdu }));
                                                }}
                                                placeholder="0"
                                                style={{ border: '1px solid #e2e8f0', background: '#fff' }}
                                                maxLength={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-center pt-4 pb-12">
                                <button 
                                    className="wide-btn-light-blue flex items-center gap-2"
                                    onClick={() => {
                                        const types = ['High School', "Bachelor's", "Master's"];
                                        const currentTypes = formData.education.map(e => e.type);
                                        const nextType = types.find(t => !currentTypes.includes(t));
                                        if (nextType) {
                                            const section = nextType === 'High School' ? 'highSchool' : nextType === "Bachelor's" ? 'underGrad' : 'masters';
                                            setFormData(prev => ({
                                                ...prev,
                                                education: [...prev.education, { 
                                                    type: nextType, 
                                                    section: section,
                                                    schoolName: '', 
                                                    university: '', 
                                                    major: '', 
                                                    cgpa: '', 
                                                    cgpaOutOf: '100', 
                                                    backlogs: '0' 
                                                }]
                                            }));
                                        } else {
                                            alert("All education levels added!");
                                        }
                                    }}
                                >
                                    <FaPlus /> Add more education details
                                </button>
                            </div>
                        </div>

                        <div className="wide-form-actions-bottom sticky-footer">
                            <button
                                onClick={handleSubmit}
                                className={`wide-btn-save main-action ${hasValidationError ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}`}
                                disabled={isSubmitting || hasValidationError}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                );
            case 'scores':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        {itemToDelete && (
                            <DeleteConfirmationModal 
                                type={itemToDelete.type}
                                onCancel={() => setItemToDelete(null)}
                                onConfirm={async () => {
                                    if (itemToDelete.itemId) {
                                        await onDeleteItem(itemToDelete.section, itemToDelete.itemId);
                                    }
                                    const newEdu = formData.education.filter((_, i) => i !== itemToDelete.index);
                                    setFormData(prev => ({ ...prev, education: newEdu }));
                                    setItemToDelete(null);
                                }}
                            />
                        )}
                        <div className="wide-section-header">
                            <h2>Test Scores</h2>
                            <p>Manage your standardized test results (GRE, TOEFL, IELTS, etc.)</p>
                        </div>

                        <div className="education-list-container space-y-4">
                            {(user?.profile?.testScores || []).length > 0 ? (
                                user.profile.testScores.map((test, index) => (
                                    <div key={index} className="wide-card-section animate-slide-up" style={{ padding: '0px' }}>
                                        <div className="flex justify-between items-center bg-[#f8fafc] px-4 py-2 border-b border-gray-100">
                                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest italic">
                                                YOUR {test.testType} SCORE :
                                            </h3>
                                            <button 
                                                type="button" 
                                                className="text-red-400 hover:text-red-500 transition-colors"
                                                onClick={() => {
                                                    if(window.confirm(`Delete this ${test.testType} entry?`)) {
                                                        onDeleteItem('testScores', test._id);
                                                    }
                                                }}
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                        <div className="p-4 flex flex-wrap gap-4">
                                            {test.sectionScores && Object.entries(test.sectionScores).map(([name, score]) => (
                                                <div key={name} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                                                    <span className="text-[11px] font-bold text-gray-500 uppercase italic">
                                                        {name} Score :
                                                    </span>
                                                    <span className="text-[11px] font-black text-[#4f46e5] italic">
                                                        {score}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="flex items-center gap-2 bg-[#f1f5f9] px-3 py-1.5 rounded-lg border border-[#e2e8f0]">
                                                <span className="text-[11px] font-black text-gray-500 uppercase italic">Total :</span>
                                                <span className="text-[11px] font-black text-[#004080] italic">{test.score}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium italic">No test scores added yet.</p>
                                </div>
                            )}

                            <div className="flex justify-center pt-2 pb-8">
                                <button 
                                    className="wide-btn-light-blue flex items-center gap-2"
                                    onClick={() => setShowTestScorePopup(true)}
                                >
                                    <FaPlus /> Add or Edit Tests
                                </button>
                            </div>
                        </div>

                        {showTestScorePopup && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[2000] p-4">
                                <TestScores 
                                    onClose={() => setShowTestScorePopup(false)}
                                    onSave={async (data) => {
                                        await onAddItem('testScores', data);
                                        setShowTestScorePopup(false);
                                    }}
                                />
                            </div>
                        )}

                        <div className="wide-form-actions-bottom sticky-footer">
                            <button onClick={onClose} className="wide-btn-save main-action">Close</button>
                        </div>
                    </div>
                );
            case 'resume':
                return (
                    <div className="wide-edit-wrapper animate-fade-in">
                        <div className="wide-card-section">
                            <div className="wide-resume-icon-header">
                                <FaFileAlt />
                                <span>Curriculum Vitae</span>
                            </div>
                            
                            <div className="wide-resume-card-content">
                                <p className="wide-resume-hint-text">
                                    Upload your latest resume in PDF format (Max 5MB).<br/>
                                    Applying with a resume increases your chances by 60%.
                                </p>
                                
                                {user?.profile?.resumeUrl ? (
                                    <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-4">
                                        <div className="text-green-600"><FaFileAlt size={24} /></div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-green-900">Resume Uploaded</p>
                                            <a href={user.profile.resumeUrl} target="_blank" rel="noreferrer" className="text-xs text-green-700 underline">View Current Resume</a>
                                        </div>
                                    </div>
                                ) : null}

                                <button type="button" className="wide-btn-upload-resume">
                                    <FaPlus className="mr-2" /> Upload New Resume
                                </button>
                            </div>
                        </div>
                        
                        <div className="wide-form-actions-bottom sticky-footer">
                            <button onClick={onClose} className="wide-btn-save main-action">Close</button>
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
                    {itemToDelete && (
                        <DeleteConfirmationModal 
                            type={itemToDelete.type}
                            onCancel={() => setItemToDelete(null)}
                            onConfirm={async () => {
                                if (itemToDelete.itemId) {
                                    await onDeleteItem(itemToDelete.section, itemToDelete.itemId);
                                }
                                const newEdu = formData.education.filter((_, i) => i !== itemToDelete.index);
                                setFormData(prev => ({ ...prev, education: newEdu }));
                                setItemToDelete(null);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
