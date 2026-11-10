import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';
import { verifyPaymentSignature } from '@/lib/payments/signature';
import { sendOrderConfirmationEmail } from '@/lib/email/resend';

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

    // 1. Verify Payment Signature
    const isSignatureValid = verifyPaymentSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isSignatureValid) {
      console.warn(`Payment signature verification failed for Order ID: ${orderId}`);
      dbStore.updateOrderStatus(orderId, 'failed');
      return NextResponse.json(
        { success: false, error: 'Cryptographic signature verification failed' },
        { status: 400 }
      );
    }

    // 2. Mark order as paid
    const updatedOrder = dbStore.updateOrderStatus(orderId, 'paid', razorpayPaymentId, paymentMethod);
    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // 3. Allocate vouchers atomically from private inventory
    const allocationResult = dbStore.allocateVouchersForOrder(orderId);
    if (!allocationResult.success) {
      console.error(`Inventory allocation failed after payment for order ${orderId}: ${allocationResult.error}`);
      // In production, trigger immediate admin alert / backorder fulfillment queue
      return NextResponse.json({
        success: true,
        orderId: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        status: 'paid',
        message: 'Payment verified successfully. Voucher allocation is being prioritized by fulfillment queue.',
      });
    }

    // 4. Send transactional notification email
    const primaryItem = updatedOrder.items[0];
    if (primaryItem) {
      await sendOrderConfirmationEmail({
        toEmail: updatedOrder.customerEmail,
        customerName: updatedOrder.customerName,
        orderNumber: updatedOrder.orderNumber,
        certificationName: primaryItem.certificationName,
        examCode: primaryItem.examCode,
        totalAmountInr: updatedOrder.totalAmountInr,
      });
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

