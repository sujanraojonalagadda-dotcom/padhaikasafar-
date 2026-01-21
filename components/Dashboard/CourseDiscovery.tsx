
import React, { useState } from 'react';

const CourseDiscovery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<'free' | 'paid' | 'internship'>('free');

  const popularSkills = ['AI', 'Python', 'Power BI', 'Web Development', 'Cloud Computing', 'Data Science'];

  const platforms = [
    { 
      name: 'Google', 
      url: (q: string, type: string) => {
        const suffix = type === 'free' ? ' free certification' : type === 'internship' ? ' internship' : '';
        return `https://grow.google/intl/en_in/courses-and-tools/?q=${encodeURIComponent(q + suffix)}`;
      }, 
      color: 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400' 
    },
    { 
      name: 'Microsoft', 
      url: (q: string, type: string) => {
        const suffix = type === 'free' ? ' free' : type === 'internship' ? ' student' : '';
        return `https://learn.microsoft.com/en-us/training/browse/?term=${encodeURIComponent(q + suffix)}`;
      }, 
      color: 'border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400' 
    },
    { 
      name: 'Nvidia', 
      url: (q: string, type: string) => `https://www.nvidia.com/en-us/training/online/search/?q=${encodeURIComponent(q)}`, 
      color: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400' 
    },
    { 
      name: 'Cisco', 
      url: (q: string, type: string) => `https://www.skillsforall.com/search?q=${encodeURIComponent(q)}`, 
      color: 'border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400' 
    },
    { 
      name: 'Oracle', 
      url: (q: string, type: string) => `https://education.oracle.com/learning-explorer?q=${encodeURIComponent(q)}`, 
      color: 'border-red-200 text-red-700 hover:bg-red-50 hover:border-red-400' 
    },
    { 
      name: 'Simplilearn', 
      url: (q: string, type: string) => `https://www.simplilearn.com/search?tag=${encodeURIComponent(q)}`, 
      color: 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-400' 
    },
    { 
      name: 'Udemy', 
      url: (q: string, type: string) => {
        const priceFilter = type === 'free' ? '&price=price-free' : type === 'paid' ? '&price=price-paid' : '';
        return `https://www.udemy.com/courses/search/?q=${encodeURIComponent(q)}${priceFilter}`;
      }, 
      color: 'border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400' 
    },
    { 
      name: 'Internshala', 
      url: (q: string, type: string) => `https://internshala.com/internships/keywords-${encodeURIComponent(q)}`, 
      color: 'border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-400' 
    },
  ];

  const handleLaunch = (platform: any) => {
    if (!query.trim()) {
      alert("Please enter a skill or course name to search!");
      return;
    }
    const finalUrl = platform.url(query, activeType);
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white border-t-8 border-indigo-600 rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-100/50 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none">
        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L1 21h22L12 2zm0 3.45l7.9 13.55H4.1L12 5.45z" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded uppercase tracking-widest">SMART SEARCH</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-widest">NEW: 2025 HUB</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 leading-none">Global Discovery Engine</h3>
          <p className="text-sm font-medium text-slate-400">Find the best resources across top platforms instantly.</p>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex flex-wrap bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-2xl self-start gap-1">
          <button 
            onClick={() => setActiveType('free')}
            className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-tight flex items-center gap-2 ${
              activeType === 'free' 
              ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-100 ring-1 ring-emerald-100' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className={activeType === 'free' ? 'text-emerald-500' : 'text-slate-400'}>⭐</span>
            Free Certifications
          </button>
          <button 
            onClick={() => setActiveType('paid')}
            className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-tight flex items-center gap-2 ${
              activeType === 'paid' 
              ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100 ring-1 ring-indigo-100' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className={activeType === 'paid' ? 'text-indigo-500' : 'text-slate-400'}>💎</span>
            Paid Courses
          </button>
          <button 
            onClick={() => setActiveType('internship')}
            className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-tight flex items-center gap-2 ${
              activeType === 'internship' 
              ? 'bg-white text-rose-600 shadow-lg shadow-rose-100 ring-1 ring-rose-100' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className={activeType === 'internship' ? 'text-rose-500' : 'text-slate-400'}>🚀</span>
            Internship Opportunities
          </button>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Enhanced Search Input */}
        <div className="space-y-4">
          <div className="relative group">
            <input
              type="text"
              className="w-full pl-14 pr-16 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all placeholder:text-slate-300 shadow-inner"
              placeholder={`Search for ${activeType === 'internship' ? 'roles like "Frontend Developer"' : 'skills like "Power BI" or "React"'}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Popular Skill Suggestions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Quick Search:</span>
            {popularSkills.map(skill => (
              <button
                key={skill}
                onClick={() => setQuery(skill)}
                className="px-3 py-1.5 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100/50"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {platforms.map((p) => (
            <button
              key={p.name}
              onClick={() => handleLaunch(p)}
              className={`p-4 border-2 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center gap-2 group shadow-sm ${p.color}`}
            >
              <span className="text-xl group-hover:scale-125 transition-transform">
                {p.name === 'Internshala' ? '💼' : p.name === 'Udemy' ? '📚' : '🎓'}
              </span>
              <span className="tracking-tight">{p.name}</span>
              <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase text-slate-400">Search Now</span>
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
          <div className="text-xl">💡</div>
          <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
            <span className="font-bold">Pro Tip:</span> Selecting <span className="font-bold">Free Certifications</span> automatically appends filtering keywords to help you find non-paid professional courses on most platforms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDiscovery;
