import React, { useState, useEffect } from "react";
import {
  FaCrown,
  FaCheckCircle,
  FaUserShield,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

// Consolidated configuration fallback
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  "http://localhost:5009";

export default function PremiumPopup({ onClose, onUpgrade }) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState("3 Months"); // Defaulting to best-value tier
  const [prices, setPrices] = useState({
    "1 Month": 1999,
    "2 Months": 2999,
    "3 Months": 3999,
  });
  const [plansStatus, setPlansStatus] = useState({
    "1 Month": true,
    "2 Months": true,
    "3 Months": true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings/pricing`);
        const data = await res.json();
        if (data.success && data.pricing) {
          const p = data.pricing;
          setPrices({
            "1 Month": p.premium1Month?.price ?? 1999,
            "2 Months": p.premium2Months?.price ?? 2999,
            "3 Months": p.premium3Months?.price ?? 3999,
          });
          setPlansStatus({
            "1 Month": p.premium1Month?.enabled !== false,
            "2 Months": p.premium2Months?.enabled !== false,
            "3 Months": p.premium3Months?.enabled !== false,
          });
        }
      } catch (err) {
        console.error("Failed to fetch membership prices:", err);
      }
    };
    fetchPrices();
  }, []);

  const isPremium = user?.premium?.isPremium;
  const expiry = user?.premium?.expiryDate;

  const handleUpgrade = async () => {
    if (!selectedPlan) return alert("Select a plan first");
    setIsSubmitting(true);

    try {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      const res = await fetch(`${API_BASE_URL}/api/payments/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ planName: selectedPlan }),
      });

      const data = await res.json();
      if (!data.success || !data.order) {
        throw new Error(data.error || "Failed to create payment order");
      }

      const { order } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CareerGenAI",
        description: `Premium Upgrade - ${selectedPlan}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${API_BASE_URL}/api/payments/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  planName: selectedPlan,
                }),
              },
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert(
                `🎉 Account successfully upgraded to Premium (${selectedPlan})!`,
              );
              window.location.reload();
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error verifying payment signature.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.mobile || "",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Checkout initialization failed:", err);
      alert(err.message || "Failed to initiate payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative overflow-hidden my-auto border border-slate-100">
        {/* Top Decorative Gradient Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
          aria-label="Close interface"
        >
          <FaTimes size={18} />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
              <FaCrown className="text-amber-500" size={26} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Upgrade to Premium
              </h2>
              <p className="text-sm text-slate-500 hidden sm:block">
                Unlock expert-built AI pipelines designed to fast-track your
                career goals.
              </p>
            </div>
          </div>

          {/* Master Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Account Plan and Perks Info */}
            <div className="md:col-span-5 bg-gradient-to-b from-indigo-50/70 to-slate-50/40 border border-indigo-100/80 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-slate-800 font-bold text-sm tracking-wider uppercase flex items-center gap-2 mb-3">
                  <FaUserShield className="text-indigo-600" /> Account Status
                </h3>

                {isPremium ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-800 text-xs font-medium">
                    <span className="font-bold flex items-center gap-1.5 text-sm text-emerald-700">
                      ✨ Premium Active
                    </span>
                    <span className="opacity-90 block mt-0.5">
                      Expires: {new Date(expiry).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 text-slate-600 text-sm font-medium flex items-center gap-2">
                    <FaTimesCircle className="text-slate-400" /> Free Plan
                    Active
                  </div>
                )}

                <h4 className="text-indigo-950 font-bold text-sm mt-6 mb-3">
                  Premium Tier Includes:
                </h4>
                <ul className="text-slate-600 text-sm space-y-2.5 font-medium">
                  {[
                    "AI Career Assessment",
                    "Skill & Personality Analysis",
                    "Career Comparison Tool",
                    "24/7 Premium AI Chatbot",
                    "Full Career Roadmaps",
                    "Profile & ATS Resume Builder",
                    "Scholarship Explorer Engine",
                    "1:1 Career Counselling Access",
                  ].map((feature) => (
                    <li key={feature} className="flex gap-2.5 items-start">
                      <FaCheckCircle className="text-indigo-600 text-xs mt-1 shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Checkout & Billing Packages */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-slate-900 font-bold text-base mb-3">
                  Select Billing Cycle
                </h3>

                {/* Grid Framework for Packages */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "1 Month", price: prices["1 Month"] },
                    { name: "2 Months", price: prices["2 Months"] },
                    {
                      name: "3 Months",
                      price: prices["3 Months"],
                      featured: true,
                    },
                  ]
                    .filter((p) => plansStatus[p.name] !== false)
                    .map((p) => {
                      const isSelected = selectedPlan === p.name;
                      return (
                        <div
                          key={p.name}
                          onClick={() => setSelectedPlan(p.name)}
                          className={`
                            relative flex flex-col justify-center p-4 rounded-xl border-2 cursor-pointer text-center
                            transition-all duration-200 select-none
                            ${
                              isSelected
                                ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }
                          `}
                        >
                          {p.featured && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-sm">
                              Best Value
                            </span>
                          )}
                          <h4 className="text-slate-700 font-bold text-sm">
                            {p.name}
                          </h4>
                          <p className="text-indigo-600 font-extrabold text-xl mt-1">
                            ₹{p.price}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Action Button Segment */}
              <div className="mt-6 md:mt-0">
                <button
                  disabled={!selectedPlan || isSubmitting}
                  onClick={handleUpgrade}
                  className={`
                    w-full py-3.5 rounded-xl text-white font-bold tracking-wide shadow-md
                    transition-all duration-150 transform active:scale-[0.99]
                    ${
                      selectedPlan && !isSubmitting
                        ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                        : "bg-slate-300 cursor-not-allowed shadow-none"
                    }
                  `}
                >
                  {isSubmitting
                    ? "Processing Payment..."
                    : `Upgrade with Razorpay`}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2.5">
                  Secure encrypted transaction processing. Terms & Refund
                  policies apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
