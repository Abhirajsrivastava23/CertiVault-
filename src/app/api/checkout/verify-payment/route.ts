import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';
import { verifyPaymentSignature } from '@/lib/payments/signature';
import { sendOrderConfirmationEmail } from '@/lib/email/resend';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/db/supabase';

export const dynamic = 'force-dynamic';

const verifyPaymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Razorpay Payment ID is required'),
  razorpaySignature: z.string().min(1, 'Payment signature is required'),
  razorpayOrderId: z.string().optional(),
  paymentMethod: z.string().optional().default('Razorpay Gateway'),
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

    // 1. Retrieve the existing order from store or Supabase (cross-serverless instance resilience)
    let order = dbStore.getOrderById(orderId);

    if (!order && isSupabaseConfigured && supabaseAdmin) {
      try {
        const { data: sbOrder } = await supabaseAdmin
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (sbOrder) {
          order = dbStore.restoreOrderFromSupabase(sbOrder);
        }
      } catch (err) {
        console.warn('[Supabase Order Lookup Notice]:', err);
      }
    }

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order record could not be found for this transaction.' },
        { status: 404 }
      );
    }

    // 2. Prevent duplicate payment verification and duplicate voucher delivery
    if (order.status === 'paid' || order.status === 'fulfilled') {
      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        status: 'fulfilled',
        message: 'Order payment is already verified and vouchers are unlocked in your vault.',
      });
    }

    // 3. Ensure order is in valid pending state
    if (order.status !== 'pending') {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot verify payment for order with status: ${order.status}` 
        },
        { status: 400 }
      );
    }

    // 4. Retrieve ORIGINAL SERVER-STORED Razorpay Order ID (Never trust client-forged order IDs)
    const serverRazorpayOrderId = order.razorpayOrderId;
    if (!serverRazorpayOrderId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No active gateway payment order reference exists for this checkout.' 
        },
        { status: 400 }
      );
    }

    // If client supplied a razorpayOrderId, confirm it matches the server-stored ID
    if (razorpayOrderId && razorpayOrderId !== serverRazorpayOrderId) {
      console.warn('[Razorpay Order ID Mismatch]:', {
        clientSent: razorpayOrderId,
        serverStored: serverRazorpayOrderId,
      });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Transaction reference mismatch between client and server.' 
        },
        { status: 400 }
      );
    }

    // 5. Verify Cryptographic Signature using HMAC SHA-256 and constant-time comparison
    const isSignatureValid = verifyPaymentSignature({
      orderId: serverRazorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isSignatureValid) {
      console.error('[Payment Signature Verification Failed]:', {
        orderId: order.id,
        orderNumber: order.orderNumber,
        serverRazorpayOrderId,
        paymentIdPrefix: razorpayPaymentId.substring(0, 8),
      });

      // Mark order as failed in database
      dbStore.updateOrderStatus(order.id, 'failed');

      if (isSupabaseConfigured && supabaseAdmin) {
        try {
          await supabaseAdmin
            .from('orders')
            .update({ status: 'failed', updated_at: new Date().toISOString() })
            .eq('id', order.id);
        } catch (sbErr) {
          console.warn('[Supabase Failure Update Error]:', sbErr);
        }
      }

      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment verification failed: The cryptographic transaction signature could not be verified with the payment gateway.' 
        },
        { status: 400 }
      );
    }

    // 6. Mark order as PAID in store
    const updatedOrder = dbStore.updateOrderStatus(order.id, 'paid', razorpayPaymentId, paymentMethod);
    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Failed to update order status' },
        { status: 500 }
      );
    }

    // 7. Update Order Status as PAID in Supabase PostgreSQL
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'paid',
            razorpay_payment_id: razorpayPaymentId,
            payment_method: paymentMethod,
            updated_at: new Date().toISOString(),
          })
          .eq('id', order.id);

        // Record verified payment event
        await supabaseAdmin
          .from('payment_events')
          .insert({
            order_id: order.id,
            provider: 'razorpay',
            event_type: 'payment.captured',
            event_id: razorpayPaymentId,
            payload: {
              razorpay_order_id: serverRazorpayOrderId,
              razorpay_payment_id: razorpayPaymentId,
              payment_method: paymentMethod,
            },
            verified: true,
            created_at: new Date().toISOString(),
          });
      } catch (sbErr) {
        console.warn('[Supabase Payment Sync Notice]:', sbErr);
      }
    }

    // 8. Atomically allocate vouchers from private inventory
    const allocationResult = dbStore.allocateVouchersForOrder(order.id);
    if (!allocationResult.success) {
      console.error(`[Inventory Allocation Warning] Order ${order.id}: ${allocationResult.error}`);
      return NextResponse.json({
        success: true,
        orderId: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        status: 'paid',
        message: 'Payment verified successfully. Voucher allocation is queued for fulfillment.',
      });
    }

    // 9. Send transactional confirmation email
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
        console.warn('[Confirmation Email Notice]:', emailErr);
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
    console.error('[Error in /api/checkout/verify-payment]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error verifying payment' },
      { status: 500 }
    );
  }
}
