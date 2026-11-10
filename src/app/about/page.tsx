import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, Award, Users, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-surface-border pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            About CertiVault
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Democratizing Legitimate IT Certification Access
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Your Certification. Your Career. Your Next Opportunity.&rdquo;
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">Our Product Vision</h2>
          <p>
            CertiVault was founded on a simple realization: IT certifications are the most dependable, merit-based career accelerator for technical professionals, yet purchasing exam vouchers in India and developing markets has historically been plagued by prohibitive international card fees, complex foreign currency conversions, and dubious grey-market resellers.
          </p>
          <p>
            We built CertiVault as a dedicated, fully authorized certification voucher marketplace where students, independent engineers, and corporate training teams can purchase genuine testing vouchers in Indian Rupees (INR) through modern local payment rails like UPI, debit cards, and net banking.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="rounded-xl border border-surface-border bg-surface-card p-6 space-y-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400 mb-2" />
            <h3 className="text-base font-bold text-white">Authorized Resale Exclusively</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never deal in unverified second-hand codes or illegitimate student discounts. Every single voucher in our private inventory is procured through authorized publisher distributor contracts.
            </p>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-card p-6 space-y-2">
            <Lock className="h-6 w-6 text-primary-light mb-2" />
            <h3 className="text-base font-bold text-white">Single-Use Vault Protection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Because certification vouchers function as financial bearer instruments, our database architecture isolates inventory in private PostgreSQL schemas, masking codes until explicitly revealed by the authenticated owner.
            </p>
          </div>
        </div>

        {/* Team Commitment */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-8 space-y-4">
          <h3 className="text-lg font-bold text-white">Our Integrity Commitment</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            CertiVault does not publish fake statistics, manufactured testimonials, or inflated countdown timers. We measure our platform’s success by one metric: legitimate vouchers delivered reliably, allowing you to walk into your Pearson VUE or PSI exam appointment with total confidence.
          </p>
          <div className="pt-2">
            <Link href="/certifications">
              <Button variant="primary" size="md" className="shadow-glow gap-2">
                <span>Explore the Certification Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
