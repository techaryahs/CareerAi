// import React, { useState } from 'react';
// import { ACADEMIC_DATA } from './data';
// const ModernLearningPortal = () => {
//   const [view, setView] = useState('home'); // home, dept, blog
//   const [activeIds, setActiveIds] = useState({ catId: null, deptId: null, subId: null });

//   // Data Selectors
//   const currentCat = ACADEMIC_DATA.categories.find(c => c.id === activeIds.catId);
//   const currentDept = currentCat?.departments.find(d => d.id === activeIds.deptId);
//   const currentSub = currentDept?.subjects.find(s => s.id === activeIds.subId);

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
//       {/* Navbar */}
//       <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-50">
//         <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
//           <button onClick={() => setView('home')} className="text-xl font-black text-green-600 tracking-tighter">
//             GEEK_LEARN
//           </button>
//           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">v1.0 Static</span>
//         </div>
//       </nav>

//       <main className="max-w-4xl mx-auto px-4 py-8">
        
//         {/* BREADCRUMBS */}
//         {view !== 'home' && (
//           <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
//             <span onClick={() => setView('home')} className="cursor-pointer hover:text-green-600">Home</span>
//             <span>/</span>
//             <span onClick={() => setView('dept')} className={`cursor-pointer ${view === 'dept' ? 'text-slate-900 font-bold' : ''}`}>
//               {currentCat?.name}
//             </span>
//             {view === 'blog' && (
//               <>
//                 <span>/</span>
//                 <span className="text-slate-900 font-bold">{currentSub?.title}</span>
//               </>
//             )}
//           </div>
//         )}

//         {/* VIEW 1: CATEGORIES */}
//         {view === 'home' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <h2 className="col-span-full text-3xl font-bold mb-4">Choose Category</h2>
//             {ACADEMIC_DATA.categories.map(cat => (
//               <div 
//                 key={cat.id}
//                 onClick={() => { setActiveIds({...activeIds, catId: cat.id}); setView('dept'); }}
//                 className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-green-500 hover:shadow-xl transition-all cursor-pointer group"
//               >
//                 <div className="text-xs font-mono text-slate-400 mb-2">ID: {cat.id}</div>
//                 <h3 className="text-2xl font-bold group-hover:text-green-600">{cat.name}</h3>
//                 <p className="text-slate-500 mt-2">Explore departments in {cat.name}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* VIEW 2: DEPARTMENTS & SUBJECT LIST */}
//         {view === 'dept' && (
//           <div className="space-y-12">
//             {currentCat.departments.map(dept => (
//               <section key={dept.id}>
//                 <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-4">
//                   {dept.name} <span className="h-px bg-slate-200 flex-1"></span>
//                 </h3>
//                 <div className="grid grid-cols-1 gap-4">
//                   {dept.subjects.map(sub => (
//                     <div 
//                       key={sub.id}
//                       onClick={() => { setActiveIds({...activeIds, deptId: dept.id, subId: sub.id}); setView('blog'); }}
//                       className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md cursor-pointer flex justify-between items-center group"
//                     >
//                       <div>
//                         <span className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded">SUB_ID: {sub.id}</span>
//                         <h4 className="text-lg font-bold mt-2 group-hover:text-green-600 transition-colors">{sub.title}</h4>
//                       </div>
//                       <span className="text-slate-300 group-hover:text-green-500 transform group-hover:translate-x-1 transition-all">→</span>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             ))}
//           </div>
//         )}

//         {/* VIEW 3: THE BLOG PAGE (HTML RENDERING) */}
//         {view === 'blog' && (
//           <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//             <header className="mb-12">
//               <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
//                 {currentSub.title}
//               </h1>
//               <div className="flex flex-wrap items-center gap-4 py-6 border-y border-slate-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs">GFG</div>
//                   <span className="text-sm font-bold">Admin Specialist</span>
//                 </div>
//                 <span className="text-slate-300">|</span>
//                 <span className="text-sm text-slate-500 italic">Page ID: {currentSub.id}</span>
//               </div>
//             </header>

//             {/* THIS IS THE KEY PART FOR HTML RENDERING */}
//             <div 
//               className="prose prose-slate lg:prose-xl max-w-none text-slate-800 leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: currentSub.content }} 
//             />

//             <footer className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
//                <button onClick={() => setView('dept')} className="text-green-600 font-bold">← Back to {currentDept.name}</button>
//                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-slate-400">Back to Top ↑</button>
//             </footer>
//           </article>
//         )}

//       </main>
//     </div>
//   );
// };

// export default ModernLearningPortal;