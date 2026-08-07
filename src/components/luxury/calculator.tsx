'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calculator as CalcIcon, TrendingUp, DollarSign, CalendarDays, BarChart3, ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export function Calculator() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const [budget, setBudget] = useState(500000);
  const [roi, setRoi] = useState(13);
  const [years, setYears] = useState(5);

  const results = useMemo(() => {
    const totalReturn = budget * (roi / 100) * years;
    const futureValue = budget + totalReturn;
    const monthlyIncome = (budget * (roi / 100)) / 12;
    const annualReturn = budget * (roi / 100);
    return { totalReturn, futureValue, monthlyIncome, annualReturn };
  }, [budget, roi, years]);

  const yearData = useMemo(() => {
    const data: { year: number; value: number }[] = [];
    for (let i = 0; i <= years; i++) {
      data.push({
        year: i,
        value: budget + budget * (roi / 100) * i,
      });
    }
    return data;
  }, [budget, roi, years]);

  const maxVal = yearData[yearData.length - 1]?.value ?? budget;

  return (
    <section id="calculator" ref={ref} className="bg-surface section-luxury">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20"
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Investment Calculator
          </span>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
            Project Your Returns
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg font-[family-name:var(--font-inter)]">
            Model your investment growth with our advanced projection engine.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: Inputs ── */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="luxury-card p-6 md:p-8 space-y-8">
              {/* Budget slider */}
              <SliderInput
                label="Investment Budget"
                icon={<DollarSign className="h-4 w-4 text-gold" />}
                value={budget}
                onChange={setBudget}
                min={100000}
                max={3000000}
                step={50000}
                format={(v) => fmt(v)}
              />

              {/* ROI slider */}
              <SliderInput
                label="Expected Annual ROI"
                icon={<TrendingUp className="h-4 w-4 text-gold" />}
                value={roi}
                onChange={setRoi}
                min={5}
                max={25}
                step={0.5}
                format={(v) => `${v}%`}
              />

              {/* Years slider */}
              <SliderInput
                label="Investment Period"
                icon={<CalendarDays className="h-4 w-4 text-gold" />}
                value={years}
                onChange={setYears}
                min={1}
                max={10}
                step={1}
                format={(v) => `${v} year${v > 1 ? 's' : ''}`}
              />
            </div>
          </motion.div>

          {/* ── Right: Results ── */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="space-y-6">
            {/* Stat cards row */}
            <div className="grid grid-cols-2 gap-4">
              <ResultCard label="Projected Returns" value={fmt(results.totalReturn)} icon={<TrendingUp className="h-5 w-5" />} />
              <ResultCard label="Future Value" value={fmt(results.futureValue)} icon={<BarChart3 className="h-5 w-5" />} />
              <ResultCard label="Monthly Income" value={fmt(results.monthlyIncome)} icon={<DollarSign className="h-5 w-5" />} />
              <ResultCard label="Annual Return" value={fmt(results.annualReturn)} icon={<ArrowUpRight className="h-5 w-5" />} />
            </div>

            {/* Visual growth chart */}
            <div className="luxury-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-navy font-[family-name:var(--font-jakarta)]">
                  Growth Projection
                </span>
                <span className="text-xs text-gold font-semibold bg-gold/10 rounded-full px-3 py-1">
                  {roi}% annually
                </span>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-2 h-48">
                {yearData.map((d) => {
                  const pct = (d.value / maxVal) * 100;
                  return (
                    <div
                      key={d.year}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <span className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                        {d.value >= 1000000
                          ? `$${(d.value / 1000000).toFixed(1)}M`
                          : `$${(d.value / 1000).toFixed(0)}K`}
                      </span>
                      <div className="w-full relative rounded-t-lg overflow-hidden bg-surface group">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${pct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: d.year * 0.08 }}
                          className="absolute bottom-0 left-0 right-0 rounded-t-lg"
                          style={{
                            background: d.year === 0
                              ? '#0F172A'
                              : 'linear-gradient(to top, #D4AF37, #E8CC6E)',
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Y{d.year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Reusable slider input ── */
function SliderInput({
  label,
  icon,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-navy font-[family-name:var(--font-jakarta)]">
            {label}
          </span>
        </div>
        <span className="text-lg font-bold text-gold font-[family-name:var(--font-jakarta)]">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(212,175,55,0.4)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-surface"
        style={{
          background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((value - min) / (max - min)) * 100}%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
        }}
      />
    </div>
  );
}

/* ── Reusable result card ── */
function ResultCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="luxury-card p-5">
      <div className="flex items-center gap-2 text-gold mb-2">
        {icon}
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-inter)]">
          {label}
        </span>
      </div>
      <p className="text-xl font-bold text-navy font-[family-name:var(--font-jakarta)]">
        {value}
      </p>
    </div>
  );
}
