'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Sparkles, ChevronDown } from 'lucide-react';
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

const floatingDots: Array<{ top?: string; left?: string; right?: string; bottom?: string; size: number; delay: number }> = [
  { top: '15%', left: '10%', size: 4, delay: 0 },
  { top: '25%', right: '12%', size: 3, delay: 1.5 },
  { bottom: '30%', left: '8%', size: 5, delay: 0.8 },
  { top: '60%', right: '8%', size: 3, delay: 2.2 },
];

export function Hero() {
  const { setPage, toggleAdvisor } = useAppStore();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      {/* Animated gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            'linear-gradient(135deg, #0F172A 0%, #1a1a3e 25%, #111827 50%, #0d1f2d 75%, #0F172A 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 8s ease infinite',
        }}
      />

      <style>{`
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Floating gold particles */}
      {floatingDots.map((dot, i) => (
        <span
          key={i}
          className="float absolute rounded-full bg-[#D4AF37]"
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            bottom: dot.bottom,
            width: dot.size,
            height: dot.size,
            opacity: 0.15 + i * 0.05,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Gold label pill */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="gold-glow inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Investment Platform
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-8 text-4xl font-light leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl font-[family-name:var(--font-jakarta)]"
          >
            Your{' '}
            <span className="text-gold-gradient">Perfect</span>
            {' '}Investment Awaits
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl font-[family-name:var(--font-inter)]"
          >
            Premium investment opportunities with exceptional ROI powered by AI.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => setPage('listing')}
              className="btn-luxury group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#0F172A] transition-all duration-300 hover:bg-[#e0be4a] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Explore Investments
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => toggleAdvisor()}
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              <Bot className="h-4 w-4" />
              Talk to AI Advisor
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-white/40">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-white/40" />
        </motion.div>
      </div>
    </section>
  );
}
