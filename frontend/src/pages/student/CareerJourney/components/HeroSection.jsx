import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full  md:py-8 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#1e293b] leading-tight mb-6">
                        Build Your Career — <br />
                        <span className="text-blue-600">Step by Step</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                        Answer a few questions. Get a personalized career roadmap and expert guidance to reach your dream job.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/interest-form')}
                            className="flex items-center justify-center gap-2 bg-[#0056d2] hover:bg-[#0041a3] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-colors"
                        >
                            <Rocket className="w-5 h-5" />
                            Start Free Career Assessment
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                             onClick={() => navigate('/consult')}
                            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:bg-[#0041a3] hover:border-blue-400 hover:text-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                        >
                            <BookOpen className="w-5 h-5" />
                            Consultation
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden md:flex justify-center items-center"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-[80px] opacity-60 -z-10"></div>

                    <div className="relative w-full max-w-[550px]">
                        <img
                            src="svg/careerpath.jpg"
                            alt="Career Growth"
                            className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                        />

                        {/* Floating decorative badges */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-10 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-blue-50"
                        >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">A+</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 -left-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-blue-50"
                        >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
