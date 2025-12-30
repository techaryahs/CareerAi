import { useParams, useNavigate, Link } from "react-router-dom";
import { ACADEMIC_DATA } from "./data";
import TutorialBar from "./TutorialBar";

export default function PageDetail() {
  const { catId, deptId, subId, pageId } = useParams();
  const navigate = useNavigate();

  const cat = ACADEMIC_DATA.find((c) => c.id === Number(catId));
  const dept = cat?.departments.find((d) => d.id === Number(deptId));
  const sub = dept?.subjects.find((s) => s.id === Number(subId));
  const pages = sub?.pages || [];
  const currentIdx = pages.findIndex((p) => p.id === Number(pageId));
  const page = pages[currentIdx];

  const handlePageChange = (index) => {
    if (index >= 0 && index < pages.length) {
      navigate(`/tutorial/${catId}/${deptId}/${subId}/${pages[index].id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!page)
    return (
      <div className="py-20 text-center font-black text-slate-200 text-xl">
        Page Not Found
      </div>
    );

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-100">
      <TutorialBar />

      <main className="max-w-4xl mx-auto px-5 py-8 md:py-12">
        {/* COMPACT HEADER */}
        <header className="mb-8 md:mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-indigo-200"></span>
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">
              Tutorial Content
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-4">
            {page.title}
          </h1>

          <div className="flex items-center gap-3 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
            <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">#{page.id}</span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span>
              Module {currentIdx + 1} of {pages.length}
            </span>
          </div>
        </header>

        {/* REFINED CONTENT AREA */}
        <article
          className="prose prose-slate prose-sm md:prose-base max-w-none 
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-5
          prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
          prose-strong:text-indigo-600 prose-code:text-indigo-500
          prose-pre:bg-slate-900 prose-pre:rounded-xl prose-pre:p-4 prose-pre:text-xs"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* SMALLER ASSESSMENT BOX */}
        <div className="mt-12 p-[1px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-2xl shadow-lg shadow-indigo-50">
          <div className="bg-white p-6 rounded-[calc(1rem-1px)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-black text-slate-900 mb-1">
                Ready for Assessment?
              </h4>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                Validate your learning for <span className="text-indigo-600 font-bold">{sub.name}</span>.
              </p>
            </div>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md">
              Start Quiz
            </button>
          </div>
        </div>

        {/* SLIM CARD NAVIGATION */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentIdx > 0 ? (
            <button
              onClick={() => handlePageChange(currentIdx - 1)}
              className="group p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all text-left"
            >
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Previous
              </span>
              <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors block truncate">
                {pages[currentIdx - 1].title}
              </span>
            </button>
          ) : <div />}

          {currentIdx < pages.length - 1 ? (
            <button
              onClick={() => handlePageChange(currentIdx + 1)}
              className="group p-5 rounded-2xl border border-indigo-50 bg-indigo-50/20 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-right"
            >
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1.5 flex items-center gap-2 justify-end">
                Next <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors block truncate">
                {pages[currentIdx + 1].title}
              </span>
            </button>
          ) : (
            <div className="p-5 rounded-2xl bg-indigo-600 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-black text-white/70 uppercase tracking-widest mb-0.5">Finished</span>
              <span className="text-xs font-black text-white">🎉 Course Complete</span>
            </div>
          )}
        </div>

        <footer className="mt-16 py-6 border-t border-slate-50 text-center">
          <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em]">
            Aryah's World Infotech Documentation
          </p>
        </footer>
      </main>
    </div>
  );
}