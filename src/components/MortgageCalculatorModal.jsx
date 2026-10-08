import React, { useState } from 'react';
import { Calculator, X, Coins, PieChart, ShieldCheck, Home, Percent, Calendar, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

export default function MortgageCalculatorModal({ onClose, defaultPrice = 1250000 }) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPercent, setDownPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(11.75); // SA Prime Rate benchmark
  const [termYears, setTermYears] = useState(20); // Standard SA Bond Term is 20-30 yrs
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1); // Municipal rates & taxes
  const [annualInsurance, setAnnualInsurance] = useState(6000);
  const [monthlyHoa, setMonthlyHoa] = useState(450); // Body corporate / Estate levies

  const downPayment = (homePrice * downPercent) / 100;
  const principal = Math.max(0, homePrice - downPayment);
  const monthlyRate = interestRate > 0 ? interestRate / 100 / 12 : 0;
  const totalMonths = termYears * 12;

  const monthlyPrincipalAndInt =
    monthlyRate > 0
      ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : principal / totalMonths;

  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyIns = annualInsurance / 12;
  const totalMonthly = monthlyPrincipalAndInt + monthlyTax + monthlyIns + monthlyHoa;

  const pAndIPct = totalMonthly > 0 ? Math.round((monthlyPrincipalAndInt / totalMonthly) * 100) : 0;
  const taxPct = totalMonthly > 0 ? Math.round((monthlyTax / totalMonthly) * 100) : 0;
  const insPct = totalMonthly > 0 ? Math.round((monthlyIns / totalMonthly) * 100) : 0;
  const hoaPct = totalMonthly > 0 ? Math.max(0, 100 - (pAndIPct + taxPct + insPct)) : 0;

  const handleQuickPercent = (pct) => {
    setDownPercent(pct);
    sound.play('click');
  };

  const handleReset = () => {
    setHomePrice(defaultPrice);
    setDownPercent(10);
    setInterestRate(11.75);
    setTermYears(20);
    setPropertyTaxRate(1.1);
    setAnnualInsurance(6000);
    setMonthlyHoa(450);
    sound.play('toggle');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full max-w-2xl rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/90 max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="md:hidden pt-3 flex justify-center">
          <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
              <Calculator className="w-5 h-5 text-slate-800" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
                Home Loan & Bond Repayment Calculator
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Accurate South African bond estimates with municipal rates, levies & insurance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              title="Reset to defaults"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Total Monthly Payment Big Metric Card */}
          <div className="p-6 rounded-3xl hero-gradient border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Estimated Monthly Bond Repayment
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight mt-1">
                  R{Math.round(totalMonthly).toLocaleString()}
                  <span className="text-sm font-sans text-slate-600 font-normal ml-1">/ month</span>
                </div>
              </div>
              <div className="sm:text-right bg-white/80 px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] text-slate-500 block font-medium">Total Loan Principal</span>
                <strong className="text-sm text-slate-900 font-mono font-bold">
                  R{Math.round(principal).toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Visual Color-coded Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
                <div style={{ width: `${pAndIPct}%` }} className="bg-slate-900 transition-all duration-300" title={`Bond Repayment: ${pAndIPct}%`}></div>
                <div style={{ width: `${taxPct}%` }} className="bg-amber-500 transition-all duration-300" title={`Rates & Taxes: ${taxPct}%`}></div>
                <div style={{ width: `${insPct}%` }} className="bg-emerald-500 transition-all duration-300" title={`Insurance: ${insPct}%`}></div>
                <div style={{ width: `${hoaPct}%` }} className="bg-indigo-500 transition-all duration-300" title={`Levies/HOA: ${hoaPct}%`}></div>
              </div>

              {/* Legend Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                  <span className="text-slate-600">Bond Repayment ({pAndIPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-slate-600">Rates & Taxes ({taxPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-600">Insurance ({insPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-slate-600">Levies ({hoaPct}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* 1. Property Purchase Price */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-slate-600" />
                  Purchase Price
                </label>
                <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  R{homePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="350000"
                max="5000000"
                step="25000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>R350k (Tembisa)</span>
                <span>R2.5M</span>
                <span>R5M (Waterfall)</span>
              </div>
            </div>

            {/* 2. Deposit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-slate-600" />
                  Deposit ({downPercent}%)
                </label>
                <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  R{Math.round(downPayment).toLocaleString()}
                </span>
              </div>
              
              {/* Quick Preset Pills */}
              <div className="flex gap-1.5 pt-1">
                {[0, 5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleQuickPercent(pct)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition ${
                      downPercent === pct
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Interest Rate */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-slate-600" />
                  Interest Rate (Prime Benchmark)
                </label>
                <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="7.0"
                max="16.0"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>7.0%</span>
                <span>11.75% (SA Prime)</span>
                <span>16.0%</span>
              </div>
            </div>

            {/* 4. Bond Term */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                Bond Term Duration
              </label>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[15, 20, 30].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => {
                      setTermYears(yr);
                      sound.play('click');
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      termYears === yr
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Municipal Rates & Taxes */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Municipal Rates & Taxes</label>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  R{Math.round(monthlyTax).toLocaleString()}/mo ({propertyTaxRate}%)
                </span>
              </div>
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            {/* 6. Homeowners Insurance & Levies */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Insurance & Levies</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  R{Math.round(monthlyIns + monthlyHoa).toLocaleString()}/mo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Annual Building Ins. (R)</span>
                  <input
                    type="number"
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-mono font-semibold focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Monthly Levy / HOA (R)</span>
                  <input
                    type="number"
                    value={monthlyHoa}
                    onChange={(e) => setMonthlyHoa(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-mono font-semibold focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Monthly Detailed Breakdown Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block font-medium">Bond Repayment</span>
              <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                R{Math.round(monthlyPrincipalAndInt).toLocaleString()}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block font-medium">Rates & Taxes</span>
              <strong className="text-amber-700 font-mono text-sm block mt-0.5">
                R{Math.round(monthlyTax).toLocaleString()}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block font-medium">Building Insurance</span>
              <strong className="text-emerald-700 font-mono text-sm block mt-0.5">
                R{Math.round(monthlyIns).toLocaleString()}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block font-medium">Monthly Levy</span>
              <strong className="text-indigo-700 font-mono text-sm block mt-0.5">
                R{Math.round(monthlyHoa).toLocaleString()}
              </strong>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Estimates based on South African bank prime lending rate guidelines.
          </div>
          <button
            onClick={() => {
              onClose();
              sound.play('click');
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition hover:scale-105 active:scale-95"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
