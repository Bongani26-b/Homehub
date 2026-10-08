import React from 'react';
import {
  Home,
  CheckCircle2,
  Zap,
  ShoppingCart,
  DollarSign,
  Calendar,
  Wrench,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'chores', label: 'Chores & Tasks', icon: CheckCircle2, hasBadge: 'chores' },
  { id: 'devices', label: 'Smart Home Control', icon: Zap },
  { id: 'groceries', label: 'Grocery & Pantry', icon: ShoppingCart, hasBadge: 'groceries' },
  { id: 'finances', label: 'Budget & Bills', icon: DollarSign },
  { id: 'calendar', label: 'Family Calendar', icon: Calendar },
  { id: 'maintenance', label: 'Home Maintenance', icon: Wrench },
  { id: 'settings', label: 'Settings & Backup', icon: Settings }
];

export default function Sidebar({ activeTab, setActiveTab, pendingChoresCount, itemsToBuyCount }) {
  return (
    <aside className="w-full md:w-64 glass-panel border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-sky-500 to-indigo-500 flex items-center justify-center text-xl shadow-glow-md">
            🏡
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              HomeHub <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono">PRO</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Household Operating System</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            let badge = null;
            if (item.hasBadge === 'chores' && pendingChoresCount > 0) badge = pendingChoresCount;
            if (item.hasBadge === 'groceries' && itemsToBuyCount > 0) badge = itemsToBuyCount;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  sound.play('click');
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-sky-600 text-white shadow-glow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-brand-500/20 text-brand-300'
                  }`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: System Status */}
      <div className="pt-6 border-t border-slate-800/80 px-2 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Offline Local Storage
          </span>
          <span className="font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Active
          </span>
        </div>
        <p className="text-[10px] text-slate-500 leading-normal">
          All data is automatically synchronized and persisted offline.
        </p>
      </div>
    </aside>
  );
}
