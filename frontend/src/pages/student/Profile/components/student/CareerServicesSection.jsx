import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Brain,
  Compass,
  Target,
  MessageCircle,
  FileText,
  UserCheck,
  BarChart3,
} from "lucide-react";

const items = [
  {
    title: "Interest Assessment",
    desc: "Identify your strengths through structured psychometric assessments.",
    icon: <Brain className="w-7 h-7 text-indigo-600" />,
    path: "/careerQuiz",
  },
  {
    title: "Explore Your Interests",
    desc: "Discover domains aligned with your passion and personality.",
    icon: <Compass className="w-7 h-7 text-blue-600" />,
    path: "/interest-form",
  },
  {
    title: "Resume Building",
    desc: "Create a strong, ATS-optimized professional resume.",
    icon: <FileText className="w-7 h-7 text-orange-600" />,
    path: "/resume-templates",
  },
  {
    title: "Career Guidance",
    desc: "Receive expert recommendations tailored to your goals.",
    icon: <Target className="w-7 h-7 text-emerald-600" />,
    path: "/student-guidance",
  },
  {
    title: "Career Counseling",
    desc: "Book one-on-one mentoring sessions with certified professionals.",
    icon: <MessageCircle className="w-7 h-7 text-purple-600" />,
    path: "/consult",
  },
  {
    title: "Find a Tutor",
    desc: "Connect with experienced tutors for personalized learning.",
    icon: <UserCheck className="w-7 h-7 text-teal-600" />,
    path: "/edu",
  },
  {
    title: "Career Comparison",
    desc: "Compare career paths based on growth, salary, and scope.",
    icon: <BarChart3 className="w-7 h-7 text-rose-600" />,
    path: "/compare",
  },
];

const CareerGrowthGuidanceSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-24">
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        Career Growth &amp; Guidance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="
              h-full bg-white border border-gray-100 rounded-3xl
              px-2 py-5 shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              cursor-pointer flex flex-col justify-between
            "
          >
            {/* Top */}
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {item.title}
                </p>
                <p className="text-base text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>

           
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerGrowthGuidanceSection;
