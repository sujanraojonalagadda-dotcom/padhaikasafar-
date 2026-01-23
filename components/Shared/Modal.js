
import React from 'react';

const Modal = ({ title, description, reminder, confirmLabel, cancelLabel, onConfirm, onCancel, type = 'primary' }) => {
  return React.createElement('div', { className: "fixed inset-0 z-[100] bg-slate-900/60 flex items-center justify-center p-4" },
    React.createElement('div', { className: "bg-white p-8 rounded-[2rem] max-w-sm w-full text-center space-y-6" },
      React.createElement('h3', { className: "text-xl font-black" }, title),
      React.createElement('p', { className: "text-slate-500 text-sm" }, description),
      reminder && React.createElement('p', { className: "text-xs font-bold text-amber-600 bg-amber-50 p-3 rounded-xl" }, `⚠️ ${reminder}`),
      React.createElement('div', { className: "space-y-3" },
        React.createElement('button', { onClick: onConfirm, className: `w-full py-4 text-white rounded-2xl ${type === 'danger' ? 'bg-rose-500' : 'bg-indigo-600'}` }, confirmLabel),
        React.createElement('button', { onClick: onCancel, className: "w-full py-4 bg-slate-50 rounded-2xl" }, cancelLabel)
      )
    )
  );
};

export default Modal;
