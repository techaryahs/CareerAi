import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Visibility toggles
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // States
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Cooldown countdown in seconds
  
  const navigate = useNavigate();

  // Cooldown countdown timer effect
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/api/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });
      if (res.status === 200) {
        alert("✅ OTP sent to your email!");
        setStep(2);
        setCooldown(30); // Start 30-second resend limit
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setErrorMsg(err.response?.data?.error || "Failed to send OTP. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/api/auth/verifyfp-otp", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });
      if (res.status === 200) {
        setStep(3);
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setErrorMsg(err.response?.data?.error || "Invalid OTP. Please check and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Frontend validations
    if (newPassword.trim().length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post("/api/auth/reset-password", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword: newPassword.trim(),
      });
      if (res.status === 200) {
        setStep(4);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setErrorMsg(err.response?.data?.error || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerResend = async () => {
    if (cooldown > 0) return;
    await handleSendOtp();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 flex flex-col relative overflow-hidden">
        
        {/* Top styling bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-500" />
        
        {step < 4 && (
          <div className="flex items-center gap-2 mb-6">
            <Link to="/login" className="text-gray-500 hover:text-indigo-600 transition-colors">
              <FaArrowLeft />
            </Link>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              Step {step} of 3
            </span>
          </div>
        )}

        {/* STEP 1: ENTER EMAIL */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
              <p className="text-gray-500 text-sm">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
              >
                {isSubmitting ? "Sending OTP..." : "Send Verification OTP"}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Verification Code</h2>
              <p className="text-gray-500 text-sm">
                We sent a 6-digit OTP code to <span className="font-semibold text-indigo-600">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Verification OTP
                </label>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  required
                  placeholder="123456"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 text-center tracking-widest text-lg font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={triggerResend}
                  disabled={cooldown > 0 || isSubmitting}
                  className="text-indigo-600 font-semibold hover:underline bg-transparent border-none cursor-pointer disabled:text-gray-400 disabled:no-underline text-sm"
                >
                  {cooldown > 0 ? `Resend OTP (${cooldown}s)` : "Resend OTP"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create New Password</h2>
              <p className="text-gray-500 text-sm">
                Choose a strong password containing at least 6 characters.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 pr-12 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-indigo-600 focus:outline-none"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 pr-12 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-indigo-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
              >
                {isSubmitting ? "Resetting..." : "Update Password"}
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: SUCCESS CARD */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4 text-green-500 text-5xl">
              <FaCheckCircle className="animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Your password has been successfully reset. You can now use your new password to sign in.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg flex items-center justify-center text-sm sm:text-base"
            >
              Return to Login
            </button>
          </div>
        )}

        {/* Error alert wrapper */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs sm:text-sm flex items-center border border-red-100">
            <span className="mr-2 text-base">⚠️</span>
            {errorMsg}
          </div>
        )}

        {/* Back to Login link */}
        {step < 4 && (
          <div className="mt-6 text-center">
            <Link to="/login" className="text-indigo-600 text-sm font-bold hover:text-indigo-700 hover:underline">
              Back to Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
