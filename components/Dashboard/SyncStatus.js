
import React from 'react';

const SyncStatus = ({ lastSync, isSyncing }) => {
  return React.createElement('div', { className: "flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100" },
    React.createElement('div', { className: `w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}` }),
    React.createElement('div', null,
      React.createElement('span', { className: "text-[9px] font-black text-emerald-800 block" }, isSyncing ? 'Syncing...' : 'Synchronized'),
      React.createElement('span', { className: "text-[8px] text-emerald-600" }, `Last: ${lastSync.toLocaleTimeString()}`)
    )
  );
};

export default SyncStatus;
