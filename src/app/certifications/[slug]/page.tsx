import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  Award, 
  Globe, 
  GraduationCap, 
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { DifficultyBadge } from '@/components/ui/Badge';
import { VoucherPurchaseCard } from '@/components/certifications/VoucherPurchaseCard';
import { CertificationCard } from '@/components/certifications/CertificationCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CERTIFICATIONS.map((cert) => ({
    slug: cert.slug,
  }));
}

export default async function CertificationDetailPage({ params }: Props) {
  const { slug } = await params;
  const cert = CERTIFICATIONS.find((c) => c.slug === slug);

  if (!cert) {
    notFound();
  }

  // Related certifications in the same category or provider
  const relatedCertifications = CERTIFICATIONS
    .filter((c) => c.id !== cert.id && (c.categoryId === cert.categoryId || c.providerId === cert.providerId))
    .slice(0, 3);

  return (
    <div className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href={`/categories/${cert.categorySlug}`} className="hover:text-white transition-colors">{cert.categoryName}</Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-none">{cert.examCode}</span>
        </div>

        {/* Hero Title Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-light bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
              {cert.providerName}
            </span>
            <span className="font-mono text-xs font-bold text-white bg-surface-50 px-2.5 py-0.5 rounded border border-surface-border">
              Exam {cert.examCode}
            </span>
            <DifficultyBadge level={cert.difficultyLevel} />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {cert.name}
          </h1>
          <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
            {cert.shortDescription}
          </p>
        </div>

        {/* Main Grid: Content (8 cols) + Sticky Purchase Card (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Details (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview & Purpose */}
            <section className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary-light" />
                <span>Certification Overview & Purpose</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {cert.fullDescription}
              </p>
              <div className="p-4 rounded-xl bg-surface-200 border border-surface-border text-xs sm:text-sm text-slate-300 space-y-1">
                <strong className="text-white block font-semibold">Primary Purpose:</strong>
                <span>{cert.purpose}</span>
              </div>
            </section>

            {/* Official Exam Specifications Table */}
            <section className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary-light" />
                  <span>Official Exam Specifications</span>
                </h2>
                <a
                  href={cert.officialProviderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-light hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-border">
                  <span className="text-slate-400 block mb-1">Duration</span>
                  <span className="text-sm font-semibold text-white">{cert.officialExamDetails.durationMinutes} Minutes</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-border">
                  <span className="text-slate-400 block mb-1">Questions</span>
                  <span className="text-sm font-semibold text-white">{cert.officialExamDetails.numberOfQuestions}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-border">
                  <span className="text-slate-400 block mb-1">Passing Benchmark</span>
                  <span className="text-sm font-semibold text-emerald-400">{cert.officialExamDetails.passingScore}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-border">
                  <span className="text-slate-400 block mb-1">Testing Partner</span>
                  <span className="text-sm font-semibold text-white">{cert.officialExamDetails.testingCenter}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-border">
                  <span className="text-slate-400 block mb-1">Question Format</span>
                  <span className="text-sm font-semibold text-white">{cert.officialExamDetails.format}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-border">
                  <span className="text-slate-400 block mb-1">Languages</span>
                  <span className="text-sm font-semibold text-white truncate block">{cert.officialExamDetails.languages.join(', ')}</span>
                </div>
              </div>
            </section>

            {/* Skills & Domains Tested */}
            <section className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary-light" />
                <span>Skills Measured & Domain Weightings</span>
              </h2>
              <div className="space-y-2.5">
                {cert.skillsCovered.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-200 border border-surface-border text-xs sm:text-sm text-slate-200"
                  >
                    <span className="font-medium">{skill}</span>
                    <CheckCircle2 className="h-4 w-4 text-primary-light shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </section>

            {/* Target Audience & Prerequisites */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Audience */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary-light" />
                  <span>Target Audience</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {cert.targetAudience.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Prerequisites */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-accent-light" />
                  <span>Prerequisites</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {cert.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Preparation Roadmap */}
            <section className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Recommended Preparation Roadmap</h2>
                <p className="text-xs text-slate-400 mt-1">Structured milestones designed by certified practitioners to reach exam readiness.</p>
              </div>

              <div className="space-y-4">
                {cert.preparationRoadmap.map((step) => (
                  <div key={step.step} className="p-4 rounded-xl bg-surface-200 border border-surface-border space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center">
                          {step.step}
                        </span>
                        <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                      </div>
                      <span className="text-xs font-medium text-slate-400 bg-surface-50 px-2 py-0.5 rounded border border-surface-border">
                        {step.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {step.topics.map((topic, i) => (
                        <span key={i} className="text-xs text-slate-300 bg-navy-900/60 px-2 py-0.5 rounded border border-surface-border/50">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Opportunities */}
            <section className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white">Career Opportunities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cert.careerOpportunities.map((role, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface-200 border border-surface-border text-center">
                    <span className="text-xs font-medium text-slate-200 block">{role}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sticky Purchase Card (4 Columns) */}
          <div className="lg:col-span-4">
            <VoucherPurchaseCard certification={cert} />
          </div>

        </div>

        {/* Related Certifications */}
        {relatedCertifications.length > 0 && (
          <div className="pt-12 border-t border-surface-border space-y-6">
            <h3 className="text-xl font-bold text-white">
              Related Certifications & Next Milestones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCertifications.map((rCert) => (
                <CertificationCard key={rCert.id} certification={rCert} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
