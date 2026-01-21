
import React from 'react';

interface SyncStatusProps {
  lastSync: Date;
  isSyncing: boolean;
}

const SyncStatus: React.FC<SyncStatusProps> = ({ lastSync, isSyncing }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
      <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest leading-none">
          {isSyncing ? 'Syncing Global Hub...' : 'Synchronized with Global APIs'}
        </span>
        <span className="text-[8px] font-bold text-emerald-600/60 uppercase tracking-tighter">
          Last Check: {lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default SyncStatus;
