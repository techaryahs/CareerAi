import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { 
  Users, ChevronLeft, ChevronRight, CheckCircle2, 
  GraduationCap, Globe, Phone, Mail, User, Lock, Calendar, ClipboardList,
  Eye, EyeOff
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    mobilePrefix: "+91",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    country: null,
    state: null,
    source: "",
    lookUpFor: [],
    degree: "Bachelor's Degree",
    loanInterest: false,
    targetUniv: null,
    targetTerm: "",
    targetYear: "year",
    targetMajor: null,
  });

  const universities = [
    { value: "Harvard University", label: "Harvard University" },
    { value: "Stanford University", label: "Stanford University" },
    { value: "MIT", label: "MIT" },
    { value: "Oxford University", label: "Oxford University" },
    { value: "University of Cambridge", label: "University of Cambridge" },
    { value: "ETH Zurich", label: "ETH Zurich" },
    { value: "University of Toronto", label: "University of Toronto" },
    { value: "National University of Singapore", label: "National University of Singapore" },
  ];

  const majors = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Business Administration (MBA)", label: "Business Administration (MBA)" },
    { value: "Biology", label: "Biology" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Psychology", label: "Psychology" },
    { value: "Economics", label: "Economics" },
    { value: "Civil Engineering", label: "Civil Engineering" },
  ];

  const terms = ["Spring", "Fall", "Summer"];
  const years = Array.from({ length: 7 }, (_, i) => (2024 + i).toString());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email Address is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is required";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!acceptedPolicy) newErrors.policy = "Please accept the policies";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    e?.preventDefault();
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      if (formData.lookUpFor.includes("Admissions")) {
        setStep(3);
      } else {
        handleRegister();
      }
    } else if (step === 3) {
       handleRegister();
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }

    // Add character limits
    const limits = {
      name: 50,
      email: 100,
      mobile: 12,
      password: 32,
      confirmPassword: 32
    };

    if (limits[name] && value.length > limits[name]) return;

    if (name === "mobile") {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    if (type === "checkbox" && name === "lookUpFor") {
      const updatedInterests = checked 
        ? [...formData.lookUpFor, value]
        : formData.lookUpFor.filter(item => item !== value);
      setFormData(prev => ({ ...prev, lookUpFor: updatedInterests }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCountryChange = (selected) => {
    const countryInfo = Country.getCountryByCode(selected.value);
    setFormData(prev => ({
      ...prev,
      country: selected,
      state: null,
      mobilePrefix: `+${countryInfo.phonecode}`
    }));
    // Clear country error
    if (errors.country) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs.country;
        return newErrs;
      });
    }
  };

  const handleStateChange = (selected) => {
    setFormData(prev => ({ ...prev, state: selected }));
    // Clear state error
    if (errors.state) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs.state;
        return newErrs;
      });
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      mobile: `${formData.mobilePrefix}${formData.mobile}`,
      country: formData.country?.label,
      state: formData.state?.label,
      targetUniv: formData.targetUniv?.label,
      targetMajor: formData.targetMajor?.label,
      isPremium: false
    };

    try {
      await api.post("/api/auth/register", payload);

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-4xl flex overflow-hidden min-h-[600px] transition-all">
        {/* Left Side - Illustration (Reverted to CareerGenAI) */}
        <div className="hidden lg:flex lg:w-2/5 bg-indigo-600 p-10 flex-col justify-center text-white relative">
          <div className="relative z-10 text-center">
            <h1 className="text-3xl font-bold mb-4">Join CareerGenAI 👋</h1>
            <p className="text-indigo-100 text-lg mb-8">
              Start your journey with professional guidance.
            </p>
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="registration illustration"
                className="w-56 h-auto drop-shadow-2xl animate-pulse object-contain"
              />
            </div>
          </div>
          {/* Decorative circles to match Login page */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute w-64 h-64 bg-white rounded-full -top-10 -left-10 mix-blend-overlay"></div>
            <div className="absolute w-96 h-96 bg-white rounded-full -bottom-20 -right-20 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Right Side - Form (Compact) */}
        <div className="w-full lg:w-3/5 p-6 md:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Create An Account</h2>
            
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className={`absolute left-3 top-2.5 w-5 h-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} maxLength={50} placeholder="John Doe" className={`w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border transition-all outline-none ${errors.name ? 'border-red-500 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`} />
                    </div>
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.name}</p>}
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-2.5 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={100} placeholder="you@example.com" className={`w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border transition-all outline-none ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`} />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.email}</p>}
                  </div>
                  
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar className={`absolute left-3 top-2.5 w-5 h-5 ${errors.dob ? 'text-red-400' : 'text-gray-400'}`} />
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border transition-all outline-none ${errors.dob ? 'border-red-500' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`} />
                    </div>
                    {errors.dob && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.dob}</p>}
                  </div>
                  
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className={`w-full px-4 py-2 rounded-xl bg-gray-50 border transition-all outline-none ${errors.gender ? 'border-red-500' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.gender}</p>}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                    <Select
                      options={Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name }))}
                      onChange={handleCountryChange}
                      value={formData.country}
                      placeholder="Search country..."
                      className="text-sm"
                      menuPortalTarget={document.body}
                      styles={{ 
                        control: (base) => ({ 
                          ...base, 
                          borderRadius: '12px', 
                          padding: '4px', 
                          backgroundColor: '#f9fafb', 
                          borderColor: errors.country ? '#ef4444' : 'transparent',
                          boxShadow: 'none'
                        }),
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        menu: base => ({ ...base, zIndex: 9999 })
                      }}
                    />
                    {errors.country && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.country}</p>}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                    <Select
                      options={formData.country ? State.getStatesOfCountry(formData.country.value).map(s => ({ value: s.isoCode, label: s.name })) : []}
                      onChange={handleStateChange}
                      value={formData.state}
                      placeholder="Search state..."
                      isDisabled={!formData.country}
                      className="text-sm"
                      menuPortalTarget={document.body}
                      styles={{ 
                        control: (base) => ({ 
                          ...base, 
                          borderRadius: '12px', 
                          padding: '4px', 
                          backgroundColor: '#f9fafb', 
                          borderColor: errors.state ? '#ef4444' : 'transparent',
                          boxShadow: 'none'
                        }),
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        menu: base => ({ ...base, zIndex: 9999 })
                      }}
                    />
                    {errors.state && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.state}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <div className="flex gap-2">
                       <span className="flex-shrink-0 w-16 px-2 py-2 rounded-xl bg-gray-50 text-gray-600 font-bold border border-gray-100 flex items-center justify-center">{formData.mobilePrefix}</span>
                       <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} maxLength={12} placeholder="9876543210" className={`flex-1 px-4 py-2 rounded-xl bg-gray-50 border transition-all outline-none ${errors.mobile ? 'border-red-500' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`} />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.mobile}</p>}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-2.5 w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        maxLength={32} 
                        placeholder="••••••••" 
                        className={`w-full pl-10 pr-12 py-2 rounded-xl bg-gray-50 border transition-all outline-none ${errors.password ? 'border-red-500' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`} 
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600 transition-colors">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.password}</p>}
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-2.5 w-5 h-5 ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        maxLength={32} 
                        placeholder="••••••••" 
                        className={`w-full pl-10 pr-12 py-2 rounded-xl bg-gray-50 border transition-all outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`} 
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600 transition-colors">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 font-medium italic">{errors.confirmPassword}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Where did you hear about us?</label>
                    <select name="source" value={formData.source} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none">
                      <option value="">Select Source</option>
                      <option value="Google">Google</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="policy" 
                        checked={acceptedPolicy} 
                        onChange={(e) => {
                          setAcceptedPolicy(e.target.checked);
                          if (errors.policy) setErrors(prev => {
                            const n = {...prev};
                            delete n.policy;
                            return n;
                          });
                        }}
                        className={`w-5 h-5 rounded border-gray-300 transition-all ${errors.policy ? 'border-red-500 ring-4 ring-red-50' : 'text-indigo-600 focus:ring-indigo-500'}`}
                      />
                      <label htmlFor="policy" className="text-sm text-gray-500">
                        I agree to the <span className="text-indigo-600 font-bold cursor-pointer">Terms & Conditions</span> and <span className="text-indigo-600 font-bold cursor-pointer">Privacy Policy</span>
                      </label>
                    </div>
                    {errors.policy && <p className="text-red-500 text-[10px] font-medium italic">{errors.policy}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <div className="text-center lg:text-left">
                  <label className="block text-xl font-bold text-gray-800 mb-6 font-display">What you are looking for?</label>
                  <div className="bg-gray-50/50 rounded-[20px] p-6 border border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                       {['Admissions', 'Scholarships', 'Visa', 'Research Papers', 'Jobs'].map(item => (
                         <label key={item} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${formData.lookUpFor.includes(item) ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-transparent hover:border-gray-200'}`}>
                           <input 
                             type="checkbox" 
                             name="lookUpFor" 
                             value={item} 
                             checked={formData.lookUpFor.includes(item)}
                             onChange={handleChange}
                             className="w-5 h-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                           />
                           <span className="text-gray-700 font-semibold text-sm">{item}</span>
                         </label>
                       ))}
                    </div>
                  </div>
                </div>

                {formData.lookUpFor.includes("Admissions") ? (
                  <div className="space-y-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top duration-500">
                    <label className="block text-lg font-bold text-gray-800 mb-4">Which degree are you going for?</label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: "Bachelor's Degree", desc: "Undergraduate programs" },
                        { id: "Master's Degree", desc: "Graduate programs" },
                        { id: "Ph.D. Degree", desc: "Doctoral research" }
                      ].map(degree => (
                        <label key={degree.id} className={`flex items-start gap-4 cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.degree === degree.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}>
                          <input 
                            type="radio" 
                            name="degree" 
                            value={degree.id}
                            checked={formData.degree === degree.id}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 text-indigo-600 focus:ring-indigo-500" 
                          />
                          <div>
                             <div className="font-bold text-gray-900 text-sm">{degree.id}</div>
                             <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">{degree.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  formData.lookUpFor.length > 0 && (
                    <div className="relative mt-4">
                       <div className="absolute inset-0 border-2 border-yellow-200 bg-yellow-50/30 rounded-2xl -m-2 pointer-events-none"></div>
                       <div className="relative z-10 flex items-start gap-4 p-4">
                          <input 
                            type="checkbox" 
                            name="loanInterest" 
                            id="loan"
                            checked={formData.loanInterest}
                            onChange={handleChange}
                            className="mt-1 w-6 h-6 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer" 
                          />
                          <div>
                            <label htmlFor="loan" className="block text-lg font-bold text-gray-800 cursor-pointer">Educational Loan Interest?</label>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed font-medium italic">Connect with partners for special rates.</p>
                          </div>
                       </div>
                    </div>
                  )
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-800">{formData.degree} Preference</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Target University Name</label>
                    <Select
                      options={universities}
                      onChange={(sel) => setFormData(p => ({ ...p, targetUniv: sel }))}
                      value={formData.targetUniv}
                      placeholder="Select Target University Name"
                      className="text-sm"
                      menuPortalTarget={document.body}
                      styles={{ 
                        control: (b) => ({ ...b, borderRadius: '12px', padding: '4px', backgroundColor: '#f9fafb', borderColor: 'transparent' }),
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        menu: base => ({ ...base, zIndex: 9999 })
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Term</label>
                      <select 
                        name="targetTerm" 
                        value={formData.targetTerm} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-transparent focus:border-indigo-500 focus:bg-white outline-none text-sm transition-all"
                      >
                        <option value="">Select Term</option>
                        {terms.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Target Year</label>
                      <select 
                        name="targetYear" 
                        value={formData.targetYear} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-transparent focus:border-indigo-500 focus:bg-white outline-none text-sm transition-all"
                      >
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Select Your Interested Major</label>
                    <Select
                      options={majors}
                      onChange={(sel) => setFormData(p => ({ ...p, targetMajor: sel }))}
                      value={formData.targetMajor}
                      placeholder="Search Target Major Name"
                      className="text-sm"
                      menuPortalTarget={document.body}
                      styles={{ 
                        control: (b) => ({ ...b, borderRadius: '12px', padding: '4px', backgroundColor: '#f9fafb', borderColor: 'transparent' }),
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        menu: base => ({ ...base, zIndex: 9999 })
                      }}
                    />
                  </div>

                  <div className="relative mt-20">
                     <div className="absolute inset-0 border-2 border-yellow-200 bg-yellow-50/30 rounded-2xl -m-4 pointer-events-none"></div>
                     <div className="relative z-10 flex items-start gap-4 p-4">
                        <input 
                          type="checkbox" 
                          name="loanInterest" 
                          id="loan3"
                          checked={formData.loanInterest}
                          onChange={handleChange}
                          className="mt-1 w-6 h-6 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer" 
                        />
                        <div>
                          <label htmlFor="loan3" className="block text-lg font-bold text-gray-800 cursor-pointer">Are you interested in an educational loan?</label>
                          <p className="text-sm text-gray-500 mt-2 leading-relaxed font-medium">Would you like to connect with our partners for competitive offers?</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 space-y-6">
            <div className="flex gap-4">
              {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-2xl transition-all"
                >
                  <ChevronLeft className="w-5 h-5" /> Previous
                </button>
              )}
              <button 
                onClick={nextStep}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 font-black text-lg py-4 px-6 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-[#252a34] text-white hover:bg-black"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {step === 3 || (step === 2 && !formData.lookUpFor.includes("Admissions")) ? "Create Account" : "Next"} 
                    {((step < 3 && formData.lookUpFor.includes("Admissions")) || step === 1) && <ChevronRight className="w-5 h-5" />}
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-500 font-medium">
                Already have an Account? <a href="/login" className="text-indigo-600 font-bold hover:underline">Login Here</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
