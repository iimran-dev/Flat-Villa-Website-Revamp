'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Apple, Smartphone } from 'lucide-react';

const awards = [
  '#1 Investment Platform',
  '150+ Developer Partners',
  '12 Excellence Awards',
  '8+ Years of Experience',
];

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
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

export function AppCTA() {
  const awardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const isAwardsInView = useInView(awardsRef, { once: true, margin: '-50px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* ===== Awards Sub-section ===== */}
      <div className="bg-navy py-16 px-6 md:px-12">
        <motion.div
          ref={awardsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isAwardsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {awards.map((award, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-[family-name:var(--font-jakarta)] font-bold text-gold-gradient">
                {award.split(' ')[0]}
              </p>
              <p className="text-xs uppercase tracking-wider text-white/50 mt-2">
                {award
                  .split(' ')
                  .slice(1)
                  .join(' ')}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ===== App CTA Sub-section ===== */}
      <section
        ref={ctaRef}
        className="bg-gradient-to-br from-[#0F172A] to-[#111827] section-luxury"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isCtaInView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto px-6 md:px-12"
        >
          {/* Left column */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="flex-1">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-jakarta)] font-bold text-white">
              Invest Smarter on the Go
            </h2>
            <p className="mt-4 text-white/60 font-[family-name:var(--font-inter)] max-w-md leading-relaxed">
              Access your investment portfolio, receive AI-powered insights, and
              explore exclusive properties — all from your pocket.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="glass-dark rounded-xl px-6 py-3 flex items-center gap-3 hover:border-gold/30 transition-colors duration-300">
                <Apple className="w-5 h-5 text-white" />
                <div className="text-left">
                  <span className="block text-[10px] text-white/50 leading-none">
                    Download on the
                  </span>
                  <span className="block text-sm font-semibold text-white leading-tight">
                    App Store
                  </span>
                </div>
              </button>

              <button className="glass-dark rounded-xl px-6 py-3 flex items-center gap-3 hover:border-gold/30 transition-colors duration-300">
                <Smartphone className="w-5 h-5 text-white" />
                <div className="text-left">
                  <span className="block text-[10px] text-white/50 leading-none">
                    Get it on
                  </span>
                  <span className="block text-sm font-semibold text-white leading-tight">
                    Google Play
                  </span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right column – phone mockup */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="shrink-0"
          >
            <div className="relative">
              <div className="rounded-[2.5rem] w-64 h-[500px] bg-gradient-to-b from-gold/20 to-navy-deep border-2 border-white/10 gold-glow shimmer flex flex-col overflow-hidden">
                {/* Status bar mock */}
                <div className="flex justify-between items-center px-6 pt-4 pb-2">
                  <div className="w-10 h-1.5 rounded-full bg-white/20" />
                  <div className="w-6 h-1.5 rounded-full bg-white/15" />
                </div>

                {/* Mini property card */}
                <div className="mx-4 mt-3 rounded-2xl bg-white/10 border border-white/10 overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-gold/30 to-gold/5" />
                  <div className="p-3">
                    <div className="w-3/4 h-2 rounded-full bg-white/30 mb-2" />
                    <div className="w-1/2 h-2 rounded-full bg-white/15 mb-3" />
                    <div className="flex justify-between">
                      <div className="w-16 h-5 rounded-lg bg-gold/30" />
                      <div className="w-12 h-5 rounded-lg bg-white/10" />
                    </div>
                  </div>
                </div>

                {/* Skeleton text lines */}
                <div className="px-4 mt-4 space-y-3 flex-1">
                  <div className="w-full h-2 rounded-full bg-white/10" />
                  <div className="w-5/6 h-2 rounded-full bg-white/10" />
                  <div className="w-3/4 h-2 rounded-full bg-white/10" />
                  <div className="w-2/3 h-2 rounded-full bg-white/8" />
                  <div className="w-4/5 h-2 rounded-full bg-white/8" />
                </div>

                {/* Bottom nav bar */}
                <div className="mt-auto px-4 pb-6 pt-3">
                  <div className="h-10 rounded-2xl bg-gold/40" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
