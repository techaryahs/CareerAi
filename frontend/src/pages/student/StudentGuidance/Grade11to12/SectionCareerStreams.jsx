export default function SectionCareerStreams() {
  const streams = [
    {
      title: "Science (PCM / PCB)",
      desc: "For tech, engineering & medical aspirants.",
      bullets: ["Engineering (AI, Robotics)", "MBBS / Nursing", "Biotech", "Data Science"],
    },
    {
      title: "Commerce",
      desc: "For business, finance & management lovers.",
      bullets: ["CA / CS", "BBA / B.Com", "Marketing", "Stock Market"],
    },
    {
      title: "Arts / Humanities",
      desc: "For creative & expressive thinkers.",
      bullets: ["Psychology", "Law", "Media", "Designing"],
    },
  ];

  return (
    <section id="careers" className="mt-16">
      <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
        What to Choose After 11th–12th?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {streams.map((s, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow-xl border hover:border-cyan-300 transition"
          >
            <h3 className="text-xl font-semibold text-cyan-700 mb-2">
              {s.title}
            </h3>

            <p className="text-gray-600 text-sm mb-3">{s.desc}</p>

            <ul className="text-gray-700 text-sm space-y-1">
              {s.bullets.map((b, idx) => (
                <li key={idx}>• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
