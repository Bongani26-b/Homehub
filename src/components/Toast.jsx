import React from 'react';
import { Sparkles, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold border flex items-center gap-2.5 animate-slide-up backdrop-blur-xl transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : toast.type === 'alert'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
              : 'bg-slate-900/90 border-slate-700 text-slate-100'
          }`}
        >
          {toast.type === 'success' ? (
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : toast.type === 'alert' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-brand-400 shrink-0" />
          )}
          <span>{toast.msg}</span>
        </div>
      ))}
    </div>
  );
}
