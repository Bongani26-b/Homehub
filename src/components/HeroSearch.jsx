import React from 'react';
import {
  Search,
  MapPin,
  DollarSign,
  SlidersHorizontal,
  LocateFixed,
  Building,
  BedDouble,
  Sparkles,
  X
} from 'lucide-react';
import { CITIES, PROPERTY_TYPES } from '../data/propertiesData';
import { sound } from '../utils/sound';

export default function HeroSearch({
  mode,
  searchLocation,
  setSearchLocation,
  nearMeOnly,
  setNearMeOnly,
  maxBudget,
  setMaxBudget,
  selectedType,
  setSelectedType,
  minBeds,
  setMinBeds,
  totalResultsCount,
  onResetFilters,
  addToast
}) {
  const isBuy = mode === 'buy';
  const defaultMax = isBuy ? 4000000 : 10000;
  const step = isBuy ? 50000 : 250;
  const minSlider = isBuy ? 300000 : 1000;

  const formatPrice = (val) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold mb-4 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          {isBuy ? 'Find & Purchase Verified Luxury Homes' : 'Rent Curated Apartments, Lofts & Villas'}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Where would you like to{' '}
          <span className={`bg-gradient-to-r ${isBuy ? 'from-brand-300 via-sky-300 to-indigo-300' : 'from-emerald-300 via-teal-300 to-cyan-300'} bg-clip-text text-transparent`}>
            {isBuy ? 'buy your next home?' : 'rent your next home?'}
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
          Explore curated residential properties, search by custom budget, or discover available homes directly near your location.
        </p>
      </div>

      {/* Main Filter Search Box Container */}
      <div className="relative z-10 glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-700/80">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* 1. Location Input & GPS Near Me (5 Cols) */}
          <div className="md:col-span-5 relative">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                Location or Neighborhood
              </span>
              {nearMeOnly && (
                <span className="text-[10px] text-emerald-400 font-semibold animate-pulse">
                  📍 Near Me Active (&lt; 3.5 km)
                </span>
              )}
            </label>

            <div className="relative flex items-center">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                  if (nearMeOnly) setNearMeOnly(false);
                }}
                placeholder="City, ZIP or Neighborhood (e.g. Austin, Miami)..."
                className="w-full pl-10 pr-24 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />

              {/* Near Me GPS Simulation Button */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !nearMeOnly;
                  setNearMeOnly(nextState);
                  if (nextState) {
                    setSearchLocation('');
                    sound.play('success');
                    addToast('📍 GPS Location detected! Showing verified homes near you (within 3.5 km)', 'success');
                  } else {
                    sound.play('click');
                    addToast('Cleared Near Me filter', 'info');
                  }
                }}
                className={`absolute right-2 px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  nearMeOnly
                    ? 'bg-emerald-500 text-slate-950 shadow-glow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
                title="Detect Current Location & Find Nearby Homes"
              >
                <LocateFixed className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Near Me</span>
              </button>
            </div>
          </div>

          {/* 2. Budget Slider Filter (4 Cols) */}
          <div className="md:col-span-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Max Budget {isBuy ? '(Total Price)' : '(Monthly)'}
              </label>
              <span className="text-sm font-extrabold text-brand-300 font-mono">
                {formatPrice(maxBudget)} {isBuy ? '' : '/mo'}
              </span>
            </div>

            <div className="py-2">
              <input
                type="range"
                min={minSlider}
                max={defaultMax}
                step={step}
                value={maxBudget}
                onChange={(e) => {
                  setMaxBudget(Number(e.target.value));
                }}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>{formatPrice(minSlider)}</span>
                <span>{formatPrice(defaultMax)}+</span>
              </div>
            </div>
          </div>

          {/* 3. Property Type & Beds (3 Cols) */}
          <div className="md:col-span-3 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-purple-400" />
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  sound.play('click');
                }}
                className="w-full px-3 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-brand-500"
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-sky-400" />
                Beds
              </label>
              <select
                value={minBeds}
                onChange={(e) => {
                  setMinBeds(Number(e.target.value));
                  sound.play('click');
                }}
                className="w-full px-3 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-brand-500"
              >
                <option value={0}>Any Beds</option>
                <option value={1}>1+ Beds</option>
                <option value={2}>2+ Beds</option>
                <option value={3}>3+ Beds</option>
                <option value={4}>4+ Beds</option>
              </select>
            </div>
          </div>

        </div>

        {/* Quick Location Pills & Results Status Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-medium">Popular Cities:</span>
            {CITIES.filter((c) => c !== 'All Locations').map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSearchLocation(city);
                  setNearMeOnly(false);
                  sound.play('click');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                  searchLocation === city
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              Found <strong className="text-white font-bold">{totalResultsCount}</strong> properties
            </span>
            {(searchLocation || nearMeOnly || selectedType !== 'All Types' || minBeds > 0) && (
              <button
                onClick={onResetFilters}
                className="text-rose-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <X className="w-3 h-3" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
