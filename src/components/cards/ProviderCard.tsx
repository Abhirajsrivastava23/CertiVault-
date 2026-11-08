import React from 'react';
import Link from 'next/link';
import { Provider } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link
      href={`/certifications?provider=${provider.slug}`}
      className="glass-card glass-card-hover rounded-2xl p-6 group border border-[#1F2B47] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#141C30] border border-[#233150] flex items-center justify-center font-bold text-white text-base tracking-wider group-hover:border-primary/50 transition-colors">
            {provider.shortName.slice(0, 4)}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#18233C] text-gray-300 border border-[#27385E]">
            {provider.certCount ? `${provider.certCount} Vouchers` : 'Authorized'}
          </span>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-primary-light transition-colors mb-2">
          {provider.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {provider.description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs font-medium text-primary-light group-hover:underline pt-4 mt-2">
        <span>View certifications</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
