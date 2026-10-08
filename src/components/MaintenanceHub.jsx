import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Star,
  CheckCircle2,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Image as ImageIcon
} from 'lucide-react';
import { SERVICE_CATEGORIES, SERVICE_PROVIDERS } from '../data/maintenanceProvidersData';
import { sound } from '../utils/sound';

export default function MaintenanceHub({ onSelectProvider, onOpenQuoteChat, addToast }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [nearMeFilter, setNearMeFilter] = useState(false);

  const filteredProviders = SERVICE_PROVIDERS.filter((provider) => {
    // Category match
    if (selectedCategory !== 'all' && provider.category !== selectedCategory) {
      return false;
    }
    // Search query match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        provider.name.toLowerCase().includes(q) ||
        provider.businessName.toLowerCase().includes(q) ||
        provider.trade.toLowerCase().includes(q) ||
        provider.services.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    // Near Me radius (< 2.5 km)
    if (nearMeFilter && provider.distanceKm > 2.5) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-fade-in">
      
      {/* Hero Banner with matching pastel gradient */}
      <div className="relative rounded-[2.5rem] hero-gradient p-8 sm:p-12 border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-slate-900" />
            Home Care, Repairs & Improvements
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find Trusted Plumbers, Gardeners, Painters & Repair Pros
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Connect with verified local service providers registered in our system. View their past completed work, request instant price quotations with photos, and chat directly in the app.
          </p>

          {/* Search & Near Me Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plumbing, painters, lawn care, electricians..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 shadow-sm font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <button
              onClick={() => {
                const next = !nearMeFilter;
                setNearMeFilter(next);
                if (next) {
                  sound.play('success');
                  addToast('📍 Filtered to service providers near your home (< 2.5 km)', 'success');
                } else {
                  sound.play('click');
                }
              }}
              className={`px-5 py-3 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 ${
                nearMeFilter
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-sm'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{nearMeFilter ? 'Nearby Active' : 'Near Me'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              sound.play('click');
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Service Providers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Found <strong className="text-slate-900 font-bold">{filteredProviders.length}</strong> verified professionals
          </span>
          {nearMeFilter && <span className="text-emerald-700 font-semibold">• Showing within 2.5 km</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="clean-card rounded-3xl p-6 flex flex-col justify-between space-y-5"
            >
              <div>
                {/* Provider Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                        {provider.name}
                        {provider.verified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verified Professional" />
                        )}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{provider.businessName}</p>
                      <div className="flex items-center gap-2 text-xs mt-1">
                        <span className="flex items-center gap-1 font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          {provider.rating} ({provider.reviewsCount})
                        </span>
                        <span>•</span>
                        <span className="text-slate-500 font-mono text-[11px]">{provider.distanceKm} km away</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trade Badge & Rates */}
                <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                  <span className="px-3 py-1 rounded-full bg-slate-100 font-bold text-slate-800 text-[11px]">
                    {provider.trade}
                  </span>
                  <span className="font-black text-slate-900 font-mono text-sm">
                    R{provider.hourlyRate} <span className="font-normal text-xs text-slate-500 font-sans">/ hr</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {provider.bio}
                </p>

                {/* What They Have Done (Portfolio Thumbnails Preview) */}
                {provider.portfolio.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Recent Completed Work:
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {provider.portfolio.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => onSelectProvider(provider)}
                          className="w-24 h-16 rounded-xl overflow-hidden relative cursor-pointer group shrink-0 border border-slate-200"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectProvider(provider)}
                  className="flex-1 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition text-center"
                >
                  View Profile & Work
                </button>
                <button
                  onClick={() => onOpenQuoteChat(provider)}
                  className="py-2.5 px-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
