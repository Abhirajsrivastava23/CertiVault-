import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { store } from '@/lib/services/store';
import { generateOrderNumber } from '@/lib/utils/formatters';
import { Order, OrderItem } from '@/lib/types';

const OrderItemSchema = z.object({
  certificationId: z.string(),
  quantity: z.number().int().positive().max(10),
});

const CreateOrderSchema = z.object({
  userId: z.string().default('usr-demo-1001'),
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  items: z.array(OrderItemSchema).min(1, 'At least one item is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = CreateOrderSchema.parse(body);

    // CRITICAL SECURITY RULE:
    // Prices and product details must NEVER be trusted from the client!
    // We strictly look up each certification from our verified catalog.
    let totalAmountInr = 0;
    const orderItems: OrderItem[] = [];
    const orderId = `ord-${Date.now()}`;
    const orderNumber = generateOrderNumber();

    for (const item of validated.items) {
      const cert = CERTIFICATIONS.find(c => c.id === item.certificationId);
      if (!cert) {
        return NextResponse.json(
          { error: `Certification ${item.certificationId} not found in catalog.` },
          { status: 400 }
        );
      }

      // Check stock availability
      const availableVoucher = store.getAvailableVoucher(cert.id);
      if (!availableVoucher) {
        return NextResponse.json(
          { error: `Vouchers for "${cert.name}" are currently out of stock. Please check back shortly.` },
          { status: 400 }
        );
      }

      const unitPriceInr = cert.voucherPriceInr;
      const totalPriceInr = unitPriceInr * item.quantity;
      totalAmountInr += totalPriceInr;

      orderItems.push({
        id: `item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        orderId,
        certificationId: cert.id,
        certificationName: cert.name,
        examCode: cert.examCode,
        providerName: cert.providerName,
        quantity: item.quantity,
        unitPriceInr,
        totalPriceInr,
      });
    }

    // Taxes included in price or 0 for digital educational vouchers under certain categories
    const taxAmountInr = 0;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      userId: validated.userId,
      customerName: validated.customerName,
      customerEmail: validated.customerEmail,
      customerPhone: validated.customerPhone,
      totalAmountInr,
      taxAmountInr,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: orderItems,
    };

    store.createOrder(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Create order error:', err);
    return NextResponse.json({ error: 'Internal server error creating order' }, { status: 500 });
  }
}
