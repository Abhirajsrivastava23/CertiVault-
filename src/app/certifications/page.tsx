'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { PROVIDERS } from '@/lib/data/providers';
import { CATEGORIES } from '@/lib/data/categories';
import { CertificationCard } from '@/components/certifications/CertificationCard';
import { CertificationFilters } from '@/components/certifications/CertificationFilters';
import { Button } from '@/components/ui/Button';

function CertificationsContent() {
  const searchParams = useSearchParams();

  // Initialize filters from URL query parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedProvider, setSelectedProvider] = useState(searchParams.get('provider') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter and sort logic
  const filteredCertifications = useMemo(() => {
    let result = [...CERTIFICATIONS];

    // Search query matching: name, code, provider, category, skills, career opportunities
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((cert) => 
        cert.name.toLowerCase().includes(q) ||
        cert.examCode.toLowerCase().includes(q) ||
        cert.providerName.toLowerCase().includes(q) ||
        cert.categoryName.toLowerCase().includes(q) ||
        cert.skillsCovered.some(s => s.toLowerCase().includes(q)) ||
        cert.careerOpportunities.some(o => o.toLowerCase().includes(q))
      );
    }

    // Provider filter
    if (selectedProvider !== 'all') {
      result = result.filter((cert) => 
        cert.providerSlug === selectedProvider || cert.providerId === selectedProvider
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((cert) => 
        cert.categorySlug === selectedCategory || cert.categoryId === selectedCategory
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      result = result.filter((cert) => cert.difficultyLevel === selectedDifficulty);
    }

    // Stock availability filter
    if (inStockOnly) {
      result = result.filter((cert) => cert.stockCount > 0);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.voucherPriceInr - b.voucherPriceInr);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.voucherPriceInr - a.voucherPriceInr);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Featured first
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedProvider, selectedCategory, selectedDifficulty, sortBy, inStockOnly]);

  const totalPages = Math.ceil(filteredCertifications.length / itemsPerPage);
  const paginatedCertifications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCertifications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCertifications, currentPage, itemsPerPage]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedProvider('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('featured');
    setInStockOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="border-b border-surface-border pb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Authorized Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Certification Voucher Marketplace
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Explore authentic certification vouchers from top industry publishers. All vouchers are verified, pre-allocated, and digitally delivered instantly upon payment verification.
          </p>
        </div>

        {/* Filter Controls Component */}
        <CertificationFilters
          providers={PROVIDERS}
          categories={CATEGORIES}
          searchQuery={searchQuery}
          onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
          selectedProvider={selectedProvider}
          onProviderChange={(p) => { setSelectedProvider(p); setCurrentPage(1); }}
          selectedCategory={selectedCategory}
          onCategoryChange={(c) => { setSelectedCategory(c); setCurrentPage(1); }}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={(d) => { setSelectedDifficulty(d); setCurrentPage(1); }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

        {/* Results Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing <strong className="text-white">{filteredCertifications.length}</strong> certification{filteredCertifications.length === 1 ? '' : 's'}
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
              className="rounded bg-surface-200 border-surface-border text-primary focus:ring-primary h-4 w-4"
            />
            <span className="text-slate-300">Show only vouchers currently in stock</span>
          </label>
        </div>

        {/* Certifications Grid */}
        {paginatedCertifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCertifications.map((cert) => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl border border-surface-border bg-surface-card space-y-4">
            <div className="h-12 w-12 rounded-full bg-surface-50 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">No certifications match your filters</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search keywords, clearing provider/category filters, or resetting filters to view all vouchers.
            </p>
            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </Button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-glow'
                      : 'bg-surface-card text-slate-400 hover:text-white border border-surface-border'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading certification catalog...</div>}>
      <CertificationsContent />
    </Suspense>
  );
}
