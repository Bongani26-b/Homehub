import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import InteractiveMap from './components/InteractiveMap';
import MortgageCalculatorModal from './components/MortgageCalculatorModal';
import WishlistDrawer from './components/WishlistDrawer';
import ToastContainer from './components/Toast';
import AboutUsPage from './components/AboutUsPage';

import MaintenanceHub from './components/MaintenanceHub';
import ProviderProfileModal from './components/ProviderProfileModal';
import ProviderQuoteChatModal from './components/ProviderQuoteChatModal';
import SellerChatModal from './components/SellerChatModal';
import MobileBottomNav from './components/MobileBottomNav';
import MyMessagesModal from './components/MyMessagesModal';
import AffordabilityAdvisorModal from './components/AffordabilityAdvisorModal';

import { PROPERTIES, CITIES } from './data/propertiesData';
import { SERVICE_PROVIDERS } from './data/maintenanceProvidersData';
import { sound } from './utils/sound';
import { ChevronLeft, ChevronRight, LayoutGrid, Map, Wrench } from 'lucide-react';

export default function App() {
  // Navigation Page: 'explore' | 'maintenance' | 'about'
  const [currentPage, setCurrentPage] = useState('explore');

  // Properties State (Localized for Tembisa & Midrand)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_properties_sa_v1');
      return saved ? JSON.parse(saved) : PROPERTIES;
    } catch {
      return PROPERTIES;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_favorites_sa_v1');
      return saved ? JSON.parse(saved) : ['p1', 'p2', 'p3'];
    } catch {
      return ['p1', 'p2', 'p3'];
    }
  });

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('apartments_mode') || 'buy'; // 'buy' | 'rent'
  });

  // Filter State
  const [searchLocation, setSearchLocation] = useState('Tembisa');
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [nearMeOnly, setNearMeOnly] = useState(false);
  
  // Affordability & Personalized Budget Profile
  const [affordabilityProfile, setAffordabilityProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_affordability_profile_v1');
      return saved ? JSON.parse(saved) : { income: 15000, expenses: 7000, minBudget: 2000, maxBudget: 7500, target: 5000, active: true };
    } catch {
      return { income: 15000, expenses: 7000, minBudget: 2000, maxBudget: 7500, target: 5000, active: true };
    }
  });

  const [minBudget, setMinBudget] = useState(mode === 'buy' ? 500000 : (affordabilityProfile?.active ? affordabilityProfile.minBudget : 2000));
  const [maxBudget, setMaxBudget] = useState(mode === 'buy' ? 2500000 : (affordabilityProfile?.active ? affordabilityProfile.maxBudget : 7500));
  const [selectedType, setSelectedType] = useState('All Types');
  const [minBeds, setMinBeds] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'

  // Modals & Chat Overlays
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [chatProperty, setChatProperty] = useState(null); // When user chats with seller
  const [selectedProvider, setSelectedProvider] = useState(null); // When viewing provider profile
  const [quoteProvider, setQuoteProvider] = useState(null); // When requesting quote & chatting provider
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMortgageModalOpen, setIsMortgageModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isAffordabilityModalOpen, setIsAffordabilityModalOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState([]);
  const addToast = (msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    if (!soundMuted) {
      if (type === 'success') sound.play('success');
      else if (type === 'alert') sound.play('alert');
      else sound.play('toggle');
    }
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  useEffect(() => {
    localStorage.setItem('apartments_properties_sa_v1', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('apartments_favorites_sa_v1', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('apartments_mode', mode);
    setMinBudget(mode === 'buy' ? 500000 : 2000);
    setMaxBudget(mode === 'buy' ? 2500000 : 7500);
  }, [mode]);

  const handleToggleFavorite = (propId) => {
    setFavorites((prev) => {
      const exists = prev.includes(propId);
      if (exists) {
        sound.play('click');
        addToast('Removed from saved homes', 'info');
        return prev.filter((id) => id !== propId);
      } else {
        sound.play('success');
        addToast('Added to saved homes wishlist! ❤️', 'success');
        return [...prev, propId];
      }
    });
  };

  const handlePrevCity = () => {
    const nextIdx = activeCityIndex === 0 ? CITIES.length - 1 : activeCityIndex - 1;
    setActiveCityIndex(nextIdx);
    setSearchLocation(CITIES[nextIdx]);
    sound.play('click');
  };

  const handleNextCity = () => {
    const nextIdx = (activeCityIndex + 1) % CITIES.length;
    setActiveCityIndex(nextIdx);
    setSearchLocation(CITIES[nextIdx]);
    sound.play('click');
  };

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (searchLocation && searchLocation.trim() !== '') {
          const terms = searchLocation
            .toLowerCase()
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && s !== 'gauteng' && s !== 'south africa');
          
          const primaryTerm = terms[0] || searchLocation.toLowerCase().trim();
          
          const matchLoc =
            terms.some((term) =>
              p.location.toLowerCase().includes(term) ||
              p.neighborhood.toLowerCase().includes(term) ||
              p.address.toLowerCase().includes(term) ||
              p.title.toLowerCase().includes(term) ||
              p.description.toLowerCase().includes(term) ||
              (p.landmarks && p.landmarks.some((l) => l.toLowerCase().includes(term)))
            ) ||
            p.location.toLowerCase().includes(primaryTerm) ||
            p.neighborhood.toLowerCase().includes(primaryTerm) ||
            p.address.toLowerCase().includes(primaryTerm) ||
            p.title.toLowerCase().includes(primaryTerm) ||
            p.description.toLowerCase().includes(primaryTerm) ||
            (p.landmarks && p.landmarks.some((l) => l.toLowerCase().includes(primaryTerm)));

          if (!matchLoc) return false;
        }

        if (nearMeOnly && p.distanceKm > 3.5) {
          return false;
        }

        const currentPrice = mode === 'buy' ? p.price : p.priceMonthly;
        if (minBudget && currentPrice < minBudget) return false;
        if (maxBudget && currentPrice > maxBudget) return false;

        if (selectedType !== 'All Types' && p.type !== selectedType) {
          return false;
        }

        if (minBeds > 0 && p.beds < minBeds) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = mode === 'buy' ? a.price : a.priceMonthly;
        const priceB = mode === 'buy' ? b.price : b.priceMonthly;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [properties, mode, searchLocation, nearMeOnly, minBudget, maxBudget, selectedType, minBeds, sortBy]);

  const currentCityName = searchLocation ? searchLocation.split(',')[0] : 'All Cities';

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-slate-900 selection:text-white">
      <ToastContainer toasts={toasts} />

      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        favoritesCount={favorites.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMortgageModal={() => setIsMortgageModalOpen(true)}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        addToast={addToast}
      />

      {/* Main Pages Content */}
      <main className="flex-1 w-full space-y-10 pb-28 md:pb-16">
        
        {/* PAGE 1: HOME MAINTENANCE SERVICES & QUOTES */}
        {currentPage === 'maintenance' && (
          <MaintenanceHub
            onSelectProvider={(provider) => setSelectedProvider(provider)}
            onOpenQuoteChat={(provider) => setQuoteProvider(provider)}
            addToast={addToast}
          />
        )}

        {/* PAGE 2: ABOUT US */}
        {currentPage === 'about' && (
          <AboutUsPage
            onBack={() => setCurrentPage('explore')}
          />
        )}

        {/* PAGE 3: MAIN EXPLORE & DISCOVERY (Houses / Rooms to Buy or Rent) */}
        {currentPage === 'explore' && (
          <>
            {/* Hero Section */}
            <HeroSection
              mode={mode}
              setMode={setMode}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              nearMeOnly={nearMeOnly}
              setNearMeOnly={setNearMeOnly}
              minBudget={minBudget}
              setMinBudget={setMinBudget}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              minBeds={minBeds}
              setMinBeds={setMinBeds}
              onSearchSubmit={() => {
                const el = document.getElementById('explore-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAffordabilityModal={() => setIsAffordabilityModalOpen(true)}
              onOpenMortgageModal={() => setIsMortgageModalOpen(true)}
              setCurrentPage={setCurrentPage}
              addToast={addToast}
              affordabilityProfile={affordabilityProfile}
              setAffordabilityProfile={setAffordabilityProfile}
              filteredCount={filteredProperties.length}
            />

            {/* Explore Section */}
            <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                    {affordabilityProfile?.active ? 'Homes that fit your budget ✨' : `Explore ${currentCityName}`}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
                    {affordabilityProfile?.active ? (
                      mode === 'buy'
                        ? `Based on your estimated purchase budget of R${(affordabilityProfile.minBudget / 1000).toFixed(0)}k – R${(affordabilityProfile.maxBudget / 1000).toFixed(0)}k (${filteredProperties.length} homes found)`
                        : `Based on your estimated rent range of R${affordabilityProfile.minBudget.toLocaleString()} – R${affordabilityProfile.maxBudget.toLocaleString()}/mo (${filteredProperties.length} homes & rooms found)`
                    ) : (
                      `Showing ${filteredProperties.length} ${mode === 'buy' ? 'homes for sale' : 'properties & rooms for rent'}`
                    )}
                  </p>
                </div>

                {/* City Carousel Buttons */}
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-slate-100 border border-slate-200 flex mr-2">
                    <button
                      onClick={() => { setViewMode('grid'); sound.play('click'); }}
                      className={`p-2 rounded-full transition ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setViewMode('map'); sound.play('click'); }}
                      className={`p-2 rounded-full transition ${viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                      title="Interactive Map"
                    >
                      <Map className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Personalized Affordability Advice Callout Banner */}
              {affordabilityProfile?.active && (
                <div className="p-4 sm:p-5 rounded-3xl hero-gradient border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white text-slate-900 border border-slate-200 flex items-center justify-center text-base shrink-0 shadow-2xs">
                      💡
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>Comfortable Budget Active</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          Personalized
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        We recommend staying around{' '}
                        <strong className="text-slate-950 font-bold">
                          {mode === 'buy'
                            ? `R${(affordabilityProfile.minBudget / 1000).toFixed(0)}k`
                            : `R${affordabilityProfile.target.toLocaleString()}/mo`}
                        </strong>
                        , so you have room for your other monthly expenses.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => setIsAffordabilityModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition shadow-2xs"
                    >
                      Edit Budget
                    </button>
                    <button
                      onClick={() => {
                        setAffordabilityProfile({ ...affordabilityProfile, active: false });
                        setMinBudget(0);
                        setMaxBudget(mode === 'buy' ? 4000000 : 15000);
                        sound.play('click');
                        addToast('Showing all properties without budget constraints', 'info');
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition"
                    >
                      View All
                    </button>
                  </div>
                </div>
              )}

              {/* View Mode: Map vs Grid */}
              {viewMode === 'map' ? (
                <InteractiveMap
                  properties={filteredProperties}
                  mode={mode}
                  onSelectProperty={(prop) => setSelectedProperty(prop)}
                />
              ) : (
                <div>
                  {filteredProperties.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl p-8 space-y-4 border border-slate-200">
                      <div className="text-4xl">🏡</div>
                      <h3 className="text-lg font-bold text-slate-900">No properties found matching this budget in {currentCityName}</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try expanding your comfortable budget range or switch between Tembisa and Midrand areas.
                      </p>
                      <button
                        onClick={() => {
                          setMinBudget(0);
                          setMaxBudget(mode === 'buy' ? 4000000 : 15000);
                          setAffordabilityProfile({ ...affordabilityProfile, active: false });
                          sound.play('click');
                        }}
                        className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow"
                      >
                        View All Tembisa & Midrand Properties
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          mode={mode}
                          isFavorite={favorites.includes(property.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onSelectProperty={(prop) => setSelectedProperty(prop)}
                          onChatSeller={(prop) => setChatProperty(prop)}
                          affordabilityProfile={affordabilityProfile}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

            </section>
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50/50 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Apartments</span>
            <span>•</span>
            <span>Discover Homes, Rooms & Verified Maintenance Pros in Tembisa & Midrand</span>
          </div>
          <div>All listings and verified service providers active. Offline ready.</div>
          <div>© 2026 Apartments Co. (Tembisa & Midrand). All rights reserved.</div>
        </div>
      </footer>

      {/* 1. Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          mode={mode}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenChatSeller={(prop) => setChatProperty(prop)}
          onClose={() => setSelectedProperty(null)}
          addToast={addToast}
        />
      )}

      {/* 2. Direct Chat with Property Seller Modal */}
      {chatProperty && (
        <SellerChatModal
          property={chatProperty}
          onClose={() => setChatProperty(null)}
          addToast={addToast}
        />
      )}

      {/* 3. Service Provider Profile & Portfolio Modal */}
      {selectedProvider && (
        <ProviderProfileModal
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
          onOpenQuoteChat={(prov) => setQuoteProvider(prov)}
          addToast={addToast}
        />
      )}

      {/* 4. Service Provider Issue Description, Photo Upload & Quote Chat */}
      {quoteProvider && (
        <ProviderQuoteChatModal
          provider={quoteProvider}
          onClose={() => setQuoteProvider(null)}
          addToast={addToast}
        />
      )}

      {/* 5. Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favorites}
        properties={properties}
        mode={mode}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onClearAll={() => {
          setFavorites([]);
          sound.play('click');
          addToast('Cleared all saved wishlist properties', 'info');
        }}
        addToast={addToast}
      />

      {/* 6. Standalone Mortgage Calculator Modal */}
      {isMortgageModalOpen && (
        <MortgageCalculatorModal onClose={() => setIsMortgageModalOpen(false)} />
      )}

      {/* 7. Central Messages & Active Inquiries Hub Modal */}
      {isMessagesModalOpen && (
        <MyMessagesModal
          onClose={() => setIsMessagesModalOpen(false)}
          onOpenSellerChat={(prop) => setChatProperty(prop)}
          onOpenProviderChat={(prov) => setQuoteProvider(prov)}
          properties={properties}
          providers={SERVICE_PROVIDERS}
        />
      )}

      {/* 8. Interactive Comfortable Budget / Affordability Advisor Modal */}
      <AffordabilityAdvisorModal
        isOpen={isAffordabilityModalOpen}
        onClose={() => setIsAffordabilityModalOpen(false)}
        mode={mode}
        onApplyBudget={(profile) => {
          setAffordabilityProfile(profile);
          setMinBudget(profile.minBudget);
          setMaxBudget(profile.maxBudget);
          localStorage.setItem('apartments_affordability_profile_v1', JSON.stringify(profile));
        }}
        addToast={addToast}
      />

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        favoritesCount={favorites.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMessages={() => setIsMessagesModalOpen(true)}
        unreadMessagesCount={2}
      />
    </div>
  );
}
