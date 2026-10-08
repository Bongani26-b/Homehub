import React from 'react';
import {
  Users,
  Trophy,
  Zap,
  Sun,
  Shield,
  Lock,
  Unlock,
  Sparkles,
  Thermometer,
  Pin,
  Trash2,
  CheckCircle2,
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function DashboardView({
  members,
  setMembers,
  chores,
  setChores,
  devices,
  setDevices,
  groceries,
  expenses,
  events,
  stickies,
  setStickies,
  setActiveTab,
  addToast
}) {
  const pendingChoresCount = chores.filter((c) => c.status !== 'Completed').length;
  const activeDevicesCount = devices.filter((d) => {
    if (d.type === 'light') return d.state.on;
    if (d.type === 'tv') return d.state.on;
    if (d.type === 'security') return d.state.armed !== 'off';
    if (d.type === 'vacuum') return d.state.status === 'cleaning';
    return true;
  }).length;
  const totalMonthlyExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const itemsToBuyCount = groceries.filter((g) => !g.inCart).length;

  const topMember = [...members].sort((a, b) => b.points - a.points)[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-900/60 via-slate-900/80 to-purple-900/50 border border-slate-700/60 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Home System Online • All Nodes Synchronized
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome back to{' '}
              <span className="bg-gradient-to-r from-brand-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                HomeHub
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-xl">
              Your central offline-first control cockpit for chores, smart devices, groceries, expenses, and family life.
            </p>
          </div>

          {/* Quick Macro Actions */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                setDevices((prev) =>
                  prev.map((d) => (d.type === 'light' ? { ...d, state: { ...d.state, on: false } } : d))
                );
                addToast('All lights switched OFF for Night Mode 🌙', 'success');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600/60 text-slate-200 text-sm font-medium transition flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              Night Mode
            </button>
            <button
              onClick={() => {
                setDevices((prev) =>
                  prev.map((d) =>
                    d.type === 'light' ? { ...d, state: { ...d.state, on: true, brightness: 100 } } : d
                  )
                );
                addToast('Good Morning scene activated! ☀️', 'success');
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 text-sm font-semibold transition flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Sun className="w-4 h-4 text-amber-400" />
              Good Morning
            </button>
            <button
              onClick={() => setActiveTab('chores')}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-glow-sm transition flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              New Chore
            </button>
          </div>
        </div>

        {/* Live Metrics Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/50">
          <div
            onClick={() => setActiveTab('chores')}
            className="cursor-pointer p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 transition"
          >
            <span className="text-xs text-slate-400 font-medium">Pending Chores</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-amber-400">{pendingChoresCount}</span>
              <span className="text-xs text-slate-400">of {chores.length}</span>
            </div>
          </div>
          <div
            onClick={() => setActiveTab('devices')}
            className="cursor-pointer p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 transition"
          >
            <span className="text-xs text-slate-400 font-medium">Active Devices</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-emerald-400">{activeDevicesCount}</span>
              <span className="text-xs text-slate-400">devices on</span>
            </div>
          </div>
          <div
            onClick={() => setActiveTab('groceries')}
            className="cursor-pointer p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 transition"
          >
            <span className="text-xs text-slate-400 font-medium">To Buy (Grocery)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-sky-400">{itemsToBuyCount}</span>
              <span className="text-xs text-slate-400">items</span>
            </div>
          </div>
          <div
            onClick={() => setActiveTab('finances')}
            className="cursor-pointer p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 transition"
          >
            <span className="text-xs text-slate-400 font-medium">October Spend</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-purple-300">${totalMonthlyExpenses.toFixed(0)}</span>
              <span className="text-xs text-emerald-400">On Track</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Family Members + Quick Device Controls + Chore Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Household Members Status & Points Leaderboard */}
        <div className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-400" />
                Family Status & Points
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {members.length} Members
              </span>
            </div>

            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${member.color} flex items-center justify-center text-xl shadow-md`}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 flex items-center gap-2 text-sm">
                        {member.name}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-300 uppercase font-mono">
                          {member.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === 'Home' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        ></span>
                        {member.status}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-brand-300 text-sm flex items-center justify-end gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      {member.points} pts
                    </div>
                    <button
                      onClick={() => {
                        setMembers((prev) =>
                          prev.map((m) =>
                            m.id === member.id ? { ...m, status: m.status === 'Home' ? 'Away' : 'Home' } : m
                          )
                        );
                        sound.play('click');
                      }}
                      className="text-[11px] text-slate-400 hover:text-brand-300 underline mt-0.5"
                    >
                      Toggle Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Chore Leader:</span>
            <span className="font-semibold text-amber-300">
              {topMember?.name} 🌟 ({topMember?.points} pts)
            </span>
          </div>
        </div>

        {/* 2. Interactive Room & Device Quick Tiles */}
        <div className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Quick Smart Control
              </h3>
              <button
                onClick={() => setActiveTab('devices')}
                className="text-xs text-brand-400 hover:underline"
              >
                View All &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Living Room Lights */}
              {(() => {
                const light = devices.find((d) => d.id === 'd1');
                return (
                  <div
                    onClick={() => {
                      setDevices((prev) =>
                        prev.map((d) =>
                          d.id === 'd1' ? { ...d, state: { ...d.state, on: !d.state.on } } : d
                        )
                      );
                      sound.play('toggle');
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all select-none ${
                      light?.state.on
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <Sun
                        className={`w-6 h-6 ${
                          light?.state.on ? 'text-amber-400 animate-pulse-slow' : 'text-slate-500'
                        }`}
                      />
                      <span
                        className={`w-3 h-3 rounded-full ${
                          light?.state.on ? 'bg-amber-400 shadow-glow-sm' : 'bg-slate-600'
                        }`}
                      ></span>
                    </div>
                    <div className="mt-3">
                      <div className="font-semibold text-sm text-white">{light?.name}</div>
                      <div className="text-xs mt-0.5">
                        {light?.state.on
                          ? `${light.state.brightness}% • ${light.state.scene}`
                          : 'Off'}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Security System */}
              {(() => {
                const sec = devices.find((d) => d.id === 'd7');
                const isArmed = sec?.state.armed !== 'off';
                return (
                  <div
                    onClick={() => {
                      const nextState = isArmed ? 'off' : 'home';
                      setDevices((prev) =>
                        prev.map((d) =>
                          d.id === 'd7' ? { ...d, state: { ...d.state, armed: nextState } } : d
                        )
                      );
                      addToast(
                        `Perimeter Alarm is now ${nextState === 'off' ? 'DISARMED 🔓' : 'ARMED 🛡️'}`,
                        isArmed ? 'alert' : 'success'
                      );
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all select-none ${
                      isArmed
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <Shield className={`w-6 h-6 ${isArmed ? 'text-emerald-400' : 'text-rose-400'}`} />
                      <span
                        className={`w-3 h-3 rounded-full ${isArmed ? 'bg-emerald-400' : 'bg-rose-500'}`}
                      ></span>
                    </div>
                    <div className="mt-3">
                      <div className="font-semibold text-sm text-white">Security Guard</div>
                      <div className="text-xs mt-0.5">{isArmed ? 'Armed (Home)' : 'Disarmed'}</div>
                    </div>
                  </div>
                );
              })()}

              {/* Smart Door Lock */}
              {(() => {
                const lock = devices.find((d) => d.id === 'd3');
                const isLocked = lock?.state.locked;
                return (
                  <div
                    onClick={() => {
                      setDevices((prev) =>
                        prev.map((d) =>
                          d.id === 'd3' ? { ...d, state: { ...d.state, locked: !d.state.locked } } : d
                        )
                      );
                      addToast(
                        `Front Door is now ${!isLocked ? 'LOCKED 🔒' : 'UNLOCKED 🔓'}`,
                        !isLocked ? 'success' : 'alert'
                      );
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all select-none ${
                      isLocked
                        ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200'
                        : 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      {isLocked ? (
                        <Lock className="w-6 h-6 text-indigo-400" />
                      ) : (
                        <Unlock className="w-6 h-6 text-amber-400" />
                      )}
                      <span className="text-xs font-mono text-slate-400">{lock?.state.battery}%</span>
                    </div>
                    <div className="mt-3">
                      <div className="font-semibold text-sm text-white">{lock?.name}</div>
                      <div className="text-xs mt-0.5">{isLocked ? 'Locked (Secure)' : 'Unlocked'}</div>
                    </div>
                  </div>
                );
              })()}

              {/* Robot Vacuum */}
              {(() => {
                const vac = devices.find((d) => d.id === 'd4');
                const isCleaning = vac?.state.status === 'cleaning';
                return (
                  <div
                    onClick={() => {
                      const nextStatus = isCleaning ? 'docked' : 'cleaning';
                      setDevices((prev) =>
                        prev.map((d) =>
                          d.id === 'd4' ? { ...d, state: { ...d.state, status: nextStatus } } : d
                        )
                      );
                      addToast(
                        nextStatus === 'cleaning'
                          ? 'RoboClean started vacuuming 🤖'
                          : 'RoboClean returning to base dock 🔌',
                        'info'
                      );
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all select-none ${
                      isCleaning
                        ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <Sparkles
                        className={`w-6 h-6 ${isCleaning ? 'text-cyan-400 animate-spin' : 'text-slate-500'}`}
                      />
                      <span className="text-xs font-mono text-slate-400">{vac?.state.battery}%</span>
                    </div>
                    <div className="mt-3">
                      <div className="font-semibold text-sm text-white">{vac?.name}</div>
                      <div className="text-xs mt-0.5 capitalize">{vac?.state.status}</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Climate Summary Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <span>
                HVAC: <strong>72°F (Target: 70°F)</strong>
              </span>
            </div>
            <span className="text-emerald-400 font-medium">Eco Cooling Active</span>
          </div>
        </div>

        {/* 3. Sticky Notes & Family Bulletin */}
        <div className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Pin className="w-5 h-5 text-pink-400" />
                Family Sticky Board
              </h3>
              <button
                onClick={() => setActiveTab('calendar')}
                className="text-xs text-brand-400 hover:underline"
              >
                Schedule &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {stickies.slice(0, 3).map((sticky) => (
                <div
                  key={sticky.id}
                  className={`p-3.5 rounded-2xl border ${sticky.color} transition text-sm relative group`}
                >
                  <p className="leading-relaxed pr-6 font-medium">{sticky.text}</p>
                  <div className="mt-2 flex items-center justify-between text-xs opacity-75">
                    <span>— {sticky.author}</span>
                    <span>{sticky.date}</span>
                  </div>
                  <button
                    onClick={() => {
                      setStickies((prev) => prev.filter((s) => s.id !== sticky.id));
                      addToast('Note deleted', 'info');
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:text-rose-300 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Add Sticky Note Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const text = form.elements.noteText.value.trim();
              if (!text) return;
              const colors = [
                'bg-amber-500/20 border-amber-500/40 text-amber-200',
                'bg-emerald-500/20 border-emerald-500/40 text-emerald-200',
                'bg-purple-500/20 border-purple-500/40 text-purple-200',
                'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
              ];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              setStickies((prev) => [
                { id: 's' + Date.now(), text, author: 'You', color: randomColor, date: 'Just now' },
                ...prev
              ]);
              form.reset();
              addToast('Sticky note pinned to board! 📌', 'success');
            }}
            className="mt-4 flex gap-2"
          >
            <input
              name="noteText"
              placeholder="Post a sticky note..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
            >
              Post
            </button>
          </form>
        </div>
      </div>

      {/* Today's Schedule + Pending Chores Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chores Due Today */}
        <div className="glass-panel rounded-3xl p-6 shadow-glass">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Today's Chore Action Checklist
              </h3>
              <p className="text-xs text-slate-400">Complete tasks to claim reward points</p>
            </div>
            <button
              onClick={() => setActiveTab('chores')}
              className="text-xs text-brand-400 hover:underline"
            >
              All Chores ({chores.length}) &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {chores.slice(0, 4).map((chore) => {
              const assignee = members.find((m) => m.id === chore.assigneeId);
              const isDone = chore.status === 'Completed';
              return (
                <div
                  key={chore.id}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                    isDone
                      ? 'bg-slate-900/40 border-slate-800 opacity-60'
                      : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const nextStatus = isDone ? 'Pending' : 'Completed';
                        setChores((prev) =>
                          prev.map((c) => (c.id === chore.id ? { ...c, status: nextStatus } : c))
                        );
                        if (!isDone && assignee) {
                          setMembers((prev) =>
                            prev.map((m) =>
                              m.id === assignee.id ? { ...m, points: m.points + chore.points } : m
                            )
                          );
                          addToast(
                            `Chore completed! +${chore.points} pts awarded to ${assignee.name} 🎉`,
                            'success'
                          );
                        } else {
                          sound.play('toggle');
                        }
                      }}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition text-xs ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                          : 'border-slate-600 hover:border-brand-400 text-transparent'
                      }`}
                    >
                      ✓
                    </button>
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-100'
                        }`}
                      >
                        {chore.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="text-brand-300 font-mono">+{chore.points} pts</span>
                        <span>•</span>
                        <span>{chore.category}</span>
                        <span>•</span>
                        <span>Due: {chore.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {assignee && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
                      <span>{assignee.avatar}</span>
                      <span className="font-medium hidden sm:inline">{assignee.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Family Events */}
        <div className="glass-panel rounded-3xl p-6 shadow-glass">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-purple-400" />
                Upcoming Household Events
              </h3>
              <p className="text-xs text-slate-400">Synced family timetable & activities</p>
            </div>
            <button
              onClick={() => setActiveTab('calendar')}
              className="text-xs text-brand-400 hover:underline"
            >
              Full Calendar &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {events.slice(0, 4).map((event) => {
              const member = members.find((m) => m.id === event.memberId);
              return (
                <div
                  key={event.id}
                  className="p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex flex-col items-center justify-center text-purple-300 font-mono text-xs">
                      <span className="font-bold">{event.date.split('-')[2] || '07'}</span>
                      <span className="text-[9px] uppercase">Oct</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100">{event.title}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-purple-300">{event.time}</span>
                        <span>•</span>
                        <span>{event.category}</span>
                      </div>
                    </div>
                  </div>

                  {member && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                      <span>{member.avatar}</span>
                      <span>{member.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
