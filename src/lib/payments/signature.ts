import crypto from 'crypto';
import { getRazorpayCredentials } from './razorpay';

export interface VerifySignatureParams {
  orderId: string; // MUST be the server-stored Razorpay order ID (e.g. order_xxx or order_sim_xxx)
  paymentId: string; // razorpay_payment_id from checkout
  signature: string; // razorpay_signature from checkout
  customSecret?: string;
}

/**
 * Validates Razorpay standard checkout payment signature using HMAC SHA-256.
 *
 * Algorithm per Razorpay Official Documentation:
 * generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret)
 *
 * Security requirements:
 * 1. Uses server-stored Razorpay order ID (never trusts client-supplied order ID).
 * 2. Uses RAZORPAY_KEY_SECRET from server-side environment variables.
 * 3. Uses crypto.timingSafeEqual after length checking to prevent timing side-channel attacks.
 * 4. Strictly prohibits simulated signatures in live production environments.
 */
export function verifyPaymentSignature(params: VerifySignatureParams): boolean {
  const { orderId, paymentId, signature, customSecret } = params;

  if (!orderId || !paymentId || !signature) {
    console.error('[Signature Verification]: Missing required parameter', {
      hasOrderId: Boolean(orderId),
      hasPaymentId: Boolean(paymentId),
      hasSignature: Boolean(signature),
    });
    return false;
  }

  const { keyId, keySecret, isConfigured } = getRazorpayCredentials();
  const secret = (customSecret || keySecret || '').trim();
  const isLiveEnvironment = keyId.startsWith('rzp_live_');

  // In live production mode, NEVER permit simulated signatures
  if (isLiveEnvironment && signature.startsWith('simulated_sig_')) {
    console.error('[Security Alert]: Simulated signature rejected in live production mode.');
    return false;
  }

  // Simulated Order / Test Simulation Flow (in non-live environment)
  if (!isLiveEnvironment && (orderId.startsWith('order_sim_') || signature.startsWith('simulated_sig_'))) {
    const isSandboxValid = signature.startsWith('simulated_sig_') || signature.length > 0;
    if (isSandboxValid) {
      return true;
    }
  }

  // If Razorpay secret is not configured on the server
  if (!isConfigured || !secret) {
    if (!isLiveEnvironment && signature.startsWith('simulated_sig_')) {
      return true;
    }
    console.error('[Signature Verification Warning]: RAZORPAY_KEY_SECRET is missing or not configured on server.');
    return false;
  }

  try {
    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const receivedBuffer = Buffer.from(signature.trim(), 'utf8');

    // crypto.timingSafeEqual throws RangeError if buffer lengths differ
    if (expectedBuffer.length !== receivedBuffer.length) {
      console.error('[Payment Signature Length Mismatch]:', {
        orderId,
        paymentIdPrefix: paymentId.substring(0, 8),
        expectedLength: expectedBuffer.length,
        receivedLength: receivedBuffer.length,
        keyIdPrefix: keyId ? keyId.substring(0, 8) + '...' : 'none',
      });
      return false;
    }

    const isValid = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
    if (!isValid) {
      console.error('[Payment Signature Verification Failed]: HMAC digest mismatch', {
        orderId,
        paymentIdPrefix: paymentId.substring(0, 8),
        keyIdPrefix: keyId ? keyId.substring(0, 8) + '...' : 'none',
        secretLength: secret.length,
      });
    }
    return isValid;
  } catch (err) {
    console.error('[Cryptographic Signature Verification Error]:', err);
    return false;
  }
}

/**
 * Validates Razorpay Webhook signature using HMAC SHA-256
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
    const receivedBuffer = Buffer.from(receivedSignature.trim(), 'utf8');

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (err) {
    console.error('[Webhook Signature Verification Error]:', err);
    return false;
  }
}
