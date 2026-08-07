'use client';

import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Navbar } from '@/components/luxury/navbar';
import { Hero } from '@/components/luxury/hero';
import { AISearch } from '@/components/luxury/ai-search';
import { Stats } from '@/components/luxury/stats';
import { FeaturedLocations } from '@/components/luxury/featured-locations';
import { AIProperties } from '@/components/luxury/ai-properties';
import { Calculator as InvestmentCalculator } from '@/components/luxury/calculator';
import { AIAdvisor } from '@/components/luxury/ai-advisor';
import { WhyInvest } from '@/components/luxury/why-invest';
import { AmenitiesShowcase } from '@/components/luxury/amenities-showcase';
import { Testimonials } from '@/components/luxury/testimonials';
import { AppCTA } from '@/components/luxury/app-cta';
import { Footer } from '@/components/luxury/footer';
import { PropertyDetail } from '@/components/luxury/property-detail';

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
              <AISearch />
              <Stats />
              <FeaturedLocations />
              <AIProperties />
              <InvestmentCalculator />
              <WhyInvest />
              <AmenitiesShowcase />
              <Testimonials />
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
