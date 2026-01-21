
import React, { useState } from 'react';
import { Scholarship, StudentProfile } from '../../types';
import { getEligibleScholarships } from '../../utils/scholarshipEngine';

interface ScholarshipHubProps {
  profile: StudentProfile;
}

const ScholarshipHub: React.FC<ScholarshipHubProps> = ({ profile }) => {
  const [stateFilter, setStateFilter] = useState('');
  const [eduFilter, setEduFilter] = useState('All');
  
  const eligible = getEligibleScholarships(profile);
  
  const filtered = eligible.filter(s => {
    if (eduFilter !== 'All' && !s.description.includes(eduFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded uppercase tracking-widest">Scholarships</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-widest">Matched For You</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 leading-none">Financial Support Center</h3>
          <p className="text-sm font-medium text-slate-400">Based on your income, gender, and education level, we've found these opportunities.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select 
            className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
            value={eduFilter}
            onChange={(e) => setEduFilter(e.target.value)}
          >
            <option value="All">All Education</option>
            <option value="UG">Undergraduate</option>
            <option value="Diploma">Diploma</option>
            <option value="PG">Postgraduate</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length > 0 ? filtered.map(s => (
          <div key={s.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all border-b-4 border-b-emerald-500 flex flex-col h-full">
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900">{s.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md uppercase tracking-widest">Deadline: {s.deadline}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl">₹</div>
              </div>

              <p className="text-sm font-medium text-slate-500 leading-relaxed">{s.description}</p>
              
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Why you are eligible:</p>
                <p className="text-xs font-bold text-emerald-800">{s.eligibilityExplanation}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Required Documents:</p>
                <div className="flex flex-wrap gap-2">
                  {s.docsNeeded.map(doc => (
                    <span key={doc} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">{doc}</span>
                  ))}
                </div>
              </div>
            </div>

            <a 
              href={s.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-4 bg-slate-900 text-white text-center font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
            >
              Apply via Official Portal
            </a>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]">
             <div className="text-5xl mb-4">🔦</div>
             <h4 className="text-xl font-black text-slate-900">No matching scholarships found</h4>
             <p className="text-sm font-medium text-slate-400 max-w-xs mx-auto">Try updating your income or education details in your profile to re-check eligibility.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipHub;
