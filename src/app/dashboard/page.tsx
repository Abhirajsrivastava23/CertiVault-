'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  KeyRound, 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  LifeBuoy, 
  CreditCard,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Order, VoucherItem } from '@/lib/types';
import { formatInr, formatDate } from '@/lib/utils/formatters';
import { OrderStatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function DashboardOverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [ordersRes, vouchersRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/vouchers/list'),
        ]);

        const ordersData = await ordersRes.json();
        const vouchersData = await vouchersRes.json();

        if (ordersData.success) setOrders(ordersData.data || []);
        if (vouchersData.success) setVouchers(vouchersData.data || []);
      } catch (err) {
        console.error('Failed to load dashboard overview data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalSpent = orders
    .filter(o => o.status === 'fulfilled' || o.status === 'paid')
    .reduce((acc, o) => acc + o.totalAmountInr, 0);

  const activeVouchers = vouchers.filter(v => v.status !== 'disabled');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Customer Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Welcome back, Alex Morgan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your purchased certification vouchers, orders, and Pearson VUE scheduling guides.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/certifications">
            <Button variant="primary" size="sm" className="shadow-glow gap-1.5 text-xs">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Browse Marketplace</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-xl border border-surface-border bg-surface-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Purchased Vouchers</span>
            <KeyRound className="h-4 w-4 text-primary-light" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {vouchers.length}
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            {activeVouchers.length} active for scheduling
          </div>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Orders</span>
            <ShoppingBag className="h-4 w-4 text-accent-light" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {orders.length}
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium">
            100% fulfilled digitally
          </div>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Value Secured</span>
            <CreditCard className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {formatInr(totalSpent)}
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Zero currency fees
          </div>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Vault Security</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            Active
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Codes masked by default
          </div>
        </div>
      </div>

      {/* Security Action Banner */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-radial from-surface-100 to-navy-950 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary-light font-bold text-sm">
            <KeyRound className="h-4 w-4" />
            <span>Ready to book your exam appointment?</span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Voucher codes are masked by default to protect single-use credentials. Visit your Voucher Vault to securely reveal your code when you are ready to book on Pearson VUE.
          </p>
        </div>
        <Link href="/dashboard/vouchers" className="shrink-0">
          <Button variant="primary" size="md" className="shadow-glow gap-1.5 text-xs font-semibold">
            <span>Open Voucher Vault</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Orders</h3>
            <Link href="/dashboard/orders" className="text-xs text-primary-light hover:underline font-medium">
              View All ({orders.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-surface-border bg-surface-card p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-white">#{order.orderNumber}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="text-xs text-slate-300">
                    {order.items.map(i => `${i.certificationName} (${i.examCode})`).join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {formatDate(order.createdAt)} • {order.paymentMethod || 'Razorpay'}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-white block">
                    {formatInr(order.totalAmountInr)}
                  </span>
                  <Link href="/dashboard/orders" className="text-[11px] text-primary-light hover:underline">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Helper Tools (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-white">Certification Quick Actions</h3>
          
          <div className="space-y-3">
            <Link
              href="/career-finder"
              className="rounded-xl border border-surface-border bg-surface-card p-4 hover:border-primary/40 flex items-start gap-3 transition-colors block"
            >
              <div className="h-9 w-9 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-accent-light shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Career Finder Recommendation</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Explore our rule-based pathways to plan your next certification milestone.</p>
              </div>
            </Link>

            <Link
              href="/dashboard/support"
              className="rounded-xl border border-surface-border bg-surface-card p-4 hover:border-primary/40 flex items-start gap-3 transition-colors block"
            >
              <div className="h-9 w-9 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-primary-light shrink-0">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Redemption Support Desk</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Need help applying your voucher on Pearson VUE? Create a ticket for our team.</p>
              </div>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
