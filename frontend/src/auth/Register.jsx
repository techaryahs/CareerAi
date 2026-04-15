import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    if (!acceptedPolicy) {
      setErrorMsg(
        <>
          Please accept our{" "}
          <a
            href="https://drive.google.com/file/d/1t0TgLDb_IUDdGhKndtAkM60IjokU_Jw8/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Privacy Policy
          </a>{" "}
          and Terms & Conditions.
        </>
      );
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post("/api/auth/register", { ...formData, isPremium: false });
      alert("✅ OTP sent to your email!");
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Registration failed. Try again.";
      alert(msg);
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-3 sm:px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 text-sm sm:text-base text-gray-800 placeholder-gray-400";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-100 flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl flex flex-col lg:flex-row overflow-hidden">

        {/* Top banner — mobile & tablet only */}
        <div className="lg:hidden bg-indigo-600 px-5 py-6 sm:px-8 sm:py-8 flex flex-col items-center text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="illustration"
              className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 object-contain drop-shadow-xl"
            />
            <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome to CareerGenAI 🚀</h1>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
              Create your account and unlock AI-driven career guidance!
            </p>
          </div>
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-indigo-500 opacity-20 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-purple-500 opacity-20 blur-2xl pointer-events-none"></div>
        </div>

        {/* Left panel — desktop only */}
        <div className="hidden lg:flex lg:w-5/12 bg-indigo-600 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-6">Welcome to CareerGenAI 🚀</h1>
            <p className="text-indigo-100 text-lg leading-relaxed">
              Create your account and start your journey. Unlock career growth
              with AI-driven guidance!
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="illustration"
            className="relative z-10 w-full max-w-xs mx-auto drop-shadow-2xl"
          />
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500 opacity-20 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl pointer-events-none"></div>
        </div>

        {/* Right side — Form */}
        <div className="w-full lg:w-7/12 p-5 sm:p-7 md:p-10 lg:p-12 overflow-y-auto">

          <div className="text-center lg:text-left mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create an Account</h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Join CareerGenAI today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              {/* Full Name */}
              <div className="col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Mobile — full width */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="\d{10}"
                  required
                  placeholder="10-digit mobile number"
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div className="col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>

              {/* Confirm Password */}
              <div className="col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Privacy Policy checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="privacyPolicy"
                checked={acceptedPolicy}
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 flex-shrink-0 accent-indigo-600"
              />
              <label htmlFor="privacyPolicy" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm flex items-start gap-2">
                <span className="text-base flex-shrink-0">⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base mt-1"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-5 sm:mt-7 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">
                Log In
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
