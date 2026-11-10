import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { CertificationCard } from '../certifications/CertificationCard';

export function FeaturedCertifications() {
  const featured = CERTIFICATIONS.filter((c) => c.isFeatured).slice(0, 6);

  return (
    <section className="py-16 bg-navy-950 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <Flame className="h-3.5 w-3.5" />
              <span>In-Demand Credentials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Certification Vouchers
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Verified high-priority certifications preferred by enterprise hiring managers and cloud consulting practices.
            </p>
          </div>
          <Link
            href="/certifications"
            className="text-xs sm:text-sm font-semibold text-primary-light hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All Certifications</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

