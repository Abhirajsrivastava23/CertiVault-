'use client';

import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { Provider, Category, DifficultyLevel } from '@/lib/types';
import { Button } from '../ui/Button';

export interface CertificationFiltersProps {
  providers: Provider[];
  categories: Category[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedProvider: string;
  onProviderChange: (p: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (d: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  onReset: () => void;
}

export function CertificationFilters({
  providers,
  categories,
  searchQuery,
  onSearchChange,
  selectedProvider,
  onProviderChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
  onReset,
}: CertificationFiltersProps) {
  const difficulties: Array<DifficultyLevel | 'all'> = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedProvider !== 'all' || 
    selectedCategory !== 'all' || 
    selectedDifficulty !== 'all' ||
    sortBy !== 'featured';

  return (
    <div className="rounded-xl border border-surface-border bg-surface-card p-4 sm:p-5 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by certification name, exam code (e.g. AZ-900, SAA-C03), provider, or skills..."
          className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-200 border border-surface-border text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Dropdown Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Provider */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Provider</label>
          <select
            value={selectedProvider}
            onChange={(e) => onProviderChange(e.target.value)}
            className="w-full h-9 rounded-lg bg-surface-200 border border-surface-border text-xs text-white px-3 focus:outline-none focus:border-primary"
          >
            <option value="all">All Providers ({providers.length})</option>
            {providers.map((p) => (
              <option key={p.id} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full h-9 rounded-lg bg-surface-200 border border-surface-border text-xs text-white px-3 focus:outline-none focus:border-primary"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full h-9 rounded-lg bg-surface-200 border border-surface-border text-xs text-white px-3 focus:outline-none focus:border-primary"
          >
            <option value="all">All Difficulty Levels</option>
            {difficulties.filter(d => d !== 'all').map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full h-9 rounded-lg bg-surface-200 border border-surface-border text-xs text-white px-3 focus:outline-none focus:border-primary"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Active Filter Pills & Reset */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-surface-border/50 flex items-center justify-between">
          <span className="text-xs text-slate-400">Filters active</span>
          <button
            onClick={onReset}
            className="text-xs text-primary-light hover:underline flex items-center gap-1 font-medium"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

