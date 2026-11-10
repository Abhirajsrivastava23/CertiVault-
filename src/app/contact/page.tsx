'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-surface-border pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact CertiVault
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Have questions regarding bulk voucher procurement for enterprise teams, college cohorts, or billing inquiries? Reach out to our specialized advisors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Direct Communications</h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-primary-light shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Customer Support Email</span>
                    <strong className="text-white text-sm">support@certivault.in</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-accent-light shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Enterprise & Bulk Hotline</span>
                    <strong className="text-white text-sm">+91 (080) 4920-8190</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Headquarters</span>
                    <span className="text-white">Tech Park Sector 4, Outer Ring Road, Bengaluru, Karnataka 560103, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-surface-50 border border-surface-border flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Operational Support Hours</span>
                    <span className="text-white">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-white">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-400">
                Fill out the form below and our operations desk will respond within 4 business hours.
              </p>

              {sent && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Your message has been delivered to our support team. We will get back to you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Rahul Sharma"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="rahul@company.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                  />
                  <Input
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="e.g. Bulk voucher procurement query"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="How can we assist you?"
                    className="w-full rounded-lg bg-surface-200 border border-surface-border text-xs text-white p-3 focus:outline-none focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="shadow-glow gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </Button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
