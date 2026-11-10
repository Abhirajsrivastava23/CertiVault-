import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';
import { createRazorpayOrder, RAZORPAY_KEY_ID } from '@/lib/payments/razorpay';

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

    // 1. Fetch certification from verified database
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

    // 3. Create payment order (Razorpay or sandbox simulation)
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

    // Update order with razorpayOrderId
    internalOrder.razorpayOrderId = razorpayOrder.id;

    return NextResponse.json({
      success: true,
      orderId: internalOrder.id,
      orderNumber: internalOrder.orderNumber,
      amountInPaise: internalOrder.totalAmountInr,
      currency: 'INR',
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: RAZORPAY_KEY_ID || 'rzp_test_MOCK_DEMO_KEY',
      isSimulated: razorpayOrder.isSimulated ?? true,
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

