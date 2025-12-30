import React, { useState } from "react";
import {
  FaCrown,
  FaCheckCircle,
  FaUserShield,
  FaTimesCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import QrPopup from "./QrPopup";

export default function PremiumPopup({ onClose, onUpgrade }) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showQrPopup, setShowQrPopup] = useState(false);

  const isPremium = user?.premium?.isPremium;
  const expiry = user?.premium?.expiryDate;

  const activate = () => {
    const map = {
      "1 Month": "1month",
      "2 Months": "2months",
      "3 Months": "3months",
    };
    const plan = map[selectedPlan];
    if (!plan) return alert("Select a plan first");

    fetch(`${process.env.REACT_APP_API_URL}/api/premium/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, plan }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) window.location.reload();
      });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* SMALL HORIZONTAL POPUP */}
      <div
        className="
        bg-white w-[92%] max-w-[900px] 
        rounded-2xl 
        border-[3px] border-[#E8C547] 
        shadow-xl p-6 relative
      "
      >
        {/* CLOSE */}
        <span
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 text-2xl cursor-pointer hover:text-black"
        >
          &times;
        </span>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <FaCrown className="text-[#E8C547]" size={35} />
          <h2 className="text-2xl font-bold text-blue-700">
            Upgrade to Premium
          </h2>
        </div>

        {/* FULL HORIZONTAL LAYOUT */}
        <div className="flex gap-6">
          {/* LEFT SIDE — CURRENT PLAN + FEATURES */}
          <div className="w-1/2 bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <h3 className="text-blue-700 font-bold flex items-center gap-2">
              <FaUserShield /> Your Plan
            </h3>

            {/* PLAN STATUS */}
            {isPremium ? (
              <p className="text-green-600 mt-1 text-sm">
                ⭐ Premium Active <br />
                Expires: {new Date(expiry).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-red-600 mt-1 text-sm flex items-center gap-1">
                <FaTimesCircle /> Free Plan
              </p>
            )}

            {/* FEATURES */}
            <h4 className="text-blue-700 font-semibold mt-4 mb-2">
              Premium Includes:
            </h4>
            <ul className="text-gray-700 text-sm space-y-1">
              {[
                "AI Career Assessment",
                "Skill & Personality Analysis",
                "Career Comparison Tool",
                "24/7 AI Chatbot",
                "Full Career Roadmaps",
                "Profile Builder",
                "Scholarship Finder",
                "ATS Resume Builder",
                "1:1 Career Counselling",
              ].map((f) => (
                <li key={f} className="flex gap-2 items-center">
                  <FaCheckCircle className="text-blue-600 text-xs" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE — PLANS */}
          <div className="w-1/2 flex flex-col justify-between">
            <h3 className="text-blue-700 font-semibold mb-3">Choose a Plan</h3>

            {/* HORIZONTAL PLANS INSIDE RIGHT SIDE */}
            <div className="flex gap-3">
              {[
                { name: "1 Month", price: "₹1999" },
                { name: "2 Months", price: "₹2999" },
                { name: "3 Months", price: "₹3999" },
              ].map((p) => (
                <div
                  key={p.name}
                  onClick={() => setSelectedPlan(p.name)}
                  className={`
                    flex-1 p-4 rounded-lg border cursor-pointer text-center
                    transition duration-200
                    ${
                      selectedPlan === p.name
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 bg-gray-50"
                    }
                  `}
                >
                  <h4 className="text-blue-700 font-semibold text-sm">
                    {p.name}
                  </h4>
                  <p className="text-blue-600 font-bold text-lg">{p.price}</p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button
              disabled={!selectedPlan}
              onClick={() => setShowQrPopup(true)}
              className={`
                w-full py-3 mt-4 rounded-lg text-white font-bold
                ${
                  selectedPlan
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* QR POPUP */}
      {showQrPopup && (
        <QrPopup
          selectedPlan={selectedPlan}
          onClose={() => setShowQrPopup(false)}
          onConfirm={activate}
        />
      )}
    </div>
  );
}
