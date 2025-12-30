// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-md px-6 py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 animate-fade-in-up">
          Dropped out?
        </h1>
        <p className="mt-4 text-gray-600 text-sm md:text-base animate-fade-in-up-delay-1">
          You are not a failure — you just need a new direction, and we will find it together.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
          <Link to="/services/dropout/info">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-8 py-2.5 text-sm md:text-base shadow-md transition-all hover:scale-105">
              Start Now
            </button>
          </Link>

          <button className="border border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-semibold rounded-full px-8 py-2.5 text-sm md:text-base transition-all hover:scale-105">
            Ask Counsellor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
