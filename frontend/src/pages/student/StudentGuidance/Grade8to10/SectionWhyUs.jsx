export default function SectionWhyUs() {
  const features = [
    "Fun & friendly learning",
    "Simple test made for kids",
    "1:1 mentor guidance",
    "Career clarity early",
    "Parent-friendly programs",
  ];

  return (
    <section id="whyus" className="py-20 bg-blue-50">

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">

        <div>
          <h2 className="text-4xl font-extrabold text-blue-900">
            Why Students Love SmartCareer?
          </h2>

          <ul className="mt-6 space-y-4 text-gray-700 text-lg">
            {features.map((f, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="text-blue-600 text-2xl">✔</div>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
          className="rounded-xl shadow-xl"
        />

      </div>

    </section>
  );
}
