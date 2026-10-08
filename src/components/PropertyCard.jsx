import React, { useState } from 'react';
import {
  Heart,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  CheckCircle2,
  Video,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function PropertyCard({
  property,
  mode,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onChatSeller,
  affordabilityProfile
}) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const isBuy = mode === 'buy';
  const displayPrice = isBuy ? property.price : property.priceMonthly;

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group cursor-pointer clean-card rounded-3xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100 p-2 pb-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <img
            src={property.images[currentImgIdx] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex flex-wrap gap-1.5 pointer-events-auto">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-slate-900 shadow-sm">
                {property.type}
              </span>
              {property.virtualTour && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white flex items-center gap-1 shadow-sm">
                  <Video className="w-3 h-3" />
                  3D Tour
                </span>
              )}
            </div>

            {/* Favorite Heart Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-all shadow-md hover:scale-110 active:scale-95 ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 hover:bg-white text-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Image carousel arrows */}
          {property.images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePrevImg}
                className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow transition hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImg}
                className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow transition hover:scale-110"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Distance Indicator */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-700 text-[11px] font-medium shadow-sm">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>{property.distanceKm} km away</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {/* Price & Location */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">
              R{displayPrice.toLocaleString()}
              <span className="text-xs font-normal font-sans text-slate-500 ml-1">
                {isBuy ? '' : '/mo'}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium truncate">
              {property.neighborhood}
            </span>
          </div>

          {/* Affordability Context Badge */}
          {affordabilityProfile?.active && (
            <div className="mt-2">
              {displayPrice <= affordabilityProfile.maxBudget && displayPrice >= affordabilityProfile.minBudget ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                  ✨ Perfect Budget Fit (~{affordabilityProfile.income > 0 ? Math.round((displayPrice / affordabilityProfile.income) * 100) : 30}% of income)
                </span>
              ) : displayPrice < affordabilityProfile.minBudget ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
                  💰 High Savings (Save ~R{(affordabilityProfile.target - displayPrice).toLocaleString()}/mo)
                </span>
              ) : null}
            </div>
          )}

          <h3 className="font-bold text-base text-slate-900 group-hover:text-slate-700 transition line-clamp-1 mt-1.5">
            {property.title}
          </h3>

          {/* Key Landmark / Office Proximity Tag */}
          {property.landmarks && property.landmarks.length > 0 && (
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-slate-600 truncate">
              <span className="text-slate-400">📍</span>
              <span className="truncate">{property.landmarks[0]}</span>
            </div>
          )}

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-slate-400" />
              {property.beds} {property.beds === 1 ? 'bed' : 'beds'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              {property.baths} baths
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-slate-400" />
              {property.sqft} m²
            </span>
          </div>
        </div>

        {/* Action Buttons: Chat with Seller & View Details */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChatSeller(property);
            }}
            className="flex-1 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-700" />
            <span>Chat Seller</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition text-center shadow-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
