'use client';

import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';
import { VoucherItem } from '@/lib/types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { formatDate } from '@/lib/utils/formatters';

export interface RevealVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: VoucherItem | null;
  onRevealed?: (allocationId: string, code: string) => void;
}

export function RevealVoucherModal({
  isOpen,
  onClose,
  voucher,
  onRevealed,
}: RevealVoucherModalProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedCode, setRevealedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!voucher) return null;

  const handleReveal = async () => {
    setIsRevealing(true);
    setError(null);
    try {
      const response = await fetch('/api/vouchers/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allocationId: voucher.allocationId }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to reveal voucher code');
      }

      setRevealedCode(data.voucherCode);
      if (onRevealed) {
        onRevealed(voucher.allocationId, data.voucherCode);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reveal voucher code';
      setError(message);
    } finally {
      setIsRevealing(false);
    }
  };

  const handleCopy = () => {
    if (!revealedCode) return;
    navigator.clipboard.writeText(revealedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Secure Voucher Retrieval"
      description={`Order #${voucher.orderNumber} • ${voucher.certificationName}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Security Warning Notice */}
        <div className="p-4 rounded-xl bg-surface-200 border border-surface-border text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Encrypted Single-Use Voucher Code</span>
          </div>
          <p className="leading-relaxed">
            For your protection against credential scraping, your voucher code is permanently stored in private, restricted database tables. Once revealed, protect your code and do not share it with unauthorized third parties.
          </p>
        </div>

        {/* Revealed Code Display or Unmask Action */}
        {!revealedCode ? (
          <div className="text-center py-6 px-4 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 text-primary-light mx-auto flex items-center justify-center">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Voucher Code is Currently Masked</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Click below to verify your session ownership and reveal your unique testing center promo code.
              </p>
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/40 text-xs text-rose-300">
                {error}
              </div>
            )}
            <Button
              variant="primary"
              onClick={handleReveal}
              isLoading={isRevealing}
              className="shadow-glow gap-2"
            >
              <Unlock className="h-4 w-4" />
              <span>Reveal Plaintext Voucher Code</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Unmasked Code Container */}
            <div className="p-5 rounded-xl bg-surface-200 border-2 border-primary/50 text-center relative space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-light block">
                Official Exam Voucher Code
              </span>
              <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-widest selection:bg-primary">
                {revealedCode}
              </div>
              <div className="text-xs text-slate-400">
                Valid until: <strong className="text-white">{formatDate(voucher.expiryDate)}</strong>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs shadow-glow"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Code Copied!' : 'Copy Voucher Code'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="gap-1.5 text-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Receipt</span>
                </Button>
              </div>
            </div>

            {/* Official Step-by-Step Redemption Instructions */}
            <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Step-by-Step Redemption Instructions
              </h5>
              <div className="text-xs text-slate-300 space-y-1.5 whitespace-pre-line leading-relaxed font-sans bg-navy-900/60 p-3 rounded-lg border border-surface-border">
                {voucher.redemptionInstructions}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-3 border-t border-surface-border">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

