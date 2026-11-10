import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/services/store';
import { dbStore } from '@/lib/db/store';
import { verifyPaymentSignature } from '@/lib/payments/signature';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/db/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId = body.orderId || body.id;
    const razorpay_order_id = body.razorpay_order_id || body.razorpayOrderId;
    const razorpay_payment_id = body.razorpay_payment_id || body.razorpayPaymentId;
    const razorpay_signature = body.razorpay_signature || body.razorpaySignature;
    const paymentMethod = body.paymentMethod || (body.isSimulation ? 'Test UPI / Net Banking' : 'Razorpay Gateway');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Locate order across stores
    let order = store.getOrder(orderId);
    let dbOrder = dbStore.getOrderById(orderId);

    if (!order && !dbOrder && isSupabaseConfigured && supabaseAdmin) {
      try {
        const queryFilter = razorpay_order_id
          ? `id.eq.${orderId},order_number.eq.${orderId},razorpay_order_id.eq.${razorpay_order_id}`
          : `id.eq.${orderId},order_number.eq.${orderId}`;

        const { data: sbOrder } = await supabaseAdmin
          .from('orders')
          .select('*')
          .or(queryFilter)
          .maybeSingle();

        if (sbOrder) {
          dbOrder = dbStore.restoreOrderFromSupabase(sbOrder);
        }
      } catch (err) {
        console.warn('[Supabase Order Lookup Notice]:', err);
      }
    }

    const effectiveOrderNumber = order?.orderNumber || dbOrder?.orderNumber || orderId;
    const expectedRazorpayOrderId = order?.razorpayOrderId || dbOrder?.razorpayOrderId || razorpay_order_id;

    if (!expectedRazorpayOrderId) {
      return NextResponse.json(
        { error: 'No active gateway payment order reference exists for this checkout.' },
        { status: 400 }
      );
    }

    // Cryptographic Signature Verification using constant-time HMAC SHA-256
    const isSignatureValid = verifyPaymentSignature({
      orderId: expectedRazorpayOrderId,
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
      signature: razorpay_signature || '',
    });

    if (!isSignatureValid) {
      console.error('[Payment Verification Failed]: Invalid transaction signature', {
        orderId,
        orderNumber: effectiveOrderNumber,
        expectedRazorpayOrderId,
        paymentIdPrefix: razorpay_payment_id ? razorpay_payment_id.substring(0, 8) : 'missing',
      });

      if (order) order.status = 'failed';
      if (dbOrder) dbStore.updateOrderStatus(dbOrder.id, 'failed');

      return NextResponse.json(
        { 
          error: `Payment verification could not be completed with Razorpay. If your account was debited, please contact support with reference ${effectiveOrderNumber}.` 
        }, 
        { status: 400 }
      );
    }

    // Mark paid in store
    if (order) {
      order.status = 'paid';
      order.razorpayPaymentId = razorpay_payment_id || `pay_${Date.now()}`;
      order.paymentMethod = paymentMethod;
      store.fulfillOrder(order.id);
    }

    if (dbOrder) {
      dbStore.updateOrderStatus(dbOrder.id, 'paid', razorpay_payment_id, paymentMethod);
      dbStore.allocateVouchersForOrder(dbOrder.id);
    }

    // Sync to Supabase
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'paid',
            razorpay_payment_id,
            payment_method: paymentMethod,
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderId);
      } catch (sbErr) {
        console.warn('[Supabase Sync Notice]:', sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and vouchers allocated successfully.',
      orderNumber: effectiveOrderNumber,
      status: 'fulfilled',
    });
  } catch (err: any) {
    console.error('Payment verification error:', err);
    return NextResponse.json({ error: 'Error processing payment verification' }, { status: 500 });
  }
}
