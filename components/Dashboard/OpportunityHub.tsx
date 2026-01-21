
import React, { useState } from 'react';
import { Opportunity, StudentProfile } from '../../types';
import { getRecommendedOpportunities } from '../../utils/opportunityEngine';

interface OpportunityHubProps {
  profile: StudentProfile;
}

const OpportunityHub: React.FC<OpportunityHubProps> = ({ profile }) => {
  const [filterType, setFilterType] = useState<'All' | Opportunity['type']>('All');
  const [filterCat, setFilterCat] = useState<'All' | Opportunity['category']>('All');
  
  const recommended = getRecommendedOpportunities(profile);
  
  const filtered = recommended.filter(opp => {
    if (filterType !== 'All' && opp.type !== filterType) return false;
    if (filterCat !== 'All' && opp.category !== filterCat) return false;
    return true;
  });

  const now = new Date();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded uppercase tracking-widest">Opportunities</span>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-black rounded uppercase tracking-widest">Global Events</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 leading-none">Hackathons &amp; Challenges</h3>
          <p className="text-sm font-medium text-slate-400">Curated opportunities matching your interest in {profile.interest}.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select 
            className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
          >
            <option value="All">All Types</option>
            <option value="Hackathon">Hackathons</option>
            <option value="Internship">Internships</option>
            <option value="Competition">Competitions</option>
            <option value="Training">Trainings</option>
          </select>
          <select 
            className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as any)}
          >
            <option value="All">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Trading">Trading</option>
            <option value="Finance">Finance</option>
            <option value="Core">Core</option>
            <option value="Research">Research</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(opp => {
          const deadlineDate = new Date(opp.deadline);
          const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          const isUrgent = diffDays <= 14 && diffDays >= 0;

          return (
            <div key={opp.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-b-rose-500 flex flex-col group">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-rose-600 transition-colors">{opp.title}</h4>
                       {opp.is_new && <span className="flex-shrink-0 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{opp.provider}</p>
                  </div>
                  <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl">
                    {opp.type === 'Hackathon' ? '💻' : opp.type === 'Competition' ? '🏆' : opp.type === 'Internship' ? '💼' : '🎓'}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                   <span className="px-2 py-1 bg-slate-50 text-slate-500 text-[9px] font-black rounded-lg border border-slate-100 uppercase tracking-widest">{opp.type}</span>
                   <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg border border-indigo-100 uppercase tracking-widest">{opp.category}</span>
                </div>

                <div className={`p-4 rounded-2xl border ${isUrgent ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</p>
                    {isUrgent && <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Urgent</span>}
                  </div>
                  <p className={`text-sm font-black ${isUrgent ? 'text-amber-700' : 'text-slate-700'}`}>{opp.deadline}</p>
                </div>
              </div>

              <a 
                href={opp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-4 bg-slate-900 text-white text-center font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Apply for Event
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpportunityHub;
