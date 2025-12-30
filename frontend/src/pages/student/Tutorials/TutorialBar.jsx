// src/components/TutorialBar.js
import { Link, useParams } from 'react-router-dom';
import { ACADEMIC_DATA } from './data';

export default function TutorialBar() {
  const { catId, deptId, subId, pageId } = useParams();

  const cat = ACADEMIC_DATA.find(c => c.id === Number(catId));
  const dept = cat?.departments.find(d => d.id === Number(deptId));
  const sub = dept?.subjects.find(s => s.id === Number(subId));

  return (
    <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
          <Link to="/tutorial" className="text-slate-400 hover:text-indigo-600 transition-colors">Home</Link>
          
          {cat && (
            <>
              <span className="text-slate-300">/</span>
              <Link to={`/tutorial/${catId}`} className="text-slate-400 hover:text-indigo-600">{cat.name}</Link>
            </>
          )}

          {dept && (
            <>
              <span className="text-slate-300">/</span>
              <Link to={`/tutorial/${catId}/${deptId}`} className="text-slate-400 hover:text-indigo-600">{dept.name}</Link>
            </>
          )}

          {sub && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-indigo-600 underline decoration-2 underline-offset-4">{sub.name}</span>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}