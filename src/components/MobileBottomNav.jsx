import React from 'react';
import { Building2, Wrench, Heart, MessageSquare, Info } from 'lucide-react';
import { sound } from '../utils/sound';

export default function MobileBottomNav({
  currentPage,
  setCurrentPage,
  favoritesCount,
  onOpenWishlist,
  onOpenMessages,
  unreadMessagesCount = 2
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-2 py-2 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-5 items-center text-center">
        
        {/* 1. Explore Homes & Rooms */}
        <button
          onClick={() => {
            setCurrentPage('explore');
            sound.play('click');
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition ${
            currentPage === 'explore'
              ? 'text-slate-950 font-black'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${currentPage === 'explore' ? 'bg-slate-100' : ''}`}>
            <Building2 className={`w-5 h-5 ${currentPage === 'explore' ? 'text-slate-950' : 'text-slate-500'}`} />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">Explore</span>
        </button>

        {/* 2. Maintenance & Repairs */}
        <button
          onClick={() => {
            setCurrentPage('maintenance');
            sound.play('click');
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition ${
            currentPage === 'maintenance'
              ? 'text-slate-950 font-black'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${currentPage === 'maintenance' ? 'bg-slate-100' : ''}`}>
            <Wrench className={`w-5 h-5 ${currentPage === 'maintenance' ? 'text-slate-950' : 'text-slate-500'}`} />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">Services</span>
        </button>

        {/* 3. Messages / Active Chats */}
        <button
          onClick={() => {
            onOpenMessages();
            sound.play('click');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-slate-500 hover:text-slate-900 transition relative"
        >
          <div className="p-1 rounded-xl relative">
            <MessageSquare className="w-5 h-5 text-slate-600" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center shadow">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">Chats</span>
        </button>

        {/* 4. Saved Wishlist */}
        <button
          onClick={() => {
            onOpenWishlist();
            sound.play('click');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-slate-500 hover:text-slate-900 transition relative"
        >
          <div className="p-1 rounded-xl relative">
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">Saved</span>
        </button>

        {/* 5. About Us */}
        <button
          onClick={() => {
            setCurrentPage('about');
            sound.play('click');
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition ${
            currentPage === 'about'
              ? 'text-slate-950 font-black'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${currentPage === 'about' ? 'bg-slate-100' : ''}`}>
            <Info className={`w-5 h-5 ${currentPage === 'about' ? 'text-slate-950' : 'text-slate-500'}`} />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">About</span>
        </button>

      </div>
    </div>
  );
}
