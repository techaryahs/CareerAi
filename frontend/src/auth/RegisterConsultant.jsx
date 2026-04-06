import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FULL_DAYS = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" };

const STEPS = ["Account", "Profile", "Availability"];

const RegisterConsultant = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', role: '', expertise: '', experience: '',
    bio: '', email: '', password: '', image: '', availability: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleDay = (day) =>
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);

  const addSlot = () => {
    if (!selectedDays.length || !startTime || !endTime) return alert("Select days and times");
    const newSlots = selectedDays.map(day => ({ day: FULL_DAYS[day], startTime, endTime }));
    setForm(prev => ({ ...prev, availability: [...prev.availability, ...newSlots] }));
    setSelectedDays([]); setStartTime(""); setEndTime("");
  };

  const removeSlot = (idx) =>
    setForm(prev => ({ ...prev, availability: prev.availability.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.availability.length) return alert("Add at least one availability slot");
    setLoading(true);
    try {
      const formData = new FormData();
      ['name', 'email', 'password', 'role', 'expertise', 'experience', 'bio'].forEach(k => formData.append(k, form[k]));
      formData.append('availability', JSON.stringify(form.availability));
      if (imageFile) formData.append('image', imageFile);
      await api.post('/api/auth/register-consultant', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Registration successful! Check your email for OTP.');
      navigate(`/verify-otp?email=${encodeURIComponent(form.email)}`, { state: { role: 'consultant' } });
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rc-backdrop {
          position: fixed; inset: 0;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          overflow-y: auto;
          padding: 20px;
        }

        .rc-card {
          position: relative;
          width: 100%; max-width: 680px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          animation: cardIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .rc-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #a78bfa, #ec4899);
        }

        .rc-header {
          padding: 28px 36px 0;
          display: flex; align-items: flex-start; justify-content: space-between;
        }

        .rc-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px; font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }

        .rc-title span {
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .rc-close {
          width: 36px; height: 36px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          color: #94a3b8; font-size: 20px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
          flex-shrink: 0;
        }
        .rc-close:hover { background: #e2e8f0; color: #475569; }

        .rc-steps {
          display: flex; align-items: center;
          padding: 20px 36px 24px;
          gap: 0;
        }

        .rc-step-item {
          display: flex; align-items: center; gap: 8px;
          flex: 1;
        }
        .rc-step-item:last-child { flex: 0; }

        .rc-step-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          transition: all 0.3s; flex-shrink: 0;
        }
        .rc-step-dot.done   { background: #6366f1; color: #fff; }
        .rc-step-dot.active { background: #6366f1; color: #fff; box-shadow: 0 0 0 4px rgba(99,102,241,0.15); }
        .rc-step-dot.todo   { background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0; }

        .rc-step-label {
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #94a3b8;
        }
        .rc-step-label.active { color: #6366f1; }

        .rc-step-line {
          flex: 1; height: 1px; background: #e2e8f0; margin: 0 8px;
        }
        .rc-step-line.done { background: #6366f1; }

        .rc-body { padding: 0 36px 36px; }

        .rc-label {
          font-size: 13px; font-weight: 600;
          color: #1e293b; margin-bottom: 8px; margin-top: 18px;
        }

        .rc-input, .rc-textarea {
          width: 100%;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          color: #1e293b; font-family: 'DM Sans', sans-serif; font-size: 14px;
          padding: 12px 16px;
          margin-bottom: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .rc-input::placeholder, .rc-textarea::placeholder { color: #94a3b8; }
        .rc-input:focus, .rc-textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .rc-textarea { resize: vertical; min-height: 90px; }

        .rc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }

        .rc-image-row { display: flex; align-items: center; gap: 16px; margin-bottom: 10px; }

        .rc-avatar {
          width: 60px; height: 60px; border-radius: 50%;
          object-fit: cover; border: 2px solid #6366f1; flex-shrink: 0;
        }

        .rc-avatar-placeholder {
          width: 60px; height: 60px; border-radius: 50%;
          background: #eef2ff; border: 2px dashed #a5b4fc;
          display: flex; align-items: center; justify-content: center;
          color: #6366f1; font-size: 22px; flex-shrink: 0;
        }

        .rc-file-label {
          flex: 1; background: #f8fafc;
          border: 1.5px dashed #cbd5e1; border-radius: 10px;
          padding: 12px 16px; color: #94a3b8; font-size: 13px;
          cursor: pointer; transition: all 0.2s; text-align: center;
        }
        .rc-file-label:hover { border-color: #6366f1; color: #6366f1; background: #eef2ff; }
        .rc-file-input { display: none; }

        .rc-days { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }

        .rc-day-pill {
          padding: 6px 14px; border-radius: 20px;
          font-size: 12px; font-weight: 600; font-family: 'Syne', sans-serif;
          cursor: pointer; transition: all 0.2s;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc; color: #64748b;
        }
        .rc-day-pill.selected {
          background: #6366f1; border-color: #6366f1; color: #fff;
          box-shadow: 0 2px 8px rgba(99,102,241,0.3);
        }

        .rc-time-row { display: flex; align-items: center; gap: 10px; }
        .rc-time-row input[type="time"] {
          flex: 1; background: #fff;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          color: #1e293b; font-family: 'DM Sans', sans-serif; font-size: 13px;
          padding: 10px 12px; outline: none; transition: border-color 0.2s;
        }
        .rc-time-row input[type="time"]:focus { border-color: #6366f1; }
        .rc-time-sep { color: #94a3b8; font-size: 12px; }

        .rc-add-btn {
          background: #f0fdf4; border: 1.5px solid #86efac; color: #16a34a;
          padding: 10px 18px; border-radius: 10px;
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          cursor: pointer; white-space: nowrap; transition: all 0.2s;
        }
        .rc-add-btn:hover { background: #dcfce7; }

        .rc-slots { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; max-height: 140px; overflow-y: auto; }

        .rc-slot {
          display: flex; justify-content: space-between; align-items: center;
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 10px; padding: 9px 14px;
        }
        .rc-slot-text { font-size: 13px; color: #475569; }
        .rc-slot-remove {
          background: none; border: none; color: #ef4444;
          cursor: pointer; font-size: 16px; line-height: 1;
          opacity: 0.7; transition: opacity 0.2s;
        }
        .rc-slot-remove:hover { opacity: 1; }

        .rc-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; gap: 12px; }

        .rc-btn-back {
          background: #f8fafc; border: 1.5px solid #e2e8f0; color: #64748b;
          padding: 13px 24px; border-radius: 12px;
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.2s; letter-spacing: 0.04em;
        }
        .rc-btn-back:hover { background: #f1f5f9; color: #475569; }

        .rc-btn-next {
          flex: 1; background: #6366f1;
          border: none; color: #fff;
          padding: 13px 24px; border-radius: 12px;
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.04em;
          transition: all 0.25s;
          box-shadow: 0 4px 16px rgba(99,102,241,0.3);
        }
        .rc-btn-next:hover { background: #4f46e5; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.4); }
        .rc-btn-next:active { transform: translateY(0); }
        .rc-btn-next:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        @media (max-width: 520px) {
          .rc-header, .rc-steps, .rc-body { padding-left: 20px; padding-right: 20px; }
          .rc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rc-backdrop">
        <div className="rc-card">
          <div className="rc-accent-bar" />

          <div className="rc-header">
            <div className="rc-title">Register as a <span>Consultant</span></div>
            <button className="rc-close" onClick={() => navigate('/')}>×</button>
          </div>

          <div className="rc-steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="rc-step-item">
                  <div className={`rc-step-dot ${i < step ? 'done' : i === step ? 'active' : 'todo'}`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`rc-step-label ${i === step ? 'active' : ''}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`rc-step-line ${i < step ? 'done' : ''}`} />}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="rc-body">

              {step === 0 && (
                <>
                  <div className="rc-label">Account Details</div>
                  <input className="rc-input" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
                  <input className="rc-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required />
                  <input className="rc-input" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
                  <input className="rc-input" name="role" value={form.role} onChange={handleChange} placeholder="Your Role (e.g. Career Coach)" required />
                </>
              )}

              {step === 1 && (
                <>
                  <div className="rc-label">Professional Details</div>
                  <div className="rc-grid">
                    <input className="rc-input" name="expertise" value={form.expertise} onChange={handleChange} placeholder="Area of Expertise" required />
                    <input className="rc-input" name="experience" value={form.experience} onChange={handleChange} placeholder="Years of Experience" required />
                  </div>
                  <textarea className="rc-textarea" name="bio" value={form.bio} onChange={handleChange} placeholder="Write a short bio about yourself…" required />

                  <div className="rc-label">Profile Photo</div>
                  <div className="rc-image-row">
                    {imagePreview
                      ? <img src={imagePreview} alt="Preview" className="rc-avatar" />
                      : <div className="rc-avatar-placeholder">👤</div>
                    }
                    <label className="rc-file-label">
                      <input type="file" accept="image/*" className="rc-file-input" onChange={handleImage} />
                      {imageFile ? imageFile.name : 'Click to upload a photo'}
                    </label>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="rc-label">Select Days</div>
                  <div className="rc-days">
                    {DAYS_OF_WEEK.map(day => (
                      <button key={day} type="button"
                        className={`rc-day-pill ${selectedDays.includes(day) ? 'selected' : ''}`}
                        onClick={() => toggleDay(day)}>
                        {day}
                      </button>
                    ))}
                  </div>

                  <div className="rc-label">Time Range</div>
                  <div className="rc-time-row">
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                    <span className="rc-time-sep">→</span>
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                    <button type="button" className="rc-add-btn" onClick={addSlot}>+ Add</button>
                  </div>

                  {form.availability.length > 0 && (
                    <>
                      <div className="rc-label" style={{ marginTop: 16 }}>Added Slots</div>
                      <div className="rc-slots">
                        {form.availability.map((slot, idx) => (
                          <div key={idx} className="rc-slot">
                            <span className="rc-slot-text">📅 {slot.day} · {slot.startTime} – {slot.endTime}</span>
                            <button type="button" className="rc-slot-remove" onClick={() => removeSlot(idx)}>✕</button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="rc-nav">
                {step > 0
                  ? <button type="button" className="rc-btn-back" onClick={() => setStep(s => s - 1)}>← Back</button>
                  : <div />
                }
                {step < 2
                  ? <button type="button" className="rc-btn-next" onClick={() => setStep(s => s + 1)}>Continue →</button>
                  : <button type="submit" className="rc-btn-next" disabled={loading}>
                      {loading ? 'Registering…' : 'Register →'}
                    </button>
                }
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterConsultant;