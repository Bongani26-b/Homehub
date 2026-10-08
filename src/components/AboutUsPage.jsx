import React from 'react';
import { ShieldCheck, Award, Users, HeartHandshake, Sparkles, Building2, Star, Wrench } from 'lucide-react';

export default function AboutUsPage({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in space-y-12">
      
      {/* Hero Header */}
      <div className="relative rounded-[2.5rem] hero-gradient p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          Tembisa & Midrand Housing & Maintenance Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto">
          Simplifying How You Find, Rent & Maintain Your Home
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Built specifically for residents and movers in Tembisa, Midrand, Clayville, and Waterfall City. Search houses to buy, rooms to rent, and book verified local maintenance pros in one app.
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition"
        >
          Explore Tembisa & Midrand &rarr;
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { metric: 'R850M+', label: 'Property Sales & Rentals' },
          { metric: '14,000+', label: 'Happy Tenants & Buyers' },
          { metric: '99.4%', label: 'Verified Listing Accuracy' },
          { metric: '250+', label: 'Registered Local Pros' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">{stat.metric}</div>
            <div className="text-xs text-slate-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Values Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Why Residents Choose Our Platform</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">100% Verified Listings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every house, apartment, and bachelor room to rent across Tembisa and Midrand is physically checked and verified to prevent rental scams.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Wrench className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Verified Local Maintenance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find background-checked plumbers, electricians, gardeners, and painters right in your neighborhood with real past work portfolios.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
              <HeartHandshake className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Direct In-App Chat</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Talk directly with property sellers and hosts in the app to ask questions, verify amenities, and book private viewing appointments.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
