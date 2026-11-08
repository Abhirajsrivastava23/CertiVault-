import React from 'react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs text-gray-400">
          Last Revised: November 8, 2026 • CertiVault Technologies Pvt. Ltd.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#1F2B47] space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing the CertiVault website, purchasing examination vouchers, or creating a candidate account, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Nature of Platform & Trademark Disclaimers</h2>
          <p>
            CertiVault is an independent reseller of authorized examination vouchers. All product names, logos, brands, trademarks, and registered trademarks (including but not limited to Microsoft, AWS, Google Cloud, Cisco, CompTIA, Nutanix, and Pearson VUE) are property of their respective owners. Their use on this platform is solely for nominative purposes to accurately identify the official examinations and testing programs for which our vouchers are redeemable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. User Accounts & Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account. CertiVault employs masking and audit logging for voucher code security; you must never share revealed voucher credentials with unauthorized third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Pricing, Taxes & Payment Verification</h2>
          <p>
            All prices are denominated in Indian Rupees (INR) and are subject to change without prior notice based on currency fluctuations and supplier rate adjustments. However, once an order is created and paid, the price is guaranteed. Payments are processed via encrypted third-party payment gateways (Razorpay). CertiVault reserves the right to cancel orders flagged as fraudulent by payment risk algorithms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Voucher Validity & Exam Scheduling</h2>
          <p>
            Vouchers must be redeemed and exams must be taken prior to the explicit expiration date assigned to each voucher. Testing sponsors do not allow expiration date extensions. Scheduling policies, appointment rescheduling fees, and test center rules are governed strictly by the respective certification sponsor (e.g. Pearson VUE candidate agreement).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">6. Governing Law & Dispute Jurisdiction</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka, India for the resolution of any disputes.
          </p>
        </section>

      </div>

    </div>
  );
}
