'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Compass, 
  Lock, 
  Sparkles, 
  Star,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';
import { VendorLogo } from '../ui/VendorLogo';

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
    <div className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 bg-gradient-to-b from-[#060B17] via-navy-950 to-[#0A1022]">
      
      {/* Background Glows & Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-48 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-48 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Search & Trust (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/50 text-xs text-blue-200 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-white">Authorized Exam Voucher Marketplace</span>
              <span className="text-blue-400/60 hidden sm:inline">•</span>
              <span className="text-emerald-400 font-bold hidden sm:inline">100% Genuine Testing Center Codes</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Save Up To <span className="text-emerald-400">40%</span> On Official{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                IT Certification Vouchers.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Skip overpriced test vendor booking fees. CertiVault provides pre-allocated, verified Pearson VUE, PSI, and Webassessor exam vouchers for AWS, Azure, Google Cloud, Cisco, and CompTIA with instant vault delivery.
            </p>

            {/* Live Search Bar */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleSearch} className="relative flex items-center shadow-2xl">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search exam code (AZ-900, SAA-C03, CCNA, Security+)..."
                  className="w-full h-14 pl-12 pr-36 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xl transition-all"
                />
                <div className="absolute right-2">
                  <Button type="submit" variant="primary" size="md" className="h-10 px-4 text-xs sm:text-sm font-bold shadow-glow bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                    Find Voucher
                  </Button>
                </div>
              </form>

              {/* Quick Tags */}
              <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-400">
                <span className="text-[11px] font-medium text-slate-400">Trending Exams:</span>
                {[
                  { name: 'AZ-900', slug: 'microsoft' },
                  { name: 'AWS SAA-C03', slug: 'aws' },
                  { name: 'Google ACE', slug: 'google-cloud' },
                  { name: 'CCNA', slug: 'cisco' },
                  { name: 'Security+', slug: 'comptia' },
                  { name: 'CKA', slug: 'linux' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={`/certifications?search=${encodeURIComponent(item.name)}`}
                    className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-2 py-0.5 rounded-lg border border-slate-700/60 transition-colors text-[11px] font-medium flex items-center gap-1"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link href="/certifications">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-glow gap-2 text-sm font-bold px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <span>Browse All Vouchers</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/career-finder">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 text-sm font-semibold px-6 py-3.5 border-slate-700 hover:border-slate-600 text-slate-200">
                  <Compass className="h-4 w-4 text-cyan-400" />
                  <span>Interactive Career Finder</span>
                </Button>
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-slate-800/60 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Exam Fee Waiver</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Instant Delivery in Vault</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Razorpay Secured</span>
              </div>
            </div>

          </div>

          {/* Right Column: Holographic Digital Voucher Card Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Glowing Backdrop */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-3xl blur-2xl opacity-75 animate-pulse" />

            {/* Glassmorphic Voucher Card */}
            <div className="relative rounded-3xl border border-blue-500/30 bg-gradient-to-b from-slate-900/95 via-navy-950 to-slate-900/95 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
              
              {/* Card Header with Provider Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <VendorLogo slug="microsoft" size="lg" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block font-mono">
                      OFFICIAL VOUCHER
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      Microsoft Azure AZ-900
                    </h3>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Save 40%
                </span>
              </div>

              {/* Realistic Voucher Code Showcase */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 relative overflow-hidden space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                    <Lock className="h-3.5 w-3.5 text-blue-400" />
                    ENCRYPTED DIGITAL CODE
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active & Validated
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
                  <span className="font-mono text-sm tracking-widest font-extrabold text-white">
                    MSFT-AZ900-••••-••••
                  </span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded">
                    Revealed on Pay
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Validity: 12 Months</span>
                  <span>Testing: Pearson VUE / Online</span>
                </div>
              </div>

              {/* Pricing comparison */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs text-slate-400 block">CertiVault Member Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">₹3,700</span>
                    <span className="text-xs text-slate-400 line-through">₹4,800</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-semibold block">Includes GST 18%</span>
                  <span className="text-xs text-slate-300 font-medium">Zero FX conversion fee</span>
                </div>
              </div>

              {/* Social Proof & Guarantee Strip */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-[11px]">4.9 / 5</span>
                  <span className="text-slate-400 text-[10px]">(1,840+ reviews)</span>
                </div>
                <span className="text-cyan-400 font-medium text-[11px] flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  100% Refund Guarantee
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Global Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block">15,400+</span>
            <span className="text-xs text-slate-400 mt-1 block">Vouchers Delivered</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight block">₹3.2 Cr+</span>
            <span className="text-xs text-slate-400 mt-1 block">Candidate Savings</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-2xl sm:text-3xl font-black text-blue-400 tracking-tight block">99.9%</span>
            <span className="text-xs text-slate-400 mt-1 block">Portal Acceptance Rate</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-2xl sm:text-3xl font-black text-purple-400 tracking-tight block">&lt; 60 Sec</span>
            <span className="text-xs text-slate-400 mt-1 block">Instant Code Allocation</span>
          </div>
        </div>

      </div>

    </div>
  );
}
