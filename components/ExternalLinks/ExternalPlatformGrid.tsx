
import React from 'react';
import { EXTERNAL_PLATFORMS } from '../../constants';

const ExternalPlatformGrid: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Responsive Privacy Note Banner */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all hover:bg-indigo-100/50">
        <div className="text-indigo-600 p-2.5 bg-white rounded-xl shadow-sm flex-shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-indigo-900">Official Redirection Security</p>
          <p className="text-sm text-indigo-800/80 leading-relaxed">
            You will be redirected to the official website in a new tab. 
            <span className="font-semibold text-indigo-900"> Padhai Ka Safar </span> 
            maintains a strict zero-sharing policy for your personal data with these external platforms.
          </p>
        </div>
      </div>

      {/* Optimized Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {EXTERNAL_PLATFORMS.map((platform) => (
          <a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${platform.name}`}
            className="group flex flex-col h-full p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Right External Link Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            
            {/* Icon with Accessibility Tooltip */}
            <div className="relative inline-block w-fit mb-5 group/icon">
              <div 
                className="text-4xl transition-all group-hover:scale-110 group-hover:-rotate-3 duration-300 cursor-help drop-shadow-sm" 
                aria-hidden="true"
              >
                {platform.icon}
              </div>
              
              {/* Tooltip implementation */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-2xl opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 ring-1 ring-white/10 scale-95 group-hover/icon:scale-100">
                Open {platform.name}
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                  {platform.name}
                </h3>
              </div>
              
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-3 bg-indigo-50 px-2 py-0.5 rounded-md self-start border border-indigo-100/50">
                {platform.category}
              </span>
              
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                {platform.description}
              </p>
            </div>

            {/* Bottom Action Indicator */}
            <div className="pt-4 border-t border-slate-50 mt-auto flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">
                Launch Portal
              </span>
              <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExternalPlatformGrid;
