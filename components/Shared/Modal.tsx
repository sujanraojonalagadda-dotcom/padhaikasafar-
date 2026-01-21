
import React from 'react';

interface ModalProps {
  title: string;
  description: string;
  reminder?: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'primary' | 'danger';
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  reminder,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  type = 'primary'
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-sm w-full space-y-6 animate-in fade-in zoom-in duration-300 border border-slate-100">
        <div className="text-center space-y-3">
          <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-2 ${type === 'danger' ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-500'}`}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            {description}
          </p>
          {reminder && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-[11px] font-bold text-amber-700 leading-tight">
                ⚠️ REMINDER: {reminder}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={onConfirm}
            className={`w-full py-4 text-sm font-black rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest ${
              type === 'danger' ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-4 text-sm font-black text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all uppercase tracking-widest"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
