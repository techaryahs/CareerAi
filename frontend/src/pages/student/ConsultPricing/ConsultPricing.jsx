import React from "react";
import {
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import CouponModal from "../../../components/CouponModal/CouponModal";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ConsultPricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showCouponModal, setShowCouponModal] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [prices, setPrices] = React.useState({
    SMART: 2999,
    PREMIUM: 5999,
    "ELITE VIP": 9999,
  });
  const [plansStatus, setPlansStatus] = React.useState({
    SMART: true,
    PREMIUM: true,
    "ELITE VIP": true,
  });

  React.useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await api.get("/api/settings/pricing");
        if (res.data && res.data.pricing) {
          const p = res.data.pricing;
          setPrices({
            SMART: p.smart?.price ?? 2999,
            PREMIUM: p.premium?.price ?? 5999,
            "ELITE VIP": p.eliteVip?.price ?? 9999,
          });
          setPlansStatus({
            SMART: p.smart?.enabled !== false,
            PREMIUM: p.premium?.enabled !== false,
            "ELITE VIP": p.eliteVip?.enabled !== false,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dynamic prices:", err);
      }
    };
    fetchPrices();
  }, []);

  const packages = [
    {
      name: "SMART",
      price: `₹${prices.SMART.toLocaleString("en-IN")}`,
      subtitle: "Smart Admission Support",
      color: "from-blue-600 to-cyan-500",
      shadow: "shadow-blue-100",
      tagline: "Essential CAP guidance",
      features: [
        "Everything in Free Admission Packages",
        "45-Min Live Expert Session",
        "Score & Target Rank Analysis",
        "20 Personalized College Shortlist",
        "CAP Round Step-by-Step Guidance",
        "Application Form Support",
        "Scholarship Eligibility Check",
        "Fee Tracking & Comparison",
        "Deadline WhatsApp Alerts (15 Days)",
      ],
      button: "Choose Smart Package",
    },
    {
      name: "PREMIUM",
      price: `₹${prices.PREMIUM.toLocaleString("en-IN")}`,
      subtitle: "Complete Admission Planning",
      popular: true,
      color: "from-amber-500 to-orange-600",
      shadow: "shadow-orange-100",
      tagline: "Full roadmap mapping strategy",
      features: [
        "Everything in Smart Package",
        "3 Comprehensive Counselling Sessions",
        "Psychometric Assessment Track",
        "In-depth Career Roadmap Report",
        "AI-Powered College Predictor Access",
        "Option Form Choice Filling Guidance",
        "End-to-End Scholarship Assistance",
        "Detailed Institute Comparison Report",
        "Branch Selection Specialization",
        "Joint Parent + Student Consult Session",
        "Priority Slack/WhatsApp Support (30 Days)",
      ],
      button: "Choose Premium Plan",
    },
    {
      name: "ELITE VIP",
      price: `₹${prices["ELITE VIP"].toLocaleString("en-IN")}`,
      subtitle: "End-to-End Managed Support",
      color: "from-indigo-600 via-purple-600 to-blue-700",
      shadow: "shadow-purple-100",
      tagline: "Dedicated executive handholding",
      features: [
        "Everything in Premium Package",
        "Dedicated Personal Admission Manager",
        "Unlimited Custom One-on-One Counselling",
        "Full Process Executive Handholding",
        "Direct CAP Registration Assistance",
        "Document Verification & Upload Review",
        "Spot Round Strategy & Matrix Guidance",
        "Education Loan Application Support",
        "Hostel Matching & Campus Guidance",
        "Emergency Live Deadline Support",
        "Unlimited Extended Parent Orientation",
        "Daily High Priority WhatsApp Access",
        "Premium AI Analytics Reports Suite",
        "Salary Trend & Future Job Forecasts",
        "Corporate Internship Route Maps",
        "Professional LinkedIn Profile Build",
      ],
      button: "Book VIP Consultation",
    },
  ];

  const handleChoosePlan = (pkg) => {
    setSelectedPackage(pkg);
    setShowCouponModal(true);
  };

  const processPayment = async (pkg, couponCode = null, finalAmount = null) => {
    if (!user) {
      sessionStorage.setItem("redirectPath", "/consult-pricing");
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    try {
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        alert(
          "Failed to load Razorpay SDK. Please check your network connection.",
        );
        setIsProcessing(false);
        return;
      }

      const orderRes = await api.post("/api/payments/order", {
        planName: pkg.name,
        couponCode,
        finalAmount,
      });

      if (!orderRes.data || !orderRes.data.order) {
        throw new Error("Failed to create verification invoice on backend");
      }

      const { order } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CareerGenAI",
        description: `${pkg.name} Subscription Plan`,
        order_id: order.id,
        handler: async function (response) {
          try {
            setIsProcessing(true);
            const verifyRes = await api.post("/api/payments/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planName: pkg.name,
            });

            if (verifyRes.data.success) {
              alert(
                `🎉 Success! Account successfully upgraded to ${pkg.name}.`,
              );
              window.location.reload();
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification sequence issue:", err);
            alert("Error verifying signatures. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.mobile || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Initialization checkout error:", error);
      alert(
        error.response?.data?.error ||
          "Failed to initiate checkout processing pipeline.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const activePackage = user?.profile?.admissionPackage?.packageName;
  const activeExpiry = user?.profile?.admissionPackage?.expiresAt;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles size={14} className="text-orange-500 animate-pulse" />{" "}
            Comprehensive Matrix Guides
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 text-slate-900 tracking-tight leading-none">
            Admission Guidance <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600">
              & Expert Counselling
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            From algorithmic college selection matrices to final counter
            confirmation. Secure structured confidence throughout structural
            choices.
          </p>
        </div>

        {/* Conditional Dashboard User Status Block */}
        {activePackage && (
          <div className="mb-12 max-w-4xl mx-auto animate-fadeIn">
            <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-5 shadow-lg shadow-emerald-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100 shrink-0 mt-0.5">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Active Structural Admission Package
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Your pipeline is current operating on the{" "}
                    <span className="font-extrabold text-emerald-600">
                      {activePackage}
                    </span>{" "}
                    profile.
                  </p>
                  {activeExpiry && (
                    <p className="text-xs text-slate-400 mt-1">
                      System access structural clearance expires:{" "}
                      {new Date(activeExpiry).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => navigate("/history")}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all duration-150 whitespace-nowrap shrink-0"
              >
                View Manifest Details
              </button>
            </div>
          </div>
        )}

        {/* Managed Core Flexbox Dynamic Framework Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {packages
            .filter((pkg) => plansStatus[pkg.name] !== false)
            .map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl border-2 shadow-xl transition-all duration-300 flex flex-col ${
                  pkg.popular
                    ? `border-orange-500 shadow-2xl ${pkg.shadow}`
                    : "border-slate-200 shadow-slate-100"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md flex items-center gap-1">
                    <Star size={11} className="fill-white" /> Most Popular Tier
                  </div>
                )}

                {/* Vertical Decorative Border Accents */}
                <div
                  className={`h-2 rounded-t-3xl bg-gradient-to-r ${pkg.color}`}
                />

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                          {pkg.name}
                        </h2>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
                          {pkg.subtitle}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 font-medium italic">
                      {pkg.tagline}
                    </p>

                    <div className="my-6 flex items-baseline text-slate-900">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="ml-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        / Fixed Package
                      </span>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-4" />

                    {/* Features loop */}
                    <div className="space-y-3.5 mt-4">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle
                            size={15}
                            className="text-emerald-500 shrink-0 mt-0.5"
                          />
                          <span className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Button Section */}
                  <div className="pt-8 mt-auto">
                    <button
                      onClick={() => handleChoosePlan(pkg)}
                      disabled={isProcessing}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] shadow-md ${
                        pkg.popular
                          ? "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-300"
                          : `bg-gradient-to-r ${pkg.color} text-white shadow-blue-50/50 hover:opacity-95`
                      } ${isProcessing ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {isProcessing
                        ? "Processing Vault Invoice..."
                        : pkg.button}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Feature Grid: Why Choose Us */}
        <div className="mt-28 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-100/50 p-6 sm:p-10 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Why Parents & Students Choose CareerGenAI
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
              Eliminating systemic blindspots via deep analytical diagnostic
              reporting filters.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                label: "AI + Expert Hybrid",
                desc: "algorithmic matching vectors",
              },
              { label: "CAP Specialists", desc: "round systematic validation" },
              {
                label: "Scholarship Maps",
                desc: "automated eligibility checks",
              },
              {
                label: "Admission Handholding",
                desc: "end-to-end document review",
              },
              {
                label: "Target Roadmaps",
                desc: "long-term development reports",
              },
              {
                label: "Parent Orientation",
                desc: "dual strategy mapping windows",
              },
              {
                label: "Predictor Engines",
                desc: "real-time dynamic analytics",
              },
              {
                label: "Certified Engineers",
                desc: "industry experienced advisors",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center group hover:bg-white hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-200"
              >
                <Zap
                  size={14}
                  className="text-orange-500 mx-auto mb-2 opacity-80 group-hover:scale-110 transition-transform"
                />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {item.label}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-none font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block Segment */}
        <div className="mt-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 border border-slate-900 rounded-3xl text-white p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight relative z-10">
            Ready to Secure Your Academic Path?
          </h2>

          <p className="mt-4 text-sm sm:text-base opacity-80 max-w-xl mx-auto font-medium leading-relaxed relative z-10">
            Lock in structural tracking parameters. Talk directly to a
            certification engineer or initiate entry-tier evaluations
            immediately.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 relative z-10">
            <button
              onClick={() => navigate("/free-counseling")}
              className="w-full sm:w-auto bg-white text-slate-950 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-100 shadow transition-all active:scale-[0.99]"
            >
              Initialize Free Evaluation
            </button>

            <button
              onClick={() => navigate("/consult")}
              className="w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-sm text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all active:scale-[0.99]"
            >
              Talk to System Expert
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center gap-2 text-[10px] text-slate-400 font-medium">
            <HelpCircle size={12} />
            Need corporate custom organizational bundles? Support ticketing desk
            answers live queries instantly.
          </div>
        </div>
      </div>

      {showCouponModal && (
        <CouponModal
          plan={selectedPackage}
          onClose={() => setShowCouponModal(false)}
          onProceed={(paymentData) => {
            setShowCouponModal(false);
            processPayment(
              selectedPackage,
              paymentData.couponCode,
              paymentData.finalAmount,
            );
          }}
        />
      )}
    </div>
  );
};

export default ConsultPricing;
