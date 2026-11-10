import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';
import { verifyPaymentSignature } from '@/lib/payments/signature';
import { sendOrderConfirmationEmail } from '@/lib/email/resend';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/db/supabase';

export const dynamic = 'force-dynamic';

const verifyPaymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  razorpayOrderId: z.string().min(1, 'Razorpay Order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Razorpay Payment ID is required'),
  razorpaySignature: z.string().min(1, 'Payment signature is required'),
  paymentMethod: z.string().optional().default('Razorpay Secure Payment'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = verifyPaymentSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid payment verification payload',
          details: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentMethod } = validated.data;

    // 1. Verify Payment Signature (HMAC SHA-256)
    const isSignatureValid = verifyPaymentSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isSignatureValid) {
      console.warn(`Payment signature verification failed for Order ID: ${orderId}`);
      dbStore.updateOrderStatus(orderId, 'failed');

      // Update failed status in Supabase if configured
      if (isSupabaseConfigured && supabaseAdmin) {
        try {
          await supabaseAdmin
            .from('orders')
            .update({ status: 'failed', updated_at: new Date().toISOString() })
            .eq('id', orderId);
        } catch (sbErr) {
          console.warn('Supabase failure status update error:', sbErr);
        }
      }

      return NextResponse.json(
        { success: false, error: 'Cryptographic signature verification failed. Untrusted payment transaction.' },
        { status: 400 }
      );
    }

    // 2. Mark order as PAID in store
    const updatedOrder = dbStore.updateOrderStatus(orderId, 'paid', razorpayPaymentId, paymentMethod);
    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // 3. Update Order Status as PAID in Supabase PostgreSQL
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        const { error: sbUpdateErr } = await supabaseAdmin
          .from('orders')
          .update({
            status: 'paid',
            razorpay_payment_id: razorpayPaymentId,
            payment_method: paymentMethod,
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderId);

        if (sbUpdateErr) {
          console.warn('Supabase orders table update note:', sbUpdateErr.message);
        }

        // Record verified payment event in private.payment_events or public.payment_events
        await supabaseAdmin
          .from('payment_events')
          .insert({
            order_id: orderId,
            provider: 'razorpay',
            event_type: 'payment.captured',
            event_id: razorpayPaymentId,
            payload: {
              razorpay_order_id: razorpayOrderId,
              razorpay_payment_id: razorpayPaymentId,
              razorpay_signature: razorpaySignature,
              method: paymentMethod,
            },
            verified: true,
            created_at: new Date().toISOString(),
          });
      } catch (sbErr) {
        console.warn('Supabase payment sync notice (handled gracefully):', sbErr);
      }
    }

    // 4. Allocate vouchers atomically from private inventory
    const allocationResult = dbStore.allocateVouchersForOrder(orderId);
    if (!allocationResult.success) {
      console.error(`Inventory allocation failed after payment for order ${orderId}: ${allocationResult.error}`);
      return NextResponse.json({
        success: true,
        orderId: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        status: 'paid',
        message: 'Payment verified successfully. Voucher allocation is being prioritized by fulfillment queue.',
      });
    }

    // 5. Send transactional notification email to customer
    const primaryItem = updatedOrder.items[0];
    if (primaryItem) {
      try {
        await sendOrderConfirmationEmail({
          toEmail: updatedOrder.customerEmail,
          customerName: updatedOrder.customerName,
          orderNumber: updatedOrder.orderNumber,
          certificationName: primaryItem.certificationName,
          examCode: primaryItem.examCode,
          totalAmountInr: updatedOrder.totalAmountInr,
        });
      } catch (emailErr) {
        console.warn('Confirmation email dispatch note:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber,
      status: 'fulfilled',
      allocatedCount: allocationResult.allocatedCount,
      message: 'Payment verified and certification voucher securely allocated to your vault.',
    });
  } catch (error) {
    console.error('Error in /api/checkout/verify-payment:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error verifying payment' },
      { status: 500 }
    );
  }
}
