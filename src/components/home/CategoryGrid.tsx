import React from 'react';
import Link from 'next/link';
import { 
  Cloud, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Network, 
  GitBranch, 
  Database, 
  Server, 
  Layers, 
  HardDrive,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';

export function CategoryGrid() {
  const iconMap: Record<string, React.ElementType> = {
    Cloud,
    Sparkles,
    Cpu,
    ShieldCheck,
    Network,
    GitBranch,
    Database,
    Server,
    Layers,
    HardDrive,
  };

  return (
    <section className="py-16 bg-navy-900 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Career Specializations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Browse by Career Category
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Target specific technological domains aligned with your team’s strategic goals or your personal career advancement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.iconName] || Cloud;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group rounded-xl border border-surface-border bg-surface-card p-5 hover:border-primary/40 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-primary-light group-hover:scale-110 transition-transform mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-border/50 flex items-center justify-between text-xs text-slate-400 group-hover:text-primary-light">
                  <span className="font-medium">{category.certCount} credentials</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

