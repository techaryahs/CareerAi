import React, { useEffect, useState } from "react";

const slides = [
  {
    title: "Get certified by your Favourite Company!",
    desc: "Puma is offering experience to its users by providing internship in their Marketing department, grab this opportunity now and have Puma's name grace your CV.",
    button: "Learn More",
    image:
      "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=600",
   
    circleColor: "bg-violet-500",
  },
  {
    title: "Discover Your True Career Path",
    desc: "Explore real-world careers, gain practical exposure, and choose the future that fits you best.",
    button: "Explore Now",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=600",
   
    circleColor: "bg-sky-500",
  },
 

{
  title: "Experience Careers Before You Choose",
  desc: "Try different career paths through guided projects and mentorship before making a final decision.",
  button: "Try Now",
  image:
    "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=600",
  circleColor: "bg-indigo-500",
},

{
  title: "Learn from Industry Experts",
  desc: "Get personalized guidance from professionals working in top companies across various domains.",
  button: "Meet Mentors",
  image:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600",
  circleColor: "bg-emerald-500",
},

{
  title: "Turn Passion into a Profession",
  desc: "Align your interests with the right career roadmap and build confidence with structured learning.",
  button: "Find Your Path",
  image:
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600",
  circleColor: "bg-rose-500",
},

{
  title: "Get Career-Ready with Certifications",
  desc: "Earn recognized certifications that strengthen your profile and make you job-ready.",
  button: "Get Certified",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600",
  circleColor: "bg-teal-500",
},

];

export default function PromoBannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mt-16 px-6">
      <div className="relative max-w-7xl mx-auto rounded-[28px] overflow-hidden
        bg-gradient-to-r from-[#FFF9F2] via-[#FFF4F4] to-[#F1FAF9]
        shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

        {/* pattern */}
        <div className="absolute inset-0 opacity-30
          bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)]
          bg-[length:16px_16px]" />

        {/* slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-full flex flex-col lg:flex-row
              items-center justify-between px-12 py-12 gap-10"
            >
              {/* LEFT */}
              <div className="max-w-xl">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
                  {slide.title}
                </h2>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {slide.desc}
                </p>

                <button className="mt-6 bg-blue-600 hover:bg-blue-700
                  text-white px-6 py-3 rounded-lg font-medium shadow">
                  {slide.button}
                </button>
              </div>

              {/* RIGHT */}
              <div className="relative flex items-center justify-center">
                {/* circle */}
                <div
                  className={`absolute w-[260px] h-[260px] rounded-full ${slide.circleColor}`}
                />

                {/* logo */}
                {/* <div className="absolute top-4 left-4 z-20
                  bg-black rounded-full p-3 shadow-lg">
                  <img
                    src={slide.logo}
                    alt="Company Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div> */}

                {/* image */}
                <img
                  src={slide.image}
                  alt="Internship"
                  className="relative z-10 w-[200px] h-[200px]
                  object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>

        {/* dots */}
       
       
        
      </div>
    </section>
  );
}
