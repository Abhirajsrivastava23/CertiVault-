import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Certification } from '@/lib/types';
import { formatInr, calculateDiscount } from '@/lib/utils/formatters';
import { DifficultyBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const discountPercent = calculateDiscount(certification.retailPriceInr, certification.voucherPriceInr);
  const inStock = certification.stockCount > 0;

  return (
    <div className="group relative rounded-xl border border-surface-border bg-surface-card p-5 sm:p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300">
      <div>
        {/* Provider & Exam Code Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary-light">
            <span>{certification.providerName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono font-medium text-slate-400 bg-surface-50 px-2 py-0.5 rounded border border-surface-border">
              {certification.examCode}
            </span>
            <DifficultyBadge level={certification.difficultyLevel} />
          </div>
        </div>

        {/* Title */}
        <Link href={`/certifications/${certification.slug}`} className="block group-hover:text-primary-light transition-colors">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug mb-2 line-clamp-2">
            {certification.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {certification.shortDescription}
        </p>

        {/* Key skills preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {certification.skillsCovered.slice(0, 2).map((skill, idx) => (
            <span 
              key={idx} 
              className="text-[11px] text-slate-400 bg-surface-200/80 px-2 py-0.5 rounded-md border border-surface-border/50 truncate max-w-[200px]"
            >
              {skill}
            </span>
          ))}
          {certification.skillsCovered.length > 2 && (
            <span className="text-[11px] text-slate-400 px-1 py-0.5">
              +{certification.skillsCovered.length - 2} more
            </span>
          )}
        </div>
      </div>

      <div>
        {/* Pricing & Stock Information */}
        <div className="pt-4 border-t border-surface-border/60 flex items-baseline justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {formatInr(certification.voucherPriceInr)}
              </span>
              {certification.retailPriceInr > certification.voucherPriceInr && (
                <span className="text-xs text-slate-400 line-through">
                  {formatInr(certification.retailPriceInr)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {discountPercent > 0 && (
                <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                  Save {discountPercent}%
                </span>
              )}
              <span className={`text-[11px] flex items-center gap-1 ${inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                {inStock ? `In Stock (${certification.stockCount})` : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/certifications/${certification.slug}`} className="w-full">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              View Details
            </Button>
          </Link>
          <Link 
            href={`/checkout?certId=${certification.id}`}
            className={inStock ? 'w-full' : 'w-full pointer-events-none opacity-50'}
          >
            <Button variant="primary" size="sm" className="w-full text-xs gap-1" disabled={!inStock}>
              <span>Buy Voucher</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

