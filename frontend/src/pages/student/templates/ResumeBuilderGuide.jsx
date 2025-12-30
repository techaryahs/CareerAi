import React from "react";
import { motion } from "framer-motion";

export default function ResumeBuilderGuide() {
  const steps = [
    {
      title: "1️⃣ Choose the Right Format",
      description:
        "Use a clean, modern format. Stick to PDF. Use clear headings: Summary, Skills, Experience, Education, Projects.",
    },
    {
      title: "2️⃣ Add a Strong Header",
      description:
        "Include your name, phone, email, LinkedIn, and portfolio link. Make it easy for recruiters to contact you.",
    },
    {
      title: "3️⃣ Write a Concise Summary",
      description:
        "In 2–3 lines, explain who you are, your experience, and what role you’re targeting. Keep it focused.",
    },
    {
      title: "4️⃣ Highlight Skills Clearly",
      description:
        "List 6–10 key skills relevant to the job. Use commas to separate and choose keywords from the job description.",
    },
    {
      title: "5️⃣ Add Relevant Experience",
      description:
        "List recent jobs first. Add company name, role, duration, and key achievements in bullet points.",
    },
    {
      title: "6️⃣ Show Projects & Achievements",
      description:
        "Add personal or professional projects. Use metrics and results to show your impact.",
    },
    {
      title: "7️⃣ Include Education & Certifications",
      description:
        "Add your degrees, institution names, years. Mention any relevant certifications that add value.",
    },
    {
      title: "8️⃣ Keep it One Page",
      description:
        "Unless you have 10+ years of experience, stick to one page. Be concise and clear.",
    },
    {
      title: "9️⃣ Use Keywords",
      description:
        "Mirror the job description keywords in your resume to pass ATS (Applicant Tracking Systems).",
    },
    {
      title: "🔟 Proofread & Update",
      description:
        "Check grammar, spelling, and alignment. Keep it updated for every new application.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        📄 Build an Impressive Resume
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-8"
      >
        Follow these practical steps to craft a professional resume that gets shortlisted and helps you stand out.
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
          ✅ Tailor your resume for each job. Good resumes open doors!
        </p>
        <a
          href="/resume-templates"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Build Your Resume Now
        </a>
      </div>
    </div>
  );
}
