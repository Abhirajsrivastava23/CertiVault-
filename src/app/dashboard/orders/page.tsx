'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, CheckCircle2, Clock, FileText, KeyRound } from 'lucide-react';
import { Order } from '@/lib/types';
import { formatInr, formatDate } from '@/lib/utils/formatters';
import { OrderStatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.data || []);
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Billing & Invoices
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            View transaction history, tax breakdowns, and payment confirmation receipts.
          </p>
        </div>
        <Link href="/certifications">
          <Button variant="secondary" size="sm" className="text-xs">
            Browse More Vouchers
          </Button>
        </Link>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading your order history...</div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-4 shadow-sm"
            >
              {/* Order Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-border/60 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-white">#{order.orderNumber}</span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="text-slate-400">
                  Placed on <strong className="text-slate-200">{formatDate(order.createdAt)}</strong>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[11px] font-semibold text-primary-light uppercase tracking-wider block">
                        {item.providerName}
                      </span>
                      <h4 className="text-sm font-semibold text-white mt-0.5">
                        {item.certificationName}
                      </h4>
                      <span className="text-slate-400 font-mono">Exam Code: {item.examCode} • Qty: {item.quantity}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white block">
                        {formatInr(item.totalPriceInr)}
                      </span>
                      <span className="text-[11px] text-slate-500">Unit: {formatInr(item.unitPriceInr)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Footer Actions */}
              <div className="pt-3 border-t border-surface-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 flex items-center gap-4">
                  <span>Method: <strong className="text-slate-200">{order.paymentMethod || 'Razorpay Gateway'}</strong></span>
                  <span>GST (18%): <strong className="text-slate-200">{formatInr(order.taxAmountInr)}</strong></span>
                  <span>Total: <strong className="text-primary-light text-sm font-bold">{formatInr(order.totalAmountInr)}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/dashboard/vouchers">
                    <Button variant="primary" size="sm" className="text-xs shadow-glow gap-1.5">
                      <KeyRound className="h-3.5 w-3.5" />
                      <span>Access Purchased Vouchers</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-surface-border bg-surface-card space-y-4">
          <div className="h-12 w-12 rounded-full bg-surface-50 text-slate-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No orders placed yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Once you purchase an authorized exam voucher, your transaction receipts and invoices will be permanently recorded here.
          </p>
          <Link href="/certifications">
            <Button variant="primary" size="md">Browse Certifications</Button>
          </Link>
        </div>
      )}

    </div>
  );
}

