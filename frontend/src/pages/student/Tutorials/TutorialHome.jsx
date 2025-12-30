import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ACADEMIC_DATA } from './data';
import Pagination from './Pagination';

export default function TutorialHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const filteredCats = useMemo(() => {
    return ACADEMIC_DATA.filter(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleLiveSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(0);

    if (value.trim() && !isNaN(value)) {
      let foundPath = null;
      ACADEMIC_DATA.forEach(cat => {
        cat.departments.forEach(dept => {
          dept.subjects.forEach(sub => {
            const page = sub.pages.find(p => p.id === Number(value));
            if (page) foundPath = `/tutorial/${cat.id}/${dept.id}/${sub.id}/${page.id}`;
          });
        });
      });
      if (foundPath) navigate(foundPath);
    }
  };

  const totalPages = Math.ceil(filteredCats.length / itemsPerPage);
  const displayedCats = filteredCats.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB] selection:bg-indigo-100">
      
      {/* COMPACT HEADER SECTION */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 text-center">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase tracking-wider mb-3 inline-block">
            Learning System
          </span>
          
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Explore <span className="text-indigo-500">Tutorials</span>
          </h1>
          
          <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-lg mx-auto mb-6 leading-relaxed">
            Discover comprehensive learning paths across multiple disciplines.
          </p>

          {/* SLIM SEARCH INPUT */}
          <div className="max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search categories or Page ID..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none text-slate-700 text-xs font-semibold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                value={searchTerm}
                onChange={(e) => handleLiveSearch(e.target.value)}
              />
            </div>
            <p className="text-[9px] text-slate-400 mt-2 uppercase tracking-widest">
              {searchTerm && !isNaN(searchTerm) ? "Checking ID..." : "Live Filtering"}
            </p>
          </div>
        </div>
      </div>

      {/* COMPACT CATEGORY GRID SECTION */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {displayedCats.map(cat => (
            <Link 
              key={cat.id} 
              to={`/tutorial/${cat.id}`} 
              className="group block h-full"
            >
              <div className="p-5 bg-white rounded-2xl border border-slate-100 transition-all duration-200 h-full shadow-sm hover:shadow-md hover:-translate-y-0.5 flex flex-col">
                <div className="flex-1">
                  <div className="w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center font-black text-[10px] mb-3 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    {cat.id}
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-500 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-3 line-clamp-2">
                    Access learning modules for {cat.name}.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-indigo-500">
                  <span className="text-[9px] font-black uppercase tracking-wider">Explore</span>
                  <span className="font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SMALLER PAGINATION WRAPPER */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination currentIndex={currentPage} total={totalPages} onNavigate={setCurrentPage} />
          </div>
        )}

        {/* EMPTY STATE */}
        {displayedCats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xs font-bold text-slate-400 italic mb-2">No categories found</p>
            <button
              onClick={() => handleLiveSearch("")}
              className="text-indigo-500 font-bold text-[10px] uppercase tracking-widest hover:underline"
            >
              Reset
            </button>
          </div>
        )}
      </main>

      <footer className="py-6 text-center border-t border-slate-100 bg-white">
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">
          Aryah's World Infotech
        </p>
      </footer>
    </div>
  );
}