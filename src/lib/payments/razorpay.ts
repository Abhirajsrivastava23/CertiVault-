import Razorpay from 'razorpay';

export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const isRazorpayConfigured = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

export const razorpayInstance = isRazorpayConfigured
  ? new Razorpay({
      key_id: RAZORPAY_KEY_ID!,
      key_secret: RAZORPAY_KEY_SECRET!,
    })
  : null;

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
  if (razorpayInstance) {
    try {
      const order = await razorpayInstance.orders.create({
        amount: options.amount,
        currency: options.currency || 'INR',
        receipt: options.receipt,
        notes: options.notes,
      });

      return {
        id: order.id,
        amount: Number(order.amount),
        currency: order.currency,
        receipt: order.receipt || options.receipt,
        status: order.status,
        isSimulated: false,
      };
    } catch (err) {
      console.error('Razorpay API error, falling back to sandbox mode:', err);
    }
  }

  // Realistic Sandbox / Local Simulation Order
  const simulatedId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return {
    id: simulatedId,
    amount: options.amount,
    currency: 'INR',
    receipt: options.receipt,
    status: 'created',
    isSimulated: true,
  };
}

