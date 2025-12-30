import React from 'react';
import { Lightbulb, Brain, BookOpen } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Share Your Interests",
      description: "Tell us what you love—be it coding, art, helping others, or solving complex problems.",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Get AI Suggestions",
      description: "Our advanced AI analyzes your profile and matches you with suitable careers and roadmaps.",
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 3,
      title: "Explore Opportunities",
      description: "Browse top courses, colleges, and career growth options tailored to your goals.",
      icon: BookOpen,
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent platform guides you through a personalized journey to discover your ideal career path
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${step.color} mb-4 text-center`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-400">
                  {/* <ChevronRight className="w-8 h-8" /> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
