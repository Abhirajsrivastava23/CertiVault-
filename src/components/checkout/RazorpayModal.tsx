'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  Smartphone, 
  CreditCard, 
  Building, 
  CheckCircle2, 
  QrCode, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { formatInr } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';

export interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  orderId: string;
  razorpayOrderId: string;
  amountInPaise: number;
  certificationName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  initialMethod?: 'upi' | 'card' | 'netbanking';
  onPaymentSuccess: (payload: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paymentMethod: string;
  }) => Promise<void>;
}

export function RazorpayModal({
  isOpen,
  onClose,
  orderNumber,
  orderId,
  razorpayOrderId,
  amountInPaise,
  certificationName,
  customerName,
  customerEmail,
  customerPhone,
  initialMethod = 'upi',
  onPaymentSuccess,
}: RazorpayModalProps) {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking'>(initialMethod);
  const [upiId, setUpiId] = useState('alex@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('889');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    setStatusText('Contacting Bank Gateway...');

    // Small delay to simulate authentic banking network handshake
    await new Promise(r => setTimeout(r, 600));
    setStatusText('Processing Payment Authorization...');

    await new Promise(r => setTimeout(r, 600));
    setStatusText('Payment Authorized! Verifying Cryptographic Signature...');

    const simulatedPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const simulatedSignature = `simulated_sig_${Math.random().toString(36).substring(2, 14)}`;

    let methodLabel = 'Razorpay UPI';
    if (activeTab === 'upi') methodLabel = `UPI (${upiId || 'Google Pay'})`;
    else if (activeTab === 'card') methodLabel = `Credit Card (ending in ${cardNumber.slice(-4) || '4444'})`;
    else if (activeTab === 'netbanking') methodLabel = `Net Banking (${selectedBank})`;

    try {
      await onPaymentSuccess({
        orderId,
        razorpayOrderId,
        razorpayPaymentId: simulatedPaymentId,
        razorpaySignature: simulatedSignature,
        paymentMethod: methodLabel,
      });
    } catch (err) {
      console.error('Payment error:', err);
      setIsProcessing(false);
      setStatusText(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Razorpay Top Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center font-black tracking-tight text-white border border-white/20">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide">Razorpay Checkout</span>
                <span className="bg-blue-900/60 text-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-400/30">
                  Trusted Business
                </span>
              </div>
              <p className="text-[11px] text-blue-100">CertiVault Official Marketplace</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Order Price & Details Header */}
        <div className="bg-slate-800/80 px-6 py-3 border-b border-slate-700/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block">Exam Certification</span>
            <span className="font-bold text-white truncate max-w-[240px] block">{certificationName}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">Total Amount</span>
            <span className="text-base font-extrabold text-emerald-400">{formatInr(amountInPaise)}</span>
          </div>
        </div>

        {/* Payment Methods Nav */}
        <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900/90 text-xs">
          {[
            { id: 'upi', label: 'UPI / QR', icon: Smartphone },
            { id: 'card', label: 'Card', icon: CreditCard },
            { id: 'netbanking', label: 'Net Banking', icon: Building },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                disabled={isProcessing}
                className={`py-3 px-2 flex items-center justify-center gap-1.5 font-semibold transition-all border-b-2 ${
                  isActive
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-4">
          
          {/* UPI TAB */}
          {activeTab === 'upi' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Select UPI App or Enter VPA</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Zero Convenience Fee
                </span>
              </div>

              {/* Quick UPI App Selectors */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Google Pay', handle: '@okhdfcbank' },
                  { name: 'PhonePe', handle: '@ybl' },
                  { name: 'Paytm', handle: '@paytm' },
                ].map((app) => (
                  <button
                    key={app.name}
                    type="button"
                    onClick={() => setUpiId(`alex${app.handle}`)}
                    className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:border-blue-500/50 hover:bg-slate-700/50 text-left transition-all"
                  >
                    <span className="text-xs font-bold text-white block">{app.name}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{app.handle}</span>
                  </button>
                ))}
              </div>

              {/* UPI ID Input */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  UPI ID / VPA
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="mobilenumber@upi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 flex items-center gap-2">
                <QrCode className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Instant QR generation available on mobile UPI app checkout</span>
              </div>
            </div>
          )}

          {/* CARD TAB */}
          {activeTab === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4111 2222 3333 4444"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  defaultValue={customerName}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* NET BANKING TAB */}
          {activeTab === 'netbanking' && (
            <div className="space-y-3">
              <span className="block text-xs text-slate-400">Select Bank</span>
              <div className="grid grid-cols-2 gap-2">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      selectedBank === bank
                        ? 'border-blue-500 bg-blue-500/15 text-white font-bold'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Processing Status Banner */}
          {isProcessing && statusText && (
            <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-800/40 text-xs text-blue-300 flex items-center gap-2.5">
              <Loader2 className="h-4 w-4 animate-spin text-blue-400 shrink-0" />
              <span>{statusText}</span>
            </div>
          )}

          {/* Pay Button */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handlePay}
            isLoading={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 text-sm shadow-lg shadow-blue-500/20"
          >
            <span>Pay {formatInr(amountInPaise)}</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>

          {/* Razorpay Trust Footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>256-Bit SSL • PCI-DSS Level 1 Compliant Security</span>
          </div>

        </div>

      </div>
    </div>
  );
}

