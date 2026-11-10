'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Award,
  Zap
} from 'lucide-react';
import { CAREER_PATHS, CareerPath } from '@/lib/data/career-paths';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { Button } from '@/components/ui/Button';
import { formatInr } from '@/lib/utils/formatters';

export default function CareerFinderPage() {
  const [step, setStep] = useState(1);

  // User input answers
  const [careerGoal, setCareerGoal] = useState<string>('cloud-architect');
  const [skillLevel, setSkillLevel] = useState<string>('intermediate');
  const [experience, setExperience] = useState<string>('1-3');
  const [budget, setBudget] = useState<string>('under-15000');
  const [selectedTechs, setSelectedTechs] = useState<string[]>(['aws', 'linux']);

  const [submitted, setSubmitted] = useState(false);

  const toggleTech = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter(t => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
  };

  // Rule-based matching engine
  const matchedPath: CareerPath = (() => {
    if (careerGoal === 'devops') {
      return CAREER_PATHS.find(p => p.slug === 'cloud-devops-platform-engineer') || CAREER_PATHS[1];
    }
    if (careerGoal === 'security') {
      return CAREER_PATHS.find(p => p.slug === 'cybersecurity-analyst-defender') || CAREER_PATHS[2];
    }
    if (careerGoal === 'networking') {
      return CAREER_PATHS.find(p => p.slug === 'enterprise-network-engineer') || CAREER_PATHS[3];
    }
    if (careerGoal === 'ai') {
      return CAREER_PATHS.find(p => p.slug === 'artificial-intelligence-engineer') || CAREER_PATHS[4];
    }
    // Default to Cloud Architect
    return CAREER_PATHS.find(p => p.slug === 'cloud-solutions-architect') || CAREER_PATHS[0];
  })();

  // Filter recommendations based on experience/skill level
  const filteredRecommendations = matchedPath.recommendations.map(rec => {
    const fullCert = CERTIFICATIONS.find(c => c.id === rec.certificationId);
    return {
      ...rec,
      fullCert,
    };
  });

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent-light">
            <Compass className="h-4 w-4" />
            <span>Interactive Recommendation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Find Your Ideal Certification Pathway
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Answer 5 quick questions about your career objectives, experience, and budget to receive a tailored certification roadmap.
          </p>
        </div>

        {!submitted ? (
          /* Questionnaire Wizard */
          <div className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Step {step} of 5</span>
                <span>{step === 1 ? 'Career Goal' : step === 2 ? 'Skill Level' : step === 3 ? 'Experience' : step === 4 ? 'Budget' : 'Known Technologies'}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Career Goal */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">What is your primary career goal?</h3>
                <p className="text-xs text-slate-400">Select the specialization you are aiming for next.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'cloud-architect', title: 'Cloud Solutions Architect', desc: 'Design resilient, scalable infrastructure on AWS, Azure, or GCP.' },
                    { id: 'devops', title: 'Cloud DevOps & Platform Engineer', desc: 'Automate deployments, Docker/Kubernetes, and CI/CD pipelines.' },
                    { id: 'security', title: 'Cybersecurity Analyst & Defender', desc: 'Protect corporate assets, SOC operations, and threat hunting.' },
                    { id: 'networking', title: 'Enterprise Network Engineer', desc: 'Master routing, switching, Cisco fabrics, and telecommunications.' },
                    { id: 'ai', title: 'Applied AI & Cognitive Developer', desc: 'Integrate machine learning APIs, LLMs, and intelligent services.' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setCareerGoal(goal.id)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        careerGoal === goal.id
                          ? 'bg-primary/10 border-primary text-white shadow-glow'
                          : 'bg-surface-200 border-surface-border text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <h4 className="text-sm font-semibold text-white">{goal.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{goal.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Skill Level */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">What is your current technical familiarity?</h3>
                <p className="text-xs text-slate-400">This helps us gauge whether you should start with a fundamental or associate-level credential.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { id: 'beginner', title: 'Beginner / Student', desc: 'New to cloud & enterprise IT systems.' },
                    { id: 'intermediate', title: 'Associate / Practitioner', desc: 'Comfortable with basic administration & coding.' },
                    { id: 'experienced', title: 'Advanced / Senior', desc: 'Years of production engineering experience.' },
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSkillLevel(level.id)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        skillLevel === level.id
                          ? 'bg-primary/10 border-primary text-white shadow-glow'
                          : 'bg-surface-200 border-surface-border text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <h4 className="text-sm font-semibold text-white">{level.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{level.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">How many years of industry IT experience do you have?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    { id: '0-1', title: '0 – 1 Year' },
                    { id: '1-3', title: '1 – 3 Years' },
                    { id: '3-5', title: '3 – 5 Years' },
                    { id: '5+', title: '5+ Years' },
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setExperience(exp.id)}
                      className={`py-4 px-3 rounded-xl text-center border font-semibold text-sm transition-all ${
                        experience === exp.id
                          ? 'bg-primary text-white border-primary shadow-glow'
                          : 'bg-surface-200 border-surface-border text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {exp.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Budget */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">What is your planned certification voucher budget?</h3>
                <p className="text-xs text-slate-400">All vouchers on CertiVault include special marketplace discounts.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'under-5000', title: 'Under ₹5,000', desc: 'Foundational exams like Azure AZ-900, AI-900, etc.' },
                    { id: 'under-15000', title: 'Under ₹15,000', desc: 'Associate credentials like AWS SAA-C03, GCP ACE, etc.' },
                    { id: 'under-25000', title: 'Under ₹25,000', desc: 'Comprehensive exams like Cisco CCNA, CompTIA Sec+, etc.' },
                    { id: 'flexible', title: 'Employer Sponsored / Flexible', desc: 'Focus strictly on the highest career ROI credential.' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        budget === b.id
                          ? 'bg-primary/10 border-primary text-white shadow-glow'
                          : 'bg-surface-200 border-surface-border text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <h4 className="text-sm font-semibold text-white">{b.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Technologies Known */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Which technologies do you already have some exposure to?</h3>
                <p className="text-xs text-slate-400">Select all that apply to fine-tune your personalized roadmap.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {[
                    { id: 'aws', label: 'AWS' },
                    { id: 'azure', label: 'Microsoft Azure' },
                    { id: 'gcp', label: 'Google Cloud' },
                    { id: 'linux', label: 'Linux / Bash' },
                    { id: 'python', label: 'Python' },
                    { id: 'docker', label: 'Docker / Containers' },
                    { id: 'kubernetes', label: 'Kubernetes' },
                    { id: 'networking', label: 'Cisco / Routing' },
                    { id: 'security', label: 'Cybersecurity Basics' },
                    { id: 'terraform', label: 'Terraform / IaC' },
                  ].map((t) => {
                    const isSelected = selectedTechs.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTech(t.id)}
                        className={`py-3 px-3 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-accent/20 border-accent text-white font-semibold'
                            : 'bg-surface-200 border-surface-border text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <span>{t.label}</span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-surface-border">
              {step > 1 ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                className="gap-2 shadow-glow"
              >
                <span>{step === 5 ? 'Generate My Pathway' : 'Continue'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

          </div>
        ) : (
          /* Recommended Pathway Results View */
          <div className="space-y-10">
            
            {/* Pathway Summary Card */}
            <div className="rounded-2xl border-2 border-primary/40 bg-gradient-radial from-surface-100 to-navy-950 p-6 sm:p-10 space-y-4 shadow-glow">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-light bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  Recommended Career Track
                </span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
                  Est. Salary: {matchedPath.averageSalaryRange}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {matchedPath.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {matchedPath.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
                <span>Timeline: <strong>{matchedPath.estimatedTimeline}</strong></span>
                <span>•</span>
                <span>Target Roles: <strong className="text-white">{matchedPath.targetRoles.join(', ')}</strong></span>
              </div>
            </div>

            {/* Beginner-to-Advanced Pathway Sequence */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Your Step-by-Step Learning Pathway</h3>
                  <p className="text-xs text-slate-400">Follow this sequence to build validated industry competency.</p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-primary-light hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Retake Career Finder</span>
                </button>
              </div>

              <div className="space-y-6">
                {filteredRecommendations.map((item, idx) => (
                  <div
                    key={item.certificationId}
                    className="relative rounded-xl border border-surface-border bg-surface-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/40 transition-all duration-200"
                  >
                    <div className="space-y-3 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center shrink-0">
                          {item.sequenceOrder}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {item.providerName} • Exam {item.examCode}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          {item.level}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white">
                        {item.certificationName}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <strong className="text-primary-light font-medium">Why it is recommended: </strong>
                        {item.rationale}
                      </p>

                      {item.fullCert && (
                        <div className="text-xs text-slate-400 flex items-center gap-3 pt-1">
                          <span>Voucher Price: <strong className="text-white font-bold">{formatInr(item.fullCert.voucherPriceInr)}</strong></span>
                          <span>•</span>
                          <span>Stock: <strong className="text-emerald-400 font-semibold">{item.fullCert.stockCount} available</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex flex-col gap-2">
                      {item.fullCert ? (
                        <>
                          <Link href={`/certifications/${item.fullCert.slug}`}>
                            <Button variant="secondary" size="sm" className="w-full text-xs">
                              View Syllabus & Prep
                            </Button>
                          </Link>
                          <Link href={`/checkout?certId=${item.fullCert.id}`}>
                            <Button variant="primary" size="sm" className="w-full text-xs gap-1 shadow-glow">
                              <Zap className="h-3.5 w-3.5" />
                              <span>Buy Voucher</span>
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <Link href="/certifications">
                          <Button variant="primary" size="sm">Explore in Catalog</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
