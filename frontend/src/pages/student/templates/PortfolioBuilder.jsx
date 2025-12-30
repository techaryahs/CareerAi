// src/pages/templates/PortfolioBuilder.jsx
import React from "react";
import { motion } from "framer-motion";

export default function PortfolioBuilder() {
  const steps = [
    {
      title: "1️⃣ Choose a Platform",
      description:
        "Use simple builders like Wix, WordPress, or code your own with React, Next.js, or HTML/CSS.",
    },
    {
      title: "2️⃣ Add a Strong Homepage",
      description:
        "Your homepage should have your name, tagline, and a friendly photo. First impression matters!",
    },
    {
      title: "3️⃣ Write About You",
      description:
        "Add an About section with a short intro, your mission, and a bit about your background.",
    },
    {
      title: "4️⃣ Showcase Projects",
      description:
        "Add 4–6 key projects with screenshots, GitHub links, and short descriptions.",
    },
    {
      title: "5️⃣ List Skills Clearly",
      description:
        "Highlight your main skills with icons or simple lists. Group by category if needed.",
    },
    {
      title: "6️⃣ Add Contact & Social Links",
      description:
        "Make it easy for recruiters to contact you — include email, LinkedIn, GitHub, and other profiles.",
    },
    {
      title: "7️⃣ Make it Responsive",
      description:
        "Ensure your portfolio looks good on mobile & desktop — recruiters often check on phones.",
    },
    {
      title: "8️⃣ Deploy & Share",
      description:
        "Deploy free with GitHub Pages, Netlify, or Vercel. Add the link to your resume and LinkedIn.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        🌐 Build Your Personal Portfolio
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-8"
      >
        Create a beautiful portfolio website that showcases your projects and makes recruiters remember you.
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
          ✅ Keep it updated & share your link everywhere!
        </p>
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Deploy Now
        </a>
      </div>
    </div>
  );
}
