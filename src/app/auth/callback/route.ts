import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/db/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') || '/dashboard';

    if (code && isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.exchangeCodeForSession(code);
      } catch (err) {
        console.warn('Supabase auth session exchange failed:', err);
      }
    }

    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error('Auth callback redirect error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
