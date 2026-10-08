import React, { useState } from 'react';
import { CheckCircle2, Plus, Trophy, Trash2, X } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ChoresView({ members, setMembers, chores, setChores, addToast }) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [newChoreModal, setNewChoreModal] = useState(false);

  const filtered = chores.filter((c) => {
    if (filterCategory !== 'All' && c.category !== filterCategory) return false;
    if (filterStatus === 'Completed' && c.status !== 'Completed') return false;
    if (filterStatus === 'Pending' && c.status === 'Completed') return false;
    return true;
  });

  const categories = ['All', 'Cleaning', 'Kitchen', 'Garden', 'Pets', 'Maintenance'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with filters and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="text-brand-400 w-7 h-7" />
            Chores & Task Central
          </h2>
          <p className="text-sm text-slate-400">
            Gamified family responsibility tracker with points & rewards
          </p>
        </div>

        <button
          onClick={() => setNewChoreModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow-sm transition flex items-center gap-2 self-start sm:self-auto hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add New Chore
        </button>
      </div>

      {/* Category Filter Pills & Status Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl glass-panel">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                sound.play('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                filterCategory === cat
                  ? 'bg-brand-600 text-white shadow-glow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending Only</option>
            <option value="Completed">Completed Only</option>
          </select>
        </div>
      </div>

      {/* Chores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((chore) => {
          const assignee = members.find((m) => m.id === chore.assigneeId);
          const isDone = chore.status === 'Completed';

          return (
            <div
              key={chore.id}
              className={`p-5 rounded-3xl border transition flex flex-col justify-between ${
                isDone
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-70'
                  : 'glass-card border-slate-700/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800/90 text-brand-300 border border-brand-500/20">
                    {chore.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-mono">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      +{chore.points} pts
                    </span>
                    <button
                      onClick={() => {
                        setChores((prev) => prev.filter((c) => c.id !== chore.id));
                        addToast('Chore deleted', 'info');
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className={`text-base font-bold mt-3 ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                  {chore.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
                  <span>🗓 Due: {chore.dueDate}</span>
                  <span>•</span>
                  <span>🔄 {chore.frequency}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                {assignee ? (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${assignee.color} flex items-center justify-center text-sm shadow`}
                    >
                      {assignee.avatar}
                    </div>
                    <span className="text-xs font-medium text-slate-300">{assignee.name}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">Unassigned</span>
                )}

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
                        `Chore finished! ${chore.points} pts added to ${assignee.name} 🏆`,
                        'success'
                      );
                    } else {
                      sound.play('toggle');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    isDone
                      ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isDone ? 'Mark Pending' : 'Complete'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chore Rewards Redemption Boutique */}
      <div className="glass-panel rounded-3xl p-6 shadow-glass mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Trophy className="text-amber-400 w-5 h-5" />
              Chore Rewards Shop (Redeem Points)
            </h3>
            <p className="text-xs text-slate-400">Trade earned points for real household rewards & perks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Extra 1hr Gaming / Screen Time', cost: 100, icon: '🎮' },
            { title: 'Pick Friday Dinner / Takeout', cost: 150, icon: '🍕' },
            { title: 'Skip 1 Chore Pass', cost: 200, icon: '🎟️' },
            { title: 'Ice Cream Parlor Outing', cost: 250, icon: '🍦' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-amber-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-sm text-white">{item.title}</div>
                <div className="text-xs text-amber-400 font-bold font-mono mt-1">{item.cost} points</div>
              </div>
              <button
                onClick={() => {
                  addToast(`Reward "${item.title}" requested! Approval sent to Admin 🎁`, 'success');
                }}
                className="mt-4 w-full py-1.5 rounded-xl bg-slate-700 hover:bg-amber-600 hover:text-white text-slate-200 text-xs font-semibold transition"
              >
                Redeem Reward
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Chore Modal */}
      {newChoreModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-700 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Create New Chore</h3>
              <button onClick={() => setNewChoreModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const title = form.title.value.trim();
                if (!title) return;
                const choreObj = {
                  id: 'c' + Date.now(),
                  title,
                  points: parseInt(form.points.value) || 20,
                  assigneeId: form.assigneeId.value,
                  category: form.category.value,
                  frequency: form.frequency.value,
                  dueDate: form.dueDate.value || new Date().toISOString().split('T')[0],
                  status: 'Pending'
                };
                setChores((prev) => [choreObj, ...prev]);
                setNewChoreModal(false);
                addToast('New chore created successfully! 📋', 'success');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Chore Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Mop kitchen floor"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Points Reward</label>
                  <input
                    type="number"
                    name="points"
                    defaultValue={25}
                    min={5}
                    max={500}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Assignee</label>
                  <select
                    name="assigneeId"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.avatar} {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Cleaning">Cleaning</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Garden">Garden</option>
                    <option value="Pets">Pets</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Frequency</label>
                  <select
                    name="frequency"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Once">One-time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewChoreModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-glow-sm"
                >
                  Create Chore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
