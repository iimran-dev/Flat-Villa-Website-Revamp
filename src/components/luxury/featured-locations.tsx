'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

const LOCATIONS_DATA = [
  {
    id: 'loc-1',
    city: 'New Cairo',
    projectsCount: '450+ Projects',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  },
  {
    id: 'loc-2',
    city: 'North Coast',
    projectsCount: '320+ Projects',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
  {
    id: 'loc-3',
    city: 'Ain Sokhna',
    projectsCount: '210+ Projects',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  },
  {
    id: 'loc-4',
    city: 'Hurghada',
    projectsCount: '180+ Projects',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  },
  {
    id: 'loc-5',
    city: '6th of October',
    projectsCount: '240+ Projects',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 'loc-6',
    city: 'Sheikh Zayed',
    projectsCount: '300+ Projects',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
];

export function FeaturedLocations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-40px' });
  const { setSearchQuery, setPage } = useAppStore();

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleLocationSelect = (cityName: string) => {
    setSearchQuery(cityName);
    setPage('listing');
  };

  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16" id="locations">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
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
              EXPLORE TOP AREAS
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)] tracking-tight"
            >
              Find Your Ideal Location
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="mt-1 text-slate-500 font-[family-name:var(--font-inter)] text-xs sm:text-sm"
            >
              Explore Egypt&apos;s most promising real estate destinations
            </motion.p>
          </div>

          {/* Arrow Navigation Controls */}
          <motion.div variants={fadeUp} className="flex items-center gap-2.5 shrink-0 self-end">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous locations"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-400 flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next locations"
              className="w-9 h-9 rounded-full bg-[#C89B2B] hover:bg-[#b08722] text-white flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer hover:scale-105"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* 6 Location Cards Grid (Fits in a single row on large desktops, scrollable on smaller screens) */}
        <div
          ref={scrollContainerRef}
          className="grid grid-flow-col auto-cols-[minmax(180px,1fr)] lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {LOCATIONS_DATA.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
              onClick={() => handleLocationSelect(location.city)}
              className="group relative h-[240px] sm:h-[270px] md:h-[290px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/40"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${location.image})` }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Gold Border Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-[#D4AF37]" />

              {/* Card Label Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 text-white">
                <h3 className="text-base sm:text-lg font-bold font-[family-name:var(--font-jakarta)] leading-tight text-white drop-shadow">
                  {location.city}
                </h3>
                <p className="text-xs text-white/75 font-[family-name:var(--font-inter)] mt-0.5 font-medium">
                  {location.projectsCount}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
