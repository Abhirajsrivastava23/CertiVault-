'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  Layers, 
  Award 
} from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Free Vouchers', href: '/free-vouchers', badge: 'FREE' },
    { name: 'Categories', href: '/categories/cloud-computing' },
    { name: 'Career Finder', href: '/career-finder' },
    { name: 'About', href: '/about' },
    { name: 'Support', href: '/support' },
  ];

  // Admin secret shortcut: Press Shift + Control + D (or Cmd + Shift + D on Mac) to open Admin Dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.ctrlKey || e.metaKey;
      if (isModifier && e.shiftKey && (e.key.toLowerCase() === 'd' || e.code === 'KeyD')) {
        e.preventDefault();
        router.push('/admin/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-surface-border bg-navy-900/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Certi<span className="text-primary-light">Vault</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-wider uppercase text-slate-400 font-medium -mt-1">
                Authorized Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                  isActive(link.href)
                    ? 'text-white bg-surface-50 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-surface-50/50'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-extrabold rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* User Actions - "My Dashboard" button completely removed */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/certifications">
              <Button variant="primary" size="sm" className="shadow-glow">
                Explore Vouchers
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-surface-50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-navy-950 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.href)
                  ? 'text-white bg-surface-50 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-surface-50/50'
              }`}
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-extrabold rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-4 border-t border-surface-border flex flex-col gap-2.5">
            <Link href="/certifications" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Explore Vouchers
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
