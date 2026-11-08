import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { store } from '@/lib/services/store';
import { SupportTicket } from '@/lib/types';

const TicketSchema = z.object({
  userId: z.string().default('usr-demo-1001'),
  userEmail: z.string().email(),
  orderId: z.string().optional(),
  category: z.enum(['Voucher Redemption', 'Payment Issue', 'Order Inquiry', 'Technical Support', 'General']),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(15, 'Message must be at least 15 characters'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = TicketSchema.parse(body);

    const ticketNumber = `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: SupportTicket = {
      id: `tick-${Date.now()}`,
      ticketNumber,
      userId: validated.userId,
      userEmail: validated.userEmail,
      orderId: validated.orderId,
      category: validated.category,
      subject: validated.subject,
      message: validated.message,
      status: 'open',
      priority: validated.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.createTicket(newTicket);

    return NextResponse.json({
      success: true,
      ticket: newTicket,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Support ticket creation error:', err);
    return NextResponse.json({ error: 'Failed to create support ticket' }, { status: 500 });
  }
}
