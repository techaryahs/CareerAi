import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Amit Pandey",
    role: "Computer Science Student",
    content: "CareerGenAI helped me discover my passion for AI and machine learning. The personalized guidance was invaluable!",
    rating: 5
  },
  {
    name: "Shani Sharma",
    role: "Pre-Med Student",
    content: "The career roadmap feature showed me exactly what steps to take. I'm now confidently pursuing medicine.",
    rating: 5
  },
  {
    name: "Rahul Padwal",
    role: "Business Graduate",
    content: "I was confused about my career path after graduation. This platform gave me clarity and direction.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Student Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who found their dream careers with CareerGenAI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
