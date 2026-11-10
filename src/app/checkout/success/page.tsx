'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShieldCheck, KeyRound, ShoppingBag, ArrowRight, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'CV-2026-CONFIRMED';
  const orderId = searchParams.get('orderId');

  return (
    <div className="py-16 bg-background min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        
        <div className="rounded-2xl border border-surface-border bg-surface-card p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          
          {/* Animated Success Badge */}
          <div className="h-16 w-16 rounded-full bg-emerald-950/70 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
              Payment Verified & Fulfilled
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
              Order Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Thank you for choosing CertiVault. Your certification voucher has been allocated to your private vault.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-4 rounded-xl bg-surface-200 border border-surface-border text-xs space-y-2 text-slate-400">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <strong className="text-white font-mono">{orderNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span>Fulfillment Status:</span>
              <span className="text-emerald-400 font-semibold">Digitally Delivered</span>
            </div>
            <div className="flex justify-between">
              <span>Voucher Security:</span>
              <span className="text-slate-300">Masked (Ready to Reveal)</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <Link href="/dashboard/vouchers" className="block w-full">
              <Button variant="primary" size="lg" className="w-full shadow-glow text-sm font-semibold gap-2">
                <KeyRound className="h-4 w-4" />
                <span>Go to My Vouchers Vault</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/dashboard/orders" className="block w-full">
              <Button variant="secondary" size="md" className="w-full text-xs gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>View Order Details & Invoice</span>
              </Button>
            </Link>
          </div>

          {/* Reassurance text */}
          <div className="pt-4 border-t border-surface-border text-[11px] text-slate-500 leading-relaxed">
            A confirmation receipt has also been dispatched to your email address. For your security, the voucher code remains safely protected in your vault until you reveal it.
          </div>

        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading order status...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

