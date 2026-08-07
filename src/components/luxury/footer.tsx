'use client';

import { Diamond, Mail, Phone, MapPin } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';
import { useAppStore } from '@/lib/store';

const FOOTER_SECTIONS = [
  {
    title: 'Platform',
    links: [
      { label: 'Browse Properties', href: '#investments' },
      { label: 'Locations', href: '#locations' },
      { label: 'AI Advisor', href: '#advisor', action: true },
      { label: 'Calculator', href: '#calculator' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Market Reports', href: '#' },
      { label: 'Investment Guide', href: '#' },
      { label: 'Developer Directory', href: '#' },
      { label: 'ROI Benchmark', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About AURUM', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
];

export function Footer() {
  const toggleAdvisor = useAppStore((s) => s.toggleAdvisor);

  function handleLinkClick(href: string, action?: boolean) {
    if (action || href === '#advisor') {
      toggleAdvisor();
      return;
    }
    if (href.startsWith('#') && href.length > 1) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <footer className="relative bg-[#0B1120] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* ── Brand column ── */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 group"
            >
              <Diamond
                className="h-5 w-5 text-gold transition-transform duration-500 group-hover:rotate-12"
                strokeWidth={1.5}
              />
              <span className="font-[family-name:var(--font-jakarta)] text-xl font-bold tracking-wider text-gold-gradient">
                AURUM
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm text-white/40 leading-relaxed font-[family-name:var(--font-inter)]">
              AI-powered real estate investment platform curating premium
              opportunities across Egypt's most promising markets.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@aurum.com"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-gold transition-colors font-[family-name:var(--font-inter)]"
              >
                <Mail className="h-4 w-4 text-gold/60" />
                hello@aurum.com
              </a>
              <a
                href="tel:+20212345678"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-gold transition-colors font-[family-name:var(--font-inter)]"
              >
                <Phone className="h-4 w-4 text-gold/60" />
                +20 212 345 678
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/40 font-[family-name:var(--font-inter)]">
                <MapPin className="h-4 w-4 shrink-0 text-gold/60" />
                New Cairo, Egypt
              </div>
            </div>
          </div>

          {/* ── Link columns ── */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-5 font-[family-name:var(--font-jakarta)]">
                {section.title}
              </h4>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href, 'action' in link && link.action)}
                      className="text-sm text-white/35 hover:text-gold transition-colors font-[family-name:var(--font-inter)]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-xs text-white/25 font-[family-name:var(--font-inter)]">
            &copy; {new Date().getFullYear()} AURUM. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <button
                key={link}
                className="text-xs text-white/25 hover:text-white/50 transition-colors font-[family-name:var(--font-inter)]"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
