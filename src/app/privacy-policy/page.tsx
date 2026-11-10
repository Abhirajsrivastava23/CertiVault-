import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            Data Protection
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: November 2026 • Compliant with Information Technology Act (India) and Global Data Protection Standards.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>Zero Selling of Customer Telemetry</span>
            </div>
            <p className="text-xs text-slate-300">
              CertiVault does not sell, rent, monetize, or trade your personal email addresses, phone numbers, or certification aspirations to third-party marketing brokers.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>To fulfill your certification orders and secure your voucher vault, we collect:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li><strong>Contact Information:</strong> Full name, verified email address, phone number, and company name (optional).</li>
              <li><strong>Payment Transaction Telemetry:</strong> Razorpay order ID, payment method, masked card last-4, and GST billing address. (We never store full card numbers or CVVs).</li>
              <li><strong>Account Security Telemetry:</strong> IP hash and timestamp upon voucher code reveal actions to detect unauthorized credential unmasking.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. How Your Information Is Used</h2>
            <p>Your data is processed strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>Authorizing and provisioning single-use exam vouchers to your dashboard vault.</li>
              <li>Transmitting transactional email receipts and Pearson VUE scheduling instructions via Resend.</li>
              <li>Complying with statutory GST tax obligations under Indian taxation law.</li>
              <li>Assisting you with support tickets regarding voucher redemption issues.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Row Level Security & Encryption Standards</h2>
            <p>
              All customer database tables are governed by strict Supabase PostgreSQL Row Level Security (RLS) policies. Only your authenticated user ID can view your orders, profile coordinates, and allocations. Raw voucher codes are isolated in a restricted private database schema (<code>private.voucher_inventory</code>) inaccessible to client queries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Data Retention & Deletion Rights</h2>
            <p>
              You have the right to request an export or deletion of your account profile at any time by contacting <code>privacy@certivault.in</code>. Transactional billing records will be archived in accordance with statutory accounting requirements.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
