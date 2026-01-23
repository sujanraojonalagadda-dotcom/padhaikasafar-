
import React, { useState } from 'react';
import { getRecommendedOpportunities } from '../../utils/opportunityEngine.js';

const OpportunityHub = ({ profile, onBackToHome }) => {
  const [filterType, setFilterType] = useState('All');
  const [filterCat, setFilterCat] = useState('All');
  
  const recommended = getRecommendedOpportunities(profile);
  
  const filtered = recommended.filter(opp => {
    if (filterType !== 'All' && opp.type !== filterType) return false;
    if (filterCat !== 'All' && opp.category !== filterCat) return false;
    return true;
  });

  const now = new Date();

  return React.createElement('div', { className: "space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500" },
    React.createElement('div', { className: "flex flex-col gap-6" },
      React.createElement('div', { className: "flex flex-col md:flex-row md:items-end justify-between gap-6" },
        React.createElement('div', { className: "space-y-2" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement('span', { className: "px-2 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded uppercase tracking-widest" }, "Opportunities"),
            React.createElement('span', { className: "px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-black rounded uppercase tracking-widest" }, "Global Events")
          ),
          React.createElement('h3', { className: "text-3xl font-black text-slate-900 leading-none" }, "Hackathons & Challenges"),
          React.createElement('p', { className: "text-sm font-medium text-slate-400" }, `Events matching your ${profile.interest} journey.`)
        ),
        React.createElement('button', { 
          onClick: onBackToHome, 
          className: "px-5 py-2 text-[10px] font-black bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest self-start md:self-auto shadow-sm" 
        }, "← Return to Home")
      ),
      React.createElement('div', { className: "flex flex-wrap gap-2" },
        React.createElement('select', { 
          className: "px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none",
          value: filterType,
          onChange: (e) => setFilterType(e.target.value)
        },
          React.createElement('option', { value: "All" }, "All Types"),
          React.createElement('option', { value: "Hackathon" }, "Hackathons"),
          React.createElement('option', { value: "Internship" }, "Internships"),
          React.createElement('option', { value: "Competition" }, "Competitions")
        )
      )
    ),
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
      filtered.map(opp => {
        const deadlineDate = new Date(opp.deadline);
        const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isUrgent = diffDays <= 14 && diffDays >= 0;

        return React.createElement('div', { key: opp.id, className: "bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-b-rose-500 flex flex-col group" },
          React.createElement('div', { className: "flex-1 space-y-4" },
            React.createElement('div', { className: "flex justify-between items-start" },
              React.createElement('div', { className: "space-y-1" },
                React.createElement('h4', { className: "text-lg font-black text-slate-900 leading-tight group-hover:text-rose-600 transition-colors" }, opp.title),
                React.createElement('p', { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest" }, opp.provider)
              ),
              React.createElement('div', { className: "w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl" }, "🏆")
            ),
            React.createElement('div', { className: `p-4 rounded-2xl border ${isUrgent ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}` },
              React.createElement('p', { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1" }, "Deadline"),
              React.createElement('p', { className: "text-sm font-black text-slate-700" }, opp.deadline)
            )
          ),
          React.createElement('a', { 
            href: opp.link, target: "_blank", rel: "noopener noreferrer",
            className: "mt-8 w-full py-4 bg-slate-900 text-white text-center font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg"
          }, "Apply for Event")
        );
      })
    )
  );
};

export default OpportunityHub;
