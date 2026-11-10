import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ProviderGrid } from '@/components/home/ProviderGrid';
import { FeaturedCertifications } from '@/components/home/FeaturedCertifications';
import { FreeVouchersSection } from '@/components/home/FreeVouchersSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyCertiVault } from '@/components/home/WhyCertiVault';
import { PrepGuidance } from '@/components/home/PrepGuidance';
import { FaqSection } from '@/components/home/FaqSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProviderGrid />
      <FeaturedCertifications />
      <FreeVouchersSection />
      <CategoryGrid />
      <HowItWorks />
      <WhyCertiVault />
      <PrepGuidance />
      <FaqSection />
    </div>
  );
}
