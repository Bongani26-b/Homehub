import React from 'react';
import { Settings, Volume2, VolumeX, Download, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SettingsView({
  soundMuted,
  setSoundMuted,
  stateData,
  onResetDefaults,
  addToast
}) {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="text-slate-400 w-7 h-7" />
          Settings & Offline Backup
        </h2>
        <p className="text-sm text-slate-400">
          Manage data persistence, backup JSON, and sound preferences
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 shadow-glass space-y-6">
        {/* Audio Toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h4 className="font-semibold text-white text-base">Sound Effects & Haptics</h4>
            <p className="text-xs text-slate-400">
              Plays synthesized audio feedback on actions, toggles, and completed chores
            </p>
          </div>
          <button
            onClick={() => {
              setSoundMuted(!soundMuted);
              sound.enabled = soundMuted;
              if (soundMuted) sound.play('success');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              !soundMuted ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {!soundMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {!soundMuted ? 'Audio Enabled' : 'Muted'}
          </button>
        </div>

        {/* Export JSON Backup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h4 className="font-semibold text-white text-base">Export Full Offline Backup</h4>
            <p className="text-xs text-slate-400">
              Download all your household data, chores, and devices as a single JSON file
            </p>
          </div>
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(stateData, null, 2)], {
                type: 'application/json'
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `homehub-backup-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
              addToast('Full backup JSON downloaded! 💾', 'success');
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-brand-400" />
            Export JSON Backup
          </button>
        </div>

        {/* Reset Defaults */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-rose-400 text-base">Reset Demo Data</h4>
            <p className="text-xs text-slate-400">
              Wipes current state and reloads pristine HomeHub default sample data
            </p>
          </div>
          <button
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to reset all HomeHub data back to factory defaults?'
                )
              ) {
                onResetDefaults();
                addToast('All HomeHub data reset to default demo state! 🔄', 'info');
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-600/40 text-rose-300 text-xs font-semibold flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset All to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
