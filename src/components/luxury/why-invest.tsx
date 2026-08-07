'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Calculator,
  GitCompare,
  CreditCard,
  TrendingUp,
  Box,
  Headphones,
  Bed,
  Maximize,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const FEATURED_PROJECTS = [
  {
    id: 'proj-1',
    name: 'BLOOMFIELDS',
    location: 'Mostakbal City',
    startingPrice: 'EGP 5.8M',
    bedrooms: '2-4',
    area: '120-240m²',
    badge: 'New Launch',
    badgeStyle: 'bg-[#1E293B] text-white',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 'proj-2',
    name: 'SALT.',
    location: 'North Coast',
    startingPrice: 'EGP 9.3M',
    bedrooms: '3-5',
    area: '160-300m²',
    badge: 'Exclusive',
    badgeStyle: 'bg-[#C89B2B] text-white',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    id: 'proj-3',
    name: 'IL BOSCO CITY',
    location: 'New Capital',
    startingPrice: 'EGP 7.9M',
    bedrooms: '2-4',
    area: '130-250m²',
    badge: 'Limited Units',
    badgeStyle: 'bg-[#334155] text-white',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 'proj-4',
    name: 'WEST OAKS',
    location: '6th of October',
    startingPrice: 'EGP 9.2M',
    bedrooms: '2-4',
    area: '120-220m²',
    badge: 'Best ROI',
    badgeStyle: 'bg-emerald-500 text-white',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
];

const PLATFORM_FEATURES = [
  {
    id: 'feat-calc',
    icon: Calculator,
    title: 'Investment Calculator',
    subtitle: 'Calculate ROI & returns',
    action: 'calculator',
  },
  {
    id: 'feat-compare',
    icon: GitCompare,
    title: 'Compare Projects',
    subtitle: 'Side by side comparison',
    action: 'compare',
  },
  {
    id: 'feat-payment',
    icon: CreditCard,
    title: 'Payment Plans',
    subtitle: 'Flexible payment options',
    action: 'plans',
  },
  {
    id: 'feat-insights',
    icon: TrendingUp,
    title: 'Market Insights',
    subtitle: 'Real-time market trends',
    action: 'insights',
  },
  {
    id: 'feat-vr',
    icon: Box,
    title: 'VR Tours',
    subtitle: 'Immersive property tours',
    action: 'vr',
  },
  {
    id: 'feat-advisor',
    icon: Headphones,
    title: 'AI Property Advisor',
    subtitle: '24/7 Smart assistance',
    action: 'advisor',
  },
];

export function WhyInvest() {
  const [activeDot, setActiveDot] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-40px' });
  const { setPage, selectProperty, toggleAdvisor } = useAppStore();

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFeatureClick = (action: string) => {
    if (action === 'advisor') {
      toggleAdvisor();
    } else if (action === 'calculator') {
      const el = document.querySelector('#calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPage('listing');
    }
  };

  return (
    <div id="about" className="bg-[#FAF9F6] overflow-hidden">
      {/* ── TOP SECTION: Handpicked Investment Opportunities ── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Row */}
          <motion.div
            ref={headerRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isHeaderInView ? 'visible' : 'hidden'}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
          >
            <div>
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C89B2B] font-[family-name:var(--font-inter)] mb-1"
              >
                FEATURED PROJECTS
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)] tracking-tight"
              >
                Handpicked Investment Opportunities
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="mt-1 text-slate-500 font-[family-name:var(--font-inter)] text-xs sm:text-sm"
              >
                Carefully selected projects with high ROI and growth potential
              </motion.p>
            </div>

            {/* View All Projects Button */}
            <motion.button
              variants={fadeUp}
              onClick={() => setPage('listing')}
              className="px-5 py-2.5 rounded-full border border-[#C89B2B]/40 hover:border-[#C89B2B] text-[#C89B2B] hover:bg-[#C89B2B]/5 font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 self-start sm:self-end cursor-pointer font-[family-name:var(--font-inter)]"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {FEATURED_PROJECTS.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  selectProperty('prop-1');
                  setPage('detail');
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/60 cursor-pointer group flex flex-col"
              >
                {/* Top Image Section with Overlay Info */}
                <div className="relative h-[220px] sm:h-[240px] overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dark Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Badge top-left */}
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${proj.badgeStyle}`}
                  >
                    {proj.badge}
                  </span>

                  {/* Glass Button top-right */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                    ⊹
                  </div>

                  {/* Content Overlaid at Bottom of Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold tracking-wider font-[family-name:var(--font-jakarta)] leading-tight text-white drop-shadow">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-white/80 font-[family-name:var(--font-inter)] mt-0.5">
                        {proj.location}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-white/70 block font-[family-name:var(--font-inter)] leading-none mb-0.5">
                        Starting from
                      </span>
                      <span className="text-sm font-extrabold text-white font-[family-name:var(--font-jakarta)]">
                        {proj.startingPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom White Spec Bar */}
                <div className="p-3.5 px-4 bg-white flex items-center justify-between border-t border-slate-100 text-slate-600 text-xs font-[family-name:var(--font-inter)]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-slate-400" />
                      <span>{proj.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-slate-400" />
                      <span>{proj.area}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(proj.id, e)}
                    aria-label="Add to favorites"
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites[proj.id] ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[0, 1, 2, 3, 4].map((dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setActiveDot(dotIndex)}
                aria-label={`Go to slide ${dotIndex + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeDot === dotIndex
                    ? 'w-3.5 h-3.5 bg-[#C89B2B]'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM SECTION: Everything You Need in One Place ── */}
      <section className="bg-[#0B132B] text-white py-14 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[family-name:var(--font-jakarta)] tracking-tight text-white">
              Everything You Need in One Place
            </h2>
          </div>

          {/* 6 Dark Glass Feature Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {PLATFORM_FEATURES.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  onClick={() => handleFeatureClick(feat.action)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px]"
                >
                  {/* Icon */}
                  <div className="mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm sm:text-base font-[family-name:var(--font-jakarta)] text-white leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {feat.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-[11px] sm:text-xs text-slate-400 font-[family-name:var(--font-inter)] mt-1 line-clamp-2">
                    {feat.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
