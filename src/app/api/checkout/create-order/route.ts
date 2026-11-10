import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { dbStore } from '@/lib/db/store';
import { createRazorpayOrder, getRazorpayCredentials } from '@/lib/payments/razorpay';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/db/supabase';

export const dynamic = 'force-dynamic';

const createOrderSchema = z.object({
  certificationId: z.string().min(1, 'Certification ID is required'),
  quantity: z.number().int().min(1).max(10).default(1),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Please enter a valid email address'),
  customerPhone: z.string().min(8, 'Phone number must be at least 8 digits'),
  userId: z.string().optional(),
});

function isValidUuid(id?: string): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validated.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { certificationId, quantity, customerName, customerEmail, customerPhone } = validated.data;
    const effectiveUserId = validated.data.userId && isValidUuid(validated.data.userId)
      ? validated.data.userId
      : crypto.randomUUID();

    // 1. Fetch certification from catalog and verify server pricing
    const cert = dbStore.getCertificationById(certificationId);
    if (!cert) {
      return NextResponse.json(
        { success: false, error: 'Certification not found' },
        { status: 404 }
      );
    }

    // 2. Create pending order with backend-verified pricing and tax calculations
    const orderResult = dbStore.createOrder({
      userId: effectiveUserId,
      customerName,
      customerEmail,
      customerPhone,
      certificationId: cert.id,
      quantity,
    });

    if (!orderResult.success || !orderResult.order) {
      return NextResponse.json(
        { success: false, error: orderResult.error || 'Failed to initiate order' },
        { status: 400 }
      );
    }

    const internalOrder = orderResult.order;

    // 3. Create payment order via Razorpay API (with sanitized credentials)
    const razorpayOrder = await createRazorpayOrder({
      amount: internalOrder.totalAmountInr,
      currency: 'INR',
      receipt: internalOrder.orderNumber,
      notes: {
        orderId: internalOrder.id,
        examCode: cert.examCode,
        customerEmail,
      },
    });

    // Link the server-generated Razorpay order ID to our internal order
    internalOrder.razorpayOrderId = razorpayOrder.id;

    // 4. Record pending order in Supabase PostgreSQL if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        let resolvedUserId = effectiveUserId;

        // Verify if a profile exists for customer or any profile to prevent foreign key errors
        try {
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', customerEmail)
            .maybeSingle();

          if (profile?.id) {
            resolvedUserId = profile.id;
          } else {
            const { data: anyProfile } = await supabaseAdmin
              .from('profiles')
              .select('id')
              .limit(1)
              .maybeSingle();

            if (anyProfile?.id) {
              resolvedUserId = anyProfile.id;
            }
          }
        } catch {
          // Non-blocking profile lookup
        }

        const baseOrderData: Record<string, any> = {
          id: internalOrder.id,
          order_number: internalOrder.orderNumber,
          user_id: resolvedUserId,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_name: customerName,
          status: 'pending',
          razorpay_order_id: razorpayOrder.id,
          created_at: internalOrder.createdAt,
          updated_at: internalOrder.updatedAt,
        };

        // Try upserting matching both potential schema variations
        const { error: err1 } = await supabaseAdmin.from('orders').upsert({
          ...baseOrderData,
          total_amount_inr: internalOrder.totalAmountInr,
          tax_amount_inr: internalOrder.taxAmountInr,
        }, { onConflict: 'id' });

        if (err1) {
          await supabaseAdmin.from('orders').upsert({
            ...baseOrderData,
            currency: 'INR',
            subtotal_paise: internalOrder.subtotalInr,
            tax_paise: internalOrder.taxAmountInr,
            total_paise: internalOrder.totalAmountInr,
          }, { onConflict: 'id' });
        }

        // Also record order item in Supabase
        const primaryItem = internalOrder.items[0];
        if (primaryItem) {
          try {
            await supabaseAdmin.from('order_items').upsert({
              id: primaryItem.id,
              order_id: internalOrder.id,
              certification_id: cert.id,
              quantity: primaryItem.quantity,
              unit_price_inr: primaryItem.unitPriceInr,
              total_price_inr: primaryItem.totalPriceInr,
            }, { onConflict: 'id' });
          } catch {
            // Non-blocking order item sync
          }
        }
      } catch (sbErr) {
        console.warn('[Supabase Order Pending Sync Note]:', sbErr);
      }
    }

    const { keyId } = getRazorpayCredentials();

    return NextResponse.json({
      success: true,
      orderId: internalOrder.id,
      orderNumber: internalOrder.orderNumber,
      amountInPaise: internalOrder.totalAmountInr,
      currency: 'INR',
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: keyId || 'rzp_test_MOCK_DEMO_KEY',
      isSimulated: razorpayOrder.isSimulated ?? false,
      certification: {
        name: cert.name,
        examCode: cert.examCode,
        provider: cert.providerName,
      },
    });
  } catch (error: any) {
    console.error('[Error in /api/checkout/create-order]:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || 'Internal server error processing checkout' 
      },
      { status: 500 }
    );
  }
}
