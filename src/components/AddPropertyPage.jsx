import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  Maximize,
  Car,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function AddPropertyPage({ onAddProperty, onCancel, addToast }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'House',
    mode: 'buy', // 'buy' | 'rent'
    price: '',
    location: 'Chicago, IL',
    address: '',
    neighborhood: '',
    beds: 3,
    baths: 2,
    sqft: 2400,
    garage: 2,
    yearBuilt: 2024,
    hoa: 200,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '',
    amenities: [
      'Smart Home Automation',
      'Chef Kitchen with Miele Appliances',
      'Private Balcony / Terrace',
      'EV Supercharger'
    ]
  });

  const photoPresets = [
    {
      label: 'Modernist Glass Villa',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      label: 'Luxury Penthouse Terrace',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    },
    {
      label: 'Scandinavian Oak Residence',
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      label: 'Coastal Waterfront Loft',
      url: 'https://images.unsplash.com/photo-1502005229762-ee1b2b91e0eb?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const availableAmenities = [
    'Smart Home Automation',
    'Chef Kitchen with Miele Appliances',
    'Private Balcony / Terrace',
    'EV Supercharger',
    'Infinity Pool',
    'Private Rooftop Jacuzzi',
    'Panoramic Skyline Views',
    'Hardwood Floors',
    'Custom Cedar Sauna',
    '24/7 Concierge'
  ];

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      if (exists) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) };
      }
      return { ...prev, amenities: [...prev.amenities, amenity] };
    });
    sound.play('click');
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.address) {
      addToast('Please fill out the property title, price, and address.', 'alert');
      return;
    }

    const priceNum = parseFloat(formData.price) || (formData.mode === 'buy' ? 1200000 : 4500);
    const newProperty = {
      id: 'p' + Date.now(),
      title: formData.title,
      type: formData.type,
      mode: formData.mode,
      price: formData.mode === 'buy' ? priceNum : priceNum * 250,
      priceMonthly: formData.mode === 'rent' ? priceNum : Math.round(priceNum / 250),
      location: formData.location,
      address: formData.address,
      neighborhood: formData.neighborhood || formData.location.split(',')[0],
      coordinates: { lat: 41.8781, lng: -87.6298 },
      distanceKm: 1.4,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      yearBuilt: Number(formData.yearBuilt),
      garage: Number(formData.garage),
      images: [formData.imageUrl],
      featured: true,
      virtualTour: true,
      verified: true,
      amenities: formData.amenities,
      description:
        formData.description ||
        'Newly listed masterpiece property featuring modern architectural finishes, high ceilings, seamless open-concept living, and top-tier luxury appliances.',
      agent: {
        name: 'You (Property Owner)',
        role: 'Verified Direct Owner',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        phone: '+1 (312) 555-0188',
        email: 'owner@apartments-hub.com',
        rating: 5.0,
        reviewsCount: 1
      },
      hoa: Number(formData.hoa) || 150,
      propertyTaxRate: 1.5
    };

    onAddProperty(newProperty);
    sound.play('success');
    addToast(`"${formData.title}" has been published to the live marketplace! 🏡`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in space-y-8">
      
      {/* Header Banner with matching pastel gradient */}
      <div className="relative rounded-[2.5rem] hero-gradient p-8 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">
            Property Partner Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            List Your Property
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-lg">
            Connect with millions of buyers and verified renters across the country.
          </p>
        </div>

        <button
          onClick={onCancel}
          className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition shadow-sm"
        >
          &larr; Back to Listings
        </button>
      </div>

      {/* Multi-Step Progress Tracker */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { num: 1, label: 'Basic Info' },
            { num: 2, label: 'Specifications' },
            { num: 3, label: 'Pricing & Photos' },
            { num: 4, label: 'Review & Publish' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  step === s.num
                    ? 'bg-slate-900 text-white shadow-md'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === s.num ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Content */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900">Step 1: Property Type & Intent</h2>

            {/* Mode Switch (Sale vs Rent) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, mode: 'buy' });
                  sound.play('toggle');
                }}
                className={`py-4 rounded-2xl font-bold text-sm transition flex flex-col items-center gap-1 ${
                  formData.mode === 'buy'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">🏡</span>
                <span>List for Sale</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, mode: 'rent' });
                  sound.play('toggle');
                }}
                className={`py-4 rounded-2xl font-bold text-sm transition flex flex-col items-center gap-1 ${
                  formData.mode === 'rent'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">🔑</span>
                <span>List for Rent</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Property Headline Title *
              </label>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Modernist Glass Residence with Skyline Views"
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Property Category
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-slate-900"
                >
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  City / Market
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-slate-900"
                >
                  <option value="Chicago, IL">Chicago, IL</option>
                  <option value="Austin, TX">Austin, TX</option>
                  <option value="Miami, FL">Miami, FL</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="Seattle, WA">Seattle, WA</option>
                  <option value="San Diego, CA">San Diego, CA</option>
                  <option value="Los Angeles, CA">Los Angeles, CA</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Street Address *
                </label>
                <input
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 1420 N Astor St"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Neighborhood (Optional)
                </label>
                <input
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  placeholder="e.g. Gold Coast, Lincoln Park"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!formData.title || !formData.address) {
                    addToast('Please enter title and address to proceed.', 'alert');
                    return;
                  }
                  setStep(2);
                  sound.play('click');
                }}
                className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Continue to Specs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Specs & Amenities */}
        {step === 2 && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900">Step 2: Property Specifications & Amenities</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-slate-300 text-slate-900 text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="20"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-slate-300 text-slate-900 text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Area (Sq Ft)</label>
                <input
                  type="number"
                  step="50"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-slate-300 text-slate-900 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parking Spots</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.garage}
                  onChange={(e) => setFormData({ ...formData, garage: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-slate-300 text-slate-900 text-center font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Select Highlight Amenities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableAmenities.map((amenity) => {
                  const isSelected = formData.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded-2xl text-xs font-semibold text-left transition flex items-center justify-between border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{amenity}</span>
                      <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(3);
                  sound.play('click');
                }}
                className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Continue to Pricing & Photos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Pricing & Photo Presets */}
        {step === 3 && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900">Step 3: Pricing, Description & Imagery</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {formData.mode === 'buy' ? 'Selling Price ($) *' : 'Monthly Rent Rate ($/mo) *'}
                </label>
                <input
                  required
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder={formData.mode === 'buy' ? '1850000' : '5200'}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Monthly HOA Fee ($)
                </label>
                <input
                  type="number"
                  value={formData.hoa}
                  onChange={(e) => setFormData({ ...formData, hoa: e.target.value })}
                  placeholder="250"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm font-mono focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Property Story / Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Highlight unique architectural qualities, luxury finishes, views, and neighborhood perks..."
                className="w-full p-4 rounded-2xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Cover Photo Preset or Enter Image URL
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {photoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, imageUrl: preset.url });
                      sound.play('click');
                    }}
                    className={`rounded-2xl overflow-hidden border-2 transition text-left group ${
                      formData.imageUrl === preset.url ? 'border-slate-900 ring-2 ring-slate-900/30' : 'border-slate-200'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-20 object-cover" />
                    <div className="p-1.5 text-[10px] font-bold text-slate-800 bg-white truncate">
                      {preset.label}
                    </div>
                  </button>
                ))}
              </div>

              <input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Custom Image URL..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-mono"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!formData.price) {
                    addToast('Please enter the price before continuing.', 'alert');
                    return;
                  }
                  setStep(4);
                  sound.play('click');
                }}
                className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Review Listing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Final Publish */}
        {step === 4 && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900">Step 4: Review & Publish Your Property</h2>

            {/* Live Card Preview */}
            <div className="rounded-3xl border border-slate-200 p-4 bg-slate-50 flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={formData.imageUrl}
                alt="preview"
                className="w-full sm:w-48 h-36 object-cover rounded-2xl"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white uppercase">
                  {formData.type} • {formData.mode === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 truncate">{formData.title}</h3>
                <div className="text-xs text-slate-500">{formData.address}, {formData.location}</div>
                <div className="text-lg font-black text-slate-900 font-mono mt-2">
                  ${parseFloat(formData.price).toLocaleString()}
                  <span className="text-xs font-sans text-slate-500 font-normal">
                    {formData.mode === 'buy' ? ' Total' : '/mo'}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  {formData.beds} Beds • {formData.baths} Baths • {formData.sqft} sq ft
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Your property is ready to be published instantly and discoverable by buyers & renters across the network.
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-10 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl transition hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Property Now</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
