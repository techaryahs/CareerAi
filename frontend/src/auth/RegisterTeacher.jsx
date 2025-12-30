import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaUser, FaBook, FaMoneyBillWave, FaClock, FaCheckCircle, FaUpload, FaTimes } from "react-icons/fa";
import api from "../api";

// =========================
// 🟢 CONSTANTS & DATA
// =========================
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

// =========================
// 🔵 MAIN COMPONENT
// =========================
export default function TeacherRegister() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    experienceYears: "",
    bio: "",
    fieldId: "",
    programId: "",
    teachingMode: "online",
    onlinePrice: "",
    offlinePrice: "",
    offlineLocation: "",
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");
  
  const [slots, setSlots] = useState([]);
  const [tempSlot, setTempSlot] = useState({ days: [], start: "", end: "" });

  const [qualificationFile, setQualificationFile] = useState("");
  const [idProofFile, setIdProofFile] = useState("");

  // CLOUDINARY CONFIG
  const CLOUDINARY_UPLOAD_PRESET = 'unsigned_receipts'; // Ensure this exists or use env
  const CLOUDINARY_CLOUD_NAME = 'dvxsgxp3f';

  // HELPER: Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HELPER: Subjects
  const addSubject = () => {
    if (subjectInput.trim() && !selectedSubjects.includes(subjectInput.trim())) {
      setSelectedSubjects([...selectedSubjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };
  const removeSubject = (sub) => {
    setSelectedSubjects(selectedSubjects.filter(s => s !== sub));
  };

  // HELPER: Slots
  const toggleSlotDay = (day) => {
    setTempSlot(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }));
  };
  const addSlot = () => {
    if (tempSlot.days.length === 0 || !tempSlot.start || !tempSlot.end) {
      return alert("Please select Days, Start Time, and End Time");
    }
    const newSlots = tempSlot.days.map(day => ({
      day,
      startTime: tempSlot.start,
      endTime: tempSlot.end
    }));
    setSlots([...slots, ...newSlots]);
    setTempSlot({ days: [], start: "", end: "" });
  };
  const removeSlot = (idx) => {
    setSlots(slots.filter((_, i) => i !== idx));
  };

  // HELPER: Upload
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        if (type === 'qual') setQualificationFile(data.secure_url);
        if (type === 'id') setIdProofFile(data.secure_url);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // SUBMIT
  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const selectedField = TEACHING_FIELDS.find(f => f.id === form.fieldId) || { id: "other", name: "Other" };
      const selectedProgram = PROGRAMS.find(p => p.id === form.programId) || { id: "other", name: "Other" };

      const payload = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        experienceYears: form.experienceYears,
        bio: form.bio,
        teachingField: { fieldId: selectedField.id, fieldName: selectedField.name },
        program: { programId: selectedProgram.id, programName: selectedProgram.name },
        selectedSubjects: selectedSubjects,
        teachingMode: form.teachingMode,
        onlinePrice: form.onlinePrice || null,
        offlinePrice: form.offlinePrice || null,
        offlineLocation: form.offlineLocation || null,
        slots: slots,
        qualificationFile,
        idProofFile
      };

      await api.post("/auth/register-teacher", payload);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP WIZARD RENDERING
  const renderStep = () => {
    return (
      <div className="animate-fade-in">
        {/* === STEP 1: PERSONAL INFO === */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaUser className="text-indigo-600" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="experienceYears" type="number" value={form.experienceYears} onChange={handleChange} placeholder="Years of Experience" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself (Bio)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24" />
          </div>
        )}

        {/* === STEP 2: PROFESSIONAL === */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaBook className="text-indigo-600" /> Professional Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <select name="fieldId" value={form.fieldId} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white">
                 <option value="">Select Teaching Field</option>
                 {TEACHING_FIELDS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
               </select>

               <select name="programId" value={form.programId} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white">
                 <option value="">Select Program</option>
                 {PROGRAMS.filter(p => !form.fieldId || p.fieldId === form.fieldId || p.fieldId === 'all').map(p => (
                   <option key={p.id} value={p.id}>{p.name}</option>
                 ))}
               </select>
            </div>

            <div className="space-y-2">
               <label className="font-semibold text-gray-700">Subjects you teach</label>
               <div className="flex gap-2">
                 <input 
                   value={subjectInput} 
                   onChange={(e) => setSubjectInput(e.target.value)} 
                   placeholder="Type subject & press Enter" 
                   onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                   className="flex-1 p-3 border rounded-lg"
                 />
                 <button onClick={addSubject} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add</button>
               </div>
               <div className="flex flex-wrap gap-2">
                 {selectedSubjects.map(sub => (
                   <span key={sub} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                     {sub} <FaTimes className="cursor-pointer" onClick={() => removeSubject(sub)} />
                   </span>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* === STEP 3: PRICING === */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaMoneyBillWave className="text-indigo-600" /> Teaching Mode & Pricing
            </h3>
            
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
               {["online", "offline", "both"].map(mode => (
                 <label key={mode} className="flex items-center gap-2 cursor-pointer">
                   <input 
                     type="radio" 
                     name="teachingMode" 
                     value={mode} 
                     checked={form.teachingMode === mode} 
                     onChange={handleChange}
                     className="w-5 h-5 text-indigo-600"
                   />
                   <span className="capitalize font-medium">{mode}</span>
                 </label>
               ))}
            </div>

            {(form.teachingMode === 'online' || form.teachingMode === 'both') && (
               <input name="onlinePrice" type="number" value={form.onlinePrice} onChange={handleChange} placeholder="Online Hourly Rate (₹)" className="w-full p-3 border rounded-lg" />
            )}

            {(form.teachingMode === 'offline' || form.teachingMode === 'both') && (
              <div className="space-y-3">
                 <input name="offlinePrice" type="number" value={form.offlinePrice} onChange={handleChange} placeholder="Offline Hourly Rate (₹)" className="w-full p-3 border rounded-lg" />
                 <input name="offlineLocation" value={form.offlineLocation} onChange={handleChange} placeholder="Offline Location / City" className="w-full p-3 border rounded-lg" />
              </div>
            )}
          </div>
        )}

        {/* === STEP 4: SLOTS & DOCS === */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaClock className="text-indigo-600" /> Availability & Documents
            </h3>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
               <label className="font-semibold text-gray-700">Add Availability Slot</label>
               <div className="flex flex-wrap gap-2">
                 {DAYS_OF_WEEK.map(day => (
                   <button 
                     key={day} 
                     onClick={() => toggleSlotDay(day)}
                     className={`px-3 py-1 rounded-full text-sm border ${tempSlot.days.includes(day) ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                   >
                     {day}
                   </button>
                 ))}
               </div>
               <div className="flex items-center gap-2">
                 <input type="time" value={tempSlot.start} onChange={e => setTempSlot({...tempSlot, start: e.target.value})} className="p-2 border rounded" />
                 <span>to</span>
                 <input type="time" value={tempSlot.end} onChange={e => setTempSlot({...tempSlot, end: e.target.value})} className="p-2 border rounded" />
                 <button onClick={addSlot} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add +</button>
               </div>
               
               {slots.length > 0 && (
                 <div className="mt-3 max-h-40 overflow-y-auto space-y-2">
                    {slots.map((s, idx) => (
                      <div key={idx} className="flex justify-between bg-white p-2 text-sm border rounded">
                        <span>{s.day}: {s.startTime} - {s.endTime}</span>
                        <FaTimes className="text-red-500 cursor-pointer" onClick={() => removeSlot(idx)} />
                      </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center bg-gray-50 hover:bg-indigo-50 transition">
                  <FaUpload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium">Qualification Proof</p>
                  <input type="file" onChange={(e) => handleFileUpload(e, 'qual')} className="hidden" id="qualUpload" />
                  <label htmlFor="qualUpload" className="text-indigo-600 cursor-pointer text-sm">Browse File</label>
                  {qualificationFile && <p className="text-green-600 text-xs mt-1">Uploaded</p>}
               </div>
               <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center bg-gray-50 hover:bg-indigo-50 transition">
                  <FaUpload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium">ID Proof</p>
                  <input type="file" onChange={(e) => handleFileUpload(e, 'id')} className="hidden" id="idUpload" />
                  <label htmlFor="idUpload" className="text-indigo-600 cursor-pointer text-sm">Browse File</label>
                  {idProofFile && <p className="text-green-600 text-xs mt-1">Uploaded</p>}
               </div>
            </div>
            {uploading && <p className="text-center text-indigo-600 text-sm animate-pulse">Uploading files...</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6 font-sans">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* SIDEBAR (Progress) */}
        <div className="bg-indigo-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
           <div>
             <h1 className="text-2xl font-bold mb-2">Join as Teacher</h1>
             <p className="text-indigo-200 text-sm mb-8">Share your knowledge with millions.</p>
             
             <div className="space-y-6">
               {[
                 { id: 1, label: "Personal Info", icon: FaUser },
                 { id: 2, label: "Professional", icon: FaBook },
                 { id: 3, label: "Pricing", icon: FaMoneyBillWave },
                 { id: 4, label: "Availability", icon: FaClock }
               ].map((step) => (
                 <div key={step.id} className={`flex items-center gap-3 ${currentStep >= step.id ? 'text-white' : 'text-indigo-400'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= step.id ? 'bg-indigo-500 border-indigo-400' : 'border-indigo-700'}`}>
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

        {/* MAIN FORM */}
        <div className="p-8 md:w-2/3 w-full flex flex-col justify-between">
           <div>
             {renderStep()}
             {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
           </div>

           <div className="mt-8 flex justify-between pt-4 border-t">
              <button 
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 disabled:opacity-50"
              >
                Back
              </button>
              
              {currentStep < 4 ? (
                <button 
                  onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg transform transition active:scale-95"
                >
                  Next Step
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={loading || uploading}
                  className="px-8 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg transform transition active:scale-95 disabled:opacity-70"
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
