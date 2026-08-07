'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Swan Lake Residences',
    location: 'New Cairo',
    price: 'EGP 8.2M',
    roi: '12%',
    badge: 'New Launch',
    badgeStyle: 'bg-rose-500 text-white',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
  },
  {
    id: 'rec-2',
    title: 'LVLS North Coast',
    location: 'North Coast',
    price: 'EGP 9.5M',
    roi: '15%',
    badge: 'Best Seller',
    badgeStyle: 'bg-amber-500 text-white',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  },
  {
    id: 'rec-3',
    title: 'Mountain View iCity',
    location: 'New Cairo',
    price: 'EGP 7.1M',
    roi: '17%',
    badge: 'Ready to Move',
    badgeStyle: 'bg-emerald-500 text-white',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
];

const MAP_PINS = [
  { id: 'pin-north-coast', label: 'North Coast', count: '320+ Projects', top: '28%', left: '55%' },
  { id: 'pin-new-cairo', label: 'New Cairo', count: '450+ Projects', top: '42%', left: '72%' },
  { id: 'pin-october', label: '6th of October', count: '240+ Projects', top: '50%', left: '62%' },
  { id: 'pin-sokhna', label: 'Ain Sokhna', count: '210+ Projects', top: '58%', left: '80%' },
  { id: 'pin-hurghada', label: 'Hurghada', count: '180+ Projects', top: '78%', left: '78%' },
];

export function AIProperties() {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-40px' });
  const { setPage, selectProperty, setSearchQuery } = useAppStore();

  const handleCardClick = (id: string) => {
    selectProperty('prop-1');
    setPage('detail');
  };

  const handlePinClick = (pinLabel: string) => {
    setSelectedPin(pinLabel);
    setSearchQuery(pinLabel);
  };

  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16" id="investments">
      <div className="max-w-[1400px] mx-auto">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: AI-Powered Recommendations */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={isHeaderInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)] tracking-tight">
                AI-Powered Recommendations
              </h2>
              <p className="mt-1 text-slate-500 text-xs sm:text-sm font-[family-name:var(--font-inter)]">
                Personalized properties based on your preferences
              </p>

              {/* Recommendation Cards Stack */}
              <div className="mt-5 flex flex-col gap-3.5">
                {RECOMMENDATIONS.map((rec) => (
                  <motion.div
                    key={rec.id}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleCardClick(rec.id)}
                    className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3.5 cursor-pointer group"
                  >
                    {/* Thumbnail & Top Badge */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs ${rec.badgeStyle}`}
                      >
                        {rec.badge}
                      </span>
                    </div>

                    {/* Property Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base font-[family-name:var(--font-jakarta)] truncate group-hover:text-[#C89B2B] transition-colors">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-[family-name:var(--font-inter)] mt-0.5">
                        {rec.location}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-[family-name:var(--font-inter)] leading-none mb-1">
                            Starting from
                          </span>
                          <span className="text-sm font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                            {rec.price}
                          </span>
                        </div>

                        {/* ROI Badge */}
                        <div className="bg-emerald-50 border border-emerald-200/70 text-emerald-600 font-extrabold text-xs px-2.5 py-1 rounded-lg">
                          {rec.roi}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* View All Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setPage('listing')}
              className="mt-5 w-full text-center py-3 border border-[#C89B2B]/40 hover:border-[#C89B2B] text-[#C89B2B] hover:bg-[#C89B2B]/5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-[family-name:var(--font-inter)]"
            >
              View All Recommendations
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Right Column: Satellite Map View */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] shadow-2xl border border-slate-800 bg-slate-950 flex flex-col"
          >
            {/* Satellite Map Background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
              style={{ backgroundImage: 'url(/egypt_map.png)' }}
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

            {/* Map / List View Toggle Switch */}
            <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20 flex items-center gap-1">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'map'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'list'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                List
              </button>
            </div>

            {/* Interactive Map Pins */}
            <AnimatePresence>
              {MAP_PINS.map((pin) => {
                const isSelected = selectedPin === pin.label;
                return (
                  <motion.div
                    key={pin.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{ top: pin.top, left: pin.left }}
                    onClick={() => handlePinClick(pin.label)}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                      isSelected ? 'z-30' : ''
                    }`}
                  >
                    <div
                      className={`bg-black/80 backdrop-blur-md border ${
                        isSelected
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105'
                          : 'border-[#D4AF37]/50 hover:border-[#D4AF37]'
                      } rounded-full px-3 py-1.5 flex items-center gap-2 shadow-xl transition-all duration-300 group`}
                    >
                      <div className="p-1 rounded-full bg-[#C89B2B] text-white flex items-center justify-center shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left whitespace-nowrap pr-1">
                        <div className="text-xs font-bold text-white font-[family-name:var(--font-jakarta)] leading-tight">
                          {pin.label}
                        </div>
                        <div className="text-[10px] text-[#D4AF37] font-[family-name:var(--font-inter)] font-semibold">
                          {pin.count}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
