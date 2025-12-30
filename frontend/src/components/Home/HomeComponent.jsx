import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import hero_section from "../../assets/hero_section.jpg";
import { useNavigate } from "react-router-dom";

import {
  Brain,
  Target,
  Users,
  BookOpen,
  MessageCircle,
  Star,
  ChevronRight,
  Code,
  Stethoscope,
  Calculator,
  Palette,
  Briefcase,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
} from "lucide-react";

// Mock data for careers
const mockCareers = [
  {
    title: "Software Engineer",
    description:
      "Design and develop software applications, websites, and systems using programming languages and frameworks.",
    icon: Code,
    growth: "22% growth",
    salary: "₹83,00,000",
  },
  {
    title: "Data Scientist",
    description:
      "Analyze complex data to help organizations make informed business decisions and predictions.",
    icon: TrendingUp,
    growth: "31% growth",
    salary: "₹1,10,00,000",
  },
  {
    title: "UX Designer",
    description:
      "Create intuitive and engaging user experiences for digital products and applications.",
    icon: Palette,
    growth: "13% growth",
    salary: "₹74,00,000",
  },
  {
    title: "Medical Doctor",
    description:
      "Diagnose and treat illnesses, injuries, and other health conditions to improve patient outcomes.",
    icon: Stethoscope,
    growth: "7% growth",
    salary: "₹1,83,00,000",
  },
  {
    title: "Financial Analyst",
    description:
      "Evaluate financial data and market trends to guide investment and business decisions.",
    icon: Calculator,
    growth: "6% growth",
    salary: "₹73,00,000",
  },
  {
    title: "Marketing Manager",
    description:
      "Develop and execute marketing strategies to promote products and build brand awareness.",
    icon: Briefcase,
    growth: "10% growth",
    salary: "₹1,18,00,000",
  },
];

const testimonials = [
  {
    name: "Amit Pandey",
    role: "Computer Science Student",
    content:
      "CareerGenAI helped me discover my passion for AI and machine learning. The personalized guidance was invaluable!",
    rating: 5,
  },
  {
    name: "Shani Sharma",
    role: "Pre-Med Student",
    content:
      "The career roadmap feature showed me exactly what steps to take. I'm now confidently pursuing medicine.",
    rating: 5,
  },
  {
    name: "Rahul Padwal",
    role: "Business Graduate",
    content:
      "I was confused about my career path after graduation. This platform gave me clarity and direction.",
    rating: 4,
  },
];

const HomeComponent = () => {
  const [, setCareers] = useState([]);
  const [, setLoading] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  const navigate = useNavigate();

  const heroTexts = ["Dream Career", "Perfect Path", "Future Success"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroTexts.length]);
  // Robust fuzzy matching for career titles
  // const getImageForCareer = (title) => {
  //   const key = title?.toLowerCase().trim();

  //   if (key.includes('software') || key.includes('developer')) return softwareEngineerImg;
  //   if (key.includes('ui') || key.includes('ux') || key.includes('designer')) return uix_designer;
  //   if (key.includes('doctor') || key.includes('medical')) return doctor;
  //   if (key.includes('teacher') || key.includes('educator')) return teacher;
  //   if (key.includes('accountant') || key.includes('ca')) return accountant;
  //   if (key.includes('scientist') || key.includes('data') || key.includes('research')) return research_scientist;
  //   if (key.includes('civil')) return civil;
  //   if (key.includes('journalist') || key.includes('media')) return journalist;
  //   if (key.includes('interior')) return interior_designer;
  //   if (key.includes('analyst') || key.includes('business')) return business_analyst;
  //   if (key.includes('lawyer') || key.includes('legal')) return lawyer;
  //   if (key.includes('chef') || key.includes('cook')) return chef;

  //   return softwareEngineerImg; // Default fallback
  // };

  const API = import.meta.env.VITE_API_URL;

  // console.log(API);

  // useEffect(() => {
  //   fetch(`${API}/api/careers`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCareers(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching careers:", err);
  //       setLoading(false);
  //     });
  // }, [API, setCareers, setLoading]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${hero_section})` }}
        ></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="mb-8 flex items-center justify-center gap-4">
            <Brain className="w-16 h-16 text-blue-400 animate-bounce" />
            {/* <img
    src="/robot.webp"
    alt="Robot Waving"
    className="absolute right-0 top-0 w-20 h-20 bg-[transparent]"
  /> */}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000">
              {heroTexts[currentText]}
            </span>
            <br />
            with AI Guidance
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-6 leading-relaxed text-center"
          >
            <motion.span
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1.2, 0.8, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent font-extrabold"
            >
              Free Admission Counselling
            </motion.span>{" "}
            for Engineering, MBBS, MBA, and Medical Courses.
          </motion.p>

          <div className="text-center">
            <a
              href="/consult"
              className="inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 
          hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all 
          duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center gap-3"
            onClick={() => {
              navigate("/services");
              window.scrollTo(0, 0);
            }}
          >
            <Target className="w-5 h-5" />
            Explore Our Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 
          py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform 
          hover:scale-105 flex items-center gap-3"
            onClick={() => navigate("/chat")}
          >
            <MessageCircle className="w-5 h-5" />
            Chat with AI
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeComponent;
