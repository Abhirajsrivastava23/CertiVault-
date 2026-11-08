-- CertiVault Production Database Schema
-- Supabase PostgreSQL Migration

-- Create private schema for highly sensitive voucher inventory & allocations
CREATE SCHEMA IF NOT EXISTS private;

-- Grant usage on private schema only to service_role and postgres
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role, postgres;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUMS & DOMAINS
-- ============================================================================
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'pending',
    'paid',
    'fulfilled',
    'failed',
    'expired',
    'refund_pending',
    'refunded'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE voucher_status AS ENUM (
    'available',
    'reserved',
    'sold',
    'disabled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE certification_level AS ENUM (
    'Foundational',
    'Associate',
    'Professional',
    'Expert',
    'Specialty'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE ticket_status AS ENUM (
    'open',
    'in_progress',
    'resolved',
    'closed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. PUBLIC TABLES
-- ============================================================================

-- Profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  organization TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'support')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Certification Providers (AWS, Microsoft, Google Cloud, Cisco, CompTIA, Nutanix, etc.)
CREATE TABLE IF NOT EXISTS public.certification_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT NOT NULL,
  description TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Certification Categories (Cloud Computing, AI, Cybersecurity, etc.)
CREATE TABLE IF NOT EXISTS public.certification_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Certifications Catalog
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.certification_providers(id) ON DELETE RESTRICT,
  category_id UUID NOT NULL REFERENCES public.certification_categories(id) ON DELETE RESTRICT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  exam_code TEXT NOT NULL,
  level certification_level NOT NULL DEFAULT 'Associate',
  short_description TEXT NOT NULL,
  overview TEXT NOT NULL,
  purpose TEXT NOT NULL,
  prerequisites TEXT[] NOT NULL DEFAULT '{}',
  target_audience TEXT[] NOT NULL DEFAULT '{}',
  career_opportunities TEXT[] NOT NULL DEFAULT '{}',
  official_exam_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  official_provider_url TEXT NOT NULL,
  preparation_roadmap JSONB NOT NULL DEFAULT '[]'::jsonb,
  voucher_price_inr BIGINT NOT NULL, -- in integer paise (e.g. 1450000 = ₹14,500)
  retail_price_inr BIGINT NOT NULL,  -- original exam price in paise
  validity_days INT NOT NULL DEFAULT 180,
  restrictions TEXT NOT NULL DEFAULT 'Valid for candidates in India and South Asia test centers or online proctored exams.',
  stock_status TEXT NOT NULL DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Certification Skills
CREATE TABLE IF NOT EXISTS public.certification_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  weight_percentage INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Career Paths (for Career Finder & Path Guidance)
CREATE TABLE IF NOT EXISTS public.career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_role TEXT NOT NULL,
  salary_range_inr TEXT NOT NULL,
  industry_demand TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Career Recommendations (Linking Career Paths with Recommended Certifications in sequence)
CREATE TABLE IF NOT EXISTS public.career_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_path_id UUID NOT NULL REFERENCES public.career_paths(id) ON DELETE CASCADE,
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
  step_order INT NOT NULL,
  stage_name TEXT NOT NULL, -- e.g. 'Foundational', 'Core Associate', 'Advanced Specialization'
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(career_path_id, certification_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  order_number TEXT UNIQUE NOT NULL, -- e.g. 'CV-2026-XXXXX'
  status order_status NOT NULL DEFAULT 'pending',
  currency TEXT NOT NULL DEFAULT 'INR',
  subtotal_paise BIGINT NOT NULL,
  tax_paise BIGINT NOT NULL DEFAULT 0,
  total_paise BIGINT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_name TEXT NOT NULL,
  billing_address JSONB,
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  paid_at TIMESTAMPTZ,
  fulfilled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE RESTRICT,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price_paise BIGINT NOT NULL,
  total_price_paise BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Wishlists
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, certification_id)
);

-- Support Tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  ticket_number TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  status ticket_status NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  contact_email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. PRIVATE HIGH-SECURITY SCHEMA TABLES
-- ============================================================================

-- Private Voucher Inventory
-- NEVER exposed to client. Stores authorized inventory ready for allocation.
CREATE TABLE IF NOT EXISTS private.voucher_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE RESTRICT,
  voucher_code TEXT NOT NULL UNIQUE,
  expiry_date DATE NOT NULL,
  region TEXT NOT NULL DEFAULT 'Global',
  redemption_instructions TEXT NOT NULL,
  supplier_reference TEXT,
  status voucher_status NOT NULL DEFAULT 'available',
  reserved_for_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  reserved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Private Voucher Allocations
-- Links fulfilled orders to assigned vouchers.
CREATE TABLE IF NOT EXISTS private.voucher_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
  order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE RESTRICT,
  voucher_id UUID NOT NULL REFERENCES private.voucher_inventory(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  allocated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_revealed_at TIMESTAMPTZ,
  reveal_count INT NOT NULL DEFAULT 0,
  UNIQUE(voucher_id)
);

-- Private Payment Events (Webhook & Signature Verification Audit Trail)
CREATE TABLE IF NOT EXISTS private.payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'razorpay',
  payload JSONB NOT NULL,
  signature_verified BOOLEAN NOT NULL DEFAULT false,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_certifications_slug ON public.certifications(slug);
CREATE INDEX IF NOT EXISTS idx_certifications_provider ON public.certifications(provider_id);
CREATE INDEX IF NOT EXISTS idx_certifications_category ON public.certifications(category_id);
CREATE INDEX IF NOT EXISTS idx_certifications_level ON public.certifications(level);
CREATE INDEX IF NOT EXISTS idx_certifications_active ON public.certifications(is_active);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders(razorpay_order_id);

CREATE INDEX IF NOT EXISTS idx_private_voucher_cert_status ON private.voucher_inventory(certification_id, status);
CREATE INDEX IF NOT EXISTS idx_private_voucher_alloc_user ON private.voucher_allocations(user_id);
CREATE INDEX IF NOT EXISTS idx_private_voucher_alloc_order ON private.voucher_allocations(order_id);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all public tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- 5.1 Profiles: Users can read and update their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 5.2 Catalog (Public read-only)
CREATE POLICY "Anyone can view active providers"
  ON public.certification_providers FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active categories"
  ON public.certification_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active certifications"
  ON public.certifications FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view skills"
  ON public.certification_skills FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view career paths"
  ON public.career_paths FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view career recommendations"
  ON public.career_recommendations FOR SELECT
  USING (true);

-- 5.3 Orders & Order Items (Strictly owner access)
-- Note: Direct client INSERT/UPDATE is restricted. Orders are created and updated
-- via trusted server-side route handlers using the service role or authenticated secure RPC.
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- 5.4 Wishlists (User managed)
CREATE POLICY "Users can manage own wishlist"
  ON public.wishlists FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5.5 Support Tickets
CREATE POLICY "Users can view own support tickets"
  ON public.support_tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create support tickets"
  ON public.support_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- ============================================================================
-- 6. SECURE BUSINESS FUNCTIONS (SECURITY DEFINER)
-- ============================================================================

-- Function to safely list customer vouchers with MASKED voucher codes
CREATE OR REPLACE FUNCTION public.get_customer_vouchers()
RETURNS TABLE (
  allocation_id UUID,
  order_id UUID,
  order_number TEXT,
  certification_name TEXT,
  exam_code TEXT,
  provider_name TEXT,
  expiry_date DATE,
  region TEXT,
  redemption_instructions TEXT,
  allocated_at TIMESTAMPTZ,
  masked_code TEXT,
  is_revealed BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  RETURN QUERY
  SELECT
    va.id AS allocation_id,
    o.id AS order_id,
    o.order_number,
    c.name AS certification_name,
    c.exam_code,
    cp.name AS provider_name,
    vi.expiry_date,
    vi.region,
    vi.redemption_instructions,
    va.allocated_at,
    -- Return masked code (e.g. CV-••••-••••-5819)
    (SUBSTRING(vi.voucher_code FROM 1 FOR 3) || '••••-••••-' || SUBSTRING(vi.voucher_code FROM LENGTH(vi.voucher_code) - 3)) AS masked_code,
    (va.first_revealed_at IS NOT NULL) AS is_revealed
  FROM private.voucher_allocations va
  JOIN private.voucher_inventory vi ON va.voucher_id = vi.id
  JOIN public.orders o ON va.order_id = o.id
  JOIN public.certifications c ON vi.certification_id = c.id
  JOIN public.certification_providers cp ON c.provider_id = cp.id
  WHERE va.user_id = v_user_id
    AND o.status IN ('paid', 'fulfilled')
  ORDER BY va.allocated_at DESC;
END;
$$;

-- Function to safely REVEAL an unmasked voucher code for verified owner
CREATE OR REPLACE FUNCTION public.reveal_customer_voucher(p_allocation_id UUID)
RETURNS TABLE (
  allocation_id UUID,
  voucher_code TEXT,
  expiry_date DATE,
  redemption_instructions TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_voucher_id UUID;
  v_order_status order_status;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Verify ownership and paid order status
  SELECT va.voucher_id, o.status
  INTO v_voucher_id, v_order_status
  FROM private.voucher_allocations va
  JOIN public.orders o ON va.order_id = o.id
  WHERE va.id = p_allocation_id
    AND va.user_id = v_user_id;

  IF v_voucher_id IS NULL THEN
    RAISE EXCEPTION 'Voucher allocation not found or unauthorized';
  END IF;

  IF v_order_status NOT IN ('paid', 'fulfilled') THEN
    RAISE EXCEPTION 'Order payment not verified';
  END IF;

  -- Record audit timestamp and increment reveal count
  UPDATE private.voucher_allocations
  SET
    first_revealed_at = COALESCE(first_revealed_at, NOW()),
    reveal_count = reveal_count + 1
  WHERE id = p_allocation_id;

  RETURN QUERY
  SELECT
    p_allocation_id,
    vi.voucher_code,
    vi.expiry_date,
    vi.redemption_instructions
  FROM private.voucher_inventory vi
  WHERE vi.id = v_voucher_id;
END;
$$;

-- Function to atomically fulfill an order with available vouchers
CREATE OR REPLACE FUNCTION private.fulfill_order(p_order_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private, pg_temp
AS $$
DECLARE
  v_item RECORD;
  v_voucher_id UUID;
  v_user_id UUID;
  v_order_status order_status;
  v_needed INT;
  v_available_count INT;
BEGIN
  -- Get order details
  SELECT user_id, status INTO v_user_id, v_order_status
  FROM public.orders
  WHERE id = p_order_id;

  IF v_order_status NOT IN ('paid', 'pending') THEN
    RAISE EXCEPTION 'Cannot fulfill order in status %', v_order_status;
  END IF;

  -- For each item in the order, allocate vouchers
  FOR v_item IN
    SELECT id AS order_item_id, certification_id, quantity
    FROM public.order_items
    WHERE order_id = p_order_id
  LOOP
    v_needed := v_item.quantity;

    -- Check availability
    SELECT COUNT(*) INTO v_available_count
    FROM private.voucher_inventory
    WHERE certification_id = v_item.certification_id
      AND status = 'available'
      AND expiry_date > CURRENT_DATE;

    IF v_available_count < v_needed THEN
      RAISE EXCEPTION 'Insufficient inventory for certification % (needed %, available %)',
        v_item.certification_id, v_needed, v_available_count;
    END IF;

    -- Allocate vouchers atomically using FOR UPDATE SKIP LOCKED
    FOR i IN 1..v_needed LOOP
      SELECT id INTO v_voucher_id
      FROM private.voucher_inventory
      WHERE certification_id = v_item.certification_id
        AND status = 'available'
        AND expiry_date > CURRENT_DATE
      ORDER BY expiry_date ASC
      LIMIT 1
      FOR UPDATE SKIP LOCKED;

      IF v_voucher_id IS NULL THEN
        RAISE EXCEPTION 'Concurrency conflict: unable to lock voucher';
      END IF;

      -- Mark voucher as sold
      UPDATE private.voucher_inventory
      SET
        status = 'sold',
        reserved_for_order_id = p_order_id,
        updated_at = NOW()
      WHERE id = v_voucher_id;

      -- Insert allocation
      INSERT INTO private.voucher_allocations (
        order_id,
        order_item_id,
        voucher_id,
        user_id,
        allocated_at
      ) VALUES (
        p_order_id,
        v_item.order_item_id,
        v_voucher_id,
        v_user_id,
        NOW()
      );
    END LOOP;
  END LOOP;

  -- Update order status to fulfilled
  UPDATE public.orders
  SET
    status = 'fulfilled',
    fulfilled_at = NOW(),
    updated_at = NOW()
  WHERE id = p_order_id;

  RETURN TRUE;
END;
$$;
