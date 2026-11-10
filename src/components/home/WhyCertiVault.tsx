import React from 'react';
import { ShieldCheck, Lock, DollarSign, Calendar, BookOpen, Headset } from 'lucide-react';

export function WhyCertiVault() {
  const points = [
    {
      title: 'Authorized Reseller Integrity',
      description: 'We source solely from certified publisher distributor networks. Every voucher is 100% valid for official Pearson VUE, PSI, or Kryterion exam appointments.',
      icon: ShieldCheck,
    },
    {
      title: 'Encrypted Single-Use Vault',
      description: 'Your voucher codes are protected in private, restricted database tables. Vouchers remain masked until revealed by you inside your authenticated account.',
      icon: Lock,
    },
    {
      title: 'Transparent Pricing in INR',
      description: 'Avoid foreign transaction fees, credit card international cross-border charges, and volatile USD-INR conversion rates. Pay standard Indian Rupee prices.',
      icon: DollarSign,
    },
    {
      title: '365-Day Exam Validity',
      description: 'Our vouchers offer generous 12-month validity windows, giving you ample time to study, take practice exams, and schedule your test when ready.',
      icon: Calendar,
    },
    {
      title: 'Verified Preparation Guidance',
      description: 'Every certification detail page includes authentic syllabus breakdowns, domain weights, official documentation links, and structured milestone roadmaps.',
      icon: BookOpen,
    },
    {
      title: 'Dedicated Customer Support',
      description: 'Our support team is available via responsive dashboard ticketing to answer scheduling questions, registration issues, or voucher queries.',
      icon: Headset,
    },
  ];

  return (
    <section className="py-20 bg-navy-900 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Engineered For Trust
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Why Choose CertiVault
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Built from the ground up to eliminate certification procurement friction for independent professionals, students, and corporate IT teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="rounded-xl border border-surface-border bg-surface-card p-6 hover:border-primary/40 transition-all duration-200"
              >
                <div className="h-10 w-10 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-primary-light mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{pt.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

