import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  organization: z.string().optional(),
  inquiryType: z.enum(['enterprise_vouchers', 'bulk_discount', 'partnership', 'candidate_support', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ContactSchema.parse(body);

    // In production, send via Resend to support@certivault.in
    console.log('Contact inquiry received:', validated);

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. A CertiVault enterprise advisor will respond within 24 business hours.',
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
