// src/pages/templates/NaukriBuilder.jsx
import React from "react";
import { motion } from "framer-motion";

export default function NaukriBuilder() {
  const steps = [
    {
      title: "1️⃣ Create a Strong Headline",
      description:
        "Use keywords matching your role, skills, and goal. Example: 'Software Developer | React, Node.js | Open to Work'.",
    },
    {
      title: "2️⃣ Write a Powerful Summary",
      description:
        "Highlight your experience, achievements, and skills in 2–3 short paragraphs with relevant keywords.",
    },
    {
      title: "3️⃣ Add Detailed Work Experience",
      description:
        "Include clear job titles, companies, durations, and your impact. Use bullet points for responsibilities.",
    },
    {
      title: "4️⃣ Add Relevant Skills",
      description:
        "List 10–15 skills matching your role. Use trending industry keywords for better discoverability.",
    },
    {
      title: "5️⃣ Upload a Professional Photo",
      description:
        "Use a clear, friendly headshot with a simple background and good lighting.",
    },
    {
      title: "6️⃣ Add Projects & Certifications",
      description:
        "Showcase your work and verified certifications that strengthen your credibility.",
    },
    {
      title: "7️⃣ Update Regularly",
      description:
        "Keep your profile fresh with updated skills, roles, and new certifications.",
    },
    {
      title: "8️⃣ Choose Right Preferences",
      description:
        "Select accurate job categories, preferred cities, and expected salary so recruiters find you easily.",
    },
    {
      title: "9️⃣ Get Recommendations",
      description:
        "Request short testimonials from colleagues, seniors, or mentors to build trust.",
    },
    {
      title: "🔟 Apply & Track",
      description:
        "Use Naukri's dashboard to track applications, respond to recruiters, and follow up.",
    },
  ];

  return (
      <div className="max-w-5xl mx-auto p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          📋 Build Your Naukri.com Profile
        </motion.h1>
  
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-8"
        >
          Follow this easy, practical guide to build a standout Naukri.com profile 
          that attracts recruiters and lands you your dream job.
        </motion.p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
  
        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-4">
            ✅ Keep your profile up-to-date. Small improvements make a big impact!
          </p>
          <a
            href="https://www.naukri.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Visit Naukri.com
          </a>
        </div>
      </div>
    );
}
