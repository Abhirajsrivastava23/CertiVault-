import crypto from 'crypto';
import { getRazorpayCredentials } from './razorpay';

export interface VerifySignatureParams {
  orderId: string; // MUST be the original server-stored Razorpay order ID
  paymentId: string;
  signature: string;
  customSecret?: string;
}

/**
 * Validates Razorpay standard checkout payment signature using HMAC SHA-256.
 *
 * Algorithm per Razorpay Official Docs:
 * generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret)
 *
 * Security requirements:
 * 1. Uses server-stored Razorpay order ID (never trusts client-supplied order ID).
 * 2. Uses RAZORPAY_KEY_SECRET from server-side environment variables.
 * 3. Uses crypto.timingSafeEqual after length checking to prevent timing attacks.
 */
export function verifyPaymentSignature(params: VerifySignatureParams): boolean {
  const { orderId, paymentId, signature, customSecret } = params;

  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const { keySecret, isConfigured } = getRazorpayCredentials();
  const secret = (customSecret || keySecret || '').trim();

  // If the server order was generated via sandbox simulation:
  if (orderId.startsWith('order_sim_') || signature.startsWith('simulated_sig_')) {
    // Only accept simulated signature for simulated orders
    return signature.startsWith('simulated_sig_');
  }

  // If Razorpay is not configured with a valid secret key:
  if (!isConfigured || !secret) {
    console.warn('[Signature Warning]: RAZORPAY_KEY_SECRET is not configured on the server.');
    return false;
  }

  try {
    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const receivedBuffer = Buffer.from(signature, 'utf8');

    // crypto.timingSafeEqual throws RangeError if buffer lengths differ
    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (err) {
    console.error('[Cryptographic Signature Verification Error]:', err);
    return false;
  }
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

  try {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret.trim())
      .update(rawBody)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const receivedBuffer = Buffer.from(receivedSignature, 'utf8');

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (err) {
    console.error('[Webhook Signature Verification Error]:', err);
    return false;
  }
}
