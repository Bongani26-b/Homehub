import React from 'react';
import { Heart, X, Trash2, BedDouble, Bath, Maximize, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function WishlistDrawer({
  isOpen,
  onClose,
  favorites,
  properties,
  mode,
  onRemoveFavorite,
  onSelectProperty,
  onClearAll,
  addToast
}) {
  if (!isOpen) return null;

  const favProperties = properties.filter((p) => favorites.includes(p.id));
  const isBuy = mode === 'buy';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col justify-between shadow-2xl animate-slide-up p-6 overflow-y-auto">
        
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Saved Wishlist ({favProperties.length})</h3>
                <p className="text-[11px] text-slate-500">Tembisa & Midrand saved properties</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Saved Properties */}
          <div className="mt-4 space-y-3">
            {favProperties.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs space-y-2">
                <Heart className="w-12 h-12 mx-auto text-slate-300" />
                <p className="font-bold text-slate-700 text-sm">No saved properties yet</p>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Tap the heart icon on any house, apartment, or room to save it here for quick viewing.
                </p>
              </div>
            ) : (
              favProperties.map((p) => {
                const price = isBuy ? p.price : p.priceMonthly;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProperty(p);
                      onClose();
                    }}
                    className="cursor-pointer p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition flex gap-3 group"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-slate-700 truncate">
                          {p.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{p.neighborhood}, {p.location}</div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs font-extrabold text-slate-900 font-mono">
                          R{price.toLocaleString()}
                          <span className="text-[10px] font-normal font-sans text-slate-500">
                            {isBuy ? '' : '/mo'}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveFavorite(p.id);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        {favProperties.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={onClearAll}
              className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold transition"
            >
              Clear All Saved Properties
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
