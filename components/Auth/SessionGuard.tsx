
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INACTIVITY_TIMEOUT, WARNING_BEFORE_TIMEOUT } from '../../constants';

interface SessionGuardProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const SessionGuard: React.FC<SessionGuardProps> = ({ children, onLogout }) => {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const warningRef = useRef<number | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (warningRef.current) window.clearTimeout(warningRef.current);

    // Set warning timer
    warningRef.current = window.setTimeout(() => {
      setShowWarning(true);
    }, INACTIVITY_TIMEOUT - WARNING_BEFORE_TIMEOUT);

    // Set logout timer
    timeoutRef.current = window.setTimeout(() => {
      onLogout();
    }, INACTIVITY_TIMEOUT);
  }, [onLogout]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const debouncedReset = () => {
      // Small debounce to prevent excessive timer resets during mousemove
      resetTimer();
    };

    events.forEach(event => window.addEventListener(event, debouncedReset));

    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, debouncedReset));
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (warningRef.current) window.clearTimeout(warningRef.current);
    };
  }, [resetTimer]);

  const stayLoggedIn = () => {
    setShowWarning(false);
    resetTimer();
  };

  return (
    <>
      {children}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-sm w-full space-y-6 animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-amber-100">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Session Security Alert</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                You have been inactive. Do you want to stay logged in?
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={stayLoggedIn}
                className="w-full py-4 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] uppercase tracking-widest"
              >
                Stay Logged In
              </button>
              <button
                onClick={onLogout}
                className="w-full py-4 text-sm font-black text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all uppercase tracking-widest"
              >
                Logout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionGuard;
