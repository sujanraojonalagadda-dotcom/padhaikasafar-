
import React, { useState } from 'react';
import { Internship, StudentProfile } from '../../types';
import { INTERNSHIP_PORTALS } from '../../constants';

interface InternshipHubProps {
  profile: StudentProfile;
}

const InternshipHub: React.FC<InternshipHubProps> = ({ profile }) => {
  const [filterType, setFilterType] = useState<'All' | 'Govt' | 'MNC' | 'Startup'>('All');

  const filtered = INTERNSHIP_PORTALS.filter(i => {
    if (filterType !== 'All' && i.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded uppercase tracking-widest">Internships</span>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded uppercase tracking-widest">Industry Launchpad</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 leading-none">Official Internship Hub</h3>
          <p className="text-sm font-medium text-slate-400">Discover verified internship schemes tailored to your stream.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {(['All', 'Govt', 'Startup'] as const).map(f => (
            <button 
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
                filterType === f ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(i => (
          <div key={i.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-b-indigo-500 flex flex-col group">
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{i.title}</h4>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                      i.type === 'Govt' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {i.type}
                    </span>
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{i.organization}</p>
                </div>
                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center text-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">💼</div>
              </div>

              <p className="text-sm font-medium text-slate-500 leading-relaxed">{i.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-xs font-bold text-slate-700">{i.duration}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stipend</p>
                  <p className="text-xs font-bold text-slate-700">{i.stipend}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs font-bold text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {i.location}
              </div>
            </div>

            <a 
              href={i.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-4 bg-slate-900 text-white text-center font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Go to Portal
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        ))}
      </div>
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-xl font-black text-slate-900">Need help with your Application?</h4>
          <p className="text-sm font-medium text-slate-500">Check our AI Mock Interviewer to practice common internship questions.</p>
        </div>
        <button className="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
          Open AI Hub
        </button>
      </div>
    </div>
  );
};

export default InternshipHub;
