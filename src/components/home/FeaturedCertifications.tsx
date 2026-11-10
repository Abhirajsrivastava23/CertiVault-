'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { CertificationCard } from '../certifications/CertificationCard';

export function FeaturedCertifications() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Featured' },
    { id: 'cloud', label: 'Cloud Computing' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'devops', label: 'DevOps & Containers' },
    { id: 'networking', label: 'Networking' },
  ];

  const featured = CERTIFICATIONS.filter((c) => {
    if (!c.isFeatured) return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'cloud') return c.categorySlug?.includes('cloud') || c.providerSlug === 'aws' || c.providerSlug === 'microsoft';
    if (selectedCategory === 'cybersecurity') return c.categorySlug?.includes('cyber') || c.examCode.includes('SEC') || c.name.includes('Security');
    if (selectedCategory === 'devops') return c.categorySlug?.includes('devops') || c.examCode.includes('CKA') || c.name.includes('DevOps') || c.name.includes('Terraform');
    if (selectedCategory === 'networking') return c.categorySlug?.includes('network') || c.providerSlug === 'cisco';
    return true;
  }).slice(0, 6);

  return (
    <section className="py-20 bg-[#070D1E] border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Flame className="h-3.5 w-3.5" />
              <span>In-Demand Industry Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Certification Vouchers
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Legitimate exam vouchers with guaranteed testing center redemption. Delivered instantly to your account with 100% exam fee waiver.
            </p>
          </div>

          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-surface-border text-xs sm:text-sm font-semibold text-primary-light hover:text-white hover:border-primary/50 transition-all shrink-0 shadow-sm"
          >
            <span>Explore All 30+ Certifications</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-glow border border-primary-light'
                  : 'bg-surface-card border border-surface-border text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>

      </div>
    </section>
  );
}
