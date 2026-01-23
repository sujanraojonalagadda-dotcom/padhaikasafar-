
import React, { useState } from 'react';
import { getEligibleScholarships } from '../../utils/scholarshipEngine.js';

const ScholarshipHub = ({ profile, onBackToHome }) => {
  const [eduFilter, setEduFilter] = useState('All');
  
  const eligible = getEligibleScholarships(profile);
  
  const filtered = eligible.filter(s => {
    if (eduFilter !== 'All' && !s.description.includes(eduFilter)) return false;
    return true;
  });

  return React.createElement('div', { className: "space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500" },
    React.createElement('div', { className: "flex flex-col gap-6" },
      React.createElement('div', { className: "flex flex-col md:flex-row md:items-end justify-between gap-6" },
        React.createElement('div', { className: "space-y-2" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement('span', { className: "px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded uppercase tracking-widest" }, "Scholarships"),
            React.createElement('span', { className: "px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-widest" }, "Matched For You")
          ),
          React.createElement('h3', { className: "text-3xl font-black text-slate-900 leading-none" }, "Financial Support Center"),
          React.createElement('p', { className: "text-sm font-medium text-slate-400" }, "Based on your income, gender, and education level.")
        ),
        React.createElement('button', { 
          onClick: onBackToHome, 
          className: "px-5 py-2 text-[10px] font-black bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest self-start md:self-auto shadow-sm" 
        }, "← Return to Home")
      ),
      React.createElement('div', { className: "flex flex-wrap gap-2" },
        React.createElement('select', { 
          className: "px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none",
          value: eduFilter,
          onChange: (e) => setEduFilter(e.target.value)
        },
          React.createElement('option', { value: "All" }, "All Education"),
          React.createElement('option', { value: "UG" }, "Undergraduate"),
          React.createElement('option', { value: "Diploma" }, "Diploma"),
          React.createElement('option', { value: "PG" }, "Postgraduate")
        )
      )
    ),
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
      filtered.length > 0 ? filtered.map(s => React.createElement('div', { key: s.id, className: "bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all border-b-4 border-b-emerald-500 flex flex-col h-full" },
        React.createElement('div', { className: "flex-1 space-y-4" },
          React.createElement('div', { className: "flex justify-between items-start" },
            React.createElement('div', { className: "space-y-1" },
              React.createElement('h4', { className: "text-xl font-black text-slate-900" }, s.name),
              React.createElement('div', { className: "flex items-center gap-2" },
                React.createElement('span', { className: "text-[10px] font-black bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md uppercase tracking-widest" }, `Deadline: ${s.deadline}`)
              )
            ),
            React.createElement('div', { className: "w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl" }, "₹")
          ),
          React.createElement('p', { className: "text-sm font-medium text-slate-500 leading-relaxed" }, s.description),
          React.createElement('div', { className: "p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100" },
            React.createElement('p', { className: "text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1" }, "Why you are eligible:"),
            React.createElement('p', { className: "text-xs font-bold text-emerald-800" }, s.eligibilityExplanation)
          )
        ),
        React.createElement('a', { href: s.applyLink, target: "_blank", rel: "noopener noreferrer", className: "mt-8 w-full py-4 bg-slate-900 text-white text-center font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg" }, "Apply via Official Portal")
      )) : React.createElement('div', { className: "col-span-full py-20 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]" },
        React.createElement('div', { className: "text-5xl mb-4" }, "🔦"),
        React.createElement('h4', { className: "text-xl font-black text-slate-900" }, "No matching scholarships found")
      )
    )
  );
};

export default ScholarshipHub;
