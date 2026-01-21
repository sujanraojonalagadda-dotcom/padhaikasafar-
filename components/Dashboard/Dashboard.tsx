
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, StudentProfile, Goal, UserAction, SyncEvent } from '../../types';
import ExternalPlatformGrid from '../ExternalLinks/ExternalPlatformGrid';
import CourseDiscovery from './CourseDiscovery';
import SwayamSearch from './SwayamSearch';
import EngineeringRoadmaps from './EngineeringRoadmaps';
import AIPreparationHub from './AIPreparationHub';
import ScholarshipHub from './ScholarshipHub';
import InternshipHub from './InternshipHub';
import CourseHub from './CourseHub';
import OpportunityHub from './OpportunityHub';
import SyncStatus from './SyncStatus';
import SyncTicker from './SyncTicker';
import { COURSE_DATABASE, OPPORTUNITY_DATABASE, SYNC_INTERVAL_MS } from '../../constants';
import { generateOpportunityActions } from '../../utils/opportunityEngine';
import { generateCourseActions } from '../../utils/courseEngine';

interface DashboardProps {
  user: UserProfile;
  profile: StudentProfile;
  goals: Goal[];
  onUpdateGoals: (goals: Goal[]) => void;
  onLogoutRequest: () => void;
}

export type ViewState = 'home' | 'career' | 'learning' | 'ecosystem' | 'scholarships' | 'internships' | 'courses' | 'opportunities';
export type ActionFilter = 'All' | 'Pending' | 'Done';

const Dashboard: React.FC<DashboardProps> = ({ user, profile, goals, onUpdateGoals, onLogoutRequest }) => {
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [actionFilter, setActionFilter] = useState<ActionFilter>('All');
  
  // Simulated Sync Engine State
  const [lastSync, setLastSync] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncEvents, setSyncEvents] = useState<SyncEvent[]>([]);

  // Simulation Logic: Check for "New" content periodically
  const runSync = useCallback(() => {
    setIsSyncing(true);
    
    setTimeout(() => {
      setLastSync(new Date());
      setIsSyncing(false);
      
      // Randomly "discover" something from the hidden items in the database
      // For simulation, we'll pick items that aren't already represented in goals
      const possibleNewCourses = COURSE_DATABASE.filter(c => !goals.some(g => g.actions.some(a => a.id.includes(c.id))));
      const possibleNewOpps = OPPORTUNITY_DATABASE.filter(o => !goals.some(g => g.actions.some(a => a.id.includes(o.id))));
      
      const newDiscoveries: SyncEvent[] = [];
      let updatedGoals = [...goals];
      let needsGoalUpdate = false;

      // 10% chance to discover a course
      if (Math.random() > 0.85 && possibleNewCourses.length > 0) {
        const item = possibleNewCourses[Math.floor(Math.random() * possibleNewCourses.length)];
        newDiscoveries.push({
          id: `sync_${Date.now()}`,
          message: `New Certification: ${item.title} by ${item.provider}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'course'
        });
        
        // Auto-create action
        const newActions = generateCourseActions([item]);
        updatedGoals = updatedGoals.map(g => {
          if (g.id === 'g_learning_path') {
            return { ...g, actions: [...newActions, ...g.actions].slice(0, 10) };
          }
          return g;
        });
        needsGoalUpdate = true;
      }

      // 10% chance to discover an opportunity
      if (Math.random() > 0.85 && possibleNewOpps.length > 0) {
        const item = possibleNewOpps[Math.floor(Math.random() * possibleNewOpps.length)];
        newDiscoveries.push({
          id: `sync_${Date.now() + 1}`,
          message: `Global Opportunity: ${item.title} by ${item.provider}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'opportunity'
        });

        // Auto-create action
        const newActions = generateOpportunityActions([item]);
        updatedGoals = updatedGoals.map(g => {
          if (g.id === 'g_opportunities') {
            return { ...g, actions: [...newActions, ...g.actions].slice(0, 10) };
          }
          return g;
        });
        needsGoalUpdate = true;
      }

      if (newDiscoveries.length > 0) {
        setSyncEvents(prev => [...newDiscoveries, ...prev].slice(0, 5));
        if (needsGoalUpdate) onUpdateGoals(updatedGoals);
      }
    }, 1500);
  }, [goals, onUpdateGoals]);

  useEffect(() => {
    const interval = setInterval(runSync, SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [runSync]);

  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> 
    },
    { 
      id: 'opportunities', 
      label: 'Events', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.547.547l-2.434-.487a2 2 0 00-1.022.547l-2.14 2.14a2 2 0 01-2.827 0l-2.14-2.14a2 2 0 010-2.827l2.14-2.14a2 2 0 012.827 0l2.14 2.14a2 2 0 001.022.547l2.434.487a4 4 0 002.547-.547l.675-.337a6 6 0 013.86-.517l2.387.477a2 2 0 011.022.547l2.14 2.14a2 2 0 010 2.827l-2.14 2.14z" /></svg> 
    },
    { 
      id: 'courses', 
      label: 'Courses', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> 
    },
    { 
      id: 'scholarships', 
      label: 'Scholarships', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
    },
    { 
      id: 'career', 
      label: 'Career Hub', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg> 
    },
    { 
      id: 'ecosystem', 
      label: 'Ecosystem', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> 
    },
  ];

  const handleToggleAction = (goalId: string, actionId: string) => {
    const nextGoals = goals.map(g => {
      if (g.id !== goalId) return g;
      return {
        ...g,
        actions: g.actions.map(a => a.id === actionId ? { ...a, status: a.status === 'Pending' ? 'Done' : 'Pending' } : a)
      };
    });
    onUpdateGoals(nextGoals as Goal[]);
  };

  const allActions = goals.flatMap(g => g.actions);
  const totalActions = allActions.length;
  const pendingActions = allActions.filter(a => a.status === 'Pending').length;
  const urgentActions = allActions.filter(a => a.status === 'Pending' && a.isUrgent);
  const doneActions = totalActions - pendingActions;
  const progressPercent = totalActions > 0 ? Math.round((doneActions / totalActions) * 100) : 0;

  const filteredGoals = goals.map(goal => ({
    ...goal,
    actions: goal.actions.filter(action => {
      if (actionFilter === 'All') return true;
      return action.status === actionFilter;
    })
  })).filter(goal => goal.actions.length > 0);

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col">
      <SyncTicker events={syncEvents} />
      
      <header className="bg-white/80 backdrop-blur-xl border-b border-indigo-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">P</div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Padhai Ka Safar</h1>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Future Readiness Hub</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${
                    activeView === item.id 
                      ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100 border border-slate-100' 
                      : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <SyncStatus lastSync={lastSync} isSyncing={isSyncing} />
              <div className="hidden md:flex flex-col items-end">
                <p className="text-sm font-black text-slate-900 leading-none mb-1">{user.name}</p>
                <div className="flex items-center gap-1">
                   <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-black uppercase border border-indigo-100">{profile.educationLevel}</span>
                   <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase border border-emerald-100">Year {profile.currentYear}</span>
                </div>
              </div>
              <button onClick={onLogoutRequest} className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {activeView === 'home' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black mb-6 uppercase tracking-widest border border-white/20">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                  Path: {profile.stream} • {profile.state}
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  Welcome back, <span className="text-cyan-300 underline decoration-cyan-300/30">{user.name.split(' ')[0]}</span>
                </h2>
                
                <div className="space-y-4 max-w-sm mb-8">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Journey Progress</span>
                     <span className="text-xl font-black">{progressPercent}%</span>
                   </div>
                   <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(52,211,153,0.5)]" style={{ width: `${progressPercent}%` }}></div>
                   </div>
                </div>

                {urgentActions.length > 0 && (
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-amber-400 text-amber-900 rounded-3xl font-black shadow-xl shadow-amber-400/20 animate-bounce cursor-pointer" onClick={() => setActionFilter('Pending')}>
                     <span className="text-xl">⚠️</span>
                     <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest leading-none mb-1 text-amber-800">Critical Deadlines</span>
                        <span className="text-sm">You have {urgentActions.length} urgent tasks today!</span>
                     </div>
                  </div>
                )}
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none select-none overflow-hidden">
                 <div className="text-[20rem] font-black -mr-10 -mt-10 rotate-12 text-white/5">SAFA</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Your Action Plan</h3>
                  <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                    {(['All', 'Pending', 'Done'] as ActionFilter[]).map(f => (
                      <button 
                        key={f}
                        onClick={() => setActionFilter(f)}
                        className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
                          actionFilter === f ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {filteredGoals.map(goal => (
                    <div key={goal.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm space-y-6 hover:shadow-xl transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                           <h4 className="text-xl font-black text-slate-900">{goal.title}</h4>
                        </div>
                        <p className="text-sm font-medium text-slate-400 pl-3.5">{goal.description}</p>
                      </div>
                      <div className="space-y-3">
                        {goal.actions.map(action => (
                          <div 
                            key={action.id} 
                            className={`flex flex-col sm:flex-row items-center justify-between p-5 rounded-3xl border transition-all ${
                              action.status === 'Done' ? 'bg-emerald-50 border-emerald-100 opacity-80' : 'bg-white border-slate-100'
                            }`}
                          >
                            <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                               <button 
                                onClick={() => handleToggleAction(goal.id, action.id)}
                                className={`mt-1 w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                                  action.status === 'Done' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border-2 border-slate-200'
                                }`}
                               >
                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                               </button>
                               <div>
                                 <p className={`font-black text-slate-800 transition-all ${action.status === 'Done' ? 'line-through text-slate-400' : ''}`}>
                                   {action.title}
                                   {action.isUrgent && <span className="ml-2 text-[8px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full no-underline uppercase tracking-widest font-black">EXPIRING</span>}
                                   {action.isAutoGenerated && <span className="ml-2 text-[8px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full no-underline uppercase tracking-widest font-black">AI SYNCED</span>}
                                 </p>
                                 <p className="text-[11px] text-slate-500 font-medium">{action.description}</p>
                               </div>
                            </div>
                            <a 
                              href={action.link} target="_blank" rel="noopener noreferrer"
                              className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all text-center w-full sm:w-auto shadow-md"
                            >
                              Go to Website
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                 <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                    <h4 className="text-xl font-black mb-6">Profile Snapshot</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-white/10">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Education</span>
                         <span className="text-sm font-bold">{profile.educationLevel} (Yr {profile.currentYear})</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-white/10">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interest</span>
                         <span className="text-sm font-bold">{profile.interest}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">State</span>
                         <span className="text-sm font-bold">{profile.state}</span>
                      </div>
                    </div>
                 </div>
                 
                 <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-4">🏆</div>
                    <h4 className="text-lg font-black text-slate-900 mb-2">Upcoming Events</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">We've identified <b>{goals.find(g => g.id === 'g_opportunities')?.actions.length || 0} hackathons</b> matching your skills.</p>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => setActiveView('opportunities')} className="w-full py-3 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all shadow-md shadow-rose-100">Browse Events</button>
                      <button onClick={() => setActiveView('courses')} className="w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all border border-indigo-100">Upgrade Skills</button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'opportunities' && <OpportunityHub profile={profile} />}
        {activeView === 'courses' && <CourseHub profile={profile} userId={user.id} />}
        {activeView === 'internships' && <InternshipHub profile={profile} />}
        {activeView === 'scholarships' && <ScholarshipHub profile={profile} />}
        {activeView === 'career' && <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500"><AIPreparationHub /><EngineeringRoadmaps onNavigate={setActiveView} /></div>}
        {activeView === 'learning' && <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500"><CourseDiscovery /><div className="max-w-3xl"><SwayamSearch /></div></div>}
        {activeView === 'ecosystem' && <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500"><div className="space-y-1 max-w-2xl"><h3 className="text-3xl font-black text-slate-900 tracking-tight">Ecosystem Portals</h3><p className="text-sm font-medium text-slate-400">Direct access to official student platforms. We do not store credentials.</p></div><ExternalPlatformGrid /></div>}
      </main>

      <footer className="bg-white border-t border-slate-100 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center font-black text-white text-xs">P</div>
             <h4 className="text-lg font-black tracking-tighter text-slate-900">Padhai Ka Safar</h4>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">© 2025 BRIGHT FUTURE INITIATIVE • PRIVACY PROTECTED</div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
