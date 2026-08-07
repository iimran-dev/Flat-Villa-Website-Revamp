'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  ChevronRight,
  Headphones,
  Building2,
  Building,
  MapPin,
  Users,
  Tag,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getAssetPath } from '@/lib/utils';

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

const QUICK_FILTERS = [
  { label: 'Sea view', icon: '🌊' },
  { label: 'New Cairo', icon: '📍' },
  { label: '8M Budget', icon: '🏷️' },
  { label: 'Ready to move', icon: '🏠' },
  { label: 'Best ROI', icon: '📈' },
];

const STATS = [
  { icon: Building2, value: '2,000+', label: 'Projects' },
  { icon: Building, value: '150+', label: 'Developers' },
  { icon: MapPin, value: '18', label: 'Cities' },
  { icon: Users, value: '10K+', label: 'Happy Investors' },
];

export function Hero() {
  const { toggleAdvisor, searchQuery, setSearchQuery, setPage } = useAppStore();

  const handleFilterClick = (filterLabel: string) => {
    setSearchQuery(filterLabel);
    setPage('listing');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setPage('listing');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-12 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col justify-between overflow-hidden bg-[#0F172A]">
      {/* Background Image with Dark Vignette Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${getAssetPath('/hero_bg.png')})`,
        }}
      >
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 my-auto flex flex-col justify-center pt-8 md:pt-12">
        <motion.div
          className="max-w-4xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Subheader / Tagline */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37] font-[family-name:var(--font-inter)] drop-shadow">
              Egypt&apos;s Most Trusted Property Platform
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-[family-name:var(--font-jakarta)] leading-[1.1]"
          >
            Your Perfect <br />
            Investment Awaits
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/90 font-[family-name:var(--font-inter)] leading-relaxed drop-shadow"
          >
            Discover premium properties, high ROI opportunities <br className="hidden sm:inline" />
            and the future of real estate in Egypt.
          </motion.p>
        </motion.div>

        {/* Floating AI Search Bar Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 sm:mt-12 max-w-4xl w-full"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-white/60">
            {/* Search Input Row */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 sm:gap-3">
              {/* AI Search Badge */}
              <div className="bg-[#FFF8E7] text-[#B8860B] border border-[#F5E6BA] rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0 shadow-xs">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-[family-name:var(--font-inter)]">AI Search</span>
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe what you're looking for..."
                className="flex-1 bg-transparent px-2 sm:px-3 py-2 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none font-[family-name:var(--font-inter)] font-normal"
              />

              {/* Search Submit Button */}
              <button
                type="submit"
                aria-label="Search"
                className="bg-[#C89B2B] hover:bg-[#b08722] text-white p-3.5 sm:p-4 rounded-full shadow-md transition-all duration-200 hover:scale-105 shrink-0 flex items-center justify-center cursor-pointer"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            {/* Quick Filter Tag Chips Row (Scrollable on small mobile screens) */}
            <div className="mt-3 sm:mt-4 pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {QUICK_FILTERS.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => handleFilterClick(filter.label)}
                  className="bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 hover:text-slate-900 border border-slate-200/60 rounded-full px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0"
                >
                  <span className="text-xs">{filter.icon}</span>
                  <span className="font-[family-name:var(--font-inter)] whitespace-nowrap">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Floating Stats & AI Property Advisor Card Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-7xl mx-auto pt-4"
      >
        {/* Left Side: Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full md:w-auto">
          {STATS.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-[#D4AF37] shrink-0">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-jakarta)] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-[family-name:var(--font-inter)] mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: AI Property Advisor Help Floating Card */}
        <button
          onClick={() => toggleAdvisor()}
          className="bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-2xl p-3 px-5 flex items-center gap-4 transition-all duration-300 group shadow-2xl w-full sm:w-auto justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#C89B2B]/20 text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white font-[family-name:var(--font-jakarta)]">
                Need help?
              </div>
              <div className="text-xs text-white/70 font-[family-name:var(--font-inter)]">
                Talk to our AI Property Advisor
              </div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
        </button>
      </motion.div>
    </section>
  );
}
