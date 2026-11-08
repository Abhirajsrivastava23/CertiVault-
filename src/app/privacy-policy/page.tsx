import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Privacy Notice
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-400">
          Last Updated: November 8, 2026 • CertiVault Technologies Pvt. Ltd.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#1F2B47] space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
          <p>
            When you register an account, make a purchase, or submit a candidate support inquiry on CertiVault, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
            <li><strong>Personal Identification Data:</strong> Full name, email address, mobile phone number, and optional organization/company name.</li>
            <li><strong>Transaction Records:</strong> Order identifiers, purchased certification IDs, timestamps, payment gateway transaction references, and billing amounts. We <em>do not</em> store credit card numbers, CVVs, or net banking passwords; all sensitive financial data is processed directly by PCI-DSS Level 1 compliant gateways (Razorpay).</li>
            <li><strong>Security & Audit Logs:</strong> Timestamps of voucher code reveals and IP addresses for fraud defense.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. How We Use Your Information</h2>
          <p>
            We process your data strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
            <li>Allocate and deliver examination vouchers into your secure customer dashboard.</li>
            <li>Send order confirmation invoices and crucial expiry notification reminders.</li>
            <li>Verify customer identity during voucher reveal requests to prevent unauthorized account access.</li>
            <li>Resolve customer support tickets and communicate official exam updates.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. Data Sharing & Third Parties</h2>
          <p>
            We never sell, rent, or monetize candidate personal information. Data is shared exclusively with necessary infrastructure processors:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
            <li><strong>Razorpay:</strong> To process secure UPI, card, and net banking payments.</li>
            <li><strong>Supabase:</strong> For encrypted database storage, authentication, and Row Level Security isolation.</li>
            <li><strong>Resend:</strong> For transactional email confirmations and delivery notifications.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Data Security Safeguards</h2>
          <p>
            CertiVault implements enterprise-grade technical safeguards including end-to-end TLS 1.3 encryption, database Row Level Security (RLS) separating customer records, and separate private database schemas preventing public leakage of voucher inventory.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Your Rights & Contact</h2>
          <p>
            You have the right to request a copy of your personal data, update your contact information, or request account closure. For privacy inquiries, please email our Data Protection Officer at <a href="mailto:privacy@certivault.in" className="text-primary-light underline">privacy@certivault.in</a>.
          </p>
        </section>

      </div>

    </div>
  );
}
