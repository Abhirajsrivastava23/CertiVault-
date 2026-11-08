import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { store } from '@/lib/services/store';

export async function POST(req: NextRequest) {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature, isSimulation } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = store.getOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Signature verification logic
    if (!isSimulation && secret && !secret.includes('demo') && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        order.status = 'failed';
        return NextResponse.json({ error: 'Payment signature verification failed. Untrusted payment event.' }, { status: 400 });
      }
    }

    // Mark paid
    order.status = 'paid';
    order.razorpayPaymentId = razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 14)}`;
    order.paymentMethod = isSimulation ? 'Test UPI / Net Banking' : 'Razorpay Gateway';

    // Atomically allocate vouchers and fulfill order
    const fulfillment = store.fulfillOrder(order.id);
    if (!fulfillment.success) {
      console.error('Fulfillment error:', fulfillment.error);
      return NextResponse.json({
        success: false,
        error: fulfillment.error || 'Inventory allocation failed during fulfillment.',
        orderNumber: order.orderNumber,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and vouchers allocated successfully.',
      orderNumber: order.orderNumber,
      status: 'fulfilled',
    });
  } catch (err: any) {
    console.error('Payment verification error:', err);
    return NextResponse.json({ error: 'Error processing payment verification' }, { status: 500 });
  }
}
