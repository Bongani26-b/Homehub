import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Trash2, X } from 'lucide-react';

export default function CalendarView({ members, events, setEvents, addToast }) {
  const [newEventModal, setNewEventModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="text-purple-400 w-7 h-7" />
            Family Calendar & Timetable
          </h2>
          <p className="text-sm text-slate-400">
            Coordinated schedule for school, sports, home visits, and gatherings
          </p>
        </div>

        <button
          onClick={() => setNewEventModal(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-glow-sm transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Schedule Event
        </button>
      </div>

      {/* Events Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const member = members.find((m) => m.id === event.memberId);
          return (
            <div key={event.id} className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {event.category}
                  </span>
                  <button
                    onClick={() => {
                      setEvents((prev) => prev.filter((e) => e.id !== event.id));
                      addToast('Event deleted', 'info');
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-lg font-bold text-white mt-4">{event.title}</h4>

                <div className="flex items-center gap-3 text-xs text-slate-300 font-mono mt-2">
                  <span>📅 {event.date}</span>
                  <span>•</span>
                  <span>⏰ {event.time}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                {member && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{member.avatar}</span>
                    <span className="text-xs font-semibold text-slate-200">{member.name}</span>
                  </div>
                )}
                <span className="text-xs text-emerald-400 font-medium">Synced</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Event Modal */}
      {newEventModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-700 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Schedule Family Event</h3>
              <button onClick={() => setNewEventModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const title = form.title.value.trim();
                if (!title) return;
                const ev = {
                  id: 'ev' + Date.now(),
                  title,
                  date: form.date.value || new Date().toISOString().split('T')[0],
                  time: form.time.value || '12:00',
                  memberId: form.memberId.value,
                  category: form.category.value
                };
                setEvents((prev) => [...prev, ev]);
                setNewEventModal(false);
                addToast('Event scheduled on family calendar! 📅', 'success');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Birthday Party 🎂"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    defaultValue="18:30"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Family Member</label>
                  <select
                    name="memberId"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.avatar} {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Family">Family</option>
                    <option value="Sports">Sports</option>
                    <option value="School">School</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewEventModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-glow-sm"
                >
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
