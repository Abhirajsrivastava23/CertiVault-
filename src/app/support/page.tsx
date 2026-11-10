import React from 'react';
import Link from 'next/link';
import { LifeBuoy, Search, KeyRound, CreditCard, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SupportPage() {
  const supportCategories = [
    {
      title: 'Voucher Redemption Guides',
      desc: 'Step-by-step walkthroughs for applying promo codes on Pearson VUE, PSI, and Webassessor checkout screens.',
      icon: KeyRound,
      href: '/faq',
    },
    {
      title: 'Payment & Billing Receipts',
      desc: 'Information regarding GST tax invoices, Razorpay transactions, and payment verification timelines.',
      icon: CreditCard,
      href: '/dashboard/orders',
    },
    {
      title: 'Digital Delivery Protocol',
      desc: 'Understand how vouchers are allocated from private database inventory directly to your secure account.',
      icon: ShieldCheck,
      href: '/shipping-and-delivery',
    },
    {
      title: 'Refunds & Cancellations',
      desc: 'Review our criteria for single-use voucher replacements, cancellation requests, and technical reviews.',
      icon: HelpCircle,
      href: '/refund-policy',
    },
  ];

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-surface-border pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Customer Help Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Can We Assist You?
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Find answers to common questions about voucher redemption, Pearson VUE scheduling, and payment verification.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {supportCategories.map((sc) => {
            const Icon = sc.icon;
            return (
              <Link
                key={sc.title}
                href={sc.href}
                className="rounded-2xl border border-surface-border bg-surface-card p-6 hover:border-primary/40 hover:shadow-glow transition-all duration-200 block space-y-3"
              >
                <div className="h-10 w-10 rounded-xl bg-surface-50 border border-surface-border flex items-center justify-center text-primary-light">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">{sc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{sc.desc}</p>
                <div className="text-xs text-primary-light font-semibold flex items-center gap-1 pt-1">
                  <span>Explore articles</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Contact Support Banner */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Need 1-on-1 Personalized Help?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Submit a support ticket from your customer dashboard or get in touch with our team directly.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/dashboard/support">
              <Button variant="primary" size="md" className="shadow-glow gap-1.5 text-xs">
                <LifeBuoy className="h-4 w-4" />
                <span>Open Support Ticket</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="md" className="text-xs">
                Contact Form
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
