import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Users, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Our Mission & Standards
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Empowering Careers Through Legitimate Certification Access.
        </h1>
        <p className="text-base text-gray-300 leading-relaxed font-normal">
          &ldquo;Your Certification. Your Career. Your Next Opportunity.&rdquo;
        </p>
      </div>

      {/* Core Narrative */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#1F2B47] space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-white">Who We Are</h2>
        <p>
          CertiVault is an authorized IT certification voucher marketplace designed to make globally recognized credentials accessible, affordable, and easily procurable for candidates, students, and enterprise technical teams across India and international regions.
        </p>
        <p>
          In today’s cloud-driven global economy, technical certifications from authorities like Microsoft, AWS, Google Cloud, Cisco, CompTIA, and Nutanix represent the single most respected standard for evaluating engineering competency, salary growth, and promotional readiness.
        </p>
        <p>
          However, high international examination pricing, confusing foreign transaction exchange rates, and credit card hurdles often prevent worthy engineers from getting certified. CertiVault eliminates these barriers through direct distribution arrangements, domestic INR billing with UPI support, and automated digital delivery.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">100% Authorized Vouchers</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            We strictly resell authorized examination vouchers obtained through legitimate corporate distributor channels. No grey-market codes or speculative inventory.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Automated Delivery</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Our backend allocates your voucher immediately upon payment confirmation. Voucher codes remain masked and secure until revealed inside your dashboard.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Career Guidance First</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Beyond commerce, we provide transparent syllabus roadmaps, skill breakdowns, and an interactive rule-based Career Finder to guide your learning journey.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="glass-card rounded-2xl p-8 border border-primary/30 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Ready to earn your next credential?</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Explore our complete catalog of authorized exam vouchers with immediate dashboard delivery.
        </p>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs shadow-glow"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
