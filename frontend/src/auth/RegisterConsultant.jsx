import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import "./AdminDashboard.css"


const CLOUDINARY_UPLOAD_PRESET = 'unsigned_receipts';
const CLOUDINARY_CLOUD_NAME = 'dvxsgxp3f';

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const RegisterConsultant = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    name: '',
    role: '',
    expertise: '',
    experience: '',
    bio: '',
    email: '',
    password: '',
    image: '',
    availability: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Slot states
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const addSlot = () => {
    if (selectedDays.length === 0 || !startTime || !endTime) {
      return alert("Please select days, start time, and end time");
    }
    const newSlots = selectedDays.map(day => ({
      day, startTime, endTime
    }));

    setForm(prev => ({
      ...prev,
      availability: [...prev.availability, ...newSlots]
    }));
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
  };

  const removeSlot = (idx) => {
    setForm(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.availability.length === 0) return alert("Please add at least one availability slot");

    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('role', form.role);
      formData.append('expertise', form.expertise);
      formData.append('experience', form.experience);
      formData.append('bio', form.bio);

      // Append availability as JSON string
      formData.append('availability', JSON.stringify(form.availability));

      // Append image if selected
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const apiUrl = `${api.defaults.baseURL}/auth/register-consultant`;
      console.log("🚀 Submitting Consultant Registration to:", apiUrl);

      const res = await api.post('/api/auth/register-consultant', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('✅ Registration successful! Please check your email for OTP.');
      navigate(`/verify-otp?email=${encodeURIComponent(form.email)}`, { state: { role: 'consultant' } });
    } catch (err) {
      console.error("❌ Registration Error:", err);
      const errorMessage = err.response?.data?.error || err.message || 'Something went wrong';
      alert(`❌ Error: ${errorMessage}`);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="register-modal" style={{ maxWidth: '700px' }}>
        <header className="modal-header">
          <h2>Register as Consultant</h2>
          <span className="clos-btn" onClick={() => navigate('/')}>×</span>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <p className="form-section-label">Basic Info</p>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
              <input name="role" value={form.role} onChange={handleChange} placeholder="Role (e.g. Career Coach)" required />
            </div>
            <div>
              <p className="form-section-label">Professional Details</p>
              <input name="expertise" value={form.expertise} onChange={handleChange} placeholder="Expertise" required />
              <input name="experience" value={form.experience} onChange={handleChange} placeholder="Years of Experience" required />
              <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short Bio" required style={{ minHeight: '80px' }} />
            </div>
          </div>

          <p className="form-section-label">Profile Image</p>
          <div className="upload-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ flex: 1 }}
            />
            {imageFile && (
              <div className="image-preview-container" style={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3b82f6' }}
                />
              </div>
            )}
          </div>

          <p className="form-section-label">Availability Slots</p>
          <div className="slots-manager" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {DAYS_OF_WEEK.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  style={{
                    padding: '5px 10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '20px',
                    background: selectedDays.includes(day) ? '#3b82f6' : 'white',
                    color: selectedDays.includes(day) ? 'white' : 'black',
                    cursor: 'pointer'
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
              <span>to</span>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
              <button type="button" onClick={addSlot} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}>+ Add</button>
            </div>

            <div className="slots-list" style={{ marginTop: '10px', maxHeight: '100px', overflowY: 'auto' }}>
              {form.availability.map((slot, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', background: 'white', marginBottom: '5px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  <span>📅 {slot.day}: {slot.startTime} - {slot.endTime}</span>
                  <span onClick={() => removeSlot(idx)} style={{ cursor: 'pointer', color: 'red' }}>❌</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>Register Consultant</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterConsultant;
