
import React from 'react';

const SyncTicker = ({ events = [] }) => {
  if (!events || events.length === 0) {
    return React.createElement('div', { className: "bg-slate-900 py-2 text-white text-center text-[10px] font-black uppercase tracking-[0.2em]" },
      "• SCANNING GLOBAL DATABASES • SECURE CONNECTION ACTIVE •"
    );
  }

  return React.createElement('div', { className: "bg-slate-900 py-2 text-white text-center text-xs overflow-hidden h-8 flex items-center justify-center" },
    React.createElement('div', { className: "animate-pulse font-bold" },
      events[0]?.message || "Searching for new opportunities..."
    )
  );
};

export default SyncTicker;
