'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  User, 
  Compass, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Info,
  ChevronRight,
  LogOut,
  ExternalLink
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track mock/authenticated session state
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Arun Patel',
    email: 'learner@certivault.in',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Categories', href: '/categories' },
    { name: 'Career Finder', href: '/career-finder' },
    { name: 'About', href: '/about' },
    { name: 'Support', href: '/support' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#0B1020]/90 backdrop-blur-md border-b border-[#1F2B47] shadow-lg shadow-black/20' 
          : 'bg-[#0B1020]/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Certi<span className="text-primary-light">Vault</span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden sm:inline-block">
                Authorized Vouchers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-white bg-[#1F2B47]/60 border border-primary/30 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#1A253E]/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Auth / Dashboard) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname.startsWith('/dashboard')
                      ? 'bg-primary text-white shadow-glow'
                      : 'bg-[#141B2D] text-gray-200 border border-[#1F2B47] hover:border-primary/50 hover:bg-[#1A253E]'
                  }`}
                >
                  <User className="w-4 h-4 text-primary-light" />
                  <span>My Dashboard</span>
                </Link>
                <button
                  onClick={() => setUser(null)}
                  title="Logout"
                  className="p-2 text-gray-400 hover:text-gray-200 hover:bg-[#1A253E] rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white shadow-glow transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A253E] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1F2B47] bg-[#0B1020]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.href)
                    ? 'text-white bg-primary/20 text-primary-light'
                    : 'text-gray-300 hover:text-white hover:bg-[#1A253E]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1F2B47] space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-primary text-white font-medium"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    My Dashboard
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setUser(null);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-gray-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg border border-[#1F2B47] text-gray-300 hover:text-white font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg bg-primary text-white font-medium text-sm shadow-glow"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
