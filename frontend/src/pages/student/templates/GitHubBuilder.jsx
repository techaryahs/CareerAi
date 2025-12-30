// src/pages/templates/GitHubBuilder.jsx
import React from "react";
import { motion } from "framer-motion";

export default function GitHubBuilder() {
  const steps = [
    {
      title: "1️⃣ Write a Great Profile README",
      description:
        "Add a README to your GitHub profile — show who you are, your skills, pinned projects, and contact info.",
    },
    {
      title: "2️⃣ Pin Top Repositories",
      description:
        "Pin 4–6 best projects on your profile. Pick diverse repos that show your skills and contributions.",
    },
    {
      title: "3️⃣ Keep Contributions Active",
      description:
        "Make regular commits — even small ones — to keep your green contribution graph healthy.",
    },
    {
      title: "4️⃣ Add Descriptions & Topics",
      description:
        "For each repo, write a short description and add topics/tags. Makes it easier for recruiters to understand.",
    },
    {
      title: "5️⃣ Write Clear README for Projects",
      description:
        "Every repo should have a README with what, why, how to run, and screenshots if needed.",
    },
    {
      title: "6️⃣ Use GitHub Pages",
      description:
        "Host project demos or your portfolio using GitHub Pages for free.",
    },
    {
      title: "7️⃣ Collaborate on Open Source",
      description:
        "Contribute to issues, pull requests, and participate in open-source projects — shows teamwork skills.",
    },
    {
      title: "8️⃣ Add GitHub Actions",
      description:
        "Set up simple CI/CD workflows to stand out for DevOps or automation roles.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        🐙 Build a Killer GitHub Profile
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-8"
      >
        Follow these practical steps to make your GitHub profile a magnet for recruiters and collaborators.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg border-l-4 border-purple-600"
          >
            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-500 mb-4">
          ✅ Keep your GitHub fresh — consistency matters!
        </p>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Visit GitHub
        </a>
      </div>
    </div>
  );
}
