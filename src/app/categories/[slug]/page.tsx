import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/lib/data/categories';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { CertificationCard } from '@/components/cards/CertificationCard';
import { ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default function CategoryDetailPage({ params }: Props) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Certifications belonging to this category
  const matchingCerts = CERTIFICATIONS.filter((c) => c.categorySlug === category.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-200 font-medium">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#1F2B47] space-y-4 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-md bg-primary/20 text-primary-light border border-primary/30">
            Technology Track
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {category.name} Certifications
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Certifications in this Category */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Available Vouchers in {category.name} ({matchingCerts.length})
          </h2>
          <Link
            href="/certifications"
            className="text-xs font-semibold text-primary-light hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Full Catalog
          </Link>
        </div>

        {matchingCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingCerts.map((cert) => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center border border-[#1F2B47] space-y-4">
            <BookOpen className="w-8 h-8 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Vouchers currently restocking</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              We are finalizing authorized distributor allocations for upcoming exams in this track. 
              Check our full catalog or contact candidate support for advance inquiries.
            </p>
            <Link
              href="/certifications"
              className="inline-block px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-glow"
            >
              Browse Available Certifications
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
