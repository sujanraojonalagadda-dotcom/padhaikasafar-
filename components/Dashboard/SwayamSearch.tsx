
import React, { useState } from 'react';

const SwayamSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // SWAYAM explorer deep link with search text
    const searchUrl = `https://swayam.gov.in/explorer?searchText=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-indigo-200 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">🎓</div>
        <div>
          <h3 className="font-bold text-slate-800">Search SWAYAM Courses</h3>
          <p className="text-xs text-slate-500">Find free online courses from top Indian universities</p>
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Search for Engineering, Humanities, Data Science..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
        >
          Search
        </button>
      </form>
      
      <div className="mt-3 flex gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Quick Filters:</span>
        <button 
          onClick={() => { setQuery('Computer Science'); }}
          className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition"
        >
          Computer Science
        </button>
        <button 
          onClick={() => { setQuery('Management'); }}
          className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition"
        >
          Management
        </button>
        <button 
          onClick={() => { setQuery('AI & ML'); }}
          className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition"
        >
          AI & ML
        </button>
      </div>
    </div>
  );
};

export default SwayamSearch;
