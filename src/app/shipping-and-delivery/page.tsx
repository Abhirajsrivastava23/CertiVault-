import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, KeyRound, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ShippingAndDeliveryPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 border-b border-surface-border pb-6">
          <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors mb-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Fulfillment Guidelines
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Digital Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: November 2026 • Effective for all CertiVault transactions.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Zap className="h-4 w-4 text-primary-light" />
              <span>100% Digital Delivery — Zero Physical Freight</span>
            </div>
            <p className="text-xs text-slate-300">
              CertiVault exclusively provides digital certification vouchers. No physical cards, discs, paper vouchers, or boxed merchandise will be shipped to your postal address.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Instant Automated Fulfillment Protocol</h2>
            <p>
              Upon successful cryptographic verification of your payment via our Razorpay integration, our backend server automatically invokes an atomic inventory allocation procedure:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <strong>Immediate Allocation:</strong> A genuine, pre-validated voucher code is reserved from our private database schema (<code>private.voucher_inventory</code>) and permanently assigned to your authenticated account.
              </li>
              <li>
                <strong>Confirmation Dispatch:</strong> An electronic transaction receipt and invoice are dispatched immediately to your registered billing email address via Resend.
              </li>
              <li>
                <strong>Instant Vault Availability:</strong> Your voucher record appears instantly in your customer dashboard under <Link href="/dashboard/vouchers" className="text-primary-light underline font-medium">My Vouchers</Link>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Voucher Masking & Reveal Security</h2>
            <p>
              To safeguard your single-use financial credential against unauthorized browser extensions, shoulder surfing, or compromised shared devices:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>Voucher codes are masked by default (e.g., <code>••••-••••-••••-9821</code>).</li>
              <li>The complete plaintext code is only fetched on-demand when you click &ldquo;Secure Reveal Voucher&rdquo; while logged into your verified account.</li>
              <li>Each reveal request logs an audit timestamp and IP hash in our internal database for fraud prevention.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Inventory Availability & Backorders</h2>
            <p>
              CertiVault enforces real-time server-side stock checks. Customers cannot place an order for a voucher unless genuine inventory is active in our database. In the rare event of concurrent transactions creating a momentary race condition, our automated replenishment queue fulfills the allocation within 2 to 4 business hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Delivery Support Assistance</h2>
            <p>
              If your payment was debited but you experience any delay in seeing your allocated voucher inside your dashboard, please open a ticket immediately via our <Link href="/dashboard/support" className="text-primary-light underline">Support Desk</Link> with your Razorpay payment ID for instant reconciliation.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
