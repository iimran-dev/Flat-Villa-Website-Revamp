'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Heart, Phone, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const DROPDOWN_ITEMS: Record<string, { title: string; desc: string; filter?: string; targetId?: string; href?: string }[]> = {
  Buy: [
    { title: 'Luxury Villas', desc: 'Beachfront & lagoon properties', filter: 'Villa', targetId: '#investments' },
    { title: 'Modern Apartments', desc: 'Prime city center residences', filter: 'Apartment', targetId: '#investments' },
    { title: 'Penthouses', desc: 'Panoramic city & sea views', filter: 'Penthouse', targetId: '#investments' },
    { title: 'Ready to Move', desc: 'Immediate handover units', filter: 'Ready to move', targetId: '#investments' },
    { title: 'Sea View Properties', desc: 'Direct access to shorelines', filter: 'Sea view', targetId: '#investments' },
  ],
  Locations: [
    { title: 'New Cairo', desc: 'Golden Square & Fifth Settlement', filter: 'New Cairo', targetId: '#locations' },
    { title: 'North Coast', desc: 'Ras El Hekma & Marassi', filter: 'North Coast', targetId: '#locations' },
    { title: 'Red Sea', desc: 'El Gouna & Sahl Hasheesh', filter: 'Red Sea', targetId: '#locations' },
    { title: '6th of October', desc: 'Sheikh Zayed & West Cairo', filter: 'October', targetId: '#locations' },
  ],
  'Why Invest': [
    { title: 'High ROI Opportunities', desc: '12%+ expected annual returns', filter: 'Best ROI', targetId: '#about' },
    { title: 'Currency & Inflation Hedge', desc: 'Asset appreciation in prime hubs', targetId: '#about' },
    { title: 'Strategic Growth Hubs', desc: 'Government-backed megaprojects', targetId: '#about' },
    { title: 'Rental Income Yields', desc: 'High demand holiday & corporate rentals', targetId: '#about' },
  ],
  Amenities: [
    { title: 'Investor Community', desc: 'Trusted by thousands of buyers', targetId: '#amenities' },
    { title: 'Verified Highlights', desc: 'Ratings & property testimonials', targetId: '#amenities' },
    { title: 'Luxury Living', desc: 'World-class facilities & services', targetId: '#amenities' },
  ],
  Services: [
    { title: 'AI Advisory', desc: 'Smart 24/7 property matching assistant', href: '#advisor' },
    { title: 'Mobile App', desc: 'Download our iOS & Android app', targetId: '#cta' },
    { title: 'Property Evaluation', desc: 'Expert consultation & reports', targetId: '#contact' },
  ],
};

const SECTION_MAP: Record<string, string> = {
  Buy: '#investments',
  Locations: '#locations',
  'Why Invest': '#about',
  Amenities: '#amenities',
  Services: '#cta',
  Contact: '#contact',
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'EN' | 'AR'>('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { currentPage, setPage, isMobileMenuOpen, setMobileMenuOpen, toggleAdvisor, setSearchQuery } = useAppStore();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navigateToSection = (targetId: string, filter?: string) => {
    setActiveDropdown(null);
    setIsLangOpen(false);
    setMobileMenuOpen(false);

    if (filter) {
      setSearchQuery(filter);
    }

    if (currentPage !== 'home') {
      setPage('home');
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (label: string) => {
    if (label === 'Favorites') {
      navigateToSection('#investments', 'Exclusive');
    } else if (SECTION_MAP[label]) {
      navigateToSection(SECTION_MAP[label]);
    }
  };

  const handleDropdownItemClick = (item: { title: string; desc: string; filter?: string; targetId?: string; href?: string }) => {
    if (item.href === '#advisor') {
      setActiveDropdown(null);
      setIsLangOpen(false);
      setMobileMenuOpen(false);
      toggleAdvisor();
    } else if (item.targetId) {
      navigateToSection(item.targetId, item.filter);
    } else if (item.filter) {
      navigateToSection('#investments', item.filter);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseLeave={() => {
          setActiveDropdown(null);
          setIsLangOpen(false);
        }}
      >
        {/* Animated Fill Background on Scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={{
            backgroundColor: scrolled ? 'rgba(11, 19, 43, 0.95)' : 'rgba(0, 0, 0, 0)',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
            borderBottomColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
            boxShadow: scrolled ? '0 20px 40px rgba(0, 0, 0, 0.5)' : 'none',
          }}
          transition={{ duration: 0.3 }}
          style={{ borderBottomWidth: '1px' }}
        />

        <nav className="relative h-20 px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#hero');
            }}
            className="flex flex-col group relative py-1 shrink-0 cursor-pointer"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-jakarta)] text-2xl font-bold tracking-tight text-white">
                Flat
              </span>
              <span className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[#D4AF37] italic">
                &amp;
              </span>
              <span className="font-[family-name:var(--font-jakarta)] text-2xl font-bold tracking-tight text-white">
                Villa
              </span>
            </div>
            {/* Elegant gold swoosh underline under & Villa */}
            <svg
              className="absolute -bottom-1 right-0 w-24 h-2 text-[#D4AF37]"
              viewBox="0 0 100 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5 Q 50 12, 98 3"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {[
              { label: 'Locations', hasDropdown: true },
              { label: 'Buy', hasDropdown: true },
              { label: 'Why Invest', hasDropdown: true },
              { label: 'Amenities', hasDropdown: true },
              { label: 'Services', hasDropdown: true },
              { label: 'Contact', hasDropdown: false },
            ].map((link) => {
              const isOpen = activeDropdown === link.label;
              return (
                <li
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                >
                  <button
                    onClick={() => handleNavClick(link.label)}
                    className={`font-[family-name:var(--font-inter)] text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                      isOpen ? 'text-[#D4AF37]' : 'text-white/90 hover:text-[#D4AF37]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-white/60 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu Overlay */}
                  <AnimatePresence>
                    {isOpen && DROPDOWN_ITEMS[link.label] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-72 bg-[#0B132B]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-2.5 shadow-2xl text-white mt-1 z-50"
                      >
                        <div className="flex flex-col gap-1">
                          {DROPDOWN_ITEMS[link.label].map((item) => (
                            <button
                              key={item.title}
                              onClick={() => handleDropdownItemClick(item)}
                              className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 transition-colors flex flex-col gap-0.5 group cursor-pointer"
                            >
                              <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors font-[family-name:var(--font-jakarta)] flex items-center justify-between">
                                {item.title}
                                <Sparkles className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </span>
                              <span className="text-[11px] text-slate-400 font-[family-name:var(--font-inter)]">
                                {item.desc}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Right Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Dropdown Selector */}
            <div className="relative" onMouseEnter={() => setIsLangOpen(true)}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 cursor-pointer py-2 px-2"
              >
                <Globe className="w-4 h-4 text-white/80" />
                <span>{activeLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60" />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 w-32 bg-[#0B132B]/95 backdrop-blur-2xl border border-white/15 rounded-xl p-1.5 shadow-2xl text-white mt-1 z-50"
                  >
                    <button
                      onClick={() => {
                        setActiveLang('EN');
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        activeLang === 'EN' ? 'bg-[#C89B2B] text-white' : 'hover:bg-white/10 text-white/80'
                      }`}
                    >
                      English (EN)
                    </button>
                    <button
                      onClick={() => {
                        setActiveLang('AR');
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        activeLang === 'AR' ? 'bg-[#C89B2B] text-white' : 'hover:bg-white/10 text-white/80'
                      }`}
                    >
                      العربية (AR)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Favorites Heart Icon */}
            <button
              onClick={() => handleNavClick('Favorites')}
              aria-label="Favorites"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 text-white hover:text-rose-400 transition-colors" />
            </button>

            {/* Talk to Expert Golden Pill Button */}
            <button
              onClick={() => toggleAdvisor()}
              className="font-[family-name:var(--font-inter)] text-sm font-semibold text-white bg-[#C89B2B] hover:bg-[#b08722] rounded-full px-5 py-2.5 flex items-center gap-2 shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-white" />
              <span>Talk to Expert</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white/90 hover:text-[#D4AF37] transition-colors duration-200 p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute inset-0 bg-[#0B132B] flex flex-col justify-between p-6 pt-24 pb-10 overflow-y-auto"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-4 max-w-sm mx-auto w-full">
                {([
                  { label: 'Hero / Top', targetId: '#hero' },
                  { label: 'Prime Locations', targetId: '#locations' },
                  { label: 'Featured Properties', targetId: '#investments' },
                  { label: 'Why Invest in Egypt', targetId: '#about' },
                  { label: 'Amenities & Showcase', targetId: '#amenities' },
                  { label: 'Get Mobile App', targetId: '#cta' },
                  { label: 'Contact Us', targetId: '#contact' },
                ] as { label: string; targetId: string; filter?: string }[]).map((item, i) => (
                  <motion.button
                    key={item.label}
                    onClick={() => navigateToSection(item.targetId, item.filter)}
                    className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-left text-white/90 hover:text-[#D4AF37] transition-colors py-2 border-b border-slate-800/80 flex items-center justify-between cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90" />
                  </motion.button>
                ))}
              </nav>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-3 max-w-sm mx-auto w-full pt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleAdvisor();
                  }}
                  className="w-full font-[family-name:var(--font-inter)] text-sm font-semibold text-white bg-[#C89B2B] hover:bg-[#b08722] rounded-full py-3.5 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  Talk to Expert
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
