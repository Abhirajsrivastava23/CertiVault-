import React from 'react';
import Link from 'next/link';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Commercial Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs text-gray-400">
          Effective Date: November 8, 2026 • CertiVault Technologies Pvt. Ltd.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#1F2B47] space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
        
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Standard Non-Refundability of Intangible Digital Vouchers
          </div>
          <p className="leading-relaxed">
            Due to the nature of cryptographic, single-use examination vouchers which cannot be re-inventoried once allocated or exposed, <strong>all sales are final once an unmasked voucher code has been revealed or accessed in your dashboard</strong>, in accordance with official testing sponsor policies.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Eligible Circumstances for Full Refund</h2>
          <p>CertiVault will honor a 100% refund under the following conditions:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
            <li><strong>Non-Fulfillment:</strong> If a technical failure or supplier inventory outage prevents allocation of your purchased voucher within 24 hours of successful payment.</li>
            <li><strong>Duplicate Charges:</strong> In the event of an inadvertent double deduction by the payment gateway for a single order.</li>
            <li><strong>Defective Code:</strong> If a voucher code is confirmed by the testing sponsor (Pearson VUE, Webassessor) as invalid or previously consumed prior to your purchase timestamp. Claims must be submitted within 7 days of purchase and include the official Pearson VUE error screenshot.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Ineligible Circumstances</h2>
          <p>Refunds and cancellations will not be granted under the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
            <li>Change of mind after payment has been verified and voucher has been revealed.</li>
            <li>Purchasing the incorrect exam code or level (e.g. purchasing AZ-900 instead of AZ-104).</li>
            <li>Failure to sit for an exam before the clearly stated expiration date.</li>
            <li>Failure to pass an examination (vouchers cover exam sitting fees and do not guarantee passing).</li>
            <li>Purchasing a voucher for an ineligible geographic test region due to failure to read product specifications.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. Refund Processing Timeline</h2>
          <p>
            Approved refunds are credited back to the original payment instrument (UPI, Debit/Credit Card, or Net Banking bank account) through Razorpay within 5 to 7 standard business days, in compliance with RBI guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Filing a Refund Request</h2>
          <p>
            To submit a claim, please open a ticket at <Link href="/support" className="text-primary-light underline">certivault.in/support</Link> with subject &quot;Refund Request: [Order Number]&quot; and provide your transaction receipt.
          </p>
        </section>

      </div>

    </div>
  );
}
