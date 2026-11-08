import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/services/store';

export async function POST(req: NextRequest) {
  try {
    const { allocationId, userId } = await req.json();

    if (!allocationId) {
      return NextResponse.json({ error: 'Allocation ID is required' }, { status: 400 });
    }

    // Default to demo user if not passed (or authenticated user from session/cookies)
    const effectiveUserId = userId || 'usr-demo-1001';

    // Verify ownership and fetch unmasked code
    const result = store.revealVoucher(allocationId, effectiveUserId);

    if (!result) {
      return NextResponse.json(
        { error: 'Unauthorized: Voucher not found, not fulfilled, or does not belong to this account.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      voucherCode: result.voucherCode,
      instructions: result.instructions,
      revealedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error revealing voucher:', err);
    return NextResponse.json({ error: 'Failed to reveal voucher' }, { status: 500 });
  }
}
