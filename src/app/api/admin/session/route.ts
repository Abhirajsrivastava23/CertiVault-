import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const adminCookie = request.cookies.get('certivault_admin_session');
  const isAuthenticated = adminCookie?.value === 'authenticated';

  return NextResponse.json({
    authenticated: isAuthenticated,
    user: isAuthenticated
      ? {
          role: 'admin',
          username: 'admin@123',
          fullName: 'CertiVault Master Administrator',
        }
      : null,
  });
}

