import React from 'react';
import { Search, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Discover & Compare',
      description: 'Explore verified certification roadmaps, exam syllabus requirements, passing scores, and legitimate voucher prices for your target career role.',
      icon: Search,
      badge: 'Step 1: Explore',
    },
    {
      step: '02',
      title: 'Secure Checkout',
      description: 'Purchase with instant checkout in INR. We support UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking with zero conversion fees.',
      icon: CreditCard,
      badge: 'Step 2: Pay in INR',
    },
    {
      step: '03',
      title: 'Instant Secure Delivery',
      description: 'Your single-use exam voucher code is immediately allocated to your private dashboard vault, complete with Pearson VUE redemption instructions.',
      icon: ShieldCheck,
      badge: 'Step 3: Access Vault',
    },
  ];

  return (
    <section className="py-20 bg-navy-950 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Simple & Transparent Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            How CertiVault Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Three simple steps to secure your legitimate certification exam voucher and start advancing your IT career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-surface-border bg-surface-card p-8 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-2xl font-extrabold text-slate-700">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-primary-light uppercase tracking-wider block mb-2">
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-surface-border/50 text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Guaranteed 100% Genuine</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

