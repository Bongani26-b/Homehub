import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  X,
  MapPin,
  CheckCircle2,
  DollarSign,
  Image as ImageIcon,
  Clock,
  Sparkles,
  Paperclip,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProviderQuoteChatModal({ provider, onClose, addToast }) {
  const [stage, setStage] = useState('form'); // 'form' | 'chat'
  
  // Quote form inputs
  const [issueDescription, setIssueDescription] = useState('');
  const [issuePhoto, setIssuePhoto] = useState('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80');
  const [urgency, setUrgency] = useState('Standard (Within 24-48 hrs)');
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );

  // Chat message thread
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sampleIssuePhotos = [
    { label: 'Pipe Leak / Water issue', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
    { label: 'Electrical / Light switch', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
    { label: 'Garden / Lawn overgrowth', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80' },
    { label: 'Wall Paint / Scuff repair', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleStartQuoteRequest = (e) => {
    e.preventDefault();
    if (!issueDescription.trim()) {
      addToast('Please describe the issue or repair needed', 'alert');
      return;
    }

    const initialMessages = [
      {
        id: 'm_init',
        sender: 'user',
        text: `Hello ${provider.name}, I would like to request a quotation for maintenance:\n\n📋 Issue: ${issueDescription}\n📅 Preferred Date: ${preferredDate}\n⚡ Urgency: ${urgency}`,
        photo: issuePhoto,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(initialMessages);
    setStage('chat');
    sound.play('success');
    addToast('Quote request and photos sent to provider! 📬', 'success');

    // Simulate provider instant response
    setIsTyping(true);
    setTimeout(() => {
      const estimatedPrice = Math.round(provider.hourlyRate * 1.5 + 120);
      const reply = {
        id: 'm_reply_1',
        sender: 'provider',
        text: `Hi there! Thanks for sending the details and photos. Based on the issue description, I can take care of this on ${preferredDate}.\n\nEstimated Quote: ~R${estimatedPrice} - R${estimatedPrice + 150} (Parts + Labor). Does this time window work for you?`,
        quoteEstimate: `R${estimatedPrice} - R${estimatedPrice + 150}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
      sound.play('success');
      addToast(`Quotation received from ${provider.name}! 💬`, 'info');
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: 'm_' + Date.now(),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    sound.play('click');

    setIsTyping(true);
    setTimeout(() => {
      const providerReply = {
        id: 'm_p_' + Date.now(),
        sender: 'provider',
        text: `Sounds great! I have reserved ${preferredDate} on my schedule. I will bring all necessary replacement tools. See you then!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, providerReply]);
      setIsTyping(false);
      sound.play('success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 h-[640px] flex flex-col my-auto animate-slide-up">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                {provider.name}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {provider.trade}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                R{provider.hourlyRate}/hr • Replies in {provider.responseTime}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STAGE 1: ISSUE DESCRIPTION & PHOTO UPLOAD FORM */}
        {stage === 'form' && (
          <form onSubmit={handleStartQuoteRequest} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Describe the Maintenance Need</h3>
              <p className="text-slate-500 mt-0.5">
                Explain what needs repair or servicing to receive an accurate price quotation.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Issue Description *</label>
              <textarea
                required
                rows={3}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="e.g. The water pipe under my kitchen sink has a steady drip, and the faucet handle is loose..."
                className="w-full p-3.5 rounded-2xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-900"
              />
            </div>

            {/* Photo Attachment Section */}
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
                Attach Photo of the Problem
              </label>

              <div className="grid grid-cols-2 gap-2 mb-2">
                {sampleIssuePhotos.map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setIssuePhoto(sample.url);
                      sound.play('click');
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                      issuePhoto === sample.url ? 'border-slate-900 bg-slate-100 font-bold' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <img src={sample.url} alt="sample" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                    <span className="text-[10px] text-slate-700 truncate">{sample.label}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={issuePhoto}
                onChange={(e) => setIssuePhoto(e.target.value)}
                placeholder="Or paste custom photo URL..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                >
                  <option value="Emergency (Today ASAP)">Emergency (Today ASAP)</option>
                  <option value="Standard (Within 24-48 hrs)">Standard (24-48 hrs)</option>
                  <option value="Flexible (This week)">Flexible (This week)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Send Request & Open Live Chat</span>
              </button>
            </div>
          </form>
        )}

        {/* STAGE 2: LIVE CHAT & QUOTE MESSAGES */}
        {stage === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-white">
            
            {/* Messages Thread */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                        isUser
                          ? 'bg-slate-900 text-white rounded-br-xs shadow-sm'
                          : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      {msg.photo && (
                        <div className="rounded-xl overflow-hidden mt-2 border border-white/20">
                          <img src={msg.photo} alt="Issue photo" className="w-full h-32 object-cover" />
                        </div>
                      )}
                      {msg.quoteEstimate && (
                        <div className="p-2.5 rounded-xl bg-emerald-100/90 text-emerald-900 font-bold flex items-center justify-between mt-2">
                          <span>Quotation Estimate:</span>
                          <span className="font-mono text-sm">{msg.quoteEstimate}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">{msg.time}</span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 text-slate-500 text-xs w-24">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3.5 border-t border-slate-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Reply to the service provider..."
                className="flex-1 py-2.5 px-4 rounded-full border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white transition shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
