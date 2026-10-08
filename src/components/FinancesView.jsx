import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, X } from 'lucide-react';

export default function FinancesView({ members, expenses, setExpenses, addToast }) {
  const [newExpenseModal, setNewExpenseModal] = useState(false);

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Group by category
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="text-emerald-400 w-7 h-7" />
            Household Budget & Expense Splitter
          </h2>
          <p className="text-sm text-slate-400">
            Track shared bills, utility subscriptions, and fair household cost-splits
          </p>
        </div>

        <button
          onClick={() => setNewExpenseModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-glow-sm transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Log Shared Expense
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-6 shadow-glass">
          <span className="text-xs text-slate-400 font-medium">Total Monthly Spend</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">
            ${totalSpent.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-2">Budget Target: $3,200.00 (Healthy)</div>
        </div>

        <div className="glass-panel rounded-3xl p-6 shadow-glass">
          <span className="text-xs text-slate-400 font-medium">Recurring Subscriptions</span>
          <div className="text-3xl font-extrabold text-purple-300 mt-2 font-mono">
            $
            {expenses
              .filter((e) => e.recurring)
              .reduce((a, b) => a + b.amount, 0)
              .toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-2">Netflix, Fiber, Insurance</div>
        </div>

        <div className="glass-panel rounded-3xl p-6 shadow-glass">
          <span className="text-xs text-slate-400 font-medium">Fair Split Settlement</span>
          <div className="text-3xl font-extrabold text-brand-300 mt-2 font-mono">$0.00</div>
          <div className="text-xs text-emerald-400 mt-2">All balances currently settled! ✨</div>
        </div>
      </div>

      {/* Category Breakdown & Transaction Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="glass-panel rounded-3xl p-6 shadow-glass">
          <h3 className="font-bold text-lg text-white mb-4">Spending by Category</h3>
          <div className="space-y-4">
            {Object.entries(categoryMap).map(([cat, amount]) => {
              const percent = ((amount / (totalSpent || 1)) * 100).toFixed(0);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">{cat}</span>
                    <span className="font-mono text-emerald-300">
                      ${amount.toFixed(2)} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expense History Table */}
        <div className="glass-panel rounded-3xl p-6 shadow-glass lg:col-span-2">
          <h3 className="font-bold text-lg text-white mb-4">Recent Household Transactions</h3>
          <div className="space-y-3">
            {expenses.map((expense) => {
              const payer = members.find((m) => m.id === expense.paidBy);
              return (
                <div
                  key={expense.id}
                  className="p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                      💳
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{expense.title}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{expense.category}</span>
                        <span>•</span>
                        <span>Paid by {payer?.name || 'Someone'}</span>
                        <span>•</span>
                        <span>{expense.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400 font-mono">
                        ${expense.amount.toFixed(2)}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        Split 50/50
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setExpenses((prev) => prev.filter((e) => e.id !== expense.id));
                        addToast('Expense removed', 'info');
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* New Expense Modal */}
      {newExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-700 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Log Household Expense</h3>
              <button onClick={() => setNewExpenseModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const title = form.title.value.trim();
                if (!title) return;
                const newExp = {
                  id: 'e' + Date.now(),
                  title,
                  category: form.category.value,
                  amount: parseFloat(form.amount.value) || 0,
                  paidBy: form.paidBy.value,
                  splitBetween: ['m1', 'm2'],
                  date: form.date.value || new Date().toISOString().split('T')[0],
                  recurring: form.recurring.checked
                };
                setExpenses((prev) => [newExp, ...prev]);
                setNewExpenseModal(false);
                addToast('Expense logged successfully! 💰', 'success');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Expense Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Electricity Bill"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="amount"
                    required
                    placeholder="0.00"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Paid By</label>
                  <select
                    name="paidBy"
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
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Housing">Housing</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Home Maintenance">Home Maintenance</option>
                    <option value="Dining">Dining</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="recCheck" name="recurring" className="rounded bg-slate-800 border-slate-700" />
                <label htmlFor="recCheck" className="text-xs text-slate-300">
                  This is a monthly recurring bill
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewExpenseModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-glow-sm"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
