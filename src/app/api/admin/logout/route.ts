import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Admin session terminated',
  });

  response.cookies.set('certivault_admin_session', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}

