import { useState } from "react";
import axios from "axios";
import api from "../../../api";
import { Helmet } from "react-helmet-async";

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


  // FETCH AVAILABLE SLOTS
  const fetchAvailableSlots = async (
    counsellor,
    date
  ) => {

    try {

      if (!counsellor || !date) return;

      const res = await api.get(
        "/counselling/available-slots",
        {
          params: {
            counsellor,
            date,
          },
        }
      );

      setAvailableSlots(res.data.slots);

    } catch (error) {

      // console.log(error);
    }
  };


  // HANDLE CHANGE
  const handleChange = async (e) => {

    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updatedData);

    // FETCH SLOTS
    if (
      e.target.name === "counsellor" ||
      e.target.name === "preferredDate"
    ) {

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


  // SEND OTP
  const sendOtp = async () => {
    try {

      if (!formData.phone) {
        return alert("Enter phone number");
      }

      setOtpLoading(true);

      // console.log("📱 Sending OTP to phone:", formData.phone);

      const res = await api.post(
        "/api/counselling/send-otp",
        {
          phone: formData.phone,
        }
      );

      // console.log("✅ Send OTP Response:", res.data);

      alert(res.data.message);

      setOtpSent(true);

    } catch (error) {

      console.error("❌ Send OTP Error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Failed to send OTP");

    } finally {

      setOtpLoading(false);
    }
  };


  // VERIFY OTP
  const verifyOtp = async () => {
    try {

      // console.log("🔍 Verifying OTP - Phone:", formData.phone, "OTP:", otp);

      const res = await api.post(
        "/api/counselling/verify-otp",
        {
          phone: formData.phone,
          otp: String(otp), // Ensure OTP is sent as string
        }
      );

      // console.log("✅ OTP Verification Response:", res.data);

      alert(res.data.message);

      setVerified(true);

    } catch (error) {

      console.error("❌ OTP Verification Error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Invalid OTP");
    }
  };


  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!formData.slot) {
        return alert("Please select a slot");
      }

      setLoading(true);

      const res = await api.post(
        "/counselling/book",
        formData
      );

      setSuccess(res.data.message);
      fetchAvailableSlots(
        formData.counsellor,
        formData.preferredDate
      );

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

      alert(
        error?.response?.data?.message || "Something went wrong"
      );

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
          content="Book a free career counselling session with CareerGenAI. Get expert guidance on stream selection, career options, college admissions, entrance exams, and future planning."
        />

        <meta
          name="keywords"
          content="free career counselling, career guidance for students, 10th career guidance, 12th career counselling, admission guidance, college admissions, JEE counselling, NEET counselling, stream selection"
        />

        <meta
          property="og:title"
          content="Free Career Counselling | Expert Guidance for 10th & 12th Students"
        />

        <meta
          property="og:description"
          content="Book a free career counselling session with CareerGenAI. Get expert guidance on stream selection, career options, college admissions, entrance exams, and future planning."
        />

        <meta
          property="og:url"
          content="https://careergenai.in/free-counseling"
        />

        <meta property="og:type" content="website" />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://careergenai.in/free-counseling"
        />
      </Helmet>

      <div className="min-h-screen bg-[#050816] text-white py-20 px-4 md:px-8">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">

        {/* LEFT SIDE */}
        <div>

          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
            CareerGenAI Admission Packages
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            FREE PACKAGE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Starter Guidance
            </span>
          </h1>

          <div className="flex items-center gap-4 mb-6">

            <div className="text-5xl font-bold text-green-400">
              ₹0
            </div>

            <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
              Best for lead generation & trust building
            </div>

          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            Get personalized admission guidance for Engineering,
            MBBS, MBA, Pharmacy, Law, Design, BCA, BBA, and more.
          </p>

          <div className="space-y-4">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 rounded-2xl p-4 flex items-start gap-3"
              >
                <span className="text-green-400 text-lg">✔</span>

                <p className="text-gray-200">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl sticky top-10">

          <div className="mb-8">

            <h2 className="text-4xl font-bold mb-3">
              Book Your Session
            </h2>

            <p className="text-gray-400">
              Fill your details and verify mobile number.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            />

            {/* PHONE + OTP */}
            <div className="space-y-3">

              <div className="flex gap-3">

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={verified}
                  className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
                />

                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={otpLoading || verified}
                  className="px-5 rounded-2xl bg-cyan-500 font-semibold"
                >
                  {otpLoading
                    ? "Sending..."
                    : verified
                      ? "Verified"
                      : "Send OTP"}
                </button>

              </div>

              {otpSent && !verified && (

                <div className="flex gap-3">

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
                  />

                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="px-5 rounded-2xl bg-green-500 font-semibold"
                  >
                    Verify
                  </button>

                </div>

              )}

              {verified && (
                <p className="text-green-400 font-semibold">
                  ✓ Mobile Number Verified
                </p>
              )}

            </div>

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            />

            {/* CITY */}
            <input
              type="text"
              name="city"
              placeholder="City / State"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            />

            {/* COURSE */}
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            >
              <option value="">Select Course</option>

              <option>Engineering</option>
              <option>MBBS</option>
              <option>MBA</option>
              <option>BBA</option>
              <option>BCA</option>
              <option>BMS</option>
              <option>Pharmacy</option>
              <option>Law</option>
              <option>Design</option>
              <option>B.Arch</option>
              <option>BSc</option>
              <option>BA</option>

            </select>

            {/* MODE */}
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            >
              <option value="">Counselling Mode</option>

              <option>Online</option>
              <option>Offline</option>
              <option>Phone Call</option>

            </select>

            {/* COUNSELLOR */}
            <select
              name="counsellor"
              value={formData.counsellor}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            >
              <option value="">Select Counsellor</option>

              <option>Counselor 1</option>

              <option>Counselor 2</option>

            </select>

            {/* DATE */}
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            />

            {/* SLOT GRID */}
            <div className="grid grid-cols-2 gap-3">

              {availableSlots.length > 0 ? (

                availableSlots.map((slot, index) => {

                  const isExpired = slot.expired;

                  const isBooked = slot.booked;

                  const isSelected =
                    formData.slot === slot.time;

                  return (

                    <button
                      key={index}
                      type="button"
                      disabled={isExpired || isBooked}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          slot: slot.time,
                        })
                      }
                      className={`
                        p-4 rounded-2xl border text-sm font-semibold transition-all duration-300 text-left

                        ${isSelected
                          ? "bg-cyan-500 border-cyan-400 text-white"
                          : ""
                        }

                        ${isExpired
                          ? "bg-gray-700 border-gray-600 opacity-40 cursor-not-allowed"
                          : ""
                        }

                        ${isBooked
                          ? "bg-red-500/20 border-red-500 opacity-50 cursor-not-allowed"
                          : ""
                        }

                        ${!isExpired && !isBooked && !isSelected
                          ? "bg-[#111827] border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10"
                          : ""
                        }
                      `}
                    >

                      <div className="font-semibold">
                        {slot.time}
                      </div>

                      {isExpired && (
                        <div className="text-xs text-gray-300 mt-2">
                          Expired
                        </div>
                      )}

                      {isBooked && (
                        <div className="text-xs text-red-300 mt-2">
                          Already Booked
                        </div>
                      )}

                      {isSelected && (
                        <div className="text-xs text-cyan-100 mt-2">
                          Selected
                        </div>
                      )}

                    </button>

                  );
                })

              ) : (

                <div className="col-span-2 text-center text-gray-400 py-6 border border-dashed border-white/10 rounded-2xl">
                  Select counsellor and date to view available slots
                </div>

              )}

            </div>

            {/* MESSAGE */}
            <textarea
              name="message"
              rows="4"
              placeholder="Write your query..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 outline-none"
            />

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading || !verified}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg"
            >
              {loading
                ? "Submitting..."
                : "Book Free Counselling"}
            </button>

            {!verified && (
              <p className="text-red-400 text-sm text-center">
                Verify your mobile number before submitting.
              </p>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-2xl text-center font-semibold">
                {success}
              </div>
            )}

          </form>

        </div>

      </div>

    </div>
  </>
);
};

export default FreeCounselling;