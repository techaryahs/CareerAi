// src/pages/LinkedInBuilder.jsx
import React from "react";
import { motion } from "framer-motion";

const LinkedInBuilder = () => {
  const steps = [
    {
      title: "1️⃣ Set a Professional Profile Photo",
      desc:
        "Use a clear, high-resolution headshot with good lighting. Smile! Avoid selfies or casual group shots.",
    },
    {
      title: "2️⃣ Write a Compelling Headline",
      desc:
        "Your headline should show your role, expertise, or what you’re looking for. Example: 'Frontend Developer | React | Open to Opportunities'",
    },
    {
      title: "3️⃣ Craft an Engaging Summary",
      desc:
        "Write a short ‘About’ section highlighting your skills, experience & what makes you unique. Use first person ('I am a...').",
    },
    {
      title: "4️⃣ Add Detailed Work Experience",
      desc:
        "List your current and past roles. Include key responsibilities & achievements for each. Use bullet points for clarity.",
    },
    {
      title: "5️⃣ Highlight Education & Certifications",
      desc:
        "Add your degrees, institutions, and any certifications. This builds trust and shows your qualifications.",
    },
    {
      title: "6️⃣ Showcase Skills",
      desc:
        "Add relevant skills. Prioritize those matched to your industry. Ask connections to endorse you.",
    },
    {
      title: "7️⃣ Customize Your LinkedIn URL",
      desc:
        "Edit your public profile link to something clean & professional: linkedin.com/in/yourname",
    },
    {
      title: "8️⃣ Connect & Build Your Network",
      desc:
        "Connect with classmates, colleagues, and people in your industry. Always add a polite note when sending a request.",
    },
    {
      title: "9️⃣ Get Recommendations",
      desc:
        "Ask mentors, managers, or peers to write recommendations. This boosts credibility.",
    },
    {
      title: "🔟 Be Active & Post Regularly",
      desc:
        "Share your projects, write posts, and comment on others’ content to increase visibility.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        🚀 LinkedIn Profile Builder
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-8"
      >
        Follow this step-by-step guide to build a standout LinkedIn profile
        that attracts recruiters & opportunities.
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
            <p className="text-gray-700">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-500 mb-4">
          ✅ Keep your profile up-to-date. Small improvements make a big impact!
        </p>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Visit LinkedIn Now
        </a>
      </div>
    </div>
  );
};

export default LinkedInBuilder;
