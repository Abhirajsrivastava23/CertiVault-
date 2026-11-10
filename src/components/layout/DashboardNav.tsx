'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, KeyRound, LifeBuoy, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function DashboardNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Vouchers', href: '/dashboard/vouchers', icon: KeyRound },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Support Tickets', href: '/dashboard/support', icon: LifeBuoy },
    { name: 'Profile & Settings', href: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="border-b border-surface-border bg-surface-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = pathname === tab.href;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                  isCurrent
                    ? 'bg-primary/10 text-primary-light border border-primary/20'
                    : 'text-slate-400 hover:text-white hover:bg-surface-50'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

