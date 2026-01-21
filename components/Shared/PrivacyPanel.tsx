
import React from 'react';
import { PRIVACY_CHECKS } from '../../constants';

const PrivacyPanel: React.FC = () => {
  return (
    <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-5 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <h3 className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em]">Privacy Status Panel</h3>
        </div>
        <span className="text-[9px] font-black text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-100">ACTIVE PROTECTION</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {PRIVACY_CHECKS.map((check, idx) => (
          <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-emerald-700">
            <div className="w-5 h-5 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{check.label}</span>
          </div>
        ))}
      </div>
      
      <p className="text-[9px] font-medium text-emerald-600/70 border-t border-emerald-100 pt-3">
        * We only use verification tokens to maintain your session. We do not track cross-site behavior or sell your profile data.
      </p>
    </div>
  );
};

export default PrivacyPanel;
