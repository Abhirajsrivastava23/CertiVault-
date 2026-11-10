import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // In dbStore, get orders for demo user or all orders
    const summary = dbStore.getInventorySummary();
    const allOrders = dbStore.getOrdersByUserId('usr_demo_882910');

    return NextResponse.json({
      success: true,
      orders: allOrders,
      inventory: summary,
    });
  } catch (error) {
    console.error('Error in /api/admin/orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch admin data' }, { status: 500 });
  }
}

