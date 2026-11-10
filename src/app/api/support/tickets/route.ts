import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';
import { TicketCategory } from '@/lib/types';

export const dynamic = 'force-dynamic';

const ticketSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.enum(['Voucher Redemption', 'Payment Issue', 'Order Inquiry', 'Technical Support', 'General']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  orderId: z.string().optional(),
  userId: z.string().optional().default('usr_demo_882910'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'usr_demo_882910';

    const tickets = dbStore.getSupportTickets(userId);
    return NextResponse.json({ success: true, data: tickets });
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ticketSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { subject, category, message, orderId, userId } = validated.data;
    const ticket = dbStore.createSupportTicket({
      userId,
      subject,
      category: category as TicketCategory,
      message,
      orderId,
    });

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return NextResponse.json({ success: false, error: 'Failed to create ticket' }, { status: 500 });
  }
}
