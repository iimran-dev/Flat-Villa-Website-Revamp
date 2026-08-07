'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Waves,
  Cpu,
  Dumbbell,
  Building2,
  Baby,
  Briefcase,
  Zap,
  Flower2,
  Sparkles,
  Activity,
  ShoppingBag,
  TreePine,
  type LucideIcon,
} from 'lucide-react';
import { AMENITIES } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  cpu: Cpu,
  dumbbell: Dumbbell,
  'building-2': Building2,
  baby: Baby,
  briefcase: Briefcase,
  zap: Zap,
  'flower-2': Flower2,
  sparkles: Sparkles,
  activity: Activity,
  'shopping-bag': ShoppingBag,
  palmtree: TreePine,
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export function AmenitiesShowcase() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-white section-luxury">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto px-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-gold font-medium mb-4">
            Premium Amenities
          </span>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
            Everything You Deserve
          </h2>
          <p className="mt-4 text-muted-foreground font-[family-name:var(--font-inter)] max-w-xl mx-auto">
            World-class amenities designed for the most discerning residents,
            delivering an unparalleled living experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {AMENITIES.map((amenity) => {
            const Icon = iconMap[amenity.icon];
            return (
              <motion.div
                key={amenity.name}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="luxury-card rounded-2xl p-6 text-center group cursor-default"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gold group-hover:text-white">
                  {Icon && (
                    <Icon className="w-6 h-6 text-gold transition-colors duration-300 group-hover:text-white" />
                  )}
                </div>
                <p className="mt-3 text-sm font-[family-name:var(--font-jakarta)] font-medium text-navy">
                  {amenity.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
