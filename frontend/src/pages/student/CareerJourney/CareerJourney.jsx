import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import JourneyStepper from './components/JourneyStepper';
import ExploreSection from './components/ExploreSection';
import BottomProgressBar from './components/BottomProgressBar';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, title: "Self-Assessment" },
    { id: 2, title: "Exploration" },
    { id: 3, title: "Planning" },
    { id: 4, title: "Execution" }
];

const CareerJourney = () => {
    const [activeStepId, setActiveStepId] = useState(1);
    const activeStep = steps.find(s => s.id === activeStepId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white"
        >
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Interactive Journey Stepper */}
            <JourneyStepper
                activeId={activeStepId}
                setActiveId={setActiveStepId}
            />

            {/* 3. Explore Careers & Opportunities - Dynamic Insights */}
            <ExploreSection activeStepId={activeStepId} />

            {/* 4. How It Works - Inline Section for completeness */}
            <section id="how-it-works" className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e293b] mb-6">
                            How CareerGenAI Works
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Our intelligent platform guides you through a personalized journey to discover
                            and achieve your ideal career path.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden md:block absolute top-[45%] left-[20%] right-[20%] h-0.5 bg-dashed-border -z-0"></div>

                        {[
                            {
                                step: "01",
                                title: "Share Your Interests",
                                desc: "Complete our AI-powered assessment to help us understand your unique personality, skills, and aspirations.",
                                color: "bg-blue-600"
                            },
                            {
                                step: "02",
                                title: "Get AI Suggestions",
                                desc: "Receive curated career recommendations and a step-by-step roadmap specifically tailored to your profile.",
                                color: "bg-indigo-600"
                            },
                            {
                                step: "03",
                                title: "Master Your Path",
                                desc: "Access premium resources, book expert sessions, and build your profile to launch your career with confidence.",
                                color: "bg-blue-700"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative z-10 text-center"
                            >
                                <div className={`w-20 h-20 ${item.color} text-white rounded-3xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-2xl shadow-blue-200 transform hover:rotate-6 transition-transform`}>
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold text-[#1e293b] mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Sticky Bottom Progress */}
            <BottomProgressBar
                currentStep={activeStepId}
                totalSteps={steps.length}
                stepTitle={activeStep?.title}
            />

            {/* Spacer for sticky bar */}
            <div className="h-24 md:h-32"></div>

            <style jsx>{`
        .bg-dashed-border {
          background-image: linear-gradient(to right, #cbd5e1 50%, rgba(255, 255, 255, 0) 0%);
          background-position: bottom;
          background-size: 15px 1px;
          background-repeat: repeat-x;
        }
      `}</style>
        </motion.div>
    );
};

export default CareerJourney;
