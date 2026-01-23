
import React, { useState } from 'react';
import { INTERNSHIP_PORTALS } from '../../constants.js';

const InternshipHub = ({ profile, onBackToHome }) => {
  const [filterType, setFilterType] = useState('All');

  const filtered = INTERNSHIP_PORTALS.filter(i => {
    if (filterType !== 'All' && i.type !== filterType) return false;
    return true;
  });

  return React.createElement('div', { className: "space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500" },
    React.createElement('div', { className: "flex flex-col gap-6" },
      React.createElement('div', { className: "flex flex-col md:flex-row md:items-end justify-between gap-6" },
        React.createElement('div', { className: "space-y-2" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement('span', { className: "px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded uppercase tracking-widest" }, "Internships"),
            React.createElement('span', { className: "px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded uppercase tracking-widest" }, "Industry Launchpad")
          ),
          React.createElement('h3', { className: "text-3xl font-black text-slate-900 leading-none" }, "Official Internship Hub"),
          React.createElement('p', { className: "text-sm font-medium text-slate-400" }, "Discover verified internship schemes.")
        ),
        React.createElement('button', { 
          onClick: onBackToHome, 
          className: "px-5 py-2 text-[10px] font-black bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest self-start md:self-auto shadow-sm" 
        }, "← Return to Home")
      ),
      React.createElement('div', { className: "flex bg-slate-100 p-1 rounded-2xl border border-slate-200 w-fit" },
        ['All', 'Govt', 'Startup'].map(f => React.createElement('button', {
          key: f,
          onClick: () => setFilterType(f),
          className: `px-4 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
            filterType === f ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`
        }, f))
      )
    ),
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
      filtered.map(i => React.createElement('div', { key: i.id, className: "bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-b-indigo-500 flex flex-col group" },
        React.createElement('div', { className: "flex-1 space-y-4" },
          React.createElement('div', { className: "flex justify-between items-start" },
            React.createElement('div', { className: "space-y-1" },
              React.createElement('div', { className: "flex items-center gap-2" },
                React.createElement('h4', { className: "text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors" }, i.title),
                React.createElement('span', { className: `text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                  i.type === 'Govt' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                }` }, i.type)
              ),
              React.createElement('p', { className: "text-xs font-black text-slate-400 uppercase tracking-widest" }, i.organization)
            ),
            React.createElement('div', { className: "w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center text-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all" }, "💼")
          ),
          React.createElement('p', { className: "text-sm font-medium text-slate-500 leading-relaxed" }, i.description),
          React.createElement('div', { className: "grid grid-cols-2 gap-4" },
            React.createElement('div', { className: "p-3 bg-slate-50 rounded-2xl border border-slate-100" },
              React.createElement('p', { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1" }, "Duration"),
              React.createElement('p', { className: "text-xs font-bold text-slate-700" }, i.duration)
            ),
            React.createElement('div', { className: "p-3 bg-slate-50 rounded-2xl border border-slate-100" },
              React.createElement('p', { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1" }, "Stipend"),
              React.createElement('p', { className: "text-xs font-bold text-slate-700" }, i.stipend)
            )
          )
        ),
        React.createElement('a', { href: i.link, target: "_blank", rel: "noopener noreferrer", className: "mt-8 w-full py-4 bg-slate-900 text-white text-center font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2" },
          "Go to Portal",
          React.createElement('svg', { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
            React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M14 5l7 7m0 0l-7 7m7-7H3" })
          )
        )
      ))
    )
  );
};

export default InternshipHub;
