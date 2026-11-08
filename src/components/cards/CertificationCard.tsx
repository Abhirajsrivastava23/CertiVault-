import React from 'react';
import Link from 'next/link';
import { Certification } from '@/lib/types';
import { formatInr, calculateDiscount } from '@/lib/utils/formatters';
import { ArrowUpRight, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const discount = calculateDiscount(certification.retailPriceInr, certification.voucherPriceInr);

  const getDifficultyBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Advanced':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Expert':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getProviderColor = (providerSlug: string) => {
    switch (providerSlug) {
      case 'microsoft':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'aws':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'google-cloud':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'cisco':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'comptia':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'nutanix':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    }
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group border border-[#1F2B47]">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getProviderColor(certification.providerSlug)}`}>
            {certification.providerName}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getDifficultyBadge(certification.difficultyLevel)}`}>
              {certification.difficultyLevel}
            </span>
            <span className="text-xs font-mono text-gray-400 bg-[#162035] px-2 py-0.5 rounded border border-[#253556]">
              {certification.examCode}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-primary-light transition-colors line-clamp-2 mb-2">
          <Link href={`/certifications/${certification.slug}`}>
            {certification.name}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">
          {certification.shortDescription}
        </p>

        {/* Features / Details chips */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-6 py-2 border-y border-[#1F2B47]/60">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {certification.validityMonths} Mo Validity
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Pearson VUE
          </span>
          {certification.stockCount > 0 ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({certification.stockCount})
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400">
              <AlertCircle className="w-3.5 h-3.5" /> Backorder
            </span>
          )}
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-2">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-xs text-gray-400 font-medium">Voucher Price</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                {formatInr(certification.voucherPriceInr)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  {formatInr(certification.retailPriceInr)}
                </span>
              )}
            </div>
          </div>
          {discount > 0 && (
            <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Save {discount}%
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/certifications/${certification.slug}`}
            className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#141B2D] text-gray-200 border border-[#1F2B47] hover:border-primary/50 hover:bg-[#1A253E] transition-all"
          >
            Details
          </Link>
          <Link
            href={`/checkout?certId=${certification.id}`}
            className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white shadow-glow transition-all"
          >
            Buy Voucher
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
