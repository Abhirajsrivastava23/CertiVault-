import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CertiVault | Authorized IT Certification Voucher Marketplace',
  description: 'Your Certification. Your Career. Your Next Opportunity. Explore, compare, and purchase legitimate exam vouchers for AWS, Microsoft Azure, Google Cloud, Cisco, CompTIA, and Nutanix.',
  keywords: [
    'certification vouchers',
    'AWS exam voucher',
    'Azure AZ-900 voucher',
    'AZ-104 voucher India',
    'CompTIA Security+ voucher discount',
    'Cisco CCNA exam voucher',
    'Pearson VUE voucher buy',
    'IT certification discounts'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0B1020] text-gray-100 antialiased selection:bg-primary selection:text-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
