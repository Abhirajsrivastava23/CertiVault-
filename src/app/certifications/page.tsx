'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  SlidersHorizontal,
  ChevronDown,
  BookOpen,
  Check
} from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { PROVIDERS } from '@/lib/data/providers';
import { CATEGORIES } from '@/lib/data/categories';
import { CertificationCard } from '@/components/cards/CertificationCard';
import { DifficultyLevel } from '@/lib/types';

function CertificationsCatalog() {
  const searchParams = useSearchParams();
  
  // URL parameters initialization
  const initialSearch = searchParams.get('search') || '';
  const initialProvider = searchParams.get('provider') || 'all';
  const initialCategory = searchParams.get('category') || 'all';
  const initialLevel = searchParams.get('level') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [selectedProvider, setSelectedProvider] = useState(initialProvider);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [maxPrice, setMaxPrice] = useState<number>(35000); // in Rupees
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Multi-attribute filtering logic
  const filteredCertifications = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      // 1. Search Query (name, examCode, skills, purpose, targetAudience)
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const matchesName = cert.name.toLowerCase().includes(query);
        const matchesCode = cert.examCode.toLowerCase().includes(query);
        const matchesProvider = cert.providerName.toLowerCase().includes(query);
        const matchesSkills = cert.skillsCovered.some(s => s.toLowerCase().includes(query));
        const matchesAudience = cert.targetAudience.some(a => a.toLowerCase().includes(query));
        if (!matchesName && !matchesCode && !matchesProvider && !matchesSkills && !matchesAudience) {
          return false;
        }
      }

      // 2. Provider Filter
      if (selectedProvider !== 'all' && cert.providerSlug !== selectedProvider) {
        return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'all' && cert.categorySlug !== selectedCategory) {
        return false;
      }

      // 4. Level Filter
      if (selectedLevel !== 'all' && cert.difficultyLevel !== selectedLevel) {
        return false;
      }

      // 5. Price Filter (converted from paise)
      const priceRupees = cert.voucherPriceInr / 100;
      if (priceRupees > maxPrice) {
        return false;
      }

      // 6. Availability Filter
      if (onlyInStock && cert.stockCount <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.voucherPriceInr - b.voucherPriceInr;
      }
      if (sortBy === 'price-high') {
        return b.voucherPriceInr - a.voucherPriceInr;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [search, selectedProvider, selectedCategory, selectedLevel, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedProvider('all');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setMaxPrice(35000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    search !== '' || 
    selectedProvider !== 'all' || 
    selectedCategory !== 'all' || 
    selectedLevel !== 'all' || 
    maxPrice < 35000 || 
    onlyInStock;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Certification Marketplace
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Explore legitimate, authorized examination vouchers across Microsoft, AWS, Google Cloud, 
          Cisco, CompTIA, and Nutanix. Filter by provider, difficulty level, and career domains.
        </p>
      </div>

      {/* Search & Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111827] border border-[#1F2B47] rounded-2xl p-3">
        {/* Search input */}
        <div className="relative flex-1 flex items-center">
          <Search className="w-4 h-4 text-gray-400 ml-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search certification name, exam code (e.g. SAA-C03), skills..."
            className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="p-1 mr-2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141B2D] border border-[#1F2B47] text-xs font-semibold text-gray-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-light" />
            <span>Filters {hasActiveFilters ? '•' : ''}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141B2D] border border-[#1F2B47] text-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 glass-card rounded-2xl p-6 border border-[#1F2B47] sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-[#1F2B47]/60">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary-light" />
              Filter Catalog
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-primary-light hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Provider Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Provider</label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full bg-[#141B2D] border border-[#1F2B47] text-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
            >
              <option value="all">All Providers</option>
              {PROVIDERS.map((p) => (
                <option key={p.id} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Career Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#141B2D] border border-[#1F2B47] text-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Difficulty Level</label>
            <div className="space-y-1.5 pt-1">
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedLevel === lvl
                      ? 'bg-primary/20 text-primary-light border border-primary/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#162035]'
                  }`}
                >
                  <span>{lvl === 'all' ? 'All Levels' : lvl}</span>
                  {selectedLevel === lvl && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-2 border-t border-[#1F2B47]/60">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-gray-300 uppercase tracking-wider">Max Price</label>
              <span className="font-bold text-white">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="35000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>₹3,000</span>
              <span>₹35,000</span>
            </div>
          </div>

          {/* Stock Filter */}
          <div className="pt-2 border-t border-[#1F2B47]/60">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 text-primary focus:ring-0 bg-[#141B2D]"
              />
              <span>In-Stock Vouchers Only</span>
            </label>
          </div>
        </aside>

        {/* Certifications Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Showing <strong className="text-white">{filteredCertifications.length}</strong> certification vouchers</span>
            {hasActiveFilters && (
              <span className="text-primary-light">Filters applied</span>
            )}
          </div>

          {filteredCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredCertifications.map((cert) => (
                <CertificationCard key={cert.id} certification={cert} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center border border-[#1F2B47] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#162035] flex items-center justify-center mx-auto text-gray-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No certifications match your criteria</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Try widening your price range, clearing specific filters, or checking back soon as new inventory is added weekly.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-glow"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0D1527] border border-[#1F2B47] rounded-3xl p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1F2B47]">
              <h3 className="text-base font-bold text-white">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Provider */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full bg-[#141B2D] border border-[#1F2B47] text-gray-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="all">All Providers</option>
                {PROVIDERS.map((p) => (
                  <option key={p.id} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#141B2D] border border-[#1F2B47] text-gray-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Max Price</span>
                <span className="font-bold text-white">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="35000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="pt-4 border-t border-[#1F2B47] grid grid-cols-2 gap-3">
              <button
                onClick={resetFilters}
                className="py-2.5 rounded-xl border border-[#1F2B47] text-gray-300 font-semibold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="py-2.5 rounded-xl bg-primary text-white font-semibold text-xs shadow-glow"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CertificationsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
        Loading certification catalog...
      </div>
    }>
      <CertificationsCatalog />
    </Suspense>
  );
}
