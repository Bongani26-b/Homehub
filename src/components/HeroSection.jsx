import React from 'react';
import { ShieldCheck, Zap, Sparkles, MessageCircle, ArrowDown } from 'lucide-react';
import SmartHeroFinder from './SmartHeroFinder';

export default function HeroSection({
  mode,
  setMode,
  searchLocation,
  setSearchLocation,
  nearMeOnly,
  setNearMeOnly,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  selectedType,
  setSelectedType,
  minBeds,
  setMinBeds,
  onSearchSubmit,
  onOpenAffordabilityModal,
  onOpenMortgageModal,
  setCurrentPage,
  addToast,
  affordabilityProfile,
  setAffordabilityProfile,
  filteredCount
}) {
  const handleScrollToExplore = () => {
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      {/* Hero Outer Rounded Container */}
      <div className="relative rounded-[2.5rem] hero-gradient overflow-hidden p-6 sm:p-10 lg:p-14 border border-slate-200/60 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Clean Brand & Value Props (5-6 Cols) */}
          <div className="lg:col-span-5 space-y-6 z-10">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Tembisa & Midrand Property Finder</span>
            </div>

            {/* Massive Clean Bold Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Find your next home <br />
              <span className="text-slate-700">fast & stress-free.</span>
            </h1>

            {/* Clear Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore verified rooms to rent, apartments, and freestanding family houses to buy across Tembisa and Midrand. Use the quick form to match homes within your comfortable budget in real time.
            </p>

            {/* 3 Simple Trust Value Props */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-semibold">
                <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Verified landlords & registered title deeds</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-semibold">
                <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Live instant affordability & bond calculator</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-semibold">
                <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>Chat directly with hosts with zero agent fees</span>
              </div>
            </div>

            {/* Quick Link to Browse All Results */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToExplore}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950 transition underline decoration-slate-300 underline-offset-4 cursor-pointer"
              >
                <span>Or jump straight down to {filteredCount} properties</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Side: Fast & Streamlined Interactive Search & Match Form (7 Cols) */}
          <div className="lg:col-span-7 relative flex justify-center">
            <SmartHeroFinder
              mode={mode}
              setMode={setMode}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              nearMeOnly={nearMeOnly}
              setNearMeOnly={setNearMeOnly}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              affordabilityProfile={affordabilityProfile}
              setAffordabilityProfile={setAffordabilityProfile}
              minBudget={minBudget}
              setMinBudget={setMinBudget}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              filteredCount={filteredCount}
              onExploreClick={handleScrollToExplore}
              addToast={addToast}
            />
          </div>

        </div>

      </div>
    </div>
  );
}


