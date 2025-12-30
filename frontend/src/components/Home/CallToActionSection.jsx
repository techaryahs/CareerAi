import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock } from 'lucide-react';

const CallToActionSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your Journey ?
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Join thousands of students who have discovered their perfect career path with CareerGenAI
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="group bg-white text-blue-600 px-8 py-4 rounded-full \
          font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform 
          hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
            onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
          >
            <CheckCircle className="w-5 h-5" />
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group border-2 border-white text-white px-8 py-4 rounded-full 
          font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 
          transform hover:scale-105 flex items-center justify-center gap-3"
            onClick={() => { navigate('/consult'); window.scrollTo(0, 0); }}
          >
            <Clock className="w-5 h-5" />
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
