'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, TrendingUp, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const AI_INSIGHTS = [
  {
    title: 'North Coast High Demand',
    desc: 'Mediterranean beachfront properties showing +15% projected ROI this quarter.',
    icon: TrendingUp,
    badge: '15% ROI',
  },
  {
    title: 'New Capital Infrastructure',
    desc: 'Government district expansion driving 22% property value appreciation.',
    icon: Zap,
    badge: '+22% Forecast',
  },
  {
    title: 'Instant AI Valuation',
    desc: 'Analyzed 50,000+ real estate data points for exact market match scoring.',
    icon: ShieldCheck,
    badge: '99.4% Precision',
  },
];

export function AISearch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { toggleAdvisor } = useAppStore();

  return (
    <section ref={ref} className="py-12 bg-[#F8F9FA] border-y border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100"
        >
          {/* Left Title */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#FFF8E7] text-[#C89B2B] border border-[#F5E6BA] shrink-0">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C89B2B] font-[family-name:var(--font-inter)]">
                  Live AI Engine
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  <Sparkles className="w-3 h-3" /> Active
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)] mt-0.5">
                Real-Time Investment Insights
              </h3>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
            {AI_INSIGHTS.map((insight, idx) => {
              const IconComp = insight.icon;
              return (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                  onClick={() => toggleAdvisor()}
                  className="bg-[#FAF9F6] hover:bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-[#C89B2B]/40 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComp className="w-4 h-4 text-[#C89B2B]" />
                    <span className="text-[10px] font-extrabold text-[#C89B2B] bg-[#FFF8E7] px-2 py-0.5 rounded-full">
                      {insight.badge}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 font-[family-name:var(--font-jakarta)] truncate group-hover:text-[#C89B2B] transition-colors">
                    {insight.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-[family-name:var(--font-inter)] mt-1 line-clamp-2 leading-relaxed">
                    {insight.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
