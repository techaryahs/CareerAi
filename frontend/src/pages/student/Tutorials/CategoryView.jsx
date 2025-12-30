import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ACADEMIC_DATA } from './data';
import Pagination from './Pagination';

export default function CategoryView() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const category = ACADEMIC_DATA.find(c => c.id === Number(catId));
  const depts = category?.departments || [];

  const filteredDepts = depts.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Increased per page since cards are smaller
  const totalPages = Math.ceil(filteredDepts.length / itemsPerPage);
  const displayedDepts = filteredDepts.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Reduced max-width and vertical padding */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* Compact Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-100 gap-4">
           <div>
             <Link to="/tutorial" className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1 inline-block hover:underline">
               ← Hub
             </Link>
             <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
               {category?.name}
             </h2>
           </div>
           
           <div className="w-full sm:w-64">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full p-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-xs transition-all"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0);
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                   🔍
                </span>
             </div>
           </div>
        </div>

        {/* Content Grid - Using 3 columns on larger screens for compactness */}
        {filteredDepts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedDepts.map(dept => (
              <Link key={dept.id} to={`/tutorial/${catId}/${dept.id}`} 
                    className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-900 group transition-all duration-200 relative overflow-hidden">
                {/* Smaller ID watermark */}
                <div className="absolute top-2 right-2 text-2xl font-black text-slate-200/40 group-hover:text-white/10">
                  {dept.id}
                </div>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-white transition-colors relative z-10 pr-6 leading-tight">
                  {dept.name}
                </h3>
                <p className="text-slate-500 mt-1.5 group-hover:text-slate-400 font-medium text-[11px] relative z-10">
                  View Subjects →
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-xs font-medium">No results for "{searchTerm}"</p>
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination 
              currentIndex={currentPage} 
              total={totalPages} 
              onNavigate={setCurrentPage} 
            />
          </div>
        )}
      </main>
    </div>
  );
}