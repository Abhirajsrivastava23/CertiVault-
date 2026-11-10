'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, ShieldCheck, Calendar, Globe, ExternalLink, Unlock, CheckCircle2 } from 'lucide-react';
import { VoucherItem } from '@/lib/types';
import { formatDate } from '@/lib/utils/formatters';
import { Button } from '../ui/Button';
import { RevealVoucherModal } from './RevealVoucherModal';

export interface VoucherCardProps {
  voucher: VoucherItem;
}

export function VoucherCard({ voucher: initialVoucher }: VoucherCardProps) {
  const [voucher, setVoucher] = useState(initialVoucher);
  const [modalOpen, setModalOpen] = useState(false);

  const isExpired = new Date(voucher.expiryDate) < new Date();

  const handleRevealed = (allocationId: string, code: string) => {
    setVoucher(prev => ({
      ...prev,
      isRevealed: true,
      voucherCode: code,
    }));
  };

  return (
    <>
      <div className="rounded-xl border border-surface-border bg-surface-card p-5 sm:p-6 flex flex-col justify-between hover:border-primary/30 transition-all duration-200">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
                {voucher.providerName}
              </span>
              <h4 className="text-base font-semibold text-white mt-0.5">
                {voucher.certificationName}
              </h4>
            </div>
            <span className="text-xs font-mono font-medium text-slate-300 bg-surface-50 px-2 py-0.5 rounded border border-surface-border">
              {voucher.examCode}
            </span>
          </div>

          {/* Details & Validity */}
          <div className="space-y-2 text-xs text-slate-400 py-3 border-y border-surface-border/60 mb-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                <span>Expires on:</span>
              </span>
              <span className={`font-semibold ${isExpired ? 'text-rose-400' : 'text-slate-200'}`}>
                {formatDate(voucher.expiryDate)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-slate-500" />
                <span>Applicable Region:</span>
              </span>
              <span className="text-slate-200 font-medium">{voucher.region}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Order Reference:</span>
              <span className="font-mono text-slate-300">#{voucher.orderNumber}</span>
            </div>
          </div>

          {/* Masked Code Preview */}
          <div className="p-3.5 rounded-lg bg-surface-200 border border-surface-border text-center space-y-1 mb-4">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
              Voucher Code
            </span>
            <div className="font-mono text-sm tracking-widest text-slate-300 font-medium">
              {voucher.voucherCode ? voucher.voucherCode : '••••-••••-••••-••••'}
            </div>
            {voucher.isRevealed && (
              <span className="text-[10px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Revealed previously</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="w-full shadow-glow text-xs gap-1.5"
          >
            <Unlock className="h-3.5 w-3.5" />
            <span>{voucher.isRevealed ? 'View Voucher Code & Guide' : 'Secure Reveal Voucher'}</span>
          </Button>
        </div>
      </div>

      <RevealVoucherModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        voucher={voucher}
        onRevealed={handleRevealed}
      />
    </>
  );
}

