export default function SectionTestimonials() {
  const reviews = [
    { name: "John", text: "Amazing guidance!" },
    { name: "Anita", text: "Very helpful and easy to understand." },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">

      <h2 className="text-center text-4xl font-extrabold text-blue-900 mb-10">
        What Students Say
      </h2>

      <div className="grid md:grid-cols-2 gap-8 px-6 max-w-6xl mx-auto">
        {reviews.map((r, i) => (
          <div key={i} className="p-8 bg-white shadow rounded-3xl border">
            <p className="text-gray-700 italic mb-4">“{r.text}”</p>
            <p className="text-blue-900 font-bold">— {r.name}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
