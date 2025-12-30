import React, { useState } from "react";
import axios from "axios";
import { FaUserShield, FaEnvelope, FaLock, FaKey, FaArrowLeft, FaCheck } from 'react-icons/fa';

const ParentRegisterModal = ({ studentId, onClose }) => {
  const API = import.meta.env.VITE_API_URL;

  const [step, setStep] = useState('register'); // 'register' or 'verify'
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    password: ""
  });
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/register-parent`, {
        ...form,
        studentId
      });
      setStep('verify');
    } catch (err) {
      alert(err.response?.data?.error || "❌ Failed to register parent");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/verify-otp`, {
        email: form.email,
        otp
      });
      alert("✅ Parent account verified and linked successfully!");
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "❌ Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform animate-in slide-in-from-bottom-4 duration-500"
        style={{ border: '1px solid rgba(0,0,0,0.05)' }}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-8 text-white text-center relative">
          <div className="absolute top-4 right-4 text-white/20 text-4xl">👨‍👩‍👧</div>
          {step === 'verify' && (
            <button
              onClick={() => setStep('register')}
              className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors"
            >
              <FaArrowLeft />
            </button>
          )}
          <h2 className="text-2xl font-bold mb-1">
            {step === 'register' ? 'Register Parent' : 'Verify Parent Email'}
          </h2>
          <p className="text-indigo-100 text-sm">
            {step === 'register'
              ? 'Link a guardian to your academic journey'
              : `We've sent a code to ${form.email}`}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          {step === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Parent's Name</label>
                <div className="relative group">
                  <FaUserShield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    name="parentName"
                    value={form.parentName}
                    onChange={handleChange}
                    placeholder="Enter father or mother name"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Secure Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Link Parent'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full mb-2">
                <FaKey className="text-2xl" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification Code</label>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000 000"
                  required
                  className="w-full text-center tracking-[1em] text-3xl font-black py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-200"
                  autoFocus
                />
              </div>

              <p className="text-slate-500 text-sm">
                Enter the 6-digit code sent to your parent's inbox.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Verifying...' : (
                    <>
                      <FaCheck /> Verify Account
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('register')}
                  className="text-indigo-600 font-bold text-sm hover:underline"
                >
                  Didn't get the code? Edit email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentRegisterModal;
