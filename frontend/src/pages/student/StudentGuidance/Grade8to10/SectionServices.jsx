export default function SectionServices() {
  const services = [
    { title: "Aptitude Test", desc: "Know your strengths.", icon: "🧠" },
    { title: "Stream Selection", desc: "Choose the right path.", icon: "📚" },
    { title: "Study Planning", desc: "Daily study routine.", icon: "📝" },
    { title: "Skill Building", desc: "Coding, creativity & more.", icon: "🎓" },
  ];

  return (
    <section id="services" className="py-20 bg-white">

      <h2 className="text-center text-4xl font-extrabold text-blue-900">
        What We Help You With
      </h2>

      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 mt-12">
        {services.map((s, i) => (
          <div key={i} className="p-8 rounded-3xl bg-blue-50 shadow border text-center">
            <div className="text-5xl mb-3">{s.icon}</div>
            <h3 className="font-bold text-xl text-blue-900">{s.title}</h3>
            <p className="text-gray-700 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
