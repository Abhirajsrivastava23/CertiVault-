import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
            Legal Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: November 2026 • Governing platform use and voucher purchases.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing, browsing, or purchasing from CertiVault (operating as CertiVault Technologies Pvt. Ltd.), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy and Digital Delivery Policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Role as an Authorized Marketplace</h2>
            <p>
              CertiVault acts as an authorized commercial marketplace for IT certification exam vouchers. CertiVault is an independent reseller and does not own, administer, grade, or set the academic passing criteria for vendor exams (such as Microsoft, Amazon Web Services, Google Cloud, Cisco Systems, or CompTIA). All trademarks, logos, and service marks belong exclusively to their respective owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Candidate Responsibilities</h2>
            <p>As a certification voucher purchaser, you agree that:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>You must maintain an active candidate profile with the respective test delivery provider (e.g. Pearson VUE, PSI, or Webassessor).</li>
              <li>You are solely responsible for scheduling and taking the examination prior to the voucher expiration date (12 months from issuance).</li>
              <li>You will adhere to all official exam publisher non-disclosure agreements (NDAs) and candidate conduct policies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Prohibition of Voucher Resale or Piracy</h2>
            <p>
              Vouchers purchased on CertiVault are licensed for the specific purchaser or their designated corporate team member. You may not re-auction, resell, or distribute vouchers on public forums, auction platforms, or social media groups. Any violation will result in immediate voiding of the code without refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Limitation of Liability</h2>
            <p>
              CertiVault’s total aggregate liability arising out of or related to any voucher purchase shall not exceed the total amount paid by the customer for the specific voucher in question.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
