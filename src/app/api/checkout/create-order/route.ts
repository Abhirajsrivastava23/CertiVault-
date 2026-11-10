import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';
import { createRazorpayOrder, RAZORPAY_KEY_ID } from '@/lib/payments/razorpay';
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
    const effectiveUserId = validated.data.userId || 'usr_demo_882910';

    // 1. Fetch certification from catalog and verify pricing
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

    // 3. Create payment order via Razorpay API (with sandbox fallback if keys are pending)
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

    // Update internal order with razorpayOrderId
    internalOrder.razorpayOrderId = razorpayOrder.id;

    // 4. Record order in Supabase if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        await supabaseAdmin.from('orders').upsert({
          id: internalOrder.id,
          order_number: internalOrder.orderNumber,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_name: customerName,
          total_amount_inr: internalOrder.totalAmountInr,
          tax_amount_inr: internalOrder.taxAmountInr,
          status: 'pending',
          razorpay_order_id: razorpayOrder.id,
          created_at: internalOrder.createdAt,
          updated_at: internalOrder.updatedAt,
        }, { onConflict: 'id' });
      } catch (sbErr) {
        console.warn('Supabase order creation sync note (will proceed with store):', sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: internalOrder.id,
      orderNumber: internalOrder.orderNumber,
      amountInPaise: internalOrder.totalAmountInr,
      currency: 'INR',
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: RAZORPAY_KEY_ID || 'rzp_test_MOCK_DEMO_KEY',
      isSimulated: razorpayOrder.isSimulated ?? false,
      certification: {
        name: cert.name,
        examCode: cert.examCode,
        provider: cert.providerName,
      },
    });
  } catch (error) {
    console.error('Error in /api/checkout/create-order:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing checkout' },
      { status: 500 }
    );
  }
}
