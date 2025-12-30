import React from "react";
import { FaBook, FaTimesCircle } from "react-icons/fa";

export default function TeacherRegisterStep2({
    form,
    updateField,
    activeFields,
    filteredPrograms,
    selectedSubjects,
    subjectQuery,
    setSubjectQuery,
    subjectSuggestions,
    addSubjectBySuggestion,
    addSubjectFreeText,
    removeSubject,
}) {
    return (
        <div className="step-content-modern">
            <div className="step-icon-header">
                <FaBook className="step-main-icon" />
                <h2>What Do You Teach?</h2>
                <p>Share your teaching expertise</p>
            </div>

            <div className="form-grid-modern">
                <div className="form-group-modern">
                    <label>Teaching Field *</label>
                    <select
                        value={form.fieldId}
                        onChange={(e) => updateField("fieldId", e.target.value)}
                    >
                        <option value="">Select Teaching Field</option>
                        {activeFields.map((f) => (
                            <option key={f.id} value={f.id}>
                                {f.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-modern">
                    <label>Program/Degree *</label>
                    <select
                        value={form.programId}
                        onChange={(e) => updateField("programId", e.target.value)}
                        disabled={!form.fieldId}
                    >
                        <option value="">
                            {form.fieldId ? "Select Program/Degree" : "First select a field"}
                        </option>
                        {filteredPrograms.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group-modern full-width subject-group">
                <label>Subjects You Can Teach *</label>
                <div className="subject-input-wrapper">
                    <input
                        type="text"
                        value={subjectQuery}
                        onChange={(e) => setSubjectQuery(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addSubjectFreeText())
                        }
                        placeholder="Type to search subjects (e.g. Data Structures)..."
                    />
                    <button
                        type="button"
                        onClick={addSubjectFreeText}
                        className="add-btn-modern"
                    >
                        Add
                    </button>
                </div>

                {subjectQuery && subjectSuggestions.length > 0 && (
                    <div className="suggestions-list-modern">
                        {subjectSuggestions.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => addSubjectBySuggestion(s)}
                                className="suggestion-item-modern"
                            >
                                <span className="suggestion-name">{s.name}</span>
                                {s.branchId && (
                                    <span className="suggestion-branch">
                                        {s.branchId.toUpperCase()}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                <div className="tags-container-modern">
                    {selectedSubjects.map((s) => (
                        <span key={s.id} className="tag-modern">
                            {s.name}
                            <button
                                onClick={() => removeSubject(s.id)}
                                className="tag-remove-modern"
                            >
                                <FaTimesCircle />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="form-group-modern full-width">
                <label>Teaching Mode *</label>
                <div className="mode-options-modern">
                    {["online", "offline", "both"].map((m) => (
                        <label key={m} className="mode-option-modern">
                            <input
                                type="radio"
                                name="teachingMode"
                                value={m}
                                checked={form.teachingMode === m}
                                onChange={(e) => updateField("teachingMode", e.target.value)}
                            />
                            <span>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
