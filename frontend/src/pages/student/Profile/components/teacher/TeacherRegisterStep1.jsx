import React from "react";
import { FaUser } from "react-icons/fa";

export default function TeacherRegisterStep1({ form, updateField }) {
    return (
        <div className="step-content-modern">
            <div className="step-icon-header">
                <FaUser className="step-main-icon" />
                <h2>Basic Information</h2>
                <p>Tell us about yourself</p>
            </div>

            <div className="form-grid-modern">
                <div className="form-group-modern">
                    <label>Full Name *</label>
                    <input
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                    />
                </div>
                <div className="form-group-modern">
                    <label>Email Address *</label>
                    <input
                        type="email"
                        placeholder="e.g. priya@example.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                    />
                </div>
                <div className="form-group-modern">
                    <label>Phone Number *</label>
                    <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        maxLength="10"
                    />
                </div>
                <div className="form-group-modern">
                    <label>Password *</label>
                    <input
                        type="password"
                        placeholder="Create a secure password"
                        value={form.password}
                        onChange={(e) => updateField("password", e.target.value)}
                    />
                </div>
                <div className="form-group-modern">
                    <label>Years of Experience *</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. 5"
                        value={form.experienceYears}
                        onChange={(e) => updateField("experienceYears", e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group-modern full-width">
                <label>About You *</label>
                <textarea
                    placeholder="Tell students about your teaching style, expertise, and what makes you special..."
                    value={form.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    rows={4}
                />
            </div>
        </div>
    );
}
