import React from 'react';
import { Wrench } from 'lucide-react';

export default function MaintenanceView({ maintenance, setMaintenance, addToast }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wrench className="text-amber-400 w-7 h-7" />
            Home Maintenance & Appliance Service
          </h2>
          <p className="text-sm text-slate-400">
            Preventative care schedules, filter replacements, and equipment service logs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {maintenance.map((item) => (
          <div key={item.id} className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.interval}
                </span>
                <span className="text-xs font-semibold text-emerald-400">Status: {item.status}</span>
              </div>

              <h4 className="text-lg font-bold text-white mt-4">{item.task}</h4>
              <p className="text-xs text-slate-300 mt-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {item.notes}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-800/60">
                  <span className="text-slate-400 block">Last Performed:</span>
                  <span className="text-slate-200 font-bold">{item.lastDone}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60">
                  <span className="text-slate-400 block">Next Due:</span>
                  <span className="text-amber-300 font-bold">{item.nextDue}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                setMaintenance((prev) =>
                  prev.map((m) => (m.id === item.id ? { ...m, lastDone: today, status: 'Completed' } : m))
                );
                addToast(`Maintenance logged as completed today! 🔧`, 'success');
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-glow-sm"
            >
              Mark Performed Today
            </button>
          </div>
        ))}
      </div>

      {/* Emergency Service Quick Dial Directory */}
      <div className="glass-panel rounded-3xl p-6 shadow-glass">
        <h3 className="font-bold text-lg text-white mb-4">Emergency Contacts Directory</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Trusted Plumber', contact: '(555) 019-2834', icon: '🚰' },
            { name: 'Certified Electrician', contact: '(555) 018-9921', icon: '⚡' },
            { name: 'HVAC Heating & Cooling', contact: '(555) 014-3312', icon: '❄️' },
            { name: 'Property Management', contact: '(555) 012-7788', icon: '🏢' }
          ].map((contact, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 flex items-center gap-3">
              <div className="text-2xl">{contact.icon}</div>
              <div>
                <div className="font-semibold text-xs text-white">{contact.name}</div>
                <div className="text-xs font-mono text-brand-300 mt-0.5">{contact.contact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
