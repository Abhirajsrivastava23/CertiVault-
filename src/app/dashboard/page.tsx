'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Calendar, 
  Award, 
  FileText, 
  CreditCard, 
  Download, 
  ExternalLink,
  AlertCircle,
  HelpCircle,
  Clock,
  CheckCircle2,
  Lock,
  RefreshCw
} from 'lucide-react';
import { store } from '@/lib/services/store';
import { VoucherItem, Order, SupportTicket } from '@/lib/types';
import { formatInr, formatDate, maskVoucherCode } from '@/lib/utils/formatters';

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'vouchers' | 'orders' | 'support'>('vouchers');
  const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Secure reveal state: map allocationId -> { code: string, instructions: string }
  const [revealedCodes, setRevealedCodes] = useState<Record<string, { code: string; instructions: string }>>({});
  const [revealingId, setRevealingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const demoUserId = 'usr-demo-1001';

  const loadDashboardData = () => {
    try {
      const userVouchers = store.getCustomerVouchers(demoUserId);
      const userOrders = store.getOrders(demoUserId);
      const userTickets = store.getTickets(demoUserId);

      setVouchers(userVouchers);
      setOrders(userOrders);
      setTickets(userTickets);
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Secure voucher reveal handler calling backend endpoint
  const handleRevealVoucher = async (allocationId: string) => {
    if (revealedCodes[allocationId]) {
      // Toggle hide
      const next = { ...revealedCodes };
      delete next[allocationId];
      setRevealedCodes(next);
      return;
    }

    setRevealingId(allocationId);
    setErrorNotice(null);

    try {
      const res = await fetch('/api/vouchers/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          allocationId,
          userId: demoUserId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to reveal voucher code');
      }

      setRevealedCodes((prev) => ({
        ...prev,
        [allocationId]: {
          code: data.voucherCode,
          instructions: data.instructions,
        },
      }));
    } catch (err: any) {
      setErrorNotice(err.message || 'Could not verify voucher reveal authorization.');
    } finally {
      setRevealingId(null);
    }
  };

  const copyToClipboard = (allocationId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(allocationId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const totalSpentPaise = orders.reduce((sum, o) => sum + (o.status === 'fulfilled' || o.status === 'paid' ? o.totalAmountInr : 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Welcome & Stats Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#1F2B47] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-primary-light uppercase tracking-wider">Candidate Dashboard</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Welcome back, Arun Patel
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Apex Cloud Solutions • learner@certivault.in
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/certifications"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Browse New Vouchers</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#141B2D] border border-[#1F2B47]">
            <span className="text-xs text-gray-400 block mb-1">Purchased Vouchers</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{vouchers.length}</span>
              <span className="text-xs text-emerald-400 font-medium">Ready for Redemption</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#141B2D] border border-[#1F2B47]">
            <span className="text-xs text-gray-400 block mb-1">Total Orders</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{orders.length}</span>
              <span className="text-xs text-gray-400 font-medium">Fulfilled</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#141B2D] border border-[#1F2B47]">
            <span className="text-xs text-gray-400 block mb-1">Total Saved / Invested</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary-light">{formatInr(totalSpentPaise)}</span>
              <span className="text-xs text-emerald-400 font-medium">Verified Payment</span>
            </div>
          </div>
        </div>
      </div>

      {errorNotice && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#1F2B47] gap-8 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('vouchers')}
          className={`pb-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'vouchers'
              ? 'text-primary-light border-b-2 border-primary'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>My Vouchers ({vouchers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'text-primary-light border-b-2 border-primary'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`pb-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'support'
              ? 'text-primary-light border-b-2 border-primary'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support & Tickets ({tickets.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: MY VOUCHERS */}
      {activeTab === 'vouchers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Codes are masked by default. Click &quot;Reveal Code&quot; to inspect unmasked credential.
            </span>
            <button 
              onClick={loadDashboardData}
              className="hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          {vouchers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {vouchers.map((v) => {
                const isRevealed = !!revealedCodes[v.allocationId];
                const activeCode = isRevealed ? revealedCodes[v.allocationId].code : maskVoucherCode('');
                const instructions = isRevealed ? revealedCodes[v.allocationId].instructions : v.redemptionInstructions;

                return (
                  <div
                    key={v.allocationId}
                    className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1F2B47]/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-primary/20 text-primary-light border border-primary/30">
                            {v.providerName}
                          </span>
                          <span className="text-xs font-mono text-gray-300 bg-[#162035] px-2 py-0.5 rounded border border-[#253556]">
                            {v.examCode}
                          </span>
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Allocated
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mt-1.5">
                          {v.certificationName}
                        </h3>
                      </div>

                      <div className="text-xs text-gray-400 sm:text-right">
                        <div>Order Ref: <strong className="text-gray-200">{v.orderNumber}</strong></div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-primary-light" />
                          <span>Expires: <strong className="text-white">{formatDate(v.expiryDate)}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Masked / Unmasked Voucher Code Box */}
                    <div className="p-4 rounded-xl bg-[#0B1020] border border-[#253556] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] text-gray-400 block mb-1">Official Voucher Code:</span>
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-base sm:text-lg font-bold tracking-wider ${
                            isRevealed ? 'text-emerald-400' : 'text-gray-400'
                          }`}>
                            {activeCode}
                          </span>
                          {isRevealed && (
                            <button
                              onClick={() => copyToClipboard(v.allocationId, activeCode)}
                              title="Copy Voucher Code"
                              className="p-1.5 rounded-lg bg-[#141B2D] hover:bg-[#1A253E] text-gray-300 hover:text-white transition-colors"
                            >
                              {copiedId === v.allocationId ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Reveal Action Button */}
                      <button
                        onClick={() => handleRevealVoucher(v.allocationId)}
                        disabled={revealingId === v.allocationId}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                          isRevealed
                            ? 'bg-[#141B2D] text-gray-300 border border-[#1F2B47] hover:bg-[#1A253E]'
                            : 'bg-primary text-white shadow-glow hover:bg-primary-hover'
                        }`}
                      >
                        {revealingId === v.allocationId ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : isRevealed ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Code</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Reveal Voucher Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Redemption Instructions */}
                    <div className="p-3.5 rounded-xl bg-[#141B2D]/60 border border-[#1F2B47] text-xs text-gray-300 space-y-1">
                      <span className="font-semibold text-primary-light block">Redemption Guide:</span>
                      <p className="text-gray-300 leading-relaxed text-[11px]">
                        {instructions}
                      </p>
                      <div className="text-[10px] text-gray-400 pt-1">
                        Region: <strong>{v.region}</strong> • Single-use authorization token
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center border border-[#1F2B47] space-y-4">
              <Award className="w-8 h-8 text-gray-400 mx-auto" />
              <h3 className="text-base font-bold text-white">No active vouchers yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Explore our catalog to find your target certification and checkout with instant automated delivery.
              </p>
              <Link
                href="/certifications"
                className="inline-block px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-glow"
              >
                Browse Marketplace
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MY ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1F2B47]/60">
                <div>
                  <div className="text-xs text-gray-400">Order Number:</div>
                  <div className="text-base font-bold text-white font-mono">{order.orderNumber}</div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    order.status === 'fulfilled'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : order.status === 'paid'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#141B2D] border border-[#1F2B47] text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{item.certificationName}</div>
                      <div className="text-gray-400">
                        {item.providerName} • Exam {item.examCode} • Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="font-bold text-white">
                      {formatInr(item.totalPriceInr)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-gray-400">
                <div>
                  Payment Method: <strong className="text-gray-200">{order.paymentMethod || 'Razorpay Gateway'}</strong>
                  {order.razorpayPaymentId && (
                    <span className="font-mono text-[11px] block text-gray-400">
                      ID: {order.razorpayPaymentId}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span>Grand Total:</span>
                  <span className="text-base font-bold text-white">{formatInr(order.totalAmountInr)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: SUPPORT & TICKETS */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Support Requests</h3>
            <Link
              href="/support"
              className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs shadow-glow"
            >
              Create New Ticket
            </Link>
          </div>

          <div className="space-y-4">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400">{t.ticketNumber}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#162035] text-primary-light border border-[#253556]">
                      {t.category}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    t.status === 'resolved' 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {t.status.toUpperCase()}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{t.subject}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{t.message}</p>
                <div className="text-[11px] text-gray-400 pt-1">
                  Submitted: {formatDate(t.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
