import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RefundPolicyPage() {
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
            Customer Guarantee
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: November 2026 • Governing all certification voucher orders.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Validity Guarantee</span>
            </div>
            <p className="text-xs text-slate-300">
              CertiVault warrants that every voucher code sold on our platform is authentic, active, and redeemable on the designated testing partner’s official registration portal (e.g. Pearson VUE, PSI, or Webassessor).
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Nature of Digital Vouchers</h2>
            <p>
              IT certification vouchers are single-use, confidential digital license keys. Once a voucher code has been revealed or viewed in plaintext, it functions as bearer tender and cannot be retracted, canceled, or resold to another candidate.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Eligible Refund Conditions</h2>
            <p>A full refund or replacement will be provided under the following verified conditions:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <strong>Unrevealed Code Cancellation:</strong> If your purchased voucher has NOT been revealed in your dashboard and you request cancellation within 48 hours of purchase.
              </li>
              <li>
                <strong>Technical Rejection:</strong> If a voucher code is rejected by the official testing center portal upon first attempt and our support desk confirms an authorization discrepancy.
              </li>
              <li>
                <strong>Duplicate Billing:</strong> In the event of duplicate charges resulting from payment gateway anomalies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Non-Refundable Scenarios</h2>
            <p>Refunds cannot be issued for:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>Vouchers where the code has already been revealed in your customer dashboard vault.</li>
              <li>Vouchers that have expired after the 12-month validity window due to candidate inaction.</li>
              <li>Failure to attend a scheduled exam appointment (&ldquo;No-show&rdquo;).</li>
              <li>Unsuccessful exam attempts (failing the test does not qualify for a voucher refund or retest waiver).</li>
              <li>Candidate changing their career pathway after revealing the voucher code.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Refund Processing Timeline</h2>
            <p>
              Approved refunds are credited directly back to the original source payment method (UPI account, bank account, or card) via Razorpay within 5 to 7 business days, in compliance with Reserve Bank of India (RBI) guidelines.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
