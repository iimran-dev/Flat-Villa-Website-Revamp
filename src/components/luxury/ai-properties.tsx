'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, GitCompareArrows, Share2, Calendar, TrendingUp, Percent } from 'lucide-react';
import { PROPERTIES } from '@/lib/data';
import { useAppStore } from '@/lib/store';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

function getBadgeStyle(badge?: string) {
  switch (badge) {
    case 'Exclusive':
      return 'bg-gold/90 text-navy';
    case 'Best ROI':
      return 'bg-success/90 text-white';
    case 'Hot Deal':
      return 'bg-danger/90 text-white';
    case 'New Launch':
      return 'bg-navy/90 text-white';
    default:
      return 'bg-navy/80 text-white';
  }
}

export function AIProperties() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });
  const isGridInView = useInView(gridRef, { once: true, margin: '-40px' });

  return (
    <section className="bg-white section-luxury" id="investments">
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
          AI Recommended
        </motion.span>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-[family-name:var(--font-jakarta)] font-bold text-navy"
        >
          Curated for Your Portfolio
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-4 max-w-2xl text-muted-foreground text-lg font-[family-name:var(--font-inter)]"
        >
          Our AI analyzes thousands of data points to surface the highest-conviction investment opportunities tailored to your goals.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <motion.div
        ref={gridRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isGridInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-12 lg:px-20"
      >
        {PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </motion.div>
    </section>
  );
}

function PropertyCard({ property }: { property: (typeof PROPERTIES)[number] }) {
  const selectProperty = useAppStore((s) => s.selectProperty);

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className="luxury-card luxury-card-gold rounded-3xl overflow-hidden cursor-pointer group"
      onClick={() => selectProperty(property.id)}
    >
      {/* Image container */}
      <div className="h-56 relative overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Badge - top left */}
        {property.badge && (
          <span
            className={`absolute top-3 left-3 z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(property.badge)}`}
          >
            {property.badge}
          </span>
        )}

        {/* AI Match % badge - top right */}
        <span className="absolute top-3 right-3 z-10 glass rounded-full px-3 py-1 text-xs font-bold text-gold">
          {property.aiMatch}% AI Match
        </span>

        {/* Action buttons overlay on hover */}
        <div className="absolute top-3 right-16 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/90 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="h-3.5 w-3.5 text-navy" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/90 transition-colors"
            aria-label="Compare"
          >
            <GitCompareArrows className="h-3.5 w-3.5 text-navy" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/90 transition-colors"
            aria-label="Share"
          >
            <Share2 className="h-3.5 w-3.5 text-navy" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-[family-name:var(--font-jakarta)] font-semibold text-navy leading-tight">
          {property.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-inter)]">
          {property.developer}
        </p>
        <p className="text-xl font-bold text-navy mt-3 font-[family-name:var(--font-jakarta)]">
          {property.priceLabel}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-gold" />
            <span className="text-gold font-semibold">{property.expectedROI}% ROI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Percent className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{property.rentalYield}% Yield</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{property.completionDate}</span>
          </div>
        </div>

        {/* Investment Score bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Investment Score
            </span>
            <span className="text-xs font-bold text-gold">
              {property.investmentScore}/100
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
            <div
              className="h-full rounded-full bg-gold transition-all duration-1000 ease-out"
              style={{ width: `${property.investmentScore}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
