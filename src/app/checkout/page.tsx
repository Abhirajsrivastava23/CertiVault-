'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ArrowLeft,
  Smartphone,
  Building,
  HelpCircle
} from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { formatInr } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

declare global {
  interface Window {
    Razorpay: any;
  }
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certId = searchParams.get('certId') || 'cert-ms-az900';
  const initialQty = parseInt(searchParams.get('qty') || '1', 10);

  const [quantity, setQuantity] = useState(initialQty > 0 ? initialQty : 1);
  const [customerName, setCustomerName] = useState('Alex Morgan');
  const [customerEmail, setCustomerEmail] = useState('alex.morgan@example.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [termsAccepted, setTermsAccepted] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected payment simulation mode for sandbox
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const cert = CERTIFICATIONS.find((c) => c.id === certId) || CERTIFICATIONS[0];

  // Pricing calculations
  const unitPrice = cert.voucherPriceInr;
  const subtotal = unitPrice * quantity;
  const taxAmount = Math.round(subtotal * 0.18); // 18% GST
  const finalTotal = subtotal + taxAmount;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!termsAccepted) {
      setErrorMessage('Please accept the Terms & Conditions and Digital Delivery Policy to proceed.');
      return;
    }

    if (!customerEmail || !customerName || !customerPhone) {
      setErrorMessage('Please provide complete customer contact details for voucher issuance.');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create Order on Backend (verifies price and stock in private inventory)
      const createRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificationId: cert.id,
          quantity,
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      const orderData = await createRes.json();
      if (!createRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize order');
      }

      const { orderId, orderNumber, razorpayOrderId, razorpayKeyId, isSimulated } = orderData;

      // Step 2: Handle Razorpay Checkout or Sandbox Simulation
      if (!isSimulated && typeof window !== 'undefined' && window.Razorpay) {
        // Live / Test Mode Razorpay Gateway Modal
        const options = {
          key: razorpayKeyId,
          amount: orderData.amountInPaise,
          currency: 'INR',
          name: 'CertiVault Marketplace',
          description: `${cert.name} Voucher (${quantity}x)`,
          order_id: razorpayOrderId,
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
          },
          theme: {
            color: '#3B82F6',
          },
          handler: async function (response: any) {
            await verifyPayment({
              orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentMethod: 'Razorpay Gateway',
            });
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fast, realistic Sandbox Simulation for instant verification
        const simulatedPaymentId = `pay_sim_${Date.now()}`;
        const simulatedSignature = `simulated_sig_${Math.random().toString(36).substring(2)}`;

        // Small realistic simulated latency
        await new Promise((r) => setTimeout(r, 1200));

        await verifyPayment({
          orderId,
          razorpayOrderId,
          razorpayPaymentId: simulatedPaymentId,
          razorpaySignature: simulatedSignature,
          paymentMethod: selectedMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : selectedMethod === 'card' ? 'Visa / Mastercard' : 'Net Banking',
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred during checkout';
      setErrorMessage(message);
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (payload: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paymentMethod: string;
  }) => {
    try {
      const verifyRes = await fetch('/api/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      // Navigate to order success page
      router.push(`/checkout/success?orderId=${payload.orderId}&orderNumber=${verifyData.orderNumber}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to verify payment';
      setErrorMessage(message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <Link href={`/certifications/${cert.slug}`} className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to {cert.name}</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checkout Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <form onSubmit={handlePayment} className="space-y-6">
              
              {/* Customer Contact Details */}
              <div className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Customer & Voucher Delivery Information</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Your purchase confirmation and encrypted voucher allocation instructions will be routed to these coordinates.
                </p>

                <div className="space-y-3 pt-2">
                  <Input
                    label="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="e.g. Alex Morgan"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Email Address"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      placeholder="alex@company.com"
                    />
                    <Input
                      label="Mobile Phone (for payment OTP)"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    { id: 'upi', label: 'UPI / QR', desc: 'GPay, PhonePe, Paytm', icon: Smartphone },
                    { id: 'card', label: 'Cards', desc: 'Credit / Debit Cards', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', desc: '50+ Supported Banks', icon: Building },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id as any)}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          selectedMethod === method.id
                            ? 'bg-primary/10 border-primary text-white shadow-glow'
                            : 'bg-surface-200 border-surface-border text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <Icon className="h-5 w-5 text-primary-light mb-2" />
                        <h4 className="text-xs font-bold text-white">{method.label}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{method.desc}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 rounded-lg bg-surface-200 border border-surface-border text-xs text-slate-400 flex items-center justify-between">
                  <span>Powered by Razorpay Secure Payments</span>
                  <span className="text-emerald-400 font-medium">Instant Verification</span>
                </div>
              </div>

              {/* Terms & Policies Acceptance */}
              <div className="p-4 rounded-xl bg-surface-200 border border-surface-border space-y-3 text-xs text-slate-300">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded bg-surface-50 border-surface-border text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="leading-relaxed">
                    I acknowledge that certification vouchers are delivered digitally upon payment verification, have a validity of 12 months, and agree to the{' '}
                    <Link href="/terms-and-conditions" className="text-primary-light underline" target="_blank">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/refund-policy" className="text-primary-light underline" target="_blank">
                      Refund Policy
                    </Link>.
                  </span>
                </label>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800/40 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* CTA Pay Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isProcessing}
                className="w-full shadow-glow text-base font-bold py-4 gap-2"
              >
                <Zap className="h-5 w-5" />
                <span>Pay {formatInr(finalTotal)} Securely</span>
              </Button>

            </form>

          </div>

          {/* Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-6 shadow-xl">
              <h3 className="text-base font-bold text-white border-b border-surface-border pb-3">
                Order Summary
              </h3>

              {/* Item Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
                      {cert.providerName}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{cert.name}</h4>
                    <span className="text-xs font-mono text-slate-400">Exam Code: {cert.examCode}</span>
                  </div>
                  <span className="text-sm font-bold text-white whitespace-nowrap">
                    {formatInr(unitPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-surface-border/50">
                  <span>Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-6 w-6 rounded bg-surface-200 border border-surface-border text-white text-xs hover:bg-surface-50"
                    >
                      -
                    </button>
                    <span className="font-bold text-white px-1">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(5, quantity + 1))}
                      className="h-6 w-6 rounded bg-surface-200 border border-surface-border text-white text-xs hover:bg-surface-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Cost Calculation */}
              <div className="space-y-2 pt-4 border-t border-surface-border/60 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal ({quantity}x Voucher):</span>
                  <span className="text-white font-medium">{formatInr(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Goods & Services Tax (GST 18%):</span>
                  <span className="text-white font-medium">{formatInr(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-surface-border">
                  <span>Final Total:</span>
                  <span className="text-primary-light text-xl">{formatInr(finalTotal)}</span>
                </div>
              </div>

              {/* Security Reassurance Box */}
              <div className="p-3.5 rounded-xl bg-surface-200/80 border border-surface-border space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>CertiVault Buyer Safeguard</span>
                </div>
                <p className="leading-relaxed">
                  Your voucher is pre-allocated from our private inventory and held in reserved status during checkout.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
