import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/PageLoader/PageLoader"; // ✅ Make sure you have this component!

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);

  const guides = [
    {
      id: "linkedin",
      title: "Build a Strong LinkedIn Profile",
      description:
        "Step-by-step tips to craft a standout LinkedIn profile. Keywords, photo, headline, summary, and more.",
      link: "/templates/linkedin-builder",
    },
    {
      id: "naukri",
      title: "Create an Impressive Naukri.com Profile",
      description:
        "Guidelines to boost your visibility on job boards. How to write experience, skills, and stand out.",
      link: "/templates/naukri-builder",
    },
    {
      id: "resume",
      title: "Build a Professional Resume",
      description:
        "Use our AI-powered Resume Builder to create modern, clean resumes using ready templates.",
      link: "/templates/resume-builder-guide",
    },
    {
      id: "github",
      title: "Boost Your GitHub Profile",
      description:
        "Step-by-step checklist to make your GitHub stand out with pinned repos, README, and open-source contributions.",
      link: "/templates/github-builder",
    },
    {
      id: "portfolio",
      title: "Build Your Portfolio Website",
      description:
        "Guide to create a personal website showcasing your projects, skills, and contact info — impress employers easily.",
      link: "/templates/portfolio-builder",
    },
    {
      id: "coverletter",
      title: "Create a Winning Cover Letter",
      description:
        "Step-by-step guide to craft a personalized cover letter that impresses recruiters and complements your resume.",
      link: "/templates/coverletter-builder",
    },
  ];

  // ✅ Simulate load for the loader to show up smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800); // adjust delay if you like
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) return <Loader />; // ✅ Use your shared loader

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
        🧩 Profile Builder Hub
      </h1>
      <p className="text-lg md:text-xl mb-12 text-center text-blue-800 max-w-2xl">
        Build your professional presence with easy-to-follow guides. Boost your
        job search with strong, modern profiles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {guides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => {
              navigate(guide.link);
              window.scrollTo(0, 0);
            }}
            className="group bg-white rounded-xl shadow-md p-6 cursor-pointer transform transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-bold mb-2 text-blue-900 group-hover:text-blue-700">
              {guide.title}
            </h2>
            <p className="text-gray-700 mb-4">{guide.description}</p>
            <span className="inline-block text-purple-800 font-semibold group-hover:underline">
              Get Started →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
