import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ACADEMIC_DATA } from './data';
import Pagination from './Pagination';

export default function DepartmentView() {
  const { catId, deptId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  const cat = ACADEMIC_DATA.find(c => c.id === Number(catId));
  const dept = cat?.departments.find(d => d.id === Number(deptId));

  // Filter subjects by name
  const filteredSubjects = (dept?.subjects || []).filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Increased slightly since cards are smaller
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const displayedSubjects = filteredSubjects.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* COMPACT HEADER & SEARCH */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <header>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Subjects
            </h2>
            <div className="h-1 w-12 bg-indigo-600 mt-1.5 rounded-full"></div>
          </header>

          <div className="w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Filter subjects..." 
              className="w-full p-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-xs transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
            />
          </div>
        </div>
        
        {/* SLIM SUBJECT CARDS */}
        <div className="space-y-6">
          {displayedSubjects.map(sub => (
            <section key={sub.id} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg font-black text-[9px] uppercase tracking-tighter">
                  ID {sub.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{sub.name}</h3>
              </div>

              {/* TIGHTER LESSON LIST */}
              <div className="grid grid-cols-1 gap-2">
                {sub.pages.map(page => (
                  <Link 
                    key={page.id} 
                    to={`/tutorial/${catId}/${deptId}/${sub.id}/${page.id}`}
                    className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-indigo-50 hover:border-indigo-100 flex justify-between items-center transition-all group"
                  >
                    <span className="font-bold text-slate-700 text-xs group-hover:text-indigo-700">
                      {page.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-100">
                        {page.id}
                      </span>
                      <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-all font-black text-sm">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* COMPACT PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination 
              currentIndex={currentPage} 
              total={totalPages} 
              onNavigate={setCurrentPage} 
            />
          </div>
        )}

        {/* EMPTY STATE */}
        {displayedSubjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
             <p className="text-slate-400 text-xs font-bold italic">No subjects matching your search</p>
          </div>
        )}
      </main>
    </div>
  );
}