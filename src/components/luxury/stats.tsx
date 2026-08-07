'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Landmark, Trophy, Users } from 'lucide-react';

const STATS_ITEMS = [
  { icon: Landmark, value: 'EGP 45B+', label: 'Property Transactions' },
  { icon: Building2, value: '150+', label: 'Top Developers' },
  { icon: Trophy, value: '98.6%', label: 'Satisfied Investors' },
  { icon: Users, value: '10,000+', label: 'Active Clients' },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {STATS_ITEMS.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-4 bg-slate-800/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-[#C89B2B]/20 text-[#D4AF37] border border-[#D4AF37]/30 shrink-0 group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold font-[family-name:var(--font-jakarta)] text-white group-hover:text-[#D4AF37] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-[family-name:var(--font-inter)] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
