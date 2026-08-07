'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATISTICS } from '@/lib/data';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(end: number, isInView: boolean, formatAsK = false) {
  const [display, setDisplay] = useState(0);

  const animate = useCallback(() => {
    const duration = 2000;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(easedProgress * end);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [end]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  if (formatAsK && display >= 1000) {
    return `${Math.round(display / 1000)}K`;
  }
  return display.toLocaleString();
}

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

function StatCard({
  value,
  suffix,
  label,
  isInView,
  formatAsK,
}: {
  value: number;
  suffix: string;
  label: string;
  isInView: boolean;
  formatAsK?: boolean;
}) {
  const displayValue = useCountUp(value, isInView, formatAsK);

  return (
    <div className="luxury-card p-6 md:p-8 text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl md:text-5xl font-bold text-navy font-[family-name:var(--font-jakarta)]">
          {displayValue}
        </span>
        {suffix && (
          <span className="text-2xl text-gold font-[family-name:var(--font-jakarta)]">
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="bg-white section-luxury">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-6"
      >
        {STATISTICS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <StatCard
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isInView={isInView}
              formatAsK={'format' in stat && stat.format}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
