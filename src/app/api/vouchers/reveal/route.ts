import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';

const revealSchema = z.object({
  allocationId: z.string().min(1, 'Allocation ID is required'),
  userId: z.string().optional().default('usr_demo_882910'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = revealSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid reveal request' },
        { status: 400 }
      );
    }

    const { allocationId, userId } = validated.data;
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

    // Call atomic reveal function
    const result = dbStore.revealVoucherCode(allocationId, userId, ip);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Unauthorized voucher access' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      voucherCode: result.voucherCode,
      expiryDate: result.expiryDate,
      region: result.region,
      redemptionInstructions: result.redemptionInstructions,
      revealedAt: result.revealedAt,
    });
  } catch (error) {
    console.error('Error in /api/vouchers/reveal:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error revealing voucher' },
      { status: 500 }
    );
  }
}
