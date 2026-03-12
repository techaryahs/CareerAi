import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, Brain, BarChart3, UserCircle2, MessageSquare, Scale, GraduationCap, Map, Globe, UserCheck, FileText, UserPlus, Linkedin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        id: 1,
        title: "Self-Assessment",
        subtitle: "Discover your strengths & interests",
        duration: "5-10 mins",
        description: "Understand your strengths, interests, and potential paths before taking your first step.",
        status: "active",
        image: "https://illustrations.popsy.co/blue/studying.svg",
        options: [
            {
                title: "Interest Assessment",
                desc: "Discover your interests, strengths, and natural inclinations through smart assessments to identify what suits you best.",
                icon: <Brain className="w-8 h-8 text-blue-600" />,
                path: "/careerQuiz",
                label: "Discover Interests"
            },
            {
                title: "Career Exploration",
                desc: "Explore career paths aligned with your interests, including required skills, growth opportunities, and future scope.",
                icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
                path: "/interest-form",
                label: "Explore Careers"
            },
            {
                title: "Personalized Guidance",
                desc: "Get structured academic and career guidance for students from 5th to 12th grade to build a strong and confident future.",
                icon: <UserCircle2 className="w-8 h-8 text-indigo-600" />,
                path: "/student-guidance",
                label: "Get Guidance"
            },
            {
                title: "College by location",
                desc: "Find colleges based on your location.",
                icon: <Globe className="w-8 h-8 text-blue-500" />,
                path: "/college",
                label: "Find Colleges"
            }
        ]

    },
    {
        id: 2,
        title: "Exploration",
        subtitle: "Explore careers & colleges",
        duration: "5-15 mins",
        description: "Dive deep into industries, roles, and real-world opportunities that match you.",
        status: "active",
        image: "https://illustrations.popsy.co/blue/creative-work.svg",
        options: [
            {
                title: "AI Career Chat",
                desc: "Talk to our AI guide for personalized career advice.",
                icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
                path: "/chat",
                label: "Start Chat"
            },
            {
                title: "Career Comparison",
                desc: "Compare different career paths side-by-side.",
                icon: <Scale className="w-8 h-8 text-indigo-600" />,
                path: "/compare",
                label: "Compare Careers"
            },
            {
                title: "Skill Tutorials",
                desc: "Browse our extensive catalog of career-specific tutorials.",
                icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
                path: "/tutorial",
                label: "View Tutorials"
            }
        ]
    },
    {
        id: 3,
        title: "Planning",
        subtitle: "Build your roadmap",
        duration: "10-20 mins",
        description: "Set your direction with a plan that blends passion and opportunity.",
        status: "active",
        image: "https://illustrations.popsy.co/blue/success.svg",
        options: [
            {
                title: "Career Roadmap",
                desc: "See a detailed step-by-step roadmap for your path.",
                icon: <Map className="w-8 h-8 text-blue-600" />,
                path: "/careerDetail",
                label: "View Roadmap"
            },
            {
                title: "EduTutor Portal",
                desc: "Find specialized tutors and academic support for your branch.",
                icon: <UserPlus className="w-8 h-8 text-indigo-600" />,
                path: "/edu",
                label: "Open EduTutor"
            },
            {
                title: "Study Abroad",
                desc: "Decide where to study based on costs and ROI.",
                icon: <Globe className="w-8 h-8 text-blue-500" />,
                path: "/services/study-abroad",
                label: "Compare Now"
            },
            {
                title: "Dropout Risk Assessment",
                desc: "Calculate the impact of dropping out on your future prospects.",
                icon: <Globe className="w-8 h-8 text-blue-500" />,
                path: "/services/dropout",
                label: "Assess Risk"
            }
        ]
    },
    {
        id: 4,
        title: "Execution",
        subtitle: "Launch your career",
        duration: "Ongoing",
        description: "Put your vision into motion and land your dream opportunity.",
        status: "active",
        image: "https://illustrations.popsy.co/blue/work-from-home.svg",
        options: [
            {
                title: "Resume Builder",
                desc: "Build a professional resume using premium templates.",
                icon: <FileText className="w-8 h-8 text-blue-600" />,
                path: "/resume-templates",
                label: "Build Resume"
            },
            {
                title: "Expert Consult",
                desc: "Book a session with a professional career consultant.",
                icon: <UserCheck className="w-8 h-8 text-indigo-600" />,
                path: "/consult",
                label: "Book Slot"
            },
            {
                title: "Profile Builder",
                desc: "Create a standout profile for recruiters to see.",
                icon: <Linkedin className="w-8 h-8 text-blue-500" />,
                path: "/profile-builder",
                label: "Create Profile"
            }
        ]
    }
];

const StepOptionsUI = ({ options, navigate, activeId }) => {
    return (
        <div className="w-full">
            <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-3">
                {options.map((option, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() =>
                            navigate(option.path, {
                                state: { fromStep: activeId }
                            })
                        }

                        className="bg-white p-7 rounded-[2.5rem] border border-[#f1f5f9] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:border-[#e2e8f0] transition-all cursor-pointer group flex flex-col items-start"
                    >
                        <div className="bg-[#f8fafc] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0056d2] group-hover:text-white transition-all duration-500">
                            {React.cloneElement(option.icon, { className: 'w-6 h-6' })}
                        </div>
                        <h4 className="text-[14px] font-black text-[#1e293b] mb-2 leading-tight uppercase tracking-tight">{option.title}</h4>
                        <p className="text-[#64748b] text-[10px] leading-relaxed mb-6 flex-1 font-medium">
                            {option.desc}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-[#f8fafc] text-[#0056d2] font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-full group-hover:bg-[#0056d2] group-hover:text-white transition-all shadow-sm"
                        >
                            <span>{option.label}</span>
                            <ArrowRight size={12} />
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-14 flex flex-col items-center">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[9px] font-black text-[#94a3b8] uppercase tracking-[0.3em]">Campaign Progress</span>
                        <span className="text-[9px] font-black text-[#0056d2] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{Math.round((activeId / 4) * 100)}% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden p-0.5 border border-white">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(activeId / 4) * 100}%` }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="h-full bg-gradient-to-r from-[#0056d2] to-[#3b82f6] rounded-full shadow-[0_0_15px_rgba(0,86,210,0.3)] relative overflow-hidden"
                        >
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const JourneyStepper = () => {
    const navigate = useNavigate();
    const [activeId, setActiveId] = React.useState(() => {
        const saved = localStorage.getItem('careerJourneyStep');
        return saved ? Number(saved) : 1;
    });


    React.useEffect(() => {
        localStorage.setItem('careerJourneyStep', activeId);
    }, [activeId]);


    const activeStep = steps.find(s => s.id === activeId);

    return (
        <section className="py-5 bg-[#fcfdfe]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-5 tracking-tight">Your Career Journey</h2>
                    <p className="text-lg text-[#64748b] max-w-2xl mx-auto font-medium leading-relaxed">Follow our elite, data-backed framework to transition from potential to professionals.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Stepper Sidebar */}
                    <div className="lg:col-span-4 space-y-4">

                        {steps.map((step) => (
                            <motion.div
                                key={step.id}
                                whileHover={{ x: 4 }}
                                onClick={() => setActiveId(step.id)}
                                className={`p-6 rounded-[2.5rem] flex items-start gap-5 cursor-pointer transition-all border-2 ${activeId === step.id
                                    ? 'bg-white border-[#0056d2] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]'
                                    : 'bg-transparent border-transparent hover:bg-white hover:border-[#f1f5f9]'
                                    }`}
                            >
                                <div className="mt-1">
                                    {activeId === step.id ? (
                                        <div className="w-7 h-7 rounded-full bg-[#0056d2] flex items-center justify-center text-white text-xs font-black shadow-[0_5px_15px_rgba(0,86,210,0.3)]">
                                            {step.id}
                                        </div>
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#94a3b8] text-xs font-black">
                                            {step.id}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-black text-base mb-1.5 ${activeId === step.id ? 'text-[#0f172a]' : 'text-[#64748b]'}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-[11px] text-[#94a3b8] leading-tight mb-3 font-semibold">{step.subtitle}</p>
                                    <span className="px-3 py-1 rounded-full bg-[#f8fafc] text-[9px] font-black text-[#475569] uppercase tracking-wider border border-[#f1f5f9]">{step.duration}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Active Step Detail - Hero + Image + Options */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="bg-white rounded-[3.5rem] p-12 md:p-14 border border-[#f1f5f9] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] relative overflow-hidden"
                            >
                                {/* Professional Background Accent */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#f8fafc] rounded-full blur-[100px] opacity-60 -mr-40 -mt-40 -z-10" />

                                <div className="grid md:grid-cols-2 gap-6 items-center mb-3">
                                    <div>
                                        <span className="inline-block px-2 py-1.2 rounded-full bg-[#f1f5f9] text-[#475569] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                                            Stage {activeStep.id} of 4
                                        </span>
                                        <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight leading-[1.1]">{activeStep.title}</h2>
                                        <p className="text-[#64748b] text-base leading-relaxed font-medium">
                                            {activeStep.description}
                                        </p>
                                        <button
                                            onClick={() => setActiveId(prev => Math.min(prev + 1, steps.length))}
                                            disabled={activeId === steps.length}
                                            className="mt-6 inline-flex items-center gap-2
             bg-[#0056d2] text-white px-6 py-3 rounded-xl
             font-bold text-sm shadow-md
             disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Next Step
                                        </button>

                                    </div>
                                    <div className="relative hidden md:flex justify-center">
                                        <div className="absolute inset-0 bg-blue-50/20 rounded-full blur-[80px] -z-10"></div>
                                        <motion.img
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            src={activeStep.image}
                                            alt={activeStep.title}
                                            className="w-full max-w-[280px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-0 border-t border-[#f8fafc]">
                                    <h5 className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em] mb-6">Integrated Professional Tools</h5>
                                    <StepOptionsUI
                                        options={activeStep.options}
                                        navigate={navigate}
                                        activeId={activeId}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default JourneyStepper;
