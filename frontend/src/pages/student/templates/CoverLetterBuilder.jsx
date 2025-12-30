// src/pages/templates/CoverLetterBuilder.jsx

import React from "react";
import { motion } from "framer-motion";

export default function CoverLetterBuilder() {
  const steps = [
    {
      title: "1️⃣ Research the Company",
      description:
        "Understand the company's mission, values, and recent projects. Tailor your letter to show you fit in.",
    },
    {
      title: "2️⃣ Address the Hiring Manager",
      description:
        "Whenever possible, use the hiring manager’s name instead of a generic greeting.",
    },
    {
      title: "3️⃣ Craft a Strong Opening",
      description:
        "Grab attention with a compelling first line — show enthusiasm for the role.",
    },
    {
      title: "4️⃣ Highlight Relevant Skills",
      description:
        "Match your top skills and achievements to the job description. Be specific and concise.",
    },
    {
      title: "5️⃣ Show Cultural Fit",
      description:
        "Share why you’re excited to work at this company in particular.",
    },
    {
      title: "6️⃣ Add a Clear Closing",
      description:
        "Wrap up with a confident call-to-action — express readiness for an interview.",
    },
    {
      title: "7️⃣ Proofread & Format",
      description:
        "Check spelling, grammar, and keep it to one page. Use a professional font and clear layout.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        📝 Build Your Cover Letter
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-8"
      >
        Follow these steps to write a compelling, tailored cover letter that
        gets noticed.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg border-l-4 border-green-600"
          >
            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-500 mb-4">
          ✅ Make each cover letter unique for each application!
        </p>
        <a
          href="https://www.indeed.com/career-advice/resume-cover-letter/how-to-write-a-cover-letter"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          See More Tips
        </a>
      </div>
    </div>
  );
}
