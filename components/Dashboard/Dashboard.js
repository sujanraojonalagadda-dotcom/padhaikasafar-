
import React, { useState, useEffect, useCallback } from 'react';
import SyncStatus from './SyncStatus.js';
import SyncTicker from './SyncTicker.js';
import ScholarshipHub from './ScholarshipHub.js';
import InternshipHub from './InternshipHub.js';
import CourseHub from './CourseHub.js';
import OpportunityHub from './OpportunityHub.js';
import { SYNC_INTERVAL_MS } from '../../constants.js';

const Dashboard = ({ user, profile, goals, onUpdateGoals, onLogoutRequest }) => {
  const [activeView, setActiveView] = useState('home');
  const [lastSync, setLastSync] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncEvents, setSyncEvents] = useState([]);

  const runSync = useCallback(() => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSync(new Date());
      setIsSyncing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const interval = setInterval(runSync, SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [runSync]);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'opportunities', label: 'Events', icon: '🏆' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'scholarships', label: 'Scholarships', icon: '🎓' },
    { id: 'internships', label: 'Internships', icon: '💼' },
    { id: 'ecosystem', label: 'Ecosystem', icon: '🌐' }
  ];

  const handleToggleAction = (goalId, actionId) => {
    const nextGoals = goals.map(g => {
      if (g.id !== goalId) return g;
      return {
        ...g,
        actions: g.actions.map(a => a.id === actionId ? { ...a, status: a.status === 'Pending' ? 'Done' : 'Pending' } : a)
      };
    });
    onUpdateGoals(nextGoals);
  };

  const doneActions = goals.flatMap(g => g.actions).filter(a => a.status === 'Done').length;
  const totalActions = goals.flatMap(g => g.actions).length;
  const progressPercent = totalActions > 0 ? Math.round((doneActions / totalActions) * 100) : 0;

  const handleBackToHome = () => setActiveView('home');

  const renderContent = () => {
    switch (activeView) {
      case 'scholarships': return React.createElement(ScholarshipHub, { profile, onBackToHome: handleBackToHome });
      case 'internships': return React.createElement(InternshipHub, { profile, onBackToHome: handleBackToHome });
      case 'courses': return React.createElement(CourseHub, { profile, userId: user.id, onBackToHome: handleBackToHome });
      case 'opportunities': return React.createElement(OpportunityHub, { profile, onBackToHome: handleBackToHome });
      case 'ecosystem': return React.createElement('div', { className: "py-20 text-center bg-white rounded-[3rem] border shadow-sm space-y-6" }, 
        React.createElement('div', { className: "text-5xl" }, "🌐"),
        React.createElement('h3', { className: "text-2xl font-black" }, "Ecosystem Portal"),
        React.createElement('p', { className: "text-slate-500 max-w-sm mx-auto" }, "Direct gateway to official government portals. Ensure you have your IDs ready."),
        React.createElement('button', { onClick: handleBackToHome, className: "px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all" }, "Return to Dashboard")
      );
      default: return React.createElement('div', { className: "space-y-10" },
        React.createElement('div', { className: "bg-gradient-to-br from-indigo-700 to-purple-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden" },
          React.createElement('div', { className: "relative z-10" },
            React.createElement('h2', { className: "text-4xl font-black mb-6" }, `Welcome back, ${user.name.split(' ')[0]}`),
            React.createElement('div', { className: "max-w-xs" },
              React.createElement('div', { className: "flex justify-between text-[10px] mb-2 uppercase font-black tracking-widest opacity-80" }, 
                React.createElement('span', null, "Journey Progress"),
                React.createElement('span', null, `${progressPercent}%`)
              ),
              React.createElement('div', { className: "h-3 bg-white/20 rounded-full overflow-hidden p-0.5" },
                React.createElement('div', { className: "h-full bg-emerald-400 rounded-full transition-all duration-1000", style: { width: `${progressPercent}%` } })
              )
            )
          ),
          React.createElement('div', { className: "absolute -right-20 -bottom-20 text-[15rem] font-black text-white/5 select-none" }, "SAF")
        ),
        React.createElement('div', { className: "space-y-6" },
          goals.map(goal => React.createElement('div', { key: goal.id, className: "bg-white p-8 rounded-[2rem] border shadow-sm hover:shadow-md transition-shadow" },
            React.createElement('div', { className: "flex items-center gap-2 mb-4" },
              React.createElement('span', { className: "w-1 h-6 bg-indigo-500 rounded-full" }),
              React.createElement('h4', { className: "text-xl font-black text-slate-900" }, goal.title)
            ),
            React.createElement('div', { className: "space-y-3" },
              goal.actions.map(action => React.createElement('div', { key: action.id, className: `flex items-center justify-between p-5 rounded-2xl border transition-all ${action.status === 'Done' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}` },
                React.createElement('div', { className: "flex items-center gap-4" },
                  React.createElement('button', { 
                    onClick: () => handleToggleAction(goal.id, action.id),
                    className: `w-8 h-8 rounded-xl flex items-center justify-center transition-all ${action.status === 'Done' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white border-2 border-slate-200'}`
                  }, "✓"),
                  React.createElement('div', null,
                    React.createElement('p', { className: `font-black text-sm ${action.status === 'Done' ? 'line-through text-slate-400' : 'text-slate-800'}` }, action.title),
                    React.createElement('p', { className: "text-[10px] text-slate-500 font-bold" }, action.description)
                  )
                ),
                React.createElement('a', { href: action.link, target: "_blank", className: "px-4 py-2 bg-white border border-slate-200 text-[10px] font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest shadow-sm" }, "Launch")
              ))
            )
          ))
        )
      );
    }
  };

  return React.createElement('div', { className: "min-h-screen bg-[#f8faff] flex flex-col" },
    React.createElement(SyncTicker, { events: syncEvents }),
    React.createElement('header', { className: "bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-4 h-20" },
      React.createElement('div', { className: "max-w-7xl mx-auto h-full flex items-center justify-between" },
        React.createElement('div', { className: "flex items-center gap-8" },
          React.createElement('div', { onClick: handleBackToHome, className: "flex items-center gap-3 cursor-pointer" },
            React.createElement('div', { className: "w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100" }, "P"),
            React.createElement('div', { className: "hidden md:block" },
              React.createElement('h1', { className: "font-black text-slate-900 leading-none" }, "Padhai Ka Safar"),
              React.createElement('p', { className: "text-[9px] font-black text-indigo-500 uppercase tracking-widest mt-1" }, "Student Gateway")
            )
          ),
          React.createElement('nav', { className: "hidden lg:flex items-center bg-slate-100 p-1 rounded-2xl gap-1" },
            navItems.map(item => React.createElement('button', {
              key: item.id,
              onClick: () => setActiveView(item.id),
              className: `px-4 py-2 text-[10px] font-black rounded-xl uppercase tracking-tight transition-all ${activeView === item.id ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800'}`
            }, item.label))
          )
        ),
        React.createElement('div', { className: "flex items-center gap-4" },
          React.createElement(SyncStatus, { lastSync, isSyncing }),
          React.createElement('button', { onClick: onLogoutRequest, className: "p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all" }, 
            React.createElement('svg', { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, 
              React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7" })
            )
          )
        )
      )
    ),
    React.createElement('main', { className: "flex-1 max-w-7xl mx-auto w-full px-4 py-8" },
      renderContent()
    ),
    React.createElement('nav', { className: "lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex justify-between z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]" },
      navItems.map(item => React.createElement('button', {
        key: item.id,
        onClick: () => setActiveView(item.id),
        className: `flex flex-col items-center gap-1 transition-all ${activeView === item.id ? 'text-indigo-600 scale-110' : 'text-slate-400'}`
      }, 
        React.createElement('span', { className: "text-xl" }, item.icon),
        React.createElement('span', { className: "text-[8px] font-black uppercase tracking-tighter" }, item.label)
      ))
    )
  );
};

export default Dashboard;
