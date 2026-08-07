'use client';

import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Navbar } from '@/components/luxury/navbar';
import { Hero } from '@/components/luxury/hero';
import { FeaturedLocations } from '@/components/luxury/featured-locations';
import { AIProperties } from '@/components/luxury/ai-properties';
import { AIAdvisor } from '@/components/luxury/ai-advisor';
import { AmenitiesShowcase } from '@/components/luxury/amenities-showcase';
import { AppCTA } from '@/components/luxury/app-cta';
import { Footer } from '@/components/luxury/footer';
import { PropertyDetail } from '@/components/luxury/property-detail';
import { WhyInvest } from '@/components/luxury/why-invest';

export default function Home() {
  const { currentPage } = useAppStore();

  return (
    <>
      <AnimatePresence mode="wait">
        {currentPage === 'detail' ? (
          <PropertyDetail key="detail" />
        ) : (
          <div key="home" className="min-h-screen bg-surface">
            <Navbar />
            <main>
              <Hero />
              <FeaturedLocations />
              <AIProperties />
              <WhyInvest />
              <AmenitiesShowcase />
              <AppCTA />
            </main>
            <Footer />
            <AIAdvisor />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
