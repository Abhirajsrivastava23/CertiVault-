'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Minus,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { formatInr } from '@/lib/utils/formatters';
import { Certification } from '@/lib/types';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certIdParam = searchParams.get('certId') || CERTIFICATIONS[0].id;

  const [selectedCertId, setSelectedCertId] = useState<string>(certIdParam);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('Arun Patel');
  const [customerEmail, setCustomerEmail] = useState('learner@certivault.in');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [companyName, setCompanyName] = useState('Apex Cloud Solutions');
  const [gstin, setGstin] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<any | null>(null);

  const selectedCert = CERTIFICATIONS.find((c) => c.id === selectedCertId) || CERTIFICATIONS[0];

  const subtotalPaise = selectedCert.voucherPriceInr * quantity;
  const taxPaise = 0; // Digital educational vouchers exempt or included in display price
  const totalPaise = subtotalPaise + taxPaise;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setErrorMessage('You must accept the terms of service and digital delivery policy.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Create order on backend (Server verifies prices and stock against verified catalog)
      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr-demo-1001',
          customerName,
          customerEmail,
          customerPhone,
          items: [
            {
              certificationId: selectedCert.id,
              quantity,
            },
          ],
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to create order on server.');
      }

      const order = orderData.order;

      // 2. Initiate Razorpay order on backend
      const rzpRes = await fetch('/api/payment/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      });

      const rzpData = await rzpRes.json();
      if (!rzpRes.ok || !rzpData.success) {
        throw new Error(rzpData.error || 'Failed to initialize payment gateway.');
      }

      // 3. Complete payment verification (simulated / real gateway verification)
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          razorpay_order_id: rzpData.razorpayOrderId,
          razorpay_payment_id: `pay_${Math.random().toString(36).substring(2, 14)}`,
          razorpay_signature: 'test_verified_signature',
          isSimulation: true,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || 'Payment verification failed.');
      }

      // Confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setSuccessOrder(order);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Error processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Secure Voucher Checkout
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Instant digital allocation to your customer dashboard upon payment verification.
        </p>
      </div>

      {successOrder ? (
        /* Order Success View */
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Payment Verified & Order Fulfilled!</h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              Your exam voucher has been automatically allocated and secured in your vault.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#141B2D] border border-[#1F2B47] max-w-md mx-auto text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Order Number:</span>
              <span className="font-mono font-bold text-white">{successOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Certification:</span>
              <span className="font-semibold text-white">{selectedCert.name} ({selectedCert.examCode})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount Paid:</span>
              <span className="font-bold text-emerald-400">{formatInr(totalPaise)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delivery Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Allocated in Dashboard
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold text-xs shadow-glow flex items-center gap-2"
            >
              <span>View & Reveal Voucher in Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/certifications"
              className="px-5 py-3 rounded-xl bg-[#141B2D] border border-[#1F2B47] text-gray-300 font-semibold text-xs hover:text-white"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      ) : (
        /* Standard Checkout Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Form: Details & Billing */}
          <form onSubmit={handleCheckout} className="lg:col-span-2 space-y-6">
            
            {/* 1. Item Selection & Quantity */}
            <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-light" />
                Selected Certification Voucher
              </h2>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/20 text-primary-light border border-primary/30">
                      {selectedCert.providerName}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5">{selectedCert.name}</h3>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Exam Code: <strong className="text-gray-200">{selectedCert.examCode}</strong> • {selectedCert.validityMonths} Mo Validity
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    {/* Quantity counter */}
                    <div className="flex items-center bg-[#0B1020] border border-[#253556] rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#141B2D]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(5, quantity + 1))}
                        className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#141B2D]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">Item Total</span>
                      <span className="text-base font-bold text-white">{formatInr(subtotalPaise)}</span>
                    </div>
                  </div>
                </div>

                {/* Switch certification dropdown */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Change certification:</span>
                  <select
                    value={selectedCertId}
                    onChange={(e) => setSelectedCertId(e.target.value)}
                    className="bg-[#141B2D] border border-[#1F2B47] text-gray-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-primary"
                  >
                    {CERTIFICATIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.examCode} - {c.name} ({formatInr(c.voucherPriceInr)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Candidate & Billing Details */}
            <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-accent-light" />
                Candidate & Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Candidate Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Delivery Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Mobile Phone (for payment OTP)</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Company / Organization (Optional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* 3. Terms & Acceptance */}
            <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 text-primary focus:ring-0 bg-[#141B2D] mt-0.5"
                />
                <span className="text-xs text-gray-300 leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms-and-conditions" className="text-primary-light underline" target="_blank">
                    Terms & Conditions
                  </Link>
                  ,{' '}
                  <Link href="/refund-policy" className="text-primary-light underline" target="_blank">
                    Refund Policy
                  </Link>
                  , and understand that exam vouchers are non-refundable digital items delivered instantly upon successful payment.
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" />
                  <span>Processing Payment via Razorpay...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {formatInr(totalPaise)} Securely</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Right Column: Order Summary */}
          <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-4 lg:sticky lg:top-28">
            <h3 className="text-base font-bold text-white">Order Summary</h3>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Vouchers Subtotal ({quantity}x):</span>
                <span className="font-semibold text-white">{formatInr(subtotalPaise)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Estimated Digital Taxes (GST):</span>
                <span className="font-semibold text-emerald-400">Included</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Instant Delivery Fee:</span>
                <span className="font-semibold text-emerald-400">₹0 (Free)</span>
              </div>

              <div className="pt-3 border-t border-[#1F2B47] flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Final Amount:</span>
                <span className="text-2xl font-extrabold text-primary-light">{formatInr(totalPaise)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141B2D] border border-[#1F2B47] text-[11px] text-gray-400 space-y-2 mt-4">
              <div className="flex items-center gap-1.5 text-gray-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protected by Razorpay</span>
              </div>
              <p className="leading-relaxed">
                Supports UPI (GPay, PhonePe, Paytm), Net Banking, RuPay, Visa, and Mastercard with 256-bit encryption.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-400">
        Loading secure checkout...
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
