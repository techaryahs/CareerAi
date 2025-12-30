import heroImg from "../../../../assets/service.jpg";

export default function SectionHero() {
  return (
    <section
      id="home"
      className="rounded-3xl bg-gradient-to-br from-[#e8f7ff] to-[#ffffff] shadow-xl p-12 mb-10 border"
    >
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-extrabold text-[#0f172a] leading-tight">
            Discover Your Best Career After{" "}
            <span className="text-cyan-600">11th–12th</span>
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            Get expert insights, personalized pathways, entrance exam guidance,
            and future-ready career suggestions.
          </p>

          <a
            href="#assessment"
            className="mt-6 inline-block px-8 py-3 bg-cyan-600 text-white rounded-xl shadow hover:bg-cyan-700"
          >
            Start Assessment
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <img
            src={heroImg}
            className="rounded-2xl shadow-xl border bg-white"
            alt="Career"
          />
        </div>

      </div>
    </section>
  );
}
