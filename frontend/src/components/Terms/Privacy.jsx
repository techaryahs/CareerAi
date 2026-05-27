// src/components/Terms/Privacy.jsx

import React, { useState } from "react";
import {
  Shield,
  Lock,
  Database,
  Eye,
  FileCheck,
  Fingerprint,
  Info,
  ShieldCheck,
  EyeOff,
  Mail,
  ChevronDown,
} from "lucide-react";

const PRIVACY_ITEMS = [
  {
    icon: <Database size={22} />,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    border: "hover:border-cyan-500/40",
    title: "Information We Collect",
    desc: "We may collect personal details such as name, email, educational information, and career preferences to serve you better.",
  },
  {
    icon: <Lock size={22} />,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    border: "hover:border-blue-500/40",
    title: "Data Protection",
    desc: "Modern encryption and secure technologies are used to safeguard all user information stored on our platform.",
  },
  {
    icon: <Eye size={22} />,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    border: "hover:border-purple-500/40",
    title: "Use of Information",
    desc: "Your data helps us personalize recommendations and continuously improve your platform experience.",
  },
  {
    icon: <FileCheck size={22} />,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    border: "hover:border-emerald-500/40",
    title: "Third-Party Services",
    desc: "Trusted third-party tools may be used for analytics, payments, and communication purposes only.",
  },
  {
    icon: <Fingerprint size={22} />,
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
    border: "hover:border-pink-500/40",
    title: "Cookies & Tracking",
    desc: "Cookies may be used to improve functionality and analyze platform usage patterns anonymously.",
  },
  {
    icon: <Shield size={22} />,
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-400",
    border: "hover:border-yellow-500/40",
    title: "User Rights",
    desc: "Users may request correction or deletion of personal information at any time through our support team.",
  },
];

const FAQS = [
  {
    q: "Is my personal data sold to third parties?",
    a: "No. CareerGenAI never sells your personal information to unauthorized parties. Data is only shared with trusted service providers necessary to operate the platform.",
  },
  {
    q: "How can I request deletion of my data?",
    a: "You can reach out to our support team at careergenai9@gmail.com with a deletion request. We process all such requests within 7 business days.",
  },
  {
    q: "How long is my data retained?",
    a: "We retain your data for as long as your account is active or as required by law. You may request early deletion at any time.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((v) => !v)}
      className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        open
          ? "bg-white/[0.08] border-cyan-500/40"
          : "bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-slate-200">{q}</span>
        <ChevronDown
          size={16}
          className={`text-white/30 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <p className="text-sm text-white/50 leading-relaxed mt-4">{a}</p>
      )}
    </div>
  );
}

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#020B24] text-white overflow-hidden">

      {/* ── HERO ── */}
      <div className="relative py-24 px-6 md:px-20 text-center border-b border-white/[0.08] overflow-hidden">

        {/* radial glow — cyan/blue tone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.22) 0%, rgba(37,99,235,0.15) 50%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/35 rounded-full px-4 py-1.5 text-xs text-cyan-300 tracking-wide mb-6">
            <ShieldCheck size={13} />
            Privacy & Data
          </div>

          {/* icon */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-7 shadow-2xl">
            <Shield size={36} />
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-5 tracking-tight leading-none">
            Privacy{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="text-lg text-white/50 leading-relaxed max-w-lg mx-auto">
            Protecting your personal information and maintaining
            transparency is our highest priority.
          </p>

        </div>
      </div>

      {/* ── PRIVACY CARDS ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pt-16 pb-4">

        <p className="text-[11px] tracking-[2px] uppercase text-white/30 mb-7">
          Data Practices
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PRIVACY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 cursor-default ${item.border} hover:bg-white/[0.07]`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-[13px] text-white/50 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── YOUR PRIVACY MATTERS NOTICE ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-10">
        <div
          className="rounded-2xl border border-cyan-500/25 p-7 flex items-start gap-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,182,212,0.09), rgba(37,99,235,0.09))",
          }}
        >
          <Info size={22} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[15px] font-semibold text-cyan-300 mb-2">
              Your Privacy Matters
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed">
              CareerGenAI is committed to maintaining user trust through secure
              systems, transparent policies, and responsible data management
              practices across every touchpoint of the platform.
            </p>
          </div>
        </div>
      </div>

      {/* ── TWO-COL INFO ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pb-10">
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
              <Eye size={18} className="text-cyan-400" />
              Transparency
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed">
              CareerGenAI believes in complete transparency regarding how user
              information is collected, processed, and utilized across every
              part of the platform.
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
              <EyeOff size={18} className="text-blue-400" />
              Data Confidentiality
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed">
              Personal information is never sold to unauthorized parties and is
              handled with strict confidentiality and security standards at all
              times.
            </p>
          </div>

        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pb-12">

        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

      </div>

      {/* ── CONTACT ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pb-16">
        <div
          className="rounded-2xl border border-white/[0.08] p-10 text-center"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center mx-auto mb-5">
            <Mail size={22} className="text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
          <p className="text-[13px] text-white/50 mb-5">
            For privacy-related concerns or support queries, reach out to us:
          </p>
          <a
            href="mailto:careergenai9@gmail.com"
            className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/35 rounded-full px-6 py-2.5 text-sm text-cyan-300 font-semibold tracking-wide hover:bg-cyan-500/25 transition-colors duration-200"
          >
            <Mail size={15} />
            careergenai9@gmail.com
          </a>
        </div>
      </div>

      {/* ── FOOTER STRIP ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pb-12">
        <div className="border-t border-white/[0.08] pt-6 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-white/25">
            © 2025 CareerGenAI. All rights reserved.
          </span>
          <span className="text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-3 py-1">
            v2.1 — Last updated Jan 2025
          </span>
        </div>
      </div>

    </div>
  );
};

export default Privacy;