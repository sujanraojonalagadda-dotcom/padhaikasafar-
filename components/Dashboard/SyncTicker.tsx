
import React from 'react';
import { SyncEvent } from '../../types';

interface SyncTickerProps {
  events: SyncEvent[];
}

const SyncTicker: React.FC<SyncTickerProps> = ({ events }) => {
  if (events.length === 0) return null;

  return (
    <div className="bg-slate-900 overflow-hidden py-2 border-b border-white/5">
      <div className="flex whitespace-nowrap animate-marquee hover:pause">
        {[...events, ...events].map((event, idx) => (
          <div key={`${event.id}-${idx}`} className="inline-flex items-center gap-4 px-8 text-white">
            <span className={`w-2 h-2 rounded-full ${
              event.type === 'course' ? 'bg-indigo-400' : 
              event.type === 'opportunity' ? 'bg-rose-400' : 'bg-emerald-400'
            }`}></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {event.timestamp}
            </span>
            <span className="text-xs font-bold">{event.message}</span>
            <span className="text-indigo-400 font-black uppercase text-[9px] tracking-tighter">New Discovery</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default SyncTicker;
