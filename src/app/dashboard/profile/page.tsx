'use client';

import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Phone, Building, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ProfileSettingsPage() {
  const [fullName, setFullName] = useState('Alex Morgan');
  const [email] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [company, setCompany] = useState('CloudScale Technologies');
  const [jobTitle, setJobTitle] = useState('DevOps Specialist');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-surface-border pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
          Account Coordinates
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Profile & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Update your contact coordinates for voucher notifications and billing receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Main Form (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Personal Information</h3>

            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Primary Email Address"
              value={email}
              disabled
              title="Email cannot be changed directly for security audit reasons"
            />

            <Input
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Company / Organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Input
                label="Job Title / Role"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-surface-border">
              {saved && (
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  <span>Profile updated successfully!</span>
                </span>
              )}
              {!saved && <div />}
              <Button type="submit" variant="primary" size="sm" className="shadow-glow">
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Security Summary (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Security Status</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your account is configured with multi-factor audit logging and protected database role segregation.
            </p>
            <div className="pt-2 border-t border-surface-border/60 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span>Account Role:</span>
                <span className="font-semibold text-primary-light">Verified Customer</span>
              </div>
              <div className="flex justify-between">
                <span>Voucher Encryption:</span>
                <span className="font-semibold text-emerald-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

