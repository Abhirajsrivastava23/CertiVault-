import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/payments/signature';
import { dbStore } from '@/lib/db/store';

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing webhook signature' }, { status: 400 });
    }

    if (RAZORPAY_WEBHOOK_SECRET) {
      const isValid = verifyWebhookSignature(rawBody, signature, RAZORPAY_WEBHOOK_SECRET);
      if (!isValid) {
        console.warn('Invalid Razorpay webhook signature received');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    console.log(`[RAZORPAY WEBHOOK] Received event: ${event}`);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;
      const orderIdNotes = paymentEntity?.notes?.orderId || orderEntity?.notes?.orderId;
      const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;

      if (orderIdNotes) {
        dbStore.updateOrderStatus(orderIdNotes, 'paid', paymentEntity?.id, paymentEntity?.method);
        dbStore.allocateVouchersForOrder(orderIdNotes);
      } else if (razorpayOrderId) {
        // Find order by razorpayOrderId
        const allOrders = dbStore.getOrdersByUserId('usr_demo_882910'); // or query by razorpayOrderId
        const matchingOrder = allOrders.find(o => o.razorpayOrderId === razorpayOrderId);
        if (matchingOrder) {
          dbStore.updateOrderStatus(matchingOrder.id, 'paid', paymentEntity?.id, paymentEntity?.method);
          dbStore.allocateVouchersForOrder(matchingOrder.id);
        }
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderIdNotes = paymentEntity?.notes?.orderId;
      if (orderIdNotes) {
        dbStore.updateOrderStatus(orderIdNotes, 'failed', paymentEntity?.id);
      }
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error) {
    console.error('Error in /api/webhooks/razorpay:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
