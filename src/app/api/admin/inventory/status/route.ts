import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const summary = dbStore.getInventorySummary();
    const totalAvailable = summary.reduce((acc, s) => acc + s.availableCount, 0);
    const totalSold = summary.reduce((acc, s) => acc + s.soldCount, 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalAvailable,
        totalSold,
        totalCertifications: summary.length,
      },
      inventory: summary,
    });
  } catch (error) {
    console.error('Error in /api/admin/inventory/status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve inventory status' },
      { status: 500 }
    );
  }
}

