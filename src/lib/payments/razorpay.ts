import Razorpay from 'razorpay';

export interface RazorpayCredentials {
  keyId: string;
  keySecret: string;
  isConfigured: boolean;
}

/**
 * Safely sanitizes environment variable strings by trimming whitespace and removing wrapping quotes
 */
export function cleanEnvVar(val?: string): string {
  if (!val) return '';
  return val.trim().replace(/^["']|["']$/g, '').trim();
}

/**
 * Resolves Razorpay credentials dynamically from environment variables,
 * checking all standard alias variations used in Vercel and local setups.
 */
export function getRazorpayCredentials(): RazorpayCredentials {
  const keyId = cleanEnvVar(
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY
  );

  const keySecret = cleanEnvVar(
    process.env.RAZORPAY_KEY_SECRET ||
    process.env.RAZORPAY_SECRET ||
    process.env.RAZORPAY_API_SECRET ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET
  );

  const isConfigured = Boolean(
    keyId &&
    keySecret &&
    !keyId.includes('MOCK') &&
    !keyId.includes('demo') &&
    !keyId.includes('YourTestKeyId') &&
    !keySecret.includes('your_razorpay') &&
    !keySecret.includes('placeholder') &&
    (keyId.startsWith('rzp_test_') || keyId.startsWith('rzp_live_') || keyId.startsWith('rzp_'))
  );

  return { keyId, keySecret, isConfigured };
}

export const RAZORPAY_KEY_ID = getRazorpayCredentials().keyId;
export const RAZORPAY_KEY_SECRET = getRazorpayCredentials().keySecret;
export const isRazorpayConfigured = getRazorpayCredentials().isConfigured;

/**
 * Returns an authenticated Razorpay SDK instance, or null if credentials are not configured
 */
export function getRazorpayClient(): Razorpay | null {
  const { keyId, keySecret, isConfigured } = getRazorpayCredentials();
  if (!isConfigured) return null;

  try {
    return new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (err) {
    console.error('[Razorpay Client Init Error]:', err);
    return null;
  }
}

export const razorpayInstance = getRazorpayClient();

export interface RazorpayOrderOptions {
  amount: number; // in paise
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayCreatedOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  isSimulated?: boolean;
}

/**
 * Creates an order on Razorpay or falls back to an authentic sandbox order simulation
 */
export async function createRazorpayOrder(options: RazorpayOrderOptions): Promise<RazorpayCreatedOrder> {
  const client = getRazorpayClient();

  if (client) {
    try {
      const order = await client.orders.create({
        amount: Math.round(options.amount),
        currency: options.currency || 'INR',
        receipt: options.receipt,
        notes: options.notes,
      });

      return {
        id: order.id,
        amount: Number(order.amount),
        currency: order.currency,
        receipt: (order.receipt as string) || options.receipt,
        status: order.status,
        isSimulated: false,
      };
    } catch (err: any) {
      console.error('[Razorpay Order API Failed]:', err?.error?.description || err?.message || err);
      // In live/test mode, if credentials are configured, re-throw so user is alerted rather than masking failure
      throw new Error(`Razorpay gateway order failed: ${err?.error?.description || err?.message || 'Unauthorized or network error'}`);
    }
  }

  // Realistic Sandbox / Local Simulation Order when credentials are not configured
  const simulatedId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return {
    id: simulatedId,
    amount: Math.round(options.amount),
    currency: 'INR',
    receipt: options.receipt,
    status: 'created',
    isSimulated: true,
  };
}
