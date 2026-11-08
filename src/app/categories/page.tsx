import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data/categories';
import { CategoryCard } from '@/components/cards/CategoryCard';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Career Disciplines
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Browse by Technology Domain
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Target your IT certification path by specialized domain. From hyperscale cloud architectures 
          and defensive cybersecurity to enterprise networking and container orchestration.
        </p>
      </div>

      {/* Grid of All 10 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

    </div>
  );
}
