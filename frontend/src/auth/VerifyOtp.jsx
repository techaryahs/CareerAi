import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");

  const verifyOtp = async (enteredOtp) => {
    try {
      console.log(enteredOtp);
      const res = await api.post("/api/auth/verify-otp", {
        email,
        otp: enteredOtp,
      });

      if (res.status === 200) {
        alert("✅ Email verified successfully! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "Invalid OTP";
      alert(errorMessage);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus(); // reset to first box
    }
  };

  const handleResendOtp = async () => {
    try {
      await api.post("/api/auth/resend-otp", { email });
      alert("✅ New OTP sent successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // If all digits are filled → auto verify
      if (newOtp.every((digit) => digit !== "")) {
        const enteredOtp = newOtp.join("");
        verifyOtp(enteredOtp);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Verification</h2>
          <p className="text-gray-500">
            Enter the 6-digit OTP sent to <span className="font-semibold text-indigo-600">{email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-2xl font-bold rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
          ))}
        </div>

        <button
           onClick={() => {
              const enteredOtp = otp.join("");
              if (enteredOtp.length === 6) verifyOtp(enteredOtp);
           }}
           className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
        >
          Verify OTP
        </button>
        
        <div className="mt-6 text-center text-sm text-gray-500">
           Didn't receive code? <button onClick={handleResendOtp} className="text-indigo-600 font-semibold hover:underline bg-transparent border-none cursor-pointer">Resend OTP</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
