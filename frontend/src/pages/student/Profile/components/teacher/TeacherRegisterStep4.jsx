import React from "react";
import { FaClock, FaFileUpload, FaTimesCircle } from "react-icons/fa";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function TeacherRegisterStep4({
    selectedDays,
    setSelectedDays,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    slots,
    addSlot,
    removeSlot,
    setQualificationFile,
    setIdProofFile,
}) {
    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    return (
        <div className="step-content-modern">
            <div className="step-icon-header">
                <FaClock className="step-main-icon" />
                <h2>Your Availability</h2>
                <p>Set your teaching schedule</p>
            </div>

            <div className="form-group-modern full-width">
                <label>Select Days *</label>
                <div className="day-selector">
                    {DAYS.map((day) => (
                        <button
                            key={day}
                            type="button"
                            className={`day-btn ${selectedDays.includes(day) ? 'selected' : ''}`}
                            onClick={() => toggleDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-grid-modern">
                <div className="form-group-modern">
                    <label>Start Time *</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div className="form-group-modern">
                    <label>End Time *</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group-modern full-width">
                <button type="button" onClick={addSlot} className="add-btn-modern">
                    Add Slot
                </button>
                <p className="field-hint">
                    Select days and times, then click Add Slot
                </p>
            </div>

            <div className="tags-container-modern">
                {slots.map((slot, idx) => (
                    <span key={idx} className="tag-modern tag-green">
                        {slot.day}: {slot.startTime} - {slot.endTime}
                        <button onClick={() => removeSlot(idx)} className="tag-remove-modern">
                            <FaTimesCircle />
                        </button>
                    </span>
                ))}
            </div>

            <div className="documents-section">
                <h3>Documents (Optional)</h3>
                <div className="form-group-modern">
                    <label>
                        <FaFileUpload /> Qualification Certificate
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => setQualificationFile(e.target.files?.[0] || null)}
                        className="file-input-modern"
                    />
                </div>
                <div className="form-group-modern">
                    <label>
                        <FaFileUpload /> ID Proof
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
                        className="file-input-modern"
                    />
                </div>
            </div>
        </div>
    );
}
