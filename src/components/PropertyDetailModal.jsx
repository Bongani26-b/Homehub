import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  MapPin,
  CheckCircle2,
  BedDouble,
  Bath,
  Maximize,
  Car,
  Calendar,
  DollarSign,
  Calculator,
  Phone,
  Mail,
  Star,
  ShieldCheck,
  Video,
  MessageSquare
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function PropertyDetailModal({
  property,
  mode,
  isFavorite,
  onToggleFavorite,
  onOpenChatSeller,
  onClose,
  addToast
}) {
  const [selectedImg, setSelectedImg] = useState(property.images[0]);
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [bookingTime, setBookingTime] = useState('14:00');
  const [tourType, setTourType] = useState('in-person');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Mortgage Calculator State
  const isBuy = mode === 'buy';
  const price = isBuy ? property.price : property.priceMonthly;
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  const downPayment = (property.price * downPaymentPercent) / 100;
  const principal = property.price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  const monthlyMortgage =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const monthlyPropertyTax = (property.price * (property.propertyTaxRate / 100)) / 12;
  const monthlyInsurance = (property.price * 0.0035) / 12;
  const totalEstimatedMonthly =
    monthlyMortgage + monthlyPropertyTax + monthlyInsurance + (property.hoa || 0);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    sound.play('success');
    addToast(`Viewing scheduled for ${bookingDate} at ${bookingTime} (${tourType})! 📅`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col my-auto animate-slide-up">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-800">
              {property.type} • {isBuy ? 'For Sale' : 'For Rent'}
            </span>
            {property.virtualTour && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                <Video className="w-3.5 h-3.5" />
                Virtual 3D Tour
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenChatSeller(property)}
              className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Seller</span>
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2.5 rounded-full border transition ${
                isFavorite
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Photo Gallery Viewer */}
          <div className="space-y-3">
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden relative bg-slate-100 shadow-sm border border-slate-200">
              <img
                src={selectedImg}
                alt={property.title}
                className="w-full h-full object-cover transition duration-300"
              />
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                <div className="text-2xl font-extrabold font-mono text-slate-900">
                  R{price.toLocaleString()}
                  <span className="text-sm font-sans text-slate-500 ml-1">
                    {isBuy ? 'Purchase Price' : '/month'}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImg(img);
                    sound.play('click');
                  }}
                  className={`w-24 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition ${
                    selectedImg === img ? 'border-slate-900 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Key Highlights */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {property.address}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{property.title}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                <span>Neighborhood: <strong className="text-slate-800">{property.neighborhood}</strong></span>
                <span>•</span>
                <span>Built in <strong className="text-slate-800">{property.yearBuilt}</strong></span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Listing
                </span>
              </div>
            </div>

            {/* Price Metric Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right shrink-0">
              <div className="text-xs text-slate-500">Est. Monthly Cost</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                R{isBuy ? totalEstimatedMonthly.toFixed(0) : property.priceMonthly.toLocaleString()}
                <span className="text-xs font-sans text-slate-500">/mo</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                R{Math.round(property.price / property.sqft)} per m²
              </div>
            </div>
          </div>

          {/* Key Specs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <BedDouble className="w-5 h-5 mx-auto text-slate-600 mb-1" />
              <div className="text-lg font-bold text-slate-900">{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</div>
              <span className="text-xs text-slate-500">Bedrooms</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <Bath className="w-5 h-5 mx-auto text-slate-600 mb-1" />
              <div className="text-lg font-bold text-slate-900">{property.baths} Bathrooms</div>
              <span className="text-xs text-slate-500">Baths</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <Maximize className="w-5 h-5 mx-auto text-slate-600 mb-1" />
              <div className="text-lg font-bold text-slate-900 font-mono">{property.sqft} m²</div>
              <span className="text-xs text-slate-500">Living Space</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <Car className="w-5 h-5 mx-auto text-slate-600 mb-1" />
              <div className="text-lg font-bold text-slate-900">{property.garage} Parking</div>
              <span className="text-xs text-slate-500">Spaces</span>
            </div>
          </div>

          {/* Overview & Amenities + Booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Property Details</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-3">Amenities & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mortgage Calculator for Buy */}
              {isBuy && (
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-slate-700" />
                      Bond & Monthly Cost Breakdown
                    </h3>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      R{totalEstimatedMonthly.toFixed(0)}/month
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-500 mb-1">Deposit ({downPaymentPercent}%)</label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="font-mono text-slate-800 font-bold">R{downPayment.toLocaleString()}</span>
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Interest Rate ({interestRate}%)</label>
                      <input
                        type="range"
                        min="7"
                        max="16"
                        step="0.25"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="font-mono text-slate-800 font-bold">{interestRate}% prime</span>
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Bond Term</label>
                      <select
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                        className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800"
                      >
                        <option value={20}>20 Years Bond</option>
                        <option value={30}>30 Years Bond</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200 grid grid-cols-4 gap-2 text-center text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Bond Repayment</span>
                      <strong className="text-slate-900 font-mono">R{monthlyMortgage.toFixed(0)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Rates & Taxes</span>
                      <strong className="text-slate-900 font-mono">R{monthlyPropertyTax.toFixed(0)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Building Ins.</span>
                      <strong className="text-slate-900 font-mono">R{monthlyInsurance.toFixed(0)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Levies / HOA</span>
                      <strong className="text-slate-900 font-mono">R{property.hoa}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Schedule a Tour & Direct Chat */}
            <div className="space-y-6">
              
              {/* Direct In-App Chat Banner */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Have questions about this place?</h4>
                    <p className="text-[11px] text-slate-300">Message the seller or host directly in the app.</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenChatSeller(property)}
                  className="w-full py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition"
                >
                  Start Live Chat with Seller &rarr;
                </button>
              </div>

              {/* Tour booking */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 mb-1">
                  <Calendar className="w-5 h-5 text-slate-800" />
                  Schedule a Viewing
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Select your date and format.
                </p>

                {bookingConfirmed ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-sm text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Viewing Confirmed!
                    </div>
                    <p>Date: <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong></p>
                    <p>Host <strong>{property.agent.name}</strong> will meet you at the property.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTourType('in-person')}
                        className={`py-2 rounded-xl text-xs font-bold transition ${
                          tourType === 'in-person'
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        🏡 In-Person
                      </button>
                      <button
                        type="button"
                        onClick={() => setTourType('video')}
                        className={`py-2 rounded-xl text-xs font-bold transition ${
                          tourType === 'video'
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        📹 Video Call
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Time</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900"
                      >
                        <option value="10:00 AM">10:00 AM - Morning</option>
                        <option value="01:00 PM">01:00 PM - Afternoon</option>
                        <option value="03:30 PM">03:30 PM - Late Afternoon</option>
                        <option value="05:30 PM">05:30 PM - Sunset</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold shadow transition hover:scale-105 active:scale-95"
                    >
                      Request Private Showing
                    </button>
                  </form>
                )}
              </div>

              {/* Agent card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{property.agent.name}</h4>
                    <p className="text-xs text-slate-500">{property.agent.role}</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{property.agent.rating} ({property.agent.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => onOpenChatSeller(property)}
                    className="w-full py-2 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Open Chat
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
