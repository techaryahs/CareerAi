// src/components/Terms/TermsCondition.jsx

import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Scale,
  Lock,
  BadgeCheck,
  Info,
  UserCheck,
  ChevronDown,
} from "lucide-react";

const TERMS = [
  {
    icon: <ShieldCheck size={22} />,
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    border: "hover:border-indigo-500/40",
    title: "Acceptance of Terms",
    desc: "By accessing CareerGenAI, you agree to follow all applicable laws, policies, and platform guidelines.",
  },
  {
    icon: <FileText size={22} />,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    border: "hover:border-purple-500/40",
    title: "Services Provided",
    desc: "AI-powered career guidance, mentorship, educational support, and resume tools to help you grow.",
  },
  {
    icon: <AlertTriangle size={22} />,
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
    border: "hover:border-rose-500/40",
    title: "User Responsibilities",
    desc: "Users must provide accurate information and avoid misuse, fraud, or any harmful activity on the platform.",
  },
  {
    icon: <Lock size={22} />,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    border: "hover:border-cyan-500/40",
    title: "Payments & Refunds",
    desc: "Paid services are subject to platform pricing and refund policies depending on service type.",
  },
  {
    icon: <BadgeCheck size={22} />,
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-400",
    border: "hover:border-yellow-500/40",
    title: "Intellectual Property",
    desc: "All branding, content, and platform designs belong exclusively to CareerGenAI and are fully protected.",
  },
  {
    icon: <Scale size={22} />,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    border: "hover:border-red-500/40",
    title: "Limitation of Liability",
    desc: "CareerGenAI is not liable for admission, placement, or career outcomes based on its recommendations.",
  },
];

const FAQS = [
  {
    q: "Can CareerGenAI guarantee admissions?",
    a: "No. We provide guidance and recommendations, but admissions and placements depend on external institutions and user performance. Our role is to support, not guarantee outcomes.",
  },
  {
    q: "Can terms change in the future?",
    a: "Yes. CareerGenAI reserves the right to update platform policies and terms whenever necessary. Users will be notified of significant changes via their registered email.",
  },
  {
    q: "How do I report a violation or concern?",
    a: "You can contact our support team through the platform's help center. We take all reports seriously and aim to respond within 48 hours.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((v) => !v)}
      className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        open
          ? "bg-white/[0.08] border-purple-500/40"
          : "bg-white/5 border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06]"
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

const TermsCondition = () => {
  return (
    <div className="min-h-screen bg-[#020B24] text-white overflow-hidden">

      {/* ── HERO ── */}
      <div className="relative py-24 px-6 md:px-20 text-center border-b border-white/[0.08] overflow-hidden">

        {/* radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.28) 0%, rgba(168,85,247,0.15) 50%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/35 rounded-full px-4 py-1.5 text-xs text-indigo-300 tracking-wide mb-6">
            <ShieldCheck size={13} />
            Legal Document
          </div>

          {/* icon */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-7 shadow-2xl">
            <Scale size={36} />
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-5 tracking-tight leading-none">
            Terms &{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>

          <p className="text-lg text-white/50 leading-relaxed max-w-lg mx-auto">
            Please carefully review the terms governing your use of CareerGenAI
            services and platform.
          </p>

        </div>
      </div>

      {/* ── TERMS CARDS ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pt-16 pb-4">

        <p className="text-[11px] tracking-[2px] uppercase text-white/30 mb-7">
          Platform Terms
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TERMS.map((item, i) => (
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

      {/* ── IMPORTANT NOTICE ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-10">
        <div
          className="rounded-2xl border border-purple-500/25 p-7 flex items-start gap-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(168,85,247,0.10))",
          }}
        >
          <Info size={22} className="text-violet-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[15px] font-semibold text-violet-300 mb-2">
              Important Notice
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed">
              CareerGenAI provides AI-powered recommendations, educational
              insights, and mentorship support to assist users in making
              informed decisions. Final educational, financial, and career
              decisions remain solely the responsibility of the user.
            </p>
          </div>
        </div>
      </div>

      {/* ── TWO-COL INFO ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pb-10">
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
              <UserCheck size={18} className="text-violet-400" />
              User Agreement
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed mb-3">
              By continuing to use CareerGenAI, users acknowledge that they
              have read, understood, and agreed to all platform terms and
              guidelines.
            </p>
            <p className="text-[13px] text-white/50 leading-relaxed">
              CareerGenAI reserves the right to suspend accounts or restrict
              access in cases of misuse, fraud, or policy violations.
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
              <Lock size={18} className="text-cyan-400" />
              Platform Security
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed mb-3">
              We implement modern technologies and secure systems to ensure a
              safe and reliable user experience across all devices.
            </p>
            <p className="text-[13px] text-white/50 leading-relaxed">
              Users are responsible for maintaining the confidentiality of
              their login credentials and account information.
            </p>
          </div>

        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pb-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

      </div>

      {/* ── FOOTER STRIP ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pb-12">
        <div className="border-t border-white/[0.08] pt-6 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-white/25">
            © 2025 CareerGenAI. All rights reserved.
          </span>
          <span className="text-[11px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 rounded-full px-3 py-1">
            v2.1 — Last updated Jan 2025
          </span>
        </div>
      </div>

    </div>
  );
};

export default TermsCondition;