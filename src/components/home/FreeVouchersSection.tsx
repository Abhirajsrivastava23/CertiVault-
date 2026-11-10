'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Gift, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Award,
  BookOpen
} from 'lucide-react';
import { FREE_VOUCHER_QUESTS, FreeVoucherQuest } from '@/lib/data/free-vouchers';
import { VendorLogo } from '@/components/ui/VendorLogo';
import { formatInr } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { QuestModal } from '@/components/free-vouchers/QuestModal';

export function FreeVouchersSection() {
  const [activeQuest, setActiveQuest] = useState<FreeVoucherQuest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Showcase top 3 popular quests
  const featuredQuests = FREE_VOUCHER_QUESTS.slice(0, 3);

  const handleOpenQuest = (quest: FreeVoucherQuest) => {
    setActiveQuest(quest);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900/60 to-navy-950 border-y border-surface-border">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Gift className="w-3.5 h-3.5" />
              <span>100% Free • ₹0 Exam Vouchers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Complete Learning Quests, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Earn Official Certificates For Free
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              Don&apos;t have a budget right now? Complete interactive tasks and lab challenges directly on official vendor platforms to unlock 100% free Pearson VUE vouchers and Credly badges.
            </p>
          </div>

          <Link href="/free-vouchers">
            <Button 
              variant="outline" 
              className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 hover:text-white flex items-center gap-2"
            >
              <span>Explore All {FREE_VOUCHER_QUESTS.length} Free Quests</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* 3 Featured Quests Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredQuests.map((quest) => (
            <div
              key={quest.id}
              onClick={() => handleOpenQuest(quest)}
              className="group relative bg-navy-900/80 hover:bg-navy-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/30 flex flex-col justify-between cursor-pointer"
            >
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

                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    100% FREE
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {quest.title}
                </h3>

                <p className="mt-2.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {quest.taskOverview}
                </p>

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
                    {quest.voucherType.includes('Voucher') ? 'Exam Waiver' : 'Credly Badge'}
                  </span>
                </div>

                {/* Pricing comparison */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Official Price</span>
                    <span className="text-xs text-slate-400 line-through font-semibold">
                      {formatInr(quest.officialValueInr)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-bold block">With Quest</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      ₹0.00 FREE
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-3 border-t border-slate-800/80">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold border-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenQuest(quest);
                  }}
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  View Steps & Start Quest
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <QuestModal
        quest={activeQuest}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveQuest(null);
        }}
      />
    </section>
  );
}
