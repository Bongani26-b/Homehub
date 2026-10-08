import React from 'react';
import { MessageSquare, X, User, Wrench, Building2, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function MyMessagesModal({
  onClose,
  onOpenSellerChat,
  onOpenProviderChat,
  properties,
  providers
}) {
  const sellerChats = [
    {
      id: 'sc1',
      property: properties[0],
      agent: properties[0].agent,
      lastMsg: 'Saturday at 11:00 AM or 2:30 PM works great for an in-person tour!',
      time: '12m ago',
      unread: true
    },
    {
      id: 'sc2',
      property: properties[1],
      agent: properties[1].agent,
      lastMsg: 'Water, high-speed fiber internet, and trash are fully covered.',
      time: '1h ago',
      unread: false
    }
  ];

  const providerChats = [
    {
      id: 'pc1',
      provider: providers[0],
      lastMsg: 'Estimated Quote: ~R650 - R850 (Parts + Labor). I can come tomorrow morning.',
      time: '25m ago',
      unread: true
    },
    {
      id: 'pc2',
      provider: providers[1],
      lastMsg: 'Sounds great! I will bring all necessary landscaping equipment.',
      time: '2h ago',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col animate-slide-up">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="md:hidden pt-3 flex justify-center">
          <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">My Messages & Inquiries</h3>
              <p className="text-[11px] text-slate-500">Live conversations with sellers & service pros</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chats List */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Property Sellers / Landlords Section */}
          <div className="space-y-3">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              Property Inquiries & Sellers
            </span>

            <div className="space-y-2">
              {sellerChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    onClose();
                    onOpenSellerChat(chat.property);
                    sound.play('click');
                  }}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={chat.agent.avatar}
                      alt={chat.agent.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                        {chat.agent.name}
                        {chat.unread && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate">
                        {chat.property.title}
                      </div>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5">
                        "{chat.lastMsg}"
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono block">{chat.time}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto mt-1 group-hover:text-slate-900 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance & Service Providers Section */}
          <div className="space-y-3">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5" />
              Maintenance Quotes & Service Pros
            </span>

            <div className="space-y-2">
              {providerChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    onClose();
                    onOpenProviderChat(chat.provider);
                    sound.play('click');
                  }}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={chat.provider.avatar}
                      alt={chat.provider.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                        {chat.provider.name}
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          {chat.provider.trade}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate">
                        {chat.provider.businessName}
                      </div>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5">
                        "{chat.lastMsg}"
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono block">{chat.time}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto mt-1 group-hover:text-slate-900 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
