'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Sparkles, Mic, ChevronDown } from 'lucide-react';
import { SEARCH_CHIPS } from '@/lib/data';
import { useAppStore } from '@/lib/store';

const FILTERS = ['Location', 'Budget', 'Property Type', 'Investment Goal'] as const;

export function AISearch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { searchQuery, setSearchQuery } = useAppStore();
  const [activeChip, setActiveChip] = useState<string>('Best ROI');

  return (
    <section
      id="search"
      ref={ref}
      className="py-24 bg-surface"
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          AI-Powered Search
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-jakarta)] text-3xl font-semibold text-navy md:text-5xl">
          Find Your Next Investment
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-muted-foreground">
          Our AI analyzes thousands of properties, market trends, and investment
          data to surface the most profitable opportunities tailored to your goals.
        </p>
      </motion.div>

      {/* ── Glass Search Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="mx-auto mt-12 max-w-4xl px-6"
      >
        <div className="glass gold-glow rounded-3xl p-6 md:p-8">
          {/* Search input row */}
          <div className="relative flex items-center gap-3 rounded-2xl border border-border-light bg-white px-4 py-3 shadow-sm transition-shadow focus-within:shadow-md">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, developer, or property name..."
              className="flex-1 bg-transparent font-[family-name:var(--font-inter)] text-sm text-navy placeholder:text-muted-foreground/60 focus:outline-none"
            />
            <span className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              AI
            </span>
            <button
              type="button"
              aria-label="Voice search"
              className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-light text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>

          {/* Filter pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {FILTERS.map((label) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-border-light px-4 py-2 text-sm font-[family-name:var(--font-inter)] text-muted-foreground transition-colors hover:border-gold/40 hover:text-navy"
              >
                {label}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>

          {/* Suggestion chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {SEARCH_CHIPS.map((chip) => {
              const isActive = chip === activeChip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setActiveChip(chip)}
                  className={
                    'rounded-full border px-4 py-1.5 text-sm font-[family-name:var(--font-inter)] transition-all ' +
                    (isActive
                      ? 'border-gold bg-gold text-white'
                      : 'border-border-light text-muted-foreground hover:border-gold bg-gold-dim hover:text-gold')
                  }
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* AI suggestion text */}
          <p className="mt-5 text-sm font-[family-name:var(--font-inter)] italic text-muted-foreground">
            💡 Based on market trends, North Coast villas show 15% higher ROI this
            quarter
          </p>
        </div>
      </motion.div>
    </section>
  );
}
