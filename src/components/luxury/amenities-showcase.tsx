'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Quote } from 'lucide-react';

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
];

export function AmenitiesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' });

  return (
    <section id="amenities" ref={sectionRef} className="bg-white py-14 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* ── COLUMN 1: Trusted by Thousands of Happy Investors ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)] leading-tight tracking-tight">
                Trusted by Thousands of <br />
                Happy Investors
              </h2>
              <p className="mt-2 text-slate-500 text-xs sm:text-sm font-[family-name:var(--font-inter)]">
                Join a growing community of smart property investors
              </p>

              {/* Avatar Stack */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                  {AVATARS.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="User avatar"
                      className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 font-[family-name:var(--font-inter)]">
                  10,000+ Investors
                </span>
              </div>
            </div>

            {/* Google & Facebook Rating Pill Cards */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* Google Reviews Card */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="text-xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                  4.9<span className="text-xs font-normal text-slate-400">/5</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 font-[family-name:var(--font-inter)]">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google Reviews</span>
                </div>
              </div>

              {/* Facebook Reviews Card */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="text-xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                  4.8<span className="text-xs font-normal text-slate-400">/5</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 font-[family-name:var(--font-inter)]">
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook Reviews</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── COLUMN 2: Testimonial Card 1 ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-6 h-6 text-[#C89B2B] fill-[#C89B2B]/20 mb-3" />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                Flat &amp; Villa helped me find the perfect investment with amazing ROI. Their AI recommendations were spot on!
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                alt="Ahmed R."
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm font-[family-name:var(--font-jakarta)] leading-tight">
                  Ahmed R.
                </h4>
                <p className="text-xs text-slate-400 font-[family-name:var(--font-inter)]">
                  Investor
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── COLUMN 3: Testimonial Card 2 ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-6 h-6 text-[#C89B2B] fill-[#C89B2B]/20 mb-3" />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                The platform is so easy to use and the insights are incredibly valuable for making informed decisions.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                alt="Nouran S."
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm font-[family-name:var(--font-jakarta)] leading-tight">
                  Nouran S.
                </h4>
                <p className="text-xs text-slate-400 font-[family-name:var(--font-inter)]">
                  Property Buyer
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── COLUMN 4: #1 Award Dark Card ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 bg-[#18181B] text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-slate-800 relative overflow-hidden"
          >
            {/* Crown Icon */}
            <div>
              <Crown className="w-7 h-7 text-[#D4AF37] fill-[#D4AF37]/20 mb-4" />
              <div className="text-5xl font-extrabold text-[#D4AF37] font-[family-name:var(--font-jakarta)] tracking-tight">
                #1
              </div>
              <h3 className="mt-3 text-sm sm:text-base font-bold text-white leading-snug font-[family-name:var(--font-jakarta)]">
                Real Estate Platform <br />
                in Egypt
              </h3>
            </div>

            <div className="mt-8 text-[11px] text-[#D4AF37]/80 font-medium font-[family-name:var(--font-inter)] tracking-wide">
              2024 Property Awards
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
