
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INACTIVITY_TIMEOUT, WARNING_BEFORE_TIMEOUT } from '../../constants.js';

const SessionGuard = ({ children, onLogout }) => {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (warningRef.current) window.clearTimeout(warningRef.current);
    warningRef.current = window.setTimeout(() => setShowWarning(true), INACTIVITY_TIMEOUT - WARNING_BEFORE_TIMEOUT);
    timeoutRef.current = window.setTimeout(() => onLogout(), INACTIVITY_TIMEOUT);
  }, [onLogout]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (warningRef.current) window.clearTimeout(warningRef.current);
    };
  }, [resetTimer]);

  return React.createElement(React.Fragment, null,
    children,
    showWarning && React.createElement('div', { className: "fixed inset-0 z-[100] bg-slate-900/70 flex items-center justify-center p-4" },
      React.createElement('div', { className: "bg-white p-8 rounded-[2rem] max-w-sm w-full text-center space-y-6" },
        React.createElement('h3', { className: "text-xl font-black" }, "Session Timeout"),
        React.createElement('p', { className: "text-slate-500" }, "You have been inactive. Stay logged in?"),
        React.createElement('button', { onClick: () => { setShowWarning(false); resetTimer(); }, className: "w-full py-4 bg-indigo-600 text-white rounded-2xl" }, "Stay Logged In"),
        React.createElement('button', { onClick: onLogout, className: "w-full py-4 bg-slate-100 rounded-2xl" }, "Logout Now")
      )
    )
  );
};

export default SessionGuard;
