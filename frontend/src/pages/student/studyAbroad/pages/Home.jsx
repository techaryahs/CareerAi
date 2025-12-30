// src/studyAbroad/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <span className="inline-block mb-4 rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700">
            Study Abroad Guidance
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Plan Your <span className="text-indigo-600">Study Abroad</span> Journey
            with Confidence
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Get clear guidance on countries, universities, courses, exams,
            and visas — all tailored to your academic profile and goals.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/services/study-abroad/profile">
              <button className="rounded-full bg-indigo-600 px-8 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition">
                Start Planning
              </button>
            </Link>

            <Link to="/chat">
              <button className="rounded-full border border-slate-300 px-8 py-3 text-slate-700 font-semibold hover:bg-slate-100 transition">
                Talk to a Counsellor
              </button>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="rounded-3xl bg-white shadow-xl border p-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              What you’ll get
            </h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                Country & course recommendations
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                University shortlisting
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                Exam & eligibility guidance
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                Visa checklist & timeline
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                Personalized action plan
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= TRUST STATS ================= */}
      <section className="bg-slate-50 border-t border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-slate-900">7+</p>
            <p className="mt-2 text-sm text-slate-600">Top Study Destinations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">100+</p>
            <p className="mt-2 text-sm text-slate-600">University Options</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">Step-by-Step</p>
            <p className="mt-2 text-sm text-slate-600">Admission Roadmap</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">AI + Expert</p>
            <p className="mt-2 text-sm text-slate-600">Guidance Model</p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center">
          How It Works
        </h2>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          A simple, transparent process to take you from confusion to clarity.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Share Your Profile",
              desc: "Tell us your education, budget, and study goals."
            },
            {
              step: "02",
              title: "Explore Options",
              desc: "Compare countries, courses, and universities."
            },
            {
              step: "03",
              title: "Get Your Plan",
              desc: "Receive a clear admission & visa roadmap."
            }
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm font-semibold text-indigo-600">
                STEP {item.step}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Start Your Study Abroad Journey Today
          </h2>
          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
            Make informed decisions with structured guidance, not guesswork.
          </p>

          <Link to="/services/study-abroad/profile">
            <button className="mt-8 rounded-full bg-white px-10 py-3 text-indigo-700 font-semibold shadow-lg hover:bg-slate-100 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
