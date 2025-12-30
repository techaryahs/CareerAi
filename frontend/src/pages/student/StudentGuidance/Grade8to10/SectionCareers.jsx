export default function SectionCareers() {
  const careers = [
    { icon: "💻", title: "Coding & Technology", desc: "Robotics, coding & STEM" },
    { icon: "🎨", title: "Design & Creativity", desc: "Drawing, UI/UX, animation" },
    { icon: "📈", title: "Business", desc: "Finance, entrepreneurship" },
    { icon: "🎤", title: "Communication", desc: "Public speaking & confidence" },
  ];

  return (
    <section id="careers" className="py-20 bg-white">

      <h2 className="text-center text-4xl font-extrabold text-blue-900">
        Career Opportunities You Can Explore
      </h2>

      <p className="text-center text-gray-600 mt-2 mb-10">
        Beginner-friendly paths you can start from school.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {careers.map((c, i) => (
          <div key={i} className="p-8 border rounded-3xl shadow bg-white text-center">
            <div className="text-6xl mb-4">{c.icon}</div>
            <h3 className="text-xl font-bold text-blue-900">{c.title}</h3>
            <p className="text-gray-700 mt-2">{c.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
