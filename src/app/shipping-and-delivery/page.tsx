import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ShippingAndDeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Delivery Policy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Digital Delivery & Fulfillment Policy
        </h1>
        <p className="text-xs text-gray-400">
          Last Updated: November 2026 • CertiVault Technologies Pvt. Ltd.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#1F2B47] space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
        
        {/* Important Notice Callout */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-xs text-primary-light space-y-2">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Zap className="w-5 h-5 text-primary-light" />
            100% Digital Delivery Notice
          </div>
          <p className="leading-relaxed">
            CertiVault sells intangible digital examination vouchers only. No physical package, disc, 
            or printed card is shipped by courier or postal mail. Delivery occurs digitally through 
            your verified CertiVault Customer Dashboard and via email confirmation.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Delivery Timeline & Automation</h2>
          <p>
            Vouchers are processed and allocated through our automated inventory management pipeline. 
            Under normal operating conditions, your voucher code is allocated <strong>instantaneously</strong> 
            (typically within 30 to 90 seconds) following confirmed authorization and payment verification from our payment gateway (Razorpay).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Inventory Availability & Verification</h2>
          <p>
            Delivery is subject to verified inventory availability in our secure vault. In the rare event that an item is ordered during a high-concurrency stock replenishment window:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
            <li>Our backend prevents overselling by locking available vouchers during active checkout sessions.</li>
            <li>If an unexpected supplier sync delay occurs, allocation will be finalized within 2 to 4 business hours.</li>
            <li>If inventory cannot be fulfilled within 24 hours, an automatic 100% refund is initiated back to the original payment source.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. Accessing Your Purchased Vouchers</h2>
          <p>
            Upon successful checkout:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400">
            <li>Log in to your account at <Link href="/dashboard" className="text-primary-light underline">certivault.in/dashboard</Link>.</li>
            <li>Navigate to the <strong>My Vouchers</strong> tab.</li>
            <li>For security against unauthorized browser extraction, voucher codes are initially masked (e.g. CV-••••-••••-9821).</li>
            <li>Click <strong>&quot;Reveal Voucher Code&quot;</strong> to view your unmasked voucher and official Pearson VUE / Kryterion redemption instructions.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Regional Restrictions & Candidate Responsibility</h2>
          <p>
            Each voucher is designated for specific geographic testing regions (e.g., India/South Asia or Global). Candidates are strictly responsible for confirming that their examination account address and chosen test center conform to the regional eligibility explicitly stated on the certification product page prior to completing purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Delivery Support</h2>
          <p>
            If you have completed payment but do not see your voucher within 10 minutes in your dashboard, please open a support request at <Link href="/support" className="text-primary-light underline">certivault.in/support</Link> with your order number, or email <a href="mailto:support@certivault.in" className="text-primary-light underline">support@certivault.in</a>.
          </p>
        </section>

      </div>

    </div>
  );
}
