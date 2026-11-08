'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  BookOpen, 
  Compass, 
  Layers,
  Sparkles,
  TrendingUp,
  Cpu,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { PROVIDERS } from '@/lib/data/providers';
import { CATEGORIES } from '@/lib/data/categories';
import { CertificationCard } from '@/components/cards/CertificationCard';
import { ProviderCard } from '@/components/cards/ProviderCard';
import { CategoryCard } from '@/components/cards/CategoryCard';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const featuredCerts = CERTIFICATIONS.filter(c => c.isFeatured).slice(0, 6);
  const popularProviders = PROVIDERS.slice(0, 6);
  const featuredCategories = CATEGORIES.slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/certifications?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/certifications');
    }
  };

  const faqs = [
    {
      q: 'What is a certification voucher and how is it redeemed?',
      a: 'A certification voucher is an authorized electronic payment code that covers the examination fee for official IT testing providers such as Pearson VUE, Webassessor, or Kryterion. When scheduling your exam on the provider portal, you simply enter the voucher code in the Promo/Voucher field during checkout, reducing the exam price to zero.'
    },
    {
      q: 'How quickly will I receive my voucher after payment?',
      a: 'Vouchers are allocated and delivered instantly through our automated backend inventory system upon successful payment verification. You can view, manage, and securely reveal your voucher codes right inside your customer dashboard immediately after checkout.'
    },
    {
      q: 'Are CertiVault vouchers legitimate and officially accepted?',
      a: 'Yes, 100%. CertiVault only sources authorized exam vouchers through established distributor relationships and accredited partner agreements. Every voucher is backed by an authenticity guarantee and verified for regional applicability.'
    },
    {
      q: 'What payment methods do you support in India and internationally?',
      a: 'We support all major Indian and international payment methods via our secure Razorpay gateway, including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ banks, Credit Cards (Visa, Mastercard, RuPay, Amex), and Corporate Debit Cards.'
    },
    {
      q: 'What is the validity period of the vouchers?',
      a: 'Most vouchers are valid for 6 to 12 months from the date of purchase. The exact expiration date and test region restrictions are clearly displayed on each certification page and within your dashboard.'
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-accent/15 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18233C] border border-[#27385E] text-xs font-medium text-primary-light animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-accent-light" />
            <span>Authorized IT Certification Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Unlock Your Next <br />
            <span className="bg-gradient-to-r from-primary-light via-blue-400 to-accent text-transparent bg-clip-text">
              IT Certification.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            Save on legitimate exam vouchers for Microsoft, AWS, Google Cloud, Cisco, CompTIA, and Nutanix. 
            Instant digital delivery with secure verification.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-[#111827] border border-[#1F2B47] hover:border-primary/50 focus-within:border-primary rounded-2xl p-2 shadow-2xl transition-all">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by exam code (e.g. SAA-C03, AZ-104), role, or provider..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white text-xs sm:text-sm font-semibold shadow-glow flex items-center gap-1.5 shrink-0 transition-all"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </div>
          </form>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/certifications"
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-glow flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Explore Certifications
            </Link>
            <Link
              href="/career-finder"
              className="px-6 py-3 rounded-xl bg-[#141B2D] hover:bg-[#1A253E] text-gray-200 border border-[#1F2B47] hover:border-primary/50 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-accent-light" />
              Find My Certification
            </Link>
          </div>

          {/* Fast Highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Authorized Vouchers
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary-light" />
              Instant Dashboard Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent-light" />
              Verified Pearson VUE / Kryterion
            </span>
          </div>
        </div>
      </section>

      {/* 2. POPULAR PROVIDERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Exam Authorities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Official Certification Providers</h2>
          </div>
          <Link href="/certifications" className="text-xs font-semibold text-primary-light hover:underline flex items-center gap-1">
            <span>View All Providers</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Most Popular</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Featured Exam Vouchers</h2>
          </div>
          <Link href="/certifications" className="text-xs font-semibold text-primary-light hover:underline flex items-center gap-1">
            <span>Browse Full Catalog ({CERTIFICATIONS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCerts.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#1F2B47] relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Frictionless Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">How CertiVault Works</h2>
            <p className="text-sm text-gray-400 mt-2">
              Get official exam vouchers in three simple, transparent steps without third-party delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-4 text-center sm:text-left bg-[#141B2D]/60 rounded-2xl p-6 border border-[#1F2B47]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary-light font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white">1. Discover & Verify</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Explore verified certification blueprints, prerequisites, syllabus roadmaps, and confirmed regional exam validity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 text-center sm:text-left bg-[#141B2D]/60 rounded-2xl p-6 border border-[#1F2B47]">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-light font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white">2. Secure Payment</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Checkout with encrypted Razorpay gateway supporting UPI (Google Pay, PhonePe), Net Banking, and Credit/Debit Cards.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 text-center sm:text-left bg-[#141B2D]/60 rounded-2xl p-6 border border-[#1F2B47]">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white">3. Instant Voucher Access</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Receive instant automated code allocation. Reveal your unmasked code in your private dashboard and schedule your exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Domain Focus</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Browse by Career Category</h2>
          </div>
          <Link href="/categories" className="text-xs font-semibold text-primary-light hover:underline flex items-center gap-1">
            <span>All Categories ({CATEGORIES.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 6. CAREER FINDER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#16213E] to-[#0D1527] border border-primary/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-semibold border border-primary/30">
              <Compass className="w-3.5 h-3.5" /> Interactive Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Not sure which certification matches your background?
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Use our rule-based Career Finder engine. Answer 4 quick questions about your career goals, experience level, 
              budget, and technical stack to receive a step-by-step personalized certification roadmap.
            </p>
            <div className="pt-2">
              <Link
                href="/career-finder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-semibold text-sm shadow-glow transition-all"
              >
                Launch Career Finder
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE CERTIVAULT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Engineering Rigor</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Why Tech Leaders Choose CertiVault</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-primary-light">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Authorized Inventory Only</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We never list speculative vouchers. Every voucher corresponds to real, verified pre-purchased inventory in our secure vault.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Leakage Architecture</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Voucher codes are never exposed to public APIs or browser source. They remain encrypted until explicitly revealed by the authenticated owner.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Fair Transparent Pricing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              All prices are listed in Indian Rupees (INR) with no hidden checkout surcharges or currency conversion penalties.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Everything You Need to Know</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-[#1F2B47] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-primary-light transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-90 text-primary-light' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-[#1F2B47]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
