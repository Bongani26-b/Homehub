import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Bell, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Header({ soundMuted, setSoundMuted, onTriggerMacro, addToast }) {
  return (
    <header className="px-6 py-4 border-b border-slate-800/80 glass-panel flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-semibold text-slate-300">
          Home Network: <span className="text-brand-300">Starlight Hub 5G (Protected)</span>
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Quick Scene Buttons */}
        <button
          onClick={() => {
            onTriggerMacro('night');
            addToast('Night Mode scene triggered! Lights off 🌙', 'info');
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5 border border-slate-700/60"
        >
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Night Mode</span>
        </button>

        <button
          onClick={() => {
            onTriggerMacro('morning');
            addToast('Good Morning! Warm lighting activated ☀️', 'success');
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5 border border-slate-700/60"
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Good Morning</span>
        </button>

        {/* Audio Mute Toggle */}
        <button
          onClick={() => {
            setSoundMuted(!soundMuted);
            sound.enabled = soundMuted;
            if (soundMuted) sound.play('success');
            addToast(!soundMuted ? 'UI audio muted' : 'UI audio enabled! 🔔', 'info');
          }}
          className={`p-2 rounded-xl border transition ${
            !soundMuted
              ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
          title={!soundMuted ? 'Mute UI sounds' : 'Enable UI sounds'}
        >
          {!soundMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
