import { useState } from "react";
import api from "../../../api";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Video,
  User,
  Calendar,
  Clock,
  MessageSquare,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const FreeCounselling = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    course: "",
    mode: "",
    counsellor: "",
    preferredDate: "",
    slot: "",
    message: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const features = [
    "15-minute basic counselling call",
    "Stream selection guidance",
    "Basic career interest assessment",
    "CET/JEE/NEET admission process overview",
    "Maharashtra CET important dates alerts (WhatsApp)",
    "Scholarship awareness basic guidance",
    "College options list (Top 10 as per marks)",
    "Parent counselling orientation",
    "Admission checklist PDF",
    "Document checklist for admissions",
    "WhatsApp support (limited – 3 days)",
  ];

  const fetchAvailableSlots = async (counsellor, date) => {
    try {
      if (!counsellor || !date) return;
      const res = await api.get("/api/counselling/available-slots", {
        params: { counsellor, date },
      });
      setAvailableSlots(res.data.slots);
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  const handleChange = async (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedData);

    if (e.target.name === "counsellor" || e.target.name === "preferredDate") {
      const counsellor =
        e.target.name === "counsellor"
          ? e.target.value
          : updatedData.counsellor;
      const date =
        e.target.name === "preferredDate"
          ? e.target.value
          : updatedData.preferredDate;
      if (counsellor && date) {
        fetchAvailableSlots(counsellor, date);
      }
    }
  };

  const sendOtp = async () => {
    try {
      if (!formData.phone) return alert("Enter phone number");
      setOtpLoading(true);
      const res = await api.post("/api/counselling/send-otp", {
        phone: formData.phone,
      });
      alert(res.data.message);
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await api.post("/api/counselling/verify-otp", {
        phone: formData.phone,
        otp: String(otp),
      });
      alert(res.data.message);
      setVerified(true);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.slot) return alert("Please select a slot");
      setLoading(true);
      const res = await api.post("/api/counselling/book", formData);
      setSuccess(res.data.message);
      fetchAvailableSlots(formData.counsellor, formData.preferredDate);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        course: "",
        mode: "",
        counsellor: formData.counsellor,
        preferredDate: formData.preferredDate,
        slot: "",
        message: "",
      });
      setOtp("");
      setOtpSent(false);
      setVerified(false);
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Free Career Counselling | Expert Guidance for 10th & 12th Students
        </title>
        <meta
          name="description"
          content="Book a free career counselling session with CareerGenAI."
        />
        <link rel="canonical" href="https://careergenai.in/free-counseling" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* LEFT SIDE: Value Proposition */}
          <div className="lg:col-span-5 lg:sticky lg:top-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={14} className="text-orange-400 animate-pulse" />{" "}
              CareerGenAI Foundation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Starter Guidance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
                Free Session Package
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="text-5xl font-black text-white flex items-start">
                <span className="text-2xl font-bold text-blue-400 mt-1">₹</span>
                0
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-xl text-sm font-medium">
                <ShieldCheck size={16} className="text-orange-400" />
                Build Trust & Direct Route Maps
              </div>
            </div>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 border-l-2 border-blue-500 pl-4">
              Get personalized engineering, medical, management, and technical
              stream alignment from certified expert guides.
            </p>

            {/* Feature List Cards */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 transition-all duration-200 rounded-xl p-4 flex items-start gap-3.5"
                >
                  <CheckCircle2
                    className="text-orange-400 shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-slate-300 text-sm font-medium leading-normal">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Form Wrapper */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-950/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Book Your Session
              </h2>
              <p className="text-sm text-slate-400">
                Complete authentication to hold your dynamic consultation
                window.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Full Name Input */}
              <div className="relative">
                <User
                  className="absolute left-4 top-4 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Phone Input with Dynamic Verification State */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Phone
                      className="absolute left-4 top-4 text-slate-500"
                      size={18}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={verified}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={otpLoading || verified}
                    className={`px-5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                      verified
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20"
                    }`}
                  >
                    {otpLoading
                      ? "Sending..."
                      : verified
                        ? "Verified"
                        : "Send OTP"}
                  </button>
                </div>

                {otpSent && !verified && (
                  <div className="flex gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 animate-fadeIn">
                    <input
                      type="text"
                      placeholder="Enter Verification OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-orange-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      className="px-5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                )}

                {verified && (
                  <p className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5 pl-1">
                    <CheckCircle2 size={14} /> Identity Authentication Confirmed
                  </p>
                )}
              </div>

              {/* Email & City Double Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-4 text-slate-500"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-4 text-slate-500"
                    size={18}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City / State"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Course & Mode Select Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <GraduationCap
                    className="absolute left-4 top-4 text-slate-500"
                    size={18}
                  />
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="" className="bg-slate-950 text-slate-500">
                      Target Course
                    </option>
                    {[
                      "Engineering",
                      "MBBS",
                      "MBA",
                      "BBA",
                      "BCA",
                      "BMS",
                      "Pharmacy",
                      "Law",
                      "Design",
                      "B.Arch",
                      "BSc",
                      "BA",
                    ].map((c) => (
                      <option key={c} className="bg-slate-950 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Video
                    className="absolute left-4 top-4 text-slate-500"
                    size={18}
                  />
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="" className="bg-slate-950 text-slate-500">
                      Counselling Mode
                    </option>
                    {["Online", "Offline", "Phone Call"].map((m) => (
                      <option key={m} className="bg-slate-950 text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Counsellor & Date Selection Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User
                    className="absolute left-4 top-4 text-slate-500"
                    size={18}
                  />
                  <select
                    name="counsellor"
                    value={formData.counsellor}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="" className="bg-slate-950 text-slate-500">
                      Select Professional Guide
                    </option>
                    <option
                      className="bg-slate-950 text-white"
                      value="Counselor 1"
                    >
                      Counselor 1
                    </option>
                    <option
                      className="bg-slate-950 text-white"
                      value="Counselor 2"
                    >
                      Counselor 2
                    </option>
                  </select>
                </div>
                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-4 text-slate-500"
                    size={18}
                  />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Dynamic Slots Section Header */}
              <div className="pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5 flex items-center gap-1.5">
                  <Clock size={14} className="text-blue-400" /> Available System
                  Windows
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => {
                      const isExpired = slot.expired;
                      const isBooked = slot.booked;
                      const isSelected = formData.slot === slot.time;

                      return (
                        <button
                          key={index}
                          type="button"
                          disabled={isExpired || isBooked}
                          onClick={() =>
                            setFormData({ ...formData, slot: slot.time })
                          }
                          className={`p-3 rounded-xl border text-xs font-bold transition-all duration-200 text-center flex flex-col justify-center items-center gap-1 min-h-[58px] ${
                            isSelected
                              ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/30"
                              : isExpired
                                ? "bg-slate-950 border-slate-900/60 opacity-30 cursor-not-allowed text-slate-600"
                                : isBooked
                                  ? "bg-rose-500/10 border-rose-500/20 text-rose-400 opacity-50 cursor-not-allowed"
                                  : "bg-slate-950 border-slate-850 text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/5"
                          }`}
                        >
                          <span>{slot.time}</span>
                          {isBooked && (
                            <span className="text-[9px] font-medium opacity-80">
                              Reserved
                            </span>
                          )}
                          {isSelected && (
                            <span className="text-[9px] font-medium opacity-90">
                              Selected
                            </span>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center text-xs text-slate-500 py-6 border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
                      Configure structural assignment settings above to view
                      slots
                    </div>
                  )}
                </div>
              </div>

              {/* Textarea Input Query */}
              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-4 text-slate-500"
                  size={18}
                />
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Describe your current structural query context..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Final Submit Trigger Action Group */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !verified}
                  className={`w-full py-4 rounded-xl font-extrabold text-base tracking-wide transition-all transform active:scale-[0.99] ${
                    verified && !loading
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600 text-white hover:opacity-95 shadow-xl shadow-indigo-950/50"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {loading
                    ? "Processing Secure Reservation..."
                    : "Confirm Free Counselling"}
                </button>

                {!verified && (
                  <p className="text-orange-400/90 text-xs text-center mt-3 font-medium">
                    Please secure mobile verification context to complete
                    dispatch.
                  </p>
                )}

                {success && (
                  <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center text-sm font-semibold animate-fadeIn">
                    🎉 {success}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeCounselling;
