'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Globe, Zap, TrendingUp } from 'lucide-react';
import { WHY_INVEST_POINTS } from '@/lib/data';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const HIGHLIGHTS = [
  {
    icon: TrendingUp,
    title: '22%+ Avg. Appreciation',
    desc: 'Properties in the New Capital are appreciating faster than any other market in the MENA region.',
  },
  {
    icon: ShieldCheck,
    title: 'Government-Backed Growth',
    desc: '$58B in infrastructure investment creating guaranteed demand for premium properties.',
  },
  {
    icon: Globe,
    title: '15M+ Annual Tourists',
    desc: 'Record-breaking tourism driving unprecedented short-term rental yields and occupancy rates.',
  },
  {
    icon: Zap,
    title: 'AI-Verified Opportunities',
    desc: 'Every listing scored by our AI engine analyzing 50+ data points for maximum confidence.',
  },
];

export function WhyInvest() {
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-40px' });
  const isHighlightsInView = useInView(highlightsRef, { once: true, margin: '-40px' });

  return (
    <section id="about" className="bg-navy section-luxury overflow-hidden">
      {/* ── Header ── */}
      <motion.div
        ref={headerRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
        className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 mb-16"
      >
        <motion.span
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4"
        >
          Why Egypt
        </motion.span>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-[family-name:var(--font-jakarta)] font-bold text-white"
        >
          A Market on the{' '}
          <span className="text-gold-gradient">Rise</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-4 max-w-2xl text-white/50 text-lg font-[family-name:var(--font-inter)]"
        >
          Egypt's real estate market is undergoing a historic transformation.
          Here's why the world's smartest investors are paying attention.
        </motion.p>
      </motion.div>

      {/* ── Timeline ── */}
      <motion.div
        ref={timelineRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isTimelineInView ? 'visible' : 'hidden'}
        className="mx-auto max-w-3xl px-6 md:px-12 lg:px-20 mb-20"
      >
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/60 via-gold/30 to-transparent" />

          {WHY_INVEST_POINTS.map((point, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={point.year}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 md:w-1/2 ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  } pl-12 md:pl-0`}
                >
                  <span className="text-gold-gradient font-[family-name:var(--font-jakarta)] text-sm font-bold">
                    {point.year}
                  </span>
                  <h3 className="mt-1 text-lg font-[family-name:var(--font-jakarta)] font-semibold text-white">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)]">
                    {point.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1">
                  <div className="gold-glow flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold/40 bg-navy">
                    <div className="h-3 w-3 rounded-full bg-gold" />
                  </div>
                </div>

                {/* Spacer for the other side on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Highlight cards ── */}
      <motion.div
        ref={highlightsRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isHighlightsInView ? 'visible' : 'hidden'}
        className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((h) => (
            <motion.div
              key={h.title}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="group rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/[0.08] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.05)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                <h.icon className="h-5 w-5" />
              </div>
              <h4 className="text-base font-[family-name:var(--font-jakarta)] font-semibold text-white">
                {h.title}
              </h4>
              <p className="mt-2 text-sm text-white/40 leading-relaxed font-[family-name:var(--font-inter)]">
                {h.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
