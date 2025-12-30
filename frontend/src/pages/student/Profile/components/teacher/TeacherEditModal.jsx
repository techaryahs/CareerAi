import React, { useState } from 'react';
import { FaTimes, FaUser, FaPhone, FaMapMarkerAlt, FaLink, FaParagraph } from 'react-icons/fa';
import '../styles/student/EditProfileModal.css';

const TeacherEditModal = ({ user, onClose, onSave }) => {
    // Exact mapping of teacher fields to form fields
    const [formData, setFormData] = useState({
        fullName: user?.fullName || user?.name || '',
        phone: user?.phone || '',
        location: user?.offlineLocation || user?.location || '',
        portfolio: user?.portfolio || '',
        bio: user?.bio || ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-entrance" onClick={(e) => e.stopPropagation()}>
                {/* Standardized close button */}
                <button className="modal-close-btn-top" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="edit-profile-modal">
                    <div className="modal-header-v4">
                        <h2>Personal Information</h2>
                        <p className="modal-subtitle-v4">Manage your professional career profile and educator settings</p>
                    </div>

                    <form onSubmit={handleSubmit} className="edit-profile-form-v4">
                        <div className="form-grid-v4">
                            {/* Horizontal grid matching Student UI */}
                            <div className="form-group-v4">
                                <label>Full Name</label>
                                <div className="input-wrapper-v4">
                                    <FaUser className="field-icon-v4" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group-v4">
                                <label>Mobile Number</label>
                                <div className="input-wrapper-v4">
                                    <FaPhone className="field-icon-v4" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="10-digit number"
                                        pattern="[0-9]{10}"
                                    />
                                </div>
                            </div>

                            <div className="form-group-v4">
                                <label>Location / Hub</label>
                                <div className="input-wrapper-v4">
                                    <FaMapMarkerAlt className="field-icon-v4" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City, India"
                                    />
                                </div>
                            </div>

                            <div className="form-group-v4">
                                <label>Portfolio / Links</label>
                                <div className="input-wrapper-v4">
                                    <FaLink className="field-icon-v4" />
                                    <input
                                        type="url"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="form-group-v4 full-width">
                                <label>Educator Biography</label>
                                <div className="input-wrapper-v4 align-top">
                                    <FaParagraph className="field-icon-v4" />
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell us about your teaching philosophy and career journey..."
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer-v4">
                            <button
                                type="button"
                                className="btn-v4 secondary"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-v4 primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeacherEditModal;
