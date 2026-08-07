'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="bg-surface section-luxury"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-gold font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
            Trusted by Global Investors
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="luxury-card rounded-3xl p-8 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-navy/80 font-[family-name:var(--font-inter)] leading-relaxed text-sm mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-jakarta)] font-semibold text-navy truncate">
                      {testimonial.name}
                    </span>
                    {testimonial.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                  {testimonial.investment && (
                    <p className="text-xs text-gold font-medium mt-0.5">
                      {testimonial.investment}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
