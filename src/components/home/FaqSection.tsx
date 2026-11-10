'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'What is a certification exam voucher, and how does it work?',
    answer: 'A certification voucher is an official alphanumeric code authorized by the exam publisher (such as Microsoft, AWS, Cisco, or CompTIA). When scheduling your certification test on official portals like Pearson VUE or PSI, entering this voucher code reduces the exam fee by 100% at checkout, allowing you to confirm your exam slot without paying the vendor directly.',
  },
  {
    question: 'Are CertiVault vouchers valid for both online proctored and in-person test centers?',
    answer: 'Yes. Unless explicitly restricted to a specific region or modality in the product description, our vouchers can be used to book an exam either at an authorized in-person testing center (e.g., Pearson VUE Authorized Test Centers) or as an online proctored exam taken securely from your home or office.',
  },
  {
    question: 'How long is my voucher valid after purchase?',
    answer: 'Most standard vouchers purchased on CertiVault have a validity of 12 months (365 days) from the date of issuance. The exact expiration date is clearly listed on the product card before purchase and in your dashboard vault upon delivery.',
  },
  {
    question: 'Why are voucher codes masked by default in the customer dashboard?',
    answer: 'As an industry security standard, voucher codes represent valuable financial instruments. To prevent unauthorized access from shoulder surfing, compromised browser extensions, or malicious bots, vouchers are masked and only revealed on-demand via a cryptographically secured server verification action.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major Indian and international payment methods processed through Razorpay: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit Cards (Visa, Mastercard, RuPay, Amex), Debit Cards, and Net Banking across 50+ major banks.',
  },
  {
    question: 'Can I reschedule my exam appointment after applying the voucher code?',
    answer: 'Yes. Rescheduling rules are governed by the exam vendor (e.g., Microsoft or AWS typically allow free rescheduling up to 24-48 hours prior to your scheduled time). As long as your new appointment falls within the original voucher validity window, your voucher remains valid.',
  },
  {
    question: 'What is your refund policy on digital certification vouchers?',
    answer: 'Because digital certification vouchers are single-use credentials that can be permanently copied or redeemed upon delivery, unrevealed vouchers with verified technical issues can be reviewed for resolution within 7 days. Once a voucher code has been revealed or scheduled, it is non-refundable. Please review our full Refund Policy for details.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-navy-900 border-t border-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Clear, honest answers about vouchers, testing centers, redemption, and validity.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-surface-border bg-surface-card overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180 text-primary-light'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-surface-border/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

