'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, AlertCircle, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin@123');
  const [password, setPassword] = useState('certivault123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Store local session indicator
      sessionStorage.setItem('cv_admin_unlocked', 'true');
      router.push('/admin');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 bg-navy-950 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        
        <div className="rounded-2xl border-2 border-primary/40 bg-surface-card p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Top accent badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/40 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              <Lock className="h-3 w-3" />
              <span>Restricted Admin Portal</span>
            </span>
          </div>

          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-glow">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Certi<span className="text-primary-light">Vault</span>
              </span>
            </Link>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Master Admin Authentication
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to manage voucher inventories, fulfill orders, and inspect audit logs.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800/50 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin@123"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-200 border border-surface-border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="certivault123"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-200 border border-surface-border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface-200/80 border border-surface-border text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Default Username:</span>
                <strong className="text-white font-mono">admin@123</strong>
              </div>
              <div className="flex justify-between">
                <span>Default Password:</span>
                <strong className="text-white font-mono">certivault123</strong>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full shadow-glow text-sm font-bold py-3.5 gap-2 mt-2"
            >
              <Lock className="h-4 w-4" />
              <span>Authenticate as Administrator</span>
            </Button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              ← Return to Marketplace Homepage
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

