
import React, { useState } from 'react';
import { ENGINEERING_ROADMAPS } from '../../constants';

interface EngineeringRoadmapsProps {
  onNavigate?: (view: any) => void;
}

// Detailed data for the Study Plan Modal
const STUDY_PLANS = [
  {
    year: '1st Year',
    objective: 'Build a rock-solid foundation in logic and computational thinking.',
    phases: [
      { name: 'Month 1-3: Logic Building', topics: ['C/C++ Syntax', 'Control Flow', 'Pattern Printing', 'Basic Recursion'], resource: 'Harvard CS50' },
      { name: 'Month 4-6: Web Basics', topics: ['HTML5 Semantic tags', 'CSS3 Flexbox/Grid', 'JavaScript Basics', 'DOM Manipulation'], resource: 'FreeCodeCamp' },
      { name: 'Month 7-12: Core Science', topics: ['Discrete Mathematics', 'Physics for Computing', 'Digital Electronics'], resource: 'MIT OCW' }
    ]
  },
  {
    year: '2nd Year',
    objective: 'Master Data Structures and Algorithms to become problem-solving proficient.',
    phases: [
      { name: 'Month 1-4: Advanced DSA', topics: ['Trees', 'Graphs', 'Dynamic Programming', 'Tries', 'Segment Trees'], resource: 'Striver’s A2Z Sheet' },
      { name: 'Month 5-8: Development Phase', topics: ['React.js Basics', 'Node.js/Express', 'MongoDB basics', 'REST APIs'], resource: 'The Odin Project' },
      { name: 'Month 9-12: CS Fundamentals', topics: ['Operating Systems', 'DBMS (SQL)', 'Computer Networks'], resource: 'GateSmashers' }
    ]
  },
  {
    year: '3rd Year',
    objective: 'Specialization and securing industry-level internships.',
    phases: [
      { name: 'Month 1-3: Specialization', topics: ['Cloud Computing', 'Machine Learning Basics', 'DevOps (Docker/K8s)'], resource: 'Microsoft Learn' },
      { name: 'Month 4-6: High-Level Design', topics: ['System Design (HLD/LLD)', 'Database Sharding', 'Microservices'], resource: 'Grokking the System Design' },
      { name: 'Month 7-12: Internship Hunt', topics: ['Resume Building', 'Mock Interviews', 'Aptitude Practice'], resource: 'Padhai Ka Safar AI Hub' }
    ]
  },
  {
    year: '4th Year',
    objective: 'Cracking top-tier MNC placements and core technical roles.',
    phases: [
      { name: 'Month 1-3: Placement Grinding', topics: ['Company Specific Sheets', 'Puzzles', 'HR behavioral prep'], resource: 'LeetCode Discuss' },
      { name: 'Month 4-6: Capstone Project', topics: ['Full Scale Deployment', 'Testing/QA', 'Open Source Contribution'], resource: 'GitHub' },
      { name: 'Month 7-12: Transition', topics: ['Corporate Etiquette', 'Advanced Specialization', 'GATE/GRE Prep'], resource: 'NPTEL' }
    ]
  }
];

const EngineeringRoadmaps: React.FC<EngineeringRoadmapsProps> = ({ onNavigate }) => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const currentRoadmap = ENGINEERING_ROADMAPS[selectedYear];
  const currentPlan = STUDY_PLANS[selectedYear];

  const handleStartPath = () => {
    setIsActivating(true);
    // Simulate some logic being "set up" or "saved" before navigation
    setTimeout(() => {
      setIsPlanOpen(false);
      setIsActivating(false);
      if (onNavigate) {
        onNavigate('learning');
      }
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-black rounded uppercase tracking-widest">CAREER PATHS</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black rounded uppercase tracking-widest">FOR ALL BATCHES</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 leading-none">Engineering Roadmaps</h3>
          <p className="text-sm font-medium text-slate-400">Step-by-step guidance from 1st year to placement.</p>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          {ENGINEERING_ROADMAPS.map((roadmap, idx) => (
            <button
              key={roadmap.year}
              onClick={() => setSelectedYear(idx)}
              className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-tight ${
                selectedYear === idx
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {roadmap.year.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
        
        {currentRoadmap.milestones.map((milestone, mIdx) => (
          <div key={milestone.title} className="relative z-10 group">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentRoadmap.color} flex items-center justify-center text-white font-black shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
              {mIdx + 1}
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{milestone.title}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{milestone.desc}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-50">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Milestone {mIdx + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-10 p-6 rounded-3xl bg-gradient-to-r ${currentRoadmap.color} text-white`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Current Batch Focus</p>
            <h4 className="text-2xl font-black">{currentRoadmap.focus}</h4>
          </div>
          <button 
            onClick={() => setIsPlanOpen(true)}
            className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:scale-105 transition-transform shadow-xl shadow-black/10 active:scale-95"
          >
            View Full Study Plan
          </button>
        </div>
      </div>

      {/* Study Plan Modal Overlay */}
      {isPlanOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className={`p-8 bg-gradient-to-r ${currentRoadmap.color} text-white flex items-center justify-between shrink-0`}>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Curriculum Guide</span>
                <h3 className="text-3xl font-black">{currentPlan.year} Detailed Study Plan</h3>
              </div>
              <button 
                onClick={() => setIsPlanOpen(false)}
                className="p-3 bg-white/20 hover:bg-white/40 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto space-y-10">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
                <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">Core Objective</h4>
                <p className="text-lg font-bold text-slate-800 leading-relaxed">{currentPlan.objective}</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-black text-slate-900 px-1">Quarterly Learning Phases</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentPlan.phases.map((phase, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-black text-xs mb-4">
                        {idx + 1}
                      </div>
                      <h5 className="font-black text-slate-900 mb-3">{phase.name}</h5>
                      <ul className="space-y-2 mb-6">
                        {phase.topics.map(topic => (
                          <li key={topic} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-slate-50">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-1">Top Resource</span>
                        <span className="text-xs font-black text-indigo-500">{phase.resource}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-center space-y-3">
                 {isActivating ? (
                    <div className="py-6 flex flex-col items-center gap-4 animate-in fade-in duration-300">
                       <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                       <p className="text-sm font-black text-indigo-600 uppercase tracking-widest">Activating Learning Path...</p>
                    </div>
                 ) : (
                    <>
                      <div className="text-3xl">🚀</div>
                      <h5 className="font-bold text-slate-800">Ready to start this path?</h5>
                      <p className="text-sm text-slate-500 max-w-md mx-auto">This study plan is synchronized with industry standards for 2025. Clicking below will take you to the Learning Hub to start searching for these topics.</p>
                      <button 
                        onClick={handleStartPath}
                        className={`mt-4 px-8 py-3 bg-gradient-to-r ${currentRoadmap.color} text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-indigo-100`}
                      >
                        Got it, Let's Go!
                      </button>
                    </>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringRoadmaps;
