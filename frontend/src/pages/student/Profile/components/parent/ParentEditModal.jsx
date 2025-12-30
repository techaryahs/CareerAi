import React, { useState } from 'react';
import { FaTimes, FaUser, FaPhone, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import "../styles/parent/EditProfileModal.css";

const ParentEditModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
        location: user?.location || '',
        bio: user?.bio || '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (err) {
            console.error("Update error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-zoom" onClick={(e) => e.stopPropagation()}>
                {/* Close button in the absolute top-right corner */}
                <button className="modal-close-btn-top" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="edit-profile-modal">
                    <div className="modal-header-v4">
                        <h2>Parent Information</h2>
                        <p className="modal-subtitle-v4">Manage your profile settings and parenting details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="edit-profile-form-v4">
                        <div className="form-grid-v4">
                            <div className="form-group-v4">
                                <label>Full Name</label>
                                <div className="input-wrapper-v4">
                                    <FaUser className="field-icon-v4" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
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
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="10-digit number"
                                    />
                                </div>
                            </div>

                            <div className="form-group-v4">
                                <label>Location</label>
                                <div className="input-wrapper-v4">
                                    <FaMapMarkerAlt className="field-icon-v4" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Mumbai, India"
                                    />
                                </div>
                            </div>

                            <div className="form-group-v4 full-width">
                                <label>Bio / Parenting Philosophy</label>
                                <div className="input-wrapper-v4 align-top">
                                    <FaQuoteLeft className="field-icon-v4" />
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell us about yourself..."
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
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-v4 primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ParentEditModal;
