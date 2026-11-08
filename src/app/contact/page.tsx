'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryType, setInquiryType] = useState('enterprise_vouchers');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          organization,
          inquiryType,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccess(data.message || 'Your inquiry was received. An advisor will respond shortly.');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Error submitting message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact CertiVault
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Have questions about bulk enterprise purchasing, GST billing invoices, or exam validity? 
          Our advisory team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Contact Info Sidebar */}
        <div className="glass-card rounded-2xl p-6 border border-[#1F2B47] space-y-6">
          <h3 className="text-base font-bold text-white">Direct Contacts</h3>

          <div className="space-y-4 text-xs text-gray-300">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">Candidate Support</span>
                <a href="mailto:support@certivault.in" className="text-gray-400 hover:text-white">support@certivault.in</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">Enterprise & Bulk Sales</span>
                <a href="mailto:enterprise@certivault.in" className="text-gray-400 hover:text-white">enterprise@certivault.in</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">Telephone Support</span>
                <span className="text-gray-400">+91 (080) 4567-8900</span>
                <span className="text-[10px] text-gray-400 block">Mon - Fri, 9:30 AM - 6:30 PM IST</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">Registered Operations</span>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  CertiVault Technologies Pvt. Ltd.<br />
                  Outer Ring Road, Bellandur,<br />
                  Bengaluru, Karnataka 560103, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 glass-card rounded-2xl p-6 sm:p-8 border border-[#1F2B47] space-y-4">
          <h2 className="text-lg font-bold text-white">Send an Inquiry</h2>

          {success && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Your Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Rohan Sharma"
                className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Your Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rohan@company.com"
                className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Organization / College (Optional)</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Acme Tech Solutions"
                className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Inquiry Purpose</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
              >
                <option value="enterprise_vouchers">Enterprise Bulk Purchase (5+ Vouchers)</option>
                <option value="bulk_discount">Academic / Student Group Discount</option>
                <option value="candidate_support">Voucher Scheduling Support</option>
                <option value="partnership">Authorized Distributor Partnership</option>
                <option value="other">General Question</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Message / Requirements</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe the certification exam codes, candidate counts, and any specific billing details..."
              className="w-full bg-[#141B2D] border border-[#1F2B47] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-semibold text-xs shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Send Inquiry'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
