import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CertiVault | Authorized IT Certification Voucher Marketplace',
  description: 'Your Certification. Your Career. Your Next Opportunity. Explore, compare, and purchase legitimate certification exam vouchers for AWS, Microsoft, GCP, Cisco, and CompTIA.',
  keywords: 'certification vouchers, AWS exam voucher, Azure AZ-900 voucher, Cisco CCNA discount, CompTIA Security+ promo, IT certifications marketplace',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-slate-100 selection:bg-primary/30">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
