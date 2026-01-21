
import React, { useState, useEffect } from 'react';
import { Course, CourseStatus, StudentProfile } from '../../types';
import { getRecommendedCourses } from '../../utils/courseEngine';

interface CourseHubProps {
  profile: StudentProfile;
  userId: string;
}

const CourseHub: React.FC<CourseHubProps> = ({ profile, userId }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | Course['category']>('All');
  const [courseStatuses, setCourseStatuses] = useState<CourseStatus[]>([]);
  
  const recommended = getRecommendedCourses(profile);

  useEffect(() => {
    const savedStatuses = localStorage.getItem(`course_statuses_${userId}`);
    if (savedStatuses) {
      setCourseStatuses(JSON.parse(savedStatuses));
    }
  }, [userId]);

  const updateStatus = (courseId: string, status: CourseStatus['status']) => {
    const nextStatuses = courseStatuses.filter(s => s.courseId !== courseId);
    nextStatuses.push({ courseId, status });
    setCourseStatuses(nextStatuses);
    localStorage.setItem(`course_statuses_${userId}`, JSON.stringify(nextStatuses));
  };

  const filtered = recommended.filter(c => {
    if (activeCategory === 'All') return true;
    return c.category === activeCategory;
  });

  const categories = ['All', ...new Set(recommended.map(c => c.category))];

  const getStatus = (courseId: string) => {
    return courseStatuses.find(s => s.courseId === courseId)?.status || 'Not Started';
  };

  const getProviderColor = (provider: Course['provider']) => {
    switch (provider) {
      case 'Google': return 'bg-blue-600';
      case 'Microsoft': return 'bg-cyan-600';
      case 'IBM': return 'bg-indigo-700';
      case 'SWAYAM': return 'bg-orange-500';
      case 'NVIDIA': return 'bg-emerald-600';
      case 'IIT': return 'bg-red-600';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded uppercase tracking-widest">Learning</span>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded uppercase tracking-widest">Skill Upgrade</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 leading-none">Course Recommendation Engine</h3>
          <p className="text-sm font-medium text-slate-400">Certified pathways curated for your {profile.interest} journey.</p>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
                activeCategory === cat ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => {
          const status = getStatus(course.id);
          return (
            <div key={course.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-b-indigo-500 flex flex-col group">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`px-3 py-1.5 ${getProviderColor(course.provider)} text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100`}>
                    {course.provider}
                  </div>
                  {course.is_new && (
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[8px] font-black uppercase animate-pulse">New Course</span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{course.title}</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.category} • {course.education_level}</span>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                    <span className={`text-[10px] font-black uppercase ${
                      status === 'Completed' ? 'text-emerald-600' : status === 'In Progress' ? 'text-amber-600' : 'text-slate-400'
                    }`}>{status}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {status === 'Not Started' ? (
                      <button 
                        onClick={() => updateStatus(course.id, 'In Progress')}
                        className="flex-1 py-2 text-[9px] font-black bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all uppercase tracking-widest"
                      >
                        Mark as Started
                      </button>
                    ) : status === 'In Progress' ? (
                      <button 
                        onClick={() => updateStatus(course.id, 'Completed')}
                        className="flex-1 py-2 text-[9px] font-black bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all uppercase tracking-widest"
                      >
                        Mark as Done
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateStatus(course.id, 'Not Started')}
                        className="flex-1 py-2 text-[9px] font-black bg-slate-100 text-slate-400 rounded-lg transition-all uppercase tracking-widest"
                      >
                        Restart Course
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <a 
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-4 bg-slate-900 text-white text-center font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Enroll Now
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

export default CourseHub;
