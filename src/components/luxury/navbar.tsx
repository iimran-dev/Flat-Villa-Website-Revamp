'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Diamond } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';
import { useAppStore } from '@/lib/store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 20
  );
  const { isMobileMenuOpen, setMobileMenuOpen, toggleAdvisor } = useAppStore();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const handleNavClick = (href: string) => {
    if (href === '#advisor') {
      toggleAdvisor();
    } else if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: scrolled ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="w-full h-full glass-navy" />
        </motion.div>

        <nav className="relative h-20 px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <Diamond
              className="w-5 h-5 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-12"
              strokeWidth={1.5}
            />
            <span className="font-[family-name:var(--font-jakarta)] text-xl font-bold tracking-wider text-gold-gradient">
              AURUM
            </span>
          </a>

          {/* Center Navigation - Desktop */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-widest uppercase text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300 px-4 py-2">
              List Property
            </button>
            <button className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-wide text-white/90 border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full px-5 py-2 transition-all duration-300">
              Sign In
            </button>
            <button className="btn-luxury font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-wide text-[#0F172A] bg-[#D4AF37] rounded-full px-6 py-2.5">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white/80 hover:text-[#D4AF37] transition-colors duration-300 p-2"
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute inset-0 bg-[#0F172A] flex flex-col items-center justify-center gap-8"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Mobile Nav Links */}
              <nav className="flex flex-col items-center gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold tracking-wide text-white/80 hover:text-[#D4AF37] transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                className="flex flex-col items-center gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + NAV_LINKS.length * 0.07,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button className="font-[family-name:var(--font-inter)] text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300 py-2">
                  List Property
                </button>
                <button className="font-[family-name:var(--font-inter)] text-sm font-medium tracking-wide text-white/90 border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full px-8 py-2.5 transition-all duration-300">
                  Sign In
                </button>
                <button className="btn-luxury font-[family-name:var(--font-inter)] text-sm font-semibold tracking-wide text-[#0F172A] bg-[#D4AF37] rounded-full px-10 py-3 mt-2">
                  Get Started
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
