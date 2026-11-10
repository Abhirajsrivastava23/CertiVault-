import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Layers, Compass } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { CertificationCard } from '@/components/certifications/CertificationCard';
import { Button } from '@/components/ui/Button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Certifications belonging to this category
  const matchingCertifications = CERTIFICATIONS.filter(
    (c) => c.categorySlug === category.slug || c.categoryId === category.id
  );

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href="/certifications" className="hover:text-white transition-colors">Categories</Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-slate-200 font-medium">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="rounded-2xl border border-surface-border bg-gradient-radial from-surface-100 to-navy-950 p-6 sm:p-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light">
            <Layers className="h-4 w-4" />
            <span>Specialization Category</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {category.name} Certifications
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {category.description}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span><strong>{matchingCertifications.length}</strong> vouchers currently available</span>
            <span>•</span>
            <span>100% Authorized testing partner exam delivery</span>
          </div>
        </div>

        {/* Categories Bar for quick jumping */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                cat.slug === category.slug
                  ? 'bg-primary text-white border-primary shadow-glow'
                  : 'bg-surface-card text-slate-400 hover:text-white border-surface-border'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Certifications List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Available Exam Vouchers in {category.name}
            </h2>
            <Link href="/career-finder">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-primary-light">
                <Compass className="h-4 w-4" />
                <span>Need guidance choosing? Try Career Finder</span>
              </Button>
            </Link>
          </div>

          {matchingCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingCertifications.map((cert) => (
                <CertificationCard key={cert.id} certification={cert} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-xl border border-surface-border bg-surface-card space-y-3">
              <h3 className="text-base font-semibold text-white">New Vouchers Arriving Soon</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We are actively curating additional publisher authorized inventory for {category.name}. Check back or contact support for bulk queries.
              </p>
              <Link href="/certifications">
                <Button variant="secondary" size="sm">Browse All Certifications</Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
