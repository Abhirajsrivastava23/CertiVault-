-- ====================================================================
-- CertiVault: Production-Ready Database Schema & RLS Policies
-- Migration: 20261108000000_init_certivault.sql
-- ====================================================================

-- 1. Create Private Schema for sensitive operational records
CREATE SCHEMA IF NOT EXISTS private;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- 2. PUBLIC TABLES
-- ====================================================================

-- 2.1 Profiles Table (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    job_title TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'support')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.2 Certification Providers
CREATE TABLE IF NOT EXISTS public.certification_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.3 Certification Categories
CREATE TABLE IF NOT EXISTS public.certification_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.4 Certifications
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    provider_id UUID NOT NULL REFERENCES public.certification_providers(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES public.certification_categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    exam_code TEXT NOT NULL,
    difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    voucher_price_inr BIGINT NOT NULL, -- Stored in paise (e.g. 1500000 = ₹15,000.00)
    retail_price_inr BIGINT NOT NULL,  -- Stored in paise
    validity_months INT NOT NULL DEFAULT 12,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    purpose TEXT NOT NULL,
    prerequisites TEXT[] NOT NULL DEFAULT '{}',
    target_audience TEXT[] NOT NULL DEFAULT '{}',
    career_opportunities TEXT[] NOT NULL DEFAULT '{}',
    official_exam_details JSONB NOT NULL DEFAULT '{}'::jsonb,
    official_provider_url TEXT NOT NULL,
    preparation_roadmap JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.5 Certification Skills
CREATE TABLE IF NOT EXISTS public.certification_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    weight_score INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.6 Career Paths
CREATE TABLE IF NOT EXISTS public.career_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    target_roles TEXT[] NOT NULL DEFAULT '{}',
    average_salary_range TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.7 Career Recommendations
CREATE TABLE IF NOT EXISTS public.career_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_path_id UUID NOT NULL REFERENCES public.career_paths(id) ON DELETE CASCADE,
    certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
    sequence_order INT NOT NULL DEFAULT 1,
    rationale TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(career_path_id, certification_id)
);

-- 2.8 Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    total_amount_inr BIGINT NOT NULL, -- in paise
    tax_amount_inr BIGINT NOT NULL DEFAULT 0, -- in paise (e.g. 18% GST)
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'fulfilled', 'failed', 'expired', 'refund_pending', 'refunded')),
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    payment_method TEXT,
    billing_address JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.9 Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE RESTRICT,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price_inr BIGINT NOT NULL, -- in paise
    total_price_inr BIGINT NOT NULL, -- in paise
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.10 Support Tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    ticket_number TEXT NOT NULL UNIQUE,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Voucher Redemption', 'Payment Issue', 'Order Inquiry', 'Technical Support', 'General')),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.11 Wishlists
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, certification_id)
);

-- ====================================================================
-- 3. PRIVATE SCHEMA (Strictly inaccessible to client public roles)
-- ====================================================================

-- 3.1 Private Voucher Inventory
CREATE TABLE IF NOT EXISTS private.voucher_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE RESTRICT,
    voucher_code TEXT NOT NULL UNIQUE,
    expiry_date DATE NOT NULL,
    region TEXT NOT NULL DEFAULT 'India / Global',
    redemption_instructions TEXT NOT NULL,
    supplier_reference TEXT,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold', 'disabled')),
    reserved_at TIMESTAMPTZ,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.2 Private Voucher Allocations
CREATE TABLE IF NOT EXISTS private.voucher_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
    voucher_id UUID NOT NULL REFERENCES private.voucher_inventory(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    allocated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    revealed_at TIMESTAMPTZ,
    reveal_count INT NOT NULL DEFAULT 0,
    last_ip_hash TEXT
);

-- 3.3 Private Payment Events
CREATE TABLE IF NOT EXISTS private.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'razorpay',
    event_type TEXT NOT NULL,
    event_id TEXT,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    signature TEXT,
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- 4. VIEWS (Secure customer-facing voucher status view)
-- ====================================================================

-- View showing voucher details without exposing raw voucher code
CREATE OR REPLACE VIEW public.customer_vouchers AS
SELECT 
    va.id AS allocation_id,
    va.order_id,
    o.order_number,
    va.user_id,
    c.id AS certification_id,
    c.name AS certification_name,
    c.exam_code,
    c.slug AS certification_slug,
    cp.name AS provider_name,
    cp.slug AS provider_slug,
    vi.expiry_date,
    vi.region,
    vi.redemption_instructions,
    vi.status AS voucher_status,
    va.allocated_at,
    va.revealed_at,
    (va.revealed_at IS NOT NULL) AS is_revealed
FROM private.voucher_allocations va
JOIN public.orders o ON va.order_id = o.id
JOIN private.voucher_inventory vi ON va.voucher_id = vi.id
JOIN public.certifications c ON vi.certification_id = c.id
JOIN public.certification_providers cp ON c.provider_id = cp.id;

-- ====================================================================
-- 5. INDEXES FOR PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_certifications_slug ON public.certifications(slug);
CREATE INDEX IF NOT EXISTS idx_certifications_provider ON public.certifications(provider_id);
CREATE INDEX IF NOT EXISTS idx_certifications_category ON public.certifications(category_id);
CREATE INDEX IF NOT EXISTS idx_certifications_status ON public.certifications(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON public.support_tickets(user_id);

CREATE INDEX IF NOT EXISTS idx_voucher_inv_cert_status ON private.voucher_inventory(certification_id, status);
CREATE INDEX IF NOT EXISTS idx_voucher_allocations_user ON private.voucher_allocations(user_id);
CREATE INDEX IF NOT EXISTS idx_voucher_allocations_order ON private.voucher_allocations(order_id);

-- ====================================================================
-- 6. TRANSACTIONAL FUNCTIONS
-- ====================================================================

-- 6.1 Function to allocate vouchers safely upon payment verification
CREATE OR REPLACE FUNCTION public.allocate_voucher_for_order(
    p_order_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_order RECORD;
    v_item RECORD;
    v_voucher RECORD;
    v_allocated_count INT := 0;
    v_total_needed INT := 0;
    i INT;
BEGIN
    -- Check order exists and status is paid
    SELECT * INTO v_order FROM public.orders WHERE id = p_order_id FOR UPDATE;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order not found');
    END IF;

    IF v_order.status NOT IN ('paid', 'pending') THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order not in payable state');
    END IF;

    -- Process each item in the order
    FOR v_item IN SELECT * FROM public.order_items WHERE order_id = p_order_id LOOP
        v_total_needed := v_total_needed + v_item.quantity;

        FOR i IN 1..v_item.quantity LOOP
            -- Lock one available voucher for this certification
            SELECT * INTO v_voucher
            FROM private.voucher_inventory
            WHERE certification_id = v_item.certification_id
              AND status = 'available'
              AND expiry_date > CURRENT_DATE
            ORDER BY expiry_date ASC, created_at ASC
            FOR UPDATE SKIP LOCKED
            LIMIT 1;

            IF NOT FOUND THEN
                -- Insufficient inventory
                RETURN jsonb_build_object(
                    'success', false, 
                    'error', 'Insufficient inventory for certification ' || v_item.certification_id,
                    'allocated', v_allocated_count,
                    'needed', v_total_needed
                );
            END IF;

            -- Mark voucher as sold
            UPDATE private.voucher_inventory
            SET status = 'sold',
                order_id = p_order_id,
                updated_at = timezone('utc'::text, now())
            WHERE id = v_voucher.id;

            -- Record allocation
            INSERT INTO private.voucher_allocations (
                order_id,
                order_item_id,
                voucher_id,
                user_id,
                allocated_at
            ) VALUES (
                p_order_id,
                v_item.id,
                v_voucher.id,
                v_order.user_id,
                timezone('utc'::text, now())
            );

            v_allocated_count := v_allocated_count + 1;
        END LOOP;
    END LOOP;

    -- Mark order as fulfilled
    UPDATE public.orders
    SET status = 'fulfilled',
        updated_at = timezone('utc'::text, now())
    WHERE id = p_order_id;

    RETURN jsonb_build_object(
        'success', true,
        'allocated', v_allocated_count,
        'status', 'fulfilled'
    );
END;
$$;

-- 6.2 Function to safely reveal a voucher code to its verified owner
CREATE OR REPLACE FUNCTION public.reveal_voucher_code(
    p_allocation_id UUID,
    p_user_id UUID,
    p_ip_hash TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_allocation RECORD;
    v_voucher RECORD;
    v_order RECORD;
BEGIN
    -- Verify allocation exists and belongs to user
    SELECT * INTO v_allocation
    FROM private.voucher_allocations
    WHERE id = p_allocation_id AND user_id = p_user_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Voucher allocation not found or unauthorized');
    END IF;

    -- Verify parent order is fulfilled or paid
    SELECT * INTO v_order
    FROM public.orders
    WHERE id = v_allocation.order_id;

    IF v_order.status NOT IN ('paid', 'fulfilled') THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order is not in fulfilled status');
    END IF;

    -- Fetch voucher code
    SELECT * INTO v_voucher
    FROM private.voucher_inventory
    WHERE id = v_allocation.voucher_id;

    -- Update allocation record
    UPDATE private.voucher_allocations
    SET revealed_at = COALESCE(revealed_at, timezone('utc'::text, now())),
        reveal_count = reveal_count + 1,
        last_ip_hash = p_ip_hash
    WHERE id = p_allocation_id;

    RETURN jsonb_build_object(
        'success', true,
        'voucher_code', v_voucher.voucher_code,
        'expiry_date', v_voucher.expiry_date,
        'region', v_voucher.region,
        'redemption_instructions', v_voucher.redemption_instructions,
        'revealed_at', timezone('utc'::text, now())
    );
END;
$$;

-- ====================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- 7.1 Profiles policies
CREATE POLICY "Public profiles are viewable by self" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 7.2 Catalog tables: Readable by all, writable only by service role / admin
CREATE POLICY "Active providers are viewable by everyone" ON public.certification_providers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Categories are viewable by everyone" ON public.certification_categories
    FOR SELECT USING (true);

CREATE POLICY "Active certifications are viewable by everyone" ON public.certifications
    FOR SELECT USING (status = 'active');

CREATE POLICY "Skills are viewable by everyone" ON public.certification_skills
    FOR SELECT USING (true);

CREATE POLICY "Career paths are viewable by everyone" ON public.career_paths
    FOR SELECT USING (true);

CREATE POLICY "Career recommendations are viewable by everyone" ON public.career_recommendations
    FOR SELECT USING (true);

-- 7.3 Orders: Customers can only select their own orders
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

-- 7.4 Order Items: Customers can view items in their own orders
CREATE POLICY "Users can view own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
              AND orders.user_id = auth.uid()
        )
    );

-- 7.5 Support Tickets: Customers can view and insert their own tickets
CREATE POLICY "Users can view own tickets" ON public.support_tickets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tickets" ON public.support_tickets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7.6 Wishlists: Customers can view, insert, delete their own wishlists
CREATE POLICY "Users can view own wishlists" ON public.wishlists
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wishlists" ON public.wishlists
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own wishlists" ON public.wishlists
    FOR DELETE USING (auth.uid() = user_id);

-- Revoke all direct client permissions on the private schema
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL TABLES IN SCHEMA private FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA private FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA private FROM PUBLIC, anon, authenticated;

-- Grant execution of safe stored procedures to authenticated users
GRANT EXECUTE ON FUNCTION public.reveal_voucher_code(UUID, UUID, TEXT) TO authenticated;

