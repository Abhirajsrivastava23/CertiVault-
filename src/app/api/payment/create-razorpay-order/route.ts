import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/services/store';

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = store.getOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if live Razorpay credentials exist and are not default placeholder
    if (keyId && keySecret && !keyId.includes('demo') && !keyId.includes('YourTestKeyId')) {
      try {
        const Razorpay = (await import('razorpay')).default;
        const razorpayInstance = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const rzpOrder = await razorpayInstance.orders.create({
          amount: order.totalAmountInr, // in paise
          currency: 'INR',
          receipt: order.orderNumber,
          notes: {
            orderId: order.id,
            customerEmail: order.customerEmail,
          },
        });

        order.razorpayOrderId = rzpOrder.id;

        return NextResponse.json({
          success: true,
          razorpayOrderId: rzpOrder.id,
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId,
          isSimulation: false,
        });
      } catch (rzpErr: any) {
        console.warn('Razorpay SDK failed or not reachable, falling back to secure test order flow:', rzpErr.message);
      }
    }

    // Secure Test/Mock Order generation for test environments
    const mockOrderId = `order_${Math.random().toString(36).substring(2, 14)}`;
    order.razorpayOrderId = mockOrderId;

    return NextResponse.json({
      success: true,
      razorpayOrderId: mockOrderId,
      amount: order.totalAmountInr,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_certivault2026',
      isSimulation: true,
    });
  } catch (err: any) {
    console.error('Error creating Razorpay order:', err);
    return NextResponse.json({ error: 'Failed to initiate payment gateway' }, { status: 500 });
  }
}
