import React from 'react';
import Link from 'next/link';
import { PROVIDERS } from '@/lib/data/providers';
import { ArrowRight, ExternalLink } from 'lucide-react';

export function ProviderGrid() {
  return (
    <section className="py-16 bg-navy-900 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
              Official Vendor Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Popular Certification Providers
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              We provide legitimate testing center vouchers for the world’s leading technology brands and cloud platforms.
            </p>
          </div>
          <Link
            href="/certifications"
            className="text-xs sm:text-sm font-semibold text-primary-light hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Providers</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROVIDERS.map((provider) => (
            <Link
              key={provider.id}
              href={`/certifications?provider=${provider.slug}`}
              className="group rounded-xl border border-surface-border bg-surface-card p-5 hover:border-primary/40 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="h-8 px-2.5 rounded bg-surface-50 border border-surface-border flex items-center text-xs font-bold text-slate-200">
                    {provider.shortName}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {provider.certCount} Exams
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors mb-1.5">
                  {provider.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {provider.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border/50 flex items-center justify-between text-xs text-primary-light font-medium">
                <span>Browse Vouchers</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

