import React from 'react';
import { Target, BookOpen, Users, MessageCircle } from 'lucide-react';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Target,
      title: "Personalized Guidance",
      description: "AI-powered recommendations combined with human expert insights"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Database",
      description: "500+ career paths, colleges, and entrance exams in our database"
    },
    {
      icon: Users,
      title: "Student-Focused",
      description: "Designed specifically for students from Class 8th to Graduation"
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Real-time AI chat and bookable sessions with career counselors"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose CareerGenAI ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of career guidance with our innovative platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
