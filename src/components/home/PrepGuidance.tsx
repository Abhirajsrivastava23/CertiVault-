import React from 'react';
import Link from 'next/link';
import { BookOpenCheck, Terminal, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function PrepGuidance() {
  const tips = [
    {
      num: '01',
      title: 'Analyze the Official Domain Blueprint',
      desc: 'Each vendor publishes the exact percentage weight of each topic (e.g. AZ-900 covers Azure Architecture 35-40%). Prioritize high-weight categories first.',
    },
    {
      num: '02',
      title: 'Prioritize Command-Line & Console Labs',
      desc: 'Practical comprehension always outperforms rote memorization. Spin up free-tier instances, create VPCs, and configure IAM policies in live environments.',
    },
    {
      num: '03',
      title: 'Simulate Timed Practice Tests',
      desc: 'Take full-length mock tests under real exam timing conditions. Review every incorrect answer thoroughly to close conceptual knowledge gaps.',
    },
    {
      num: '04',
      title: 'Lock In Your Date Early',
      desc: 'Booking an exam appointment 3-4 weeks ahead creates constructive urgency. With a 365-day CertiVault voucher, you retain total rescheduling flexibility.',
    },
  ];

  return (
    <section className="py-20 bg-navy-950 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
              Exam Success Framework
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Certification Preparation Guidance
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Acquiring a voucher is just the first step. Our verified roadmaps and preparation principles help you study efficiently and pass on your first attempt.
            </p>
            <div className="pt-2">
              <Link href="/career-finder">
                <Button variant="secondary" size="md" className="gap-2">
                  <span>Explore Guided Career Roadmaps</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((t) => (
              <div
                key={t.num}
                className="rounded-xl border border-surface-border bg-surface-card p-5 space-y-2 hover:border-surface-border/80"
              >
                <span className="font-mono text-xs font-bold text-primary-light bg-surface-50 px-2 py-0.5 rounded border border-surface-border">
                  {t.num}
                </span>
                <h3 className="text-sm font-semibold text-white pt-1">{t.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

