import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Award, Zap, Globe, Briefcase, ShieldCheck, Target, BarChart3, ChevronRight } from 'lucide-react';

const stageInsights = {
    1: {
        title: "Growth Insights",
        subtitle: "How the market views your potential",
        cards: [
            {
                title: "Most Popular Paths",
                value: "Tech & Design",
                desc: "High interest growth in Creative AI roles this year.",
                icon: <Zap className="w-8 h-8 text-yellow-600" />,
                bgColor: "bg-yellow-50"
            },
            {
                title: "Skill Gaps",
                value: "-15% Average",
                desc: "Most students lack communication & system design skills.",
                icon: <Target className="w-8 h-8 text-red-600" />,
                bgColor: "bg-red-50"
            },
            {
                title: "Readiness Score",
                value: "AI Ready",
                desc: "Companies are prioritizing AI-literate candidates across all sectors.",
                icon: <Award className="w-8 h-8 text-blue-600" />,
                bgColor: "bg-blue-50"
            }
        ]
    },
    2: {
        title: "Market Demand",
        subtitle: "Global industry trends and salary pulses",
        cards: [
            {
                title: "Salary Growth",
                value: "+22% Annually",
                desc: "High-growth sectors are seeing massive compensation jumps.",
                icon: <TrendingUp className="w-8 h-8 text-green-600" />,
                bgColor: "bg-green-50"
            },
            {
                title: "Global Demand",
                value: "High (US/EU)",
                desc: "Overseas markets are actively recruiting international talent.",
                icon: <Globe className="w-8 h-8 text-blue-600" />,
                bgColor: "bg-blue-50"
            },
            {
                title: "Remote Roles",
                value: "45% of Total",
                desc: "Flexibility is becoming a standard in new professional contracts.",
                icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
                bgColor: "bg-indigo-50"
            }
        ]
    },
    3: {
        title: "Success Metrics",
        subtitle: "Proven outcomes from structured planning",
        cards: [
            {
                title: "Path Clarity",
                value: "95% Success",
                desc: "Users with clear roadmaps are 3x more likely to reach goals.",
                icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
                bgColor: "bg-blue-50"
            },
            {
                title: "Mentor Impact",
                value: "+40% ROI",
                desc: "Structured tutoring leads to faster certification and job placement.",
                icon: <Users className="w-8 h-8 text-indigo-600" />,
                bgColor: "bg-indigo-50"
            },
            {
                title: "Top Recruiters",
                value: "500+ Active",
                desc: "Major firms are monitoring student progress in our database.",
                icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
                bgColor: "bg-purple-50"
            }
        ]
    },
    4: {
        title: "Hiring Pulse",
        subtitle: "Real-time execution and placement data",
        cards: [
            {
                title: "Resume Impact",
                value: "+60% Views",
                desc: "ATS-friendly resumes get noticed significantly faster by recruiters.",
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                bgColor: "bg-blue-50"
            },
            {
                title: "Interview Rate",
                value: "1 in 5 Apps",
                desc: "Our users average one interview for every five applications sent.",
                icon: <Users className="w-8 h-8 text-indigo-600" />,
                bgColor: "bg-indigo-50"
            },
            {
                title: "Placement Speed",
                value: "45 Days",
                desc: "Average time from graduation to first job offer on our platform.",
                icon: <Award className="w-8 h-8 text-green-600" />,
                bgColor: "bg-green-50"
            }
        ]
    }
};

const ExploreSection = ({ activeStepId }) => {
    const stageData = stageInsights[activeStepId] || stageInsights[1];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.span
                        key={`badge-${activeStepId}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#f1f5f9] text-[#475569] text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Stage {activeStepId} Market Intelligence
                    </motion.span>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStepId}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-5 tracking-tight">
                                {stageData.title}
                            </h2>
                            <p className="text-lg text-[#64748b] max-w-2xl mx-auto font-medium leading-relaxed">
                                {stageData.subtitle}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {stageData.cards.map((card, index) => (
                            <motion.div
                                key={`${activeStepId}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group relative bg-[#ffffff] rounded-[2.5rem] p-10 border border-[#f1f5f9] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-[#e2e8f0] transition-all duration-500 flex flex-col h-full overflow-hidden"
                            >
                                {/* Decorative Gradient Blur */}
                                <div className={`absolute -top-10 -right-10 w-40 h-40 ${card.bgColor} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />

                                <div className={`w-14 h-14 ${card.bgColor} rounded-2xl flex items-center justify-center mb-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    {React.cloneElement(card.icon, { className: 'w-7 h-7' })}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <h3 className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">
                                        {card.title}
                                    </h3>

                                    <div className="text-3xl font-black text-[#1e293b] tracking-tight group-hover:text-[#0056d2] transition-colors leading-none">
                                        {card.value}
                                    </div>

                                    <p className="text-[#64748b] text-[13px] leading-relaxed font-medium">
                                        {card.desc}
                                    </p>
                                </div>

                                <div className="mt-auto pt-8 border-t border-[#f8fafc] flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-[#94a3b8] uppercase tracking-widest">Verified Insights</span>
                                    </div>
                                    <motion.div
                                        whileHover={{ x: 3 }}
                                        className="w-9 h-9 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#64748b] group-hover:bg-[#0056d2] group-hover:text-white transition-all cursor-pointer"
                                    >
                                        <ChevronRight size={18} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ExploreSection;
