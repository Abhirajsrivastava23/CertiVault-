'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Send, CheckCircle2, AlertCircle, MessageSquare, Phone, BookOpen, Clock } from 'lucide-react';

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Voucher Redemption');
  const [orderId, setOrderId] = useState('');
  const [userEmail, setUserEmail] = useState('learner@certivault.in');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr-demo-1001',
          userEmail,
          orderId: orderId || undefined,
          category,
          subject,
          message,
          priority,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit support ticket.');
      }

      setCreatedTicket(data.ticket);
    } catch (err: any) {
      setError(err.message || 'Error creating ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Candidate Assistance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          CertiVault Help & Support Desk
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Need help applying a voucher code on Pearson VUE, Webassessor, or resolving a payment confirmation? 
          Our specialized exam certification desk is ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Support Highlights */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-light" />
              SLA & Response Times
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Standard tickets are reviewed within 4 to 8 business hours. For urgent exam appointment issues within 24 hours of test time, mark priority as <strong>High</strong> or <strong>Urgent</strong>.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Quick Knowledgebase
            </h4>
            <ul className="text-xs space-y-2 text-primary-light">
              <li>
                <Link href="/faq" className="hover:underline">How to apply voucher on Pearson VUE →</Link>
              </li>
              <li>
                <Link href="/shipping-and-delivery" className="hover:underline">Digital delivery timeline →</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:underline">Voucher validity rules →</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Ticket Form */}
        <div className="md:col-span-2">
          {createdTicket ? (
            <div className="glass-card rounded-2xl p-8 border border-emerald-500/40 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Ticket Created Successfully!</h2>
              <div className="p-4 rounded-xl bg-[#141B2D] border border-[#1F2B47] text-xs max-w-sm mx-auto text-left space-y-1.5">
                <div>Ticket ID: <strong className="text-white font-mono">{createdTicket.ticketNumber}</strong></div>
                <div>Category: <strong className="text-gray-200">{createdTicket.category}</strong></div>
                <div>Status: <strong className="text-emerald-400">Open</strong></div>
              </div>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                A confirmation has been logged. You can review updates directly inside your dashboard.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs shadow-glow inline-block"
                >
                  View in Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1F2B47] space-y-4">
              <h2 className="text-lg font-bold text-white">Open Support Request</h2>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Voucher Redemption">Voucher Redemption Issue</option>
                    <option value="Payment Issue">Payment Verification / UPI Delay</option>
                    <option value="Order Inquiry">Order Confirmation / Receipt</option>
                    <option value="Technical Support">Platform / Account Login</option>
                    <option value="General">General Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  >
                    <option value="low">Low (General Inquiry)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="high">High (Exam Scheduled Soon)</option>
                    <option value="urgent">Urgent (Exam Within 24h)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Order Number (Optional)</label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="CV-2026-XXXXXX"
                    className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Need assistance applying AZ-104 promo code on Pearson VUE"
                  className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Description / Details</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe the exact error message or testing center query..."
                  className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-semibold text-xs shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Open Support Ticket'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
