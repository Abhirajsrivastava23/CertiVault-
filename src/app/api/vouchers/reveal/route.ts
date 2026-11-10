import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbStore } from '@/lib/db/store';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/db/supabase';

export const dynamic = 'force-dynamic';

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
        { success: false, error: 'Invalid reveal request payload' },
        { status: 400 }
      );
    }

    const { allocationId, userId } = validated.data;
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

    // 1. Double-check order status strictly: PAYMENT MUST BE VERIFIED ('paid' or 'fulfilled')
    const userVouchers = dbStore.getUserVouchers(userId);
    const targetVoucher = userVouchers.find(v => v.allocationId === allocationId);

    if (targetVoucher) {
      const order = dbStore.getOrderById(targetVoucher.orderId);
      if (!order || (order.status !== 'paid' && order.status !== 'fulfilled')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Security Policy: Voucher code is protected and cannot be revealed until payment verification is confirmed.' 
          },
          { status: 403 }
        );
      }
    }

    // 2. If Supabase is connected, check order status in Supabase database
    if (isSupabaseConfigured && supabaseAdmin && targetVoucher) {
      try {
        const { data: sbOrder } = await supabaseAdmin
          .from('orders')
          .select('status')
          .eq('id', targetVoucher.orderId)
          .single();

        if (sbOrder && sbOrder.status !== 'paid' && sbOrder.status !== 'fulfilled') {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Security Policy: Supabase payment status is pending. Voucher cannot be revealed.' 
            },
            { status: 403 }
          );
        }
      } catch (sbErr) {
        // Fall back gracefully to internal store verification
      }
    }

    // 3. Call atomic reveal function to retrieve unmasked voucher code & record audit trail
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
