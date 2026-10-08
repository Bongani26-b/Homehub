import React, { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, ShieldCheck, HelpCircle, Plus, Minus } from 'lucide-react';
import { sound } from '../utils/sound';

export default function AffordabilityAdvisorModal({
  isOpen,
  onClose,
  mode, // 'rent' | 'buy'
  onApplyBudget,
  addToast
}) {
  if (!isOpen) return null;

  // Step state & user responses (directly editable numeric inputs)
  const [takeHomePay, setTakeHomePay] = useState(15000);
  const [otherExpenses, setOtherExpenses] = useState(7000);

  const isBuy = mode === 'buy';

  // Smart calculation:
  // Standard financial comfort rule recommends housing cost between 28% - 34% of net income,
  // adjusted if other expenses are higher.
  const income = Math.max(0, Number(takeHomePay) || 0);
  const expenses = Math.max(0, Number(otherExpenses) || 0);

  const safeBasePercent = 0.30;
  const maxSafePercent = 0.35;

  const calculatedBase = Math.round(income * safeBasePercent);
  const calculatedMax = Math.round(income * maxSafePercent);

  // Remaining disposable budget after other expenses
  const leftoverCash = Math.max(0, income - expenses);
  
  // Suggested Monthly Rent Range (rounded nicely to nearest R100)
  const suggestedMinMonthly = Math.max(
    1200,
    Math.round(Math.min(calculatedBase, Math.max(1200, leftoverCash * 0.65)) / 100) * 100
  );
  const suggestedMaxMonthly = Math.max(
    suggestedMinMonthly + 500,
    Math.round(Math.min(calculatedMax, Math.max(suggestedMinMonthly + 500, leftoverCash)) / 100) * 100
  );
  const recommendedPoint = Math.round((suggestedMinMonthly + suggestedMaxMonthly) / 2 / 100) * 100;

  // If buying, calculate approximate affordable purchase price (assuming 20 yr bond at 11.75% prime)
  const suggestedMinBuy = Math.round((suggestedMinMonthly * 95) / 10000) * 10000;
  const suggestedMaxBuy = Math.round((suggestedMaxMonthly * 100) / 10000) * 10000;

  const finalMin = isBuy ? suggestedMinBuy : suggestedMinMonthly;
  const finalMax = isBuy ? suggestedMaxBuy : suggestedMaxMonthly;

  const handleAdjustIncome = (delta) => {
    setTakeHomePay((prev) => Math.max(0, (Number(prev) || 0) + delta));
    sound.play('toggle');
  };

  const handleAdjustExpenses = (delta) => {
    setOtherExpenses((prev) => Math.max(0, (Number(prev) || 0) + delta));
    sound.play('toggle');
  };

  const handleApply = () => {
    sound.play('success');
    const profile = {
      income,
      expenses,
      minBudget: finalMin,
      maxBudget: finalMax,
      target: recommendedPoint,
      isBuy,
      active: true
    };
    onApplyBudget(profile);
    addToast(
      isBuy
        ? `Applied comfortable budget: R${(finalMin / 1000).toFixed(0)}k – R${(finalMax / 1000).toFixed(0)}k ✨`
        : `Applied comfortable budget: R${finalMin.toLocaleString()} – R${finalMax.toLocaleString()}/mo ✨`,
      'success'
    );
    onClose();

    // Smooth scroll down to property results
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/90 max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="md:hidden pt-3 flex justify-center">
          <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center">
              <span className="text-base">💡</span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Let's find your comfortable budget
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Simple 2-step check so you never overstretch your finances
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Question 1: Take Home Income (Directly Editable + Quick Suggestions) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block">
                Monthly take-home income
              </label>
              <span className="text-[11px] text-slate-500">How much do you take home each month after tax?</span>
            </div>

            {/* Direct Input & Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAdjustIncome(-500)}
                className="w-11 h-11 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg active:scale-95 shadow-sm transition shrink-0"
                title="Decrease by R500"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-sm pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={takeHomePay === 0 ? '' : takeHomePay}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                    setTakeHomePay(val);
                  }}
                  placeholder="15000"
                  className="w-full pl-8 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 font-mono font-black text-slate-900 text-base focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 shadow-sm"
                />
              </div>

              <button
                type="button"
                onClick={() => handleAdjustIncome(500)}
                className="w-11 h-11 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg active:scale-95 shadow-sm transition shrink-0"
                title="Increase by R500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestions Underneath */}
            <div className="flex items-center gap-2 pt-0.5 overflow-x-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">Suggestions:</span>
              {[10000, 15000, 20000, 25000, 35000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setTakeHomePay(val);
                    sound.play('click');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition whitespace-nowrap ${
                    takeHomePay === val
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Other Expenses (Directly Editable + Quick Suggestions) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block">
                Monthly other expenses
              </label>
              <span className="text-[11px] text-slate-500">About how much do you spend on groceries, transport & loans?</span>
            </div>

            {/* Direct Input & Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAdjustExpenses(-500)}
                className="w-11 h-11 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg active:scale-95 shadow-sm transition shrink-0"
                title="Decrease by R500"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-sm pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={otherExpenses === 0 ? '' : otherExpenses}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                    setOtherExpenses(val);
                  }}
                  placeholder="7000"
                  className="w-full pl-8 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 font-mono font-black text-slate-900 text-base focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 shadow-sm"
                />
              </div>

              <button
                type="button"
                onClick={() => handleAdjustExpenses(500)}
                className="w-11 h-11 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg active:scale-95 shadow-sm transition shrink-0"
                title="Increase by R500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestions Underneath */}
            <div className="flex items-center gap-2 pt-0.5 overflow-x-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">Suggestions:</span>
              {[3000, 5000, 7000, 10000, 15000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setOtherExpenses(val);
                    sound.play('click');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition whitespace-nowrap ${
                    otherExpenses === val
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Recommended Comfortable Home Budget Card */}
          <div className="p-5 sm:p-6 rounded-3xl hero-gradient border border-slate-200/90 shadow-sm space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Your comfortable home budget
            </span>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              {isBuy
                ? `R${(suggestedMinBuy / 1000).toFixed(0)}k – R${(suggestedMaxBuy / 1000).toFixed(0)}k`
                : `R${suggestedMinMonthly.toLocaleString()} – R${suggestedMaxMonthly.toLocaleString()}`}
              <span className="text-xs font-sans text-slate-600 font-normal ml-1">
                {isBuy ? ' purchase price' : ' / month'}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We recommend staying around{' '}
              <strong className="text-slate-900 font-bold">
                {isBuy ? `R${(suggestedMinBuy / 1000).toFixed(0)}k` : `R${recommendedPoint.toLocaleString()}`}
              </strong>
              {isBuy ? '' : '/mo'}, so you have room for your other expenses and unexpected savings.
            </p>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-slate-500 hover:text-slate-800 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex-1 sm:flex-initial px-8 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Show homes I can afford</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
