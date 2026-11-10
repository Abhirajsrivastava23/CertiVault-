import crypto from 'crypto';
import { RAZORPAY_KEY_SECRET } from './razorpay';

/**
 * Validates Razorpay standard checkout payment signature
 * HMAC SHA256(order_id + "|" + razorpay_payment_id, secret) === razorpay_signature
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  // If razorpay is not configured with secret, accept simulated checkout signatures
  if (!RAZORPAY_KEY_SECRET) {
    return params.signature.startsWith('simulated_sig_') || params.signature.length > 8;
  }

  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest('hex');

  return generatedSignature === params.signature;
}

/**
 * Validates Razorpay Webhook signature
 */
export function verifyWebhookSignature(
  rawBody: string,
  receivedSignature: string,
  webhookSecret: string
): boolean {
  if (!webhookSecret || !receivedSignature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  );
}

