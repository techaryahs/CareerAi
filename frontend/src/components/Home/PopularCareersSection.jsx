import React, { useState, useEffect } from 'react';
import { Code, TrendingUp, Palette, Stethoscope, Calculator, Briefcase, Brain } from 'lucide-react';

const mockCareers = [
  {
    title: "Software Engineer",
    description: "Design and develop software applications, websites, and systems using programming languages and frameworks.",
    icon: Code,
    growth: "22% growth",
    salary: "₹83,00,000"
  },
  {
    title: "Data Scientist",
    description: "Analyze complex data to help organizations make informed business decisions and predictions.",
    icon: TrendingUp,
    growth: "31% growth",
    salary: "₹1,10,00,000"
  },
  {
    title: "UX Designer",
    description: "Create intuitive and engaging user experiences for digital products and applications.",
    icon: Palette,
    growth: "13% growth",
    salary: "₹74,00,000"
  },
  {
    title: "Medical Doctor",
    description: "Diagnose and treat illnesses, injuries, and other health conditions to improve patient outcomes.",
    icon: Stethoscope,
    growth: "7% growth",
    salary: "₹1,83,00,000"
  },
  {
    title: "Financial Analyst",
    description: "Evaluate financial data and market trends to guide investment and business decisions.",
    icon: Calculator,
    growth: "6% growth",
    salary: "₹73,00,000"
  },
  {
    title: "Marketing Manager",
    description: "Develop and execute marketing strategies to promote products and build brand awareness.",
    icon: Briefcase,
    growth: "10% growth",
    salary: "₹1,18,00,000"
  }
];

const CareerCard = ({ career, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative p-8 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
            <career.icon className="w-8 h-8" />
          </div>
          <div className="text-right">
            <div className="text-sm text-green-600 font-semibold">{career.growth}</div>
            <div className="text-sm text-gray-500">{career.salary}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {career.title}
        </h3>

        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
          {career.description}
        </p>

        <div className={`flex items-center text-blue-600 font-semibold transition-all duration-300 ${isHovered ? 'translate-x-2' : ''}`}>
          {/* <span>Learn More</span> */}
          {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
        </div>
      </div>
    </div>
  );
};

const PopularCareersSection = () => {
  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // In a real scenario, this might fetch from API
    // fetch(`${API}/api/careers`)...
    
    // Using mock data for now as per original code simulation or fallback
    setTimeout(() => {
      setCareers(mockCareers);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Popular Career Paths
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore trending careers with high growth potential and competitive salaries
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <CareerCard key={index} career={career} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCareersSection;
