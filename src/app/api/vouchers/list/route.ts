import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'usr_demo_882910';

    const vouchers = dbStore.getUserVouchers(userId);

    return NextResponse.json({
      success: true,
      data: vouchers,
      count: vouchers.length,
    });
  } catch (error) {
    console.error('Error in /api/vouchers/list:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve vouchers' },
      { status: 500 }
    );
  }
}
