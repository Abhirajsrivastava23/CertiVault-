import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/types';
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

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-sky-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-cyan-400" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6 text-indigo-400" />;
      case 'Database':
        return <Database className="w-6 h-6 text-blue-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-teal-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-violet-400" />;
      case 'HardDrive':
        return <HardDrive className="w-6 h-6 text-rose-400" />;
      default:
        return <Cloud className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group border border-[#1F2B47] block"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-[#162035] border border-[#253556] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
          {getIcon(category.iconName)}
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-primary-light transition-colors mb-2">
          {category.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-primary-light pt-2 border-t border-[#1F2B47]/60">
        <span>{category.certCount ? `${category.certCount}+ Certifications` : 'Explore Track'}</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
