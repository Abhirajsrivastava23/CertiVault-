'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase, isSupabaseConfigured } from '@/lib/db/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/profile`,
        });
        if (resetError) throw resetError;
      }
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send password reset link';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 bg-background min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        
        <div className="rounded-2xl border border-surface-border bg-surface-card p-8 sm:p-10 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Certi<span className="text-primary-light">Vault</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-slate-400">
              Enter your registered email address to receive password recovery instructions.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/40 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isSubmitted ? (
            <div className="p-4 rounded-xl bg-surface-200 border border-surface-border text-center space-y-3">
              <div className="h-10 w-10 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 mx-auto flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an account exists for <strong className="text-white">{email}</strong>, a secure reset link has been dispatched to your inbox.
              </p>
              <div className="pt-2">
                <Link href="/login">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full shadow-glow text-sm font-semibold mt-2"
              >
                <span>Send Password Reset Link</span>
              </Button>
            </form>
          )}

          <div className="text-center pt-4 border-t border-surface-border text-xs text-slate-400">
            <Link href="/login" className="text-slate-300 hover:text-white inline-flex items-center gap-1.5 font-medium">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

