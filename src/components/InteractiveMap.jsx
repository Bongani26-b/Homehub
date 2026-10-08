import React, { useState } from 'react';
import { MapPin, Navigation, Eye, Sparkles } from 'lucide-react';

export default function InteractiveMap({ properties, mode, onSelectProperty }) {
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const isBuy = mode === 'buy';

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800 h-[480px] sm:h-[540px] flex flex-col justify-between shadow-2xl">
      {/* Visual Stylized Map Grid Background */}
      <div className="absolute inset-0 bg-slate-950 opacity-90">
        {/* Synthetic Map SVG Geometry & Streets */}
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
            </pattern>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Water Bay Body */}
          <path d="M 0 300 Q 150 200 350 320 T 700 250 T 1200 400 L 1200 600 L 0 600 Z" fill="url(#waterGrad)" />
          {/* Simulated Highways & Major Roads */}
          <path d="M -50 150 Q 300 80 600 250 T 1250 180" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="3" />
          <path d="M 300 -50 Q 400 300 350 650" fill="none" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="2.5" />
          <path d="M 800 -50 Q 750 350 900 650" fill="none" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="2.5" />
        </svg>

        {/* Radar Pulse Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-brand-500/20 animate-ping opacity-20 pointer-events-none"></div>
      </div>

      {/* Map Header Controls */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs text-slate-200 shadow">
          <Navigation className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
          <span>Interactive Radar Map • <strong>{properties.length} Available Homes</strong></span>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
          Click any price pin to view details
        </div>
      </div>

      {/* Interactive Property Pin Markers on Simulated Coordinate Field */}
      <div className="relative z-10 flex-1 w-full h-full pointer-events-auto">
        {properties.map((p, idx) => {
          // Calculate stylized distributed positions
          const positions = [
            { top: '25%', left: '22%' },
            { top: '35%', left: '72%' },
            { top: '65%', left: '30%' },
            { top: '48%', left: '50%' },
            { top: '20%', left: '80%' },
            { top: '70%', left: '78%' }
          ];
          const pos = positions[idx % positions.length];
          const price = isBuy ? p.price : p.priceMonthly;
          const priceLabel = isBuy
            ? p.price >= 1000000
              ? `$${(p.price / 1000000).toFixed(2)}M`
              : `$${(p.price / 1000).toFixed(0)}k`
            : `$${p.priceMonthly.toLocaleString()}/mo`;

          const isHovered = hoveredProperty?.id === p.id;

          return (
            <div
              key={p.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              onMouseEnter={() => setHoveredProperty(p)}
              onMouseLeave={() => setHoveredProperty(null)}
              onClick={() => onSelectProperty(p)}
            >
              {/* Pin Chip */}
              <div
                className={`px-3 py-1.5 rounded-2xl font-mono text-xs font-black shadow-2xl transition-all duration-300 flex items-center gap-1.5 ${
                  isHovered
                    ? 'bg-brand-500 text-white scale-125 ring-4 ring-brand-400/40 z-30 shadow-glow-lg'
                    : 'bg-slate-900/95 text-brand-300 border border-brand-500/40 hover:bg-brand-600 hover:text-white hover:scale-110'
                }`}
              >
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{priceLabel}</span>
              </div>

              {/* Hover Preview Card Popup */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-2 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-brand-500/50 shadow-2xl z-40 animate-slide-up pointer-events-none">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="font-bold text-xs text-white truncate">{p.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {p.beds} Beds • {p.baths} Baths • {p.location}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map Footer Bar */}
      <div className="relative z-10 p-4 bg-slate-950/85 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Geospatial Map Engine Synchronized
        </span>
        <span className="font-mono text-slate-300">GPS Accuracy: ± 5m</span>
      </div>
    </div>
  );
}
