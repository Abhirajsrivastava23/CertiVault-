'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Clock, CheckCircle2, Zap, AlertCircle, ShoppingCart } from 'lucide-react';
import { Certification } from '@/lib/types';
import { formatInr, calculateDiscount } from '@/lib/utils/formatters';
import { Button } from '../ui/Button';

export interface VoucherPurchaseCardProps {
  certification: Certification;
}

export function VoucherPurchaseCard({ certification }: VoucherPurchaseCardProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const discount = calculateDiscount(certification.retailPriceInr, certification.voucherPriceInr);
  const inStock = certification.stockCount > 0;

  const unitPrice = certification.voucherPriceInr;
  const subtotal = unitPrice * quantity;
  const taxAmount = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + taxAmount;

  const handleCheckout = () => {
    router.push(`/checkout?certId=${certification.id}&qty=${quantity}`);
  };

  return (
    <div className="sticky top-24 rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xl space-y-6">
      {/* Pricing Header */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Official Testing Voucher</span>
          <span className="font-mono text-primary-light font-medium">{certification.examCode}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {formatInr(unitPrice)}
          </span>
          {certification.retailPriceInr > unitPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatInr(certification.retailPriceInr)}
            </span>
          )}
        </div>
        {discount > 0 && (
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2.5 py-1 rounded-md">
            <span>Special Marketplace Price: Save {discount}%</span>
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-surface-200 border border-surface-border">
        <span className="text-slate-400">Inventory Status:</span>
        <span className={`font-semibold flex items-center gap-1.5 ${inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
          <span className={`h-2 w-2 rounded-full ${inStock ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
          {inStock ? `In Stock (${certification.stockCount} vouchers)` : 'Temporarily Out of Stock'}
        </span>
      </div>

      {/* Quantity Selector */}
      {inStock && (
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">Quantity</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuantity(num)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  quantity === num
                    ? 'bg-primary text-white border-primary shadow-glow'
                    : 'bg-surface-200 text-slate-300 border-surface-border hover:border-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Summary Breakdown */}
      <div className="space-y-2 pt-3 border-t border-surface-border/60 text-xs text-slate-400">
        <div className="flex justify-between">
          <span>Voucher Subtotal ({quantity}x):</span>
          <span className="text-white font-medium">{formatInr(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated GST (18%):</span>
          <span className="text-white font-medium">{formatInr(taxAmount)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-surface-border/50">
          <span>Total Amount:</span>
          <span className="text-primary-light text-base">{formatInr(totalAmount)}</span>
        </div>
      </div>

      {/* Instant Checkout Action */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleCheckout}
        disabled={!inStock}
        className="w-full shadow-glow text-sm font-semibold gap-2"
      >
        <Zap className="h-4 w-4" />
        <span>Buy Voucher Now</span>
      </Button>

      {/* Delivery & Security Guarantee List */}
      <div className="space-y-2.5 pt-4 border-t border-surface-border/60 text-xs text-slate-300">
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-primary-light shrink-0 mt-0.5" />
          <span>
            <strong>12-Month Validity:</strong> You have 365 days from purchase date to schedule and sit your exam.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Instant Digital Delivery:</strong> Automatically allocated to your encrypted dashboard vault upon payment.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
          <span>
            <strong>Region Applicable:</strong> {certification.availableRegions.join(', ')} (Pearson VUE / official testing centers).
          </span>
        </div>
      </div>
    </div>
  );
}

