import React from 'react';
import Link from 'next/link';
import { FaqSection } from '@/components/home/FaqSection';
import { ArrowLeft, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FaqPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <Link href="/dashboard/support">
            <Button variant="ghost" size="sm" className="text-xs text-primary-light gap-1">
              <LifeBuoy className="h-3.5 w-3.5" />
              <span>Contact Support</span>
            </Button>
          </Link>
        </div>

        <FaqSection />

      </div>
    </div>
  );
}
