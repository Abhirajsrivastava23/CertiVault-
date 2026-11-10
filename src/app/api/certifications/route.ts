import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider') || undefined;
    const category = searchParams.get('category') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const search = searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

    const certifications = dbStore.getCertifications({
      provider,
      category,
      difficulty,
      search,
      minPrice,
      maxPrice,
    });

    return NextResponse.json({
      success: true,
      data: certifications,
      count: certifications.length,
    });
  } catch (error) {
    console.error('Error in /api/certifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve certifications' },
      { status: 500 }
    );
  }
}
