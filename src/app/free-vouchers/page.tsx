'use client';

import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Gift, 
  ExternalLink,
  Copy,
  Check,
  Zap,
  BookOpen
} from 'lucide-react';
import { FREE_VOUCHER_QUESTS, FreeVoucherQuest } from '@/lib/data/free-vouchers';
import { QuestModal } from '@/components/free-vouchers/QuestModal';
import { VendorLogo } from '@/components/ui/VendorLogo';
import { formatInr } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';

export default function FreeVouchersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [activeQuest, setActiveQuest] = useState<FreeVoucherQuest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const providers = [
    { id: 'all', name: 'All Providers' },
    { id: 'microsoft', name: 'Microsoft' },
    { id: 'google-cloud', name: 'Google Cloud' },
    { id: 'cisco', name: 'Cisco' },
    { id: 'aws', name: 'AWS' },
    { id: 'oracle', name: 'Oracle' },
    { id: 'linux-foundation', name: 'Linux Foundation' },
  ];

  const filteredQuests = useMemo(() => {
    return FREE_VOUCHER_QUESTS.filter((quest) => {
      const matchesSearch = 
        quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.taskOverview.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvider = 
        selectedProvider === 'all' || quest.providerSlug === selectedProvider;

      return matchesSearch && matchesProvider;
    });
  }, [searchQuery, selectedProvider]);

  const handleOpenQuest = (quest: FreeVoucherQuest) => {
    setActiveQuest(quest);
    setIsModalOpen(true);
  };

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const totalValueSaved = FREE_VOUCHER_QUESTS.reduce((acc, q) => acc + q.officialValueInr, 0);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 pb-20">
      
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-surface-border bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">100% Free Certification Quests</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 text-[11px] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>₹0 Required • Directly From Authorized Vendors</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-surface-border bg-gradient-to-b from-navy-900/60 via-navy-950 to-navy-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-glow">
            <Gift className="w-4 h-4" />
            <span>Free Learning Quests & Exam Vouchers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Earn Accredited Certifications <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              100% Free of Cost
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tech giants like Microsoft, Google Cloud, Cisco, AWS, and Oracle sponsor full fee waivers and digital credentials. Complete hands-on learning tasks curated by CertiVault to unlock official certificates without spending a rupee.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-xs text-slate-400 block">Total Quests</span>
              <span className="text-xl font-black text-white">{FREE_VOUCHER_QUESTS.length} Active</span>
            </div>
            <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-xs text-slate-400 block">Total Market Value</span>
              <span className="text-xl font-black text-emerald-400">{formatInr(totalValueSaved)}</span>
            </div>
            <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-xs text-slate-400 block">Cost to Learner</span>
              <span className="text-xl font-black text-cyan-400">₹0.00 Forever</span>
            </div>
            <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-xs text-slate-400 block">Accreditation</span>
              <span className="text-xl font-black text-blue-400">Credly & Pearson</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search free vouchers, e.g. Microsoft AI, Google Cloud, Cisco..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-navy-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Vendor Filter Pills */}
          <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProvider(p.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedProvider === p.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow scale-105'
                    : 'bg-navy-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Quest Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Available Free Certification Quests
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any quest to see full task instructions, voucher access code, and direct portal link.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-navy-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Showing {filteredQuests.length} of {FREE_VOUCHER_QUESTS.length} Quests
          </span>
        </div>

        {filteredQuests.length === 0 ? (
          <div className="text-center py-16 bg-navy-900/50 rounded-3xl border border-slate-800 p-8">
            <Gift className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No quests found</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
              We couldn&apos;t find any free voucher quests matching &quot;{searchQuery}&quot;. Try clearing your search or selecting another provider.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedProvider('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuests.map((quest) => {
              const isCopied = copiedCodeId === quest.id;
              return (
                <div
                  key={quest.id}
                  onClick={() => handleOpenQuest(quest)}
                  className="group relative bg-navy-900/70 hover:bg-navy-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20 flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Bar with Vendor Logo and Free Tag */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <VendorLogo slug={quest.providerSlug} size="md" />
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                            {quest.provider}
                          </span>
                          <span className="text-[11px] text-blue-400 font-medium">
                            {quest.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          100% FREE
                        </span>
                        {quest.credlyAccredited && (
                          <span className="text-[9px] text-slate-400 font-mono mt-1">
                            Credly Badge
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quest Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {quest.title}
                    </h3>

                    {/* Description Overview */}
                    <p className="mt-2.5 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {quest.taskOverview}
                    </p>

                    {/* Attributes Bar */}
                    <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{quest.timeEstimate.split(' ')[0]} hrs</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>{quest.difficulty}</span>
                      </div>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        {quest.voucherType.includes('Voucher') ? 'Exam Voucher' : 'Certificate'}
                      </span>
                    </div>

                    {/* Value Comparison */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Official Market Price</span>
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          {formatInr(quest.officialValueInr)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 font-bold block">CertiVault Price</span>
                        <span className="text-sm font-extrabold text-emerald-400">
                          ₹0.00 FREE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 space-y-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold border-0 shadow-glow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuest(quest);
                      }}
                    >
                      <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                      View Steps & Claim ₹0
                    </Button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleCopyCode(quest.id, quest.voucherAccessCode, e)}
                        className="flex-1 py-1.5 px-2 bg-navy-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Code Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span className="truncate">Code: {quest.voucherAccessCode}</span>
                          </>
                        )}
                      </button>

                      <a
                        href={quest.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 bg-navy-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Open Official Vendor Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Trust & Verification Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Legitimate & Vendor Endorsed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Why are these certification vouchers 100% free?
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Global tech leaders (Microsoft, Google Cloud, AWS, Cisco, and Oracle) operate developer evangelism initiatives to train the next generation of cloud and AI engineers. By completing their official sandbox challenges, you prove hands-on proficiency, and they reward you with legitimate Pearson VUE fee waivers or verifiable Credly digital credentials.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">No Credit Card Needed</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">All vendor labs run in temporary cloud sandboxes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Share on LinkedIn</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Verifiable badges can be embedded directly in your CV.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Vendor Portals</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Exam vouchers redeemable on Pearson VUE & MyLearn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quest Detail Modal */}
      <QuestModal
        quest={activeQuest}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveQuest(null);
        }}
      />

    </div>
  );
}
