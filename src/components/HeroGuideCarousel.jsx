import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Key,
  Home,
  Wrench,
  Search,
  MessageSquare,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Camera,
  Coins
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function HeroGuideCarousel({
  mode,
  setMode,
  onOpenAffordabilityModal,
  onOpenMortgageModal,
  setCurrentPage,
  onFocusSearch
}) {
  // Active Slide: 0 = Renting, 1 = Buying, 2 = Maintenance
  const [activeSlide, setActiveSlide] = useState(mode === 'buy' ? 1 : 0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  // Sync with mode changes from outside
  useEffect(() => {
    if (mode === 'buy' && activeSlide !== 1) {
      setActiveSlide(1);
    } else if (mode === 'rent' && activeSlide !== 0 && activeSlide !== 2) {
      setActiveSlide(0);
    }
  }, [mode]);

  const slides = [
    // SLIDE 1: RENTING GUIDE
    {
      id: 'rent-guide',
      number: '01',
      badge: 'Renter & Room Seeker Guide',
      icon: <Key className="w-4 h-4 text-emerald-600" />,
      title: 'Looking to rent? Welcome, you are in the right place!',
      subtitle: 'Simple steps to find a safe room, bachelor unit, or apartment without stress:',
      steps: [
        {
          num: '1',
          title: 'Search or tap "Near Me"',
          desc: 'Search Tembisa, Midrand, or Clayville to see verified rooms & flats with transparent pricing.'
        },
        {
          num: '2',
          title: 'Click "💡 How much can I afford?"',
          desc: 'Tell us your monthly take-home so we help calculate your comfortable rent range and show we care.'
        },
        {
          num: '3',
          title: 'Chat directly with the host',
          desc: 'Message landlords in-app to verify prepaid meters, water, or book a private viewing.'
        }
      ],
      primaryAction: {
        label: '💡 Check My Rent Budget',
        onClick: () => {
          setMode('rent');
          if (onOpenAffordabilityModal) onOpenAffordabilityModal();
        }
      },
      secondaryAction: {
        label: 'Search Rooms',
        onClick: () => {
          setMode('rent');
          if (onFocusSearch) onFocusSearch();
        }
      },
      nextSlidePrompt: 'Want to buy a home instead? Go to next slide →',
      targetNextSlide: 1,
      bgGradient: 'from-amber-500/10 via-white to-emerald-500/5',
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },

    // SLIDE 2: BUYING GUIDE
    {
      id: 'buy-guide',
      number: '02',
      badge: "Home Buyer's Guide",
      icon: <Home className="w-4 h-4 text-indigo-600" />,
      title: 'Looking to buy a home? Here is how it works!',
      subtitle: 'Everything you need to purchase a verified family home or townhouse with peace of mind:',
      steps: [
        {
          num: '1',
          title: 'Switch to "Buy a Home"',
          desc: 'Browse freestanding houses in Clayville, Noordwyk, Waterfall, and Birch Acres with verified title deeds.'
        },
        {
          num: '2',
          title: 'Calculate monthly bond & levies',
          desc: 'Use our bond calculator to see exact monthly repayments at the current 11.75% prime benchmark.'
        },
        {
          num: '3',
          title: 'Direct seller chat & viewing',
          desc: 'Talk directly with property owners and schedule in-person tours with zero agent pressure.'
        }
      ],
      primaryAction: {
        label: '🏡 Explore Homes to Buy',
        onClick: () => {
          setMode('buy');
          sound.play('toggle');
        }
      },
      secondaryAction: {
        label: 'Bond Calculator',
        onClick: () => {
          if (onOpenMortgageModal) onOpenMortgageModal();
        }
      },
      nextSlidePrompt: 'Need plumbers or electricians? Go to next slide →',
      targetNextSlide: 2,
      bgGradient: 'from-indigo-500/10 via-white to-sky-500/5',
      accentColor: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },

    // SLIDE 3: MAINTENANCE & REPAIRS GUIDE
    {
      id: 'maintenance-guide',
      number: '03',
      badge: 'Home Maintenance Guide',
      icon: <Wrench className="w-4 h-4 text-amber-600" />,
      title: 'Need home repairs? Book verified local pros in seconds!',
      subtitle: 'Reliable plumbers, electricians, painters, and gardeners servicing Tembisa & Midrand:',
      steps: [
        {
          num: '1',
          title: 'Browse verified service pros',
          desc: 'See licensed plumbers, solar/inverter technicians, and gardeners near your home.'
        },
        {
          num: '2',
          title: 'Inspect past completed jobs',
          desc: 'View real before & after work portfolios and verified reviews from local residents.'
        },
        {
          num: '3',
          title: 'Get instant photo quote in Rands',
          desc: 'Describe your issue, attach a photo, and receive an upfront price quotation in-app.'
        }
      ],
      primaryAction: {
        label: '🛠️ Find Maintenance Pros',
        onClick: () => {
          if (setCurrentPage) setCurrentPage('maintenance');
          sound.play('click');
        }
      },
      secondaryAction: {
        label: 'Back to Rent Guide',
        onClick: () => {
          setActiveSlide(0);
          sound.play('click');
        }
      },
      nextSlidePrompt: 'Looking to rent a room again? Back to slide 1 ←',
      targetNextSlide: 0,
      bgGradient: 'from-amber-500/10 via-white to-rose-500/5',
      accentColor: 'text-amber-800 bg-amber-50 border-amber-200'
    }
  ];

  const current = slides[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    sound.play('click');
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    sound.play('click');
  };

  return (
    <div
      onMouseEnter={() => setIsAutoPaused(true)}
      onMouseLeave={() => setIsAutoPaused(false)}
      className="relative w-full max-w-lg lg:max-w-none rounded-[2.5rem] bg-white border border-slate-200/90 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 min-h-[460px]"
    >
      {/* Top Header Row with Slide Numbers & Controls */}
      <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
        
        {/* Slide Counter & Category Tag */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-black shadow-sm">
            <span>{current.number}</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="text-slate-300">03</span>
          </div>

          <span className={`px-3 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${current.accentColor}`}>
            {current.icon}
            <span>{current.badge}</span>
          </span>
        </div>

        {/* Carousel Navigation Arrow Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition active:scale-95 shadow-sm"
            title="Previous Guide Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition active:scale-95 shadow-sm"
            title="Next Guide Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Body Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {current.subtitle}
          </p>
        </div>

        {/* 3 Interactive Easy Steps */}
        <div className="space-y-2.5 my-2">
          {current.steps.map((step) => (
            <div
              key={step.num}
              className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex items-start gap-3 transition hover:bg-slate-100/80"
            >
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {step.num}
              </div>
              <div className="min-w-0">
                <span className="font-bold text-xs text-slate-900 block">
                  {step.title}
                </span>
                <p className="text-[11px] text-slate-600 leading-normal mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Button & Next Slide Direct Link */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={current.primaryAction.onClick}
              className="flex-1 py-3 px-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{current.primaryAction.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {current.secondaryAction && (
              <button
                type="button"
                onClick={current.secondaryAction.onClick}
                className="py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition active:scale-95 whitespace-nowrap"
              >
                {current.secondaryAction.label}
              </button>
            )}
          </div>

          {/* Next Slide Prompt Text Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setActiveSlide(current.targetNextSlide);
                sound.play('click');
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-950 transition inline-flex items-center gap-1.5 underline decoration-slate-300 underline-offset-4"
            >
              <span>{current.nextSlidePrompt}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Progress Indicator Dots */}
      <div className="px-6 py-2.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-medium text-[10px] uppercase tracking-wider text-slate-500">
          User-Friendly Guide
        </span>

        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSlide(idx);
                sound.play('click');
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? 'w-6 bg-slate-900'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Go to slide ${s.number}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
