import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/api/auth/login", {
        email: email.trim(),
        password: password.trim()
      });

      const { token, user } = res.data;
      const role = user.role;

      if (!user.isVerified) {
        try {
          await api.post("/api/auth/resend-otp", { email: user.email });
          alert("⚠️ Account not verified. A new OTP has been sent.");
        } catch (ignored) {}
        navigate(`/verify-otp?email=${user.email}`);
        return;
      }

      // Update Auth Context
      login(user, token);

      console.log("✅ Logged in user:", user);

      // Redirect based on role
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "consultant") {
          navigate("/consultant-dashboard");
        } else if (role === "parent") {
          navigate("/parent-dashboard");
        } else if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          // Student or default
          navigate("/");
        }
      }, 500);

    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.error || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl flex overflow-hidden min-h-[600px]">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 p-12 flex-col justify-center text-white relative">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6">Welcome Back 👋</h1>
            <p className="text-indigo-100 text-xl mb-12">
              Login to continue your journey with <b>CareerGenAI</b>.
            </p>
            <div className="flex justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                  alt="login illustration"
                  className="w-80 h-auto drop-shadow-2xl animate-float object-contain"
                />
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute w-64 h-64 bg-white rounded-full -top-10 -left-10 mix-blend-overlay"></div>
            <div className="absolute w-96 h-96 bg-white rounded-full -bottom-20 -right-20 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center md:text-left mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Sign In</h2>
              <p className="text-gray-500 text-lg">Access your CareerGenAI account</p>
            </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 pr-12"
                    placeholder="••••••••"
                  />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-indigo-600 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                </button>
              </div>
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-[1.01] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-lg mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

            {errorMsg && (
              <div className="mt-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-center border border-red-100 animate-pulse">
                <span className="mr-3 text-xl">⚠️</span> {errorMsg}
              </div>
            )}

            <div className="mt-10 text-center space-y-4">
              <p className="text-gray-600 text-base">
                Don’t have an account?{" "}
                <a href="/register" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline">
                  Create Account
                </a>
              </p>
              <p>
                <a href="/forgot-password" className="text-gray-500 text-sm hover:text-gray-700 font-medium">
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
