# CertiVault – Authorized IT Certification Voucher Marketplace

> **"Your Certification. Your Career. Your Next Opportunity."**

CertiVault is a complete, production-ready full-stack certification voucher marketplace built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL with Row Level Security (RLS), Razorpay payment processing, and an automated zero-leakage voucher inventory system.

---

## 🌟 Product Architecture & Highlights

- **Legitimate Voucher Resale Engine**: Designed specifically for authentic, pre-purchased exam vouchers across Microsoft, AWS, Google Cloud, Cisco, CompTIA, and Nutanix.
- **Automated Instant Delivery**: Atomic order fulfillment upon verified payment, locking available stock and delivering vouchers straight to the customer dashboard.
- **Zero-Leakage Security (Private Schema & Masking)**:
  - Private database tables (`private.voucher_inventory`, `private.voucher_allocations`, `private.payment_events`) are isolated from the public Supabase API.
  - Vouchers are masked by default (`CV-••••-••••-9821`) and can only be unmasked through an authenticated, audit-logged backend call by the verified order owner.
- **Server-Side Price Integrity**: All prices and quantities are strictly validated on the backend in integer paise to prevent client-side price tampering.
- **Razorpay India Payment Gateway**: Supports UPI (Google Pay, PhonePe, Paytm), Net Banking across 50+ banks, and Credit/Debit cards with webhook signature verification.
- **Deterministic Rule-Based Career Finder**: Interactive 4-step recommendation engine that pairs candidates with high-ROI certification pathways based on goals, experience, budget, and tech stack.
- **Protected Batch Inventory Import**: Authenticated CSV/JSON parser with validation for certification mapping, duplicate detection, and expiration checks.

---

## 🛠 Technology Stack

- **Frontend**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Canvas Confetti.
- **Backend**: Next.js Route Handlers, Zod Validation, Node.js Crypto (HMAC SHA256).
- **Database**: Supabase PostgreSQL, Row Level Security (RLS) policies, Custom PostgreSQL types, Stored Procedures (`private.fulfill_order`, `public.reveal_customer_voucher`).
- **Payments**: Razorpay Node SDK, Webhook HMAC signature verification.
- **Delivery & Email**: Resend transactional email architecture.

---

## 📁 Project Structure

```
├── supabase/
│   ├── migrations/
│   │   └── 20261108000000_certivault_schema.sql  # Complete PostgreSQL schema, RLS & RPCs
│   └── seed.sql                                  # Verified catalog & initial authorized inventory
├── src/
│   ├── app/
│   │   ├── (public pages)
│   │   │   ├── page.tsx                          # Homepage with Hero, Providers, Featured, How It Works, FAQs
│   │   │   ├── certifications/page.tsx           # Multi-filter searchable marketplace
│   │   │   ├── certifications/[slug]/page.tsx    # Detailed exam blueprint & sticky purchase card
│   │   │   ├── categories/page.tsx               # 10 Domain category hub
│   │   │   ├── categories/[slug]/page.tsx        # Specific category listings
│   │   │   ├── career-finder/page.tsx            # Rule-based interactive recommendation engine
│   │   │   ├── checkout/page.tsx                 # Secure Razorpay checkout & success celebration
│   │   │   ├── dashboard/page.tsx                # Customer dashboard with secure voucher reveal
│   │   │   ├── auth/                             # Login, Register, Forgot Password, Reset Password
│   │   │   └── (policy & trust pages)            # About, Contact, Support, FAQ, Shipping, Refunds, Terms, Privacy
│   │   └── api/
│   │       ├── orders/create/route.ts            # Server-side price & stock verification
│   │       ├── payment/create-razorpay-order/    # Razorpay order generation
│   │       ├── payment/verify/route.ts           # Payment signature verification & atomic fulfillment
│   │       ├── webhooks/razorpay/route.ts        # Idempotent payment webhook listener
│   │       ├── vouchers/reveal/route.ts          # Authenticated unmasked code access & audit logging
│   │       ├── admin/inventory/import/route.ts   # Protected CSV inventory importer
│   │       ├── support/ticket/route.ts           # Customer support ticketing
│   │       └── contact/route.ts                  # Enterprise inquiry handler
│   ├── components/
│   │   ├── layout/                               # Navbar & Footer
│   │   └── cards/                                # CertificationCard, ProviderCard, CategoryCard
│   └── lib/
│       ├── data/                                 # Verified certifications, providers, categories, career paths
│       ├── services/                             # MockStore singleton for local demo & runtime state
│       ├── supabase/                             # Client, Server (SSR), and Admin clients
│       ├── types/                                # Strict TypeScript interfaces
│       └── utils/                                # INR currency formatters, code masking, order IDs
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials:
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_YourTestKeyId"
RAZORPAY_KEY_ID="rzp_test_YourTestKeyId"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_signing_secret"

RESEND_API_KEY="re_your_api_key"
ADMIN_API_KEY="cv_admin_supersecret_key_2026"
```

### 3. Run Database Migrations (Supabase)
Run the SQL migration in `supabase/migrations/20261108000000_certivault_schema.sql` inside your Supabase SQL Editor, followed by `supabase/seed.sql`.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security Best Practices Implemented

1. **Private Schema Separation**: Inventory codes are housed in `private.voucher_inventory`, unaccessible via public PostgREST API routes.
2. **Deterministic Price Control**: Frontend inputs never submit price or totals. The backend calculates totals from internal catalog IDs in integer paise.
3. **On-Demand Voucher Unmasking**: Client state displays masked values (`••••-••••-••••-9821`). Codes are unmasked only via authenticated `POST /api/vouchers/reveal` with ownership verification.
4. **HMAC SHA256 Webhook Verification**: Razorpay webhooks and client signatures are cryptographically validated before order fulfillment.
5. **Admin Route Protection**: Inventory import is guarded with `ADMIN_API_KEY` with duplicate and expiry validation.

---

## 📄 License
Commercial License - CertiVault Technologies Pvt. Ltd..
