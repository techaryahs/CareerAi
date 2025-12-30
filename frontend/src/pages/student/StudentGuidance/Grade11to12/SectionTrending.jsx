export default function SectionTrending() {
  const trending = [
    "Artificial Intelligence",
    "Cybersecurity",
    "UI/UX Design",
    "Game Development",
    "VFX & Animation",
    "Product Management",
    "Digital Marketing",
  ];

  return (
    <section id="trending" className="mt-16">
      <h2 className="text-3xl font-bold text-[#0f172a] mb-6">
        Trending Careers (2025 & Beyond)
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {trending.map((t, i) => (
          <div
            key={i}
            className="bg-white p-4 text-center rounded-xl shadow hover:bg-cyan-50 border transition"
          >
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
