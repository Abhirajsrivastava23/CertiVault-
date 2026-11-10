import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/services/store';
import { dbStore } from '@/lib/db/store';
import { createRazorpayOrder, getRazorpayCredentials } from '@/lib/payments/razorpay';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = store.getOrder(orderId);
    const dbOrder = dbStore.getOrderById(orderId);

    if (!order && !dbOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const amountInPaise = order?.totalAmountInr || dbOrder?.totalAmountInr || 100000;
    const orderNumber = order?.orderNumber || dbOrder?.orderNumber || orderId;
    const customerEmail = order?.customerEmail || dbOrder?.customerEmail || 'customer@example.com';

    const razorpayOrder = await createRazorpayOrder({
      amount: amountInPaise,
      currency: 'INR',
      receipt: orderNumber,
      notes: {
        orderId: order?.id || dbOrder?.id || orderId,
        customerEmail,
      },
    });

    if (order) order.razorpayOrderId = razorpayOrder.id;
    if (dbOrder) dbOrder.razorpayOrderId = razorpayOrder.id;

    const { keyId } = getRazorpayCredentials();

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: keyId || 'rzp_test_MOCK_DEMO_KEY',
      isSimulation: razorpayOrder.isSimulated ?? false,
    });
  } catch (err: any) {
    console.error('Error creating Razorpay order:', err);
    return NextResponse.json({ error: 'Failed to initiate payment gateway' }, { status: 500 });
  }
}
