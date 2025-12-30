// import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, Wallet } from "lucide-react";

export default function EduHome() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Find the right tutor, fast</h1>
        <p className="text-gray-600 max-w-2xl">
          Book expert tutors for your exact branch and semester. Transparent pricing, flexible slots.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/career")}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/career")}
          className="px-8 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-all"
        >
          Explore Careers
        </button>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-6 bg-white border rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Curated Tutors</h3>
          </div>
          <p className="text-sm text-gray-600">Rated and reviewed mentors across domains.</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Flexible Scheduling</h3>
          </div>
          <p className="text-sm text-gray-600">Pick slots that fit your routine.</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Transparent Pricing</h3>
          </div>
          <p className="text-sm text-gray-600">Know your costs upfront, no surprises.</p>
        </div>
      </div>
    </div>
  );
}
