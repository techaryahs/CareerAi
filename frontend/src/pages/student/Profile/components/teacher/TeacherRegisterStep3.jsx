import React from "react";
import { FaRupeeSign } from "react-icons/fa";

export default function TeacherRegisterStep3({ form, updateField }) {
    return (
        <div className="step-content-modern">
            <div className="step-icon-header">
                <FaRupeeSign className="step-main-icon" />
                <h2>Pricing & Location</h2>
                <p>Set your rates and service areas</p>
            </div>

            <div className="form-grid-modern">
                {(form.teachingMode === "online" || form.teachingMode === "both") && (
                    <div className="form-group-modern">
                        <label>Online Price (₹/hour) *</label>
                        <div className="price-input-modern">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="500"
                                value={form.onlinePrice}
                                onChange={(e) => updateField("onlinePrice", e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {(form.teachingMode === "offline" || form.teachingMode === "both") && (
                    <div className="form-group-modern">
                        <label>Offline Price (₹/hour) *</label>
                        <div className="price-input-modern">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="800"
                                value={form.offlinePrice}
                                onChange={(e) => updateField("offlinePrice", e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {(form.teachingMode === "offline" || form.teachingMode === "both") && (
                <div className="form-group-modern full-width">
                    <label>Service Areas *</label>
                    <input
                        type="text"
                        placeholder="e.g. Andheri West, Bandra, Mumbai"
                        value={form.offlineLocation}
                        onChange={(e) => updateField("offlineLocation", e.target.value)}
                    />
                    <p className="field-hint">
                        Enter the areas where you can teach offline
                    </p>
                </div>
            )}
        </div>
    );
}
