'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { CAREER_PATHS, CareerPath } from '@/lib/data/career-paths';
import { CertificationCard } from '@/components/cards/CertificationCard';
import { Certification } from '@/lib/types';

interface QuestionnaireState {
  careerGoal: string;
  skillLevel: string;
  experienceYears: string;
  budgetInr: number;
  knownTechs: string[];
}

export default function CareerFinderPage() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuestionnaireState>({
    careerGoal: 'cloud-architect',
    skillLevel: 'Beginner',
    experienceYears: '0-2',
    budgetInr: 15000,
    knownTechs: ['Linux / Bash'],
  });

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Questionnaire Options
  const goalOptions = [
    { id: 'cloud-architect', label: 'Enterprise Cloud Solutions Architect', category: 'cloud-computing' },
    { id: 'cybersecurity', label: 'Cybersecurity Defense & SOC Analyst', category: 'cybersecurity' },
    { id: 'devops-k8s', label: 'DevOps & Kubernetes Platform Engineer', category: 'devops' },
    { id: 'networking', label: 'Enterprise Network & Infrastructure Engineer', category: 'networking' },
    { id: 'ai-practitioner', label: 'Applied AI & Cognitive Services Specialist', category: 'artificial-intelligence' },
  ];

  const skillOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const experienceOptions = [
    { id: '0-1', label: 'Student / Fresh Graduate (0 - 1 years)' },
    { id: '1-3', label: 'Early Career Professional (1 - 3 years)' },
    { id: '3-6', label: 'Mid-Level Specialist (3 - 6 years)' },
    { id: '6+', label: 'Senior IT Professional (6+ years)' },
  ];

  const techOptions = [
    'Linux / Bash',
    'Python',
    'JavaScript / Node.js',
    'Docker / Containers',
    'Networking & TCP/IP',
    'Active Directory / Windows',
    'SQL / Databases',
    'Git / CI-CD',
  ];

  const toggleTech = (tech: string) => {
    setAnswers((prev) => {
      const exists = prev.knownTechs.includes(tech);
      return {
        ...prev,
        knownTechs: exists 
          ? prev.knownTechs.filter((t) => t !== tech)
          : [...prev.knownTechs, tech],
      };
    });
  };

  // Rule-based Recommendation Engine (Transparent, deterministic scoring)
  const getRecommendations = () => {
    const scoredCerts: { cert: Certification; matchScore: number; reason: string }[] = [];

    for (const cert of CERTIFICATIONS) {
      let score = 0;
      let matchedReasons: string[] = [];

      // 1. Career Goal Matching
      if (answers.careerGoal === 'cloud-architect' && cert.categorySlug === 'cloud-computing') {
        score += 40;
        matchedReasons.push('Directly matches Cloud Architecture track.');
      } else if (answers.careerGoal === 'cybersecurity' && cert.categorySlug === 'cybersecurity') {
        score += 40;
        matchedReasons.push('Directly aligns with Information Security & SOC defense.');
      } else if (answers.careerGoal === 'devops-k8s' && cert.categorySlug === 'devops') {
        score += 40;
        matchedReasons.push('Directly aligns with CI/CD and Container Orchestration.');
      } else if (answers.careerGoal === 'networking' && cert.categorySlug === 'networking') {
        score += 40;
        matchedReasons.push('Core enterprise routing & switching syllabus.');
      } else if (answers.careerGoal === 'ai-practitioner' && cert.categorySlug === 'artificial-intelligence') {
        score += 40;
        matchedReasons.push('Foundational cognitive models and Azure OpenAI services.');
      }

      // 2. Skill Level Match
      if (answers.skillLevel === 'Beginner') {
        if (cert.difficultyLevel === 'Beginner') {
          score += 30;
          matchedReasons.push('Ideal introductory milestone with zero prior exam prerequisites.');
        } else if (cert.difficultyLevel === 'Intermediate') {
          score += 15;
          matchedReasons.push('High-value next step once baseline concepts are grasped.');
        }
      } else if (answers.skillLevel === 'Intermediate') {
        if (cert.difficultyLevel === 'Intermediate') {
          score += 35;
          matchedReasons.push('Perfect match for your existing engineering foundation.');
        } else if (cert.difficultyLevel === 'Advanced') {
          score += 20;
          matchedReasons.push('Strong stretch credential for career progression.');
        }
      } else if (answers.skillLevel === 'Advanced') {
        if (cert.difficultyLevel === 'Advanced' || cert.difficultyLevel === 'Expert') {
          score += 40;
          matchedReasons.push('High-impact senior validation requested by enterprise employers.');
        } else if (cert.difficultyLevel === 'Intermediate') {
          score += 10;
        }
      }

      // 3. Known Technologies
      const certText = (cert.name + ' ' + cert.skillsCovered.join(' ') + ' ' + cert.fullDescription).toLowerCase();
      let techMatches = 0;
      for (const t of answers.knownTechs) {
        if (certText.includes(t.toLowerCase().split('/')[0].trim())) {
          techMatches++;
        }
      }
      if (techMatches > 0) {
        score += Math.min(techMatches * 10, 20);
        matchedReasons.push(`Leverages your background in ${answers.knownTechs.slice(0, 2).join(', ')}.`);
      }

      // 4. Budget Compatibility
      const priceRupees = cert.voucherPriceInr / 100;
      if (priceRupees <= answers.budgetInr) {
        score += 10;
      }

      if (score >= 40) {
        scoredCerts.push({
          cert,
          matchScore: Math.min(score, 98),
          reason: matchedReasons.join(' '),
        });
      }
    }

    // Sort by match score descending
    scoredCerts.sort((a, b) => b.matchScore - a.matchScore);
    return scoredCerts;
  };

  const matchedCareerPath: CareerPath | undefined = CAREER_PATHS.find(
    (p) => 
      (answers.careerGoal === 'cloud-architect' && p.id === 'path-cloud-architect') ||
      (answers.careerGoal === 'cybersecurity' && p.id === 'path-cybersecurity-defense') ||
      (answers.careerGoal === 'devops-k8s' && p.id === 'path-devops-platform') ||
      (answers.careerGoal === 'networking' && p.id === 'path-enterprise-networking')
  ) || CAREER_PATHS[0];

  const recommendations = getRecommendations();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-semibold border border-primary/30">
          <Compass className="w-3.5 h-3.5" /> Rule-Based Career Advisory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Find Your Ideal Certification Path
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Answer 4 quick questions about your career goals, experience level, budget, and technical familiarity. 
          Our deterministic recommendation engine pairs you with the highest-ROI official credentials.
        </p>
      </div>

      {!hasSubmitted ? (
        /* Questionnaire Card */
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#1F2B47] space-y-8">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-gray-400 pb-4 border-b border-[#1F2B47]">
            <span className="font-semibold text-white">Step {step} of 4</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step 
                      ? 'w-8 bg-primary' 
                      : s < step 
                        ? 'w-4 bg-emerald-400' 
                        : 'w-4 bg-[#1F2B47]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: Career Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">1. What is your primary career objective?</h2>
              <p className="text-xs text-gray-400">Select the target job role or technology domain you want to pursue.</p>
              
              <div className="space-y-2.5 pt-2">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAnswers({ ...answers, careerGoal: opt.id })}
                    className={`w-full p-4 rounded-xl text-left text-sm font-semibold flex items-center justify-between transition-all ${
                      answers.careerGoal === opt.id
                        ? 'bg-primary/20 text-white border-2 border-primary'
                        : 'bg-[#141B2D] text-gray-300 border border-[#1F2B47] hover:border-gray-500'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {answers.careerGoal === opt.id && <CheckCircle2 className="w-5 h-5 text-primary-light" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Current Skill & Experience */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">2. What is your current technical skill level?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {skillOptions.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setAnswers({ ...answers, skillLevel: lvl })}
                      className={`p-4 rounded-xl text-center text-sm font-semibold transition-all ${
                        answers.skillLevel === lvl
                          ? 'bg-primary/20 text-white border-2 border-primary'
                          : 'bg-[#141B2D] text-gray-300 border border-[#1F2B47] hover:border-gray-500'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1F2B47]">
                <h3 className="text-sm font-bold text-white">Years of overall professional experience:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experienceOptions.map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, experienceYears: exp.id })}
                      className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        answers.experienceYears === exp.id
                          ? 'bg-primary/20 text-white border-2 border-primary'
                          : 'bg-[#141B2D] text-gray-300 border border-[#1F2B47]'
                      }`}
                    >
                      <span>{exp.label}</span>
                      {answers.experienceYears === exp.id && <CheckCircle2 className="w-4 h-4 text-primary-light" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Technologies Known */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">3. Which technologies do you currently know or work with?</h2>
              <p className="text-xs text-gray-400">Select all that apply to help us assess prerequisite alignments.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {techOptions.map((tech) => {
                  const isChecked = answers.knownTechs.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`p-3.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-accent/20 text-white border border-accent'
                          : 'bg-[#141B2D] text-gray-400 border border-[#1F2B47] hover:text-gray-200'
                      }`}
                    >
                      <span>{tech}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-accent-light shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Budget */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">4. What is your approximate voucher budget?</h2>
              <p className="text-xs text-gray-400">
                We will ensure recommended vouchers stay within or around your target budget.
              </p>

              <div className="p-6 rounded-2xl bg-[#141B2D] border border-[#1F2B47] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-300">Target Budget</span>
                  <span className="text-2xl font-bold text-primary-light">
                    ₹{answers.budgetInr.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="30000"
                  step="1000"
                  value={answers.budgetInr}
                  onChange={(e) => setAnswers({ ...answers, budgetInr: Number(e.target.value) })}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>₹4,000 (Foundational)</span>
                  <span>₹30,000 (Professional / Multi-tier)</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#1F2B47]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border border-[#1F2B47] text-gray-300 font-semibold text-xs hover:text-white"
              >
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs shadow-glow flex items-center gap-1.5"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setHasSubmitted(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-semibold text-xs shadow-glow flex items-center gap-1.5"
              >
                Generate Recommendations <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* RECOMMENDATION RESULTS */
        <div className="space-y-12">
          
          {/* Top Result Banner */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-primary/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Recommended Roadmap Match
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {matchedCareerPath.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  setHasSubmitted(false);
                  setStep(1);
                }}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1F2B47] text-xs text-gray-300 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Questionnaire
              </button>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {matchedCareerPath.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47]">
                <span className="text-[11px] text-gray-400 block mb-1">Target Designation</span>
                <span className="text-sm font-bold text-white">{matchedCareerPath.targetRole}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47]">
                <span className="text-[11px] text-gray-400 block mb-1">Average Compensation</span>
                <span className="text-sm font-bold text-emerald-400">{matchedCareerPath.salaryRangeInr}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47]">
                <span className="text-[11px] text-gray-400 block mb-1">Market Demand</span>
                <span className="text-xs text-white leading-tight font-medium">{matchedCareerPath.industryDemand}</span>
              </div>
            </div>
          </div>

          {/* Sequential Step Pathway */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent-light" />
              Beginner-to-Advanced Certification Progression
            </h3>

            <div className="space-y-4">
              {matchedCareerPath.stages.map((stage, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 border border-[#1F2B47] flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h4 className="text-base font-bold text-white">{stage.stage}</h4>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#162035] text-gray-300 border border-[#253556]">
                        {stage.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {stage.certificationSlugs.map((slug) => {
                      const matchedCert = CERTIFICATIONS.find((c) => c.slug === slug);
                      if (!matchedCert) return null;
                      return (
                        <Link
                          key={matchedCert.id}
                          href={`/certifications/${matchedCert.slug}`}
                          className="px-3 py-2 rounded-xl bg-[#141B2D] border border-primary/30 hover:border-primary text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                        >
                          <span>{matchedCert.examCode}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-primary-light" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Individual Certifications */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-light" />
              Top Recommended Vouchers ({recommendations.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.slice(0, 4).map(({ cert, matchScore, reason }) => (
                <div key={cert.id} className="space-y-2">
                  <div className="flex items-center justify-between px-2 text-xs">
                    <span className="font-semibold text-primary-light">
                      {matchScore}% Match
                    </span>
                    <span className="text-[11px] text-gray-400 truncate max-w-[250px]">{reason}</span>
                  </div>
                  <CertificationCard certification={cert} />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
