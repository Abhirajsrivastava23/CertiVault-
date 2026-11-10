'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { KeyRound, ShieldCheck, Lock, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { VoucherItem } from '@/lib/types';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { Button } from '@/components/ui/Button';

export default function MyVouchersPage() {
  const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVouchers() {
      try {
        const res = await fetch('/api/vouchers/list');
        const data = await res.json();
        if (data.success) {
          setVouchers(data.data || []);
        }
      } catch (err) {
        console.error('Failed to load user vouchers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadVouchers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Customer Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            My Certification Vouchers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authorized digital exam vouchers. Codes remain masked by default for single-use protection.
          </p>
        </div>
        <Link href="/certifications">
          <Button variant="primary" size="sm" className="shadow-glow gap-1.5 text-xs">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Buy New Voucher</span>
          </Button>
        </Link>
      </div>

      {/* Security Best Practices Banner */}
      <div className="p-4 rounded-xl bg-surface-200 border border-surface-border text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white font-semibold block">Voucher Protection Protocol</strong>
          <p className="text-slate-400 leading-relaxed">
            Your voucher codes are cryptographically secured and strictly stored in private backend tables. Once you click &ldquo;Secure Reveal Voucher&rdquo;, your browser verifies session ownership and logs the unmasking action. Keep your unmasked code confidential.
          </p>
        </div>
      </div>

      {/* Vouchers Grid */}
      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading your secure voucher vault...</div>
      ) : vouchers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouchers.map((voucher) => (
            <VoucherCard key={voucher.allocationId} voucher={voucher} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-surface-border bg-surface-card space-y-4">
          <div className="h-12 w-12 rounded-full bg-surface-50 text-slate-400 mx-auto flex items-center justify-center">
            <KeyRound className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No vouchers in your vault yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You have not purchased any certification vouchers yet. Explore our catalog of authorized vouchers for AWS, Azure, GCP, and Cisco.
          </p>
          <Link href="/certifications">
            <Button variant="primary" size="md" className="shadow-glow gap-2">
              <span>Explore Certification Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}

