'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronRight, Search, ShieldCheck } from 'lucide-react';

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      category: 'General & Vouchers',
      questions: [
        {
          q: 'What is an IT certification voucher?',
          a: 'An IT certification voucher is an official alphanumeric code authorized by testing sponsors (such as Microsoft, AWS, Cisco, CompTIA, Google Cloud, and Nutanix). It serves as pre-paid currency for scheduling your examination on official test delivery platforms like Pearson VUE, Kryterion, or Webassessor without paying testing fees at checkout.'
        },
        {
          q: 'How does CertiVault provide discounted voucher rates?',
          a: 'CertiVault procures vouchers in bulk allocations through accredited enterprise partnerships, training partner alliances, and regional distributor agreements. We pass these institutional savings directly to candidates and organizations.'
        },
        {
          q: 'Can I use CertiVault vouchers for online proctored exams from home?',
          a: 'Yes. Unless explicitly restricted to physical test centers in the voucher details, our vouchers are valid for both in-person test centers and online proctored testing (such as Pearson VUE OnVUE or Kryterion Webassessor) from your home or office.'
        }
      ]
    },
    {
      category: 'Redemption & Delivery',
      questions: [
        {
          q: 'How and when do I receive my voucher after payment?',
          a: 'Vouchers are delivered digitally and instantly to your private CertiVault Customer Dashboard upon verified payment receipt. For security, voucher codes are masked by default and can be safely revealed by the account owner whenever you are ready to book your exam.'
        },
        {
          q: 'How do I redeem my voucher on Pearson VUE?',
          a: '1. Visit the testing sponsor page (e.g. pearsonvue.com/microsoft or aws.training).\n2. Select your exam code, date, and proctoring method.\n3. Proceed to the payment checkout screen.\n4. Enter your unmasked CertiVault code into the "Promo Code / Voucher" field and click Apply.\n5. The balance will adjust to zero, confirming your scheduled seat.'
        },
        {
          q: 'What happens if my voucher code shows as invalid on Pearson VUE?',
          a: 'Every voucher in our vault is validated against distributor records. If an error occurs, ensure that there are no trailing whitespace characters when pasting, that the exam code matches the voucher specification, and that your Pearson VUE account address matches the regional eligibility (e.g., India). If any issue persists, our support team can verify the code status within minutes.'
        }
      ]
    },
    {
      category: 'Payment, Billing & Invoicing',
      questions: [
        {
          q: 'Which payment modes are accepted on CertiVault?',
          a: 'We accept all domestic Indian and global payment methods through Razorpay: UPI (Google Pay, PhonePe, Paytm, CRED), Net Banking across 50+ major banks, Debit Cards, and Credit Cards (Visa, Mastercard, RuPay, American Express).'
        },
        {
          q: 'Can I get a GST invoice for corporate tax reimbursement?',
          a: 'Yes. During checkout or via our enterprise inquiry desk, you can provide your registered company name and GSTIN to receive an official B2B tax invoice with applicable GST breakdown for full expense reimbursement.'
        }
      ]
    }
  ];

  const allQuestions = faqData.flatMap(c => c.questions);
  const filteredQuestions = search.trim()
    ? allQuestions.filter(item => 
        item.q.toLowerCase().includes(search.toLowerCase()) || 
        item.a.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
          Clear answers on voucher redemption, Pearson VUE scheduling, validity timelines, and secure payments.
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto pt-4">
          <div className="relative flex items-center bg-[#111827] border border-[#1F2B47] rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. Pearson VUE, validity, UPI)..."
              className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-8">
        {filteredQuestions ? (
          /* Search results */
          <div className="space-y-4">
            <div className="text-xs text-gray-400 font-semibold">
              Search Results ({filteredQuestions.length}):
            </div>
            {filteredQuestions.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="glass-card rounded-2xl border border-[#1F2B47] overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-primary-light transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-90 text-primary-light' : 'text-gray-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-[#1F2B47]/60 pt-3 whitespace-pre-line">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Categorized View */
          faqData.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-[#1F2B47] pb-2">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, qIdx) => {
                  const globalIdx = catIdx * 10 + qIdx;
                  const isOpen = openIndex === globalIdx;
                  return (
                    <div key={qIdx} className="glass-card rounded-2xl border border-[#1F2B47] overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-primary-light transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronRight className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-90 text-primary-light' : 'text-gray-400'}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-[#1F2B47]/60 pt-3 whitespace-pre-line">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Still need help? */}
      <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] text-center space-y-3">
        <h3 className="text-base font-bold text-white">Have a question not listed here?</h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          Our candidate support team is available Monday through Friday to verify voucher requirements.
        </p>
        <Link
          href="/support"
          className="inline-block px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-glow"
        >
          Open Support Ticket
        </Link>
      </div>

    </div>
  );
}
