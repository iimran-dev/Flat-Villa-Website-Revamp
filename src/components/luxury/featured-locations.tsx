'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, TrendingUp, Building2 } from 'lucide-react';
import { LOCATIONS } from '@/lib/data';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export function FeaturedLocations() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-surface section-luxury" id="locations">
      {/* Header */}
      <motion.div
        ref={headerRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
        className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-12"
      >
        <motion.span
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4"
        >
          Featured Locations
        </motion.span>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-[family-name:var(--font-jakarta)] font-bold text-navy"
        >
          Invest in Prime Destinations
        </motion.h2>
      </motion.div>

      {/* Horizontal scroll */}
      <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 md:px-12 lg:px-20 pb-4">
        {LOCATIONS.map((location, index) => (
          <LocationCard key={location.id} location={location} index={index} />
        ))}
      </div>
    </section>
  );
}

function LocationCard({
  location,
  index,
}: {
  location: (typeof LOCATIONS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative min-w-[320px] md:min-w-[400px] rounded-3xl overflow-hidden h-[420px] md:h-[480px] cursor-pointer shrink-0"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        style={{ backgroundImage: `url(${location.image})` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Gold border glow on hover */}
      <div className="absolute inset-0 rounded-3xl border border-transparent transition-all duration-500 group-hover:border-[rgba(212,175,55,0.3)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]" />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-gold" />
          <span className="text-white/60 text-sm font-[family-name:var(--font-inter)]">
            {location.country}
          </span>
        </div>

        <h3 className="text-2xl font-[family-name:var(--font-jakarta)] font-semibold text-white mb-4">
          {location.city}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-white/50" />
            <span className="text-white/80">
              {location.projectsCount} Projects
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-gold" />
            <span className="text-gold font-semibold">
              {location.averageROI}% ROI
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-white/50" />
            <span className="text-white/80">
              +{location.appreciationForecast}% Forecast
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
