import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/PageLoader/PageLoader";
import PremiumPopup from "../../../components/PremiumPlans/PremiumPlans";

import template1Img from "../../../assets/template/resume1.png";
import template2Img from "../../../assets/template/resume2.png";
import template3Img from "../../../assets/template/resume3.png";

import { useAuth } from "../../../context/AuthContext";

const premiumImages = [
  "/template 1.png",
  "/template 2.png",
  "/template 3.png",
  "/template 4.png",
  "/template 5.png",
  "/template 6.png",
];

export default function ResumeTemplateSelector() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const { user } = useAuth();
  const isPremium = user?.isPremium || false;

  const handleSelectTemplate = (templateId, isLocked) => {
    if (isLocked && !isPremium) {
      setShowPopup(true);
    } else {
      navigate(`/resume-builder/${templateId}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-blue-50 to-white">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: fit-content;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {showPopup && <PremiumPopup onClose={() => setShowPopup(false)} />}

      <h1 className="text-4xl font-bold text-blue-700 mt-10 mb-4 text-center">
        🎨 Pick Your Resume Template
      </h1>
      <p className="text-gray-600 max-w-xl text-center mb-10">
        Choose a design style that fits your personality & career.
      </p>

      {/* --- FREE TEMPLATES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        <div onClick={() => handleSelectTemplate(1, false)} className="group cursor-pointer relative p-8 border-2 border-blue-600 rounded-xl shadow-lg bg-white overflow-hidden transition-transform duration-300 transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">✨ Modern Clean</h2>
          <p className="text-gray-600 mb-4">Crisp blue lines, clean sections.</p>
          <img src={template1Img} alt="Modern" className="w-full h-auto rounded shadow mb-4" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full">Use Template</button>
        </div>

        <div onClick={() => handleSelectTemplate(2, false)} className="group cursor-pointer relative p-8 border-2 border-gray-700 rounded-xl shadow-lg bg-white overflow-hidden transition-transform duration-300 transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📜 Professional</h2>
          <p className="text-gray-600 mb-4">Elegant serif fonts and neutral tones.</p>
          <img src={template2Img} alt="Classic" className="w-full h-auto rounded shadow mb-4" />
          <button className="px-4 py-2 bg-gray-800 text-white rounded-full">Use Template</button>
        </div>

        <div onClick={() => handleSelectTemplate(3, false)} className="group cursor-pointer relative p-8 border-2 border-purple-600 rounded-xl shadow-lg bg-white overflow-hidden transition-transform duration-300 transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">🎨 Creative</h2>
          <p className="text-gray-600 mb-4">Colorful, visual-first design.</p>
          <img src={template3Img} alt="Creative" className="w-full h-auto rounded shadow mb-4" />
          <button className="px-4 py-2 bg-purple-600 text-white rounded-full">Use Template</button>
        </div>
      </div>

      {/* --- FULL WIDTH PREMIUM SECTION --- */}
      <div className="w-full max-w-5xl">
        <div
          onClick={() => isPremium ? navigate("/AllComponents/executive") : setShowPopup(true)}
          className="group cursor-pointer relative p-6 md:p-10 border-2 border-yellow-500 rounded-2xl shadow-xl bg-white overflow-hidden transition-all duration-300 transform hover:shadow-2xl"
        >
          {!user.isPremium && (
            <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4 text-center">
              <span className="text-5xl mb-4 animate-bounce">🔒</span>
              <h3 className="text-3xl font-bold">Premium Template Library</h3>
              <p className="text-lg mt-2 opacity-90">Unlock 50+ Executive layouts designed for high-earning roles</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-yellow-700 flex items-center gap-2">
                🏆 Executive Pro Library
              </h2>
              <p className="text-gray-600">Exclusive templates for senior and specialized positions.</p>
            </div>
            <span className="bg-yellow-500 text-white px-6 py-2 rounded-full font-bold shadow-md">
              PRO ACCESS
            </span>
          </div>

          {/* MARQUEE CONTAINER (FULL WIDTH) */}
          <div className="relative w-full h-56 bg-gray-50 rounded-xl overflow-hidden border border-yellow-100 mb-6">
            <div className="animate-marquee flex gap-4 p-4">
              {[...premiumImages, ...premiumImages, ...premiumImages].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="h-48 w-36 object-cover rounded-lg shadow-md border border-gray-200 transition-transform hover:scale-105"
                />
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          </div>

          <button className={`w-full py-4 rounded-xl text-xl font-bold shadow-lg transition-all bg-yellow-600 text-white`}>
            {isPremium ? "Explore Executive Templates" : "Upgrade to Pro Now"}
          </button>
        </div>
      </div>

      <p className="mt-16 text-sm text-gray-500 text-center">
        ✨ Pro Tip: You can explore all templates & switch anytime!
      </p>
    </div>
  );
}