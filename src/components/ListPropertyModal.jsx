import React, { useState } from 'react';
import { PlusCircle, X, UploadCloud, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ListPropertyModal({ onClose, onAddProperty, addToast }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'House',
    mode: 'buy',
    price: '',
    location: 'Austin, TX',
    address: '',
    neighborhood: '',
    beds: 3,
    baths: 2,
    sqft: 2200,
    garage: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.address) {
      addToast('Please fill out all required fields', 'alert');
      return;
    }

    const priceNum = parseFloat(formData.price) || 500000;
    const newProp = {
      id: 'p' + Date.now(),
      title: formData.title,
      type: formData.type,
      mode: formData.mode,
      price: formData.mode === 'buy' ? priceNum : priceNum * 250,
      priceMonthly: formData.mode === 'rent' ? priceNum : Math.round(priceNum / 250),
      location: formData.location,
      address: formData.address,
      neighborhood: formData.neighborhood || formData.location.split(',')[0],
      coordinates: { lat: 30.2672, lng: -97.7431 },
      distanceKm: 1.5,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      yearBuilt: 2024,
      garage: Number(formData.garage),
      images: [formData.imageUrl],
      featured: true,
      virtualTour: true,
      verified: true,
      amenities: [
        'Open-Concept Gourmet Kitchen',
        'Smart Thermostat & Security',
        'Private Balcony / Yard',
        'Hardwood Floors'
      ],
      description:
        formData.description ||
        'Newly listed luxury property featuring modern architectural finishes, high ceilings, and premium appliances.',
      agent: {
        name: 'You (Owner / Landlord)',
        role: 'Direct Owner Listing',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        phone: '+1 (555) 019-2026',
        email: 'owner@homehub-estate.com',
        rating: 5.0,
        reviewsCount: 1
      },
      hoa: 150,
      propertyTaxRate: 1.2
    };

    onAddProperty(newProp);
    sound.play('success');
    addToast(`Property "${formData.title}" published successfully! 🏡`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 animate-slide-up space-y-6 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-300 border border-brand-500/40 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">List Your Property</h3>
              <p className="text-xs text-slate-400">Add a home for sale or rent to the HomeHub network</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Mode Switch (Sale vs Rent) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, mode: 'buy' })}
              className={`py-3 rounded-2xl font-bold transition flex items-center justify-center gap-2 ${
                formData.mode === 'buy'
                  ? 'bg-brand-600 text-white shadow-glow-sm'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              🏡 For Sale
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, mode: 'rent' })}
              className={`py-3 rounded-2xl font-bold transition flex items-center justify-center gap-2 ${
                formData.mode === 'rent'
                  ? 'bg-emerald-600 text-white shadow-glow-sm'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              🔑 For Rent
            </button>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Property Title *</label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Contemporary Luxury Villa with Pool"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {formData.mode === 'buy' ? 'Selling Price ($) *' : 'Monthly Rent ($) *'}
              </label>
              <input
                required
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder={formData.mode === 'buy' ? '1250000' : '4500'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Property Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Townhouse">Townhouse</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">City / Region</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="Austin, TX">Austin, TX</option>
                <option value="Miami, FL">Miami, FL</option>
                <option value="Seattle, WA">Seattle, WA</option>
                <option value="San Diego, CA">San Diego, CA</option>
                <option value="Los Angeles, CA">Los Angeles, CA</option>
                <option value="New York, NY">New York, NY</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Street Address *</label>
              <input
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. 742 Evergreen Terrace"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-slate-400 mb-1">Beds</label>
              <input
                type="number"
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Baths</label>
              <input
                type="number"
                value={formData.baths}
                onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Sq Ft</label>
              <input
                type="number"
                value={formData.sqft}
                onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-center font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Garage</label>
              <input
                type="number"
                value={formData.garage}
                onChange={(e) => setFormData({ ...formData, garage: e.target.value })}
                className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-center font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Cover Photo Image URL</label>
            <input
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe key highlights, finishes, views, and perks..."
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white text-xs font-bold shadow-glow-sm"
            >
              Publish Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
