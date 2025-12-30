import React from "react";

export default function SectionDiscover() {
  const items = [
    {
      emoji: "🎨",
      title: "Your Personality Type",
      subtitle: "Find out if you're Creative, Logical, Social, or a Nature Explorer.",
    },
    {
      emoji: "📚",
      title: "Subjects You May Like",
      subtitle: "See what subjects match your interests.",
    },
    {
      emoji: "🎯",
      title: "Fun Challenges",
      subtitle: "Get playful tasks that match your personality.",
    },
    {
      emoji: "📄",
      title: "Personal Report",
      subtitle: "Download a colorful report to share.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-sky-700 mb-6">
          What You'll Discover
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div key={i} className="p-5 bg-sky-50 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <h3 className="font-semibold text-sky-800">{item.title}</h3>
              <p className="text-sky-700 mt-2">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
