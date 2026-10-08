import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Minus,
  Plus,
  CheckCircle2,
  Search,
  LocateFixed,
  MapPin,
  X,
  Building2
} from 'lucide-react';
import { sound } from '../utils/sound';

export const POPULAR_LOCATIONS = [
  // Corporate Headquarters & Business Hubs
  {
    name: 'PwC Tower (Waterfall City)',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'PwC Tower, Waterfall City, Midrand',
    subtext: 'Iconic Waterfall City corporate skyscraper & offices',
    category: 'Corporate Office',
    iconType: 'office'
  },
  {
    name: 'Mall of Africa',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Mall of Africa, Waterfall City, Midrand',
    subtext: 'Waterfall City commercial, retail & lifestyle hub',
    category: 'Shopping & Offices',
    iconType: 'mall'
  },
  {
    name: 'Deloitte Waterfall Campus',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Deloitte, Waterfall City, Midrand',
    subtext: 'Deloitte Africa Headquarters, Waterfall City',
    category: 'Corporate Office',
    iconType: 'office'
  },
  {
    name: 'Vodacom Corporate Park',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Vodacom Corporate Park, Midrand',
    subtext: 'Vodaworld & Vodacom Commercial Campus, Vorna Valley',
    category: 'Corporate Office',
    iconType: 'office'
  },
  {
    name: 'Gautrain Midrand Station',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Gautrain Station, Midrand',
    subtext: 'Rapid train link to Sandton, Rosebank, OR Tambo & Pretoria',
    category: 'Transit Hub',
    iconType: 'transit'
  },
  {
    name: 'Netcare Waterfall City Hospital',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Netcare Waterfall City Hospital, Midrand',
    subtext: 'Specialist medical & healthcare hospital precinct',
    category: 'Healthcare Hub',
    iconType: 'hospital'
  },

  // Suburbs & Neighborhoods
  {
    name: 'Carlswald',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Carlswald, Midrand, Gauteng',
    subtext: 'Popular residential suburb in Midrand (6 mins to PwC)',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Waterfall City',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Waterfall City, Midrand, Gauteng',
    subtext: 'Waterfall Precinct (Home of PwC Tower & Mall of Africa)',
    category: 'Midrand Precinct',
    iconType: 'suburb'
  },
  {
    name: 'Vorna Valley',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Vorna Valley, Midrand, Gauteng',
    subtext: 'Minutes to PwC Tower, Mall of Africa & N1 Highway',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Noordwyk',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Noordwyk, Midrand, Gauteng',
    subtext: 'Central family suburb in Midrand near Vodacom HQ',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Halfway House',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Halfway House, Midrand, Gauteng',
    subtext: 'Central business & residential district near Gallagher',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Kyalami',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Kyalami, Midrand, Gauteng',
    subtext: 'Kyalami Estates & Grand Prix Circuit area',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Clayville East',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Clayville East, Tembisa, Gauteng',
    subtext: 'Family houses & modern developments (12 mins to Midrand)',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Winnie Mandela',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Winnie Mandela, Tembisa, Gauteng',
    subtext: 'Affordable rooms to rent & bachelor units',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Phomolong',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Phomolong, Tembisa, Gauteng',
    subtext: 'Near Phomolong Train Station & Taxi Ranks',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Birch Acres',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Birch Acres, Tembisa, Gauteng',
    subtext: 'Quiet border suburb of Tembisa & Kempton Park',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Tembisa Central',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Tembisa, Gauteng',
    subtext: 'Main Tembisa Municipality & Transport Hub',
    category: 'Tembisa City',
    iconType: 'suburb'
  }
];

export default function SmartHeroFinder({
  mode,
  setMode,
  searchLocation,
  setSearchLocation,
  nearMeOnly,
  setNearMeOnly,
  selectedType,
  setSelectedType,
  affordabilityProfile,
  setAffordabilityProfile,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  filteredCount,
  onExploreClick,
  addToast
}) {
  const isBuy = mode === 'buy';
  const searchContainerRef = useRef(null);

  // Dropdown visibility & filtering state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State for Rent
  const [takeHomePay, setTakeHomePay] = useState(affordabilityProfile?.income || 15000);
  const [otherExpenses, setOtherExpenses] = useState(affordabilityProfile?.expenses || 7000);

  // State for Buy
  const [targetPrice, setTargetPrice] = useState(maxBudget > 50000 ? maxBudget : 1200000);
  const [deposit, setDeposit] = useState(100000);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter autocomplete suggestions based on user typing
  const matchingLocations = POPULAR_LOCATIONS.filter((item) => {
    if (!searchLocation || searchLocation.trim() === '') return true;
    const q = searchLocation.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.fullText.toLowerCase().includes(q) ||
      item.subtext.toLowerCase().includes(q)
    );
  });

  // Auto-calculate Rent Comfort
  const safeBasePercent = 0.30;
  const maxSafePercent = 0.35;
  const income = Math.max(0, Number(takeHomePay) || 0);
  const expenses = Math.max(0, Number(otherExpenses) || 0);
  const leftoverCash = Math.max(0, income - expenses);

  const calculatedMinRent = Math.max(
    1200,
    Math.round(Math.min(income * safeBasePercent, Math.max(1200, leftoverCash * 0.65)) / 100) * 100
  );
  const calculatedMaxRent = Math.max(
    calculatedMinRent + 500,
    Math.round(Math.min(income * maxSafePercent, Math.max(calculatedMinRent + 500, leftoverCash)) / 100) * 100
  );
  const recommendedPoint = Math.round((calculatedMinRent + calculatedMaxRent) / 2 / 100) * 100;

  // Auto-calculate Buy Bond (20 yrs @ 11.75% prime)
  const loanAmount = Math.max(0, targetPrice - deposit);
  const monthlyRate = 0.1175 / 12;
  const nPayments = 240;
  const estMonthlyBond =
    loanAmount > 0
      ? Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, nPayments))) /
            (Math.pow(1 + monthlyRate, nPayments) - 1)
        )
      : 0;

  // Sync to app state in real time
  useEffect(() => {
    if (mode === 'rent') {
      setMinBudget(calculatedMinRent);
      setMaxBudget(calculatedMaxRent);
      if (setAffordabilityProfile) {
        setAffordabilityProfile({
          income,
          expenses,
          minBudget: calculatedMinRent,
          maxBudget: calculatedMaxRent,
          target: recommendedPoint,
          isBuy: false,
          active: true
        });
      }
    } else {
      const minBuy = Math.max(300000, targetPrice - 350000);
      const maxBuy = targetPrice + 250000;
      setMinBudget(minBuy);
      setMaxBudget(maxBuy);
      if (setAffordabilityProfile) {
        setAffordabilityProfile({
          income: Math.round(estMonthlyBond * 3.3),
          expenses: deposit,
          minBudget: minBuy,
          maxBudget: maxBuy,
          target: targetPrice,
          isBuy: true,
          active: true
        });
      }
    }
  }, [mode, takeHomePay, otherExpenses, targetPrice, deposit]);

  const handleSelectLocation = (locationItem) => {
    setSearchLocation(locationItem.fullText);
    setNearMeOnly(false);
    setIsDropdownOpen(false);
    sound.play('click');
    if (addToast) addToast(`📍 Showing properties in ${locationItem.fullText}`, 'info');
  };

  return (
    <div className="w-full max-w-lg rounded-[2.5rem] bg-white border border-slate-200/90 shadow-xl overflow-visible p-6 sm:p-8 space-y-6 transition-all relative">
      
      {/* 1. TOP GROUP: Mode Switcher Pill */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-full bg-slate-100/90 border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => {
              setMode('buy');
              sound.play('toggle');
              if (addToast) addToast('Switched to Buy a Home 🏷️', 'info');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              mode === 'buy'
                ? 'bg-slate-200 text-slate-900 shadow-xs border border-slate-300/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buy a Home
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('rent');
              sound.play('toggle');
              if (addToast) addToast('Switched to Rent a Home or Room 🔑', 'info');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              mode === 'rent'
                ? 'bg-slate-200 text-slate-900 shadow-xs border border-slate-300/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rent a Home or Room
          </button>
        </div>
      </div>

      {/* 2. SEARCH & PROPERTY TYPE (Stacked Directly with Law of Proximity) */}
      <div ref={searchContainerRef} className="relative z-30 space-y-2">
        
        {/* Location Search Bar */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-full border border-slate-200 focus-within:bg-white focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-900/10 transition shadow-2xs">
          <div className="flex-1 flex items-center pl-3">
            <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchLocation}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSearchLocation(e.target.value);
                if (nearMeOnly) setNearMeOnly(false);
                if (!isDropdownOpen) setIsDropdownOpen(true);
              }}
              placeholder="Search Midrand, Carlswald, Tembisa..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
            />
            {searchLocation && (
              <button
                type="button"
                onClick={() => {
                  setSearchLocation('');
                  sound.play('click');
                }}
                className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-700 mr-1"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Near me quick button */}
          <button
            type="button"
            onClick={() => {
              const nextState = !nearMeOnly;
              setNearMeOnly(nextState);
              if (nextState) {
                setSearchLocation('');
                setIsDropdownOpen(false);
                sound.play('success');
                if (addToast) addToast('📍 Showing properties near you (< 3.5 km)', 'success');
              }
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition shrink-0 ${
              nearMeOnly
                ? 'bg-emerald-500 text-white shadow-2xs'
                : 'bg-white hover:bg-slate-200 border border-slate-200 text-slate-700'
            }`}
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span>Near me</span>
          </button>
        </div>

        {/* Property Type Dropdown (Directly Underneath Search Bar) */}
        <div className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-800 focus-within:bg-white focus-within:border-slate-400 transition shadow-2xs">
          <Building2 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <select
            value={selectedType || 'All Types'}
            onChange={(e) => {
              if (setSelectedType) setSelectedType(e.target.value);
              sound.play('click');
              if (addToast) addToast(`Filtered to: ${e.target.value}`, 'info');
            }}
            className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer text-xs w-full"
          >
            <option value="All Types">All Property Types</option>
            <option value="Room to Rent">Rooms / Bachelors to Rent</option>
            <option value="Apartment">Apartments & Flats</option>
            <option value="House">Freestanding Houses</option>
            <option value="Townhouse">Townhouses</option>
            <option value="Villa">Villas</option>
          </select>
        </div>

        {/* Autocomplete Suggestions Dropdown Popup */}
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden animate-fade-in z-50 max-h-72 overflow-y-auto">
            <div className="p-3 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Matching Areas in Tembisa & Midrand</span>
              <span>{matchingLocations.length} locations</span>
            </div>

            {matchingLocations.length > 0 ? (
              <div className="p-1.5 space-y-1">
                {matchingLocations.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectLocation(item)}
                    className="w-full px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 text-left transition flex items-center justify-between group cursor-pointer border border-transparent hover:border-slate-200/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-700 flex items-center justify-center transition shrink-0 shadow-2xs">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-slate-950 flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[11px] font-medium text-slate-500">
                            {item.city}, {item.province}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">
                          {item.subtext}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 shrink-0 ml-2">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">
                <span>No exact suburb matches for "{searchLocation}". Press Enter to search all areas.</span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 3. QUESTIONS GROUP: Structured with Law of Proximity */}
      {!isBuy ? (
        /* ================= RENTING EXPERIENCE ================= */
        <div className="space-y-5 animate-fade-in">
          
          {/* Question 1 Group */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900">
                1. How much do you take home each month?
              </label>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                R{Number(takeHomePay).toLocaleString()}
              </span>
            </div>

            {/* Input & Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTakeHomePay((prev) => Math.max(2000, (Number(prev) || 0) - 500));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
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
                  onChange={(e) => setTakeHomePay(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-sm focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setTakeHomePay((prev) => Math.max(2000, (Number(prev) || 0) + 500));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips (grouped directly beneath input) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">Quick:</span>
              {[8000, 12000, 15000, 20000, 25000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setTakeHomePay(val);
                    sound.play('click');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition whitespace-nowrap ${
                    takeHomePay === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 Group */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900">
                2. About how much do you spend on other things?
              </label>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-md">
                R{Number(otherExpenses).toLocaleString()}
              </span>
            </div>

            {/* Input & Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setOtherExpenses((prev) => Math.max(0, (Number(prev) || 0) - 500));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
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
                  onChange={(e) => setOtherExpenses(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-sm focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setOtherExpenses((prev) => Math.max(0, (Number(prev) || 0) + 500));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips (grouped directly beneath input) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">Quick:</span>
              {[3000, 5000, 7000, 10000, 14000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setOtherExpenses(val);
                    sound.play('click');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition whitespace-nowrap ${
                    otherExpenses === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Result Group: Generous separation */}
          <div className="p-5 rounded-2xl hero-gradient border border-slate-200/90 space-y-2 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Your comfortable home budget
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              R{calculatedMinRent.toLocaleString()} – R{calculatedMaxRent.toLocaleString()}
              <span className="text-xs font-sans text-slate-600 font-normal ml-1">/ month</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
              We recommend staying around <strong className="text-slate-900 font-bold">R{recommendedPoint.toLocaleString()}</strong>, so you have room for your other expenses.
            </p>
          </div>

        </div>
      ) : (
        /* ================= BUYING EXPERIENCE ================= */
        <div className="space-y-5 animate-fade-in">
          
          {/* Question 1 Group: Target Price */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900">
                1. Target property price
              </label>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                R{(targetPrice / 1000).toFixed(0)}k
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTargetPrice((prev) => Math.max(300000, (Number(prev) || 0) - 50000));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-sm pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={targetPrice === 0 ? '' : targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-sm focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setTargetPrice((prev) => Math.max(300000, (Number(prev) || 0) + 50000));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">Quick:</span>
              {[500000, 850000, 1200000, 1800000, 2500000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setTargetPrice(val);
                    sound.play('click');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition whitespace-nowrap ${
                    targetPrice === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 Group: Deposit */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900">
                2. Cash deposit available
              </label>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-md">
                R{Number(deposit).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDeposit((prev) => Math.max(0, (Number(prev) || 0) - 25000));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-sm pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={deposit === 0 ? '' : deposit}
                  onChange={(e) => setDeposit(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-sm focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setDeposit((prev) => Math.max(0, (Number(prev) || 0) + 25000));
                  sound.play('toggle');
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">Quick:</span>
              {[0, 50000, 100000, 200000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setDeposit(val);
                    sound.play('click');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition whitespace-nowrap ${
                    deposit === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {val === 0 ? 'No Deposit' : `R${(val / 1000).toFixed(0)}k`}
                </button>
              ))}
            </div>
          </div>

          {/* Result Group: Generous separation */}
          <div className="p-5 rounded-2xl hero-gradient border border-slate-200/90 space-y-2 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Estimated monthly bond
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              ~R{estMonthlyBond.toLocaleString()}
              <span className="text-xs font-sans text-slate-600 font-normal ml-1">/ month</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
              Based on a 20-year bond at the standard 11.75% prime lending rate.
            </p>
          </div>

        </div>
      )}

      {/* 4. ACTION CTA BUTTON: Clear Breathing Room */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            sound.play('success');
            if (onExploreClick) onExploreClick();
          }}
          className="w-full py-4 px-6 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition hover:scale-[1.01] active:scale-95 flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
            <span>
              Show {filteredCount} Matching {isBuy ? 'Homes to Buy' : 'Homes & Rooms'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 group-hover:text-white transition">
            <span>View below</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </button>
      </div>

    </div>
  );
}
