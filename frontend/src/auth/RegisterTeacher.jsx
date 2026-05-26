import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher, FaUser, FaBook, FaMoneyBillWave,
  FaClock, FaCheckCircle, FaUpload, FaTimes
} from "react-icons/fa";
import api from "../api";

const TEACHING_FIELDS = [
  { id: "eng", name: "Engineering" },
  { id: "med", name: "Medical" },
  { id: "arts", name: "Arts & Humanities" },
  { id: "comm", name: "Commerce" },
  { id: "sci", name: "Science" },
  { id: "lang", name: "Languages" },
  { id: "coding", name: "Coding & IT" }
];

const PROGRAMS = [
  { id: "btech", name: "B.Tech", fieldId: "eng" },
  { id: "mtech", name: "M.Tech", fieldId: "eng" },
  { id: "mbbs", name: "MBBS", fieldId: "med" },
  { id: "ba", name: "BA", fieldId: "arts" },
  { id: "bcom", name: "B.Com", fieldId: "comm" },
  { id: "bsc", name: "B.Sc", fieldId: "sci" },
  { id: "others", name: "Others", fieldId: "all" }
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const STEPS = [
  { id: 1, label: "Personal Info", icon: FaUser },
  { id: 2, label: "Professional", icon: FaBook },
  { id: 3, label: "Pricing", icon: FaMoneyBillWave },
  { id: 4, label: "Availability", icon: FaClock }
];

export default function TeacherRegister() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", password: "",
    experienceYears: "", bio: "", fieldId: "", programId: "",
    teachingMode: "online", onlinePrice: "", offlinePrice: "", offlineLocation: "",
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [slots, setSlots] = useState([]);
  const [tempSlot, setTempSlot] = useState({ days: [], start: "", end: "" });
  const [qualificationFile, setQualificationFile] = useState("");
  const [idProofFile, setIdProofFile] = useState("");

  const CLOUDINARY_UPLOAD_PRESET = 'unsigned_receipts';
  const CLOUDINARY_CLOUD_NAME = 'dvxsgxp3f';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addSubject = () => {
    if (subjectInput.trim() && !selectedSubjects.includes(subjectInput.trim())) {
      setSelectedSubjects([...selectedSubjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };
  const removeSubject = (sub) => setSelectedSubjects(selectedSubjects.filter(s => s !== sub));

  const toggleSlotDay = (day) => {
    setTempSlot(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }));
  };

  const addSlot = () => {
    if (tempSlot.days.length === 0 || !tempSlot.start || !tempSlot.end)
      return alert("Please select Days, Start Time, and End Time");
    const newSlots = tempSlot.days.map(day => ({ day, startTime: tempSlot.start, endTime: tempSlot.end }));
    setSlots([...slots, ...newSlots]);
    setTempSlot({ days: [], start: "", end: "" });
  };
  const removeSlot = (idx) => setSlots(slots.filter((_, i) => i !== idx));

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST', body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        if (type === 'qual') setQualificationFile(data.secure_url);
        if (type === 'id') setIdProofFile(data.secure_url);
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const selectedField = TEACHING_FIELDS.find(f => f.id === form.fieldId) || { id: "other", name: "Other" };
      const selectedProgram = PROGRAMS.find(p => p.id === form.programId) || { id: "other", name: "Other" };
      const payload = {
        fullName: form.fullName, email: form.email, phone: form.phone, password: form.password,
        experienceYears: form.experienceYears, bio: form.bio,
        teachingField: { fieldId: selectedField.id, fieldName: selectedField.name },
        program: { programId: selectedProgram.id, programName: selectedProgram.name },
        selectedSubjects, teachingMode: form.teachingMode,
        onlinePrice: form.onlinePrice || null, offlinePrice: form.offlinePrice || null,
        offlineLocation: form.offlineLocation || null, slots, qualificationFile, idProofFile
      };
      await api.post("/api/auth/register-teacher", payload);
      alert("✅ Registration Successful! Please check your email for OTP.");
      navigate(`/verify-otp?email=${encodeURIComponent(form.email)}`, { state: { role: 'teacher' } });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-3 sm:px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none bg-gray-50 focus:bg-white transition-all duration-200 text-sm sm:text-base text-gray-800 placeholder-gray-400";

  const renderStep = () => (
    <div>
      {/* STEP 1 */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-indigo-600 text-base sm:text-lg" /> Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className={inputClass} />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className={inputClass} />
            <input name="experienceYears" type="number" value={form.experienceYears} onChange={handleChange} placeholder="Years of Experience" className={`${inputClass} sm:col-span-2 md:col-span-1`} />
          </div>
          <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself (Bio)" className={`${inputClass} h-24 resize-none`} />
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaBook className="text-indigo-600 text-base sm:text-lg" /> Professional Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <select name="fieldId" value={form.fieldId} onChange={handleChange} className={inputClass}>
              <option value="">Select Teaching Field</option>
              {TEACHING_FIELDS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            <select name="programId" value={form.programId} onChange={handleChange} className={inputClass}>
              <option value="">Select Program</option>
              {PROGRAMS.filter(p => !form.fieldId || p.fieldId === form.fieldId || p.fieldId === 'all').map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Subjects you teach</label>
            <div className="flex gap-2">
              <input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Type subject & press Enter"
                onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                className={`${inputClass} flex-1`}
              />
              <button
                onClick={addSubject}
                className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium whitespace-nowrap"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSubjects.map(sub => (
                <span key={sub} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                  {sub}
                  <FaTimes className="cursor-pointer text-xs hover:text-indigo-600" onClick={() => removeSubject(sub)} />
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaMoneyBillWave className="text-indigo-600 text-base sm:text-lg" /> Teaching Mode & Pricing
          </h3>
          <div className="flex flex-wrap gap-3 sm:gap-6 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
            {["online", "offline", "both"].map(mode => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio" name="teachingMode" value={mode}
                  checked={form.teachingMode === mode} onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 accent-indigo-600"
                />
                <span className="capitalize font-medium text-sm sm:text-base text-gray-700">{mode}</span>
              </label>
            ))}
          </div>
          {(form.teachingMode === 'online' || form.teachingMode === 'both') && (
            <input name="onlinePrice" type="number" value={form.onlinePrice} onChange={handleChange}
              placeholder="Online Hourly Rate (₹)" className={inputClass} />
          )}
          {(form.teachingMode === 'offline' || form.teachingMode === 'both') && (
            <div className="space-y-3">
              <input name="offlinePrice" type="number" value={form.offlinePrice} onChange={handleChange}
                placeholder="Offline Hourly Rate (₹)" className={inputClass} />
              <input name="offlineLocation" value={form.offlineLocation} onChange={handleChange}
                placeholder="Offline Location / City" className={inputClass} />
            </div>
          )}
        </div>
      )}

      {/* STEP 4 */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaClock className="text-indigo-600 text-base sm:text-lg" /> Availability & Documents
          </h3>
          <div className="bg-gray-50 border border-gray-100 p-3 sm:p-4 rounded-xl space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Add Availability Slot</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {DAYS_OF_WEEK.map(day => (
                <button key={day} onClick={() => toggleSlotDay(day)}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border transition-colors ${
                    tempSlot.days.includes(day)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                  }`}>
                  {/* Show short name on mobile */}
                  <span className="sm:hidden">{day.slice(0, 3)}</span>
                  <span className="hidden sm:inline">{day}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <input type="time" value={tempSlot.start}
                onChange={e => setTempSlot({ ...tempSlot, start: e.target.value })}
                className="flex-1 min-w-0 p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-400 outline-none" />
              <span className="text-gray-500 text-sm flex-shrink-0">to</span>
              <input type="time" value={tempSlot.end}
                onChange={e => setTempSlot({ ...tempSlot, end: e.target.value })}
                className="flex-1 min-w-0 p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-400 outline-none" />
              <button onClick={addSlot}
                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors flex-shrink-0 w-full sm:w-auto mt-1 sm:mt-0">
                Add +
              </button>
            </div>
            {slots.length > 0 && (
              <div className="mt-2 max-h-36 overflow-y-auto space-y-2">
                {slots.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white px-3 py-2 text-xs sm:text-sm border border-gray-100 rounded-lg">
                    <span className="text-gray-700">{s.day}: {s.startTime} – {s.endTime}</span>
                    <FaTimes className="text-red-400 cursor-pointer hover:text-red-600 ml-2 flex-shrink-0" onClick={() => removeSlot(idx)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { type: 'qual', id: 'qualUpload', label: 'Qualification Proof', uploaded: qualificationFile },
              { type: 'id', id: 'idUpload', label: 'ID Proof', uploaded: idProofFile }
            ].map(doc => (
              <div key={doc.type} className="border-2 border-dashed border-gray-200 p-4 sm:p-5 rounded-xl text-center bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 cursor-pointer">
                <FaUpload className="mx-auto text-gray-400 mb-2 text-lg" />
                <p className="text-sm font-semibold text-gray-700 mb-1">{doc.label}</p>
                <input type="file" onChange={(e) => handleFileUpload(e, doc.type)} className="hidden" id={doc.id} />
                <label htmlFor={doc.id} className="text-indigo-600 cursor-pointer text-sm hover:text-indigo-700 font-medium">
                  Browse File
                </label>
                {doc.uploaded && (
                  <p className="text-green-600 text-xs mt-1.5 flex items-center justify-center gap-1">
                    <FaCheckCircle className="text-xs" /> Uploaded
                  </p>
                )}
              </div>
            ))}
          </div>

          {uploading && (
            <p className="text-center text-indigo-600 text-sm animate-pulse font-medium">
              Uploading files...
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 font-sans">

      {/* Mobile top progress bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-indigo-900 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-1"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-white"></span>
              <span className="block w-5 h-0.5 bg-white"></span>
              <span className="block w-5 h-0.5 bg-white"></span>
            </div>
          </button>
          <span className="text-white font-bold text-sm">Join as Teacher</span>
        </div>
        <div className="flex items-center gap-2">
          {STEPS.map(s => (
            <div key={s.id} className={`w-2 h-2 rounded-full transition-all ${
              currentStep > s.id ? 'bg-green-400' :
              currentStep === s.id ? 'bg-white' :
              'bg-indigo-600'
            }`} />
          ))}
          <span className="text-indigo-200 text-xs ml-1">{currentStep}/4</span>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex" style={{background:"rgba(0,0,0,0.5)"}}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-72 max-w-[80vw] bg-indigo-900 p-6 pt-16 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h1 className="text-xl font-bold text-white mb-1">Join as Teacher</h1>
            <p className="text-indigo-200 text-sm mb-6">Share your knowledge with millions.</p>
            <div className="space-y-5">
              {STEPS.map(step => (
                <div key={step.id} className={`flex items-center gap-3 ${currentStep >= step.id ? 'text-white' : 'text-indigo-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold ${
                    currentStep > step.id ? 'bg-green-500 border-green-400' :
                    currentStep === step.id ? 'bg-indigo-500 border-indigo-400' :
                    'border-indigo-700 text-indigo-400'
                  }`}>
                    {currentStep > step.id ? <FaCheckCircle className="text-white" /> : step.id}
                  </div>
                  <span className="font-medium text-sm">{step.label}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 text-xs text-indigo-300">
              contact@careergenai.com
            </div>
          </div>
        </div>
      )}

      {/* Main card */}
      <div className="bg-white w-full max-w-xs sm:max-w-lg md:max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row mt-14 sm:mt-14 md:mt-0">

        {/* Sidebar — desktop only */}
        <div className="hidden md:flex bg-indigo-900 text-white p-8 md:w-1/3 flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Join as Teacher</h1>
            <p className="text-indigo-200 text-sm mb-8">Share your knowledge with millions.</p>
            <div className="space-y-6">
              {STEPS.map(step => (
                <div key={step.id} className={`flex items-center gap-3 ${currentStep >= step.id ? 'text-white' : 'text-indigo-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all ${
                    currentStep > step.id ? 'bg-green-500 border-green-400' :
                    currentStep === step.id ? 'bg-indigo-500 border-indigo-400' :
                    'border-indigo-700'
                  }`}>
                    {currentStep > step.id ? <FaCheckCircle /> : step.id}
                  </div>
                  <span className="font-medium">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-indigo-300 mt-8">
            Need help? contact@careergenai.com
          </div>
        </div>

        {/* Form panel */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-0">
          {/* Mobile step label */}
          <div className="md:hidden mb-4">
            <div className="flex items-center gap-2 text-indigo-600">
              {React.createElement(STEPS[currentStep - 1].icon, { className: "text-sm" })}
              <span className="text-sm font-semibold text-gray-700">
                Step {currentStep} — {STEPS[currentStep - 1].label}
              </span>
            </div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {renderStep()}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100 gap-3">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-4 sm:px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              Back
            </button>

            <div className="hidden md:flex items-center gap-1">
              {STEPS.map(s => (
                <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep > s.id ? 'w-6 bg-green-400' :
                  currentStep === s.id ? 'w-8 bg-indigo-600' :
                  'w-4 bg-gray-200'
                }`} />
              ))}
            </div>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                className="px-4 sm:px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition-all active:scale-95 text-sm sm:text-base"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className="px-5 sm:px-8 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-md transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? "Registering..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
