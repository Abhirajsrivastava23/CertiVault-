import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { store } from '@/lib/services/store';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature) {
      return NextResponse.json({ error: 'Missing x-razorpay-signature header' }, { status: 400 });
    }

    if (webhookSecret && !webhookSecret.includes('demo')) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        console.error('Razorpay webhook signature mismatch');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id || event.payload?.order?.entity?.id;

      if (razorpayOrderId) {
        const orders = store.getOrders();
        const matchedOrder = orders.find(o => o.razorpayOrderId === razorpayOrderId);

        if (matchedOrder && matchedOrder.status !== 'fulfilled') {
          matchedOrder.status = 'paid';
          matchedOrder.razorpayPaymentId = paymentEntity?.id;
          store.fulfillOrder(matchedOrder.id);
          console.log(`Order ${matchedOrder.orderNumber} fulfilled via webhook event ${event.event}`);
        }
      }
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
