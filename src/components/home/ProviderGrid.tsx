import React from 'react';
import Link from 'next/link';
import { PROVIDERS } from '@/lib/data/providers';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { VendorLogo } from '@/components/ui/VendorLogo';

export function ProviderGrid() {
  const getProviderHighlight = (slug: string) => {
    switch (slug) {
      case 'aws':
        return { discount: 'Save Up to 35%', badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'microsoft':
        return { discount: 'Save Up to 40%', badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
      case 'google-cloud':
        return { discount: 'Save Up to 30%', badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
      case 'cisco':
        return { discount: 'Save Up to 25%', badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };
      case 'comptia':
        return { discount: 'Save Up to 38%', badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'hashicorp':
        return { discount: 'Save Up to 28%', badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };
      case 'linux-foundation':
        return { discount: 'Save Up to 30%', badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
      default:
        return { discount: 'Save Up to 30%', badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-t border-surface-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Trust Pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-wider text-primary-light mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Official Examination Testing Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Leading Certification Providers
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Legitimate exam vouchers directly redeemable on official testing portals including Pearson VUE, PSI Testing, and Webassessor.
            </p>
          </div>

          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-surface-border text-xs sm:text-sm font-semibold text-primary-light hover:text-white hover:border-primary/50 transition-all shrink-0 shadow-sm"
          >
            <span>View All Providers</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 8-Card Provider Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROVIDERS.map((provider) => {
            const highlight = getProviderHighlight(provider.slug);
            return (
              <Link
                key={provider.id}
                href={`/certifications?provider=${provider.slug}`}
                className="group relative rounded-2xl border border-surface-border/90 bg-gradient-to-b from-surface-card to-navy-950 p-6 hover:border-primary/50 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Brand Logo and Discount Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <VendorLogo slug={provider.slug} size="lg" className="group-hover:scale-105 transition-transform" />
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${highlight.badgeColor}`}>
                      {highlight.discount}
                    </span>
                  </div>

                  {/* Provider Name and Exam Count */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-primary-light transition-colors">
                      {provider.name}
                    </h3>
                    <span className="text-xs font-medium text-slate-400 bg-surface-50 px-2 py-0.5 rounded border border-surface-border/60 shrink-0">
                      {provider.certCount} Exams
                    </span>
                  </div>

                  {/* Provider Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {provider.description}
                  </p>
                </div>

                {/* Bottom CTA with Instant Verification Label */}
                <div className="mt-5 pt-3.5 border-t border-surface-border/60 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 flex items-center gap-1 font-medium text-[11px]">
                    <Zap className="h-3 w-3" />
                    Instant Vault Delivery
                  </span>
                  <span className="text-primary-light font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Browse</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
