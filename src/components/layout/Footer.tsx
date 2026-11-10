import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, Lock, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-surface-border text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Certi<span className="text-primary-light">Vault</span>
              </span>
            </Link>
            <p className="text-slate-300 font-medium italic text-sm">
              &ldquo;Your Certification. Your Career. Your Next Opportunity.&rdquo;
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              CertiVault is an authorized IT certification voucher marketplace providing legitimate exam vouchers, career roadmaps, and secure digital delivery for professionals and enterprises worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-2">
              <Lock className="h-3.5 w-3.5" />
              <span>100% Genuine Testing Center Exam Vouchers</span>
            </div>
          </div>

          {/* Catalog Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Certifications
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/certifications?provider=aws" className="hover:text-white transition-colors">
                  AWS Certifications
                </Link>
              </li>
              <li>
                <Link href="/certifications?provider=microsoft" className="hover:text-white transition-colors">
                  Microsoft Azure Credentials
                </Link>
              </li>
              <li>
                <Link href="/certifications?provider=google-cloud" className="hover:text-white transition-colors">
                  Google Cloud Platform (GCP)
                </Link>
              </li>
              <li>
                <Link href="/certifications?provider=cisco" className="hover:text-white transition-colors">
                  Cisco CCNA & CyberOps
                </Link>
              </li>
              <li>
                <Link href="/certifications?provider=comptia" className="hover:text-white transition-colors">
                  CompTIA Security+ & Network+
                </Link>
              </li>
              <li>
                <Link href="/certifications?provider=linux-foundation" className="hover:text-white transition-colors">
                  Kubernetes (CKA / CNCF)
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/categories/cloud-computing" className="hover:text-white transition-colors">
                  Cloud Computing
                </Link>
              </li>
              <li>
                <Link href="/categories/cybersecurity" className="hover:text-white transition-colors">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/categories/devops" className="hover:text-white transition-colors">
                  DevOps & Containers
                </Link>
              </li>
              <li>
                <Link href="/categories/artificial-intelligence" className="hover:text-white transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/categories/networking" className="hover:text-white transition-colors">
                  Enterprise Networking
                </Link>
              </li>
              <li>
                <Link href="/career-finder" className="text-primary-light hover:underline font-medium">
                  Career Finder Tool →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About CertiVault
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Support & Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping-and-delivery" className="hover:text-white transition-colors">
                  Digital Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} CertiVault Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-slate-400">
            All brand names, trademarks, and registered marks (e.g. AWS, Microsoft, Cisco, CompTIA, Google Cloud) belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
