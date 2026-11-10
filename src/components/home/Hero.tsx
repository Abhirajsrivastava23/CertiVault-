'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, ShieldCheck, CheckCircle2, Zap, Compass, Award } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/certifications?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push('/certifications');
    }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-hero-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Trust pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-50 border border-surface-border text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-primary-light" />
            <span>Authorized IT Certification Voucher Marketplace</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 font-semibold">100% Genuine</span>
          </div>
        </div>

        {/* Hero Heading & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Unlock Your Next <br />
            <span className="bg-gradient-to-r from-primary-light via-blue-400 to-accent-light bg-clip-text text-transparent">
              IT Certification.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CertiVault connects ambitious developers, engineers, and enterprises with authentic exam vouchers for AWS, Microsoft, Google Cloud, Cisco, and CompTIA at fair marketplace prices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exam code (e.g. AZ-900, SAA-C03), technology, or certification..."
              className="w-full h-14 pl-12 pr-32 rounded-xl bg-surface-card border border-surface-border text-white placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xl transition-all"
            />
            <div className="absolute right-2">
              <Button type="submit" variant="primary" size="md" className="h-10 text-xs sm:text-sm font-semibold shadow-glow">
                Search Catalog
              </Button>
            </div>
          </form>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>Popular searches:</span>
            {['AZ-900', 'AWS SAA-C03', 'Google ACE', 'CCNA', 'Security+', 'CKA'].map((code) => (
              <Link
                key={code}
                href={`/certifications?search=${encodeURIComponent(code)}`}
                className="text-slate-300 hover:text-white bg-surface-50/80 px-2 py-0.5 rounded border border-surface-border/60 transition-colors"
              >
                {code}
              </Link>
            ))}
          </div>
        </div>

        {/* Dual Call-to-Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/certifications">
            <Button variant="primary" size="lg" className="shadow-glow gap-2 text-sm sm:text-base">
              <span>Explore Certifications</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/career-finder">
            <Button variant="secondary" size="lg" className="gap-2 text-sm sm:text-base">
              <Compass className="h-4 w-4 text-accent-light" />
              <span>Find My Certification</span>
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 border-t border-surface-border/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-primary-light" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Authorized Resale</h4>
              <p className="text-xs text-slate-400">Directly redeemable at official testing centers.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center shrink-0">
              <Zap className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Automated allocation to your secure customer vault.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Transparent In INR</h4>
              <p className="text-xs text-slate-400">Zero foreign exchange markups. Pay via UPI or cards.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

