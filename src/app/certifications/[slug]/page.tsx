import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Calendar, 
  FileText, 
  Users, 
  Zap, 
  AlertCircle,
  HelpCircle,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { formatInr, calculateDiscount } from '@/lib/utils/formatters';
import { CertificationCard } from '@/components/cards/CertificationCard';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CERTIFICATIONS.map((cert) => ({
    slug: cert.slug,
  }));
}

export default function CertificationDetailPage({ params }: Props) {
  const cert = CERTIFICATIONS.find((c) => c.slug === params.slug);

  if (!cert) {
    notFound();
  }

  const discount = calculateDiscount(cert.retailPriceInr, cert.voucherPriceInr);
  
  // Recommended related certifications (same provider or same category, excluding self)
  const relatedCerts = CERTIFICATIONS
    .filter(c => (c.providerSlug === cert.providerSlug || c.categorySlug === cert.categorySlug) && c.id !== cert.id)
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link>
        <span>/</span>
        <Link href={`/certifications?provider=${cert.providerSlug}`} className="hover:text-white transition-colors">
          {cert.providerName}
        </Link>
        <span>/</span>
        <span className="text-gray-200 font-medium truncate max-w-[200px] sm:max-w-none">{cert.examCode}</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-semibold px-3 py-1 rounded-md bg-primary/20 text-primary-light border border-primary/30">
            {cert.providerName}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#162035] text-gray-300 border border-[#253556]">
            {cert.examCode}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#1F2B47] text-gray-200">
            {cert.difficultyLevel} Level
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Authorized Voucher
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {cert.name}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
          {cert.shortDescription}
        </p>
      </div>

      {/* Main Content Layout with Sticky Purchase Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Comprehensive Exam Blueprint & Roadmaps */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* 1. Overview & Purpose */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1F2B47] space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-light" />
              Certification Overview & Purpose
            </h2>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>{cert.fullDescription}</p>
              <div className="p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80 text-xs text-gray-200 space-y-1">
                <span className="font-semibold text-primary-light block">Core Examination Purpose:</span>
                <p>{cert.purpose}</p>
              </div>
            </div>
          </section>

          {/* 2. Skills Covered */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1F2B47] space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-light" />
              Skills Measured & Covered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {cert.skillsCovered.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80 text-xs text-gray-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Prerequisites & Target Audience */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Prerequisites
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {cert.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Who Should Take This?
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {cert.targetAudience.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. Official Exam Details */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1F2B47] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Official Exam Details
              </h2>
              <a
                href={cert.officialProviderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-light hover:underline flex items-center gap-1 font-medium"
              >
                <span>Official Provider Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80">
                <span className="text-[11px] text-gray-400 block mb-1">Exam Duration</span>
                <span className="text-sm font-bold text-white">{cert.officialExamDetails.durationMinutes} Minutes</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80">
                <span className="text-[11px] text-gray-400 block mb-1">Questions</span>
                <span className="text-sm font-bold text-white">{cert.officialExamDetails.numberOfQuestions}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80">
                <span className="text-[11px] text-gray-400 block mb-1">Passing Score</span>
                <span className="text-sm font-bold text-white">{cert.officialExamDetails.passingScore}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80 sm:col-span-2">
                <span className="text-[11px] text-gray-400 block mb-1">Question Format</span>
                <span className="text-xs text-white">{cert.officialExamDetails.format}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80">
                <span className="text-[11px] text-gray-400 block mb-1">Delivery Method</span>
                <span className="text-xs text-white">{cert.officialExamDetails.testingCenter}</span>
              </div>
            </div>
          </section>

          {/* 5. Preparation Roadmap */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1F2B47] space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-light" />
              Preparation Roadmap
            </h2>
            <div className="space-y-4">
              {cert.preparationRoadmap.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47]/80">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light font-bold text-xs flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <span className="text-[10px] text-gray-400 bg-[#1F2B47] px-2 py-0.5 rounded">
                        {step.duration}
                      </span>
                    </div>
                    <ul className="text-xs text-gray-300 space-y-1 pt-1">
                      {step.topics.map((t, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary-light" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Career Opportunities */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1F2B47] space-y-4">
            <h2 className="text-xl font-bold text-white">Career Opportunities & Salary Benchmark</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {cert.careerOpportunities.map((opp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47] text-xs font-medium text-gray-200">
                  {opp}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Purchase Card */}
        <div className="space-y-6 lg:sticky lg:top-28">
          
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-primary/40 shadow-glow space-y-6 relative overflow-hidden">
            {/* Discount Badge */}
            {discount > 0 && (
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                Save {discount}% Off Official Retail
              </div>
            )}

            <div>
              <div className="text-xs text-gray-400 font-medium">Authorized Voucher Price</div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {formatInr(cert.voucherPriceInr)}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatInr(cert.retailPriceInr)}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">All applicable digital taxes included</div>
            </div>

            {/* Voucher Details */}
            <div className="space-y-3 pt-3 border-t border-[#1F2B47] text-xs">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-4 h-4 text-primary-light" />
                  Validity Period:
                </span>
                <span className="font-semibold text-white">{cert.validityMonths} Months</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Inventory Status:
                </span>
                <span className="font-semibold text-emerald-400">
                  {cert.stockCount > 0 ? `In Stock (${cert.stockCount} Available)` : 'Backorder'}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Delivery:
                </span>
                <span className="font-semibold text-white">Instant Dashboard Reveal</span>
              </div>
            </div>

            {/* Applicable Restrictions */}
            <div className="p-3.5 rounded-xl bg-[#141B2D] border border-[#1F2B47] text-xs text-gray-300 space-y-1">
              <span className="font-semibold text-primary-light block">Redemption Region:</span>
              <p className="text-[11px] leading-relaxed text-gray-400">
                {cert.restrictions || 'Valid for authorized Pearson VUE test centers and online proctored exams in India and South Asia.'}
              </p>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/checkout?certId=${cert.id}`}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold text-center text-sm shadow-glow flex items-center justify-center gap-2 transition-all block"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-[11px] text-gray-400">
                Encrypted checkout with Razorpay. UPI, Cards & Net Banking.
              </p>
            </div>
          </div>

          {/* Need Assistance? */}
          <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] text-xs space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary-light" />
              Need Enterprise / Bulk Pricing?
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Purchasing 5+ vouchers for your team or organization? Contact our enterprise desk for bulk GST billing and custom invoicing.
            </p>
            <Link href="/contact" className="text-primary-light font-semibold hover:underline block pt-1">
              Inquire About Bulk Vouchers →
            </Link>
          </div>

        </div>

      </div>

      {/* Recommended Related Certifications */}
      {relatedCerts.length > 0 && (
        <section className="pt-8 border-t border-[#1F2B47]/80 space-y-6">
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-white">Recommended Next Certifications</h3>
            <Link href="/certifications" className="text-xs font-semibold text-primary-light hover:underline">
              View Catalog
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCerts.map((rc) => (
              <CertificationCard key={rc.id} certification={rc} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
