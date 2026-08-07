'use client';

import { useAppStore } from '@/lib/store';

const FOOTER_SECTIONS = [
  {
    title: 'Buy',
    links: [
      { label: 'All Projects', href: '#investments' },
      { label: 'New Launches', href: '#investments' },
      { label: 'Ready to Move', href: '#investments' },
    ],
  },
  {
    title: 'Invest',
    links: [
      { label: 'High ROI Projects', href: '#investments' },
      { label: 'Investment Guide', href: '#about' },
      { label: 'Market Insights', href: '#about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Guides', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

export function Footer() {
  const { setPage, toggleAdvisor } = useAppStore();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPage('listing');
    }
  };

  return (
    <footer id="contact" className="bg-[#070D18] text-white py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-slate-800/80">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-10">
        {/* Left Logo Column */}
        <div className="flex flex-col">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col group relative py-1"
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
        </div>

        {/* Center Navigation Links Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 flex-1 max-w-4xl">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 font-[family-name:var(--font-jakarta)]">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-xs text-slate-400 hover:text-white transition-colors duration-200 font-[family-name:var(--font-inter)] text-left cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Socials & Copyright Column */}
        <div className="flex flex-col items-start lg:items-end justify-between self-stretch gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-[family-name:var(--font-jakarta)] text-left lg:text-right">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#C89B2B] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-xs"
              >
                f
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#C89B2B] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-xs"
              >
                📷
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#C89B2B] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-xs"
              >
                in
              </a>
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#C89B2B] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-xs"
              >
                ▶
              </a>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-[family-name:var(--font-inter)] text-left lg:text-right">
            &copy; 2024 Flat &amp; Villa. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
