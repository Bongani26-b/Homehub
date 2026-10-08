import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  MessageSquare,
  Award,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProviderProfileModal({ provider, onClose, onOpenQuoteChat, addToast }) {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'services' | 'reviews'

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col my-auto animate-slide-up">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">{provider.name}</h2>
                {provider.verified && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Pro
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{provider.businessName} • {provider.trade}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {provider.rating} ({provider.reviewsCount} verified reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {provider.distanceKm} km from you
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  Replies in {provider.responseTime}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 border-b border-slate-100 flex gap-4 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('portfolio'); sound.play('click'); }}
            className={`py-2 px-4 rounded-full transition ${
              activeTab === 'portfolio' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            What They Have Done (Portfolio)
          </button>
          <button
            onClick={() => { setActiveTab('services'); sound.play('click'); }}
            className={`py-2 px-4 rounded-full transition ${
              activeTab === 'services' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Services & Rates
          </button>
          <button
            onClick={() => { setActiveTab('reviews'); sound.play('click'); }}
            className={`py-2 px-4 rounded-full transition ${
              activeTab === 'reviews' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Client Reviews ({provider.reviews.length})
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Bio Callout */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">About {provider.name}:</span>
            {provider.bio}
          </div>

          {/* TAB 1: PORTFOLIO / WHAT THEY HAVE DONE */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Past Completed Projects</h3>
                <p className="text-xs text-slate-500">Real documentation and photographs of past maintenance work</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {provider.portfolio.map((item, idx) => (
                  <div key={idx} className="rounded-3xl border border-slate-200 overflow-hidden bg-slate-50 space-y-3 p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-2xl shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES & RATES */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Services Offered</h3>
                  <p className="text-xs text-slate-500">Standard rate: <strong className="text-slate-900 font-mono">R{provider.hourlyRate}/hour</strong> (Labor + Equipment)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {provider.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900">Verified Client Feedback</h3>

              <div className="space-y-3">
                {provider.reviews.map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rev.author}</span>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-slate-500">Hourly Rate</div>
            <div className="text-xl font-black text-slate-900 font-mono">
              R{provider.hourlyRate} <span className="text-xs font-sans text-slate-500 font-normal">/ hour</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenQuoteChat(provider);
              }}
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Describe Issue & Request Quote</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
