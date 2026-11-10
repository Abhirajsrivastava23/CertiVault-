'use client';

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  BookOpen, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { FreeVoucherQuest } from '@/lib/data/free-vouchers';
import { VendorLogo } from '@/components/ui/VendorLogo';
import { formatInr } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';

export interface QuestModalProps {
  quest: FreeVoucherQuest | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuestModal({ quest, isOpen, onClose }: QuestModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!isOpen || !quest) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(quest.voucherAccessCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-6 py-5 border-b border-slate-700/80 flex items-start justify-between text-white">
          <div className="flex items-center gap-3.5">
            <VendorLogo slug={quest.providerSlug} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono">
                  {quest.provider}
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  100% Free
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5 line-clamp-1">
                {quest.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          
          {/* Reward & Value Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-slate-800">
              <span className="text-slate-400 block text-[11px]">Official Value</span>
              <span className="text-base font-extrabold text-white line-through opacity-75">
                {formatInr(quest.officialValueInr)}
              </span>
              <span className="text-emerald-400 font-bold block text-xs">FREE (₹0)</span>
            </div>
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-slate-800">
              <span className="text-slate-400 block text-[11px]">Credential Type</span>
              <span className="text-xs font-bold text-white block mt-0.5">{quest.voucherType}</span>
              <span className="text-blue-400 text-[10px] block font-mono">
                {quest.credlyAccredited ? 'Credly Verified Badge' : 'Accredited Certificate'}
              </span>
            </div>
            <div className="p-2">
              <span className="text-slate-400 block text-[11px]">Time Commitment</span>
              <span className="text-xs font-bold text-white block mt-0.5">{quest.timeEstimate}</span>
              <span className="text-slate-400 text-[10px] block">Self-Paced Online</span>
            </div>
          </div>

          {/* Task Overview */}
          <div>
            <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <span>What You Need To Complete</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
              {quest.taskOverview}
            </p>
          </div>

          {/* Step-by-Step Walkthrough */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Step-by-Step Task & Claim Instructions</span>
            </h4>

            <div className="space-y-2.5">
              {quest.learningSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/40 transition-colors"
                >
                  <span className="h-5 w-5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Access / Voucher Code Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>CertiVault Verification & Voucher Access Code</span>
              </span>
              <span className="text-[10px] text-blue-300 font-mono">100% Free Waiver</span>
            </div>

            <div className="flex items-center justify-between gap-3 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-700">
              <span className="font-mono text-sm font-bold text-emerald-400 tracking-wider">
                {quest.voucherAccessCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">{quest.instantClaimInstructions}</p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-3">
          <Button variant="secondary" size="md" onClick={onClose} className="text-xs">
            Close
          </Button>
          <a
            href={quest.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial"
          >
            <Button variant="primary" size="md" className="w-full text-xs font-bold gap-2 shadow-glow bg-gradient-to-r from-blue-600 to-indigo-600">
              <span>Start Course / Challenge On Official Portal</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

      </div>
    </div>
  );
}
