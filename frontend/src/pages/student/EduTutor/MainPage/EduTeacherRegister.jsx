import React, { useMemo, useState } from "react";
import { EDU_CAREERS } from "../data/EduCareers";
import { EDU_BRANCHES } from "../data/EduBranches";
import { EDU_SUBJECTS } from "../data/EduSubjects";

export default function EduTeacherRegister() {
  // =========================
  // FORM STATE
  // =========================
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experienceYears: "",
    bio: "",
    careerId: "",
    programId: "",
    teachingMode: "online", 
    onlinePrice: "",       // For Online Mode
    offlinePrice: "",      // For Offline Mode
    offlineLocation: "",   // For Offline Mode
  });

  const [slotInput, setSlotInput] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectQuery, setSubjectQuery] = useState("");
  const [qualificationFile, setQualificationFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

  // =========================
  // Derived Lists
  // =========================
  const activeCareers = useMemo(
    () => (EDU_CAREERS || []).filter((c) => c.enabled !== false),
    []
  );
  const programs = useMemo(() => EDU_BRANCHES || [], []);

  const subjectSuggestions = useMemo(() => {
    const q = subjectQuery.trim().toLowerCase();
    const pool = EDU_SUBJECTS || [];
    if (!q) return pool.slice(0, 50);
    return pool
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.tags || []).some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 50);
  }, [subjectQuery]);

  // =========================
  // Helpers
  // =========================
  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSlot = () => {
    const v = slotInput.trim();
    if (!v) return;
    if (!slots.includes(v)) {
      setSlots((prev) => [...prev, v]);
    }
    setSlotInput("");
  };

  const removeSlot = (v) => {
    setSlots((prev) => prev.filter((x) => x !== v));
  };

  const addSubjectBySuggestion = (subj) => {
    if (!subj?.id) return;
    if (selectedSubjects.some((s) => s.id === subj.id)) return;
    setSelectedSubjects((prev) => [...prev, { id: subj.id, name: subj.name }]);
    setSubjectQuery("");
  };

  const addSubjectFreeText = () => {
    const name = subjectQuery.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, "_");
    if (selectedSubjects.some((s) => s.id === id)) return;
    setSelectedSubjects((prev) => [...prev, { id, name }]);
    setSubjectQuery("");
  };

  const removeSubject = (id) => {
    setSelectedSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  // Validation Logic based on Mode
  const isPricingValid = () => {
    const { teachingMode, onlinePrice, offlinePrice, offlineLocation } = form;
    if (teachingMode === "online") return !!onlinePrice;
    if (teachingMode === "offline") return !!offlinePrice && !!offlineLocation;
    if (teachingMode === "both") return !!onlinePrice && !!offlinePrice && !!offlineLocation;
    return false;
  };

  const isDisabled =
    !form.fullName ||
    !form.email ||
    !form.phone ||
    !form.experienceYears ||
    !form.careerId ||
    !form.programId ||
    !isPricingValid() ||
    selectedSubjects.length === 0 ||
    slots.length === 0;

  // =========================
  // UI
  // =========================
  return (
    <div className="animate-fade-in-up px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1️⃣ Header Section (Clean Layout without Back Button) */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800">
              Teacher Registration
            </h1>
            <p className="text-sm text-blue-700 mt-1">
              Register to teach students and get discovered on EduTutor
            </p>
          </div>
          
          {/* Step Indicator */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-blue-800 mt-2 md:mt-0">
            <span className="px-2 py-1 bg-white border border-blue-200 rounded-full">Profile</span>
            <span>→</span>
            <span className="px-2 py-1 bg-white border border-blue-200 rounded-full">Subjects</span>
            <span>→</span>
            <span className="px-2 py-1 bg-white border border-blue-200 rounded-full">Pricing</span>
            <span>→</span>
            <span className="px-2 py-1 bg-white border border-blue-200 rounded-full">Availability</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2️⃣ Basic Information */}
          <section className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Years of Experience *</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 5"
                  value={form.experienceYears}
                  onChange={(e) => updateField("experienceYears", e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Short Bio / About Teacher *</label>
              <textarea
                placeholder="Tell students about your teaching style..."
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={4}
                className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* 3️⃣ Teaching Details */}
          <section className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Teaching Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Career *</label>
                <select
                  value={form.careerId}
                  onChange={(e) => updateField("careerId", e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select Career</option>
                  {activeCareers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Program / Branch *</label>
                <select
                  value={form.programId}
                  onChange={(e) => updateField("programId", e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select Program / Branch</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subjects */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Subjects *</label>
              <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={subjectQuery}
                    onChange={(e) => setSubjectQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubjectFreeText())}
                    placeholder="Search or type subject..."
                    className="w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Dropdown */}
                  {subjectQuery && (
                    <div className="absolute z-10 mt-1 w-full max-h-64 overflow-auto bg-white border rounded-lg shadow-lg">
                      {subjectSuggestions.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => addSubjectBySuggestion(s)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50"
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={addSubjectFreeText}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  Add Subject
                </button>
              </div>
              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSubjects.map((s) => (
                  <span key={s.id} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {s.name}
                    <button onClick={() => removeSubject(s.id)} className="ml-2 text-blue-600 hover:text-blue-800">✕</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Teaching Mode *</label>
              <div className="mt-2 flex flex-wrap gap-4">
                {["online", "offline", "both"].map((m) => (
                  <label key={m} className="inline-flex items-center gap-2 cursor-pointer p-2 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="teachingMode"
                      value={m}
                      checked={form.teachingMode === m}
                      onChange={(e) => updateField("teachingMode", e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm capitalize font-medium">{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* 4️⃣ Pricing & Location (Conditional) */}
          <section className="bg-white border rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing & Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Online Price */}
              {(form.teachingMode === "online" || form.teachingMode === "both") && (
                <div className="flex flex-col animate-fade-in-up">
                  <label className="text-sm font-medium text-gray-700">Online Price per Hour (₹) *</label>
                  <div className="mt-1 relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 500"
                      value={form.onlinePrice}
                      onChange={(e) => updateField("onlinePrice", e.target.value)}
                      className="w-full pl-7 px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Offline Price */}
              {(form.teachingMode === "offline" || form.teachingMode === "both") && (
                <div className="flex flex-col animate-fade-in-up">
                  <label className="text-sm font-medium text-gray-700">Offline Price per Hour (₹) *</label>
                  <div className="mt-1 relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 800"
                      value={form.offlinePrice}
                      onChange={(e) => updateField("offlinePrice", e.target.value)}
                      className="w-full pl-7 px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Offline Location */}
            {(form.teachingMode === "offline" || form.teachingMode === "both") && (
              <div className="mt-4 animate-fade-in-up">
                <label className="text-sm font-medium text-gray-700">Service Areas / City *</label>
                <input
                  type="text"
                  placeholder="e.g. Andheri West, Bandra, Mumbai"
                  value={form.offlineLocation}
                  onChange={(e) => updateField("offlineLocation", e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Mention the areas you can travel to.</p>
              </div>
            )}
          </section>

          {/* 5️⃣ Availability */}
          <section className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Availability</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="e.g. Mon 6–8 PM"
                value={slotInput}
                onChange={(e) => setSlotInput(e.target.value)}
                className="flex-1 px-3 py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSlot}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                Add Slot
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {slots.map((s) => (
                <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  {s}
                  <button onClick={() => removeSlot(s)} className="ml-2 text-green-700 hover:text-green-900">✕</button>
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Documents + Submit */}
        <div className="space-y-6">
          <section className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Documents</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Qualification Certificate</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setQualificationFile(e.target.files?.[0] || null)}
                  className="mt-1 w-full text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">ID Proof</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
                  className="mt-1 w-full text-sm"
                />
              </div>
            </div>
          </section>

          <section className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Submit</h2>
            <button
              type="button"
              disabled={isDisabled}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                isDisabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Submit for Verification
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Your profile will be reviewed before going live.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}