import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Award, CheckCircle2, Mail, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#070B16] border-t border-[#1F2B47] text-gray-400 text-sm mt-20">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-[#1F2B47]/60 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary-light">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Authorized Reseller</h4>
              <p className="text-xs text-gray-400">100% legitimate exam vouchers from verified distribution channels.</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-light">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Instant Digital Delivery</h4>
              <p className="text-xs text-gray-400">Automatic code allocation & secure masking inside your customer dashboard.</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Verified Exam Validity</h4>
              <p className="text-xs text-gray-400">Guaranteed validity for Pearson VUE, Kryterion, and official testing centers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Certi<span className="text-primary-light">Vault</span>
              </span>
            </Link>
            <p className="text-gray-300 font-medium italic text-base">
              &ldquo;Your Certification. Your Career. Your Next Opportunity.&rdquo;
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              CertiVault provides authorized, price-optimized IT certification vouchers for candidates, 
              working professionals, and enterprises across India and global delivery regions. 
              Only genuine vouchers with verified inventory are offered.
            </p>
            <div className="pt-2 text-xs text-gray-400 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Mail className="w-3.5 h-3.5 text-primary" /> support@certivault.in
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-primary" /> +91 (080) 4567-8900
              </span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider">Marketplace</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/certifications" className="hover:text-white transition-colors">All Certifications</Link>
              </li>
              <li>
                <Link href="/certifications?provider=microsoft" className="hover:text-white transition-colors">Microsoft Azure</Link>
              </li>
              <li>
                <Link href="/certifications?provider=aws" className="hover:text-white transition-colors">Amazon Web Services</Link>
              </li>
              <li>
                <Link href="/certifications?provider=google-cloud" className="hover:text-white transition-colors">Google Cloud Platform</Link>
              </li>
              <li>
                <Link href="/certifications?provider=cisco" className="hover:text-white transition-colors">Cisco Systems</Link>
              </li>
              <li>
                <Link href="/certifications?provider=comptia" className="hover:text-white transition-colors">CompTIA</Link>
              </li>
              <li>
                <Link href="/certifications?provider=nutanix" className="hover:text-white transition-colors">Nutanix HCI</Link>
              </li>
            </ul>
          </div>

          {/* Pathways & Discovery */}
          <div className="space-y-3">
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider">Career Guidance</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/career-finder" className="hover:text-white text-primary-light font-medium transition-colors">Career Finder Engine</Link>
              </li>
              <li>
                <Link href="/categories/cloud-computing" className="hover:text-white transition-colors">Cloud Solutions Architect</Link>
              </li>
              <li>
                <Link href="/categories/cybersecurity" className="hover:text-white transition-colors">Cybersecurity Analyst</Link>
              </li>
              <li>
                <Link href="/categories/devops" className="hover:text-white transition-colors">DevOps & Kubernetes</Link>
              </li>
              <li>
                <Link href="/categories/networking" className="hover:text-white transition-colors">Enterprise Networking</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">Exam FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider">Trust & Policies</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About CertiVault</Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">Candidate Support</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Enterprise & Bulk Inquiries</Link>
              </li>
              <li>
                <Link href="/shipping-and-delivery" className="hover:text-white transition-colors">Digital Delivery Policy</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">Refund & Validity Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1F2B47]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} CertiVault Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-[11px] text-gray-400">
            Microsoft, AWS, Google Cloud, Cisco, CompTIA, and Nutanix are registered trademarks of their respective owners. 
            CertiVault is an independent reseller of authorized examination vouchers.
          </p>
        </div>
      </div>
    </footer>
  );
}
